/**
 * Centralized API Client Module
 * Provides a single interface for all HTTP requests with consistent error handling
 * 
 * Validates Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.9
 */

// Export the API client class and default instance
export { APIClient, apiClient } from './client';

// Export types and interfaces
export type {
  Result,
  RequestConfig,
  RequestInterceptor,
  ResponseInterceptor,
} from './client';

// Export interceptors
export {
  AuthenticationInterceptor,
  LoggingInterceptor,
  SessionManagementInterceptor,
  createDefaultInterceptors,
} from './interceptors';
