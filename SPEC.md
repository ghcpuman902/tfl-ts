# TFL API Wrapper Mapping

## Implementation Status

### Completed Endpoints
- ✅ Line Status
- ✅ Stop Points
- ✅ Basic Error Handling
- ✅ Type Generation

### In Progress
- 🔄 Additional Endpoints
- 🔄 Advanced Error Handling
- 🔄 Caching Layer

### Planned
- 📅 Real-time Data Streaming
- 📅 WebSocket Support
- 📅 Advanced Querying

## API Endpoints

## AccidentStats

### accidentStats.get(year: number)
- Original: `accidentStatsGet(year: number): Promise<TflApiPresentationEntitiesAccidentStatsAccidentDetail[]>`

## AirQuality

### airQuality.get()
- Original: `airQualityGet(): Promise<SystemObject>`

## BikePoint

### bikePoint.getAll()
- Original: `bikePointGetAll(): Promise<TflApiPresentationEntitiesPlace[]>`

### bikePoint.get(id: string)
- Original: `bikePointGet(id: string): Promise<TflApiPresentationEntitiesPlace>`

### bikePoint.search(query: string)
- Original: `bikePointSearch(query: BikePointSearchParams): Promise<TflApiPresentationEntitiesPlace[]>`

## Cabwise

### cabwise.get(query: CabwiseGetParams)
- Original: `cabwiseGet(query: CabwiseGetParams): Promise<SystemObject>`

## Journey

### journey.getModes()
- Original: `journeyMeta(): Promise<TflApiPresentationEntitiesMode[]>`

### journey.getResults(from: string, to: string, options: JourneyJourneyResultsParams)
- Original: `journeyJourneyResults(params: JourneyJourneyResultsParams): Promise<TflApiPresentationEntitiesJourneyPlannerItineraryResult>`

## Line

### line.get(options: { ids?, modes?, serviceTypes?, route? })
- options.ids: `lineGet(ids: string[]): Promise<TflApiPresentationEntitiesLine[]>`
- options.modes: `lineGetByMode(modes: string[]): Promise<TflApiPresentationEntitiesLine[]>`
- options.route: 
  - Without ids: `lineRoute(query: LineRouteParams): Promise<TflApiPresentationEntitiesLine[]>`
  - With ids: `lineLineRoutesByIds(params: LineLineRoutesByIdsParams): Promise<TflApiPresentationEntitiesLine[]>`
  - With modes: `lineRouteByMode(params: LineRouteByModeParams): Promise<TflApiPresentationEntitiesLine[]>`

### line.getStatus(options: { ids?, modes?, severity?, dateRange? })
- options.ids & dateRange: `lineStatus(params: LineStatusParams): Promise<TflApiPresentationEntitiesLine[]>`
- options.ids: `lineStatusByIds(params: LineStatusByIdsParams): Promise<TflApiPresentationEntitiesLine[]>`
- options.modes: `lineStatusByMode(params: LineStatusByModeParams): Promise<TflApiPresentationEntitiesLine[]>`
- options.severity: `lineStatusBySeverity(severity: number): Promise<TflApiPresentationEntitiesLine[]>`

### line.getDisruption(options: { ids?, modes? })
- options.ids: `lineDisruption(ids: string[]): Promise<TflApiPresentationEntitiesDisruption[]>`
- options.modes: `lineDisruptionByMode(modes: string[]): Promise<TflApiPresentationEntitiesDisruption[]>`

### line.getMeta(options: { modes?, severity?, disruptionCategories?, serviceTypes? })
- options.modes: `lineMetaModes(): Promise<TflApiPresentationEntitiesMode[]>`
- options.severity: `lineMetaSeverity(): Promise<TflApiPresentationEntitiesStatusSeverity[]>`
- options.disruptionCategories: `lineMetaDisruptionCategories(): Promise<string[]>`
- options.serviceTypes: `lineMetaServiceTypes(): Promise<string[]>`

### line.search(query: string, options: { modes?, severity? })
- Options: `lineSearch(params: LineSearchParams): Promise<TflApiPresentationEntitiesRouteSearchResponse>`
- options.severity: Duplicate of `lineStatusBySeverity`

## Mode

### mode.getActiveServiceTypes()
- Original: `modeGetActiveServiceTypes(): Promise<TflApiPresentationEntitiesActiveServiceType[]>`

### mode.getArrivals(mode: string, count?: number)
- Original: `modeArrivals(params: ModeArrivalsParams): Promise<TflApiPresentationEntitiesPrediction[]>`

## Occupancy

### occupancy.getCarPark(id: string)
- Original: `occupancyGet(id: string): Promise<TflApiPresentationEntitiesCarParkOccupancy>`

