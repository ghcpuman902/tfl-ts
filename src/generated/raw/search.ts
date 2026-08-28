// Auto-generated raw TfL API client. Do not edit manually.
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ./generated.meta.json

import type { TflHttpClient } from '../../core/http';
import { formatPathParam } from './_shared';
import type {
  TflApiPresentationEntitiesSearchResponse,
} from '../types';

export interface SearchBusSchedulesArgs {
    query: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface SearchGetArgs {
    query: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface SearchMetaCategoriesArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface SearchMetaSearchProvidersArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface SearchMetaSortsArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export const createSearchRaw = (http: TflHttpClient) => ({
    /**
     * Searches the bus schedules folder on S3 for a given bus number.
     * @operationId Search_BusSchedules
     * @deprecated false
     */
    busSchedules: async (args: SearchBusSchedulesArgs): Promise<TflApiPresentationEntitiesSearchResponse> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.query !== undefined) query["query"] = args.query;
    return http.request<TflApiPresentationEntitiesSearchResponse>({
      method: 'GET',
      path: `/Search/BusSchedules`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Search the site for occurrences of the query string. The maximum number of results returned is equal to the maximum page size
            of 100. To return subsequent pages, use the paginated overload.
     * @operationId Search_Get
     * @deprecated false
     */
    get: async (args: SearchGetArgs): Promise<TflApiPresentationEntitiesSearchResponse> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.query !== undefined) query["query"] = args.query;
    return http.request<TflApiPresentationEntitiesSearchResponse>({
      method: 'GET',
      path: `/Search`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the available search categories.
     * @operationId Search_MetaCategories
     * @deprecated false
     */
    metaCategories: async (args: SearchMetaCategoriesArgs = {}): Promise<unknown[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<unknown[]>({
      method: 'GET',
      path: `/Search/Meta/Categories`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the available searchProvider names.
     * @operationId Search_MetaSearchProviders
     * @deprecated false
     */
    metaSearchProviders: async (args: SearchMetaSearchProvidersArgs = {}): Promise<unknown[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<unknown[]>({
      method: 'GET',
      path: `/Search/Meta/SearchProviders`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the available sorting options.
     * @operationId Search_MetaSorts
     * @deprecated false
     */
    metaSorts: async (args: SearchMetaSortsArgs = {}): Promise<unknown[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<unknown[]>({
      method: 'GET',
      path: `/Search/Meta/Sorts`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
});
