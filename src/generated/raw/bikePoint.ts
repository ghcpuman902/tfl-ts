// Auto-generated raw TfL API client. Do not edit manually.
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ./generated.meta.json

import type { TflHttpClient } from '../../core/http';
import { formatPathParam } from './_shared';
import type {
  TflApiPresentationEntitiesPlace,
} from '../types';

export interface BikePointGetArgs {
    id: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface BikePointGetAllArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface BikePointSearchArgs {
    query: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export const createBikePointRaw = (http: TflHttpClient) => ({
    /**
     * Gets the bike point with the given id.
     * @operationId BikePoint_Get
     * @deprecated false
     */
    get: async (args: BikePointGetArgs): Promise<TflApiPresentationEntitiesPlace> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesPlace>({
      method: 'GET',
      path: `/BikePoint/${formatPathParam(args.id)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets all bike point locations. The Place object has an addtionalProperties array which contains the nbBikes, nbDocks and nbSpaces
            numbers which give the status of the BikePoint. A mismatch in these numbers i.e. nbDocks - (nbBikes + nbSpaces) != 0 indicates broken docks.
     * @operationId BikePoint_GetAll
     * @deprecated false
     */
    getAll: async (args: BikePointGetAllArgs = {}): Promise<TflApiPresentationEntitiesPlace[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesPlace[]>({
      method: 'GET',
      path: `/BikePoint`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Search for bike stations by their name, a bike point's name often contains information about the name of the street
            or nearby landmarks, for example. Note that the search result does not contain the PlaceProperties i.e. the status
            or occupancy of the BikePoint, to get that information you should retrieve the BikePoint by its id on /BikePoint/id.
     * @operationId BikePoint_Search
     * @deprecated false
     */
    search: async (args: BikePointSearchArgs): Promise<TflApiPresentationEntitiesPlace[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.query !== undefined) query["query"] = args.query;
    return http.request<TflApiPresentationEntitiesPlace[]>({
      method: 'GET',
      path: `/BikePoint/Search`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
});
