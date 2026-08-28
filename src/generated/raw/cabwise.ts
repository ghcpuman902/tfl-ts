// Auto-generated raw TfL API client. Do not edit manually.
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ./generated.meta.json

import type { TflHttpClient } from '../../core/http';
import { formatPathParam } from './_shared';
import type {
  SystemObject,
} from '../types';

export interface CabwiseGetArgs {
    lat: string | number | boolean | string[];
    lon: string | number | boolean | string[];
    optype?: string | number | boolean | string[];
    wc?: string | number | boolean | string[];
    radius?: string | number | boolean | string[];
    name?: string | number | boolean | string[];
    maxResults?: string | number | boolean | string[];
    legacyFormat?: string | number | boolean | string[];
    forceXml?: string | number | boolean | string[];
    twentyFourSevenOnly?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export const createCabwiseRaw = (http: TflHttpClient) => ({
    /**
     * Gets taxis and minicabs contact information
     * @operationId Cabwise_Get
     * @deprecated false
     */
    get: async (args: CabwiseGetArgs): Promise<SystemObject> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.lat !== undefined) query["lat"] = args.lat;
    if (args.lon !== undefined) query["lon"] = args.lon;
    if (args.optype !== undefined) query["optype"] = args.optype;
    if (args.wc !== undefined) query["wc"] = args.wc;
    if (args.radius !== undefined) query["radius"] = args.radius;
    if (args.name !== undefined) query["name"] = args.name;
    if (args.maxResults !== undefined) query["maxResults"] = args.maxResults;
    if (args.legacyFormat !== undefined) query["legacyFormat"] = args.legacyFormat;
    if (args.forceXml !== undefined) query["forceXml"] = args.forceXml;
    if (args.twentyFourSevenOnly !== undefined) query["twentyFourSevenOnly"] = args.twentyFourSevenOnly;
    return http.request<SystemObject>({
      method: 'GET',
      path: `/Cabwise/search`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
});
