// Auto-generated endpoint registry. Do not edit manually.
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ./generated.meta.json

export interface EndpointDefinition {
  operationId: string;
  methodName: string;
  tag: string;
  tagKey: string;
  httpMethod: string;
  pathTemplate: string;
  pathParamMap: Record<string, string>;
  pathParams: readonly string[];
  queryParams: readonly string[];
  requiredParams: readonly string[];
  returnType: string;
  deprecated: boolean;
  summary: string;
}

export const ENDPOINTS: readonly EndpointDefinition[] = [
  {
    "operationId": "AccidentStats_Get",
    "methodName": "get",
    "tag": "AccidentStats",
    "tagKey": "accidentStats",
    "httpMethod": "GET",
    "pathTemplate": "/AccidentStats/${formatPathParam(args.year)}",
    "pathParamMap": {
      "year": "year"
    },
    "pathParams": [
      "year"
    ],
    "queryParams": [],
    "requiredParams": [
      "year"
    ],
    "returnType": "TflApiPresentationEntitiesAccidentStatsAccidentDetail[]",
    "deprecated": false,
    "summary": "Gets all accident details for accidents occuring in the specified year"
  },
  {
    "operationId": "AirQuality_Get",
    "methodName": "get",
    "tag": "AirQuality",
    "tagKey": "airQuality",
    "httpMethod": "GET",
    "pathTemplate": "/AirQuality",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "SystemObject",
    "deprecated": false,
    "summary": "Gets air quality data feed"
  },
  {
    "operationId": "BikePoint_Get",
    "methodName": "get",
    "tag": "BikePoint",
    "tagKey": "bikePoint",
    "httpMethod": "GET",
    "pathTemplate": "/BikePoint/${formatPathParam(args.id)}",
    "pathParamMap": {
      "id": "id"
    },
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "requiredParams": [
      "id"
    ],
    "returnType": "TflApiPresentationEntitiesPlace",
    "deprecated": false,
    "summary": "Gets the bike point with the given id."
  },
  {
    "operationId": "BikePoint_GetAll",
    "methodName": "getAll",
    "tag": "BikePoint",
    "tagKey": "bikePoint",
    "httpMethod": "GET",
    "pathTemplate": "/BikePoint",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "TflApiPresentationEntitiesPlace[]",
    "deprecated": false,
    "summary": "Gets all bike point locations. The Place object has an addtionalProperties array which contains the nbBikes, nbDocks and nbSpaces\r\n            numbers which give the status of the BikePoint. A mismatch in these numbers i.e. nbDocks - (nbBikes + nbSpaces) != 0 indicates broken docks."
  },
  {
    "operationId": "BikePoint_Search",
    "methodName": "search",
    "tag": "BikePoint",
    "tagKey": "bikePoint",
    "httpMethod": "GET",
    "pathTemplate": "/BikePoint/Search",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [
      "query"
    ],
    "requiredParams": [
      "query"
    ],
    "returnType": "TflApiPresentationEntitiesPlace[]",
    "deprecated": false,
    "summary": "Search for bike stations by their name, a bike point's name often contains information about the name of the street\r\n            or nearby landmarks, for example. Note that the search result does not contain the PlaceProperties i.e. the status\r\n            or occupancy of the BikePoint, to get that information you should retrieve the BikePoint by its id on /BikePoint/id."
  },
  {
    "operationId": "Cabwise_Get",
    "methodName": "get",
    "tag": "Cabwise",
    "tagKey": "cabwise",
    "httpMethod": "GET",
    "pathTemplate": "/Cabwise/search",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [
      "lat",
      "lon",
      "optype",
      "wc",
      "radius",
      "name",
      "maxResults",
      "legacyFormat",
      "forceXml",
      "twentyFourSevenOnly"
    ],
    "requiredParams": [
      "lat",
      "lon"
    ],
    "returnType": "SystemObject",
    "deprecated": false,
    "summary": "Gets taxis and minicabs contact information"
  },
  {
    "operationId": "Journey_JourneyResults",
    "methodName": "journeyResults",
    "tag": "Journey",
    "tagKey": "journey",
    "httpMethod": "GET",
    "pathTemplate": "/Journey/JourneyResults/${formatPathParam(args.from)}/to/${formatPathParam(args.to)}",
    "pathParamMap": {
      "from": "from",
      "to": "to"
    },
    "pathParams": [
      "from",
      "to"
    ],
    "queryParams": [
      "via",
      "nationalSearch",
      "date",
      "time",
      "timeIs",
      "journeyPreference",
      "mode",
      "accessibilityPreference",
      "fromName",
      "toName",
      "viaName",
      "maxTransferMinutes",
      "maxWalkingMinutes",
      "walkingSpeed",
      "cyclePreference",
      "adjustment",
      "bikeProficiency",
      "alternativeCycle",
      "alternativeWalking",
      "applyHtmlMarkup",
      "useMultiModalCall",
      "walkingOptimization",
      "taxiOnlyTrip",
      "routeBetweenEntrances",
      "useRealTimeLiveArrivals",
      "calcOneDirection",
      "includeAlternativeRoutes",
      "overrideMultiModalScenario",
      "combineTransferLegs"
    ],
    "requiredParams": [
      "from",
      "to"
    ],
    "returnType": "TflApiPresentationEntitiesJourneyPlannerItineraryResult",
    "deprecated": false,
    "summary": "Perform a Journey Planner search from the parameters specified in simple types"
  },
  {
    "operationId": "Journey_Meta",
    "methodName": "meta",
    "tag": "Journey",
    "tagKey": "journey",
    "httpMethod": "GET",
    "pathTemplate": "/Journey/Meta/Modes",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "TflApiPresentationEntitiesMode[]",
    "deprecated": false,
    "summary": "Gets a list of all of the available journey planner modes"
  },
  {
    "operationId": "Line_Arrivals",
    "methodName": "arrivals",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/${formatPathParam(args.ids)}/Arrivals/${formatPathParam(args.stopPointId)}",
    "pathParamMap": {
      "ids": "ids",
      "stopPointId": "stopPointId"
    },
    "pathParams": [
      "ids",
      "stopPointId"
    ],
    "queryParams": [
      "direction",
      "destinationStationId"
    ],
    "requiredParams": [
      "ids",
      "stopPointId"
    ],
    "returnType": "TflApiPresentationEntitiesPrediction[]",
    "deprecated": false,
    "summary": "Get the list of arrival predictions for given line ids based at the given stop"
  },
  {
    "operationId": "Line_Disruption",
    "methodName": "disruption",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/${formatPathParam(args.ids)}/Disruption",
    "pathParamMap": {
      "ids": "ids"
    },
    "pathParams": [
      "ids"
    ],
    "queryParams": [],
    "requiredParams": [
      "ids"
    ],
    "returnType": "TflApiPresentationEntitiesDisruption[]",
    "deprecated": false,
    "summary": "Get disruptions for the given line ids"
  },
  {
    "operationId": "Line_DisruptionByMode",
    "methodName": "disruptionByMode",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/Mode/${formatPathParam(args.modes)}/Disruption",
    "pathParamMap": {
      "modes": "modes"
    },
    "pathParams": [
      "modes"
    ],
    "queryParams": [],
    "requiredParams": [
      "modes"
    ],
    "returnType": "TflApiPresentationEntitiesDisruption[]",
    "deprecated": false,
    "summary": "Get disruptions for all lines of the given modes."
  },
  {
    "operationId": "Line_Get",
    "methodName": "get",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/${formatPathParam(args.ids)}",
    "pathParamMap": {
      "ids": "ids"
    },
    "pathParams": [
      "ids"
    ],
    "queryParams": [],
    "requiredParams": [
      "ids"
    ],
    "returnType": "TflApiPresentationEntitiesLine[]",
    "deprecated": false,
    "summary": "Gets lines that match the specified line ids."
  },
  {
    "operationId": "Line_GetByMode",
    "methodName": "getByMode",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/Mode/${formatPathParam(args.modes)}",
    "pathParamMap": {
      "modes": "modes"
    },
    "pathParams": [
      "modes"
    ],
    "queryParams": [],
    "requiredParams": [
      "modes"
    ],
    "returnType": "TflApiPresentationEntitiesLine[]",
    "deprecated": false,
    "summary": "Gets lines that serve the given modes."
  },
  {
    "operationId": "Line_LineRoutesByIds",
    "methodName": "lineRoutesByIds",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/${formatPathParam(args.ids)}/Route",
    "pathParamMap": {
      "ids": "ids"
    },
    "pathParams": [
      "ids"
    ],
    "queryParams": [
      "serviceTypes"
    ],
    "requiredParams": [
      "ids"
    ],
    "returnType": "TflApiPresentationEntitiesLine[]",
    "deprecated": false,
    "summary": "Get all valid routes for given line ids, including the name and id of the originating and terminating stops for each route."
  },
  {
    "operationId": "Line_MetaDisruptionCategories",
    "methodName": "metaDisruptionCategories",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/Meta/DisruptionCategories",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "unknown[]",
    "deprecated": false,
    "summary": "Gets a list of valid disruption categories"
  },
  {
    "operationId": "Line_MetaModes",
    "methodName": "metaModes",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/Meta/Modes",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "TflApiPresentationEntitiesMode[]",
    "deprecated": false,
    "summary": "Gets a list of valid modes"
  },
  {
    "operationId": "Line_MetaServiceTypes",
    "methodName": "metaServiceTypes",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/Meta/ServiceTypes",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "unknown[]",
    "deprecated": false,
    "summary": "Gets a list of valid ServiceTypes to filter on"
  },
  {
    "operationId": "Line_MetaSeverity",
    "methodName": "metaSeverity",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/Meta/Severity",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "TflApiPresentationEntitiesStatusSeverity[]",
    "deprecated": false,
    "summary": "Gets a list of valid severity codes"
  },
  {
    "operationId": "Line_Route",
    "methodName": "route",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/Route",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [
      "serviceTypes"
    ],
    "requiredParams": [],
    "returnType": "TflApiPresentationEntitiesLine[]",
    "deprecated": false,
    "summary": "Get all valid routes for all lines, including the name and id of the originating and terminating stops for each route."
  },
  {
    "operationId": "Line_RouteByMode",
    "methodName": "routeByMode",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/Mode/${formatPathParam(args.modes)}/Route",
    "pathParamMap": {
      "modes": "modes"
    },
    "pathParams": [
      "modes"
    ],
    "queryParams": [
      "serviceTypes"
    ],
    "requiredParams": [
      "modes"
    ],
    "returnType": "TflApiPresentationEntitiesLine[]",
    "deprecated": false,
    "summary": "Gets all lines and their valid routes for given modes, including the name and id of the originating and terminating stops for each route"
  },
  {
    "operationId": "Line_RouteSequence",
    "methodName": "routeSequence",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/${formatPathParam(args.id)}/Route/Sequence/${formatPathParam(args.direction)}",
    "pathParamMap": {
      "id": "id",
      "direction": "direction"
    },
    "pathParams": [
      "id",
      "direction"
    ],
    "queryParams": [
      "serviceTypes",
      "excludeCrowding"
    ],
    "requiredParams": [
      "id",
      "direction"
    ],
    "returnType": "TflApiPresentationEntitiesRouteSequence",
    "deprecated": false,
    "summary": "Gets all valid routes for given line id, including the sequence of stops on each route."
  },
  {
    "operationId": "Line_Search",
    "methodName": "search",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/Search/${formatPathParam(args.query)}",
    "pathParamMap": {
      "query": "query"
    },
    "pathParams": [
      "query"
    ],
    "queryParams": [
      "modes",
      "serviceTypes"
    ],
    "requiredParams": [
      "query"
    ],
    "returnType": "TflApiPresentationEntitiesRouteSearchResponse",
    "deprecated": false,
    "summary": "Search for lines or routes matching the query string"
  },
  {
    "operationId": "Line_Status",
    "methodName": "status",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/${formatPathParam(args.ids)}/Status/${formatPathParam(args.startDate)}/to/${formatPathParam(args.endDate)}",
    "pathParamMap": {
      "ids": "ids",
      "StartDate": "startDate",
      "EndDate": "endDate"
    },
    "pathParams": [
      "ids"
    ],
    "queryParams": [
      "detail",
      "startDate",
      "endDate",
      "dateRange.startDate",
      "dateRange.endDate"
    ],
    "requiredParams": [
      "ids",
      "startDate",
      "endDate"
    ],
    "returnType": "TflApiPresentationEntitiesLine[]",
    "deprecated": false,
    "summary": "Gets the line status for given line ids during the provided dates e.g Minor Delays"
  },
  {
    "operationId": "Line_StatusByIds",
    "methodName": "statusByIds",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/${formatPathParam(args.ids)}/Status",
    "pathParamMap": {
      "ids": "ids"
    },
    "pathParams": [
      "ids"
    ],
    "queryParams": [
      "detail"
    ],
    "requiredParams": [
      "ids"
    ],
    "returnType": "TflApiPresentationEntitiesLine[]",
    "deprecated": false,
    "summary": "Gets the line status of for given line ids e.g Minor Delays"
  },
  {
    "operationId": "Line_StatusByMode",
    "methodName": "statusByMode",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/Mode/${formatPathParam(args.modes)}/Status",
    "pathParamMap": {
      "modes": "modes"
    },
    "pathParams": [
      "modes"
    ],
    "queryParams": [
      "detail",
      "severityLevel"
    ],
    "requiredParams": [
      "modes"
    ],
    "returnType": "TflApiPresentationEntitiesLine[]",
    "deprecated": false,
    "summary": "Gets the line status of for all lines for the given modes"
  },
  {
    "operationId": "Line_StatusBySeverity",
    "methodName": "statusBySeverity",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/Status/${formatPathParam(args.severity)}",
    "pathParamMap": {
      "severity": "severity"
    },
    "pathParams": [
      "severity"
    ],
    "queryParams": [],
    "requiredParams": [
      "severity"
    ],
    "returnType": "TflApiPresentationEntitiesLine[]",
    "deprecated": false,
    "summary": "Gets the line status for all lines with a given severity\r\n            A list of valid severity codes can be obtained from a call to Line/Meta/Severity"
  },
  {
    "operationId": "Line_StopPoints",
    "methodName": "stopPoints",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/${formatPathParam(args.id)}/StopPoints",
    "pathParamMap": {
      "id": "id"
    },
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "tflOperatedNationalRailStationsOnly"
    ],
    "requiredParams": [
      "id"
    ],
    "returnType": "TflApiPresentationEntitiesStopPoint[]",
    "deprecated": false,
    "summary": "Gets a list of the stations that serve the given line id"
  },
  {
    "operationId": "Line_Timetable",
    "methodName": "timetable",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/${formatPathParam(args.id)}/Timetable/${formatPathParam(args.fromStopPointId)}",
    "pathParamMap": {
      "id": "id",
      "fromStopPointId": "fromStopPointId"
    },
    "pathParams": [
      "fromStopPointId",
      "id"
    ],
    "queryParams": [],
    "requiredParams": [
      "fromStopPointId",
      "id"
    ],
    "returnType": "TflApiPresentationEntitiesTimetableResponse",
    "deprecated": false,
    "summary": "Gets the timetable for a specified station on the give line"
  },
  {
    "operationId": "Line_TimetableTo",
    "methodName": "timetableTo",
    "tag": "Line",
    "tagKey": "line",
    "httpMethod": "GET",
    "pathTemplate": "/Line/${formatPathParam(args.id)}/Timetable/${formatPathParam(args.fromStopPointId)}/to/${formatPathParam(args.toStopPointId)}",
    "pathParamMap": {
      "id": "id",
      "fromStopPointId": "fromStopPointId",
      "toStopPointId": "toStopPointId"
    },
    "pathParams": [
      "fromStopPointId",
      "id",
      "toStopPointId"
    ],
    "queryParams": [],
    "requiredParams": [
      "fromStopPointId",
      "id",
      "toStopPointId"
    ],
    "returnType": "TflApiPresentationEntitiesTimetableResponse",
    "deprecated": false,
    "summary": "Gets the timetable for a specified station on the give line with specified destination"
  },
  {
    "operationId": "Mode_Arrivals",
    "methodName": "arrivals",
    "tag": "Mode",
    "tagKey": "mode",
    "httpMethod": "GET",
    "pathTemplate": "/Mode/${formatPathParam(args.mode)}/Arrivals",
    "pathParamMap": {
      "mode": "mode"
    },
    "pathParams": [
      "mode"
    ],
    "queryParams": [
      "count"
    ],
    "requiredParams": [
      "mode"
    ],
    "returnType": "TflApiPresentationEntitiesPrediction[]",
    "deprecated": false,
    "summary": "Gets the next arrival predictions for all stops of a given mode"
  },
  {
    "operationId": "Mode_GetActiveServiceTypes",
    "methodName": "getActiveServiceTypes",
    "tag": "Mode",
    "tagKey": "mode",
    "httpMethod": "GET",
    "pathTemplate": "/Mode/ActiveServiceTypes",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "TflApiPresentationEntitiesActiveServiceType[]",
    "deprecated": false,
    "summary": "Returns the service type active for a mode.\r\n            Currently only supports tube"
  },
  {
    "operationId": "Occupancy_Get",
    "methodName": "get",
    "tag": "Occupancy",
    "tagKey": "occupancy",
    "httpMethod": "GET",
    "pathTemplate": "/Occupancy/CarPark/${formatPathParam(args.id)}",
    "pathParamMap": {
      "id": "id"
    },
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "requiredParams": [
      "id"
    ],
    "returnType": "TflApiPresentationEntitiesCarParkOccupancy",
    "deprecated": false,
    "summary": "Gets the occupancy for a car park with a given id"
  },
  {
    "operationId": "Occupancy_GetAllChargeConnectorStatus",
    "methodName": "getAllChargeConnectorStatus",
    "tag": "Occupancy",
    "tagKey": "occupancy",
    "httpMethod": "GET",
    "pathTemplate": "/Occupancy/ChargeConnector",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "TflApiPresentationEntitiesChargeConnectorOccupancy[]",
    "deprecated": false,
    "summary": "Gets the occupancy for all charge connectors"
  },
  {
    "operationId": "Occupancy_GetBikePointsOccupancies",
    "methodName": "getBikePointsOccupancies",
    "tag": "Occupancy",
    "tagKey": "occupancy",
    "httpMethod": "GET",
    "pathTemplate": "/Occupancy/BikePoints/${formatPathParam(args.ids)}",
    "pathParamMap": {
      "ids": "ids"
    },
    "pathParams": [
      "ids"
    ],
    "queryParams": [],
    "requiredParams": [
      "ids"
    ],
    "returnType": "TflApiPresentationEntitiesBikePointOccupancy[]",
    "deprecated": false,
    "summary": "Get the occupancy for bike points."
  },
  {
    "operationId": "Occupancy_GetChargeConnectorStatus",
    "methodName": "getChargeConnectorStatus",
    "tag": "Occupancy",
    "tagKey": "occupancy",
    "httpMethod": "GET",
    "pathTemplate": "/Occupancy/ChargeConnector/${formatPathParam(args.ids)}",
    "pathParamMap": {
      "ids": "ids"
    },
    "pathParams": [
      "ids"
    ],
    "queryParams": [],
    "requiredParams": [
      "ids"
    ],
    "returnType": "TflApiPresentationEntitiesChargeConnectorOccupancy[]",
    "deprecated": false,
    "summary": "Gets the occupancy for a charge connectors with a given id (sourceSystemPlaceId)"
  },
  {
    "operationId": "Occupancy_Get",
    "methodName": "occupancyGet",
    "tag": "Occupancy",
    "tagKey": "occupancy",
    "httpMethod": "GET",
    "pathTemplate": "/Occupancy/CarPark",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "TflApiPresentationEntitiesCarParkOccupancy[]",
    "deprecated": false,
    "summary": "Gets the occupancy for all car parks that have occupancy data"
  },
  {
    "operationId": "Place_Get",
    "methodName": "get",
    "tag": "Place",
    "tagKey": "place",
    "httpMethod": "GET",
    "pathTemplate": "/Place/${formatPathParam(args.id)}",
    "pathParamMap": {
      "id": "id"
    },
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "includeChildren"
    ],
    "requiredParams": [
      "id"
    ],
    "returnType": "TflApiPresentationEntitiesPlace[]",
    "deprecated": false,
    "summary": "Gets the place with the given id."
  },
  {
    "operationId": "Place_GetAt",
    "methodName": "getAt",
    "tag": "Place",
    "tagKey": "place",
    "httpMethod": "GET",
    "pathTemplate": "/Place/${formatPathParam(args.type)}/At/${formatPathParam(args.lat)}/${formatPathParam(args.lon)}",
    "pathParamMap": {
      "type": "type",
      "Lat": "lat",
      "Lon": "lon"
    },
    "pathParams": [
      "type"
    ],
    "queryParams": [
      "lat",
      "lon",
      "location.lat",
      "location.lon"
    ],
    "requiredParams": [
      "type",
      "lat",
      "lon",
      "location.lat",
      "location.lon"
    ],
    "returnType": "SystemObject",
    "deprecated": false,
    "summary": "Gets any places of the given type whose geography intersects the given latitude and longitude. In practice this means the Place\r\n            must be polygonal e.g. a BoroughBoundary."
  },
  {
    "operationId": "Place_GetByGeo",
    "methodName": "getByGeo",
    "tag": "Place",
    "tagKey": "place",
    "httpMethod": "GET",
    "pathTemplate": "/Place",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [
      "radius",
      "categories",
      "includeChildren",
      "type",
      "activeOnly",
      "numberOfPlacesToReturn",
      "placeGeo.swLat",
      "placeGeo.swLon",
      "placeGeo.neLat",
      "placeGeo.neLon",
      "placeGeo.lat",
      "placeGeo.lon"
    ],
    "requiredParams": [],
    "returnType": "TflApiPresentationEntitiesStopPoint[]",
    "deprecated": false,
    "summary": "Gets the places that lie within a geographic region. The geographic region of interest can either be specified\r\n            by using a lat/lon geo-point and a radius in metres to return places within the locus defined by the lat/lon of\r\n            its centre or alternatively, by the use of a bounding box defined by the lat/lon of its north-west and south-east corners.\r\n            Optionally filters on type and can strip properties for a smaller payload."
  },
  {
    "operationId": "Place_GetByType",
    "methodName": "getByType",
    "tag": "Place",
    "tagKey": "place",
    "httpMethod": "GET",
    "pathTemplate": "/Place/Type/${formatPathParam(args.types)}",
    "pathParamMap": {
      "types": "types"
    },
    "pathParams": [
      "types"
    ],
    "queryParams": [
      "activeOnly"
    ],
    "requiredParams": [
      "types"
    ],
    "returnType": "TflApiPresentationEntitiesPlace[]",
    "deprecated": false,
    "summary": "Gets all places of a given type"
  },
  {
    "operationId": "Place_GetOverlay",
    "methodName": "getOverlay",
    "tag": "Place",
    "tagKey": "place",
    "httpMethod": "GET",
    "pathTemplate": "/Place/${formatPathParam(args.type)}/overlay/${formatPathParam(args.z)}/${formatPathParam(args.lat)}/${formatPathParam(args.lon)}/${formatPathParam(args.width)}/${formatPathParam(args.height)}",
    "pathParamMap": {
      "type": "type",
      "z": "z",
      "Lat": "lat",
      "Lon": "lon",
      "width": "width",
      "height": "height"
    },
    "pathParams": [
      "z",
      "type",
      "width",
      "height"
    ],
    "queryParams": [
      "lat",
      "lon",
      "location.lat",
      "location.lon"
    ],
    "requiredParams": [
      "z",
      "type",
      "width",
      "height",
      "lat",
      "lon",
      "location.lat",
      "location.lon"
    ],
    "returnType": "SystemObject",
    "deprecated": false,
    "summary": "Gets the place overlay for a given set of co-ordinates and a given width/height."
  },
  {
    "operationId": "Place_GetStreetsByPostCode",
    "methodName": "getStreetsByPostCode",
    "tag": "Place",
    "tagKey": "place",
    "httpMethod": "GET",
    "pathTemplate": "/Place/Address/Streets/${formatPathParam(args.postcode)}",
    "pathParamMap": {
      "Postcode": "postcode"
    },
    "pathParams": [],
    "queryParams": [
      "postcode",
      "postcodeInput.postcode"
    ],
    "requiredParams": [
      "postcode"
    ],
    "returnType": "SystemObject",
    "deprecated": false,
    "summary": "Gets the set of streets associated with a post code."
  },
  {
    "operationId": "Place_MetaCategories",
    "methodName": "metaCategories",
    "tag": "Place",
    "tagKey": "place",
    "httpMethod": "GET",
    "pathTemplate": "/Place/Meta/Categories",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "TflApiPresentationEntitiesPlaceCategory[]",
    "deprecated": false,
    "summary": "Gets a list of all of the available place property categories and keys."
  },
  {
    "operationId": "Place_MetaPlaceTypes",
    "methodName": "metaPlaceTypes",
    "tag": "Place",
    "tagKey": "place",
    "httpMethod": "GET",
    "pathTemplate": "/Place/Meta/PlaceTypes",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "TflApiPresentationEntitiesPlaceCategory[]",
    "deprecated": false,
    "summary": "Gets a list of the available types of Place."
  },
  {
    "operationId": "Place_Search",
    "methodName": "search",
    "tag": "Place",
    "tagKey": "place",
    "httpMethod": "GET",
    "pathTemplate": "/Place/Search",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [
      "name",
      "types"
    ],
    "requiredParams": [
      "name"
    ],
    "returnType": "TflApiPresentationEntitiesPlace[]",
    "deprecated": false,
    "summary": "Gets all places that matches the given query"
  },
  {
    "operationId": "Road_DisruptedStreets",
    "methodName": "disruptedStreets",
    "tag": "Road",
    "tagKey": "road",
    "httpMethod": "GET",
    "pathTemplate": "/Road/all/Street/Disruption",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [
      "startDate",
      "endDate"
    ],
    "requiredParams": [
      "startDate",
      "endDate"
    ],
    "returnType": "SystemObject",
    "deprecated": false,
    "summary": "Gets a list of disrupted streets. If no date filters are provided, current disruptions are returned."
  },
  {
    "operationId": "Road_Disruption",
    "methodName": "disruption",
    "tag": "Road",
    "tagKey": "road",
    "httpMethod": "GET",
    "pathTemplate": "/Road/${formatPathParam(args.ids)}/Disruption",
    "pathParamMap": {
      "ids": "ids"
    },
    "pathParams": [
      "ids"
    ],
    "queryParams": [
      "stripContent",
      "severities",
      "categories",
      "closures"
    ],
    "requiredParams": [
      "ids"
    ],
    "returnType": "TflApiPresentationEntitiesRoadDisruption[]",
    "deprecated": false,
    "summary": "Get active disruptions, filtered by road ids"
  },
  {
    "operationId": "Road_DisruptionById",
    "methodName": "disruptionById",
    "tag": "Road",
    "tagKey": "road",
    "httpMethod": "GET",
    "pathTemplate": "/Road/all/Disruption/${formatPathParam(args.disruptionIds)}",
    "pathParamMap": {
      "disruptionIds": "disruptionIds"
    },
    "pathParams": [
      "disruptionIds"
    ],
    "queryParams": [
      "stripContent"
    ],
    "requiredParams": [
      "disruptionIds"
    ],
    "returnType": "TflApiPresentationEntitiesRoadDisruption",
    "deprecated": false,
    "summary": "Gets a list of active disruptions filtered by disruption Ids."
  },
  {
    "operationId": "Road_Get",
    "methodName": "get",
    "tag": "Road",
    "tagKey": "road",
    "httpMethod": "GET",
    "pathTemplate": "/Road",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "TflApiPresentationEntitiesRoadCorridor[]",
    "deprecated": false,
    "summary": "Gets all roads managed by TfL"
  },
  {
    "operationId": "Road_MetaCategories",
    "methodName": "metaCategories",
    "tag": "Road",
    "tagKey": "road",
    "httpMethod": "GET",
    "pathTemplate": "/Road/Meta/Categories",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "unknown[]",
    "deprecated": false,
    "summary": "Gets a list of valid RoadDisruption categories"
  },
  {
    "operationId": "Road_MetaSeverities",
    "methodName": "metaSeverities",
    "tag": "Road",
    "tagKey": "road",
    "httpMethod": "GET",
    "pathTemplate": "/Road/Meta/Severities",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "TflApiPresentationEntitiesStatusSeverity[]",
    "deprecated": false,
    "summary": "Gets a list of valid RoadDisruption severity codes"
  },
  {
    "operationId": "Road_Get",
    "methodName": "roadGet",
    "tag": "Road",
    "tagKey": "road",
    "httpMethod": "GET",
    "pathTemplate": "/Road/${formatPathParam(args.ids)}",
    "pathParamMap": {
      "ids": "ids"
    },
    "pathParams": [
      "ids"
    ],
    "queryParams": [],
    "requiredParams": [
      "ids"
    ],
    "returnType": "TflApiPresentationEntitiesRoadCorridor[]",
    "deprecated": false,
    "summary": "Gets the road with the specified id (e.g. A1)"
  },
  {
    "operationId": "Road_Status",
    "methodName": "status",
    "tag": "Road",
    "tagKey": "road",
    "httpMethod": "GET",
    "pathTemplate": "/Road/${formatPathParam(args.ids)}/Status",
    "pathParamMap": {
      "ids": "ids"
    },
    "pathParams": [
      "ids"
    ],
    "queryParams": [
      "dateRangeNullable.startDate",
      "dateRangeNullable.endDate"
    ],
    "requiredParams": [
      "ids"
    ],
    "returnType": "TflApiPresentationEntitiesRoadCorridor[]",
    "deprecated": false,
    "summary": "Gets the specified roads with the status aggregated over the date range specified, or now until the end of today if no dates are passed."
  },
  {
    "operationId": "Search_BusSchedules",
    "methodName": "busSchedules",
    "tag": "Search",
    "tagKey": "search",
    "httpMethod": "GET",
    "pathTemplate": "/Search/BusSchedules",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [
      "query"
    ],
    "requiredParams": [
      "query"
    ],
    "returnType": "TflApiPresentationEntitiesSearchResponse",
    "deprecated": false,
    "summary": "Searches the bus schedules folder on S3 for a given bus number."
  },
  {
    "operationId": "Search_Get",
    "methodName": "get",
    "tag": "Search",
    "tagKey": "search",
    "httpMethod": "GET",
    "pathTemplate": "/Search",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [
      "query"
    ],
    "requiredParams": [
      "query"
    ],
    "returnType": "TflApiPresentationEntitiesSearchResponse",
    "deprecated": false,
    "summary": "Search the site for occurrences of the query string. The maximum number of results returned is equal to the maximum page size\r\n            of 100. To return subsequent pages, use the paginated overload."
  },
  {
    "operationId": "Search_MetaCategories",
    "methodName": "metaCategories",
    "tag": "Search",
    "tagKey": "search",
    "httpMethod": "GET",
    "pathTemplate": "/Search/Meta/Categories",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "unknown[]",
    "deprecated": false,
    "summary": "Gets the available search categories."
  },
  {
    "operationId": "Search_MetaSearchProviders",
    "methodName": "metaSearchProviders",
    "tag": "Search",
    "tagKey": "search",
    "httpMethod": "GET",
    "pathTemplate": "/Search/Meta/SearchProviders",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "unknown[]",
    "deprecated": false,
    "summary": "Gets the available searchProvider names."
  },
  {
    "operationId": "Search_MetaSorts",
    "methodName": "metaSorts",
    "tag": "Search",
    "tagKey": "search",
    "httpMethod": "GET",
    "pathTemplate": "/Search/Meta/Sorts",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "unknown[]",
    "deprecated": false,
    "summary": "Gets the available sorting options."
  },
  {
    "operationId": "StopPoint_ArrivalDepartures",
    "methodName": "arrivalDepartures",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/${formatPathParam(args.id)}/ArrivalDepartures",
    "pathParamMap": {
      "id": "id"
    },
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "lineIds"
    ],
    "requiredParams": [
      "id",
      "lineIds"
    ],
    "returnType": "TflApiPresentationEntitiesArrivalDeparture[]",
    "deprecated": false,
    "summary": "Gets the list of arrival and departure predictions for the given stop point id (overground, Elizabeth line and thameslink only)"
  },
  {
    "operationId": "StopPoint_Arrivals",
    "methodName": "arrivals",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/${formatPathParam(args.id)}/Arrivals",
    "pathParamMap": {
      "id": "id"
    },
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "requiredParams": [
      "id"
    ],
    "returnType": "TflApiPresentationEntitiesPrediction[]",
    "deprecated": false,
    "summary": "Gets the list of arrival predictions for the given stop point id"
  },
  {
    "operationId": "StopPoint_Crowding",
    "methodName": "crowding",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/${formatPathParam(args.id)}/Crowding/${formatPathParam(args.line)}",
    "pathParamMap": {
      "id": "id",
      "line": "line"
    },
    "pathParams": [
      "id",
      "line"
    ],
    "queryParams": [
      "direction"
    ],
    "requiredParams": [
      "id",
      "line",
      "direction"
    ],
    "returnType": "TflApiPresentationEntitiesStopPoint[]",
    "deprecated": false,
    "summary": "Gets all the Crowding data (static) for the StopPointId, plus crowding data for a given line and optionally a particular direction."
  },
  {
    "operationId": "StopPoint_Direction",
    "methodName": "direction",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/${formatPathParam(args.id)}/DirectionTo/${formatPathParam(args.toStopPointId)}",
    "pathParamMap": {
      "id": "id",
      "toStopPointId": "toStopPointId"
    },
    "pathParams": [
      "id",
      "toStopPointId"
    ],
    "queryParams": [
      "lineId"
    ],
    "requiredParams": [
      "id",
      "toStopPointId"
    ],
    "returnType": "string",
    "deprecated": false,
    "summary": "Returns the canonical direction, \"inbound\" or \"outbound\", for a given pair of stop point Ids in the direction from -&gt; to."
  },
  {
    "operationId": "StopPoint_Disruption",
    "methodName": "disruption",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/${formatPathParam(args.ids)}/Disruption",
    "pathParamMap": {
      "ids": "ids"
    },
    "pathParams": [
      "ids"
    ],
    "queryParams": [
      "getFamily",
      "includeRouteBlockedStops",
      "flattenResponse"
    ],
    "requiredParams": [
      "ids"
    ],
    "returnType": "TflApiPresentationEntitiesDisruptedPoint[]",
    "deprecated": false,
    "summary": "Gets all disruptions for the specified StopPointId, plus disruptions for any child Naptan records it may have."
  },
  {
    "operationId": "StopPoint_DisruptionByMode",
    "methodName": "disruptionByMode",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/Mode/${formatPathParam(args.modes)}/Disruption",
    "pathParamMap": {
      "modes": "modes"
    },
    "pathParams": [
      "modes"
    ],
    "queryParams": [
      "includeRouteBlockedStops"
    ],
    "requiredParams": [
      "modes"
    ],
    "returnType": "TflApiPresentationEntitiesDisruptedPoint[]",
    "deprecated": false,
    "summary": "Gets a distinct list of disrupted stop points for the given modes"
  },
  {
    "operationId": "StopPoint_Get",
    "methodName": "get",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/${formatPathParam(args.ids)}",
    "pathParamMap": {
      "ids": "ids"
    },
    "pathParams": [
      "ids"
    ],
    "queryParams": [
      "includeCrowdingData"
    ],
    "requiredParams": [
      "ids"
    ],
    "returnType": "TflApiPresentationEntitiesStopPoint[]",
    "deprecated": false,
    "summary": "Gets a list of StopPoints corresponding to the given list of stop ids."
  },
  {
    "operationId": "StopPoint_GetByGeoPoint",
    "methodName": "getByGeoPoint",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [
      "stopTypes",
      "radius",
      "useStopPointHierarchy",
      "modes",
      "categories",
      "returnLines",
      "location.lat",
      "location.lon"
    ],
    "requiredParams": [
      "stopTypes",
      "location.lat",
      "location.lon"
    ],
    "returnType": "TflApiPresentationEntitiesStopPointsResponse",
    "deprecated": false,
    "summary": "Gets a list of StopPoints within {radius} by the specified criteria"
  },
  {
    "operationId": "StopPoint_GetByMode",
    "methodName": "getByMode",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/Mode/${formatPathParam(args.modes)}",
    "pathParamMap": {
      "modes": "modes"
    },
    "pathParams": [
      "modes"
    ],
    "queryParams": [
      "page"
    ],
    "requiredParams": [
      "modes"
    ],
    "returnType": "TflApiPresentationEntitiesStopPointsResponse",
    "deprecated": false,
    "summary": "Gets a list of StopPoints filtered by the modes available at that StopPoint."
  },
  {
    "operationId": "StopPoint_GetBySms",
    "methodName": "getBySms",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/Sms/${formatPathParam(args.id)}",
    "pathParamMap": {
      "id": "id"
    },
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "output"
    ],
    "requiredParams": [
      "id"
    ],
    "returnType": "SystemObject",
    "deprecated": false,
    "summary": "Gets a StopPoint for a given sms code."
  },
  {
    "operationId": "StopPoint_GetByType",
    "methodName": "getByType",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/Type/${formatPathParam(args.types)}",
    "pathParamMap": {
      "types": "types"
    },
    "pathParams": [
      "types"
    ],
    "queryParams": [],
    "requiredParams": [
      "types"
    ],
    "returnType": "TflApiPresentationEntitiesStopPoint[]",
    "deprecated": false,
    "summary": "Gets all stop points of a given type"
  },
  {
    "operationId": "StopPoint_GetByTypeWithPagination",
    "methodName": "getByTypeWithPagination",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/Type/${formatPathParam(args.types)}/page/${formatPathParam(args.page)}",
    "pathParamMap": {
      "types": "types",
      "page": "page"
    },
    "pathParams": [
      "types",
      "page"
    ],
    "queryParams": [],
    "requiredParams": [
      "types",
      "page"
    ],
    "returnType": "TflApiPresentationEntitiesStopPoint[]",
    "deprecated": false,
    "summary": "Gets all the stop points of given type(s) with a page number"
  },
  {
    "operationId": "StopPoint_GetCarParksById",
    "methodName": "getCarParksById",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/${formatPathParam(args.stopPointId)}/CarParks",
    "pathParamMap": {
      "stopPointId": "stopPointId"
    },
    "pathParams": [
      "stopPointId"
    ],
    "queryParams": [],
    "requiredParams": [
      "stopPointId"
    ],
    "returnType": "TflApiPresentationEntitiesPlace[]",
    "deprecated": false,
    "summary": "Get car parks corresponding to the given stop point id."
  },
  {
    "operationId": "StopPoint_GetServiceTypes",
    "methodName": "getServiceTypes",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/ServiceTypes",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [
      "id",
      "lineIds",
      "modes"
    ],
    "requiredParams": [
      "id"
    ],
    "returnType": "TflApiPresentationEntitiesLineServiceType[]",
    "deprecated": false,
    "summary": "Gets the service types for a given stoppoint"
  },
  {
    "operationId": "StopPoint_GetTaxiRanksByIds",
    "methodName": "getTaxiRanksByIds",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/${formatPathParam(args.stopPointId)}/TaxiRanks",
    "pathParamMap": {
      "stopPointId": "stopPointId"
    },
    "pathParams": [
      "stopPointId"
    ],
    "queryParams": [],
    "requiredParams": [
      "stopPointId"
    ],
    "returnType": "TflApiPresentationEntitiesPlace[]",
    "deprecated": false,
    "summary": "Gets a list of taxi ranks corresponding to the given stop point id."
  },
  {
    "operationId": "StopPoint_MetaCategories",
    "methodName": "metaCategories",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/Meta/Categories",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "TflApiPresentationEntitiesStopPointCategory[]",
    "deprecated": false,
    "summary": "Gets the list of available StopPoint additional information categories"
  },
  {
    "operationId": "StopPoint_MetaModes",
    "methodName": "metaModes",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/Meta/Modes",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "TflApiPresentationEntitiesMode[]",
    "deprecated": false,
    "summary": "Gets the list of available StopPoint modes"
  },
  {
    "operationId": "StopPoint_MetaStopTypes",
    "methodName": "metaStopTypes",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/Meta/StopTypes",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [],
    "requiredParams": [],
    "returnType": "unknown[]",
    "deprecated": false,
    "summary": "Gets the list of available StopPoint types"
  },
  {
    "operationId": "StopPoint_ReachableFrom",
    "methodName": "reachableFrom",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/${formatPathParam(args.id)}/CanReachOnLine/${formatPathParam(args.lineId)}",
    "pathParamMap": {
      "id": "id",
      "lineId": "lineId"
    },
    "pathParams": [
      "id",
      "lineId"
    ],
    "queryParams": [
      "serviceTypes"
    ],
    "requiredParams": [
      "id",
      "lineId"
    ],
    "returnType": "TflApiPresentationEntitiesStopPoint[]",
    "deprecated": false,
    "summary": "Gets Stopoints that are reachable from a station/line combination."
  },
  {
    "operationId": "StopPoint_Route",
    "methodName": "route",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/${formatPathParam(args.id)}/Route",
    "pathParamMap": {
      "id": "id"
    },
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "serviceTypes"
    ],
    "requiredParams": [
      "id"
    ],
    "returnType": "TflApiPresentationEntitiesStopPointRouteSection[]",
    "deprecated": false,
    "summary": "Returns the route sections for all the lines that service the given stop point ids"
  },
  {
    "operationId": "StopPoint_Search",
    "methodName": "search",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/Search/${formatPathParam(args.query)}",
    "pathParamMap": {
      "query": "query"
    },
    "pathParams": [
      "query"
    ],
    "queryParams": [
      "modes",
      "faresOnly",
      "maxResults",
      "lines",
      "includeHubs",
      "tflOperatedNationalRailStationsOnly"
    ],
    "requiredParams": [
      "query"
    ],
    "returnType": "TflApiPresentationEntitiesSearchResponse",
    "deprecated": false,
    "summary": "Search StopPoints by their common name, or their 5-digit Countdown Bus Stop Code."
  },
  {
    "operationId": "StopPoint_Get",
    "methodName": "stopPointGet",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/${formatPathParam(args.id)}/placeTypes",
    "pathParamMap": {
      "id": "id"
    },
    "pathParams": [
      "id"
    ],
    "queryParams": [
      "placeTypes"
    ],
    "requiredParams": [
      "id",
      "placeTypes"
    ],
    "returnType": "TflApiPresentationEntitiesPlace[]",
    "deprecated": false,
    "summary": "Get a list of places corresponding to a given id and place types."
  },
  {
    "operationId": "StopPoint_Search",
    "methodName": "stopPointSearch",
    "tag": "StopPoint",
    "tagKey": "stopPoint",
    "httpMethod": "GET",
    "pathTemplate": "/StopPoint/Search",
    "pathParamMap": {},
    "pathParams": [],
    "queryParams": [
      "query",
      "modes",
      "faresOnly",
      "maxResults",
      "lines",
      "includeHubs",
      "tflOperatedNationalRailStationsOnly"
    ],
    "requiredParams": [
      "query"
    ],
    "returnType": "TflApiPresentationEntitiesSearchResponse",
    "deprecated": false,
    "summary": "Search StopPoints by their common name, or their 5-digit Countdown Bus Stop Code."
  },
  {
    "operationId": "TravelTime_GetCompareOverlay",
    "methodName": "getCompareOverlay",
    "tag": "TravelTime",
    "tagKey": "travelTime",
    "httpMethod": "GET",
    "pathTemplate": "/TravelTimes/compareOverlay/${formatPathParam(args.z)}/mapcenter/${formatPathParam(args.mapCenterLat)}/${formatPathParam(args.mapCenterLon)}/pinlocation/${formatPathParam(args.pinLat)}/${formatPathParam(args.pinLon)}/dimensions/${formatPathParam(args.width)}/${formatPathParam(args.height)}",
    "pathParamMap": {
      "z": "z",
      "mapCenterLat": "mapCenterLat",
      "mapCenterLon": "mapCenterLon",
      "pinLat": "pinLat",
      "pinLon": "pinLon",
      "width": "width",
      "height": "height"
    },
    "pathParams": [
      "z",
      "pinLat",
      "pinLon",
      "mapCenterLat",
      "mapCenterLon",
      "width",
      "height"
    ],
    "queryParams": [
      "scenarioTitle",
      "timeOfDayId",
      "modeId",
      "direction",
      "travelTimeInterval",
      "compareType",
      "compareValue"
    ],
    "requiredParams": [
      "z",
      "pinLat",
      "pinLon",
      "mapCenterLat",
      "mapCenterLon",
      "scenarioTitle",
      "timeOfDayId",
      "modeId",
      "width",
      "height",
      "direction",
      "travelTimeInterval",
      "compareType",
      "compareValue"
    ],
    "returnType": "SystemObject",
    "deprecated": false,
    "summary": "Gets the TravelTime overlay."
  },
  {
    "operationId": "TravelTime_GetOverlay",
    "methodName": "getOverlay",
    "tag": "TravelTime",
    "tagKey": "travelTime",
    "httpMethod": "GET",
    "pathTemplate": "/TravelTimes/overlay/${formatPathParam(args.z)}/mapcenter/${formatPathParam(args.mapCenterLat)}/${formatPathParam(args.mapCenterLon)}/pinlocation/${formatPathParam(args.pinLat)}/${formatPathParam(args.pinLon)}/dimensions/${formatPathParam(args.width)}/${formatPathParam(args.height)}",
    "pathParamMap": {
      "z": "z",
      "mapCenterLat": "mapCenterLat",
      "mapCenterLon": "mapCenterLon",
      "pinLat": "pinLat",
      "pinLon": "pinLon",
      "width": "width",
      "height": "height"
    },
    "pathParams": [
      "z",
      "pinLat",
      "pinLon",
      "mapCenterLat",
      "mapCenterLon",
      "width",
      "height"
    ],
    "queryParams": [
      "scenarioTitle",
      "timeOfDayId",
      "modeId",
      "direction",
      "travelTimeInterval"
    ],
    "requiredParams": [
      "z",
      "pinLat",
      "pinLon",
      "mapCenterLat",
      "mapCenterLon",
      "scenarioTitle",
      "timeOfDayId",
      "modeId",
      "width",
      "height",
      "direction",
      "travelTimeInterval"
    ],
    "returnType": "SystemObject",
    "deprecated": false,
    "summary": "Gets the TravelTime overlay."
  },
  {
    "operationId": "Vehicle_Get",
    "methodName": "get",
    "tag": "Vehicle",
    "tagKey": "vehicle",
    "httpMethod": "GET",
    "pathTemplate": "/Vehicle/${formatPathParam(args.ids)}/Arrivals",
    "pathParamMap": {
      "ids": "ids"
    },
    "pathParams": [
      "ids"
    ],
    "queryParams": [],
    "requiredParams": [
      "ids"
    ],
    "returnType": "TflApiPresentationEntitiesPrediction[]",
    "deprecated": false,
    "summary": "Gets the predictions for a given list of vehicle Id's."
  }
] as const;

export const ENDPOINT_COUNT = 84 as const;
