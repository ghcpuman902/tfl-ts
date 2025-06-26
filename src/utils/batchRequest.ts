import { Api } from '../generated/tfl';

interface BatchRequestOptions {
  maxConcurrent?: number;
  chunkSize?: number;
  retryAttempts?: number;
  retryDelay?: number;
}

class BatchRequest {
  private api: Api<{}>;
  private options: Required<BatchRequestOptions>;

  constructor(api: Api<{}>, options: BatchRequestOptions = {}) {
    this.api = api;
    this.options = {
      maxConcurrent: options.maxConcurrent || 5,
      chunkSize: options.chunkSize || 20,
      retryAttempts: options.retryAttempts || 3,
      retryDelay: options.retryDelay || 1000
    };
  }

  private async chunkArray<T>(array: T[], size: number): Promise<T[][]> {
    return array.reduce((chunks, item, index) => {
      const chunkIndex = Math.floor(index / size);
      if (!chunks[chunkIndex]) {
        chunks[chunkIndex] = [];
      }
      chunks[chunkIndex].push(item);
      return chunks;
    }, [] as T[][]);
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async retry<T>(
    fn: () => Promise<T>,
    attempts: number,
    delay: number
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (attempts === 0) throw error;
      await this.delay(delay);
      return this.retry(fn, attempts - 1, delay);
    }
  }

  async processBatch<T, R>(
    items: T[],
    processFn: (chunk: T[]) => Promise<R[]>,
    options: Partial<BatchRequestOptions> = {}
  ): Promise<R[]> {
    const { maxConcurrent, chunkSize, retryAttempts, retryDelay } = {
      ...this.options,
      ...options
    };

    // Split items into chunks
    const chunks = await this.chunkArray(items, chunkSize);
    const results: R[] = [];

    // Process chunks with concurrency limit
    for (let i = 0; i < chunks.length; i += maxConcurrent) {
      const batch = chunks.slice(i, i + maxConcurrent);
      const batchPromises = batch.map(chunk =>
        this.retry(
          () => processFn(chunk),
          retryAttempts,
          retryDelay
        )
      );

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults.flat());
    }

    return results;
  }
}

export { BatchRequest, BatchRequestOptions }; 