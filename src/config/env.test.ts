import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('Environment Configuration', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('env object', () => {
    it('should load database and auth configuration from environment variables', async () => {
      process.env.DATABASE_URL = 'file:./dev.db'
      process.env.AUTH_SECRET = 'test-secret'
      ;(process.env as Record<string, string | undefined>).NODE_ENV = 'development'

      const { env } = await import('./env')

      expect(env.database.url).toBe('file:./dev.db')
      expect(env.auth.secret).toBe('test-secret')
    })

    it('should throw error for missing required environment variables', async () => {
      delete process.env.DATABASE_URL
      delete process.env.AUTH_SECRET

      await expect(async () => {
        await import('./env')
      }).rejects.toThrow('Missing required environment variable')
    })

    it('should set environment flags correctly', async () => {
      process.env.DATABASE_URL = 'file:./dev.db'
      process.env.AUTH_SECRET = 'test-secret'
      ;(process.env as Record<string, string | undefined>).NODE_ENV = 'development'

      const { env } = await import('./env')

      expect(env.isDevelopment).toBe(true)
      expect(env.isProduction).toBe(false)
      expect(env.isTest).toBe(false)
    })
  })
})
