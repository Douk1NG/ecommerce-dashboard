/**
 * Tests for API Client Interceptors
 * 
 * Tests authentication token injection, logging, and session management
 */

import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import {
  AuthenticationInterceptor,
  LoggingInterceptor,
  SessionManagementInterceptor,
  createDefaultInterceptors,
} from '../interceptors';
import type { RequestConfig } from '../client';
import { APIError, errorLogger, errorHandler } from '../../errors';

// Mock the error logger and handler
vi.mock('../../errors', async () => {
  const actual = await vi.importActual('../../errors');
  return {
    ...actual,
    errorLogger: {
      warn: vi.fn(),
      debug: vi.fn(),
      error: vi.fn(),
      info: vi.fn(),
    },
    errorHandler: {
      handle: vi.fn(),
      handleAsync: vi.fn(),
    },
  };
});

describe('AuthenticationInterceptor', () => {
  let tokenProvider: Mock<() => Promise<string | null>>;
  let interceptor: AuthenticationInterceptor;

  beforeEach(() => {
    tokenProvider = vi.fn<() => Promise<string | null>>();
    interceptor = new AuthenticationInterceptor(tokenProvider);
    vi.clearAllMocks();
  });

  describe('onRequest', () => {
    it('should inject authentication token into request headers', async () => {
      const token = 'test-token-123';
      tokenProvider.mockResolvedValue(token);

      const config: RequestConfig = {
        headers: { 'Content-Type': 'application/json' },
      };

      const result = await interceptor.onRequest(config);

      expect(result.headers).toEqual({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      expect(tokenProvider).toHaveBeenCalledOnce();
    });

    it('should not modify headers when token is null', async () => {
      tokenProvider.mockResolvedValue(null);

      const config: RequestConfig = {
        headers: { 'Content-Type': 'application/json' },
      };

      const result = await interceptor.onRequest(config);

      expect(result.headers).toEqual({
        'Content-Type': 'application/json',
      });
      expect(result.headers).not.toHaveProperty('Authorization');
    });

    it('should not modify headers when token is empty string', async () => {
      tokenProvider.mockResolvedValue('');

      const config: RequestConfig = {
        headers: { 'Content-Type': 'application/json' },
      };

      const result = await interceptor.onRequest(config);

      expect(result.headers).toEqual({
        'Content-Type': 'application/json',
      });
      expect(result.headers).not.toHaveProperty('Authorization');
    });

    it('should handle missing headers in config', async () => {
      const token = 'test-token-123';
      tokenProvider.mockResolvedValue(token);

      const config: RequestConfig = {};

      const result = await interceptor.onRequest(config);

      expect(result.headers).toEqual({
        Authorization: `Bearer ${token}`,
      });
    });

    it('should preserve existing Authorization header if token provider fails', async () => {
      tokenProvider.mockRejectedValue(new Error('Token provider failed'));

      const config: RequestConfig = {
        headers: { Authorization: 'Bearer existing-token' },
      };

      const result = await interceptor.onRequest(config);

      expect(result.headers).toEqual({
        Authorization: 'Bearer existing-token',
      });
      expect(errorLogger.warn).toHaveBeenCalledWith(
        'Failed to retrieve authentication token',
        expect.objectContaining({
          action: 'AuthenticationInterceptor.onRequest',
        })
      );
    });

    it('should not block request if token provider throws', async () => {
      tokenProvider.mockRejectedValue(new Error('Network error'));

      const config: RequestConfig = {
        headers: { 'Content-Type': 'application/json' },
      };

      const result = await interceptor.onRequest(config);

      expect(result).toEqual(config);
      expect(errorLogger.warn).toHaveBeenCalled();
    });
  });

  describe('onError', () => {
    it('should pass through errors unchanged', async () => {
      const error = new Error('Test error');

      const result = await interceptor.onError(error);

      expect(result).toBe(error);
    });
  });
});

describe('LoggingInterceptor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('onResponse', () => {
    it('should log successful requests in development mode', async () => {
      const interceptor = new LoggingInterceptor(true);
      const response = { data: 'test' };

      const result = await interceptor.onResponse(response);

      expect(result).toBe(response);
      expect(errorLogger.debug).toHaveBeenCalledWith(
        'API request succeeded',
        expect.objectContaining({
          action: 'LoggingInterceptor.onResponse',
        })
      );
    });

    it('should not log successful requests when disabled', async () => {
      const interceptor = new LoggingInterceptor(false);
      const response = { data: 'test' };

      const result = await interceptor.onResponse(response);

      expect(result).toBe(response);
      expect(errorLogger.debug).not.toHaveBeenCalled();
    });

    it('should handle null responses', async () => {
      const interceptor = new LoggingInterceptor(true);

      const result = await interceptor.onResponse(null);

      expect(result).toBeNull();
      expect(errorLogger.debug).toHaveBeenCalled();
    });

    it('should handle undefined responses', async () => {
      const interceptor = new LoggingInterceptor(true);

      const result = await interceptor.onResponse(undefined);

      expect(result).toBeUndefined();
      expect(errorLogger.debug).toHaveBeenCalled();
    });
  });

  describe('onError', () => {
    it('should log API errors with full context', async () => {
      const interceptor = new LoggingInterceptor();
      const error = new APIError('Request failed', 500, '/api/products');

      const result = await interceptor.onError(error);

      expect(result).toBe(error);
      expect(errorLogger.error).toHaveBeenCalledWith(
        error,
        expect.objectContaining({
          action: 'LoggingInterceptor.onError',
          component: 'APIClient',
          metadata: expect.objectContaining({
            statusCode: 500,
            retryable: true,
          }),
        })
      );
    });

    it('should log endpoint from error context', async () => {
      const interceptor = new LoggingInterceptor();
      const error = new APIError('Not found', 404, '/api/users/123', {
        endpoint: '/api/users/123',
      });

      await interceptor.onError(error);

      expect(errorLogger.error).toHaveBeenCalledWith(
        error,
        expect.objectContaining({
          metadata: expect.objectContaining({
            endpoint: '/api/users/123',
          }),
        })
      );
    });

    it('should handle errors without context', async () => {
      const interceptor = new LoggingInterceptor();
      const error = new APIError('Generic error', 500, '/api/test');

      await interceptor.onError(error);

      expect(errorLogger.error).toHaveBeenCalledWith(
        error,
        expect.objectContaining({
          action: 'LoggingInterceptor.onError',
          component: 'APIClient',
          metadata: expect.objectContaining({
            endpoint: 'unknown',
            statusCode: 500,
            retryable: true,
          }),
        })
      );
    });
  });
});

