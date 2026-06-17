/**
 * Tests for error logger service
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ErrorLoggerService, LogLevel } from './logger';
import { APIError, ValidationError } from './types';

describe('ErrorLoggerService', () => {
  let logger: ErrorLoggerService;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
  let consoleInfoSpy: ReturnType<typeof vi.spyOn>;
  let consoleDebugSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    logger = new ErrorLoggerService();
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('error', () => {
    it('should log error to console', () => {
      const error = new APIError('Request failed', 500, '/api/products');

      logger.error(error);

      expect(consoleErrorSpy).toHaveBeenCalled();
      const logMessage = consoleErrorSpy.mock.calls[0][0] as string;
      expect(logMessage).toContain('[ERROR]');
      expect(logMessage).toContain('Request failed');
    });

    it('should include context in log', () => {
      const error = new APIError('Request failed', 500, '/api/products');
      const context = {
        component: 'ProductList',
        action: 'fetchProducts',
      };

      logger.error(error, context);

      const logMessage = consoleErrorSpy.mock.calls[0][0] as string;
      expect(logMessage).toContain('component=ProductList');
      expect(logMessage).toContain('action=fetchProducts');
    });

    it('should include error details', () => {
      const error = new APIError('Request failed', 500, '/api/products');

      logger.error(error);

      const errorDetails = consoleErrorSpy.mock.calls[0][1];
      expect(errorDetails).toBeDefined();
      expect(errorDetails.code).toBe('API_ERROR');
      expect(errorDetails.statusCode).toBe(500);
    });
  });

  describe('warn', () => {
    it('should log warning to console', () => {
      logger.warn('This is a warning');

      expect(consoleWarnSpy).toHaveBeenCalled();
      const logMessage = consoleWarnSpy.mock.calls[0][0] as string;
      expect(logMessage).toContain('[WARN]');
      expect(logMessage).toContain('This is a warning');
    });
  });

  describe('info', () => {
    it('should log info to console', () => {
      logger.info('This is info');

      expect(consoleInfoSpy).toHaveBeenCalled();
      const logMessage = consoleInfoSpy.mock.calls[0][0] as string;
      expect(logMessage).toContain('[INFO]');
      expect(logMessage).toContain('This is info');
    });
  });

  describe('debug', () => {
    it('should log debug to console when min level is debug', () => {
      const logger = new ErrorLoggerService({ minLevel: LogLevel.DEBUG });

      logger.debug('This is debug');

      expect(consoleDebugSpy).toHaveBeenCalled();
      const logMessage = consoleDebugSpy.mock.calls[0][0] as string;
      expect(logMessage).toContain('[DEBUG]');
      expect(logMessage).toContain('This is debug');
    });

    it('should not log debug when min level is info', () => {
      const logger = new ErrorLoggerService({ minLevel: LogLevel.INFO });

      logger.debug('This is debug');

      expect(consoleDebugSpy).not.toHaveBeenCalled();
    });
  });

  describe('log level filtering', () => {
    it('should only log errors when min level is error', () => {
      const logger = new ErrorLoggerService({ minLevel: LogLevel.ERROR });

      logger.error(new APIError('Error', 500, '/api'));
      logger.warn('Warning');
      logger.info('Info');
      logger.debug('Debug');

      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleWarnSpy).not.toHaveBeenCalled();
      expect(consoleInfoSpy).not.toHaveBeenCalled();
      expect(consoleDebugSpy).not.toHaveBeenCalled();
    });

    it('should log errors and warnings when min level is warn', () => {
      const logger = new ErrorLoggerService({ minLevel: LogLevel.WARN });

      logger.error(new APIError('Error', 500, '/api'));
      logger.warn('Warning');
      logger.info('Info');
      logger.debug('Debug');

      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleWarnSpy).toHaveBeenCalled();
      expect(consoleInfoSpy).not.toHaveBeenCalled();
      expect(consoleDebugSpy).not.toHaveBeenCalled();
    });
  });

  describe('sensitive data sanitization', () => {
    it('should redact password fields', () => {
      const error = new ValidationError(
        'Validation failed',
        {},
        { password: 'secret123' }
      );

      logger.error(error);

      const errorDetails = consoleErrorSpy.mock.calls[0][1];
      expect(errorDetails.details.password).toBe('[REDACTED]');
    });

    it('should redact token fields', () => {
      const error = new APIError('Request failed', 401, '/api/auth', {
        authToken: 'abc123',
      });

      logger.error(error);

      const errorDetails = consoleErrorSpy.mock.calls[0][1];
      expect(errorDetails.details.authToken).toBe('[REDACTED]');
    });

    it('should redact nested sensitive fields', () => {
      const error = new APIError('Request failed', 500, '/api/users', {
        user: {
          name: 'John',
          password: 'secret',
        },
      });

      logger.error(error);

      const errorDetails = consoleErrorSpy.mock.calls[0][1];
      expect(errorDetails.details.user.name).toBe('John');
      expect(errorDetails.details.user.password).toBe('[REDACTED]');
    });

    it('should not sanitize when disabled', () => {
      const logger = new ErrorLoggerService({ sanitizeSensitiveData: false });
      const error = new ValidationError(
        'Validation failed',
        {},
        { password: 'secret123' }
      );

      logger.error(error);

      const errorDetails = consoleErrorSpy.mock.calls[0][1];
      expect(errorDetails.details.password).toBe('secret123');
    });

    it('should redact fields with sensitive keywords', () => {
      const sensitiveData = {
        apiKey: 'key123',
        secret: 'secret123',
        authorization: 'Bearer token',
        cookie: 'session=abc',
        sessionId: 'xyz789',
      };

      const error = new APIError('Request failed', 500, '/api', sensitiveData);

      logger.error(error);

      const errorDetails = consoleErrorSpy.mock.calls[0][1];
      expect(errorDetails.details.apiKey).toBe('[REDACTED]');
      expect(errorDetails.details.secret).toBe('[REDACTED]');
      expect(errorDetails.details.authorization).toBe('[REDACTED]');
      expect(errorDetails.details.cookie).toBe('[REDACTED]');
      expect(errorDetails.details.sessionId).toBe('[REDACTED]');
    });
  });

  describe('timestamp', () => {
    it('should include ISO timestamp in log', () => {
      const error = new APIError('Request failed', 500, '/api/products');

      logger.error(error);

      const logMessage = consoleErrorSpy.mock.calls[0][0] as string;
      // Check for ISO timestamp format (YYYY-MM-DDTHH:mm:ss)
      expect(logMessage).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });
  });

  describe('console output disabled', () => {
    it('should not log to console when disabled', () => {
      const logger = new ErrorLoggerService({ enableConsole: false });
      const error = new APIError('Request failed', 500, '/api/products');

      logger.error(error);

      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
  });
});
