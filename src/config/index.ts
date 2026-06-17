/**
 * Configuration Module
 * 
 * Centralized configuration for the application including:
 * - Environment variables (typed and validated)
 * - Application constants (routes, validation, UI settings)
 * 
 * @example
 * ```typescript
 * import { env, ROUTES, PAGINATION } from '@/config';
 * 
 * // Access environment variables
 * const apiUrl = env.api.url;
 * 
 * // Use application constants
 * const loginRoute = ROUTES.auth.login;
 * const pageSize = PAGINATION.defaultPageSize;
 * ```
 */

export * from './env';
export * from './constants';