### occupancy.getAllCarParks()
- Original: `occupancyGet2(): Promise<TflApiPresentationEntitiesCarParkOccupancy[]>`

### occupancy.getChargeConnectorStatus(ids: string[])
- Original: `occupancyGetChargeConnectorStatus(ids: string[]): Promise<TflApiPresentationEntitiesChargeConnectorOccupancy[]>`

### occupancy.getAllChargeConnectors()
- Original: `occupancyGetAllChargeConnectorStatus(): Promise<TflApiPresentationEntitiesChargeConnectorOccupancy[]>`

### occupancy.getBikePointsOccupancies(ids: string[])
- Original: `occupancyGetBikePointsOccupancies(ids: string[]): Promise<TflApiPresentationEntitiesBikePointOccupancy[]>`

## Place

### place.getMeta(options: { categories?, placeTypes? })
- options.categories: `placeMetaCategories(): Promise<TflApiPresentationEntitiesPlaceCategory[]>`
- options.placeTypes: `placeMetaPlaceTypes(): Promise<TflApiPresentationEntitiesPlaceCategory[]>`

### place.getStreetsByPostcode(postcode: string, postcodeInputPostcode?: string)
- Original: `placeGetStreetsByPostCode(params: PlaceGetStreetsByPostCodeParams): Promise<SystemObject>`

### place.getByType(types: string[], activeOnly?: boolean)
- Original: `placeGetByType(params: PlaceGetByTypeParams): Promise<TflApiPresentationEntitiesPlace[]>`

### place.get(id: string, includeChildren?: boolean)
- Original: `placeGet(params: PlaceGetParams): Promise<TflApiPresentationEntitiesPlace[]>`

### place.getByGeo(criteria: PlaceGetByGeoParams)
- Original: `placeGetByGeo(query: PlaceGetByGeoParams): Promise<TflApiPresentationEntitiesStopPoint[]>`

### place.getAt(type: string[], location: { lat: string, lon: string, locationLat: number, locationLon: number })
- Original: `placeGetAt(params: PlaceGetAtParams): Promise<SystemObject>`

### place.getOverlay(criteria: PlaceGetOverlayParams)
- Original: `placeGetOverlay(params: PlaceGetOverlayParams): Promise<SystemObject>`

### place.search(name: string, types?: string[])
- Original: `placeSearch(params: PlaceSearchParams): Promise<TflApiPresentationEntitiesPlace[]>`

## Road

### road.get(ids?: string[])
- No ids: `roadGet(): Promise<TflApiPresentationEntitiesRoadCorridor[]>`
- With ids: `roadGet2(ids: string[]): Promise<TflApiPresentationEntitiesRoadCorridor[]>`

### road.getStatus(ids: string[], dateRange?: { startDate: string, endDate: string })
- Original: `roadStatus(params: RoadStatusParams): Promise<TflApiPresentationEntitiesRoadCorridor[]>`

### road.getDisruption(ids: string[], options: { stripContent?, severities?, categories?, closures? })
- Original: `roadDisruption(params: RoadDisruptionParams): Promise<TflApiPresentationEntitiesRoadDisruption[]>`

### road.getDisruptedStreets(dateRange: { startDate?: string, endDate?: string })
- Original: `roadDisruptedStreets(query: RoadDisruptedStreetsParams): Promise<SystemObject>`

### road.getDisruptionById(disruptionIds: string[], stripContent?: boolean)
- Original: `roadDisruptionById(params: RoadDisruptionByIdParams): Promise<TflApiPresentationEntitiesRoadDisruption>`

### road.getMeta(options: { categories?, severities? })
- options.categories: `roadMetaCategories(): Promise<string[]>`
- options.severities: `roadMetaSeverities(): Promise<TflApiPresentationEntitiesStatusSeverity[]>`

## Search

### search(query: string)
- Original: `searchGet(query: SearchGetParams): Promise<TflApiPresentationEntitiesSearchResponse>`

### searchBusSchedules(query: string)
- Original: `searchBusSchedules(query: SearchBusSchedulesParams): Promise<TflApiPresentationEntitiesSearchResponse>`

### searchMeta(options: { searchProviders?, categories?, sorts? })
- options.searchProviders: `searchMetaSearchProviders(): Promise<string[]>`
- options.categories: `searchMetaCategories(): Promise<string[]>`
- options.sorts: `searchMetaSorts(): Promise<string[]>`

## StopPoint

### stopPoint.getMeta(options: { categories?, stopTypes?, modes? })
- options.categories: `stopPointMetaCategories(): Promise<TflApiPresentationEntitiesStopPointCategory[]>`
- options.stopTypes: `stopPointMetaStopTypes(): Promise<string[]>`
- options.modes: `stopPointMetaModes(): Promise<TflApiPresentationEntitiesMode[]>`

