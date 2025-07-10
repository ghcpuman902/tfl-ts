// Auto-generated from TfL Swagger API
// Generated at: 2025-07-08T14:05:05.594Z

export const STOPPOINT_DATA = {
  "section": "StopPoint",
  "endpoints": [
    {
      "path": "/StopPoint/{ids}",
      "method": "GET",
      "summary": "Gets a list of StopPoints corresponding to the given list of stop ids.",
      "parameters": [
        {
          "name": "ids",
          "type": "any",
          "required": true,
          "description": "A comma-separated list of stop point ids (station naptan code e.g. 940GZZLUASL). Max. approx. 20 ids.\r\n            You can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name."
        },
        {
          "name": "includeCrowdingData",
          "type": "boolean",
          "required": false,
          "description": "Include the crowding data (static). To Filter further use: /StopPoint/{ids}/Crowding/{line}"
        }
      ],
      "returnType": "StopPoint[]",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint/{id}/placeTypes",
      "method": "GET",
      "summary": "Get a list of places corresponding to a given id and place types.",
      "parameters": [
        {
          "name": "id",
          "type": "string",
          "required": true,
          "description": "A naptan id for a stop point (station naptan code e.g. 940GZZLUASL)."
        },
        {
          "name": "placeTypes",
          "type": "any",
          "required": true,
          "description": "A comcomma-separated value representing the place types."
        }
      ],
      "returnType": "Place[]",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint/{id}/Crowding/{line}",
      "method": "GET",
      "summary": "Gets all the Crowding data (static) for the StopPointId, plus crowding data for a given line and optionally a particular direction.",
      "parameters": [
        {
          "name": "id",
          "type": "string",
          "required": true,
          "description": "The Naptan id of the stop"
        },
        {
          "name": "line",
          "type": "string",
          "required": true,
          "description": "A particular line e.g. victoria, circle, northern etc."
        },
        {
          "name": "direction",
          "type": "string",
          "required": true,
          "description": "The direction of travel. Can be inbound or outbound."
        }
      ],
      "returnType": "StopPoint[]",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint/Type/{types}",
      "method": "GET",
      "summary": "Gets all stop points of a given type",
      "parameters": [
        {
          "name": "types",
          "type": "any",
          "required": true,
          "description": "A comma-separated list of the types to return. Max. approx. 12 types. \r\n            A list of valid stop types can be obtained from the StopPoint/meta/stoptypes endpoint."
        }
      ],
      "returnType": "StopPoint[]",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint/Type/{types}/page/{page}",
      "method": "GET",
      "summary": "Gets all the stop points of given type(s) with a page number",
      "parameters": [
        {
          "name": "types",
          "type": "any",
          "required": true,
          "description": ""
        },
        {
          "name": "page",
          "type": "number",
          "required": true,
          "description": ""
        }
      ],
      "returnType": "StopPoint[]",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint/ServiceTypes",
      "method": "GET",
      "summary": "Gets the service types for a given stoppoint",
      "parameters": [
        {
          "name": "id",
          "type": "string",
          "required": true,
          "description": "The Naptan id of the stop"
        },
        {
          "name": "lineIds",
          "type": "any",
          "required": false,
          "description": "The lines which contain the given Naptan id (all lines relevant to the given stoppoint if empty)"
        },
        {
          "name": "modes",
          "type": "any",
          "required": false,
          "description": "The modes which the lines are relevant to (all if empty)"
        }
      ],
      "returnType": "LineServiceType[]",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint/{id}/Arrivals",
      "method": "GET",
      "summary": "Gets the list of arrival predictions for the given stop point id",
      "parameters": [
        {
          "name": "id",
          "type": "string",
          "required": true,
          "description": "A StopPoint id (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name)"
        }
      ],
      "returnType": "Prediction[]",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint/{id}/ArrivalDepartures",
      "method": "GET",
      "summary": "Gets the list of arrival and departure predictions for the given stop point id (overground, Elizabeth line and thameslink only)",
      "parameters": [
        {
          "name": "id",
          "type": "string",
          "required": true,
          "description": "A StopPoint id (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name)"
        },
        {
          "name": "lineIds",
          "type": "any",
          "required": true,
          "description": "A comma-separated list of line ids e.g. elizabeth, london-overground, thameslink"
        }
      ],
      "returnType": "ArrivalDeparture[]",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint/{id}/CanReachOnLine/{lineId}",
      "method": "GET",
      "summary": "Gets Stopoints that are reachable from a station/line combination.",
      "parameters": [
        {
          "name": "id",
          "type": "string",
          "required": true,
          "description": "The id (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name) of the stop point to filter by"
        },
        {
          "name": "lineId",
          "type": "string",
          "required": true,
          "description": "Line id of the line to filter by (e.g. victoria)"
        },
        {
          "name": "serviceTypes",
          "type": "any",
          "required": false,
          "description": "A comma-separated list of service types to filter on. If not specified. Supported values: Regular, Night. Defaulted to 'Regular' if not specified"
        }
      ],
      "returnType": "StopPoint[]",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint/{id}/Route",
      "method": "GET",
      "summary": "Returns the route sections for all the lines that service the given stop point ids",
      "parameters": [
        {
          "name": "id",
          "type": "string",
          "required": true,
          "description": "A stop point id (station naptan codes e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name)"
        },
        {
          "name": "serviceTypes",
          "type": "any",
          "required": false,
          "description": "A comma-separated list of service types to filter on. If not specified. Supported values: Regular, Night. Defaulted to 'Regular' if not specified"
        }
      ],
      "returnType": "StopPointRouteSection[]",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint/Mode/{modes}/Disruption",
      "method": "GET",
      "summary": "Gets a distinct list of disrupted stop points for the given modes",
      "parameters": [
        {
          "name": "modes",
          "type": "any",
          "required": true,
          "description": "A comma-seperated list of modes e.g. tube,dlr"
        },
        {
          "name": "includeRouteBlockedStops",
          "type": "boolean",
          "required": false,
          "description": ""
        }
      ],
      "returnType": "DisruptedPoint[]",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint/{ids}/Disruption",
      "method": "GET",
      "summary": "Gets all disruptions for the specified StopPointId, plus disruptions for any child Naptan records it may have.",
      "parameters": [
        {
          "name": "ids",
          "type": "any",
          "required": true,
          "description": "A comma-seperated list of stop point ids. Max. approx. 20 ids.\r\n            You can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name."
        },
        {
          "name": "getFamily",
          "type": "boolean",
          "required": false,
          "description": "Specify true to return disruptions for entire family, or false to return disruptions for just this stop point. Defaults to false."
        },
        {
          "name": "includeRouteBlockedStops",
          "type": "boolean",
          "required": false,
          "description": ""
        },
        {
          "name": "flattenResponse",
          "type": "boolean",
          "required": false,
          "description": "Specify true to associate all disruptions with parent stop point. (Only applicable when getFamily is true)."
        }
      ],
      "returnType": "DisruptedPoint[]",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint/{id}/DirectionTo/{toStopPointId}",
      "method": "GET",
      "summary": "Returns the canonical direction, \"inbound\" or \"outbound\", for a given pair of stop point Ids in the direction from -&gt; to.",
      "parameters": [
        {
          "name": "id",
          "type": "string",
          "required": true,
          "description": "Originating stop id (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name)"
        },
        {
          "name": "toStopPointId",
          "type": "string",
          "required": true,
          "description": "Destination stop id (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name)"
        },
        {
          "name": "lineId",
          "type": "string",
          "required": false,
          "description": "Optional line id filter e.g. victoria"
        }
      ],
      "returnType": "string",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint",
      "method": "GET",
      "summary": "Gets a list of StopPoints within {radius} by the specified criteria",
      "parameters": [
        {
          "name": "stopTypes",
          "type": "any",
          "required": true,
          "description": "a list of stopTypes that should be returned (a list of valid stop types can be obtained from the StopPoint/meta/stoptypes endpoint)"
        },
        {
          "name": "radius",
          "type": "number",
          "required": false,
          "description": "the radius of the bounding circle in metres (default : 200)"
        },
        {
          "name": "useStopPointHierarchy",
          "type": "boolean",
          "required": false,
          "description": "Re-arrange the output into a parent/child hierarchy"
        },
        {
          "name": "modes",
          "type": "any",
          "required": false,
          "description": "the list of modes to search (comma separated mode names e.g. tube,dlr)"
        },
        {
          "name": "categories",
          "type": "any",
          "required": false,
          "description": "an optional list of comma separated property categories to return in the StopPoint's property bag. If null or empty, all categories of property are returned. Pass the keyword \"none\" to return no properties (a valid list of categories can be obtained from the /StopPoint/Meta/categories endpoint)"
        },
        {
          "name": "returnLines",
          "type": "boolean",
          "required": false,
          "description": "true to return the lines that each stop point serves as a nested resource"
        },
        {
          "name": "location.lat",
          "type": "number",
          "required": true
        },
        {
          "name": "location.lon",
          "type": "number",
          "required": true
        }
      ],
      "returnType": "StopPointsResponse",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint/Mode/{modes}",
      "method": "GET",
      "summary": "Gets a list of StopPoints filtered by the modes available at that StopPoint.",
      "parameters": [
        {
          "name": "modes",
          "type": "any",
          "required": true,
          "description": "A comma-seperated list of modes e.g. tube,dlr"
        },
        {
          "name": "page",
          "type": "number",
          "required": false,
          "description": "The data set page to return. Page 1 equates to the first 1000 stop points, page 2 equates to 1001-2000 etc. Must be entered for bus mode as data set is too large."
        }
      ],
      "returnType": "StopPointsResponse",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint/Search/{query}",
      "method": "GET",
      "summary": "Search StopPoints by their common name, or their 5-digit Countdown Bus Stop Code.",
      "parameters": [
        {
          "name": "query",
          "type": "string",
          "required": true,
          "description": "The query string, case-insensitive. Leading and trailing wildcards are applied automatically."
        },
        {
          "name": "modes",
          "type": "any",
          "required": false,
          "description": "An optional, parameter separated list of the modes to filter by"
        },
        {
          "name": "faresOnly",
          "type": "boolean",
          "required": false,
          "description": "True to only return stations in that have Fares data available for single fares to another station."
        },
        {
          "name": "maxResults",
          "type": "number",
          "required": false,
          "description": "An optional result limit, defaulting to and with a maximum of 50. Since children of the stop point heirarchy are returned for matches,\r\n            it is possible that the flattened result set will contain more than 50 items."
        },
        {
          "name": "lines",
          "type": "any",
          "required": false,
          "description": "An optional, parameter separated list of the lines to filter by"
        },
        {
          "name": "includeHubs",
          "type": "boolean",
          "required": false,
          "description": "If true, returns results including HUBs."
        },
        {
          "name": "tflOperatedNationalRailStationsOnly",
          "type": "boolean",
          "required": false,
          "description": "If the national-rail mode is included, this flag will filter the national rail stations so that only those operated by TfL are returned"
        }
      ],
      "returnType": "SearchResponse",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint/Search",
      "method": "GET",
      "summary": "Search StopPoints by their common name, or their 5-digit Countdown Bus Stop Code.",
      "parameters": [
        {
          "name": "query",
          "type": "string",
          "required": true,
          "description": "The query string, case-insensitive. Leading and trailing wildcards are applied automatically."
        },
        {
          "name": "modes",
          "type": "any",
          "required": false,
          "description": "An optional, parameter separated list of the modes to filter by"
        },
        {
          "name": "faresOnly",
          "type": "boolean",
          "required": false,
          "description": "True to only return stations in that have Fares data available for single fares to another station."
        },
        {
          "name": "maxResults",
          "type": "number",
          "required": false,
          "description": "An optional result limit, defaulting to and with a maximum of 50. Since children of the stop point heirarchy are returned for matches,\r\n            it is possible that the flattened result set will contain more than 50 items."
        },
        {
          "name": "lines",
          "type": "any",
          "required": false,
          "description": "An optional, parameter separated list of the lines to filter by"
        },
        {
          "name": "includeHubs",
          "type": "boolean",
          "required": false,
          "description": "If true, returns results including HUBs."
        },
        {
          "name": "tflOperatedNationalRailStationsOnly",
          "type": "boolean",
          "required": false,
          "description": "If the national-rail mode is included, this flag will filter the national rail stations so that only those operated by TfL are returned"
        }
      ],
      "returnType": "SearchResponse",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint/Sms/{id}",
      "method": "GET",
      "summary": "Gets a StopPoint for a given sms code.",
      "parameters": [
        {
          "name": "id",
          "type": "string",
          "required": true,
          "description": "A 5-digit Countdown Bus Stop Code e.g. 73241, 50435, 56334."
        },
        {
          "name": "output",
          "type": "string",
          "required": false,
          "description": "If set to \"web\", a 302 redirect to relevant website bus stop page is returned. Valid values are : web. All other values are ignored."
        }
      ],
      "returnType": "Object",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint/{stopPointId}/TaxiRanks",
      "method": "GET",
      "summary": "Gets a list of taxi ranks corresponding to the given stop point id.",
      "parameters": [
        {
          "name": "stopPointId",
          "type": "string",
          "required": true,
          "description": "stopPointId is required to get the taxi ranks."
        }
      ],
      "returnType": "Place[]",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint/{stopPointId}/CarParks",
      "method": "GET",
      "summary": "Get car parks corresponding to the given stop point id.",
      "parameters": [
        {
          "name": "stopPointId",
          "type": "string",
          "required": true,
          "description": "stopPointId is required to get the car parks."
        }
      ],
      "returnType": "Place[]",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    }
  ],
  "totalEndpoints": 20,
  "generatedAt": "2025-07-08T14:05:05.594Z"
} as const;

export type STOPPOINT_DATAType = typeof STOPPOINT_DATA;