describe('SessionManagementInterceptor', () => {
  let onUnauthorized: Mock<() => Promise<void>>;
  let interceptor: SessionManagementInterceptor;

  beforeEach(() => {
    onUnauthorized = vi.fn<() => Promise<void>>();
    interceptor = new SessionManagementInterceptor(onUnauthorized);
    vi.clearAllMocks();
  });

  describe('onResponse', () => {
    it('should pass through successful responses', async () => {
      const response = { data: 'test' };

      const result = await interceptor.onResponse(response);

      expect(result).toBe(response);
      expect(onUnauthorized).not.toHaveBeenCalled();
    });
  });

  describe('onError', () => {
    it('should trigger session refresh on 401 error', async () => {
      const error = new APIError('Unauthorized', 401, '/api/products');

      const result = await interceptor.onError(error);

      expect(result).toBe(error);
      expect(onUnauthorized).toHaveBeenCalledOnce();
      expect(errorLogger.info).toHaveBeenCalledWith(
        'Session refresh triggered due to 401 error',
        expect.objectContaining({
          action: 'SessionManagementInterceptor.onError',
        })
      );
    });

    it('should not trigger session refresh on non-401 errors', async () => {
      const error = new APIError('Server error', 500, '/api/products');

      const result = await interceptor.onError(error);

      expect(result).toBe(error);
      expect(onUnauthorized).not.toHaveBeenCalled();
    });

    it('should not trigger session refresh on 403 error', async () => {
      const error = new APIError('Forbidden', 403, '/api/admin');

      const result = await interceptor.onError(error);

      expect(result).toBe(error);
      expect(onUnauthorized).not.toHaveBeenCalled();
    });

    it('should handle multiple simultaneous 401 errors', async () => {
      // Simulate a slow refresh operation
      onUnauthorized.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      const error1 = new APIError('Unauthorized', 401, '/api/products');
      const error2 = new APIError('Unauthorized', 401, '/api/categories');

      // Trigger both errors simultaneously
      const [result1, result2] = await Promise.all([
        interceptor.onError(error1),
        interceptor.onError(error2),
      ]);

      expect(result1).toBe(error1);
      expect(result2).toBe(error2);
      // Should only call onUnauthorized once, not twice
      expect(onUnauthorized).toHaveBeenCalledOnce();
    });

    it('should handle refresh callback failure gracefully', async () => {
      onUnauthorized.mockRejectedValue(new Error('Refresh failed'));

      const error = new APIError('Unauthorized', 401, '/api/products');

      const result = await interceptor.onError(error);

      expect(result).toBe(error);
      // The error handler is called with the refresh error, not the original 401 error
      expect(errorHandler.handle).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          action: 'SessionManagementInterceptor.handleUnauthorized',
          component: 'APIClient',
        })
      );
    });

    it('should reset refresh state after completion', async () => {
      const error1 = new APIError('Unauthorized', 401, '/api/products');
      const error2 = new APIError('Unauthorized', 401, '/api/categories');

      // First 401 error
      await interceptor.onError(error1);
      expect(onUnauthorized).toHaveBeenCalledTimes(1);

      // Second 401 error after first completes
      await interceptor.onError(error2);
      expect(onUnauthorized).toHaveBeenCalledTimes(2);
    });

    it('should log endpoint information from error context', async () => {
      const error = new APIError('Unauthorized', 401, '/api/users/profile', {
        endpoint: '/api/users/profile',
      });

      await interceptor.onError(error);

      expect(errorLogger.info).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          metadata: expect.objectContaining({
            endpoint: '/api/users/profile',
          }),
        })
      );
    });
  });
});

