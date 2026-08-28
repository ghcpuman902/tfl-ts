// Auto-generated raw TfL API client. Do not edit manually.
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ./generated.meta.json

import type { TflHttpClient } from '../../core/http';
import { formatPathParam } from './_shared';
import type {
  SystemObject,
  TflApiPresentationEntitiesRoadCorridor,
  TflApiPresentationEntitiesRoadDisruption,
  TflApiPresentationEntitiesStatusSeverity,
} from '../types';

export interface RoadDisruptedStreetsArgs {
    startDate: string | number | boolean | string[];
    endDate: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface RoadDisruptionArgs {
    ids: string | number | boolean | string[];
    stripContent?: string | number | boolean | string[];
    severities?: string | number | boolean | string[];
    categories?: string | number | boolean | string[];
    closures?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface RoadDisruptionByIdArgs {
    disruptionIds: string | number | boolean | string[];
    stripContent?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface RoadGetArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface RoadMetaCategoriesArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface RoadMetaSeveritiesArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface RoadRoadGetArgs {
    ids: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface RoadStatusArgs {
    ids: string | number | boolean | string[];
    "dateRangeNullable.startDate"?: string | number | boolean | string[];
    "dateRangeNullable.endDate"?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export const createRoadRaw = (http: TflHttpClient) => ({
    /**
     * Gets a list of disrupted streets. If no date filters are provided, current disruptions are returned.
     * @operationId Road_DisruptedStreets
     * @deprecated false
     */
    disruptedStreets: async (args: RoadDisruptedStreetsArgs): Promise<SystemObject> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.startDate !== undefined) query["startDate"] = args.startDate;
    if (args.endDate !== undefined) query["endDate"] = args.endDate;
    return http.request<SystemObject>({
      method: 'GET',
      path: `/Road/all/Street/Disruption`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Get active disruptions, filtered by road ids
     * @operationId Road_Disruption
     * @deprecated false
     */
    disruption: async (args: RoadDisruptionArgs): Promise<TflApiPresentationEntitiesRoadDisruption[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.stripContent !== undefined) query["stripContent"] = args.stripContent;
    if (args.severities !== undefined) query["severities"] = args.severities;
    if (args.categories !== undefined) query["categories"] = args.categories;
    if (args.closures !== undefined) query["closures"] = args.closures;
    return http.request<TflApiPresentationEntitiesRoadDisruption[]>({
      method: 'GET',
      path: `/Road/${formatPathParam(args.ids)}/Disruption`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets a list of active disruptions filtered by disruption Ids.
     * @operationId Road_DisruptionById
     * @deprecated false
     */
    disruptionById: async (args: RoadDisruptionByIdArgs): Promise<TflApiPresentationEntitiesRoadDisruption> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.stripContent !== undefined) query["stripContent"] = args.stripContent;
    return http.request<TflApiPresentationEntitiesRoadDisruption>({
      method: 'GET',
      path: `/Road/all/Disruption/${formatPathParam(args.disruptionIds)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets all roads managed by TfL
     * @operationId Road_Get
     * @deprecated false
     */
    get: async (args: RoadGetArgs = {}): Promise<TflApiPresentationEntitiesRoadCorridor[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesRoadCorridor[]>({
      method: 'GET',
      path: `/Road`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets a list of valid RoadDisruption categories
     * @operationId Road_MetaCategories
     * @deprecated false
     */
    metaCategories: async (args: RoadMetaCategoriesArgs = {}): Promise<unknown[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<unknown[]>({
      method: 'GET',
      path: `/Road/Meta/Categories`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets a list of valid RoadDisruption severity codes
     * @operationId Road_MetaSeverities
     * @deprecated false
     */
    metaSeverities: async (args: RoadMetaSeveritiesArgs = {}): Promise<TflApiPresentationEntitiesStatusSeverity[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesStatusSeverity[]>({
      method: 'GET',
      path: `/Road/Meta/Severities`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the road with the specified id (e.g. A1)
     * @operationId Road_Get
     * @deprecated false
     */
    roadGet: async (args: RoadRoadGetArgs): Promise<TflApiPresentationEntitiesRoadCorridor[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesRoadCorridor[]>({
      method: 'GET',
      path: `/Road/${formatPathParam(args.ids)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the specified roads with the status aggregated over the date range specified, or now until the end of today if no dates are passed.
     * @operationId Road_Status
     * @deprecated false
     */
    status: async (args: RoadStatusArgs): Promise<TflApiPresentationEntitiesRoadCorridor[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args["dateRangeNullable.startDate"] !== undefined) query["dateRangeNullable.startDate"] = args["dateRangeNullable.startDate"];
    if (args["dateRangeNullable.endDate"] !== undefined) query["dateRangeNullable.endDate"] = args["dateRangeNullable.endDate"];
    return http.request<TflApiPresentationEntitiesRoadCorridor[]>({
      method: 'GET',
      path: `/Road/${formatPathParam(args.ids)}/Status`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
});
