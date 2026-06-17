/**
 * Tests for base error class
 */

import { describe, it, expect } from 'vitest';
import { AppError } from './base';

// Concrete implementation for testing
class TestError extends AppError {
  readonly code = 'TEST_ERROR';
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
    return 'Test error occurred';
  }
}

describe('AppError', () => {
  it('should create error with message', () => {
    const error = new TestError('Test message');

    expect(error.message).toBe('Test message');
    expect(error.code).toBe('TEST_ERROR');
    expect(error.statusCode).toBe(500);
  });

  it('should create error with context', () => {
    const context = { userId: '123', action: 'test' };
    const error = new TestError('Test message', context);

    expect(error.context).toEqual(context);
  });

  it('should set timestamp', () => {
    const before = new Date();
    const error = new TestError('Test message');
    const after = new Date();

    expect(error.timestamp.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(error.timestamp.getTime()).toBeLessThanOrEqual(after.getTime());
  });

  it('should set error name to constructor name', () => {
    const error = new TestError('Test message');

    expect(error.name).toBe('TestError');
  });

  it('should have stack trace', () => {
    const error = new TestError('Test message');

    expect(error.stack).toBeDefined();
    expect(error.stack).toContain('TestError');
  });

  it('should convert to JSON', () => {
    const context = { userId: '123' };
    const error = new TestError('Test message', context);
    const json = error.toJSON();

    expect(json.code).toBe('TEST_ERROR');
    expect(json.message).toBe('Test message');
    expect(json.statusCode).toBe(500);
    expect(json.timestamp).toBeDefined();
    expect(json.context).toEqual(context);
  });

  it('should indicate if retryable', () => {
    const error = new TestError('Test message');

    expect(error.isRetryable()).toBe(false);
  });

  it('should provide user message', () => {
    const error = new TestError('Test message');

    expect(error.getUserMessage()).toBe('Test error occurred');
  });
});