describe('createDefaultInterceptors', () => {
  it('should create request and response interceptors', () => {
    const tokenProvider = vi.fn<() => Promise<string | null>>().mockResolvedValue('token');
    const onUnauthorized = vi.fn<() => Promise<void>>().mockResolvedValue(undefined);

    const interceptors = createDefaultInterceptors(tokenProvider, onUnauthorized);

    expect(interceptors.requestInterceptors).toHaveLength(1);
    expect(interceptors.responseInterceptors).toHaveLength(2);
    expect(interceptors.requestInterceptors[0]).toBeInstanceOf(AuthenticationInterceptor);
    expect(interceptors.responseInterceptors[0]).toBeInstanceOf(LoggingInterceptor);
    expect(interceptors.responseInterceptors[1]).toBeInstanceOf(SessionManagementInterceptor);
  });

  it('should create interceptors with provided callbacks', async () => {
    const token = 'test-token';
    const tokenProvider = vi.fn<() => Promise<string | null>>().mockResolvedValue(token);
    const onUnauthorized = vi.fn<() => Promise<void>>().mockResolvedValue(undefined);

    const { requestInterceptors, responseInterceptors } = createDefaultInterceptors(
      tokenProvider,
      onUnauthorized
    );

    // Test authentication interceptor
    const config = await requestInterceptors[0]!.onRequest({});
    expect(config.headers?.['Authorization']).toBe(`Bearer ${token}`);

    // Test session management interceptor
    const error = new APIError('Unauthorized', 401, '/api/test');
    await responseInterceptors[1]!.onError(error);
    expect(onUnauthorized).toHaveBeenCalled();
  });
});
