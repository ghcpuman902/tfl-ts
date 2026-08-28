// Auto-generated raw TfL API client. Do not edit manually.
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ./generated.meta.json

import type { TflHttpClient } from '../../core/http';
import { formatPathParam } from './_shared';
import type {
  SystemObject,
  TflApiPresentationEntitiesArrivalDeparture,
  TflApiPresentationEntitiesDisruptedPoint,
  TflApiPresentationEntitiesLineServiceType,
  TflApiPresentationEntitiesMode,
  TflApiPresentationEntitiesPlace,
  TflApiPresentationEntitiesPrediction,
  TflApiPresentationEntitiesSearchResponse,
  TflApiPresentationEntitiesStopPoint,
  TflApiPresentationEntitiesStopPointCategory,
  TflApiPresentationEntitiesStopPointRouteSection,
  TflApiPresentationEntitiesStopPointsResponse,
} from '../types';

export interface StopPointArrivalDeparturesArgs {
    id: string | number | boolean | string[];
    lineIds: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointArrivalsArgs {
    id: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointCrowdingArgs {
    id: string | number | boolean | string[];
    line: string | number | boolean | string[];
    direction: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointDirectionArgs {
    id: string | number | boolean | string[];
    toStopPointId: string | number | boolean | string[];
    lineId?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointDisruptionArgs {
    ids: string | number | boolean | string[];
    getFamily?: string | number | boolean | string[];
    includeRouteBlockedStops?: string | number | boolean | string[];
    flattenResponse?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointDisruptionByModeArgs {
    modes: string | number | boolean | string[];
    includeRouteBlockedStops?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointGetArgs {
    ids: string | number | boolean | string[];
    includeCrowdingData?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointGetByGeoPointArgs {
    stopTypes: string | number | boolean | string[];
    radius?: string | number | boolean | string[];
    useStopPointHierarchy?: string | number | boolean | string[];
    modes?: string | number | boolean | string[];
    categories?: string | number | boolean | string[];
    returnLines?: string | number | boolean | string[];
    "location.lat"?: string | number | boolean | string[];
    "location.lon"?: string | number | boolean | string[];
    lat: string | number | boolean | string[];
    lon: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointGetByModeArgs {
    modes: string | number | boolean | string[];
    page?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointGetBySmsArgs {
    id: string | number | boolean | string[];
    output?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointGetByTypeArgs {
    types: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointGetByTypeWithPaginationArgs {
    types: string | number | boolean | string[];
    page: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointGetCarParksByIdArgs {
    stopPointId: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointGetServiceTypesArgs {
    id: string | number | boolean | string[];
    lineIds?: string | number | boolean | string[];
    modes?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointGetTaxiRanksByIdsArgs {
    stopPointId: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointMetaCategoriesArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointMetaModesArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointMetaStopTypesArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointReachableFromArgs {
    id: string | number | boolean | string[];
    lineId: string | number | boolean | string[];
    serviceTypes?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointRouteArgs {
    id: string | number | boolean | string[];
    serviceTypes?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointSearchArgs {
    query: string | number | boolean | string[];
    modes?: string | number | boolean | string[];
    faresOnly?: string | number | boolean | string[];
    maxResults?: string | number | boolean | string[];
    lines?: string | number | boolean | string[];
    includeHubs?: string | number | boolean | string[];
    tflOperatedNationalRailStationsOnly?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointStopPointGetArgs {
    id: string | number | boolean | string[];
    placeTypes: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface StopPointStopPointSearchArgs {
    query: string | number | boolean | string[];
    modes?: string | number | boolean | string[];
    faresOnly?: string | number | boolean | string[];
    maxResults?: string | number | boolean | string[];
    lines?: string | number | boolean | string[];
    includeHubs?: string | number | boolean | string[];
    tflOperatedNationalRailStationsOnly?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export const createStopPointRaw = (http: TflHttpClient) => ({
    /**
     * Gets the list of arrival and departure predictions for the given stop point id (overground, Elizabeth line and thameslink only)
     * @operationId StopPoint_ArrivalDepartures
     * @deprecated false
     */
    arrivalDepartures: async (args: StopPointArrivalDeparturesArgs): Promise<TflApiPresentationEntitiesArrivalDeparture[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.lineIds !== undefined) query["lineIds"] = args.lineIds;
    return http.request<TflApiPresentationEntitiesArrivalDeparture[]>({
      method: 'GET',
      path: `/StopPoint/${formatPathParam(args.id)}/ArrivalDepartures`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the list of arrival predictions for the given stop point id
     * @operationId StopPoint_Arrivals
     * @deprecated false
     */
    arrivals: async (args: StopPointArrivalsArgs): Promise<TflApiPresentationEntitiesPrediction[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesPrediction[]>({
      method: 'GET',
      path: `/StopPoint/${formatPathParam(args.id)}/Arrivals`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets all the Crowding data (static) for the StopPointId, plus crowding data for a given line and optionally a particular direction.
     * @operationId StopPoint_Crowding
     * @deprecated false
     */
    crowding: async (args: StopPointCrowdingArgs): Promise<TflApiPresentationEntitiesStopPoint[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.direction !== undefined) query["direction"] = args.direction;
    return http.request<TflApiPresentationEntitiesStopPoint[]>({
      method: 'GET',
      path: `/StopPoint/${formatPathParam(args.id)}/Crowding/${formatPathParam(args.line)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Returns the canonical direction, "inbound" or "outbound", for a given pair of stop point Ids in the direction from -&gt; to.
     * @operationId StopPoint_Direction
     * @deprecated false
     */
    direction: async (args: StopPointDirectionArgs): Promise<string> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.lineId !== undefined) query["lineId"] = args.lineId;
    return http.request<string>({
      method: 'GET',
      path: `/StopPoint/${formatPathParam(args.id)}/DirectionTo/${formatPathParam(args.toStopPointId)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets all disruptions for the specified StopPointId, plus disruptions for any child Naptan records it may have.
     * @operationId StopPoint_Disruption
     * @deprecated false
     */
    disruption: async (args: StopPointDisruptionArgs): Promise<TflApiPresentationEntitiesDisruptedPoint[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.getFamily !== undefined) query["getFamily"] = args.getFamily;
    if (args.includeRouteBlockedStops !== undefined) query["includeRouteBlockedStops"] = args.includeRouteBlockedStops;
    if (args.flattenResponse !== undefined) query["flattenResponse"] = args.flattenResponse;
    return http.request<TflApiPresentationEntitiesDisruptedPoint[]>({
      method: 'GET',
      path: `/StopPoint/${formatPathParam(args.ids)}/Disruption`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets a distinct list of disrupted stop points for the given modes
     * @operationId StopPoint_DisruptionByMode
     * @deprecated false
     */
    disruptionByMode: async (args: StopPointDisruptionByModeArgs): Promise<TflApiPresentationEntitiesDisruptedPoint[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.includeRouteBlockedStops !== undefined) query["includeRouteBlockedStops"] = args.includeRouteBlockedStops;
    return http.request<TflApiPresentationEntitiesDisruptedPoint[]>({
      method: 'GET',
      path: `/StopPoint/Mode/${formatPathParam(args.modes)}/Disruption`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets a list of StopPoints corresponding to the given list of stop ids.
     * @operationId StopPoint_Get
     * @deprecated false
     */
    get: async (args: StopPointGetArgs): Promise<TflApiPresentationEntitiesStopPoint[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.includeCrowdingData !== undefined) query["includeCrowdingData"] = args.includeCrowdingData;
    return http.request<TflApiPresentationEntitiesStopPoint[]>({
      method: 'GET',
      path: `/StopPoint/${formatPathParam(args.ids)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets a list of StopPoints within {radius} by the specified criteria
     * @operationId StopPoint_GetByGeoPoint
     * @deprecated false
     */
    getByGeoPoint: async (args: StopPointGetByGeoPointArgs): Promise<TflApiPresentationEntitiesStopPointsResponse> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.stopTypes !== undefined) query["stopTypes"] = args.stopTypes;
    if (args.radius !== undefined) query["radius"] = args.radius;
    if (args.useStopPointHierarchy !== undefined) query["useStopPointHierarchy"] = args.useStopPointHierarchy;
    if (args.modes !== undefined) query["modes"] = args.modes;
    if (args.categories !== undefined) query["categories"] = args.categories;
    if (args.returnLines !== undefined) query["returnLines"] = args.returnLines;
    if ((args["location.lat"] !== undefined ? args["location.lat"] : args.lat) !== undefined) query["lat"] = (args["location.lat"] !== undefined ? args["location.lat"] : args.lat);
    if ((args["location.lon"] !== undefined ? args["location.lon"] : args.lon) !== undefined) query["lon"] = (args["location.lon"] !== undefined ? args["location.lon"] : args.lon);
    return http.request<TflApiPresentationEntitiesStopPointsResponse>({
      method: 'GET',
      path: `/StopPoint`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets a list of StopPoints filtered by the modes available at that StopPoint.
     * @operationId StopPoint_GetByMode
     * @deprecated false
     */
    getByMode: async (args: StopPointGetByModeArgs): Promise<TflApiPresentationEntitiesStopPointsResponse> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.page !== undefined) query["page"] = args.page;
    return http.request<TflApiPresentationEntitiesStopPointsResponse>({
      method: 'GET',
      path: `/StopPoint/Mode/${formatPathParam(args.modes)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets a StopPoint for a given sms code.
     * @operationId StopPoint_GetBySms
     * @deprecated false
     */
    getBySms: async (args: StopPointGetBySmsArgs): Promise<SystemObject> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.output !== undefined) query["output"] = args.output;
    return http.request<SystemObject>({
      method: 'GET',
      path: `/StopPoint/Sms/${formatPathParam(args.id)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets all stop points of a given type
     * @operationId StopPoint_GetByType
     * @deprecated false
     */
    getByType: async (args: StopPointGetByTypeArgs): Promise<TflApiPresentationEntitiesStopPoint[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesStopPoint[]>({
      method: 'GET',
      path: `/StopPoint/Type/${formatPathParam(args.types)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets all the stop points of given type(s) with a page number
     * @operationId StopPoint_GetByTypeWithPagination
     * @deprecated false
     */
    getByTypeWithPagination: async (args: StopPointGetByTypeWithPaginationArgs): Promise<TflApiPresentationEntitiesStopPoint[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesStopPoint[]>({
      method: 'GET',
      path: `/StopPoint/Type/${formatPathParam(args.types)}/page/${formatPathParam(args.page)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Get car parks corresponding to the given stop point id.
     * @operationId StopPoint_GetCarParksById
     * @deprecated false
     */
    getCarParksById: async (args: StopPointGetCarParksByIdArgs): Promise<TflApiPresentationEntitiesPlace[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesPlace[]>({
      method: 'GET',
      path: `/StopPoint/${formatPathParam(args.stopPointId)}/CarParks`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the service types for a given stoppoint
     * @operationId StopPoint_GetServiceTypes
     * @deprecated false
     */
    getServiceTypes: async (args: StopPointGetServiceTypesArgs): Promise<TflApiPresentationEntitiesLineServiceType[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.id !== undefined) query["id"] = args.id;
    if (args.lineIds !== undefined) query["lineIds"] = args.lineIds;
    if (args.modes !== undefined) query["modes"] = args.modes;
    return http.request<TflApiPresentationEntitiesLineServiceType[]>({
      method: 'GET',
      path: `/StopPoint/ServiceTypes`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets a list of taxi ranks corresponding to the given stop point id.
     * @operationId StopPoint_GetTaxiRanksByIds
     * @deprecated false
     */
    getTaxiRanksByIds: async (args: StopPointGetTaxiRanksByIdsArgs): Promise<TflApiPresentationEntitiesPlace[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesPlace[]>({
      method: 'GET',
      path: `/StopPoint/${formatPathParam(args.stopPointId)}/TaxiRanks`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the list of available StopPoint additional information categories
     * @operationId StopPoint_MetaCategories
     * @deprecated false
     */
    metaCategories: async (args: StopPointMetaCategoriesArgs = {}): Promise<TflApiPresentationEntitiesStopPointCategory[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesStopPointCategory[]>({
      method: 'GET',
      path: `/StopPoint/Meta/Categories`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the list of available StopPoint modes
     * @operationId StopPoint_MetaModes
     * @deprecated false
     */
    metaModes: async (args: StopPointMetaModesArgs = {}): Promise<TflApiPresentationEntitiesMode[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesMode[]>({
      method: 'GET',
      path: `/StopPoint/Meta/Modes`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the list of available StopPoint types
     * @operationId StopPoint_MetaStopTypes
     * @deprecated false
     */
    metaStopTypes: async (args: StopPointMetaStopTypesArgs = {}): Promise<unknown[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<unknown[]>({
      method: 'GET',
      path: `/StopPoint/Meta/StopTypes`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets Stopoints that are reachable from a station/line combination.
     * @operationId StopPoint_ReachableFrom
     * @deprecated false
     */
    reachableFrom: async (args: StopPointReachableFromArgs): Promise<TflApiPresentationEntitiesStopPoint[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.serviceTypes !== undefined) query["serviceTypes"] = args.serviceTypes;
    return http.request<TflApiPresentationEntitiesStopPoint[]>({
      method: 'GET',
      path: `/StopPoint/${formatPathParam(args.id)}/CanReachOnLine/${formatPathParam(args.lineId)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Returns the route sections for all the lines that service the given stop point ids
     * @operationId StopPoint_Route
     * @deprecated false
     */
    route: async (args: StopPointRouteArgs): Promise<TflApiPresentationEntitiesStopPointRouteSection[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.serviceTypes !== undefined) query["serviceTypes"] = args.serviceTypes;
    return http.request<TflApiPresentationEntitiesStopPointRouteSection[]>({
      method: 'GET',
      path: `/StopPoint/${formatPathParam(args.id)}/Route`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Search StopPoints by their common name, or their 5-digit Countdown Bus Stop Code.
     * @operationId StopPoint_Search
     * @deprecated false
     */
    search: async (args: StopPointSearchArgs): Promise<TflApiPresentationEntitiesSearchResponse> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.modes !== undefined) query["modes"] = args.modes;
    if (args.faresOnly !== undefined) query["faresOnly"] = args.faresOnly;
    if (args.maxResults !== undefined) query["maxResults"] = args.maxResults;
    if (args.lines !== undefined) query["lines"] = args.lines;
    if (args.includeHubs !== undefined) query["includeHubs"] = args.includeHubs;
    if (args.tflOperatedNationalRailStationsOnly !== undefined) query["tflOperatedNationalRailStationsOnly"] = args.tflOperatedNationalRailStationsOnly;
    return http.request<TflApiPresentationEntitiesSearchResponse>({
      method: 'GET',
      path: `/StopPoint/Search/${formatPathParam(args.query)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Get a list of places corresponding to a given id and place types.
     * @operationId StopPoint_Get
     * @deprecated false
     */
    stopPointGet: async (args: StopPointStopPointGetArgs): Promise<TflApiPresentationEntitiesPlace[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.placeTypes !== undefined) query["placeTypes"] = args.placeTypes;
    return http.request<TflApiPresentationEntitiesPlace[]>({
      method: 'GET',
      path: `/StopPoint/${formatPathParam(args.id)}/placeTypes`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Search StopPoints by their common name, or their 5-digit Countdown Bus Stop Code.
     * @operationId StopPoint_Search
     * @deprecated false
     */
    stopPointSearch: async (args: StopPointStopPointSearchArgs): Promise<TflApiPresentationEntitiesSearchResponse> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.query !== undefined) query["query"] = args.query;
    if (args.modes !== undefined) query["modes"] = args.modes;
    if (args.faresOnly !== undefined) query["faresOnly"] = args.faresOnly;
    if (args.maxResults !== undefined) query["maxResults"] = args.maxResults;
    if (args.lines !== undefined) query["lines"] = args.lines;
    if (args.includeHubs !== undefined) query["includeHubs"] = args.includeHubs;
    if (args.tflOperatedNationalRailStationsOnly !== undefined) query["tflOperatedNationalRailStationsOnly"] = args.tflOperatedNationalRailStationsOnly;
    return http.request<TflApiPresentationEntitiesSearchResponse>({
      method: 'GET',
      path: `/StopPoint/Search`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
});
