// Auto-generated raw TfL API client. Do not edit manually.
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ./generated.meta.json

import type { TflHttpClient } from '../../core/http';
import { formatPathParam } from './_shared';
import type {
  TflApiPresentationEntitiesDisruption,
  TflApiPresentationEntitiesLine,
  TflApiPresentationEntitiesMode,
  TflApiPresentationEntitiesPrediction,
  TflApiPresentationEntitiesRouteSearchResponse,
  TflApiPresentationEntitiesRouteSequence,
  TflApiPresentationEntitiesStatusSeverity,
  TflApiPresentationEntitiesStopPoint,
  TflApiPresentationEntitiesTimetableResponse,
} from '../types';

export interface LineArrivalsArgs {
    ids: string | number | boolean | string[];
    stopPointId: string | number | boolean | string[];
    direction?: string | number | boolean | string[];
    destinationStationId?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface LineDisruptionArgs {
    ids: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface LineDisruptionByModeArgs {
    modes: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface LineGetArgs {
    ids: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface LineGetByModeArgs {
    modes: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface LineLineRoutesByIdsArgs {
    ids: string | number | boolean | string[];
    serviceTypes?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface LineMetaDisruptionCategoriesArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface LineMetaModesArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface LineMetaServiceTypesArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface LineMetaSeverityArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface LineRouteArgs {
    serviceTypes?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface LineRouteByModeArgs {
    modes: string | number | boolean | string[];
    serviceTypes?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface LineRouteSequenceArgs {
    id: string | number | boolean | string[];
    direction: string | number | boolean | string[];
    serviceTypes?: string | number | boolean | string[];
    excludeCrowding?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface LineSearchArgs {
    query: string | number | boolean | string[];
    modes?: string | number | boolean | string[];
    serviceTypes?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface LineStatusArgs {
    ids: string | number | boolean | string[];
    startDate: string | number | boolean | string[];
    endDate: string | number | boolean | string[];
    detail?: string | number | boolean | string[];
    "dateRange.startDate"?: string | number | boolean | string[];
    "dateRange.endDate"?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface LineStatusByIdsArgs {
    ids: string | number | boolean | string[];
    detail?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface LineStatusByModeArgs {
    modes: string | number | boolean | string[];
    detail?: string | number | boolean | string[];
    severityLevel?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface LineStatusBySeverityArgs {
    severity: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface LineStopPointsArgs {
    id: string | number | boolean | string[];
    tflOperatedNationalRailStationsOnly?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface LineTimetableArgs {
    id: string | number | boolean | string[];
    fromStopPointId: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface LineTimetableToArgs {
    id: string | number | boolean | string[];
    fromStopPointId: string | number | boolean | string[];
    toStopPointId: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export const createLineRaw = (http: TflHttpClient) => ({
    /**
     * Get the list of arrival predictions for given line ids based at the given stop
     * @operationId Line_Arrivals
     * @deprecated false
     */
    arrivals: async (args: LineArrivalsArgs): Promise<TflApiPresentationEntitiesPrediction[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.direction !== undefined) query["direction"] = args.direction;
    if (args.destinationStationId !== undefined) query["destinationStationId"] = args.destinationStationId;
    return http.request<TflApiPresentationEntitiesPrediction[]>({
      method: 'GET',
      path: `/Line/${formatPathParam(args.ids)}/Arrivals/${formatPathParam(args.stopPointId)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Get disruptions for the given line ids
     * @operationId Line_Disruption
     * @deprecated false
     */
    disruption: async (args: LineDisruptionArgs): Promise<TflApiPresentationEntitiesDisruption[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesDisruption[]>({
      method: 'GET',
      path: `/Line/${formatPathParam(args.ids)}/Disruption`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Get disruptions for all lines of the given modes.
     * @operationId Line_DisruptionByMode
     * @deprecated false
     */
    disruptionByMode: async (args: LineDisruptionByModeArgs): Promise<TflApiPresentationEntitiesDisruption[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesDisruption[]>({
      method: 'GET',
      path: `/Line/Mode/${formatPathParam(args.modes)}/Disruption`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets lines that match the specified line ids.
     * @operationId Line_Get
     * @deprecated false
     */
    get: async (args: LineGetArgs): Promise<TflApiPresentationEntitiesLine[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesLine[]>({
      method: 'GET',
      path: `/Line/${formatPathParam(args.ids)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets lines that serve the given modes.
     * @operationId Line_GetByMode
     * @deprecated false
     */
    getByMode: async (args: LineGetByModeArgs): Promise<TflApiPresentationEntitiesLine[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesLine[]>({
      method: 'GET',
      path: `/Line/Mode/${formatPathParam(args.modes)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Get all valid routes for given line ids, including the name and id of the originating and terminating stops for each route.
     * @operationId Line_LineRoutesByIds
     * @deprecated false
     */
    lineRoutesByIds: async (args: LineLineRoutesByIdsArgs): Promise<TflApiPresentationEntitiesLine[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.serviceTypes !== undefined) query["serviceTypes"] = args.serviceTypes;
    return http.request<TflApiPresentationEntitiesLine[]>({
      method: 'GET',
      path: `/Line/${formatPathParam(args.ids)}/Route`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets a list of valid disruption categories
     * @operationId Line_MetaDisruptionCategories
     * @deprecated false
     */
    metaDisruptionCategories: async (args: LineMetaDisruptionCategoriesArgs = {}): Promise<unknown[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<unknown[]>({
      method: 'GET',
      path: `/Line/Meta/DisruptionCategories`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets a list of valid modes
     * @operationId Line_MetaModes
     * @deprecated false
     */
    metaModes: async (args: LineMetaModesArgs = {}): Promise<TflApiPresentationEntitiesMode[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesMode[]>({
      method: 'GET',
      path: `/Line/Meta/Modes`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets a list of valid ServiceTypes to filter on
     * @operationId Line_MetaServiceTypes
     * @deprecated false
     */
    metaServiceTypes: async (args: LineMetaServiceTypesArgs = {}): Promise<unknown[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<unknown[]>({
      method: 'GET',
      path: `/Line/Meta/ServiceTypes`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets a list of valid severity codes
     * @operationId Line_MetaSeverity
     * @deprecated false
     */
    metaSeverity: async (args: LineMetaSeverityArgs = {}): Promise<TflApiPresentationEntitiesStatusSeverity[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesStatusSeverity[]>({
      method: 'GET',
      path: `/Line/Meta/Severity`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Get all valid routes for all lines, including the name and id of the originating and terminating stops for each route.
     * @operationId Line_Route
     * @deprecated false
     */
    route: async (args: LineRouteArgs = {}): Promise<TflApiPresentationEntitiesLine[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.serviceTypes !== undefined) query["serviceTypes"] = args.serviceTypes;
    return http.request<TflApiPresentationEntitiesLine[]>({
      method: 'GET',
      path: `/Line/Route`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets all lines and their valid routes for given modes, including the name and id of the originating and terminating stops for each route
     * @operationId Line_RouteByMode
     * @deprecated false
     */
    routeByMode: async (args: LineRouteByModeArgs): Promise<TflApiPresentationEntitiesLine[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.serviceTypes !== undefined) query["serviceTypes"] = args.serviceTypes;
    return http.request<TflApiPresentationEntitiesLine[]>({
      method: 'GET',
      path: `/Line/Mode/${formatPathParam(args.modes)}/Route`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets all valid routes for given line id, including the sequence of stops on each route.
     * @operationId Line_RouteSequence
     * @deprecated false
     */
    routeSequence: async (args: LineRouteSequenceArgs): Promise<TflApiPresentationEntitiesRouteSequence> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.serviceTypes !== undefined) query["serviceTypes"] = args.serviceTypes;
    if (args.excludeCrowding !== undefined) query["excludeCrowding"] = args.excludeCrowding;
    return http.request<TflApiPresentationEntitiesRouteSequence>({
      method: 'GET',
      path: `/Line/${formatPathParam(args.id)}/Route/Sequence/${formatPathParam(args.direction)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Search for lines or routes matching the query string
     * @operationId Line_Search
     * @deprecated false
     */
    search: async (args: LineSearchArgs): Promise<TflApiPresentationEntitiesRouteSearchResponse> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.modes !== undefined) query["modes"] = args.modes;
    if (args.serviceTypes !== undefined) query["serviceTypes"] = args.serviceTypes;
    return http.request<TflApiPresentationEntitiesRouteSearchResponse>({
      method: 'GET',
      path: `/Line/Search/${formatPathParam(args.query)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the line status for given line ids during the provided dates e.g Minor Delays
     * @operationId Line_Status
     * @deprecated false
     */
    status: async (args: LineStatusArgs): Promise<TflApiPresentationEntitiesLine[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.detail !== undefined) query["detail"] = args.detail;
    if (args["dateRange.startDate"] !== undefined) query["dateRange.startDate"] = args["dateRange.startDate"];
    if (args["dateRange.endDate"] !== undefined) query["dateRange.endDate"] = args["dateRange.endDate"];
    return http.request<TflApiPresentationEntitiesLine[]>({
      method: 'GET',
      path: `/Line/${formatPathParam(args.ids)}/Status/${formatPathParam(args.startDate)}/to/${formatPathParam(args.endDate)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the line status of for given line ids e.g Minor Delays
     * @operationId Line_StatusByIds
     * @deprecated false
     */
    statusByIds: async (args: LineStatusByIdsArgs): Promise<TflApiPresentationEntitiesLine[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.detail !== undefined) query["detail"] = args.detail;
    return http.request<TflApiPresentationEntitiesLine[]>({
      method: 'GET',
      path: `/Line/${formatPathParam(args.ids)}/Status`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the line status of for all lines for the given modes
     * @operationId Line_StatusByMode
     * @deprecated false
     */
    statusByMode: async (args: LineStatusByModeArgs): Promise<TflApiPresentationEntitiesLine[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.detail !== undefined) query["detail"] = args.detail;
    if (args.severityLevel !== undefined) query["severityLevel"] = args.severityLevel;
    return http.request<TflApiPresentationEntitiesLine[]>({
      method: 'GET',
      path: `/Line/Mode/${formatPathParam(args.modes)}/Status`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the line status for all lines with a given severity
            A list of valid severity codes can be obtained from a call to Line/Meta/Severity
     * @operationId Line_StatusBySeverity
     * @deprecated false
     */
    statusBySeverity: async (args: LineStatusBySeverityArgs): Promise<TflApiPresentationEntitiesLine[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesLine[]>({
      method: 'GET',
      path: `/Line/Status/${formatPathParam(args.severity)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets a list of the stations that serve the given line id
     * @operationId Line_StopPoints
     * @deprecated false
     */
    stopPoints: async (args: LineStopPointsArgs): Promise<TflApiPresentationEntitiesStopPoint[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.tflOperatedNationalRailStationsOnly !== undefined) query["tflOperatedNationalRailStationsOnly"] = args.tflOperatedNationalRailStationsOnly;
    return http.request<TflApiPresentationEntitiesStopPoint[]>({
      method: 'GET',
      path: `/Line/${formatPathParam(args.id)}/StopPoints`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the timetable for a specified station on the give line
     * @operationId Line_Timetable
     * @deprecated false
     */
    timetable: async (args: LineTimetableArgs): Promise<TflApiPresentationEntitiesTimetableResponse> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesTimetableResponse>({
      method: 'GET',
      path: `/Line/${formatPathParam(args.id)}/Timetable/${formatPathParam(args.fromStopPointId)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the timetable for a specified station on the give line with specified destination
     * @operationId Line_TimetableTo
     * @deprecated false
     */
    timetableTo: async (args: LineTimetableToArgs): Promise<TflApiPresentationEntitiesTimetableResponse> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesTimetableResponse>({
      method: 'GET',
      path: `/Line/${formatPathParam(args.id)}/Timetable/${formatPathParam(args.fromStopPointId)}/to/${formatPathParam(args.toStopPointId)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
});
