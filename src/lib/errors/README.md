# Error Handling Infrastructure

Centralized error handling system for the e-commerce dashboard application.

## Overview

This module provides a comprehensive error handling infrastructure with:
- **Type-safe error hierarchy** for different error scenarios
- **Centralized error handler** with logging and recovery mechanisms
- **Structured logging** with sensitive data sanitization
- **User-friendly error messages** that prevent information leakage

## Requirements Validation

This implementation validates the following requirements:
- **7.1**: Error handler catches all errors at appropriate boundaries
- **7.2**: Errors are logged with contextual information
- **7.3**: User-facing operations display user-friendly error messages
- **7.5**: Distinguishes between recoverable and non-recoverable errors
- **7.10**: Sanitizes error messages to prevent sensitive information leakage

## Components

### Base Error Class (`base.ts`)

Abstract base class for all application errors:

```typescript
import { AppError } from '@/src/lib/errors';

class CustomError extends AppError {
  readonly code = 'CUSTOM_ERROR';
  readonly statusCode = 500;

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp.toISOString(),
    };
  }

  isRetryable(): boolean {
    return false;
  }

  getUserMessage(): string {
    return 'A custom error occurred';
  }
}
```

### Error Types (`types.ts`)

Pre-built error classes for common scenarios:

#### ValidationError (400)
```typescript
import { ValidationError } from '@/src/lib/errors';

throw new ValidationError('Validation failed', {
  email: ['Invalid email format'],
  password: ['Password too short'],
});
```

#### APIError (Variable)
```typescript
import { APIError } from '@/src/lib/errors';

throw new APIError('Request failed', 500, '/api/products');
```

#### AuthenticationError (401)
```typescript
import { AuthenticationError } from '@/src/lib/errors';

throw new AuthenticationError('Invalid credentials');
```

#### AuthorizationError (403)
```typescript
import { AuthorizationError } from '@/src/lib/errors';

throw new AuthorizationError('Insufficient permissions', 'admin:write');
```

#### NotFoundError (404)
```typescript
import { NotFoundError } from '@/src/lib/errors';

throw new NotFoundError('Product', 123);
```

### Error Handler (`handler.ts`)

Centralized error handling service:

```typescript
import { errorHandler } from '@/src/lib/errors';

// Synchronous error handling
try {
  // ... code that might throw
} catch (error) {
  const message = errorHandler.handle(error as Error, {
    component: 'ProductList',
    action: 'fetchProducts',
  });
  // Display message to user
}

// Asynchronous error handling
try {
  // ... async code that might throw
} catch (error) {
  const message = await errorHandler.handleAsync(error as Error, {
    component: 'ProductList',
    action: 'fetchProducts',
    userId: user.id,
  });
  // Display message to user
}

// Error recovery with retry
try {
  await errorHandler.recover(
    error,
    async () => await fetchProducts(),
    3 // max retries
  );
} catch (finalError) {
  // All retries exhausted
}
```

### Error Logger (`logger.ts`)

Structured logging with sensitive data sanitization:

```typescript
import { errorLogger, LogLevel } from '@/src/lib/errors';

// Log an error
errorLogger.error(error, {
  component: 'ProductList',
  action: 'fetchProducts',
  userId: user.id,
});

// Log a warning
errorLogger.warn('Cache miss', {
  component: 'CacheService',
});

// Log info
errorLogger.info('User logged in', {
  userId: user.id,
});

// Log debug (only in development)
errorLogger.debug('Request details', {
  metadata: { url: '/api/products' },
});
```

## Features

### 1. Error Classification

Errors are classified by:
- **Status Code**: HTTP status code for API errors
- **Error Code**: Unique identifier for error type
- **Retryability**: Whether the error can be retried

### 2. User-Friendly Messages

All errors provide sanitized, user-friendly messages:
- Technical details are hidden from users
- Generic messages prevent information leakage
- Specific guidance for recoverable errors

### 3. Contextual Logging

Errors are logged with rich context:
- Component where error occurred
- Action being performed
- User ID (if available)
- Additional metadata

### 4. Sensitive Data Sanitization

The logger automatically redacts sensitive information:
- Passwords
- Tokens
- API keys
- Session IDs
- Authorization headers
- Cookies

