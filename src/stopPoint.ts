import { 
  Api, 
  TflApiPresentationEntitiesStopPoint,
  TflApiPresentationEntitiesPrediction,
  TflApiPresentationEntitiesStopPointsResponse
} from './tfl';
import { BatchRequest } from './utils/batchRequest';

interface StopPointQuery {
  id?: string;
  ids?: string[];
  modes?: string[];
  maxResults?: number;
  lines?: string[];
}

class StopPoint {
  private api: Api<{}>;
  private batchRequest: BatchRequest;

  constructor(api: Api<{}>) {
    this.api = api;
    this.batchRequest = new BatchRequest(api);
  }

  async get(options: StopPointQuery): Promise<TflApiPresentationEntitiesStopPoint[]> {
    const { ids } = options;
    if (!ids?.length) {
      throw new Error('Stop point ID(s) are required');
    }

    return this.batchRequest.processBatch(
      ids,
      async (chunk) => this.api.stopPoint.stopPointGet({ ids: chunk }).then(response => response.data)
    );
  }

  async getArrivals(ids: string[]): Promise<TflApiPresentationEntitiesPrediction[]> {
    return this.batchRequest.processBatch(
      ids,
      async (chunk) => Promise.all(
        chunk.map(id => this.api.stopPoint.stopPointArrivals(id).then(response => response.data))
      ).then(results => results.flat())
    );
  }

  async search(query: string, options?: {
    modes?: string[];
    maxResults?: number;
    lines?: string[];
  }): Promise<TflApiPresentationEntitiesStopPointsResponse> {
    return this.api.stopPoint.stopPointSearch({
      query,
      modes: options?.modes,
      maxResults: options?.maxResults,
      lines: options?.lines
    }).then(response => response.data);
  }
}

export { StopPoint, StopPointQuery }; 