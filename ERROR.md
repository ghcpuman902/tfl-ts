# TfL TypeScript Client - Error Handling Guide

This guide provides comprehensive information about error handling in the TfL TypeScript client, including error types, handling strategies, and best practices.

## Quick Start

The TfL TypeScript client provides comprehensive error handling with typed error classes and automatic retry logic. All errors are instances of `TflError` or its subclasses, making it easy to handle different types of errors appropriately.

### Error Types

The client provides several specialized error classes:

- **`TflError`** - Base error class for all TfL API errors
- **`TflHttpError`** - HTTP response errors (4xx, 5xx status codes)
- **`TflNetworkError`** - Network connectivity issues
- **`TflValidationError`** - Invalid parameters or validation failures
- **`TflTimeoutError`** - Request timeout errors
- **`TflConfigError`** - Configuration issues (missing credentials, etc.)

### Basic Error Handling

```typescript
import TflClient, { TflError, TflHttpError, TflNetworkError } from 'tfl-ts';

const client = new TflClient();

const main = async () => {
  try {
    const stopPointSearchResult = await client.stopPoint.search({ 
      query: "Oxford Circus", 
      modes: ['tube'] 
    });
    
    const stopPointId = stopPointSearchResult.matches?.[0]?.id;
    if (!stopPointId) {
      throw new Error(`No stop ID found for the given query: Oxford Circus`);
    }
    
    console.log('Stop ID found:', stopPointId);
  } catch (error) {
    if (error instanceof TflError) {
      console.error('TfL API Error:', error.message);
      console.error('Request ID:', error.requestId);
      console.error('Timestamp:', error.timestamp);
      
      if (error instanceof TflHttpError) {
        console.error('HTTP Status:', error.statusCode);
        console.error('Response Body:', error.responseBody);
        
        if (error.isAuthError()) {
          console.error('Authentication failed - check your API credentials');
        } else if (error.isRateLimitError()) {
          console.error('Rate limit exceeded - try again later');
        } else if (error.isServerError()) {
          console.error('TfL server error - try again later');
        }
      } else if (error instanceof TflNetworkError) {
        console.error('Network error - check your internet connection');
      } else if (error instanceof TflTimeoutError) {
        console.error('Request timeout - try again later');
      }
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

main();
```

### Advanced Error Handling with Retry Logic

The client includes built-in retry logic for transient errors:

```typescript
import TflClient, { TflError, TflHttpError, TflErrorHandler } from 'tfl-ts';

// Configure client with custom retry settings
const client = new TflClient({
  appId: 'your-app-id',
  appKey: 'your-app-key',
  timeout: 30000,        // 30 second timeout
  maxRetries: 3,         // Retry up to 3 times
  retryDelay: 1000       // Start with 1 second delay
});

const main = async () => {
  try {
    // The client automatically retries on:
    // - Network errors
    // - Timeout errors  
    // - Server errors (5xx)
    // - Rate limit errors (429)
    const arrivals = await client.line.getArrivals({
      lineIds: ['central'],
      stopPointId: '940GZZLUOXC'
    });
    
    console.log('Arrivals:', arrivals);
  } catch (error) {
    if (error instanceof TflError) {
      // Check if the error was retryable
      if (TflErrorHandler.isRetryableError(error)) {
        console.error('Error persisted after retries:', error.message);
      } else {
        console.error('Non-retryable error:', error.message);
      }
      
      // Handle specific error types
      if (error instanceof TflHttpError) {
        switch (error.statusCode) {
          case 401:
            console.error('Invalid API credentials');
            break;
          case 403:
            console.error('API access forbidden');
            break;
          case 404:
            console.error('Resource not found');
            break;
          case 429:
            console.error('Rate limit exceeded');
            break;
          case 500:
            console.error('TfL server error');
            break;
          default:
            console.error(`HTTP ${error.statusCode}: ${error.statusText}`);
        }
      }
    }
  }
};

main();
```

### Custom Error Handling Strategies

#### 1. Graceful Degradation

