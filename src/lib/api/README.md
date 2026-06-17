# Centralized API Client

The centralized API client provides a consistent interface for all HTTP requests with built-in retry logic, error handling, and request/response interceptors.

## Features

- **Consistent HTTP Interface**: Unified methods for GET, POST, PUT, PATCH, DELETE
- **Automatic Retry Logic**: Exponential backoff for transient failures
- **Error Handling**: Comprehensive error classification and handling
- **Request/Response Interceptors**: Extensible middleware for authentication, logging, etc.
- **Schema Validation**: Zod schema validation for API responses
- **Request Cancellation**: AbortSignal support for cancelling in-flight requests
- **Timeout Management**: Configurable request timeouts

## Basic Usage

```typescript
import { apiClient } from '@/lib/api/client';

// Configure base URL (typically done once at app initialization)
apiClient.setBaseURL('https://api.example.com');

// Make a GET request
const result = await apiClient.get('/users/1');
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}

// Make a POST request with data
const createResult = await apiClient.post('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});
```

## Retry Logic

The API client implements automatic retry with exponential backoff for transient failures.

### Retryable Errors

The following errors will be automatically retried:

- **5xx Server Errors** (500, 502, 503, 504, etc.)
  - These indicate server-side issues that may be transient
  - Examples: Service temporarily unavailable, gateway timeout
  
- **429 Rate Limit Errors**
  - Indicates too many requests
  - Client should wait and retry

### Non-Retryable Errors

The following errors will NOT be retried:

- **4xx Client Errors** (except 429)
  - 400 Bad Request - Invalid request data
  - 401 Unauthorized - Authentication required
  - 403 Forbidden - Insufficient permissions
  - 404 Not Found - Resource doesn't exist
  - 422 Unprocessable Entity - Validation failed
  - These indicate client-side issues that won't be fixed by retrying

### Exponential Backoff

Retry delays follow an exponential backoff pattern:

```
Attempt 1: Immediate (no delay)
Attempt 2: 1 second delay   (2^0 * 1000ms)
Attempt 3: 2 seconds delay  (2^1 * 1000ms)
Attempt 4: 4 seconds delay  (2^2 * 1000ms)
Attempt 5: 8 seconds delay  (2^3 * 1000ms)
Attempt 6: 16 seconds delay (2^4 * 1000ms)
Attempt 7+: 30 seconds delay (capped at maximum)
```

The maximum delay is capped at 30 seconds to prevent excessive wait times.

### Configuring Retries

```typescript
// Default: 3 retries (4 total attempts)
const result = await apiClient.get('/users');

// Custom retry count
const result = await apiClient.get('/users', { retries: 5 });

// Disable retries
const result = await apiClient.get('/users', { retries: 0 });
```

### Retry Example

```typescript
// This request will automatically retry on 503 errors
const result = await apiClient.get('/users', { retries: 3 });

// Timeline:
// Attempt 1: Immediate - fails with 503
// Attempt 2: After 1s delay - fails with 503
// Attempt 3: After 2s delay - fails with 503
// Attempt 4: After 4s delay - succeeds
// Total time: ~7 seconds
```

## Error Handling

All errors are converted to `APIError` instances with consistent structure:

```typescript
interface APIError {
  code: string;           // Error code (e.g., 'API_ERROR')
  message: string;        // Error message
  statusCode: number;     // HTTP status code
  endpoint: string;       // Request endpoint
  timestamp: Date;        // When error occurred
  context?: object;       // Additional error context
  
  isRetryable(): boolean; // Whether error should be retried
  getUserMessage(): string; // User-friendly error message
}
```

### Error Classification

```typescript
const result = await apiClient.get('/users/999');

if (!result.success) {
  const error = result.error;
  
  // Check if error is retryable
  if (error.isRetryable()) {
    console.log('Transient error - will retry automatically');
  }
  
  // Get user-friendly message
  console.log(error.getUserMessage());
  
  // Check specific error types
  if (error.statusCode === 404) {
    console.log('Resource not found');
  } else if (error.statusCode >= 500) {
    console.log('Server error');
  }
}
```

### Error Types by Status Code

| Status Code | Error Type | Retryable | User Message |
|-------------|------------|-----------|--------------|
| 400 | Bad Request | No | "An error occurred while processing your request." |
| 401 | Unauthorized | No | "Please log in to continue." |
| 403 | Forbidden | No | "You do not have permission to perform this action." |
| 404 | Not Found | No | "The requested resource was not found." |
| 422 | Validation Error | No | "Please fix the errors in the form and try again." |
| 429 | Rate Limit | Yes | "Too many requests. Please wait a moment and try again." |
| 500-599 | Server Error | Yes | "A server error occurred. Please try again later." |

## Request Configuration

### Custom Headers

```typescript
// Per-request headers
const result = await apiClient.get('/users', {
  headers: {
    'X-Custom-Header': 'value'
  }
});

// Default headers for all requests
apiClient.setDefaultHeaders({
  'Authorization': 'Bearer token123'
});
```

### Query Parameters

```typescript
const result = await apiClient.get('/users', {
  params: {
    page: 1,
    limit: 10,
    active: true
  }
});
// Requests: /users?page=1&limit=10&active=true
```

### Timeout

```typescript
// Default timeout: 30 seconds
const result = await apiClient.get('/users');

// Custom timeout
const result = await apiClient.get('/users', {
  timeout: 5000 // 5 seconds
});
```

### Request Cancellation

```typescript
const controller = new AbortController();

// Start request
const resultPromise = apiClient.get('/users', {
  signal: controller.signal
});

// Cancel request
controller.abort();

const result = await resultPromise;
// result.success === false
// result.error.message === 'Request was cancelled'
```

## Schema Validation

