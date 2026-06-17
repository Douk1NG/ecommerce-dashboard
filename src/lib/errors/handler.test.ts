/**
 * Tests for error handler service
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ErrorHandlerService } from './handler';
import { APIError, ValidationError } from './types';
import { errorLogger } from './logger';

// Mock the logger
vi.mock('./logger', () => ({
  errorLogger: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  },
}));

describe('ErrorHandlerService', () => {
  let handler: ErrorHandlerService;

  beforeEach(() => {
    handler = new ErrorHandlerService();
    vi.clearAllMocks();
  });

  describe('handle', () => {
    it('should handle AppError and return user message', () => {
      const error = new ValidationError('Validation failed', {
        email: ['Invalid email'],
      });

      const message = handler.handle(error);

      expect(message).toBe('Please fix the errors in the form and try again.');
      expect(errorLogger.error).toHaveBeenCalledWith(error, undefined);
    });

    it('should handle generic Error and normalize it', () => {
      const error = new Error('Something went wrong');

      const message = handler.handle(error);

      expect(message).toBe('An unexpected error occurred. Please try again.');
      expect(errorLogger.error).toHaveBeenCalled();
    });

    it('should include context when provided', () => {
      const error = new APIError('Request failed', 500, '/api/products');
      const context = {
        component: 'ProductList',
        action: 'fetchProducts',
      };

      handler.handle(error, context);

      expect(errorLogger.error).toHaveBeenCalledWith(error, context);
    });
  });

  describe('handleAsync', () => {
    it('should handle error asynchronously', async () => {
      const error = new APIError('Request failed', 500, '/api/products');

      const message = await handler.handleAsync(error);

      expect(message).toBe('A server error occurred. Please try again later.');
      expect(errorLogger.error).toHaveBeenCalledWith(error, undefined);
    });

    it('should log to monitoring service when enabled', async () => {
      const handler = new ErrorHandlerService({ enableMonitoring: true });
      const error = new APIError('Request failed', 500, '/api/products');

      await handler.handleAsync(error);

      expect(errorLogger.error).toHaveBeenCalled();
    });
  });

  describe('getUserMessage', () => {
    it('should return sanitized message by default', () => {
      const error = new APIError('Internal error details', 500, '/api/products');

      const message = handler.getUserMessage(error);

      expect(message).toBe('A server error occurred. Please try again later.');
    });

    it('should return actual message when sanitization disabled', () => {
      const handler = new ErrorHandlerService({ sanitizeErrors: false });
      const error = new APIError('Internal error details', 500, '/api/products');

      const message = handler.getUserMessage(error);

      expect(message).toBe('Internal error details');
    });
  });

  describe('canRecover', () => {
    it('should return true for retryable errors', () => {
      const error = new APIError('Server error', 500, '/api/products');

      expect(handler.canRecover(error)).toBe(true);
    });

    it('should return false for non-retryable errors', () => {
      const error = new ValidationError('Validation failed', {});

      expect(handler.canRecover(error)).toBe(false);
    });
  });

  describe('recover', () => {
    it('should retry and succeed', async () => {
      const error = new APIError('Server error', 500, '/api/products');
      let attempts = 0;
      const retryFn = vi.fn(async () => {
        attempts++;
        if (attempts === 1) throw error;
        return 'success';
      });

      const result = await handler.recover(error, retryFn, 3);

      expect(result).toBe('success');
      expect(retryFn).toHaveBeenCalledTimes(2);
    });

    it('should throw after max retries', async () => {
      const error = new APIError('Server error', 500, '/api/products');
      const retryFn = vi.fn(async () => {
        throw error;
      });

      await expect(handler.recover(error, retryFn, 2)).rejects.toThrow(error);
      expect(retryFn).toHaveBeenCalledTimes(2);
    });

    it('should not retry non-retryable errors', async () => {
      const error = new ValidationError('Validation failed', {});
      const retryFn = vi.fn();

      await expect(handler.recover(error, retryFn)).rejects.toThrow(error);
      expect(retryFn).not.toHaveBeenCalled();
    });

    it('should stop retrying if error becomes non-retryable', async () => {
      const retryableError = new APIError('Server error', 500, '/api/products');
      const nonRetryableError = new ValidationError('Validation failed', {});
      let attempts = 0;
      const retryFn = vi.fn(async () => {
        attempts++;
        if (attempts === 1) throw retryableError;
        throw nonRetryableError;
      });

      await expect(
        handler.recover(retryableError, retryFn, 3)
      ).rejects.toThrow(nonRetryableError);
      expect(retryFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('log', () => {
    it('should log error with context', () => {
      const error = new APIError('Request failed', 500, '/api/products');
      const context = { component: 'ProductList' };

      handler.log(error, context);

      expect(errorLogger.error).toHaveBeenCalledWith(error, context);
    });
  });

  describe('logToService', () => {
    it('should not throw if logging fails', async () => {
      const error = new APIError('Request failed', 500, '/api/products');

      // Should not throw
      await expect(handler.logToService(error)).resolves.toBeUndefined();
    });
  });
});
