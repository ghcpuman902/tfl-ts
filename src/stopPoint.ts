// this code is not generated, please edit to add additional features

import { 
  Api, 
  TflApiPresentationEntitiesStopPoint,
  TflApiPresentationEntitiesPrediction,
  TflApiPresentationEntitiesStopPointsResponse,
  TflApiPresentationEntitiesPlace,
  TflApiPresentationEntitiesStopPointCategory,
  TflApiPresentationEntitiesMode,
  TflApiPresentationEntitiesLineServiceType,
  TflApiPresentationEntitiesArrivalDeparture,
  TflApiPresentationEntitiesStopPointRouteSection,
  TflApiPresentationEntitiesDisruptedPoint,
  TflApiPresentationEntitiesSearchResponse,
  TflApiPresentationEntitiesMatchedStop,
  SystemObject,
  DirectionEnum2
} from './tfl';
import { BatchRequest } from './utils/batchRequest';
import { stripTypeFields } from './utils/stripTypes';

interface StopPointQuery {
  id?: string;
  ids?: string[];
  modes?: string[];
  maxResults?: number;
  lines?: string[];
  radius?: number;
  useStopPointHierarchy?: boolean;
  categories?: string[];
  returnLines?: boolean;
  stoptypes?: string[];
  direction?: string;
  includeCrowdingData?: boolean;
  tflOperatedNationalRailStationsOnly?: boolean;
  keepTflTypes?: boolean;
}

// Extend the SearchResponse type to use MatchedStop
interface ExtendedSearchResponse extends Omit<TflApiPresentationEntitiesSearchResponse, 'matches'> {
  matches?: TflApiPresentationEntitiesMatchedStop[];
}

interface SearchOptions {
  modes?: string[];
  maxResults?: number;
  lines?: string[];
  tflOperatedNationalRailStationsOnly?: boolean;
  keepTflTypes?: boolean;
}

class StopPoint {
  private api: Api<{}>;
  private batchRequest: BatchRequest;

  constructor(api: Api<{}>) {
    this.api = api;
    this.batchRequest = new BatchRequest(api);
  }

  /**
   * Gets the list of available StopPoint additional information categories
   */
  async getCategories(): Promise<TflApiPresentationEntitiesStopPointCategory[]> {
    return this.api.stopPoint.stopPointMetaCategories()
      .then(response => stripTypeFields(response.data));
  }

  /**
   * Gets the list of available StopPoint types
   */
  async getTypes(): Promise<string[]> {
    return this.api.stopPoint.stopPointMetaStopTypes()
      .then(response => response.data);
  }

  /**
   * Gets the list of available StopPoint modes
   */
  async getModes(): Promise<TflApiPresentationEntitiesMode[]> {
    return this.api.stopPoint.stopPointMetaModes()
      .then(response => stripTypeFields(response.data));
  }

  /**
   * Gets a list of StopPoints corresponding to the given list of stop ids
   */
  async get(options: StopPointQuery): Promise<TflApiPresentationEntitiesStopPoint[]> {
    const { ids } = options;
    if (!ids?.length) {
      throw new Error('Stop point ID(s) are required');
    }

    return this.batchRequest.processBatch(
      ids,
      async (chunk) => this.api.stopPoint.stopPointGet({ ids: chunk })
        .then(response => stripTypeFields(response.data, options.keepTflTypes))
    );
  }

  /**
   * Get a list of places corresponding to a given id and place types
   */
  async getPlaces(id: string, placeTypes: string[]): Promise<TflApiPresentationEntitiesPlace[]> {
    return this.api.stopPoint.stopPointGet2({ id, placeTypes })
      .then(response => stripTypeFields(response.data));
  }