```typescript
const getLineStatus = async (lineIds: string[]) => {
  try {
    return await client.line.getStatus({ ids: lineIds });
  } catch (error) {
    if (error instanceof TflHttpError && error.statusCode === 404) {
      // Return empty array for non-existent lines
      return [];
    }
    if (error instanceof TflNetworkError) {
      // Return cached data if available
      console.warn('Network error, using cached data');
      return getCachedLineStatus(lineIds);
    }
    throw error; // Re-throw other errors
  }
};
```

#### 2. Error Recovery with Fallbacks

```typescript
const getArrivalsWithFallback = async (stopPointId: string) => {
  try {
    // Try to get real-time arrivals
    return await client.stopPoint.getArrivals({ stopPointIds: [stopPointId] });
  } catch (error) {
    if (error instanceof TflHttpError && error.isServerError()) {
      // Fall back to timetable data if real-time fails
      console.warn('Real-time data unavailable, using timetable');
      return await client.line.getTimetable({
        id: 'central',
        fromStopPointId: stopPointId
      });
    }
    throw error;
  }
};
```

#### 3. Batch Error Handling

```typescript
const getMultipleStopPoints = async (stopPointIds: string[]) => {
  const results: any[] = [];
  const errors: TflError[] = [];
  
  // Process in batches to avoid overwhelming the API
  const batchSize = 5;
  for (let i = 0; i < stopPointIds.length; i += batchSize) {
    const batch = stopPointIds.slice(i, i + batchSize);
    
    try {
      const batchResults = await client.stopPoint.get({ stopPointIds: batch });
      results.push(...(Array.isArray(batchResults) ? batchResults : [batchResults]));
    } catch (error) {
      if (error instanceof TflError) {
        errors.push(error);
        console.error(`Batch ${Math.floor(i / batchSize) + 1} failed:`, error.message);
      }
    }
  }
  
  return { results, errors };
};
```

### Error Monitoring and Logging

```typescript
import TflClient, { TflError, TflErrorHandler } from 'tfl-ts';

// Custom error logger
const logError = (error: TflError, context?: string) => {
  const errorInfo = {
    type: error.constructor.name,
    message: error.message,
    requestId: error.requestId,
    timestamp: error.timestamp,
    context,
    ...(error instanceof TflHttpError && {
      statusCode: error.statusCode,
      statusText: error.statusText,
      url: error.url
    }),
    ...(error instanceof TflNetworkError && {
      code: error.code,
      url: error.url
    }),
    ...(error instanceof TflTimeoutError && {
      timeoutMs: error.timeoutMs
    })
  };
  
  // Log to your monitoring service
  console.error('TfL API Error:', errorInfo);
  
  // Send to error tracking service (e.g., Sentry)
  // captureException(error, { extra: errorInfo });
};

const client = new TflClient();

const main = async () => {
  try {
    const status = await client.line.getStatus({ modes: ['tube'] });
    console.log('Line status:', status);
  } catch (error) {
    if (error instanceof TflError) {
      logError(error, 'getLineStatus');
      
      // Track error metrics
      if (error instanceof TflHttpError) {
        // trackHttpError(error.statusCode);
      } else if (error instanceof TflNetworkError) {
        // trackNetworkError();
      }
    }
  }
};

main();
```

### Configuration Error Handling

```typescript
try {
  const client = new TflClient({
    // Missing credentials will throw TflConfigError
  });
} catch (error) {
  if (error instanceof TflConfigError) {
    console.error('Configuration error:', error.message);
    console.error('Missing field:', error.configField);
    
    // Provide helpful setup instructions
    if (error.configField === 'credentials') {
      console.log('Please set up your TfL API credentials:');
      console.log('1. Register at https://api-portal.tfl.gov.uk/');
      console.log('2. Add credentials to your .env file');
      console.log('3. Or pass them directly to the constructor');
    }
  }
}
```

### Best Practices

1. **Always check error types** before handling them
2. **Use specific error handling** for different scenarios
3. **Implement graceful degradation** for non-critical features
4. **Log errors with context** for debugging
5. **Monitor error rates** to detect API issues
6. **Use retry logic** for transient errors
7. **Provide user-friendly error messages** based on error types

### Error Response Examples

