/**
 * Base error class for TfL API errors
 */
export class TflError extends Error {
  public readonly isTflError = true;
  public readonly timestamp = new Date();
  public readonly requestId?: string;

  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly originalError?: Error,
    requestId?: string
  ) {
    super(message);
    this.name = 'TflError';
    this.requestId = requestId;
    
    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TflError);
    }
  }
}

/**
 * HTTP error class for API response errors
 */
export class TflHttpError extends TflError {
  public readonly isHttpError = true;

  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly statusText: string,
    public readonly responseBody?: any,
    public readonly url?: string,
    originalError?: Error,
    requestId?: string
  ) {
    super(message, statusCode, originalError, requestId);
    this.name = 'TflHttpError';
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TflHttpError);
    }
  }

  /**
   * Check if this is a client error (4xx)
   */
  public isClientError(): boolean {
    return this.statusCode >= 400 && this.statusCode < 500;
  }

  /**
   * Check if this is a server error (5xx)
   */
  public isServerError(): boolean {
    return this.statusCode >= 500 && this.statusCode < 600;
  }

  /**
   * Check if this is an authentication error (401)
   */
  public isAuthError(): boolean {
    return this.statusCode === 401;
  }

  /**
   * Check if this is a rate limit error (429)
   */
  public isRateLimitError(): boolean {
    return this.statusCode === 429;
  }
}

/**
 * Network error class for connection issues
 */
export class TflNetworkError extends TflError {
  public readonly isNetworkError = true;

  constructor(
    message: string,
    public readonly code?: string,
    public readonly url?: string,
    originalError?: Error,
    requestId?: string
  ) {
    super(message, undefined, originalError, requestId);
    this.name = 'TflNetworkError';
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TflNetworkError);
    }
  }
}

/**
 * Validation error class for invalid parameters
 */
export class TflValidationError extends TflError {
  public readonly isValidationError = true;

  constructor(
    message: string,
    public readonly field?: string,
    public readonly value?: any,
    originalError?: Error,
    requestId?: string
  ) {
    super(message, undefined, originalError, requestId);
    this.name = 'TflValidationError';
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TflValidationError);
    }
  }
}

/**
 * Timeout error class for request timeouts
 */
export class TflTimeoutError extends TflError {
  public readonly isTimeoutError = true;

  constructor(
    message: string,
    public readonly timeoutMs: number,
    public readonly url?: string,
    originalError?: Error,
    requestId?: string
  ) {
    super(message, undefined, originalError, requestId);
    this.name = 'TflTimeoutError';
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TflTimeoutError);
    }
  }
}

/**
 * Configuration error class for setup issues
 */
export class TflConfigError extends TflError {
  public readonly isConfigError = true;

  constructor(
    message: string,
    public readonly configField?: string,
    originalError?: Error,
    requestId?: string
  ) {
    super(message, undefined, originalError, requestId);
    this.name = 'TflConfigError';
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TflConfigError);
    }
  }
}

/**
 * Error handler utility class
 */
export class TflErrorHandler {
  /**
   * Handle API errors and convert them to appropriate TflError types
   */
  static handleApiError(error: any, url?: string, requestId?: string): TflError {
    // If it's already a TflError, return it
    if (error instanceof TflError) {
      return error;
    }

    // Handle fetch errors (network issues)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return new TflNetworkError(
        `Network error: ${error.message}`,
        'NETWORK_ERROR',
        url,
        error,
        requestId
      );
    }

    // Handle timeout errors
    if (error.name === 'AbortError' || error.message.includes('timeout')) {
      return new TflTimeoutError(
        `Request timeout: ${error.message}`,
        30000, // Default timeout
        url,
        error,
        requestId
      );
    }

    // Handle HTTP response errors
    if (error.status || error.statusCode) {
      const statusCode = error.status || error.statusCode;
      const statusText = error.statusText || 'Unknown Error';
      const responseBody = error.data || error.body || error.message;
      
      return new TflHttpError(
        `HTTP ${statusCode}: ${statusText}`,
        statusCode,
        statusText,
        responseBody,
        url,
        error,
        requestId
      );
    }

    // Handle validation errors
    if (error.message && (
      error.message.includes('validation') ||
      error.message.includes('invalid') ||
      error.message.includes('required')
    )) {
      return new TflValidationError(
        `Validation error: ${error.message}`,
        undefined,
        undefined,
        error,
        requestId
      );
    }

    // Generic error fallback
    return new TflError(
      `Unexpected error: ${error.message || 'Unknown error occurred'}`,
      undefined,
      error,
      requestId
    );
  }

  /**
   * Check if an error is retryable
   */
  static isRetryableError(error: TflError): boolean {
    if (error instanceof TflHttpError) {
      // Retry on server errors (5xx) and rate limits (429)
      return error.isServerError() || error.isRateLimitError();
    }
    
    if (error instanceof TflNetworkError || error instanceof TflTimeoutError) {
      return true;
    }
    
    return false;
  }

  /**
   * Get retry delay for an error
   */
  static getRetryDelay(error: TflError, attempt: number, baseDelay: number = 1000): number {
    if (error instanceof TflHttpError && error.isRateLimitError()) {
      // Exponential backoff for rate limits
      return Math.min(baseDelay * Math.pow(2, attempt), 30000);
    }
    
    // Linear backoff for other retryable errors
    return baseDelay * (attempt + 1);
  }
} 