  /**
   * Gets all the Crowding data for the StopPointId, plus crowding data for a given line and optionally a particular direction
   */
  async getCrowding(id: string, line: string, options?: { direction?: DirectionEnum2, keepTflTypes?: boolean }): Promise<TflApiPresentationEntitiesStopPoint[]> {
    return this.api.stopPoint.stopPointCrowding({ 
      id, 
      line, 
      direction: options?.direction || 'all'
    }).then(response => stripTypeFields(response.data, options?.keepTflTypes));
  }

  /**
   * Gets all stop points of a given type
   */
  async getByType(types: string[]): Promise<TflApiPresentationEntitiesStopPoint[]> {
    return this.api.stopPoint.stopPointGetByType(types)
      .then(response => stripTypeFields(response.data));
  }

  /**
   * Gets all the stop points of given type(s) with a page number
   */
  async getByTypeWithPagination(types: string[], page: number): Promise<TflApiPresentationEntitiesStopPoint[]> {
    return this.api.stopPoint.stopPointGetByTypeWithPagination(types, page)
      .then(response => stripTypeFields(response.data));
  }

  /**
   * Gets the service types for a given stoppoint
   */
  async getServiceTypes(options: { id: string, keepTflTypes?: boolean }): Promise<TflApiPresentationEntitiesLineServiceType[]> {
    return this.api.stopPoint.stopPointGetServiceTypes(options)
      .then(response => stripTypeFields(response.data, options.keepTflTypes));
  }

  /**
   * Gets the list of arrival predictions for the given stop point id
   */
  async getArrivals(ids: string[]): Promise<TflApiPresentationEntitiesPrediction[]> {
    return this.batchRequest.processBatch(
      ids,
      async (chunk) => Promise.all(
        chunk.map(id => this.api.stopPoint.stopPointArrivals(id)
          .then(response => stripTypeFields(response.data)))
      ).then(results => results.flat())
    );
  }

  /**
   * Gets the list of arrival and departure predictions for the given stop point id (overground, Elizabeth line and thameslink only)
   */
  async getArrivalDepartures(id: string, options?: { lineIds: string[], keepTflTypes?: boolean }): Promise<TflApiPresentationEntitiesArrivalDeparture[]> {
    return this.api.stopPoint.stopPointArrivalDepartures({ id, lineIds: options?.lineIds || [] })
      .then(response => stripTypeFields(response.data, options?.keepTflTypes));
  }

  /**
   * Gets Stopoints that are reachable from a station/line combination
   */
  async getReachableFrom(id: string, lineId: string, options?: { serviceTypes?: ('Regular' | 'Night')[], keepTflTypes?: boolean }): Promise<TflApiPresentationEntitiesStopPoint[]> {
    return this.api.stopPoint.stopPointReachableFrom({ 
      id, 
      lineId, 
      serviceTypes: options?.serviceTypes as ('Regular' | 'Night')[] | undefined 
    }).then(response => stripTypeFields(response.data, options?.keepTflTypes));
  }

  /**
   * Returns the route sections for all the lines that service the given stop point ids
   */
  async getRoute(id: string, options?: { serviceTypes?: ('Regular' | 'Night')[], keepTflTypes?: boolean }): Promise<TflApiPresentationEntitiesStopPointRouteSection[]> {
    return this.api.stopPoint.stopPointRoute({ 
      id, 
      serviceTypes: options?.serviceTypes as ('Regular' | 'Night')[] | undefined 
    }).then(response => stripTypeFields(response.data, options?.keepTflTypes));
  }

  /**
   * Gets a distinct list of disrupted stop points for the given modes
   */
  async getDisruptionByMode(modes: string[], options?: { includeRouteBlockedStops?: boolean, keepTflTypes?: boolean }): Promise<TflApiPresentationEntitiesDisruptedPoint[]> {
    return this.api.stopPoint.stopPointDisruptionByMode({ modes, ...options })
      .then(response => stripTypeFields(response.data, options?.keepTflTypes));
  }