### stopPoint.get(ids: string[], includeCrowdingData?: boolean)
- Original: `stopPointGet(params: StopPointGetParams): Promise<TflApiPresentationEntitiesStopPoint[]>`

### stopPoint.getRelatedPlaces(id: string, placeTypes: string[])
- Original: `stopPointGet2(params: StopPointGet2Params): Promise<TflApiPresentationEntitiesPlace[]>`

### stopPoint.getCrowdingData(id: string, line: string, direction?: string)
- Original: `stopPointCrowding(params: StopPointCrowdingParams): Promise<TflApiPresentationEntitiesStopPoint[]>`

### stopPoint.getByType(types: string[], options: { pagination?, serviceTypes? })
- No pagination: `stopPointGetByType(types: string[]): Promise<TflApiPresentationEntitiesStopPoint[]>`
- With pagination: `stopPointGetByTypeWithPagination(types: string[], page: number): Promise<TflApiPresentationEntitiesStopPoint[]>`
- options.serviceTypes: `stopPointGetServiceTypes(query: StopPointGetServiceTypesParams): Promise<TflApiPresentationEntitiesLineServiceType[]>`

### stopPoint.getArrivals(id: string)
- Original: `stopPointArrivals(id: string): Promise<TflApiPresentationEntitiesPrediction[]>`

### stopPoint.getArrivalDepartures(id: string, lineIds: string[])
- Original: `stopPointArrivalDepartures(params: StopPointArrivalDeparturesParams): Promise<TflApiPresentationEntitiesArrivalDeparture[]>`

### stopPoint.getReachableFrom(id: string, lineId: string, serviceTypes?: string[])
- Original: `stopPointReachableFrom(params: StopPointReachableFromParams): Promise<TflApiPresentationEntitiesStopPoint[]>`

### stopPoint.getRoutes(id: string, serviceTypes?: string[])
- Original: `stopPointRoute(params: StopPointRouteParams): Promise<TflApiPresentationEntitiesStopPointRouteSection[]>`

### stopPoint.getDisruptionByMode(modes: string[], includeRouteBlockedStops?: boolean)
- Original: `stopPointDisruptionByMode(params: StopPointDisruptionByModeParams): Promise<TflApiPresentationEntitiesDisruptedPoint[]>`

### stopPoint.getDisruption(ids: string[], options: { getFamily?, includeRouteBlockedStops?, flattenResponse? })
- Original: `stopPointDisruption(params: StopPointDisruptionParams): Promise<TflApiPresentationEntitiesDisruptedPoint[]>`

### stopPoint.getDirection(id: string, toStopPointId: string, lineId?: string)
- Original: `stopPointDirection(params: StopPointDirectionParams): Promise<string>`

### stopPoint.getByGeoPoint(params: StopPointGetByGeoPointParams)
- Original: `stopPointGetByGeoPoint(query: StopPointGetByGeoPointParams): Promise<TflApiPresentationEntitiesStopPointsResponse>`

### stopPoint.getByMode(modes: string[], page?: number)
- Original: `stopPointGetByMode(params: StopPointGetByModeParams): Promise<TflApiPresentationEntitiesStopPointsResponse>`

### stopPoint.search(query: string, options: { modes?, faresOnly?, maxResults?, lines?, includeHubs?, tflOperatedNationalRailStationsOnly? })
- Original: `stopPointSearch(params: StopPointSearchParams): Promise<TflApiPresentationEntitiesSearchResponse>`

### stopPoint.getBySms(id: string, output?: string)
- Original: `stopPointGetBySms(params: StopPointGetBySmsParams): Promise<SystemObject>`

### stopPoint.getTaxiRanks(stopPointId: string)
- Original: `stopPointGetTaxiRanksByIds(stopPointId: string): Promise<TflApiPresentationEntitiesPlace[]>`

### stopPoint.getCarParks(stopPointId: string)
- Original: `stopPointGetCarParksById(stopPointId: string): Promise<TflApiPresentationEntitiesPlace[]>`

## TravelTimes

### travelTime.getOverlay(params: TravelTimeGetOverlayParams)
- Original: `travelTimeGetOverlay(params: TravelTimeGetOverlayParams): Promise<SystemObject>`

### travelTime.getCompareOverlay(params: TravelTimeGetCompareOverlayParams)
- Original: `travelTimeGetCompareOverlay(params: TravelTimeGetCompareOverlayParams): Promise<SystemObject>`

## Vehicle

### vehicle.get(ids: string[])
- Original: `vehicleGet(ids: string[]): Promise<TflApiPresentationEntitiesPrediction[]>`
