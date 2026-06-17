/**
 * Centralized API Client
 * Provides a single interface for all HTTP requests with consistent error handling
 * 
 * Validates Requirements: 3.1, 3.6
 */

import { z } from 'zod';
import { APIError } from '../errors';

/**
 * Result type for API operations
 */
export type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Request configuration options
 */
export interface RequestConfig {
  /** Custom headers for this request */
  headers?: Record<string, string>;
  /** Query parameters */
  params?: Record<string, string | number | boolean>;
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
  /** Number of retry attempts for failed requests (default: 3) */
  retries?: number;
  /** Zod schema for response validation */
  validateSchema?: z.ZodSchema;
  /** AbortSignal for request cancellation */
  signal?: AbortSignal;
}

/**
 * Request interceptor interface
 */
export interface RequestInterceptor {
  onRequest(config: RequestConfig): RequestConfig | Promise<RequestConfig>;
  onError(error: Error): Error | Promise<Error>;
}

/**
 * Response interceptor interface
 */
export interface ResponseInterceptor {
  onResponse<T>(response: T): T | Promise<T>;
  onError(error: APIError): APIError | Promise<APIError>;
}

/**
 * Internal request options after processing
 */
interface ProcessedRequestConfig extends RequestInit {
  timeout: number;
  retries: number;
  validateSchema?: z.ZodSchema;
  signal?: AbortSignal;
}

/**
 * Centralized API Client
 * Provides HTTP methods with consistent error handling, retries, and validation
 */
export class APIClient {
  private baseURL: string = '';
  private defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  /**
   * Set the base URL for all requests
   */
  setBaseURL(url: string): void {
    this.baseURL = url.endsWith('/') ? url.slice(0, -1) : url;
  }

  /**
   * Set default headers for all requests
   */
  setDefaultHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  /**
   * Add a request interceptor
   */
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  /**
   * Add a response interceptor
   */
  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  /**
   * GET request
   */
  async get<T>(url: string, config?: RequestConfig): Promise<Result<T, APIError>> {
    return this.request<T>('GET', url, undefined, config);
  }

  /**
   * POST request
   */
  async post<T>(url: string, data: unknown, config?: RequestConfig): Promise<Result<T, APIError>> {
    return this.request<T>('POST', url, data, config);
  }

  /**
   * PUT request
   */
  async put<T>(url: string, data: unknown, config?: RequestConfig): Promise<Result<T, APIError>> {
    return this.request<T>('PUT', url, data, config);
  }

  /**
   * PATCH request
   */
  async patch<T>(url: string, data: unknown, config?: RequestConfig): Promise<Result<T, APIError>> {
    return this.request<T>('PATCH', url, data, config);
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, config?: RequestConfig): Promise<Result<T, APIError>> {
    return this.request<T>('DELETE', url, undefined, config);
  }

