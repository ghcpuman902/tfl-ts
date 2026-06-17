import {
  TflError,
  TflErrorHandler,
  TflHttpError,
  TflNetworkError,
  TflTimeoutError,
} from '../errors';
import { stripTypeFields } from '../utils/stripTypes';

export interface TflHttpConfig {
  appId: string;
  appKey: string;
  baseUrl?: string;
  timeout?: number;
  maxRetries?: number;
  retryDelay?: number;
}

export interface TflRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  query?: Record<string, string | number | boolean | string[] | undefined>;
  keepTflTypes?: boolean;
  signal?: AbortSignal;
}

const serializeQueryValue = (value: string | number | boolean | string[]): string => {
  if (Array.isArray(value)) {
    return value.join(',');
  }
  return String(value);
};

export class TflHttpClient {
  private readonly config: Required<TflHttpConfig>;

  constructor(config: TflHttpConfig) {
    this.config = {
      baseUrl: 'https://api.tfl.gov.uk',
      timeout: 30000,
      maxRetries: 3,
      retryDelay: 1000,
      ...config,
    };
  }

  getConfig(): Readonly<TflHttpConfig> {
    return this.config;
  }

  async request<T>(options: TflRequestOptions): Promise<T> {
    const requestId = this.generateRequestId();
    let lastError: TflError | undefined;

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        return await this.executeRequest<T>(options);
      } catch (error) {
        const tflError = TflErrorHandler.handleApiError(error, undefined, requestId);
        lastError = tflError;

        if (attempt === this.config.maxRetries || !TflErrorHandler.isRetryableError(tflError)) {
          break;
        }

        const delay = TflErrorHandler.getRetryDelay(tflError, attempt, this.config.retryDelay);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }

  private async executeRequest<T>(options: TflRequestOptions): Promise<T> {
    const url = new URL(options.path, this.config.baseUrl);
    url.searchParams.set('app_id', this.config.appId);
    url.searchParams.set('app_key', this.config.appKey);

    if (options.query) {
      for (const [key, value] of Object.entries(options.query)) {
        if (value === undefined || value === null) {
          continue;
        }
        url.searchParams.set(key, serializeQueryValue(value));
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    const onAbort = (): void => controller.abort();
    options.signal?.addEventListener('abort', onAbort, { once: true });

    try {
      const response = await fetch(url, {
        method: options.method ?? 'GET',
        signal: controller.signal,
      });

      if (!response.ok) {
        const responseBody = await response.text().catch(() => undefined);
        throw new TflHttpError(
          `TfL API request failed: ${response.status} ${response.statusText}`,
          response.status,
          response.statusText,
          responseBody,
          url.toString(),
        );
      }

      const data = (await response.json()) as T;
      return stripTypeFields(data, options.keepTflTypes ?? false) as T;
    } catch (error) {
      if (error instanceof TflHttpError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new TflTimeoutError(
          `TfL API request timed out after ${this.config.timeout}ms`,
          this.config.timeout,
          url.toString(),
          error,
        );
      }

      throw new TflNetworkError(
        error instanceof Error ? error.message : 'Network request failed',
        'NETWORK_ERROR',
        url.toString(),
        error instanceof Error ? error : undefined,
      );
    } finally {
      clearTimeout(timeoutId);
      options.signal?.removeEventListener('abort', onAbort);
    }
  }

  private generateRequestId = (): string =>
    `tfl_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
};
