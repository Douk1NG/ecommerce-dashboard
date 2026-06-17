# API Client Interceptors Usage Guide

This document explains how to use the API client interceptors for authentication, logging, and session management.

## Overview

The API client supports three types of interceptors:

1. **AuthenticationInterceptor** - Automatically injects authentication tokens into requests
2. **LoggingInterceptor** - Logs all API requests and responses for debugging
3. **SessionManagementInterceptor** - Handles 401 errors by triggering session refresh or logout

## Quick Start

### Basic Setup with Default Interceptors

```typescript
import { apiClient, createDefaultInterceptors } from '@/lib/api';

// Define your token provider (e.g., from cookies or session storage)
async function getAuthToken(): Promise<string | null> {
  // Example: Get token from cookies
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('auth_token='))
    ?.split('=')[1];
  
  return token || null;
}

// Define what happens when a 401 error occurs
async function handleUnauthorized(): Promise<void> {
  // Option 1: Try to refresh the session
  try {
    await refreshSession();
  } catch (error) {
    // Option 2: Redirect to login if refresh fails
    window.location.href = '/login';
  }
}

// Create and add interceptors
const { requestInterceptors, responseInterceptors } = createDefaultInterceptors(
  getAuthToken,
  handleUnauthorized
);

// Add request interceptors
requestInterceptors.forEach(interceptor => {
  apiClient.addRequestInterceptor(interceptor);
});

// Add response interceptors
responseInterceptors.forEach(interceptor => {
  apiClient.addResponseInterceptor(interceptor);
});

// Configure base URL
apiClient.setBaseURL(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api');
```

### Using the Configured Client

Once interceptors are configured, all API calls automatically include authentication:

```typescript
import { apiClient } from '@/lib/api';

// GET request - token automatically injected
const result = await apiClient.get('/products');

if (result.success) {
  console.log('Products:', result.data);
} else {
  console.error('Error:', result.error);
}

// POST request - token automatically injected
const createResult = await apiClient.post('/products', {
  name: 'New Product',
  price: 29.99
});
```

## Individual Interceptor Usage

### Authentication Interceptor

Injects Bearer tokens into the Authorization header:

```typescript
import { apiClient, AuthenticationInterceptor } from '@/lib/api';

// Create interceptor with token provider
const authInterceptor = new AuthenticationInterceptor(async () => {
  // Your logic to get the current auth token
  return localStorage.getItem('auth_token');
});

// Add to client
apiClient.addRequestInterceptor(authInterceptor);

// Now all requests include: Authorization: Bearer <token>
```

**Features:**
- Automatically adds `Authorization: Bearer <token>` header
- Handles null/empty tokens gracefully (no header added)
- Doesn't block requests if token retrieval fails
- Logs warnings when token provider fails

### Logging Interceptor

Logs all API requests and responses:

```typescript
import { apiClient, LoggingInterceptor } from '@/lib/api';

// Enable logging for all requests (useful in development)
const loggingInterceptor = new LoggingInterceptor(true);

// Or disable success logging (production mode)
const productionLoggingInterceptor = new LoggingInterceptor(false);

apiClient.addResponseInterceptor(loggingInterceptor);
```

**Features:**
- Logs successful responses (configurable)
- Always logs error responses with full context
- Includes endpoint, status code, and retry information
- Integrates with the error logger for consistent formatting

**Log Output Example:**
```
[2024-01-15T10:30:45.123Z] [DEBUG] [action=LoggingInterceptor.onResponse] API request succeeded
[2024-01-15T10:30:50.456Z] [ERROR] [action=LoggingInterceptor.onError, component=APIClient] Request failed
```

### Session Management Interceptor

Handles 401 Unauthorized errors:

```typescript
import { apiClient, SessionManagementInterceptor } from '@/lib/api';
import { redirect } from 'next/navigation';

// Create interceptor with unauthorized handler
const sessionInterceptor = new SessionManagementInterceptor(async () => {
  // Option 1: Try to refresh the session
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Refresh failed');
    }
  } catch (error) {
    // Option 2: Redirect to login
    redirect('/login');
  }
});

apiClient.addResponseInterceptor(sessionInterceptor);
```

**Features:**
- Automatically detects 401 errors
- Triggers session refresh or logout
- Prevents multiple simultaneous refresh attempts
- Logs session refresh events
- Handles refresh failures gracefully

## Advanced Usage

### Custom Token Provider with Caching

```typescript
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

async function getAuthToken(): Promise<string | null> {
  // Return cached token if still valid
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }
  
  // Fetch new token
  const response = await fetch('/api/auth/token');
  const data = await response.json();
  
  cachedToken = data.token;
  tokenExpiry = Date.now() + (data.expiresIn * 1000);
  
  return cachedToken;
}
```

### Server-Side Usage (Next.js Server Actions)

