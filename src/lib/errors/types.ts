/**
 * Error type hierarchy for the application
 * Provides specific error classes for different error scenarios
 */

import { AppError, type ErrorResponse } from './base';

/**
 * ValidationError - Thrown when data validation fails
 * Status Code: 400 Bad Request
 */
export class ValidationError extends AppError {
  readonly code = 'VALIDATION_ERROR';
  readonly statusCode = 400;

  constructor(
    message: string,
    public readonly fields: Record<string, string[]>,
    context?: Record<string, unknown>
  ) {
    super(message, context);
  }

  toJSON(): ErrorResponse {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      fields: this.fields,
      timestamp: this.timestamp.toISOString(),
      context: this.context,
    };
  }

  isRetryable(): boolean {
    return false; // Validation errors require user correction
  }

  getUserMessage(): string {
    return 'Please fix the errors in the form and try again.';
  }
}

/**
 * APIError - Thrown when API requests fail
 * Status Code: Variable based on API response
 * 
 * Retry Behavior:
 * - Retryable: 5xx server errors (500, 502, 503, 504, etc.) and 429 rate limit errors
 * - Non-retryable: 4xx client errors (400, 401, 403, 404, 422, etc.) except 429
 */
export class APIError extends AppError {
  readonly code = 'API_ERROR';

  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly endpoint: string,
    context?: Record<string, unknown>
  ) {
    super(message, context);
  }

  toJSON(): ErrorResponse {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp.toISOString(),
      context: {
        ...this.context,
        endpoint: this.endpoint,
      },
    };
  }

  /**
   * Determines if this error should be retried
   * 
   * Retryable errors:
   * - 5xx server errors (500, 502, 503, 504, etc.) - Server-side issues that may be transient
   * - 429 rate limit errors - Client should wait and retry
   * 
   * Non-retryable errors:
   * - 4xx client errors (except 429) - Client-side issues that won't be fixed by retrying
   * 
   * @returns true if the request should be retried, false otherwise
   */
  isRetryable(): boolean {
    // Retry on server errors (5xx) or rate limiting (429)
    return this.statusCode >= 500 || this.statusCode === 429;
  }

  getUserMessage(): string {
    if (this.statusCode >= 500) {
      return 'A server error occurred. Please try again later.';
    }
    if (this.statusCode === 429) {
      return 'Too many requests. Please wait a moment and try again.';
    }
    if (this.statusCode === 404) {
      return 'The requested resource was not found.';
    }
    return 'An error occurred while processing your request.';
  }
}

/**
 * AuthenticationError - Thrown when authentication fails
 * Status Code: 401 Unauthorized
 */
export class AuthenticationError extends AppError {
  readonly code = 'AUTHENTICATION_ERROR';
  readonly statusCode = 401;

  constructor(message: string = 'Authentication required', context?: Record<string, unknown>) {
    super(message, context);
  }

  toJSON(): ErrorResponse {
    return {
      code: this.code,
      message: 'Authentication required',
      statusCode: this.statusCode,
      timestamp: this.timestamp.toISOString(),
    };
  }

  isRetryable(): boolean {
    return false; // User must re-authenticate
  }

  getUserMessage(): string {
    return 'Please log in to continue.';
  }
}

/**
 * AuthorizationError - Thrown when user lacks required permissions
 * Status Code: 403 Forbidden
 */
export class AuthorizationError extends AppError {
  readonly code = 'AUTHORIZATION_ERROR';
  readonly statusCode = 403;

  constructor(
    message: string = 'Insufficient permissions',
    public readonly requiredPermission?: string,
    context?: Record<string, unknown>
  ) {
    super(message, context);
  }

  toJSON(): ErrorResponse {
    return {
      code: this.code,
      message: 'Insufficient permissions',
      statusCode: this.statusCode,
      timestamp: this.timestamp.toISOString(),
      context: this.requiredPermission
        ? { ...this.context, requiredPermission: this.requiredPermission }
        : this.context,
    };
  }

  isRetryable(): boolean {
    return false; // User needs different permissions
  }

  getUserMessage(): string {
    return 'You do not have permission to perform this action.';
  }
}

/**
 * NotFoundError - Thrown when a requested resource is not found
 * Status Code: 404 Not Found
 */
export class NotFoundError extends AppError {
  readonly code = 'NOT_FOUND_ERROR';
  readonly statusCode = 404;

  constructor(
    public readonly resourceType: string,
    public readonly resourceId: string | number,
    context?: Record<string, unknown>
  ) {
    super(`${resourceType} with id ${resourceId} not found`, context);
  }

  toJSON(): ErrorResponse {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp.toISOString(),
      context: {
        ...this.context,
        resourceType: this.resourceType,
        resourceId: this.resourceId,
      },
    };
  }

  isRetryable(): boolean {
    return false; // Resource doesn't exist
  }

  getUserMessage(): string {
    return `The requested ${this.resourceType.toLowerCase()} was not found.`;
  }
}
