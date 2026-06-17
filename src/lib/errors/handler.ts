/**
 * Error Handler Service
 * Provides centralized error handling, logging, and recovery mechanisms
 * 
 * Validates Requirements: 7.1, 7.2, 7.3, 7.5, 7.10
 */

import { AppError, type ErrorContext } from './base';
import { errorLogger } from './logger';

/**
 * Error handler configuration
 */
interface ErrorHandlerConfig {
  enableMonitoring?: boolean;
  sanitizeErrors?: boolean;
  logLevel?: 'error' | 'warn' | 'info' | 'debug';
}

/**
 * Error Handler Service
 * Centralized error handling with logging, user messaging, and recovery
 */
class ErrorHandlerService {
  private config: ErrorHandlerConfig;

  constructor(config: ErrorHandlerConfig = {}) {
    this.config = {
      enableMonitoring: config.enableMonitoring ?? true,
      sanitizeErrors: config.sanitizeErrors ?? true,
      logLevel: config.logLevel ?? 'error',
    };
  }

  /**
   * Handle an error synchronously
   * Logs the error and returns a user-friendly message
   * 
   * @param error - The error to handle
   * @param context - Additional context about where the error occurred
   * @returns User-friendly error message
   */
  handle(error: Error, context?: ErrorContext): string {
    const appError = this.normalizeError(error);
    
    // Log the error with context
    this.log(appError, context);

    // Return user-friendly message
    return this.getUserMessage(appError);
  }

  /**
   * Handle an error asynchronously
   * Logs the error and optionally sends to monitoring service
   * 
   * @param error - The error to handle
   * @param context - Additional context about where the error occurred
   * @returns Promise resolving to user-friendly error message
   */
  async handleAsync(error: Error, context?: ErrorContext): Promise<string> {
    const appError = this.normalizeError(error);
    
    // Log the error with context
    this.log(appError, context);

    // Send to monitoring service if enabled
    if (this.config.enableMonitoring) {
      await this.logToService(appError, context);
    }

    // Return user-friendly message
    return this.getUserMessage(appError);
  }

  /**
   * Log an error with context
   * 
   * @param error - The error to log
   * @param context - Additional context about where the error occurred
   */
  log(error: AppError, context?: ErrorContext): void {
    errorLogger.error(error, context);
  }

  /**
   * Send error to monitoring service
   * In production, this would integrate with services like Sentry, DataDog, etc.
   * 
   * @param error - The error to log
   * @param context - Additional context about where the error occurred
   */
  async logToService(error: AppError, context?: ErrorContext): Promise<void> {
    try {
      // TODO: Integrate with error monitoring service (e.g., Sentry)
      // For now, just log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.error('[Error Monitoring]', {
          error: error.toJSON(),
          context,
          stack: error.stack,
        });
      }

      // In production, send to monitoring service:
      // await monitoringService.captureException(error, {
      //   tags: {
      //     component: context?.component,
      //     action: context?.action,
      //   },
      //   user: context?.userId ? { id: context.userId } : undefined,
      //   extra: {
      //     ...error.context,
      //     ...context?.metadata,
      //   },
      // });
    } catch (loggingError) {
      // Don't let logging errors crash the application
      console.error('Failed to log error to monitoring service:', loggingError);
    }
  }

  /**
   * Get a user-friendly error message
   * Sanitizes technical details to prevent information leakage
   * 
   * @param error - The error to get message for
   * @returns User-friendly error message
   */
  getUserMessage(error: AppError): string {
    if (this.config.sanitizeErrors) {
      // Use the error's built-in user message
      return error.getUserMessage();
    }
    
    // In development, return the actual error message
    return error.message;
  }

  /**
   * Determine if an error can be recovered from
   * 
   * @param error - The error to check
   * @returns True if the error is retryable
   */
  canRecover(error: AppError): boolean {
    return error.isRetryable();
  }

  /**
   * Attempt to recover from an error
   * For retryable errors, this can trigger retry logic
   * 
   * @param error - The error to recover from
   * @param retryFn - Function to retry
   * @param maxRetries - Maximum number of retry attempts
   * @returns Promise resolving when recovery succeeds or fails
   */
  async recover<T>(
    error: AppError,
    retryFn: () => Promise<T>,
    maxRetries: number = 3
  ): Promise<T> {
    if (!this.canRecover(error)) {
      throw error;
    }

    let lastError = error;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 30000);
        await this.sleep(delay);

        errorLogger.info(`Retry attempt ${attempt}/${maxRetries}`, {
          metadata: { errorCode: error.code },
        });

        return await retryFn();
      } catch (retryError) {
        lastError = this.normalizeError(retryError as Error);
        
        if (!this.canRecover(lastError)) {
          // Error is no longer retryable
          throw lastError;
        }
      }
    }

    // All retries exhausted
    errorLogger.error(lastError, {
      metadata: { retriesExhausted: true, maxRetries },
    });
    
    throw lastError;
  }

  /**
   * Normalize any error to an AppError
   * Converts unknown errors to a standard format
   * 
   * @param error - The error to normalize
   * @returns Normalized AppError
   */
  private normalizeError(error: Error): AppError {
    if (error instanceof AppError) {
      return error;
    }

    // Convert unknown errors to a generic AppError
    // We'll create a GenericError class for this purpose
    return new GenericError(error.message, {
      originalError: error.name,
      stack: error.stack,
    });
  }

  /**
   * Sleep for a specified duration
   * Used for retry backoff
   * 
   * @param ms - Milliseconds to sleep
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Generic error for unknown error types
 * Used when normalizing non-AppError errors
 */
class GenericError extends AppError {
  readonly code = 'GENERIC_ERROR';
  readonly statusCode = 500;

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp.toISOString(),
      context: this.context,
    };
  }

  isRetryable(): boolean {
    return false;
  }

  getUserMessage(): string {
    return 'An unexpected error occurred. Please try again.';
  }
}

// Export singleton instance
export const errorHandler = new ErrorHandlerService();

// Export class for testing
export { ErrorHandlerService };
