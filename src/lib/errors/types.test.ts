/**
 * Tests for error type hierarchy
 */

import { describe, it, expect } from 'vitest';
import {
  ValidationError,
  APIError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
} from './types';

describe('ValidationError', () => {
  it('should create validation error with fields', () => {
    const fields = {
      email: ['Invalid email format'],
      password: ['Password too short'],
    };
    const error = new ValidationError('Validation failed', fields);

    expect(error.message).toBe('Validation failed');
    expect(error.fields).toEqual(fields);
    expect(error.code).toBe('VALIDATION_ERROR');
    expect(error.statusCode).toBe(400);
  });

  it('should not be retryable', () => {
    const error = new ValidationError('Validation failed', {});

    expect(error.isRetryable()).toBe(false);
  });

  it('should provide user-friendly message', () => {
    const error = new ValidationError('Validation failed', {});

    expect(error.getUserMessage()).toBe(
      'Please fix the errors in the form and try again.'
    );
  });

  it('should convert to JSON with fields', () => {
    const fields = { email: ['Invalid email'] };
    const error = new ValidationError('Validation failed', fields);
    const json = error.toJSON();

    expect(json.code).toBe('VALIDATION_ERROR');
    expect(json.statusCode).toBe(400);
    expect(json.fields).toEqual(fields);
    expect(json.timestamp).toBeDefined();
  });
});

describe('APIError', () => {
  it('should create API error with endpoint', () => {
    const error = new APIError('Request failed', 500, '/api/products');

    expect(error.message).toBe('Request failed');
    expect(error.statusCode).toBe(500);
    expect(error.endpoint).toBe('/api/products');
    expect(error.code).toBe('API_ERROR');
  });

  it('should be retryable for 5xx errors', () => {
    const error = new APIError('Server error', 500, '/api/products');

    expect(error.isRetryable()).toBe(true);
  });

  it('should be retryable for 429 errors', () => {
    const error = new APIError('Rate limited', 429, '/api/products');

    expect(error.isRetryable()).toBe(true);
  });

  it('should not be retryable for 4xx errors', () => {
    const error = new APIError('Bad request', 400, '/api/products');

    expect(error.isRetryable()).toBe(false);
  });

  it('should provide appropriate user message for 5xx', () => {
    const error = new APIError('Server error', 500, '/api/products');

    expect(error.getUserMessage()).toBe(
      'A server error occurred. Please try again later.'
    );
  });

  it('should provide appropriate user message for 429', () => {
    const error = new APIError('Rate limited', 429, '/api/products');

    expect(error.getUserMessage()).toBe(
      'Too many requests. Please wait a moment and try again.'
    );
  });

  it('should provide appropriate user message for 404', () => {
    const error = new APIError('Not found', 404, '/api/products');

    expect(error.getUserMessage()).toBe('The requested resource was not found.');
  });

  it('should convert to JSON with endpoint', () => {
    const error = new APIError('Request failed', 500, '/api/products');
    const json = error.toJSON();

    expect(json.code).toBe('API_ERROR');
    expect(json.statusCode).toBe(500);
    expect(json.context?.endpoint).toBe('/api/products');
  });
});

describe('AuthenticationError', () => {
  it('should create authentication error', () => {
    const error = new AuthenticationError();

    expect(error.message).toBe('Authentication required');
    expect(error.code).toBe('AUTHENTICATION_ERROR');
    expect(error.statusCode).toBe(401);
  });

  it('should create authentication error with custom message', () => {
    const error = new AuthenticationError('Invalid credentials');

    expect(error.message).toBe('Invalid credentials');
  });

  it('should not be retryable', () => {
    const error = new AuthenticationError();

    expect(error.isRetryable()).toBe(false);
  });

  it('should provide user-friendly message', () => {
    const error = new AuthenticationError();

    expect(error.getUserMessage()).toBe('Please log in to continue.');
  });

  it('should sanitize message in JSON', () => {
    const error = new AuthenticationError('Invalid token xyz123');
    const json = error.toJSON();

    expect(json.message).toBe('Authentication required');
  });
});

describe('AuthorizationError', () => {
  it('should create authorization error', () => {
    const error = new AuthorizationError();

    expect(error.message).toBe('Insufficient permissions');
    expect(error.code).toBe('AUTHORIZATION_ERROR');
    expect(error.statusCode).toBe(403);
  });

  it('should create authorization error with required permission', () => {
    const error = new AuthorizationError(
      'Need admin access',
      'admin:write'
    );

    expect(error.message).toBe('Need admin access');
    expect(error.requiredPermission).toBe('admin:write');
  });

  it('should not be retryable', () => {
    const error = new AuthorizationError();

    expect(error.isRetryable()).toBe(false);
  });

  it('should provide user-friendly message', () => {
    const error = new AuthorizationError();

    expect(error.getUserMessage()).toBe(
      'You do not have permission to perform this action.'
    );
  });

  it('should include required permission in JSON', () => {
    const error = new AuthorizationError(
      'Need admin access',
      'admin:write'
    );
    const json = error.toJSON();

    expect(json.context?.requiredPermission).toBe('admin:write');
  });
});

describe('NotFoundError', () => {
  it('should create not found error with resource info', () => {
    const error = new NotFoundError('Product', 123);

    expect(error.message).toBe('Product with id 123 not found');
    expect(error.resourceType).toBe('Product');
    expect(error.resourceId).toBe(123);
    expect(error.code).toBe('NOT_FOUND_ERROR');
    expect(error.statusCode).toBe(404);
  });

  it('should work with string IDs', () => {
    const error = new NotFoundError('User', 'abc-123');

    expect(error.message).toBe('User with id abc-123 not found');
    expect(error.resourceId).toBe('abc-123');
  });

  it('should not be retryable', () => {
    const error = new NotFoundError('Product', 123);

    expect(error.isRetryable()).toBe(false);
  });

  it('should provide user-friendly message', () => {
    const error = new NotFoundError('Product', 123);

    expect(error.getUserMessage()).toBe('The requested product was not found.');
  });

  it('should include resource info in JSON', () => {
    const error = new NotFoundError('Product', 123);
    const json = error.toJSON();

    expect(json.context?.resourceType).toBe('Product');
    expect(json.context?.resourceId).toBe(123);
  });
});
