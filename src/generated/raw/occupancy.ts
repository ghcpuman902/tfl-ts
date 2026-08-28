// Auto-generated raw TfL API client. Do not edit manually.
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ./generated.meta.json

import type { TflHttpClient } from '../../core/http';
import { formatPathParam } from './_shared';
import type {
  TflApiPresentationEntitiesBikePointOccupancy,
  TflApiPresentationEntitiesCarParkOccupancy,
  TflApiPresentationEntitiesChargeConnectorOccupancy,
} from '../types';

export interface OccupancyGetArgs {
    id: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface OccupancyGetAllChargeConnectorStatusArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface OccupancyGetBikePointsOccupanciesArgs {
    ids: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface OccupancyGetChargeConnectorStatusArgs {
    ids: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface OccupancyOccupancyGetArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export const createOccupancyRaw = (http: TflHttpClient) => ({
    /**
     * Gets the occupancy for a car park with a given id
     * @operationId Occupancy_Get
     * @deprecated false
     */
    get: async (args: OccupancyGetArgs): Promise<TflApiPresentationEntitiesCarParkOccupancy> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesCarParkOccupancy>({
      method: 'GET',
      path: `/Occupancy/CarPark/${formatPathParam(args.id)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the occupancy for all charge connectors
     * @operationId Occupancy_GetAllChargeConnectorStatus
     * @deprecated false
     */
    getAllChargeConnectorStatus: async (args: OccupancyGetAllChargeConnectorStatusArgs = {}): Promise<TflApiPresentationEntitiesChargeConnectorOccupancy[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesChargeConnectorOccupancy[]>({
      method: 'GET',
      path: `/Occupancy/ChargeConnector`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Get the occupancy for bike points.
     * @operationId Occupancy_GetBikePointsOccupancies
     * @deprecated false
     */
    getBikePointsOccupancies: async (args: OccupancyGetBikePointsOccupanciesArgs): Promise<TflApiPresentationEntitiesBikePointOccupancy[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesBikePointOccupancy[]>({
      method: 'GET',
      path: `/Occupancy/BikePoints/${formatPathParam(args.ids)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the occupancy for a charge connectors with a given id (sourceSystemPlaceId)
     * @operationId Occupancy_GetChargeConnectorStatus
     * @deprecated false
     */
    getChargeConnectorStatus: async (args: OccupancyGetChargeConnectorStatusArgs): Promise<TflApiPresentationEntitiesChargeConnectorOccupancy[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesChargeConnectorOccupancy[]>({
      method: 'GET',
      path: `/Occupancy/ChargeConnector/${formatPathParam(args.ids)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the occupancy for all car parks that have occupancy data
     * @operationId Occupancy_Get
     * @deprecated false
     */
    occupancyGet: async (args: OccupancyOccupancyGetArgs = {}): Promise<TflApiPresentationEntitiesCarParkOccupancy[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesCarParkOccupancy[]>({
      method: 'GET',
      path: `/Occupancy/CarPark`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
});
