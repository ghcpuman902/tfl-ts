// Auto-generated raw TfL API client. Do not edit manually.
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ./generated.meta.json

import type { TflHttpClient } from '../../core/http';
import { formatPathParam } from './_shared';
import type {
  TflApiPresentationEntitiesAccidentStatsAccidentDetail,
} from '../types';

export interface AccidentStatsGetArgs {
    year: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export const createAccidentStatsRaw = (http: TflHttpClient) => ({
    /**
     * Gets all accident details for accidents occuring in the specified year
     * @operationId AccidentStats_Get
     * @deprecated false
     */
    get: async (args: AccidentStatsGetArgs): Promise<TflApiPresentationEntitiesAccidentStatsAccidentDetail[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesAccidentStatsAccidentDetail[]>({
      method: 'GET',
      path: `/AccidentStats/${formatPathParam(args.year)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
});