### 5. Error Recovery

The error handler supports automatic retry with exponential backoff:
- Configurable max retries
- Exponential backoff (1s, 2s, 4s, ...)
- Only retries recoverable errors

## Configuration

### Error Handler Configuration

```typescript
import { ErrorHandlerService } from '@/src/lib/errors';

const handler = new ErrorHandlerService({
  enableMonitoring: true,      // Send errors to monitoring service
  sanitizeErrors: true,         // Sanitize error messages
  logLevel: 'error',            // Minimum log level
});
```

### Logger Configuration

```typescript
import { ErrorLoggerService, LogLevel } from '@/src/lib/errors';

const logger = new ErrorLoggerService({
  minLevel: LogLevel.INFO,      // Minimum log level
  enableConsole: true,          // Log to console
  enableFile: false,            // Log to file (not implemented)
  sanitizeSensitiveData: true,  // Redact sensitive data
});
```

## Best Practices

### 1. Use Specific Error Types

Use the most specific error type for your scenario:

```typescript
// Good
throw new NotFoundError('Product', productId);

// Avoid
throw new Error('Product not found');
```

### 2. Provide Context

Always provide context when handling errors:

```typescript
// Good
errorHandler.handle(error, {
  component: 'ProductList',
  action: 'fetchProducts',
  userId: user.id,
});

// Avoid
errorHandler.handle(error);
```

### 3. Handle Errors at Boundaries

Catch errors at appropriate boundaries:
- API layer: Network errors, response validation
- Service layer: Business logic errors
- Component layer: Rendering errors (use Error Boundaries)

### 4. Don't Swallow Errors

Always log or handle errors:

```typescript
// Good
try {
  await fetchProducts();
} catch (error) {
  errorHandler.handle(error as Error);
  throw error; // Re-throw if needed
}

// Avoid
try {
  await fetchProducts();
} catch (error) {
  // Silent failure
}
```

### 5. Use Error Recovery Wisely

Only retry recoverable errors:

```typescript
// Good - API error is retryable
if (errorHandler.canRecover(error)) {
  await errorHandler.recover(error, fetchProducts);
}

// Avoid - Validation error is not retryable
await errorHandler.recover(validationError, submitForm);
```

## Testing

All components are fully tested:
- `base.test.ts`: Base error class tests
- `types.test.ts`: Error type hierarchy tests
- `handler.test.ts`: Error handler service tests
- `logger.test.ts`: Error logger service tests

Run tests:
```bash
npm test -- src/lib/errors
```

## Integration

### With API Client

```typescript
import { errorHandler, APIError } from '@/src/lib/errors';

async function fetchProducts() {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new APIError(
        'Failed to fetch products',
        response.status,
        '/api/products'
      );
    }
    return await response.json();
  } catch (error) {
    return errorHandler.handleAsync(error as Error, {
      component: 'ProductService',
      action: 'fetchProducts',
    });
  }
}
```

### With React Components

```typescript
import { errorHandler } from '@/src/lib/errors';

function ProductList() {
  const [error, setError] = useState<string | null>(null);

  async function loadProducts() {
    try {
      const products = await fetchProducts();
      setProducts(products);
    } catch (error) {
      const message = await errorHandler.handleAsync(error as Error, {
        component: 'ProductList',
        action: 'loadProducts',
      });
      setError(message);
    }
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  // ... render products
}
```

### With Server Actions

```typescript
'use server';

import { errorHandler, ValidationError } from '@/src/lib/errors';

export async function createProduct(data: FormData) {
  try {
    // Validate data
    const result = productSchema.safeParse(data);
    if (!result.success) {
      throw new ValidationError(
        'Invalid product data',
        result.error.flatten().fieldErrors
      );
    }

    // Create product
    const product = await db.products.create(result.data);
    return { success: true, data: product };
  } catch (error) {
    const message = await errorHandler.handleAsync(error as Error, {
      action: 'createProduct',
    });
    return { success: false, error: message };
  }
}
```

## Future Enhancements

- [ ] Integration with error monitoring services (Sentry, DataDog)
- [ ] File logging with rotation
- [ ] Error boundaries for React components
- [ ] Error analytics and reporting
- [ ] Custom error pages
- [ ] Error notification system
