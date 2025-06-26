// Auto-generated from TfL Swagger API
// Generated at: 2025-06-19T16:03:07.561Z

export const ROAD_DATA = {
  "section": "Road",
  "endpoints": [
    {
      "path": "/Road",
      "method": "GET",
      "summary": "Gets all roads managed by TfL",
      "parameters": [],
      "returnType": "RoadCorridor[]",
      "deprecated": false,
      "tags": [
        "Road"
      ]
    },
    {
      "path": "/Road/{ids}",
      "method": "GET",
      "summary": "Gets the road with the specified id (e.g. A1)",
      "parameters": [
        {
          "name": "ids",
          "type": "any",
          "required": true,
          "description": "Comma-separated list of road identifiers e.g. \"A406, A2\" (a full list of supported road identifiers can be found at the /Road/ endpoint)"
        }
      ],
      "returnType": "RoadCorridor[]",
      "deprecated": false,
      "tags": [
        "Road"
      ]
    },
    {
      "path": "/Road/{ids}/Status",
      "method": "GET",
      "summary": "Gets the specified roads with the status aggregated over the date range specified, or now until the end of today if no dates are passed.",
      "parameters": [
        {
          "name": "ids",
          "type": "any",
          "required": true,
          "description": "Comma-separated list of road identifiers e.g. \"A406, A2\" or use \"all\" to ignore id filter (a full list of supported road identifiers can be found at the /Road/ endpoint)"
        },
        {
          "name": "dateRangeNullable.startDate",
          "type": "string",
          "required": false
        },
        {
          "name": "dateRangeNullable.endDate",
          "type": "string",
          "required": false
        }
      ],
      "returnType": "RoadCorridor[]",
      "deprecated": false,
      "tags": [
        "Road"
      ]
    },
    {
      "path": "/Road/{ids}/Disruption",
      "method": "GET",
      "summary": "Get active disruptions, filtered by road ids",
      "parameters": [
        {
          "name": "ids",
          "type": "any",
          "required": true,
          "description": "Comma-separated list of road identifiers e.g. \"A406, A2\" use all for all to ignore id filter (a full list of supported road identifiers can be found at the /Road/ endpoint)"
        },
        {
          "name": "stripContent",
          "type": "boolean",
          "required": false,
          "description": "Optional, defaults to false. When true, removes every property/node except for id, point, severity, severityDescription, startDate, endDate, corridor details, location, comments and streets"
        },
        {
          "name": "severities",
          "type": "any",
          "required": false,
          "description": "an optional list of Severity names to filter on (a valid list of severities can be obtained from the /Road/Meta/severities endpoint)"
        },
        {
          "name": "categories",
          "type": "any",
          "required": false,
          "description": "an optional list of category names to filter on (a valid list of categories can be obtained from the /Road/Meta/categories endpoint)"
        },
        {
          "name": "closures",
          "type": "boolean",
          "required": false,
          "description": "Optional, defaults to true. When true, always includes disruptions that have road closures, regardless of the severity filter. When false, the severity filter works as normal."
        }
      ],
      "returnType": "RoadDisruption[]",
      "deprecated": false,
      "tags": [
        "Road"
      ]
    },
    {
      "path": "/Road/all/Street/Disruption",
      "method": "GET",
      "summary": "Gets a list of disrupted streets. If no date filters are provided, current disruptions are returned.",
      "parameters": [
        {
          "name": "startDate",
          "type": "string",
          "required": true,
          "description": "Optional, the start time to filter on."
        },
        {
          "name": "endDate",
          "type": "string",
          "required": true,
          "description": "Optional, The end time to filter on."
        }
      ],
      "returnType": "Object",
      "deprecated": false,
      "tags": [
        "Road"
      ]
    },
    {
      "path": "/Road/all/Disruption/{disruptionIds}",
      "method": "GET",
      "summary": "Gets a list of active disruptions filtered by disruption Ids.",
      "parameters": [
        {
          "name": "disruptionIds",
          "type": "any",
          "required": true,
          "description": "Comma-separated list of disruption identifiers to filter by."
        },
        {
          "name": "stripContent",
          "type": "boolean",
          "required": false,
          "description": "Optional, defaults to false. When true, removes every property/node except for id, point, severity, severityDescription, startDate, endDate, corridor details, location and comments."
        }
      ],
      "returnType": "RoadDisruption",
      "deprecated": false,
      "tags": [
        "Road"
      ]
    }
  ],
  "totalEndpoints": 6,
  "generatedAt": "2025-06-19T16:03:07.561Z"
} as const;

export type ROAD_DATAType = typeof ROAD_DATA;
