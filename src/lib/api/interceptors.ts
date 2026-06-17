/**
 * API Client Interceptors
 * Request and response interceptors for authentication and logging
 * 
 * Validates Requirements: 3.2, 3.4, 3.5
 */

import type { RequestInterceptor, ResponseInterceptor, RequestConfig } from './client';
import type { APIError } from '../errors';
import { errorLogger, errorHandler } from '../errors';

/**
 * Authentication Request Interceptor
 * Injects authentication token into request headers
 * 
 * Validates Requirement 3.2: Request interceptors for authentication token injection
 */
export class AuthenticationInterceptor implements RequestInterceptor {
  private tokenProvider: () => Promise<string | null>;

  /**
   * Create an authentication interceptor
   * 
   * @param tokenProvider - Function that returns the current auth token
   */
  constructor(tokenProvider: () => Promise<string | null>) {
    this.tokenProvider = tokenProvider;
  }

  /**
   * Inject authentication token into request headers
   * 
   * @param config - Request configuration
   * @returns Modified request configuration with auth token
   */
  async onRequest(config: RequestConfig): Promise<RequestConfig> {
    try {
      const token = await this.tokenProvider();

      if (token) {
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          },
        };
      }

      return config;
    } catch (error) {
      // Log token retrieval failure but don't block the request
      errorLogger.warn('Failed to retrieve authentication token', {
        action: 'AuthenticationInterceptor.onRequest',
        metadata: {
          error: error instanceof Error ? error.message : String(error),
        },
      });

      return config;
    }
  }

  /**
   * Handle request errors
   * 
   * @param error - Request error
   * @returns The error (passed through)
   */
  async onError(error: Error): Promise<Error> {
    return error;
  }
}

/**
 * Logging Response Interceptor
 * Logs all API requests and responses for debugging and monitoring
 * 
 * Validates Requirement 3.4: Log errors with request context
 */
export class LoggingInterceptor implements ResponseInterceptor {
  private logSuccessfulRequests: boolean;

  /**
   * Create a logging interceptor
   * 
   * @param logSuccessfulRequests - Whether to log successful requests (default: false in production)
   */
  constructor(logSuccessfulRequests: boolean = process.env.NODE_ENV === 'development') {
    this.logSuccessfulRequests = logSuccessfulRequests;
  }

  /**
   * Log successful responses
   * 
   * @param response - Response data
   * @returns The response (passed through)
   */
  async onResponse<T>(response: T): Promise<T> {
    if (this.logSuccessfulRequests) {
      errorLogger.debug('API request succeeded', {
        action: 'LoggingInterceptor.onResponse',
        metadata: {
          responseType: typeof response,
          hasData: response !== null && response !== undefined,
        },
      });
    }

    return response;
  }

  /**
   * Log error responses with full context
   * 
   * @param error - API error
   * @returns The error (passed through)
   */
  async onError(error: APIError): Promise<APIError> {
    // Log the error with full context
    errorLogger.error(error, {
      action: 'LoggingInterceptor.onError',
      component: 'APIClient',
      metadata: {
        endpoint: error.context?.['endpoint'] || 'unknown',
        statusCode: error.statusCode,
        retryable: error.isRetryable(),
      },
    });

    return error;
  }
}

/**
 * Session Management Response Interceptor
 * Handles 401 errors by triggering session refresh or logout
 * 
 * Validates Requirement 3.5: Handle 401 errors for session refresh/logout
 */
export class SessionManagementInterceptor implements ResponseInterceptor {
  private onUnauthorized: () => Promise<void>;
  private isRefreshing: boolean = false;
  private refreshPromise: Promise<void> | null = null;

  /**
   * Create a session management interceptor
   * 
   * @param onUnauthorized - Callback to handle unauthorized errors (refresh session or logout)
   */
  constructor(onUnauthorized: () => Promise<void>) {
    this.onUnauthorized = onUnauthorized;
  }

  /**
   * Pass through successful responses
   * 
   * @param response - Response data
   * @returns The response (passed through)
   */
  async onResponse<T>(response: T): Promise<T> {
    return response;
  }

  /**
   * Handle 401 Unauthorized errors
   * Triggers session refresh or logout
   * 
   * @param error - API error
   * @returns The error (after handling)
   */
  async onError(error: APIError): Promise<APIError> {
    // Only handle 401 Unauthorized errors
    if (error.statusCode !== 401) {
      return error;
    }

    // Prevent multiple simultaneous refresh attempts
    if (this.isRefreshing) {
      // Wait for the ongoing refresh to complete
      if (this.refreshPromise) {
        await this.refreshPromise;
      }
      return error;
    }

    try {
      this.isRefreshing = true;
      
      // Create a refresh promise that can be awaited by other requests
      this.refreshPromise = this.handleUnauthorized();
      await this.refreshPromise;

      errorLogger.info('Session refresh triggered due to 401 error', {
        action: 'SessionManagementInterceptor.onError',
        component: 'APIClient',
        metadata: {
          endpoint: error.context?.['endpoint'] || 'unknown',
        },
      });
    } catch (refreshError) {
      errorLogger.error(error, {
        action: 'SessionManagementInterceptor.onError',
        component: 'APIClient',
        metadata: {
          endpoint: error.context?.['endpoint'] || 'unknown',
          refreshFailed: true,
          refreshError: refreshError instanceof Error ? refreshError.message : String(refreshError),
        },
      });
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }

    return error;
  }

  /**
   * Handle unauthorized error by calling the provided callback
   * This typically triggers session refresh or redirects to login
   */
  private async handleUnauthorized(): Promise<void> {
    try {
      await this.onUnauthorized();
    } catch (error) {
      // Log the error but don't throw - we want to return the original 401 error
      // Use errorHandler to handle the error (it will normalize and log it)
      errorHandler.handle(
        error instanceof Error ? error : new Error(String(error)),
        {
          action: 'SessionManagementInterceptor.handleUnauthorized',
          component: 'APIClient',
        }
      );
    }
  }
}

/**
 * Create default interceptors for the API client
 * 
 * @param tokenProvider - Function that returns the current auth token
 * @param onUnauthorized - Callback to handle unauthorized errors
 * @returns Array of interceptors to add to the API client
 */
export function createDefaultInterceptors(
  tokenProvider: () => Promise<string | null>,
  onUnauthorized: () => Promise<void>
): {
  requestInterceptors: RequestInterceptor[];
  responseInterceptors: ResponseInterceptor[];
} {
  return {
    requestInterceptors: [
      new AuthenticationInterceptor(tokenProvider),
    ],
    responseInterceptors: [
      new LoggingInterceptor(),
      new SessionManagementInterceptor(onUnauthorized),
    ],
  };
}
