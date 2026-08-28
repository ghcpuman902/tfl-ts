// Auto-generated raw TfL API client. Do not edit manually.
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ./generated.meta.json

import type { TflHttpClient } from '../../core/http';
import { formatPathParam } from './_shared';
import type {
  TflApiPresentationEntitiesPrediction,
} from '../types';

export interface VehicleGetArgs {
    ids: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export const createVehicleRaw = (http: TflHttpClient) => ({
    /**
     * Gets the predictions for a given list of vehicle Id's.
     * @operationId Vehicle_Get
     * @deprecated false
     */
    get: async (args: VehicleGetArgs): Promise<TflApiPresentationEntitiesPrediction[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesPrediction[]>({
      method: 'GET',
      path: `/Vehicle/${formatPathParam(args.ids)}/Arrivals`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
});