```typescript
import { cookies } from 'next/headers';
import { apiClient, AuthenticationInterceptor } from '@/lib/api';

// Server-side token provider
async function getServerAuthToken(): Promise<string | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;
  return token || null;
}

// Create server-side client
const serverApiClient = new APIClient();
serverApiClient.setBaseURL(process.env.API_URL!);
serverApiClient.addRequestInterceptor(
  new AuthenticationInterceptor(getServerAuthToken)
);

// Use in server actions
export async function getProducts() {
  'use server';
  
  const result = await serverApiClient.get('/products');
  return result;
}
```

### Conditional Logging

```typescript
import { LoggingInterceptor } from '@/lib/api';

// Only log in development or when debug flag is set
const shouldLog = 
  process.env.NODE_ENV === 'development' || 
  process.env.NEXT_PUBLIC_DEBUG === 'true';

const loggingInterceptor = new LoggingInterceptor(shouldLog);
```

### Multiple Session Handlers

```typescript
import { SessionManagementInterceptor } from '@/lib/api';

async function handleUnauthorized(): Promise<void> {
  // 1. Clear local state
  localStorage.removeItem('user');
  
  // 2. Try to refresh
  try {
    await fetch('/api/auth/refresh', { method: 'POST' });
    return; // Success - continue
  } catch (error) {
    // Refresh failed
  }
  
  // 3. Notify user
  toast.error('Your session has expired. Please log in again.');
  
  // 4. Redirect to login
  window.location.href = '/login?expired=true';
}
```

## Integration with Next.js App Router

### Client Component Setup

```typescript
// app/providers.tsx
'use client';

import { useEffect } from 'react';
import { apiClient, createDefaultInterceptors } from '@/lib/api';
import { useRouter } from 'next/navigation';

export function APIProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  useEffect(() => {
    // Setup interceptors once on mount
    const { requestInterceptors, responseInterceptors } = createDefaultInterceptors(
      async () => {
        // Get token from cookies
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('auth_token='))
          ?.split('=')[1];
        return token || null;
      },
      async () => {
        // Handle unauthorized - redirect to login
        router.push('/login');
      }
    );
    
    requestInterceptors.forEach(i => apiClient.addRequestInterceptor(i));
    responseInterceptors.forEach(i => apiClient.addResponseInterceptor(i));
    
    apiClient.setBaseURL(process.env.NEXT_PUBLIC_API_URL!);
  }, [router]);
  
  return <>{children}</>;
}
```

```typescript
// app/layout.tsx
import { APIProvider } from './providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <APIProvider>
          {children}
        </APIProvider>
      </body>
    </html>
  );
}
```

### Server Action Setup

```typescript
// lib/api/server.ts
import { cookies } from 'next/headers';
import { APIClient, AuthenticationInterceptor } from '@/lib/api';

export function createServerAPIClient(): APIClient {
  const client = new APIClient();
  
  client.setBaseURL(process.env.API_URL!);
  
  client.addRequestInterceptor(
    new AuthenticationInterceptor(async () => {
      const cookieStore = cookies();
      return cookieStore.get('auth_token')?.value || null;
    })
  );
  
  return client;
}
```

## Testing

### Mocking Interceptors in Tests

```typescript
import { describe, it, expect, vi } from 'vitest';
import { apiClient, AuthenticationInterceptor } from '@/lib/api';

describe('API with interceptors', () => {
  it('should include auth token in requests', async () => {
    const mockTokenProvider = vi.fn().mockResolvedValue('test-token');
    const authInterceptor = new AuthenticationInterceptor(mockTokenProvider);
    
    apiClient.addRequestInterceptor(authInterceptor);
    
    // Make request
    await apiClient.get('/test');
    
    expect(mockTokenProvider).toHaveBeenCalled();
  });
});
```

## Best Practices

1. **Initialize Once**: Set up interceptors once at application startup, not on every request
2. **Token Caching**: Cache tokens to avoid unnecessary lookups
3. **Error Handling**: Always handle token provider failures gracefully
4. **Logging**: Disable success logging in production to reduce noise
5. **Session Refresh**: Implement proper session refresh logic before redirecting to login
6. **Server vs Client**: Use different interceptor configurations for server and client
7. **Testing**: Mock interceptors in tests to avoid real API calls

## Troubleshooting

### Token Not Being Injected

**Problem**: Requests don't include Authorization header

**Solutions**:
- Verify token provider is returning a non-null value
- Check that interceptor is added before making requests
- Ensure token provider doesn't throw errors (check logs)

### Multiple Session Refreshes

**Problem**: Session refresh triggered multiple times for concurrent requests

**Solution**: The SessionManagementInterceptor automatically prevents this by tracking refresh state. Ensure you're using a single interceptor instance.

### Logging Not Working

**Problem**: No logs appearing in console

**Solutions**:
- Check that LoggingInterceptor is configured with `true` for success logging
- Verify error logger is properly configured
- Check console log level settings

## Related Documentation

- [API Client Documentation](./README.md)
- [Error Handling](../errors/README.md)
- [Authentication Module](../../features/auth/README.md)