  /**
   * Core request method with retry logic and error handling
   * 
   * Implements automatic retry with exponential backoff for transient failures:
   * - Retries on 5xx server errors (500, 502, 503, 504, etc.)
   * - Retries on 429 rate limit errors
   * - Does NOT retry on 4xx client errors (except 429)
   * - Uses exponential backoff: 1s, 2s, 4s, 8s, 16s, capped at 30s
   * - Default retry count: 3 attempts (configurable via RequestConfig.retries)
   * 
   * @param method - HTTP method (GET, POST, PUT, PATCH, DELETE)
   * @param url - Request URL (relative or absolute)
   * @param data - Request body data (for POST, PUT, PATCH)
   * @param config - Request configuration options
   * @returns Result object with success flag and data or error
   */
  private async request<T>(
    method: string,
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<Result<T, APIError>> {
    // Process configuration with defaults
    const processedConfig = await this.processConfig(method, config);
    const fullURL = this.buildURL(url, config?.params);

    // Execute request with automatic retries
    let lastError: APIError | null = null;
    const maxAttempts = processedConfig.retries + 1; // Initial attempt + retries

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        // Apply exponential backoff delay for retry attempts
        // Delay formula: min(1000 * 2^(attempt-1), 30000)
        // Attempt 1: 1000ms, Attempt 2: 2000ms, Attempt 3: 4000ms, etc.
        // Maximum delay capped at 30 seconds
        if (attempt > 0) {
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 30000);
          await this.sleep(delay);
        }

        // Execute the HTTP request
        const response = await this.executeRequest<T>(
          fullURL,
          method,
          data,
          processedConfig
        );

        // Run response interceptors (for logging, transformation, etc.)
        let processedResponse = response;
        for (const interceptor of this.responseInterceptors) {
          processedResponse = await interceptor.onResponse(processedResponse);
        }

        // Validate response against Zod schema if provided
        if (config?.validateSchema) {
          const validation = config.validateSchema.safeParse(processedResponse);
          if (!validation.success) {
            return {
              success: false,
              error: new APIError(
                'Response validation failed',
                500,
                url,
                { zodError: validation.error }
              ),
            };
          }
          return { success: true, data: validation.data as T };
        }

        // Success - return the response data
        return { success: true, data: processedResponse };
      } catch (error) {
        // Convert error to APIError for consistent error handling
        lastError = this.handleError(error, url);

        // Run error interceptors (for logging, monitoring, etc.)
        for (const interceptor of this.responseInterceptors) {
          lastError = await interceptor.onError(lastError);
        }

        // Determine if we should retry this error
        // Don't retry if:
        // 1. Error is not retryable (4xx client errors except 429)
        // 2. Request was explicitly aborted by the user
        const isAborted = error instanceof DOMException && error.name === 'AbortError';
        if (!lastError.isRetryable() || isAborted) {
          break; // Exit retry loop immediately
        }

        // Continue to next retry attempt
      }
    }

    // All retry attempts exhausted - return the last error
    return { success: false, error: lastError! };
  }

  /**
   * Execute the actual HTTP request with timeout
   */
  private async executeRequest<T>(
    url: string,
    method: string,
    data: unknown,
    config: ProcessedRequestConfig
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);

    try {
      const fetchOptions: RequestInit = {
        method,
        signal: config.signal || controller.signal,
      };

      // Only add headers if they exist
      if (config.headers) {
        fetchOptions.headers = config.headers;
      }

      // Only add body if data exists
      if (data) {
        fetchOptions.body = JSON.stringify(data);
      }

      const response = await fetch(url, fetchOptions);

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new APIError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          url
        );
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return undefined as T;
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Process request configuration with defaults
   */
  private async processConfig(
    method: string,
    config?: RequestConfig
  ): Promise<ProcessedRequestConfig> {
    let processedConfig: RequestConfig = {
      headers: { ...this.defaultHeaders, ...config?.headers },
      timeout: config?.timeout ?? 30000,
      retries: config?.retries ?? 3,
      validateSchema: config?.validateSchema,
      signal: config?.signal,
    };

    // Run request interceptors
    for (const interceptor of this.requestInterceptors) {
      try {
        processedConfig = await interceptor.onRequest(processedConfig);
      } catch (error) {
        const processedError = await interceptor.onError(
          error instanceof Error ? error : new Error(String(error))
        );
        throw processedError;
      }
    }

    const result: ProcessedRequestConfig = {
      method,
      timeout: processedConfig.timeout!,
      retries: processedConfig.retries!,
    };

    // Only add properties if they exist
    if (processedConfig.headers) {
      result.headers = processedConfig.headers;
    }
    
    if (processedConfig.validateSchema) {
      result.validateSchema = processedConfig.validateSchema;
    }
    
    if (processedConfig.signal) {
      result.signal = processedConfig.signal;
    }

    return result;
  }

  /**
   * Build full URL with query parameters
   */
  private buildURL(path: string, params?: Record<string, string | number | boolean>): string {
    const url = path.startsWith('http') ? path : `${this.baseURL}${path}`;

    if (!params || Object.keys(params).length === 0) {
      return url;
    }

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });

    return `${url}?${searchParams.toString()}`;
  }

  /**
   * Handle errors and convert to APIError
   */
  private handleError(error: unknown, endpoint: string): APIError {
    if (error instanceof APIError) {
      return error;
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      return new APIError('Request was cancelled', 0, endpoint, { aborted: true });
    }

    if (error instanceof Error) {
      return new APIError(error.message, 0, endpoint, { originalError: error.name });
    }

    return new APIError('An unknown error occurred', 0, endpoint);
  }

  /**
   * Sleep utility for retry delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Default API client instance
 */
export const apiClient = new APIClient();
