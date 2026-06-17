/**
 * Error Logger
 * Provides structured logging for errors with different severity levels
 * 
 * Validates Requirements: 7.2, 7.10
 */

import { AppError, type ErrorContext } from './base';

/**
 * Log level enum
 */
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

/**
 * Log entry structure
 */
interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: ErrorContext;
  error?: {
    code: string;
    message: string;
    statusCode?: number;
    stack?: string;
    details?: Record<string, unknown>;
  };
}

/**
 * Logger configuration
 */
interface LoggerConfig {
  minLevel?: LogLevel;
  enableConsole?: boolean;
  enableFile?: boolean;
  sanitizeSensitiveData?: boolean;
}

/**
 * Error Logger Service
 * Provides structured logging with context and sanitization
 */
class ErrorLoggerService {
  private config: LoggerConfig;
  private sensitiveKeys = [
    'password',
    'token',
    'apikey',
    'api_key',
    'secret',
    'authorization',
    'cookie',
    'sessionid',
    'session_id',
  ];

  constructor(config: LoggerConfig = {}) {
    this.config = {
      minLevel: config.minLevel ?? LogLevel.INFO,
      enableConsole: config.enableConsole ?? true,
      enableFile: config.enableFile ?? false,
      sanitizeSensitiveData: config.sanitizeSensitiveData ?? true,
    };
  }

  /**
   * Log an error
   * 
   * @param error - The error to log
   * @param context - Additional context about where the error occurred
   */
  error(error: AppError, context?: ErrorContext): void {
    const logEntry = this.createLogEntry(
      LogLevel.ERROR,
      error.message,
      context,
      error
    );

    this.write(logEntry);
  }

  /**
   * Log a warning
   * 
   * @param message - Warning message
   * @param context - Additional context
   */
  warn(message: string, context?: ErrorContext): void {
    const logEntry = this.createLogEntry(LogLevel.WARN, message, context);
    this.write(logEntry);
  }

  /**
   * Log an info message
   * 
   * @param message - Info message
   * @param context - Additional context
   */
  info(message: string, context?: ErrorContext): void {
    const logEntry = this.createLogEntry(LogLevel.INFO, message, context);
    this.write(logEntry);
  }

  /**
   * Log a debug message
   * 
   * @param message - Debug message
   * @param context - Additional context
   */
  debug(message: string, context?: ErrorContext): void {
    const logEntry = this.createLogEntry(LogLevel.DEBUG, message, context);
    this.write(logEntry);
  }

