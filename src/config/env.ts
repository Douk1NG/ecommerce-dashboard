/**
 * Environment Configuration
 *
 * Provides typed access to environment variables with validation.
 */

interface EnvironmentVariables {
  DATABASE_URL: string
  AUTH_SECRET: string
  NODE_ENV: 'development' | 'production' | 'test'
}

function getRequiredEnv(key: keyof EnvironmentVariables): string {
  const value = process.env[key]

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
      `Please check your .env.local file.`
    )
  }

  return value
}

export const env = {
  database: {
    url: getRequiredEnv('DATABASE_URL'),
  },

  auth: {
    secret: getRequiredEnv('AUTH_SECRET'),
  },

  nodeEnv: (process.env.NODE_ENV || 'development') as EnvironmentVariables['NODE_ENV'],

  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
} as const

export type Env = typeof env