```typescript
// HTTP 401 - Authentication Error
TflHttpError {
  name: 'TflHttpError',
  message: 'HTTP 401: Unauthorized',
  statusCode: 401,
  statusText: 'Unauthorized',
  responseBody: { message: 'Invalid API key' }
}

// HTTP 429 - Rate Limit Error  
TflHttpError {
  name: 'TflHttpError',
  message: 'HTTP 429: Too Many Requests',
  statusCode: 429,
  statusText: 'Too Many Requests',
  responseBody: { message: 'Rate limit exceeded' }
}

// Network Error
TflNetworkError {
  name: 'TflNetworkError',
  message: 'Network error: fetch failed',
  code: 'NETWORK_ERROR'
}

// Timeout Error
TflTimeoutError {
  name: 'TflTimeoutError', 
  message: 'Request timeout: The operation was aborted',
  timeoutMs: 30000
}
```

---

## Table of Contents

- [Error Types](#error-types)
- [Basic Error Handling](#basic-error-handling)
- [Advanced Error Handling](#advanced-error-handling)
- [Error Handling Strategies](#error-handling-strategies)
- [Error Monitoring and Logging](#error-monitoring-and-logging)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Error Types

The TfL client provides several specialized error classes that extend the base `TflError`:

### Base Error Class

```typescript
import { TflError } from 'tfl-ts';

// All TfL errors inherit from TflError
class TflError extends Error {
  public readonly isTflError = true;
  public readonly timestamp = new Date();
  public readonly requestId?: string;
  public readonly statusCode?: number;
  public readonly originalError?: Error;
}
```

### HTTP Errors

```typescript
import { TflHttpError } from 'tfl-ts';

// HTTP response errors (4xx, 5xx status codes)
class TflHttpError extends TflError {
  public readonly statusCode: number;
  public readonly statusText: string;
  public readonly responseBody?: any;
  public readonly url?: string;
  
  // Helper methods
  isClientError(): boolean;    // 4xx errors
  isServerError(): boolean;    // 5xx errors
  isAuthError(): boolean;      // 401 errors
  isRateLimitError(): boolean; // 429 errors
}
```

### Network Errors

```typescript
import { TflNetworkError } from 'tfl-ts';

// Network connectivity issues
class TflNetworkError extends TflError {
  public readonly code?: string;
  public readonly url?: string;
}
```

### Validation Errors

```typescript
import { TflValidationError } from 'tfl-ts';

// Invalid parameters or validation failures
class TflValidationError extends TflError {
  public readonly field?: string;
  public readonly value?: any;
}
```

### Timeout Errors

```typescript
import { TflTimeoutError } from 'tfl-ts';

// Request timeout errors
class TflTimeoutError extends TflError {
  public readonly timeoutMs: number;
  public readonly url?: string;
}
```

### Configuration Errors

```typescript
import { TflConfigError } from 'tfl-ts';

// Configuration issues (missing credentials, etc.)
class TflConfigError extends TflError {
  public readonly configField?: string;
}
```

## Basic Error Handling

### Simple Try-Catch

```typescript
import TflClient, { TflError, TflHttpError, TflNetworkError } from 'tfl-ts';

const client = new TflClient();

const getLineStatus = async () => {
  try {
    const status = await client.line.getStatus({ modes: ['tube'] });
    return status;
  } catch (error) {
    if (error instanceof TflError) {
      console.error('TfL API Error:', error.message);
      console.error('Request ID:', error.requestId);
      console.error('Timestamp:', error.timestamp);
      
      if (error instanceof TflHttpError) {
        console.error('HTTP Status:', error.statusCode);
        console.error('Response Body:', error.responseBody);
      } else if (error instanceof TflNetworkError) {
        console.error('Network error - check your internet connection');
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error; // Re-throw to let calling code handle it
  }
};
```

### Error Type Checking

```typescript
const handleError = (error: unknown) => {
  if (error instanceof TflHttpError) {
    switch (error.statusCode) {
      case 401:
        console.error('Authentication failed - check your API credentials');
        break;
      case 403:
        console.error('API access forbidden - check your permissions');
        break;
      case 404:
        console.error('Resource not found - check your parameters');
        break;
      case 429:
        console.error('Rate limit exceeded - try again later');
        break;
      case 500:
        console.error('TfL server error - try again later');
        break;
      default:
        console.error(`HTTP ${error.statusCode}: ${error.statusText}`);
    }
  } else if (error instanceof TflNetworkError) {
    console.error('Network connectivity issue');
    console.error('Error code:', error.code);
    console.error('URL:', error.url);
  } else if (error instanceof TflTimeoutError) {
    console.error('Request timed out');
    console.error('Timeout duration:', error.timeoutMs);
  } else if (error instanceof TflValidationError) {
    console.error('Validation error');
    console.error('Field:', error.field);
    console.error('Value:', error.value);
  } else if (error instanceof TflConfigError) {
    console.error('Configuration error');
    console.error('Config field:', error.configField);
  } else if (error instanceof TflError) {
    console.error('Generic TfL error:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
};
```

## Advanced Error Handling

### Client Configuration with Retry Logic

```typescript
import TflClient, { TflError, TflErrorHandler } from 'tfl-ts';

// Configure client with custom retry settings
const client = new TflClient({
  appId: 'your-app-id',
  appKey: 'your-app-key',
  timeout: 30000,        // 30 second timeout
  maxRetries: 3,         // Retry up to 3 times
  retryDelay: 1000       // Start with 1 second delay
});

const getDataWithRetry = async () => {
  try {
    // The client automatically retries on:
    // - Network errors
    // - Timeout errors  
    // - Server errors (5xx)
    // - Rate limit errors (429)
    const arrivals = await client.line.getArrivals({
      lineIds: ['central'],
      stopPointId: '940GZZLUOXC'
    });
    
    return arrivals;
  } catch (error) {
    if (error instanceof TflError) {
      // Check if the error was retryable
      if (TflErrorHandler.isRetryableError(error)) {
        console.error('Error persisted after retries:', error.message);
      } else {
        console.error('Non-retryable error:', error.message);
      }
    }
    throw error;
  }
};
```

### Custom Retry Logic

```typescript
const retryWithBackoff = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: TflError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      const tflError = TflErrorHandler.handleApiError(error);
      lastError = tflError;
      
      // Don't retry on the last attempt
      if (attempt === maxRetries) {
        break;
      }
      
      // Check if error is retryable
      if (!TflErrorHandler.isRetryableError(tflError)) {
        break;
      }
      
      // Calculate retry delay
      const delay = TflErrorHandler.getRetryDelay(tflError, attempt, baseDelay);
      console.log(`Retry attempt ${attempt + 1}/${maxRetries} in ${delay}ms`);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
};

// Usage
const getArrivalsWithRetry = async () => {
  return retryWithBackoff(async () => {
    return await client.line.getArrivals({
      lineIds: ['central'],
      stopPointId: '940GZZLUOXC'
    });
  });
};
```

## Error Handling Strategies

### 1. Graceful Degradation

```typescript
const getLineStatusWithFallback = async (lineIds: string[]) => {
  try {
    return await client.line.getStatus({ lineIds });
  } catch (error) {
    if (error instanceof TflHttpError && error.statusCode === 404) {
      // Return empty array for non-existent lines
      console.warn('Some lines not found, returning empty array');
      return [];
    }
    if (error instanceof TflNetworkError) {
      // Return cached data if available
      console.warn('Network error, using cached data');
      return getCachedLineStatus(lineIds);
    }
    throw error; // Re-throw other errors
  }
};
```

### 2. Error Recovery with Fallbacks

```typescript
const getArrivalsWithFallback = async (stopPointId: string) => {
  try {
    // Try to get real-time arrivals
    return await client.stopPoint.getArrivals({ stopPointIds: [stopPointId] });
  } catch (error) {
    if (error instanceof TflHttpError && error.isServerError()) {
      // Fall back to timetable data if real-time fails
      console.warn('Real-time data unavailable, using timetable');
      return await client.line.getTimetable({
        id: 'central',
        fromStopPointId: stopPointId
      });
    }
    throw error;
  }
};
```

### 3. Batch Error Handling

```typescript
const getMultipleStopPoints = async (stopPointIds: string[]) => {
  const results: any[] = [];
  const errors: TflError[] = [];
  
  // Process in batches to avoid overwhelming the API
  const batchSize = 5;
  for (let i = 0; i < stopPointIds.length; i += batchSize) {
    const batch = stopPointIds.slice(i, i + batchSize);
    
    try {
      const batchResults = await client.stopPoint.get({ stopPointIds: batch });
      results.push(...(Array.isArray(batchResults) ? batchResults : [batchResults]));
    } catch (error) {
      if (error instanceof TflError) {
        errors.push(error);
        console.error(`Batch ${Math.floor(i / batchSize) + 1} failed:`, error.message);
      }
    }
  }
  
  return { results, errors };
};
```

### 4. Circuit Breaker Pattern

```typescript
class CircuitBreaker {
  private failures = 0;
  private lastFailureTime = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private readonly threshold = 5;
  private readonly timeout = 60000; // 1 minute

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failures = 0;
    this.state = 'CLOSED';
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();
    
    if (this.failures >= this.threshold) {
      this.state = 'OPEN';
    }
  }
}

// Usage
const circuitBreaker = new CircuitBreaker();

const getLineStatusWithCircuitBreaker = async () => {
  return circuitBreaker.execute(async () => {
    return await client.line.getStatus({ modes: ['tube'] });
  });
};
```

### 5. Error Boundary Pattern

```typescript
class ErrorBoundary {
  private errorCount = 0;
  private readonly maxErrors = 10;
  private readonly resetInterval = 60000; // 1 minute

  constructor() {
    setInterval(() => {
      this.errorCount = 0;
    }, this.resetInterval);
  }

  async execute<T>(operation: () => Promise<T>, fallback?: () => T): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      this.errorCount++;
      
      if (this.errorCount > this.maxErrors) {
        console.error('Too many errors, using fallback');
        if (fallback) {
          return fallback();
        }
        throw new Error('Service unavailable due to repeated errors');
      }
      
      throw error;
    }
  }
}

// Usage
const errorBoundary = new ErrorBoundary();

const getArrivalsWithBoundary = async () => {
  return errorBoundary.execute(
    async () => await client.line.getArrivals({
      lineIds: ['central'],
      stopPointId: '940GZZLUOXC'
    }),
    () => [] // Fallback to empty array
  );
};
```

## Error Monitoring and Logging

### Structured Error Logging

```typescript
import TflClient, { TflError, TflErrorHandler } from 'tfl-ts';

// Custom error logger
const logError = (error: TflError, context?: string) => {
  const errorInfo = {
    type: error.constructor.name,
    message: error.message,
    requestId: error.requestId,
    timestamp: error.timestamp,
    context,
    ...(error instanceof TflHttpError && {
      statusCode: error.statusCode,
      statusText: error.statusText,
      url: error.url,
      responseBody: error.responseBody
    }),
    ...(error instanceof TflNetworkError && {
      code: error.code,
      url: error.url
    }),
    ...(error instanceof TflTimeoutError && {
      timeoutMs: error.timeoutMs
    }),
    ...(error instanceof TflValidationError && {
      field: error.field,
      value: error.value
    }),
    ...(error instanceof TflConfigError && {
      configField: error.configField
    })
  };
  
  // Log to your monitoring service
  console.error('TfL API Error:', JSON.stringify(errorInfo, null, 2));
  
  // Send to error tracking service (e.g., Sentry)
  // captureException(error, { extra: errorInfo });
  
  // Send to metrics service
  // trackError(errorInfo);
};

const client = new TflClient();

const main = async () => {
  try {
    const status = await client.line.getStatus({ modes: ['tube'] });
    console.log('Line status:', status);
  } catch (error) {
    if (error instanceof TflError) {
      logError(error, 'getLineStatus');
      
      // Track error metrics
      if (error instanceof TflHttpError) {
        // trackHttpError(error.statusCode);
      } else if (error instanceof TflNetworkError) {
        // trackNetworkError();
      }
    }
  }
};
```

### Error Metrics Collection

```typescript
class ErrorMetrics {
  private metrics = {
    totalErrors: 0,
    httpErrors: 0,
    networkErrors: 0,
    timeoutErrors: 0,
    validationErrors: 0,
    configErrors: 0,
    statusCodes: {} as Record<number, number>,
    errorTimestamps: [] as number[]
  };

  recordError(error: TflError): void {
    this.metrics.totalErrors++;
    this.metrics.errorTimestamps.push(Date.now());
    
    if (error instanceof TflHttpError) {
      this.metrics.httpErrors++;
      this.metrics.statusCodes[error.statusCode] = 
        (this.metrics.statusCodes[error.statusCode] || 0) + 1;
    } else if (error instanceof TflNetworkError) {
      this.metrics.networkErrors++;
    } else if (error instanceof TflTimeoutError) {
      this.metrics.timeoutErrors++;
    } else if (error instanceof TflValidationError) {
      this.metrics.validationErrors++;
    } else if (error instanceof TflConfigError) {
      this.metrics.configErrors++;
    }
  }

  getMetrics() {
    return {
      ...this.metrics,
      errorRate: this.calculateErrorRate(),
      mostCommonStatusCodes: this.getMostCommonStatusCodes()
    };
  }

  private calculateErrorRate(): number {
    const now = Date.now();
    const oneHourAgo = now - 3600000;
    const recentErrors = this.metrics.errorTimestamps.filter(t => t > oneHourAgo);
    return recentErrors.length / 60; // errors per minute
  }

  private getMostCommonStatusCodes(): Array<{ statusCode: number; count: number }> {
    return Object.entries(this.metrics.statusCodes)
      .map(([statusCode, count]) => ({ statusCode: parseInt(statusCode), count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }
}

// Usage
const errorMetrics = new ErrorMetrics();

const handleErrorWithMetrics = (error: TflError) => {
  errorMetrics.recordError(error);
  logError(error);
  
  // Log metrics periodically
  console.log('Error metrics:', errorMetrics.getMetrics());
};
```

## Best Practices

### 1. Always Check Error Types

```typescript
// ❌ Bad - generic error handling
try {
  await client.line.getStatus({ modes: ['tube'] });
} catch (error) {
  console.error('Error:', error);
}

// ✅ Good - specific error handling
try {
  await client.line.getStatus({ modes: ['tube'] });
} catch (error) {
  if (error instanceof TflHttpError) {
    if (error.isAuthError()) {
      console.error('Authentication failed');
    } else if (error.isRateLimitError()) {
      console.error('Rate limit exceeded');
    }
  } else if (error instanceof TflNetworkError) {
    console.error('Network connectivity issue');
  }
}
```

### 2. Provide User-Friendly Messages

```typescript
const getUserFriendlyMessage = (error: TflError): string => {
  if (error instanceof TflHttpError) {
    switch (error.statusCode) {
      case 401:
        return 'Please check your API credentials';
      case 403:
        return 'You do not have permission to access this resource';
      case 404:
        return 'The requested information was not found';
      case 429:
        return 'Too many requests. Please try again in a few minutes';
      case 500:
        return 'TfL service is temporarily unavailable. Please try again later';
      default:
        return 'An error occurred while fetching data';
    }
  } else if (error instanceof TflNetworkError) {
    return 'Please check your internet connection and try again';
  } else if (error instanceof TflTimeoutError) {
    return 'The request took too long. Please try again';
  } else if (error instanceof TflValidationError) {
    return 'Please check your input and try again';
  } else if (error instanceof TflConfigError) {
    return 'Please check your configuration settings';
  }
  return 'An unexpected error occurred';
};
```

### 3. Implement Proper Retry Logic

```typescript
const retryOperation = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> => {
  let lastError: TflError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      const tflError = TflErrorHandler.handleApiError(error);
      lastError = tflError;
      
      if (attempt === maxRetries || !TflErrorHandler.isRetryableError(tflError)) {
        break;
      }
      
      const delay = TflErrorHandler.getRetryDelay(tflError, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
};
```

### 4. Use Error Boundaries for Critical Operations

```typescript
const criticalOperation = async () => {
  const errorBoundary = new ErrorBoundary();
  
  return errorBoundary.execute(
    async () => {
      // Critical operation that must not fail
      return await client.line.getStatus({ modes: ['tube'] });
    },
    () => {
      // Fallback for critical data
      return getCachedLineStatus();
    }
  );
};
```

### 5. Monitor Error Rates

```typescript
const monitorErrorRates = () => {
  const errorMetrics = new ErrorMetrics();
  
  setInterval(() => {
    const metrics = errorMetrics.getMetrics();
    
    if (metrics.errorRate > 0.1) { // More than 6 errors per minute
      console.warn('High error rate detected:', metrics.errorRate);
      // Alert your monitoring system
    }
    
    if (metrics.httpErrors > 10) {
      console.warn('High HTTP error count:', metrics.httpErrors);
    }
  }, 60000); // Check every minute
};
```

## Troubleshooting

### Common Error Scenarios

#### 1. Authentication Errors (401)

```typescript
// Problem: Invalid or missing API credentials
try {
  await client.line.getStatus({ modes: ['tube'] });
} catch (error) {
  if (error instanceof TflHttpError && error.isAuthError()) {
    console.error('Authentication failed. Please check:');
    console.error('1. Your TFL_APP_ID environment variable');
    console.error('2. Your TFL_APP_KEY environment variable');
    console.error('3. Your API credentials at https://api-portal.tfl.gov.uk/');
  }
}
```

#### 2. Rate Limit Errors (429)

```typescript
// Problem: Too many requests
try {
  await client.line.getStatus({ modes: ['tube'] });
} catch (error) {
  if (error instanceof TflHttpError && error.isRateLimitError()) {
    console.error('Rate limit exceeded. Consider:');
    console.error('1. Implementing request caching');
    console.error('2. Reducing request frequency');
    console.error('3. Using batch requests where possible');
  }
}
```

#### 3. Network Errors

```typescript
// Problem: Network connectivity issues
try {
  await client.line.getStatus({ modes: ['tube'] });
} catch (error) {
  if (error instanceof TflNetworkError) {
    console.error('Network error. Please check:');
    console.error('1. Your internet connection');
    console.error('2. Firewall settings');
    console.error('3. Proxy configuration');
    console.error('4. DNS resolution');
  }
}
```

#### 4. Timeout Errors

```typescript
// Problem: Requests taking too long
try {
  await client.line.getStatus({ modes: ['tube'] });
} catch (error) {
  if (error instanceof TflTimeoutError) {
    console.error('Request timeout. Consider:');
    console.error('1. Increasing timeout value');
    console.error('2. Checking network latency');
    console.error('3. Using a different network');
  }
}
```

### Debugging Tips

1. **Enable Request Logging**
```typescript
const client = new TflClient({
  // Add custom fetch for logging
  customFetch: (input, init) => {
    console.log('Request:', input.toString());
    return fetch(input, init).then(response => {
      console.log('Response:', response.status, response.statusText);
      return response;
    });
  }
});
```

2. **Check Request IDs**
```typescript
try {
  await client.line.getStatus({ modes: ['tube'] });
} catch (error) {
  if (error instanceof TflError) {
    console.error('Request ID for debugging:', error.requestId);
  }
}
```

3. **Validate Input Parameters**
```typescript
const validateLineIds = (lineIds: string[]) => {
  const validIds = lineIds.filter(id => id in client.line.LINE_NAMES);
  if (validIds.length !== lineIds.length) {
    const invalidIds = lineIds.filter(id => !(id in client.line.LINE_NAMES));
    throw new TflValidationError(
      `Invalid line IDs: ${invalidIds.join(', ')}`,
      'lineIds',
      lineIds
    );
  }
  return validIds;
};
```

4. **Monitor API Health**
```typescript
const checkApiHealth = async () => {
  try {
    const start = Date.now();
    await client.mode.get();
    const duration = Date.now() - start;
    
    if (duration > 5000) {
      console.warn('API response time is slow:', duration + 'ms');
    }
  } catch (error) {
    console.error('API health check failed:', error);
  }
};
```

This comprehensive error handling guide should help you build robust applications with the TfL TypeScript client. Remember to adapt these patterns to your specific use case and requirements. 