// Auto-generated raw TfL API client. Do not edit manually.
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ./generated.meta.json

import { TflHttpClient } from '../core/http';
import type {
  SystemObject,
  TflApiPresentationEntitiesAccidentStatsAccidentDetail,
  TflApiPresentationEntitiesActiveServiceType,
  TflApiPresentationEntitiesArrivalDeparture,
  TflApiPresentationEntitiesBikePointOccupancy,
  TflApiPresentationEntitiesCarParkOccupancy,
  TflApiPresentationEntitiesChargeConnectorOccupancy,
  TflApiPresentationEntitiesDisruptedPoint,
  TflApiPresentationEntitiesDisruption,
  TflApiPresentationEntitiesJourneyPlannerItineraryResult,
  TflApiPresentationEntitiesLine,
  TflApiPresentationEntitiesLineServiceType,
  TflApiPresentationEntitiesMode,
  TflApiPresentationEntitiesPlace,
  TflApiPresentationEntitiesPlaceCategory,
  TflApiPresentationEntitiesPrediction,
  TflApiPresentationEntitiesRoadCorridor,
  TflApiPresentationEntitiesRoadDisruption,
  TflApiPresentationEntitiesRouteSearchResponse,
  TflApiPresentationEntitiesRouteSequence,
  TflApiPresentationEntitiesSearchResponse,
  TflApiPresentationEntitiesStatusSeverity,
  TflApiPresentationEntitiesStopPoint,
  TflApiPresentationEntitiesStopPointCategory,
  TflApiPresentationEntitiesStopPointRouteSection,
  TflApiPresentationEntitiesStopPointsResponse,
  TflApiPresentationEntitiesTimetableResponse,
} from './types';


