/**
 * API Client Setup Example
 * 
 * This file demonstrates how to configure the API client with interceptors
 * for a real application. This is an example file and should be adapted
 * to your specific authentication and session management needs.
 * 
 * DO NOT import this file directly. Copy and adapt the patterns to your app.
 */

import { apiClient, createDefaultInterceptors } from './index';

/**
 * Example: Client-side setup for browser environment
 * 
 * This would typically be called once when the application initializes,
 * such as in a root layout component or app provider.
 */
export function setupClientAPIClient() {
  // Token provider: Get auth token from cookies
  async function getAuthToken(): Promise<string | null> {
    // Example: Parse auth token from document cookies
    const cookies = document.cookie.split('; ');
    const authCookie = cookies.find(row => row.startsWith('auth_token='));
    
    if (authCookie) {
      const token = authCookie.split('=')[1];
      return token || null;
    }
    
    return null;
  }

  // Unauthorized handler: Redirect to login on 401 errors
  async function handleUnauthorized(): Promise<void> {
    // Option 1: Try to refresh the session first
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include', // Include cookies
      });

      if (response.ok) {
        // Session refreshed successfully
        console.log('Session refreshed successfully');
        return;
      }
    } catch (error) {
      console.error('Session refresh failed:', error);
    }

    // Option 2: Clear local state and redirect to login
    // Clear any local storage
    localStorage.removeItem('user');
    sessionStorage.clear();

    // Redirect to login page
    const currentPath = window.location.pathname;
    const loginUrl = `/login?redirect=${encodeURIComponent(currentPath)}`;
    window.location.href = loginUrl;
  }

  // Create and configure interceptors
  const { requestInterceptors, responseInterceptors } = createDefaultInterceptors(
    getAuthToken,
    handleUnauthorized
  );

  // Add interceptors to the client
  requestInterceptors.forEach(interceptor => {
    apiClient.addRequestInterceptor(interceptor);
  });

  responseInterceptors.forEach(interceptor => {
    apiClient.addResponseInterceptor(interceptor);
  });

  // Configure base URL from environment
  const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  apiClient.setBaseURL(baseURL);

  // Set any default headers
  apiClient.setDefaultHeaders({
    'Content-Type': 'application/json',
    'X-Client-Version': process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  });

  console.log('API client configured with interceptors');
}

/**
 * Example: Server-side setup for Next.js server components/actions
 * 
 * This creates a new API client instance for server-side use.
 * Each request should create its own client to avoid sharing state.
 */
export async function createServerAPIClient() {
  // Import server-only modules
  const { cookies } = await import('next/headers');
  const { APIClient, AuthenticationInterceptor } = await import('./index');

  // Create a new client instance for this request
  const serverClient = new APIClient();

  // Token provider: Get auth token from server-side cookies
  async function getServerAuthToken(): Promise<string | null> {
    try {
      const cookieStore = await cookies();
      const authCookie = cookieStore.get('auth_token');
      return authCookie?.value || null;
    } catch (error) {
      console.error('Failed to read auth token from cookies:', error);
      return null;
    }
  }

  // Add authentication interceptor
  const authInterceptor = new AuthenticationInterceptor(getServerAuthToken);
  serverClient.addRequestInterceptor(authInterceptor);

  // Configure base URL (use internal URL for server-to-server communication)
  const baseURL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  serverClient.setBaseURL(baseURL);

  // Set server-specific headers
  serverClient.setDefaultHeaders({
    'Content-Type': 'application/json',
    'X-Server-Request': 'true',
  });

  return serverClient;
}

/**
 * Example: React Provider Component for Client-Side Setup
 * 
 * This component sets up the API client once when the app mounts.
 * Use this in your root layout or app component.
 */
export function APIClientProvider({ children }: { children: React.ReactNode }) {
  // Setup interceptors on mount
  React.useEffect(() => {
    setupClientAPIClient();
  }, []);

  return <>{children}</>;
}

/**
 * Example: Usage in a Server Action
 */
export async function exampleServerAction() {
  'use server';

  // Create a server-side API client for this request
  const apiClient = await createServerAPIClient();

  // Make authenticated API calls
  const result = await apiClient.get('/products');

  if (result.success) {
    return result.data;
  } else {
    throw new Error(result.error.message);
  }
}

/**
 * Example: Usage in a Client Component
 */
export function ExampleClientComponent() {
  const [products, setProducts] = React.useState<Array<{id: string; name: string}>>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        // Use the configured global client
        const result = await apiClient.get('/products');

        if (result.success) {
          setProducts(result.data as Array<{id: string; name: string}>);
        } else {
          console.error('Failed to fetch products:', result.error);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

/**
 * Example: Custom Interceptor for Request ID Tracking
 * 
 * This shows how to create a custom interceptor for adding
 * request IDs to all API calls for tracing.
 */
export class RequestIDInterceptor implements RequestInterceptor {
  async onRequest(config: RequestConfig): Promise<RequestConfig> {
    // Generate a unique request ID
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return {
      ...config,
      headers: {
        ...config.headers,
        'X-Request-ID': requestId,
      },
    };
  }

  async onError(error: Error): Promise<Error> {
    return error;
  }
}

/**
 * Example: Setup with Custom Interceptors
 */
export function setupWithCustomInterceptors() {
  // Get default interceptors
  const { requestInterceptors, responseInterceptors } = createDefaultInterceptors(
    async () => document.cookie.split('auth_token=')[1]?.split(';')[0] || null,
    async () => { window.location.href = '/login'; }
  );

  // Add custom request ID interceptor
  const requestIdInterceptor = new RequestIDInterceptor();
  apiClient.addRequestInterceptor(requestIdInterceptor);

  // Add default interceptors
  requestInterceptors.forEach(i => apiClient.addRequestInterceptor(i));
  responseInterceptors.forEach(i => apiClient.addResponseInterceptor(i));

  // Configure client
  apiClient.setBaseURL(process.env.NEXT_PUBLIC_API_URL!);
}

// Note: Import React at the top of the file when using these examples
import * as React from 'react';
import type { RequestInterceptor, RequestConfig } from './client';