Validate API responses using Zod schemas:

```typescript
import { z } from 'zod';

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email()
});

const result = await apiClient.get('/users/1', {
  validateSchema: userSchema
});

if (result.success) {
  // result.data is typed and validated
  console.log(result.data.name);
} else {
  // Validation failed
  console.error('Invalid response format');
}
```

## Interceptors

Interceptors allow you to modify requests and responses globally.

### Request Interceptor

```typescript
import { RequestInterceptor } from '@/lib/api/client';

const authInterceptor: RequestInterceptor = {
  onRequest: async (config) => {
    // Add authentication token
    const token = await getAuthToken();
    return {
      ...config,
      headers: {
        ...config.headers,
        'Authorization': `Bearer ${token}`
      }
    };
  },
  onError: (error) => {
    console.error('Request interceptor error:', error);
    return error;
  }
};

apiClient.addRequestInterceptor(authInterceptor);
```

### Response Interceptor

```typescript
import { ResponseInterceptor } from '@/lib/api/client';

const loggingInterceptor: ResponseInterceptor = {
  onResponse: (response) => {
    console.log('Response received:', response);
    return response;
  },
  onError: (error) => {
    console.error('API Error:', error.message);
    // Send to error monitoring service
    errorMonitoring.captureError(error);
    return error;
  }
};

apiClient.addResponseInterceptor(loggingInterceptor);
```

## Advanced Examples

### Retry with Custom Configuration

```typescript
// High-priority request with aggressive retries
const result = await apiClient.post('/critical-operation', data, {
  retries: 5,           // More retry attempts
  timeout: 60000,       // Longer timeout (60s)
  headers: {
    'X-Priority': 'high'
  }
});
```

### Handling Different Error Scenarios

```typescript
const result = await apiClient.get('/users/1');

if (!result.success) {
  const error = result.error;
  
  switch (error.statusCode) {
    case 401:
      // Redirect to login
      router.push('/login');
      break;
      
    case 403:
      // Show permission error
      toast.error('You do not have permission to view this user');
      break;
      
    case 404:
      // Show not found page
      router.push('/404');
      break;
      
    case 429:
      // Rate limited - already retried automatically
      toast.error('Too many requests. Please try again later.');
      break;
      
    case 500:
    case 502:
    case 503:
    case 504:
      // Server error - already retried automatically
      toast.error('Server error. Please try again later.');
      break;
      
    default:
      // Generic error
      toast.error('An unexpected error occurred');
  }
}
```

### Combining with React Query

```typescript
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const result = await apiClient.get('/users');
      if (!result.success) {
        throw result.error;
      }
      return result.data;
    },
    // React Query will handle additional retries on top of API client retries
    retry: false, // Disable React Query retries since API client handles it
  });
}
```

## Best Practices

### 1. Configure Base URL Once

```typescript
// In app initialization (e.g., _app.tsx or layout.tsx)
apiClient.setBaseURL(process.env.NEXT_PUBLIC_API_URL);
```

### 2. Use Interceptors for Cross-Cutting Concerns

```typescript
// Authentication
apiClient.addRequestInterceptor(authInterceptor);

// Logging
apiClient.addResponseInterceptor(loggingInterceptor);

// Error monitoring
apiClient.addResponseInterceptor(errorMonitoringInterceptor);
```

### 3. Always Handle Both Success and Error Cases

```typescript
const result = await apiClient.get('/users');

if (result.success) {
  // Handle success
  setUsers(result.data);
} else {
  // Handle error
  setError(result.error.getUserMessage());
}
```

### 4. Use Schema Validation for Type Safety

```typescript
// Define schema once
const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email()
});

// Use in requests
const result = await apiClient.get('/users/1', {
  validateSchema: userSchema
});
// result.data is fully typed and validated
```

### 5. Set Appropriate Retry Counts

```typescript
// Read operations: More retries acceptable
const users = await apiClient.get('/users', { retries: 3 });

// Write operations: Fewer retries to avoid duplicates
const created = await apiClient.post('/users', data, { retries: 1 });

// Idempotent operations: Safe to retry
const updated = await apiClient.put('/users/1', data, { retries: 3 });
```

### 6. Use Request Cancellation for User-Initiated Actions

```typescript
function SearchComponent() {
  const [controller, setController] = useState<AbortController | null>(null);
  
  const search = async (query: string) => {
    // Cancel previous request
    controller?.abort();
    
    // Create new controller
    const newController = new AbortController();
    setController(newController);
    
    // Make request
    const result = await apiClient.get('/search', {
      params: { q: query },
      signal: newController.signal
    });
    
    if (result.success) {
      setResults(result.data);
    }
  };
  
  return <input onChange={(e) => search(e.target.value)} />;
}
```

## Requirements Validation

This implementation validates the following requirements:

- **Requirement 3.1**: Single interface for all HTTP requests ✓
- **Requirement 3.6**: Request cancellation support ✓
- **Requirement 3.7**: Retry logic with exponential backoff ✓
- **Requirement 3.4**: Error logging with request context ✓
- **Requirement 3.5**: 401 handling (via interceptors) ✓
- **Requirement 3.9**: Response schema validation with Zod ✓

## Testing

The API client includes comprehensive unit tests covering:

- All HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Retry logic with exponential backoff
- Error handling for different status codes
- Request and response interceptors
- Schema validation
- Request cancellation
- Timeout handling
- Query parameters and headers

Run tests:

```bash
npm test -- src/lib/api/client.test.ts
```

## Related Documentation

- [Error Handling](../errors/README.md) - Error types and handling strategies
- [Authentication](../../features/auth/README.md) - Authentication interceptor setup
- [React Query Integration](../cache/README.md) - Caching and data fetching patterns
