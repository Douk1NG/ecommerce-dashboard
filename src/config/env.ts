/**
 * Environment Configuration
 * 
 * Provides typed access to environment variables with validation.
 * All environment variables should be accessed through this module
 * to ensure type safety and proper validation.
 */

/**
 * Environment variable schema
 */
interface EnvironmentVariables {
  /** Base URL for the API backend */
  NEXT_PUBLIC_API_URL: string;
  /** API authentication token */
  NEXT_PUBLIC_API_TOKEN: string;
  /** Node environment (development, production, test) */
  NODE_ENV: 'development' | 'production' | 'test';
}

/**
 * Validates that a required environment variable exists
 * @throws {Error} If the environment variable is not set
 */
function getRequiredEnv(key: keyof EnvironmentVariables): string {
  const value = process.env[key];
  
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
      `Please check your .env.local file.`
    );
  }
  
  return value;
}

/**
 * Gets an optional environment variable with a default value
 */
function getOptionalEnv(
  key: keyof EnvironmentVariables,
  defaultValue: string
): string {
  return process.env[key] || defaultValue;
}

/**
 * Validates the API URL format
 */
function validateApiUrl(url: string): string {
  try {
    new URL(url);
    return url;
  } catch {
    throw new Error(
      `Invalid API URL format: ${url}. ` +
      `Please provide a valid URL in NEXT_PUBLIC_API_URL.`
    );
  }
}

/**
 * Environment configuration object
 * 
 * All environment variables are validated and typed here.
 * Access environment variables through this object instead of process.env.
 */
export const env = {
  /** API configuration */
  api: {
    /** Base URL for API requests */
    url: validateApiUrl(getRequiredEnv('NEXT_PUBLIC_API_URL')),
    /** API authentication token */
    token: getRequiredEnv('NEXT_PUBLIC_API_TOKEN'),
  },
  
  /** Application environment */
  nodeEnv: (process.env.NODE_ENV || 'development') as EnvironmentVariables['NODE_ENV'],
  
  /** Environment checks */
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
} as const;

/**
 * Type-safe environment variable access
 */
export type Env = typeof env;
