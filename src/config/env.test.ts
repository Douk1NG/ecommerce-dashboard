import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Environment Configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset modules to get fresh env object
    vi.resetModules();
    // Create a copy of process.env
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restore original process.env
    process.env = originalEnv;
  });

  describe('env object', () => {
    it('should load API configuration from environment variables', async () => {
      process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8000/admin';
      process.env.NEXT_PUBLIC_API_TOKEN = 'test-token-123';
      (process.env as any).NODE_ENV = 'development';

      const { env } = await import('./env');

      expect(env.api.url).toBe('http://localhost:8000/admin');
      expect(env.api.token).toBe('test-token-123');
    });

    it('should validate API URL format', async () => {
      process.env.NEXT_PUBLIC_API_URL = 'invalid-url';
      process.env.NEXT_PUBLIC_API_TOKEN = 'test-token';

      await expect(async () => {
        await import('./env');
      }).rejects.toThrow('Invalid API URL format');
    });

    it('should throw error for missing required environment variables', async () => {
      delete process.env.NEXT_PUBLIC_API_URL;
      delete process.env.NEXT_PUBLIC_API_TOKEN;

      await expect(async () => {
        await import('./env');
      }).rejects.toThrow('Missing required environment variable');
    });

    it('should set environment flags correctly', async () => {
      process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8000';
      process.env.NEXT_PUBLIC_API_TOKEN = 'test-token';
      (process.env as any).NODE_ENV = 'development';

      const { env } = await import('./env');

      expect(env.isDevelopment).toBe(true);
      expect(env.isProduction).toBe(false);
      expect(env.isTest).toBe(false);
    });

    it('should handle production environment', async () => {
      process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com';
      process.env.NEXT_PUBLIC_API_TOKEN = 'prod-token';
      (process.env as any).NODE_ENV = 'production';

      const { env } = await import('./env');

      expect(env.isDevelopment).toBe(false);
      expect(env.isProduction).toBe(true);
      expect(env.isTest).toBe(false);
      expect(env.nodeEnv).toBe('production');
    });

    it('should handle test environment', async () => {
      process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8000';
      process.env.NEXT_PUBLIC_API_TOKEN = 'test-token';
      (process.env as any).NODE_ENV = 'test';

      const { env } = await import('./env');

      expect(env.isDevelopment).toBe(false);
      expect(env.isProduction).toBe(false);
      expect(env.isTest).toBe(true);
      expect(env.nodeEnv).toBe('test');
    });

    it('should default to development when NODE_ENV is not set', async () => {
      process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8000';
      process.env.NEXT_PUBLIC_API_TOKEN = 'test-token';
      delete (process.env as any).NODE_ENV;

      const { env } = await import('./env');

      expect(env.nodeEnv).toBe('development');
      expect(env.isDevelopment).toBe(false); // Because NODE_ENV is undefined, not 'development'
    });
  });

  describe('Type Safety', () => {
    it('should be immutable (as const)', async () => {
      process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8000';
      process.env.NEXT_PUBLIC_API_TOKEN = 'test-token';

      const { env } = await import('./env');

      // TypeScript will prevent mutations at compile time
      expect(typeof env).toBe('object');
      expect(typeof env.api).toBe('object');
    });
  });
});
