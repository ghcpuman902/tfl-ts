// Auto-generated from TfL Swagger API
// Generated at: 2025-08-22T11:23:57.226Z

export const LINE_DATA = {
  "section": "Line",
  "endpoints": [
    {
      "path": "/Line/{ids}",
      "method": "GET",
      "summary": "Gets lines that match the specified line ids.",
      "parameters": [
        {
          "name": "ids",
          "type": "any",
          "required": true,
          "description": "A comma-separated list of line ids e.g. victoria,circle,N133. Max. approx. 20 ids."
        }
      ],
      "returnType": "Line[]",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    },
    {
      "path": "/Line/Mode/{modes}",
      "method": "GET",
      "summary": "Gets lines that serve the given modes.",
      "parameters": [
        {
          "name": "modes",
          "type": "any",
          "required": true,
          "description": "A comma-separated list of modes e.g. tube,dlr"
        }
      ],
      "returnType": "Line[]",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    },
    {
      "path": "/Line/Route",
      "method": "GET",
      "summary": "Get all valid routes for all lines, including the name and id of the originating and terminating stops for each route.",
      "parameters": [
        {
          "name": "serviceTypes",
          "type": "any",
          "required": false,
          "description": "A comma seperated list of service types to filter on. Supported values: Regular, Night. Defaulted to 'Regular' if not specified"
        }
      ],
      "returnType": "Line[]",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    },
    {
      "path": "/Line/{ids}/Route",
      "method": "GET",
      "summary": "Get all valid routes for given line ids, including the name and id of the originating and terminating stops for each route.",
      "parameters": [
        {
          "name": "ids",
          "type": "any",
          "required": true,
          "description": "A comma-separated list of line ids e.g. victoria,circle,N133. Max. approx. 20 ids."
        },
        {
          "name": "serviceTypes",
          "type": "any",
          "required": false,
          "description": "A comma seperated list of service types to filter on. Supported values: Regular, Night. Defaulted to 'Regular' if not specified"
        }
      ],
      "returnType": "Line[]",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    },
    {
      "path": "/Line/Mode/{modes}/Route",
      "method": "GET",
      "summary": "Gets all lines and their valid routes for given modes, including the name and id of the originating and terminating stops for each route",
      "parameters": [
        {
          "name": "modes",
          "type": "any",
          "required": true,
          "description": "A comma-separated list of modes e.g. tube,dlr"
        },
        {
          "name": "serviceTypes",
          "type": "any",
          "required": false,
          "description": "A comma seperated list of service types to filter on. Supported values: Regular, Night. Defaulted to 'Regular' if not specified"
        }
      ],
      "returnType": "Line[]",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    },
    {
      "path": "/Line/{id}/Route/Sequence/{direction}",
      "method": "GET",
      "summary": "Gets all valid routes for given line id, including the sequence of stops on each route.",
      "parameters": [
        {
          "name": "id",
          "type": "string",
          "required": true,
          "description": "A single line id e.g. victoria"
        },
        {
          "name": "direction",
          "type": "string",
          "required": true,
          "description": "The direction of travel. Can be inbound or outbound."
        },
        {
          "name": "serviceTypes",
          "type": "any",
          "required": false,
          "description": "A comma seperated list of service types to filter on. Supported values: Regular, Night. Defaulted to 'Regular' if not specified"
        },
        {
          "name": "excludeCrowding",
          "type": "boolean",
          "required": false,
          "description": "That excludes crowding from line disruptions. Can be true or false."
        }
      ],
      "returnType": "RouteSequence",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    },
    {
      "path": "/Line/{ids}/Status/{StartDate}/to/{EndDate}",
      "method": "GET",
      "summary": "Gets the line status for given line ids during the provided dates e.g Minor Delays",
      "parameters": [
        {
          "name": "ids",
          "type": "any",
          "required": true,
          "description": "A comma-separated list of line ids e.g. victoria,circle,N133. Max. approx. 20 ids."
        },
        {
          "name": "detail",
          "type": "boolean",
          "required": false,
          "description": "Include details of the disruptions that are causing the line status including the affected stops and routes"
        },
        {
          "name": "startDate",
          "type": "string",
          "required": true
        },
        {
          "name": "endDate",
          "type": "string",
          "required": true
        },
        {
          "name": "dateRange.startDate",
          "type": "string",
          "required": false
        },
        {
          "name": "dateRange.endDate",
          "type": "string",
          "required": false
        }
      ],
      "returnType": "Line[]",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    },
    {
      "path": "/Line/{ids}/Status",
      "method": "GET",
      "summary": "Gets the line status of for given line ids e.g Minor Delays",
      "parameters": [
        {
          "name": "ids",
          "type": "any",
          "required": true,
          "description": "A comma-separated list of line ids e.g. victoria,circle,N133. Max. approx. 20 ids."
        },
        {
          "name": "detail",
          "type": "boolean",
          "required": false,
          "description": "Include details of the disruptions that are causing the line status including the affected stops and routes"
        }
      ],
      "returnType": "Line[]",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    },
    {
      "path": "/Line/Search/{query}",
      "method": "GET",
      "summary": "Search for lines or routes matching the query string",
      "parameters": [
        {
          "name": "query",
          "type": "string",
          "required": true,
          "description": "Search term e.g victoria"
        },
        {
          "name": "modes",
          "type": "any",
          "required": false,
          "description": "Optionally filter by the specified modes"
        },
        {
          "name": "serviceTypes",
          "type": "any",
          "required": false,
          "description": "A comma seperated list of service types to filter on. Supported values: Regular, Night. Defaulted to 'Regular' if not specified"
        }
      ],
      "returnType": "RouteSearchResponse",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    },
    {
      "path": "/Line/Status/{severity}",
      "method": "GET",
      "summary": "Gets the line status for all lines with a given severity\r\n            A list of valid severity codes can be obtained from a call to Line/Meta/Severity",
      "parameters": [
        {
          "name": "severity",
          "type": "number",
          "required": true,
          "description": "The level of severity (eg: a number from 0 to 14)"
        }
      ],
      "returnType": "Line[]",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    },
    {
      "path": "/Line/Mode/{modes}/Status",
      "method": "GET",
      "summary": "Gets the line status of for all lines for the given modes",
      "parameters": [
        {
          "name": "modes",
          "type": "any",
          "required": true,
          "description": "A comma-separated list of modes to filter by. e.g. tube,dlr"
        },
        {
          "name": "detail",
          "type": "boolean",
          "required": false,
          "description": "Include details of the disruptions that are causing the line status including the affected stops and routes"
        },
        {
          "name": "severityLevel",
          "type": "string",
          "required": false,
          "description": "If specified, ensures that only those line status(es) are returned within the lines that have disruptions with the matching severity level."
        }
      ],
      "returnType": "Line[]",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    },
    {
      "path": "/Line/{id}/StopPoints",
      "method": "GET",
      "summary": "Gets a list of the stations that serve the given line id",
      "parameters": [
        {
          "name": "id",
          "type": "string",
          "required": true,
          "description": "A single line id e.g. victoria"
        },
        {
          "name": "tflOperatedNationalRailStationsOnly",
          "type": "boolean",
          "required": false,
          "description": "If the national-rail line is requested, this flag will filter the national rail stations so that only those operated by TfL are returned"
        }
      ],
      "returnType": "StopPoint[]",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    },
    {
      "path": "/Line/{id}/Timetable/{fromStopPointId}",
      "method": "GET",
      "summary": "Gets the timetable for a specified station on the give line",
      "parameters": [
        {
          "name": "fromStopPointId",
          "type": "string",
          "required": true,
          "description": "The originating station's stop point id (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name)"
        },
        {
          "name": "id",
          "type": "string",
          "required": true,
          "description": "A single line id e.g. victoria"
        }
      ],
      "returnType": "TimetableResponse",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    },
    {
      "path": "/Line/{id}/Timetable/{fromStopPointId}/to/{toStopPointId}",
      "method": "GET",
      "summary": "Gets the timetable for a specified station on the give line with specified destination",
      "parameters": [
        {
          "name": "fromStopPointId",
          "type": "string",
          "required": true,
          "description": "The originating station's stop point id (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name)"
        },
        {
          "name": "id",
          "type": "string",
          "required": true,
          "description": "A single line id e.g. victoria"
        },
        {
          "name": "toStopPointId",
          "type": "string",
          "required": true,
          "description": "The destination stations's Naptan code"
        }
      ],
      "returnType": "TimetableResponse",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    },
    {
      "path": "/Line/{ids}/Disruption",
      "method": "GET",
      "summary": "Get disruptions for the given line ids",
      "parameters": [
        {
          "name": "ids",
          "type": "any",
          "required": true,
          "description": "A comma-separated list of line ids e.g. victoria,circle,N133. Max. approx. 20 ids."
        }
      ],
      "returnType": "Disruption[]",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    },
    {
      "path": "/Line/Mode/{modes}/Disruption",
      "method": "GET",
      "summary": "Get disruptions for all lines of the given modes.",
      "parameters": [
        {
          "name": "modes",
          "type": "any",
          "required": true,
          "description": "A comma-separated list of modes e.g. tube,dlr"
        }
      ],
      "returnType": "Disruption[]",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    },
    {
      "path": "/Line/{ids}/Arrivals/{stopPointId}",
      "method": "GET",
      "summary": "Get the list of arrival predictions for given line ids based at the given stop",
      "parameters": [
        {
          "name": "ids",
          "type": "any",
          "required": true,
          "description": "A comma-separated list of line ids e.g. victoria,circle,N133. Max. approx. 20 ids."
        },
        {
          "name": "stopPointId",
          "type": "string",
          "required": true,
          "description": "Optional. Id of stop to get arrival predictions for (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name)"
        },
        {
          "name": "direction",
          "type": "string",
          "required": false,
          "description": "Optional. The direction of travel. Can be inbound or outbound or all. If left blank, and destinationStopId is set, will default to all"
        },
        {
          "name": "destinationStationId",
          "type": "string",
          "required": false,
          "description": "Optional. Id of destination stop"
        }
      ],
      "returnType": "Prediction[]",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    }
  ],
  "totalEndpoints": 17,
  "generatedAt": "2025-08-22T11:23:57.226Z"
} as const;

export type LINE_DATAType = typeof LINE_DATA;
