/**
 * Base error class for all application errors
 * Provides common error handling functionality and structure
 */

export interface ErrorResponse {
  code: string;
  message: string;
  statusCode?: number;
  timestamp: string;
  context?: Record<string, unknown>;
  fields?: Record<string, string[]>;
}

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Abstract base class for all application errors
 * Extends the native Error class with additional context and functionality
 */
export abstract class AppError extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: number;
  readonly timestamp: Date;
  readonly context?: Record<string, unknown>;

  constructor(message: string, context?: Record<string, unknown>) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = new Date();
    this.context = context;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Converts the error to a JSON-serializable format
   * Used for API responses and logging
   */
  abstract toJSON(): ErrorResponse;

  /**
   * Determines if the error is retryable
   * Used by retry logic in API client and error handler
   */
  abstract isRetryable(): boolean;

  /**
   * Gets a user-friendly error message
   * Sanitizes technical details to prevent information leakage
   */
  abstract getUserMessage(): string;
}
