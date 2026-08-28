// Auto-generated raw TfL API client. Do not edit manually.
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ./generated.meta.json

import type { TflHttpClient } from '../../core/http';
import { formatPathParam } from './_shared';
import type {
  TflApiPresentationEntitiesActiveServiceType,
  TflApiPresentationEntitiesPrediction,
} from '../types';

export interface ModeArrivalsArgs {
    mode: string | number | boolean | string[];
    count?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface ModeGetActiveServiceTypesArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export const createModeRaw = (http: TflHttpClient) => ({
    /**
     * Gets the next arrival predictions for all stops of a given mode
     * @operationId Mode_Arrivals
     * @deprecated false
     */
    arrivals: async (args: ModeArrivalsArgs): Promise<TflApiPresentationEntitiesPrediction[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.count !== undefined) query["count"] = args.count;
    return http.request<TflApiPresentationEntitiesPrediction[]>({
      method: 'GET',
      path: `/Mode/${formatPathParam(args.mode)}/Arrivals`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Returns the service type active for a mode.
            Currently only supports tube
     * @operationId Mode_GetActiveServiceTypes
     * @deprecated false
     */
    getActiveServiceTypes: async (args: ModeGetActiveServiceTypesArgs = {}): Promise<TflApiPresentationEntitiesActiveServiceType[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesActiveServiceType[]>({
      method: 'GET',
      path: `/Mode/ActiveServiceTypes`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
});