export interface AccidentStatsGetArgs {
    year: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface AirQualityGetArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

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

export interface JourneyJourneyResultsArgs {
    from: string | number | boolean | string[];
    to: string | number | boolean | string[];
    via?: string | number | boolean | string[];
    nationalSearch?: string | number | boolean | string[];
    date?: string | number | boolean | string[];
    time?: string | number | boolean | string[];
    timeIs?: string | number | boolean | string[];
    journeyPreference?: string | number | boolean | string[];
    mode?: string | number | boolean | string[];
    accessibilityPreference?: string | number | boolean | string[];
    fromName?: string | number | boolean | string[];
    toName?: string | number | boolean | string[];
    viaName?: string | number | boolean | string[];
    maxTransferMinutes?: string | number | boolean | string[];
    maxWalkingMinutes?: string | number | boolean | string[];
    walkingSpeed?: string | number | boolean | string[];
    cyclePreference?: string | number | boolean | string[];
    adjustment?: string | number | boolean | string[];
    bikeProficiency?: string | number | boolean | string[];
    alternativeCycle?: string | number | boolean | string[];
    alternativeWalking?: string | number | boolean | string[];
    applyHtmlMarkup?: string | number | boolean | string[];
    useMultiModalCall?: string | number | boolean | string[];
    walkingOptimization?: string | number | boolean | string[];
    taxiOnlyTrip?: string | number | boolean | string[];
    routeBetweenEntrances?: string | number | boolean | string[];
    useRealTimeLiveArrivals?: string | number | boolean | string[];
    calcOneDirection?: string | number | boolean | string[];
    includeAlternativeRoutes?: string | number | boolean | string[];
    overrideMultiModalScenario?: string | number | boolean | string[];
    combineTransferLegs?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface JourneyMetaArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

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

export interface PlaceGetArgs {
    id: string | number | boolean | string[];
    includeChildren?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface PlaceGetAtArgs {
    type: string | number | boolean | string[];
    lat: string | number | boolean | string[];
    lon: string | number | boolean | string[];
    "location.lat": string | number | boolean | string[];
    "location.lon": string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface PlaceGetByGeoArgs {
    radius?: string | number | boolean | string[];
    categories?: string | number | boolean | string[];
    includeChildren?: string | number | boolean | string[];
    type?: string | number | boolean | string[];
    activeOnly?: string | number | boolean | string[];
    numberOfPlacesToReturn?: string | number | boolean | string[];
    "placeGeo.swLat"?: string | number | boolean | string[];
    "placeGeo.swLon"?: string | number | boolean | string[];
    "placeGeo.neLat"?: string | number | boolean | string[];
    "placeGeo.neLon"?: string | number | boolean | string[];
    "placeGeo.lat"?: string | number | boolean | string[];
    "placeGeo.lon"?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface PlaceGetByTypeArgs {
    types: string | number | boolean | string[];
    activeOnly?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface PlaceGetOverlayArgs {
    type: string | number | boolean | string[];
    z: string | number | boolean | string[];
    lat: string | number | boolean | string[];
    lon: string | number | boolean | string[];
    width: string | number | boolean | string[];
    height: string | number | boolean | string[];
    "location.lat": string | number | boolean | string[];
    "location.lon": string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface PlaceGetStreetsByPostCodeArgs {
    postcode: string | number | boolean | string[];
    "postcodeInput.postcode"?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface PlaceMetaCategoriesArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface PlaceMetaPlaceTypesArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface PlaceSearchArgs {
    name: string | number | boolean | string[];
    types?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

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
    "location.lat": string | number | boolean | string[];
    "location.lon": string | number | boolean | string[];
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

export interface TravelTimeGetCompareOverlayArgs {
    z: string | number | boolean | string[];
    mapCenterLat: string | number | boolean | string[];
    mapCenterLon: string | number | boolean | string[];
    pinLat: string | number | boolean | string[];
    pinLon: string | number | boolean | string[];
    width: string | number | boolean | string[];
    height: string | number | boolean | string[];
    scenarioTitle: string | number | boolean | string[];
    timeOfDayId: string | number | boolean | string[];
    modeId: string | number | boolean | string[];
    direction: string | number | boolean | string[];
    travelTimeInterval: string | number | boolean | string[];
    compareType: string | number | boolean | string[];
    compareValue: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface TravelTimeGetOverlayArgs {
    z: string | number | boolean | string[];
    mapCenterLat: string | number | boolean | string[];
    mapCenterLon: string | number | boolean | string[];
    pinLat: string | number | boolean | string[];
    pinLon: string | number | boolean | string[];
    width: string | number | boolean | string[];
    height: string | number | boolean | string[];
    scenarioTitle: string | number | boolean | string[];
    timeOfDayId: string | number | boolean | string[];
    modeId: string | number | boolean | string[];
    direction: string | number | boolean | string[];
    travelTimeInterval: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface VehicleGetArgs {
    ids: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

const formatPathParam = (value: string | number | boolean | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value.join(',');
  }
  if (value === undefined || value === null) {
    return '';
  }
  return String(value);
};

export class RawClient {
  constructor(private readonly http: TflHttpClient) {}

  readonly accidentStats = {
    /**
     * Gets all accident details for accidents occuring in the specified year
     * @operationId AccidentStats_Get
     * @deprecated false
     */
    get: async (args: AccidentStatsGetArgs): Promise<TflApiPresentationEntitiesAccidentStatsAccidentDetail[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return this.http.request<TflApiPresentationEntitiesAccidentStatsAccidentDetail[]>({
      method: 'GET',
      path: `/AccidentStats/${formatPathParam(args.year)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
  };

  readonly airQuality = {
    /**
     * Gets air quality data feed
     * @operationId AirQuality_Get
     * @deprecated false
     */
    get: async (args: AirQualityGetArgs = {}): Promise<SystemObject> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return this.http.request<SystemObject>({
      method: 'GET',
      path: `/AirQuality`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
  };

  readonly bikePoint = {
    /**
     * Gets the bike point with the given id.
     * @operationId BikePoint_Get
     * @deprecated false
     */
    get: async (args: BikePointGetArgs): Promise<TflApiPresentationEntitiesPlace> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return this.http.request<TflApiPresentationEntitiesPlace>({
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

    return this.http.request<TflApiPresentationEntitiesPlace[]>({
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
    return this.http.request<TflApiPresentationEntitiesPlace[]>({
      method: 'GET',
      path: `/BikePoint/Search`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
  };

  readonly cabwise = {
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
    return this.http.request<SystemObject>({
      method: 'GET',
      path: `/Cabwise/search`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
  };

  readonly journey = {
    /**
     * Perform a Journey Planner search from the parameters specified in simple types
     * @operationId Journey_JourneyResults
     * @deprecated false
     */
    journeyResults: async (args: JourneyJourneyResultsArgs): Promise<TflApiPresentationEntitiesJourneyPlannerItineraryResult> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.via !== undefined) query["via"] = args.via;
    if (args.nationalSearch !== undefined) query["nationalSearch"] = args.nationalSearch;
    if (args.date !== undefined) query["date"] = args.date;
    if (args.time !== undefined) query["time"] = args.time;
    if (args.timeIs !== undefined) query["timeIs"] = args.timeIs;
    if (args.journeyPreference !== undefined) query["journeyPreference"] = args.journeyPreference;
    if (args.mode !== undefined) query["mode"] = args.mode;
    if (args.accessibilityPreference !== undefined) query["accessibilityPreference"] = args.accessibilityPreference;
    if (args.fromName !== undefined) query["fromName"] = args.fromName;
    if (args.toName !== undefined) query["toName"] = args.toName;
    if (args.viaName !== undefined) query["viaName"] = args.viaName;
    if (args.maxTransferMinutes !== undefined) query["maxTransferMinutes"] = args.maxTransferMinutes;
    if (args.maxWalkingMinutes !== undefined) query["maxWalkingMinutes"] = args.maxWalkingMinutes;
    if (args.walkingSpeed !== undefined) query["walkingSpeed"] = args.walkingSpeed;
    if (args.cyclePreference !== undefined) query["cyclePreference"] = args.cyclePreference;
    if (args.adjustment !== undefined) query["adjustment"] = args.adjustment;
    if (args.bikeProficiency !== undefined) query["bikeProficiency"] = args.bikeProficiency;
    if (args.alternativeCycle !== undefined) query["alternativeCycle"] = args.alternativeCycle;
    if (args.alternativeWalking !== undefined) query["alternativeWalking"] = args.alternativeWalking;
    if (args.applyHtmlMarkup !== undefined) query["applyHtmlMarkup"] = args.applyHtmlMarkup;
    if (args.useMultiModalCall !== undefined) query["useMultiModalCall"] = args.useMultiModalCall;
    if (args.walkingOptimization !== undefined) query["walkingOptimization"] = args.walkingOptimization;
    if (args.taxiOnlyTrip !== undefined) query["taxiOnlyTrip"] = args.taxiOnlyTrip;
    if (args.routeBetweenEntrances !== undefined) query["routeBetweenEntrances"] = args.routeBetweenEntrances;
    if (args.useRealTimeLiveArrivals !== undefined) query["useRealTimeLiveArrivals"] = args.useRealTimeLiveArrivals;
    if (args.calcOneDirection !== undefined) query["calcOneDirection"] = args.calcOneDirection;
    if (args.includeAlternativeRoutes !== undefined) query["includeAlternativeRoutes"] = args.includeAlternativeRoutes;
    if (args.overrideMultiModalScenario !== undefined) query["overrideMultiModalScenario"] = args.overrideMultiModalScenario;
    if (args.combineTransferLegs !== undefined) query["combineTransferLegs"] = args.combineTransferLegs;
    return this.http.request<TflApiPresentationEntitiesJourneyPlannerItineraryResult>({
      method: 'GET',
      path: `/Journey/JourneyResults/${formatPathParam(args.from)}/to/${formatPathParam(args.to)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets a list of all of the available journey planner modes
     * @operationId Journey_Meta
     * @deprecated false
     */
    meta: async (args: JourneyMetaArgs = {}): Promise<TflApiPresentationEntitiesMode[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return this.http.request<TflApiPresentationEntitiesMode[]>({
      method: 'GET',
      path: `/Journey/Meta/Modes`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
  };

  readonly line = {
    /**
     * Get the list of arrival predictions for given line ids based at the given stop
     * @operationId Line_Arrivals
     * @deprecated false
     */
    arrivals: async (args: LineArrivalsArgs): Promise<TflApiPresentationEntitiesPrediction[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.direction !== undefined) query["direction"] = args.direction;
    if (args.destinationStationId !== undefined) query["destinationStationId"] = args.destinationStationId;
    return this.http.request<TflApiPresentationEntitiesPrediction[]>({
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

    return this.http.request<TflApiPresentationEntitiesDisruption[]>({
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

    return this.http.request<TflApiPresentationEntitiesDisruption[]>({
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

    return this.http.request<TflApiPresentationEntitiesLine[]>({
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

    return this.http.request<TflApiPresentationEntitiesLine[]>({
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
    return this.http.request<TflApiPresentationEntitiesLine[]>({
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

    return this.http.request<unknown[]>({
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

    return this.http.request<TflApiPresentationEntitiesMode[]>({
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

    return this.http.request<unknown[]>({
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

    return this.http.request<TflApiPresentationEntitiesStatusSeverity[]>({
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
    return this.http.request<TflApiPresentationEntitiesLine[]>({
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
    return this.http.request<TflApiPresentationEntitiesLine[]>({
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
    return this.http.request<TflApiPresentationEntitiesRouteSequence>({
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
    return this.http.request<TflApiPresentationEntitiesRouteSearchResponse>({
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
    if (args.startDate !== undefined) query["startDate"] = args.startDate;
    if (args.endDate !== undefined) query["endDate"] = args.endDate;
    if (args["dateRange.startDate"] !== undefined) query["dateRange.startDate"] = args["dateRange.startDate"];
    if (args["dateRange.endDate"] !== undefined) query["dateRange.endDate"] = args["dateRange.endDate"];
    return this.http.request<TflApiPresentationEntitiesLine[]>({
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
    return this.http.request<TflApiPresentationEntitiesLine[]>({
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
    return this.http.request<TflApiPresentationEntitiesLine[]>({
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

    return this.http.request<TflApiPresentationEntitiesLine[]>({
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
    return this.http.request<TflApiPresentationEntitiesStopPoint[]>({
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

    return this.http.request<TflApiPresentationEntitiesTimetableResponse>({
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

    return this.http.request<TflApiPresentationEntitiesTimetableResponse>({
      method: 'GET',
      path: `/Line/${formatPathParam(args.id)}/Timetable/${formatPathParam(args.fromStopPointId)}/to/${formatPathParam(args.toStopPointId)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
  };

  readonly mode = {
    /**
     * Gets the next arrival predictions for all stops of a given mode
     * @operationId Mode_Arrivals
     * @deprecated false
     */
    arrivals: async (args: ModeArrivalsArgs): Promise<TflApiPresentationEntitiesPrediction[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.count !== undefined) query["count"] = args.count;
    return this.http.request<TflApiPresentationEntitiesPrediction[]>({
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

    return this.http.request<TflApiPresentationEntitiesActiveServiceType[]>({
      method: 'GET',
      path: `/Mode/ActiveServiceTypes`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
  };

  readonly occupancy = {
    /**
     * Gets the occupancy for a car park with a given id
     * @operationId Occupancy_Get
     * @deprecated false
     */
    get: async (args: OccupancyGetArgs): Promise<TflApiPresentationEntitiesCarParkOccupancy> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return this.http.request<TflApiPresentationEntitiesCarParkOccupancy>({
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

    return this.http.request<TflApiPresentationEntitiesChargeConnectorOccupancy[]>({
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

    return this.http.request<TflApiPresentationEntitiesBikePointOccupancy[]>({
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

    return this.http.request<TflApiPresentationEntitiesChargeConnectorOccupancy[]>({
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

    return this.http.request<TflApiPresentationEntitiesCarParkOccupancy[]>({
      method: 'GET',
      path: `/Occupancy/CarPark`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
  };

  readonly place = {
    /**
     * Gets the place with the given id.
     * @operationId Place_Get
     * @deprecated false
     */
    get: async (args: PlaceGetArgs): Promise<TflApiPresentationEntitiesPlace[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.includeChildren !== undefined) query["includeChildren"] = args.includeChildren;
    return this.http.request<TflApiPresentationEntitiesPlace[]>({
      method: 'GET',
      path: `/Place/${formatPathParam(args.id)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets any places of the given type whose geography intersects the given latitude and longitude. In practice this means the Place
            must be polygonal e.g. a BoroughBoundary.
     * @operationId Place_GetAt
     * @deprecated false
     */
    getAt: async (args: PlaceGetAtArgs): Promise<SystemObject> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.lat !== undefined) query["lat"] = args.lat;
    if (args.lon !== undefined) query["lon"] = args.lon;
    if (args["location.lat"] !== undefined) query["location.lat"] = args["location.lat"];
    if (args["location.lon"] !== undefined) query["location.lon"] = args["location.lon"];
    return this.http.request<SystemObject>({
      method: 'GET',
      path: `/Place/${formatPathParam(args.type)}/At/${formatPathParam(args.lat)}/${formatPathParam(args.lon)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the places that lie within a geographic region. The geographic region of interest can either be specified
            by using a lat/lon geo-point and a radius in metres to return places within the locus defined by the lat/lon of
            its centre or alternatively, by the use of a bounding box defined by the lat/lon of its north-west and south-east corners.
            Optionally filters on type and can strip properties for a smaller payload.
     * @operationId Place_GetByGeo
     * @deprecated false
     */
    getByGeo: async (args: PlaceGetByGeoArgs = {}): Promise<TflApiPresentationEntitiesStopPoint[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.radius !== undefined) query["radius"] = args.radius;
    if (args.categories !== undefined) query["categories"] = args.categories;
    if (args.includeChildren !== undefined) query["includeChildren"] = args.includeChildren;
    if (args.type !== undefined) query["type"] = args.type;
    if (args.activeOnly !== undefined) query["activeOnly"] = args.activeOnly;
    if (args.numberOfPlacesToReturn !== undefined) query["numberOfPlacesToReturn"] = args.numberOfPlacesToReturn;
    if (args["placeGeo.swLat"] !== undefined) query["placeGeo.swLat"] = args["placeGeo.swLat"];
    if (args["placeGeo.swLon"] !== undefined) query["placeGeo.swLon"] = args["placeGeo.swLon"];
    if (args["placeGeo.neLat"] !== undefined) query["placeGeo.neLat"] = args["placeGeo.neLat"];
    if (args["placeGeo.neLon"] !== undefined) query["placeGeo.neLon"] = args["placeGeo.neLon"];
    if (args["placeGeo.lat"] !== undefined) query["placeGeo.lat"] = args["placeGeo.lat"];
    if (args["placeGeo.lon"] !== undefined) query["placeGeo.lon"] = args["placeGeo.lon"];
    return this.http.request<TflApiPresentationEntitiesStopPoint[]>({
      method: 'GET',
      path: `/Place`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets all places of a given type
     * @operationId Place_GetByType
     * @deprecated false
     */
    getByType: async (args: PlaceGetByTypeArgs): Promise<TflApiPresentationEntitiesPlace[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.activeOnly !== undefined) query["activeOnly"] = args.activeOnly;
    return this.http.request<TflApiPresentationEntitiesPlace[]>({
      method: 'GET',
      path: `/Place/Type/${formatPathParam(args.types)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the place overlay for a given set of co-ordinates and a given width/height.
     * @operationId Place_GetOverlay
     * @deprecated false
     */
    getOverlay: async (args: PlaceGetOverlayArgs): Promise<SystemObject> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.lat !== undefined) query["lat"] = args.lat;
    if (args.lon !== undefined) query["lon"] = args.lon;
    if (args["location.lat"] !== undefined) query["location.lat"] = args["location.lat"];
    if (args["location.lon"] !== undefined) query["location.lon"] = args["location.lon"];
    return this.http.request<SystemObject>({
      method: 'GET',
      path: `/Place/${formatPathParam(args.type)}/overlay/${formatPathParam(args.z)}/${formatPathParam(args.lat)}/${formatPathParam(args.lon)}/${formatPathParam(args.width)}/${formatPathParam(args.height)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the set of streets associated with a post code.
     * @operationId Place_GetStreetsByPostCode
     * @deprecated false
     */
    getStreetsByPostCode: async (args: PlaceGetStreetsByPostCodeArgs): Promise<SystemObject> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.postcode !== undefined) query["postcode"] = args.postcode;
    if (args["postcodeInput.postcode"] !== undefined) query["postcodeInput.postcode"] = args["postcodeInput.postcode"];
    return this.http.request<SystemObject>({
      method: 'GET',
      path: `/Place/Address/Streets/${formatPathParam(args.postcode)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets a list of all of the available place property categories and keys.
     * @operationId Place_MetaCategories
     * @deprecated false
     */
    metaCategories: async (args: PlaceMetaCategoriesArgs = {}): Promise<TflApiPresentationEntitiesPlaceCategory[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return this.http.request<TflApiPresentationEntitiesPlaceCategory[]>({
      method: 'GET',
      path: `/Place/Meta/Categories`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets a list of the available types of Place.
     * @operationId Place_MetaPlaceTypes
     * @deprecated false
     */
    metaPlaceTypes: async (args: PlaceMetaPlaceTypesArgs = {}): Promise<TflApiPresentationEntitiesPlaceCategory[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return this.http.request<TflApiPresentationEntitiesPlaceCategory[]>({
      method: 'GET',
      path: `/Place/Meta/PlaceTypes`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets all places that matches the given query
     * @operationId Place_Search
     * @deprecated false
     */
    search: async (args: PlaceSearchArgs): Promise<TflApiPresentationEntitiesPlace[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.name !== undefined) query["name"] = args.name;
    if (args.types !== undefined) query["types"] = args.types;
    return this.http.request<TflApiPresentationEntitiesPlace[]>({
      method: 'GET',
      path: `/Place/Search`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
  };

  readonly road = {
    /**
     * Gets a list of disrupted streets. If no date filters are provided, current disruptions are returned.
     * @operationId Road_DisruptedStreets
     * @deprecated false
     */
    disruptedStreets: async (args: RoadDisruptedStreetsArgs): Promise<SystemObject> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.startDate !== undefined) query["startDate"] = args.startDate;
    if (args.endDate !== undefined) query["endDate"] = args.endDate;
    return this.http.request<SystemObject>({
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
    return this.http.request<TflApiPresentationEntitiesRoadDisruption[]>({
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
    return this.http.request<TflApiPresentationEntitiesRoadDisruption>({
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

    return this.http.request<TflApiPresentationEntitiesRoadCorridor[]>({
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

    return this.http.request<unknown[]>({
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

    return this.http.request<TflApiPresentationEntitiesStatusSeverity[]>({
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

    return this.http.request<TflApiPresentationEntitiesRoadCorridor[]>({
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
    return this.http.request<TflApiPresentationEntitiesRoadCorridor[]>({
      method: 'GET',
      path: `/Road/${formatPathParam(args.ids)}/Status`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
  };

  readonly search = {
    /**
     * Searches the bus schedules folder on S3 for a given bus number.
     * @operationId Search_BusSchedules
     * @deprecated false
     */
    busSchedules: async (args: SearchBusSchedulesArgs): Promise<TflApiPresentationEntitiesSearchResponse> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.query !== undefined) query["query"] = args.query;
    return this.http.request<TflApiPresentationEntitiesSearchResponse>({
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
    return this.http.request<TflApiPresentationEntitiesSearchResponse>({
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

    return this.http.request<unknown[]>({
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

    return this.http.request<unknown[]>({
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

    return this.http.request<unknown[]>({
      method: 'GET',
      path: `/Search/Meta/Sorts`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
  };

  readonly stopPoint = {
    /**
     * Gets the list of arrival and departure predictions for the given stop point id (overground, Elizabeth line and thameslink only)
     * @operationId StopPoint_ArrivalDepartures
     * @deprecated false
     */
    arrivalDepartures: async (args: StopPointArrivalDeparturesArgs): Promise<TflApiPresentationEntitiesArrivalDeparture[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.lineIds !== undefined) query["lineIds"] = args.lineIds;
    return this.http.request<TflApiPresentationEntitiesArrivalDeparture[]>({
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

    return this.http.request<TflApiPresentationEntitiesPrediction[]>({
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
    return this.http.request<TflApiPresentationEntitiesStopPoint[]>({
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
    return this.http.request<string>({
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
    return this.http.request<TflApiPresentationEntitiesDisruptedPoint[]>({
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
    return this.http.request<TflApiPresentationEntitiesDisruptedPoint[]>({
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
    return this.http.request<TflApiPresentationEntitiesStopPoint[]>({
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
    if (args["location.lat"] !== undefined) query["location.lat"] = args["location.lat"];
    if (args["location.lon"] !== undefined) query["location.lon"] = args["location.lon"];
    return this.http.request<TflApiPresentationEntitiesStopPointsResponse>({
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
    return this.http.request<TflApiPresentationEntitiesStopPointsResponse>({
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
    return this.http.request<SystemObject>({
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

    return this.http.request<TflApiPresentationEntitiesStopPoint[]>({
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

    return this.http.request<TflApiPresentationEntitiesStopPoint[]>({
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

    return this.http.request<TflApiPresentationEntitiesPlace[]>({
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
    return this.http.request<TflApiPresentationEntitiesLineServiceType[]>({
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

    return this.http.request<TflApiPresentationEntitiesPlace[]>({
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

    return this.http.request<TflApiPresentationEntitiesStopPointCategory[]>({
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

    return this.http.request<TflApiPresentationEntitiesMode[]>({
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

    return this.http.request<unknown[]>({
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
    return this.http.request<TflApiPresentationEntitiesStopPoint[]>({
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
    return this.http.request<TflApiPresentationEntitiesStopPointRouteSection[]>({
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
    return this.http.request<TflApiPresentationEntitiesSearchResponse>({
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
    return this.http.request<TflApiPresentationEntitiesPlace[]>({
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
    return this.http.request<TflApiPresentationEntitiesSearchResponse>({
      method: 'GET',
      path: `/StopPoint/Search`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
  };

  readonly travelTime = {
    /**
     * Gets the TravelTime overlay.
     * @operationId TravelTime_GetCompareOverlay
     * @deprecated false
     */
    getCompareOverlay: async (args: TravelTimeGetCompareOverlayArgs): Promise<SystemObject> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.scenarioTitle !== undefined) query["scenarioTitle"] = args.scenarioTitle;
    if (args.timeOfDayId !== undefined) query["timeOfDayId"] = args.timeOfDayId;
    if (args.modeId !== undefined) query["modeId"] = args.modeId;
    if (args.direction !== undefined) query["direction"] = args.direction;
    if (args.travelTimeInterval !== undefined) query["travelTimeInterval"] = args.travelTimeInterval;
    if (args.compareType !== undefined) query["compareType"] = args.compareType;
    if (args.compareValue !== undefined) query["compareValue"] = args.compareValue;
    return this.http.request<SystemObject>({
      method: 'GET',
      path: `/TravelTimes/compareOverlay/${formatPathParam(args.z)}/mapcenter/${formatPathParam(args.mapCenterLat)}/${formatPathParam(args.mapCenterLon)}/pinlocation/${formatPathParam(args.pinLat)}/${formatPathParam(args.pinLon)}/dimensions/${formatPathParam(args.width)}/${formatPathParam(args.height)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the TravelTime overlay.
     * @operationId TravelTime_GetOverlay
     * @deprecated false
     */
    getOverlay: async (args: TravelTimeGetOverlayArgs): Promise<SystemObject> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.scenarioTitle !== undefined) query["scenarioTitle"] = args.scenarioTitle;
    if (args.timeOfDayId !== undefined) query["timeOfDayId"] = args.timeOfDayId;
    if (args.modeId !== undefined) query["modeId"] = args.modeId;
    if (args.direction !== undefined) query["direction"] = args.direction;
    if (args.travelTimeInterval !== undefined) query["travelTimeInterval"] = args.travelTimeInterval;
    return this.http.request<SystemObject>({
      method: 'GET',
      path: `/TravelTimes/overlay/${formatPathParam(args.z)}/mapcenter/${formatPathParam(args.mapCenterLat)}/${formatPathParam(args.mapCenterLon)}/pinlocation/${formatPathParam(args.pinLat)}/${formatPathParam(args.pinLon)}/dimensions/${formatPathParam(args.width)}/${formatPathParam(args.height)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
  };

  readonly vehicle = {
    /**
     * Gets the predictions for a given list of vehicle Id's.
     * @operationId Vehicle_Get
     * @deprecated false
     */
    get: async (args: VehicleGetArgs): Promise<TflApiPresentationEntitiesPrediction[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return this.http.request<TflApiPresentationEntitiesPrediction[]>({
      method: 'GET',
      path: `/Vehicle/${formatPathParam(args.ids)}/Arrivals`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
  };
}
