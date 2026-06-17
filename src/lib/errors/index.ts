/**
 * Error Handling Infrastructure
 * Centralized error handling, logging, and error types
 * 
 * Validates Requirements: 7.1, 7.2, 7.3, 7.5, 7.10
 */

// Base error class and types
export { AppError, type ErrorResponse, type ErrorContext } from './base';

// Error type hierarchy
export {
  ValidationError,
  APIError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
} from './types';

// Error handler service
export { errorHandler, ErrorHandlerService } from './handler';

// Error logger
export { errorLogger, ErrorLoggerService, LogLevel } from './logger';
