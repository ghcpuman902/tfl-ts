// Auto-generated raw TfL API client. Do not edit manually.
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ./generated.meta.json

import type { TflHttpClient } from '../../core/http';
import { formatPathParam } from './_shared';
import type {
  SystemObject,
} from '../types';

export interface AirQualityGetArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export const createAirQualityRaw = (http: TflHttpClient) => ({
    /**
     * Gets air quality data feed
     * @operationId AirQuality_Get
     * @deprecated false
     */
    get: async (args: AirQualityGetArgs = {}): Promise<SystemObject> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<SystemObject>({
      method: 'GET',
      path: `/AirQuality`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
});