  /**
   * Gets all disruptions for the specified StopPointId, plus disruptions for any child Naptan records it may have
   */
  async getDisruption(ids: string[], options?: { getFamily?: boolean; includeRouteBlockedStops?: boolean, keepTflTypes?: boolean }): Promise<TflApiPresentationEntitiesDisruptedPoint[]> {
    return this.api.stopPoint.stopPointDisruption({ ids, ...options })
      .then(response => stripTypeFields(response.data, options?.keepTflTypes));
  }

  /**
   * Returns the canonical direction, "inbound" or "outbound", for a given pair of stop point Ids
   */
  async getDirection(id: string, toStopPointId: string, options?: { lineId?: string, keepTflTypes?: boolean }): Promise<string> {
    return this.api.stopPoint.stopPointDirection({ id, toStopPointId, ...options })
      .then(response => response.data);
  }

  /**
   * Gets a list of StopPoints within radius by the specified criteria
   */
  async getByGeoPoint(options: {
    lat: number;
    lon: number;
    radius?: number;
    useStopPointHierarchy?: boolean;
    categories?: string[];
    returnLines?: boolean;
    stoptypes?: string[];
    keepTflTypes?: boolean;
  }): Promise<TflApiPresentationEntitiesStopPointsResponse> {
    return this.api.stopPoint.stopPointGetByGeoPoint({
      locationLat: options.lat,
      locationLon: options.lon,
      radius: options.radius,
      useStopPointHierarchy: options.useStopPointHierarchy,
      categories: options.categories || [],
      returnLines: options.returnLines,
      stopTypes: options.stoptypes || []
    }).then(response => stripTypeFields(response.data, options.keepTflTypes));
  }

  /**
   * Gets a list of StopPoints filtered by the modes available at that StopPoint
   */
  async getByMode(modes: string[], options?: {
    categories?: string[];
    returnLines?: boolean;
    stoptypes?: string[];
    keepTflTypes?: boolean;
  }): Promise<TflApiPresentationEntitiesStopPointsResponse> {
    return this.api.stopPoint.stopPointGetByMode({ modes, ...options })
      .then(response => stripTypeFields(response.data, options?.keepTflTypes));
  }

  /**
   * Search StopPoints by their common name, or their 5-digit Countdown Bus Stop Code (which can be found as Stop ID on Google Maps)
   */
  async search(query: string, options?: SearchOptions): Promise<ExtendedSearchResponse> {
    return this.api.stopPoint.stopPointSearch({
      query,
      modes: options?.modes,
      maxResults: options?.maxResults,
      lines: options?.lines,
      tflOperatedNationalRailStationsOnly: options?.tflOperatedNationalRailStationsOnly
    }).then(response => {
      const data = response.data as ExtendedSearchResponse;
      // First sanitize the object, then strip type fields if needed
      const sanitized = JSON.parse(JSON.stringify(data));
      return stripTypeFields(sanitized, options?.keepTflTypes);
    });
  }

  /**
   * Gets a StopPoint for a given sms code
   */
  async getBySms(id: string, options?: { output?: string, keepTflTypes?: boolean }): Promise<SystemObject> {
    return this.api.stopPoint.stopPointGetBySms({ id, ...options })
      .then(response => stripTypeFields(response.data, options?.keepTflTypes));
  }

  /**
   * Gets a list of taxi ranks corresponding to the given stop point id
   */
  async getTaxiRanks(stopPointId: string): Promise<TflApiPresentationEntitiesPlace[]> {
    return this.api.stopPoint.stopPointGetTaxiRanksByIds(stopPointId)
      .then(response => stripTypeFields(response.data));
  }

  /**
   * Get car parks corresponding to the given stop point id
   */
  async getCarParks(stopPointId: string): Promise<TflApiPresentationEntitiesPlace[]> {
    return this.api.stopPoint.stopPointGetCarParksById(stopPointId)
      .then(response => stripTypeFields(response.data));
  }
}

export { StopPoint, StopPointQuery }; 