  /**
   * Create a structured log entry
   * 
   * @param level - Log level
   * @param message - Log message
   * @param context - Additional context
   * @param error - Optional error object
   * @returns Structured log entry
   */
  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: ErrorContext,
    error?: AppError
  ): LogEntry {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
    };

    // Add sanitized context
    if (context) {
      entry.context = this.sanitizeContext(context);
    }

    // Add error details
    if (error) {
      const errorDetails: LogEntry['error'] = {
        code: error.code,
        message: error.message,
        statusCode: error.statusCode,
        stack: this.shouldIncludeStack() ? error.stack : undefined,
      };

      // Sanitize error context if present
      if (error.context) {
        errorDetails.details = this.sanitizeData(error.context);
      }

      entry.error = errorDetails;
    }

    return entry;
  }

  /**
   * Write log entry to configured outputs
   * 
   * @param entry - Log entry to write
   */
  private write(entry: LogEntry): void {
    // Check if log level meets minimum threshold
    if (!this.shouldLog(entry.level)) {
      return;
    }

    // Write to console
    if (this.config.enableConsole) {
      this.writeToConsole(entry);
    }

    // Write to file (if enabled)
    if (this.config.enableFile) {
      this.writeToFile(entry);
    }
  }

  /**
   * Write log entry to console
   * 
   * @param entry - Log entry to write
   */
  private writeToConsole(entry: LogEntry): void {
    const { level, message, timestamp, context, error } = entry;

    // Format the log message
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
    const contextStr = context ? ` [${this.formatContext(context)}]` : '';
    const fullMessage = `${prefix}${contextStr} ${message}`;

    // Use appropriate console method
    switch (level) {
      case LogLevel.ERROR:
        console.error(fullMessage, error || '');
        break;
      case LogLevel.WARN:
        console.warn(fullMessage, error || '');
        break;
      case LogLevel.INFO:
        console.info(fullMessage, error || '');
        break;
      case LogLevel.DEBUG:
        console.debug(fullMessage, error || '');
        break;
    }
  }

  /**
   * Write log entry to file
   * TODO: Implement file logging when needed
   * 
   * @param entry - Log entry to write
   */
  private writeToFile(entry: LogEntry): void {
    // TODO: Implement file logging
    // This would write to a log file in production
    // For now, this is a placeholder
    if (process.env.NODE_ENV === 'development') {
      // In development, we can skip file logging
      return;
    }

    // In production, implement file logging:
    // - Rotate log files by size/date
    // - Compress old logs
    // - Clean up old logs
    // - Use a logging library like winston or pino
  }

  /**
   * Format context for display
   * 
   * @param context - Context to format
   * @returns Formatted context string
   */
  private formatContext(context: ErrorContext): string {
    const parts: string[] = [];

    if (context.component) {
      parts.push(`component=${context.component}`);
    }
    if (context.action) {
      parts.push(`action=${context.action}`);
    }
    if (context.userId) {
      parts.push(`userId=${context.userId}`);
    }

    return parts.join(', ');
  }

  /**
   * Sanitize context to remove sensitive data
   * 
   * @param context - Context to sanitize
   * @returns Sanitized context
   */
  private sanitizeContext(context: ErrorContext): ErrorContext {
    if (!this.config.sanitizeSensitiveData) {
      return context;
    }

    return {
      component: context.component,
      action: context.action,
      userId: context.userId,
      metadata: context.metadata
        ? this.sanitizeData(context.metadata)
        : undefined,
    };
  }

  /**
   * Sanitize data object to remove sensitive information
   * 
   * @param data - Data to sanitize
   * @returns Sanitized data
   */
  private sanitizeData(data: Record<string, unknown>): Record<string, unknown> {
    if (!this.config.sanitizeSensitiveData) {
      return data;
    }

    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(data)) {
      // Check if key contains sensitive information
      if (this.isSensitiveKey(key)) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof value === 'object' && value !== null) {
        // Recursively sanitize nested objects
        sanitized[key] = Array.isArray(value)
          ? value.map((item) =>
              typeof item === 'object' && item !== null
                ? this.sanitizeData(item as Record<string, unknown>)
                : item
            )
          : this.sanitizeData(value as Record<string, unknown>);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  /**
   * Check if a key is sensitive
   * 
   * @param key - Key to check
   * @returns True if key is sensitive
   */
  private isSensitiveKey(key: string): boolean {
    const lowerKey = key.toLowerCase();
    return this.sensitiveKeys.some((sensitiveKey) =>
      lowerKey.includes(sensitiveKey)
    );
  }

  /**
   * Check if a log level should be logged
   * 
   * @param level - Log level to check
   * @returns True if level should be logged
   */
  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO, LogLevel.DEBUG];
    const minLevelIndex = levels.indexOf(this.config.minLevel!);
    const currentLevelIndex = levels.indexOf(level);

    return currentLevelIndex <= minLevelIndex;
  }

  /**
   * Check if stack traces should be included
   * 
   * @returns True if stack traces should be included
   */
  private shouldIncludeStack(): boolean {
    // Include stack traces in development or when debug level is enabled
    return (
      process.env.NODE_ENV === 'development' ||
      this.config.minLevel === LogLevel.DEBUG
    );
  }
}

// Export singleton instance
export const errorLogger = new ErrorLoggerService();

// Export class for testing
export { ErrorLoggerService };
