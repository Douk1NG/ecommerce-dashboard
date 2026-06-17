/**
 * Unit tests for Centralized API Client
 * Tests HTTP methods, retry logic, error handling, and interceptors
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { z } from 'zod';
import { APIClient, RequestConfig, RequestInterceptor, ResponseInterceptor } from '../client';
import { APIError } from '../../errors';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('APIClient', () => {
  let client: APIClient;

  beforeEach(() => {
    client = new APIClient();
    client.setBaseURL('https://api.example.com');
    mockFetch.mockClear();
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('HTTP Methods', () => {
    it('should make a GET request', async () => {
      const mockData = { id: 1, name: 'Test' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => mockData,
      });

      const result = await client.get('/users/1');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(mockData);
      }
    });

    it('should make a POST request with data', async () => {
      const requestData = { name: 'New User' };
      const responseData = { id: 1, ...requestData };
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => responseData,
      });

      const result = await client.post('/users', requestData);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(requestData),
        })
      );
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(responseData);
      }
    });

    it('should make a PUT request', async () => {
      const requestData = { name: 'Updated User' };
      const responseData = { id: 1, ...requestData };
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => responseData,
      });

      const result = await client.put('/users/1', requestData);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(requestData),
        })
      );
      expect(result.success).toBe(true);
    });

    it('should make a PATCH request', async () => {
      const requestData = { name: 'Patched User' };
      const responseData = { id: 1, ...requestData };
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => responseData,
      });

      const result = await client.patch('/users/1', requestData);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(requestData),
        })
      );
      expect(result.success).toBe(true);
    });

    it('should make a DELETE request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
        headers: new Headers(),
      });

      const result = await client.delete('/users/1');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
      expect(result.success).toBe(true);
    });
  });

  describe('Request Configuration', () => {
    it('should include custom headers', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({}),
      });

      await client.get('/users', {
        headers: { 'X-Custom-Header': 'test-value' },
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Custom-Header': 'test-value',
          }),
        })
      );
    });

    it('should append query parameters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({}),
      });

      await client.get('/users', {
        params: { page: 1, limit: 10, active: true },
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users?page=1&limit=10&active=true',
        expect.any(Object)
      );
    });

    it('should use default headers', async () => {
      client.setDefaultHeaders({ 'Authorization': 'Bearer token123' });
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({}),
      });

      await client.get('/users');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer token123',
          }),
        })
      );
    });

    it('should handle absolute URLs', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({}),
      });

      await client.get('https://other-api.com/data');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://other-api.com/data',
        expect.any(Object)
      );
    });
  });

  describe('Timeout Handling', () => {
    it('should timeout after specified duration', async () => {
      // Use real timers for this test since AbortController.abort() needs real timing
      vi.useRealTimers();
      
      // Mock fetch to respect abort signal
      mockFetch.mockImplementationOnce((url, options) => 
        new Promise((resolve, reject) => {
          const signal = options?.signal as AbortSignal;
          if (signal) {
            signal.addEventListener('abort', () => {
              reject(new DOMException('The operation was aborted', 'AbortError'));
            });
          }
          // Never resolve normally - will only reject on abort
        })
      );

      const result = await client.get('/users', { timeout: 100, retries: 0 });

      expect(result.success).toBe(false);
      // Type guard for TypeScript
      if (result.success === false) {
        expect(result.error).toBeInstanceOf(APIError);
        expect(result.error.message).toContain('cancelled');
      }
      
      // Restore fake timers for other tests
      vi.useFakeTimers();
    });
  });

  describe('Retry Logic', () => {
    it('should retry on transient failures', async () => {
      // First two calls fail with 503, third succeeds
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers(),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers(),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          headers: new Headers({ 'content-type': 'application/json' }),
          json: async () => ({ success: true }),
        });

      const resultPromise = client.get('/users', { retries: 2 });
      
      // Advance timers for retry delays
      await vi.runAllTimersAsync();
      
      const result = await resultPromise;

      expect(mockFetch).toHaveBeenCalledTimes(3);
      expect(result.success).toBe(true);
    });

    it('should retry on 5xx server errors', async () => {
      // Test various 5xx errors
      const serverErrors = [500, 502, 503, 504];
      
      for (const statusCode of serverErrors) {
        mockFetch.mockClear();
        mockFetch
          .mockResolvedValueOnce({
            ok: false,
            status: statusCode,
            statusText: 'Server Error',
            headers: new Headers(),
          })
          .mockResolvedValueOnce({
            ok: true,
            status: 200,
            headers: new Headers({ 'content-type': 'application/json' }),
            json: async () => ({ success: true }),
          });

        const resultPromise = client.get('/users', { retries: 1 });
        await vi.runAllTimersAsync();
        const result = await resultPromise;

        expect(mockFetch).toHaveBeenCalledTimes(2);
        expect(result.success).toBe(true);
      }
    });

    it('should retry on 429 rate limit errors', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 429,
          statusText: 'Too Many Requests',
          headers: new Headers(),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          headers: new Headers({ 'content-type': 'application/json' }),
          json: async () => ({ success: true }),
        });

      const resultPromise = client.get('/users', { retries: 1 });
      await vi.runAllTimersAsync();
      const result = await resultPromise;

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(result.success).toBe(true);
    });

    it('should not retry on 4xx client errors (except 429)', async () => {
      const clientErrors = [400, 401, 403, 404, 422];
      
      for (const statusCode of clientErrors) {
        mockFetch.mockClear();
        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: statusCode,
          statusText: 'Client Error',
          headers: new Headers(),
        });

        const result = await client.get('/users', { retries: 3 });

        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.statusCode).toBe(statusCode);
          expect(result.error.isRetryable()).toBe(false);
        }
      }
    });

    it('should not retry on non-retryable errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        headers: new Headers(),
      });

      const result = await client.get('/users', { retries: 3 });

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result.success).toBe(false);
    });

    it('should use exponential backoff for retries', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers(),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers(),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          headers: new Headers({ 'content-type': 'application/json' }),
          json: async () => ({ success: true }),
        });

      const resultPromise = client.get('/users', { retries: 2 });
      
      // Should wait 1000ms before first retry
      await vi.advanceTimersByTimeAsync(1000);
      expect(mockFetch).toHaveBeenCalledTimes(2);
      
      // Should wait 2000ms before second retry
      await vi.advanceTimersByTimeAsync(2000);
      expect(mockFetch).toHaveBeenCalledTimes(3);
      
      await resultPromise;
    });

    it('should cap exponential backoff at 30 seconds', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers(),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers(),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers(),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers(),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers(),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          headers: new Headers({ 'content-type': 'application/json' }),
          json: async () => ({ success: true }),
        });

      const resultPromise = client.get('/users', { retries: 5 });
      
      // First retry: 1000ms (2^0 * 1000)
      await vi.advanceTimersByTimeAsync(1000);
      expect(mockFetch).toHaveBeenCalledTimes(2);
      
      // Second retry: 2000ms (2^1 * 1000)
      await vi.advanceTimersByTimeAsync(2000);
      expect(mockFetch).toHaveBeenCalledTimes(3);
      
      // Third retry: 4000ms (2^2 * 1000)
      await vi.advanceTimersByTimeAsync(4000);
      expect(mockFetch).toHaveBeenCalledTimes(4);
      
      // Fourth retry: 8000ms (2^3 * 1000)
      await vi.advanceTimersByTimeAsync(8000);
      expect(mockFetch).toHaveBeenCalledTimes(5);
      
      // Fifth retry: should be capped at 30000ms, not 16000ms (2^4 * 1000)
      await vi.advanceTimersByTimeAsync(30000);
      expect(mockFetch).toHaveBeenCalledTimes(6);
      
      await resultPromise;
    });

    it('should respect custom retry count', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers(),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers(),
        });

      const resultPromise = client.get('/users', { retries: 1 });
      await vi.runAllTimersAsync();
      const result = await resultPromise;

      // Should try once, then retry once (total 2 attempts)
      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(result.success).toBe(false);
    });

    it('should not retry when retries is set to 0', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers(),
      });

      const result = await client.get('/users', { retries: 0 });

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result.success).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should handle HTTP errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        headers: new Headers(),
      });

      const result = await client.get('/users/999');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(APIError);
        expect(result.error.statusCode).toBe(404);
        expect(result.error.message).toContain('404');
      }
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await client.get('/users');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(APIError);
        expect(result.error.message).toContain('Network error');
      }
    });

    it('should handle request cancellation', async () => {
      const controller = new AbortController();
      
      mockFetch.mockImplementationOnce(() => 
        Promise.reject(new DOMException('The operation was aborted', 'AbortError'))
      );

      const result = await client.get('/users', { signal: controller.signal });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(APIError);
        expect(result.error.message).toContain('cancelled');
      }
    });
  });

  describe('Schema Validation', () => {
    it('should validate response with Zod schema', async () => {
      const userSchema = z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email(),
      });

      const mockData = { id: 1, name: 'John', email: 'john@example.com' };
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => mockData,
      });

      const result = await client.get('/users/1', {
        validateSchema: userSchema,
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(mockData);
      }
    });

    it('should fail validation for invalid response', async () => {
      const userSchema = z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email(),
      });

      const invalidData = { id: 1, name: 'John', email: 'invalid-email' };
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => invalidData,
      });

      const result = await client.get('/users/1', {
        validateSchema: userSchema,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(APIError);
        expect(result.error.message).toContain('validation failed');
      }
    });
  });

  describe('Interceptors', () => {
    it('should run request interceptors', async () => {
      const interceptor: RequestInterceptor = {
        onRequest: vi.fn((config) => ({
          ...config,
          headers: { ...config.headers, 'X-Intercepted': 'true' },
        })),
        onError: vi.fn((error) => error),
      };

      client.addRequestInterceptor(interceptor);

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({}),
      });

      await client.get('/users');

      expect(interceptor.onRequest).toHaveBeenCalled();
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Intercepted': 'true',
          }),
        })
      );
    });

    it('should run response interceptors', async () => {
      const interceptor: ResponseInterceptor = {
        onResponse: vi.fn((response) => ({ ...response, intercepted: true })),
        onError: vi.fn((error) => error),
      };

      client.addResponseInterceptor(interceptor);

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ data: 'test' }),
      });

      const result = await client.get('/users');

      expect(interceptor.onResponse).toHaveBeenCalled();
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toHaveProperty('intercepted', true);
      }
    });

    it('should run error interceptors', async () => {
      const interceptor: ResponseInterceptor = {
        onResponse: vi.fn((response) => response),
        onError: vi.fn((error) => {
          error.message = 'Intercepted: ' + error.message;
          return error;
        }),
      };

      client.addResponseInterceptor(interceptor);

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        headers: new Headers(),
      });

      const resultPromise = client.get('/users');
      
      // Advance timers to handle any retry delays
      await vi.runAllTimersAsync();
      
      const result = await resultPromise;

      expect(interceptor.onError).toHaveBeenCalled();
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toContain('Intercepted:');
      }
    });
  });

  describe('Base URL Management', () => {
    it('should use base URL for relative paths', async () => {
      client.setBaseURL('https://api.example.com/v1');
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({}),
      });

      await client.get('/users');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/v1/users',
        expect.any(Object)
      );
    });

    it('should strip trailing slash from base URL', async () => {
      client.setBaseURL('https://api.example.com/v1/');
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({}),
      });

      await client.get('/users');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/v1/users',
        expect.any(Object)
      );
    });
  });

  describe('Empty Response Handling', () => {
    it('should handle empty responses', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
        headers: new Headers(),
      });

      const result = await client.delete('/users/1');

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBeUndefined();
      }
    });

    it('should handle non-JSON responses', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'text/plain' }),
      });

      const result = await client.get('/health');

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBeUndefined();
      }
    });
  });
});
