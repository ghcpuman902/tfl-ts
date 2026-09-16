/**
 * Structured body returned by the TfL API on error responses.
 * Parsed lazily from `TflHttpError.responseBody`.
 */
export interface TflApiErrorBody {
  $type?: string;
  timestampUtc?: string;
  exceptionType?: string;
  httpStatusCode?: number;
  httpStatus?: string;
  relativeUri?: string;
  message?: string;
}

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

  /** Lazily-parsed TfL error body; null if the body is not valid JSON. */
  private _parsedBody: TflApiErrorBody | null | undefined = undefined;

  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly statusText: string,
    public readonly responseBody?: string,
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
   * Parsed TfL API error body, or null if the response was not a TfL JSON error.
   * Accessing this is safe — it will never throw.
   */
  get parsedBody(): TflApiErrorBody | null {
    if (this._parsedBody === undefined) {
      if (typeof this.responseBody === 'string') {
        try {
          this._parsedBody = JSON.parse(this.responseBody) as TflApiErrorBody;
        } catch {
          this._parsedBody = null;
        }
      } else {
        this._parsedBody = null;
      }
    }
    return this._parsedBody;
  }

  /**
   * Human-readable message from the TfL API error body, e.g.
   * "The following line id is not recognised: elizabeth-line"
   */
  get tflMessage(): string | undefined {
    return this.parsedBody?.message;
  }

  /**
   * TfL exception category, e.g. "EntityNotFoundException", "ValidationException".
   */
  get tflExceptionType(): string | undefined {
    return this.parsedBody?.exceptionType;
  }

  /**
   * The relative URI from the TfL error body (without credentials).
   */
  get tflRelativeUri(): string | undefined {
    return this.parsedBody?.relativeUri?.replace(/\?.*$/, '');
  }

  /** Check if this is a client error (4xx) */
  public isClientError(): boolean {
    return this.statusCode >= 400 && this.statusCode < 500;
  }

  /** Check if this is a server error (5xx) */
  public isServerError(): boolean {
    return this.statusCode >= 500 && this.statusCode < 600;
  }

  /** Check if this is an authentication error (401) */
  public isAuthError(): boolean {
    return this.statusCode === 401;
  }

  /** Check if this is a forbidden error (403) */
  public isForbiddenError(): boolean {
    return this.statusCode === 403;
  }

  /** Check if this is a not-found error (404) */
  public isNotFoundError(): boolean {
    return this.statusCode === 404;
  }

  /** Check if this is a rate limit error (429) */
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
    public readonly value?: unknown,
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
  static handleApiError(error: unknown, url?: string, requestId?: string): TflError {
    if (error instanceof TflError) {
      return error;
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      return new TflNetworkError(
        `Network error: ${error.message}`,
        'NETWORK_ERROR',
        url,
        error,
        requestId,
      );
    }

    const asRecord =
      typeof error === 'object' && error !== null
        ? (error as { status?: unknown; statusCode?: unknown; statusText?: unknown; data?: unknown; body?: unknown; message?: unknown; name?: unknown })
        : undefined;
    const message = error instanceof Error ? error.message : typeof asRecord?.message === 'string' ? asRecord.message : '';

    if (
      (error instanceof Error && error.name === 'AbortError') ||
      message.includes('timeout')
    ) {
      return new TflTimeoutError(
        `Request timeout: ${message || 'timed out'}`,
        30000,
        url,
        error instanceof Error ? error : undefined,
        requestId,
      );
    }

    const statusCode =
      typeof asRecord?.status === 'number'
        ? asRecord.status
        : typeof asRecord?.statusCode === 'number'
          ? asRecord.statusCode
          : undefined;
    if (statusCode !== undefined) {
      const statusText = typeof asRecord?.statusText === 'string' ? asRecord.statusText : 'Unknown Error';
      const responseBody =
        typeof asRecord?.data === 'string'
          ? asRecord.data
          : typeof asRecord?.body === 'string'
            ? asRecord.body
            : message;

      return new TflHttpError(
        `HTTP ${statusCode}: ${statusText}`,
        statusCode,
        statusText,
        responseBody,
        url,
        error instanceof Error ? error : undefined,
        requestId,
      );
    }

    if (
      message.includes('validation') ||
      message.includes('invalid') ||
      message.includes('required')
    ) {
      return new TflValidationError(
        `Validation error: ${message}`,
        undefined,
        undefined,
        error instanceof Error ? error : undefined,
        requestId,
      );
    }

    return new TflError(
      `Unexpected error: ${message || 'Unknown error occurred'}`,
      undefined,
      error instanceof Error ? error : undefined,
      requestId,
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