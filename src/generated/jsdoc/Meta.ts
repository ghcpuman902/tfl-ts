// Auto-generated from TfL Swagger API
// Generated at: 2025-07-08T14:05:05.591Z

export const META_DATA = {
  "section": "Meta",
  "endpoints": [
    {
      "path": "/Journey/Meta/Modes",
      "method": "GET",
      "summary": "Gets a list of all of the available journey planner modes",
      "parameters": [],
      "returnType": "Mode[]",
      "deprecated": false,
      "tags": [
        "Journey"
      ]
    },
    {
      "path": "/Line/Meta/Modes",
      "method": "GET",
      "summary": "Gets a list of valid modes",
      "parameters": [],
      "returnType": "Mode[]",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    },
    {
      "path": "/Line/Meta/Severity",
      "method": "GET",
      "summary": "Gets a list of valid severity codes",
      "parameters": [],
      "returnType": "StatusSeverity[]",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    },
    {
      "path": "/Line/Meta/DisruptionCategories",
      "method": "GET",
      "summary": "Gets a list of valid disruption categories",
      "parameters": [],
      "returnType": "array",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    },
    {
      "path": "/Line/Meta/ServiceTypes",
      "method": "GET",
      "summary": "Gets a list of valid ServiceTypes to filter on",
      "parameters": [],
      "returnType": "array",
      "deprecated": false,
      "tags": [
        "Line"
      ]
    },
    {
      "path": "/Place/Meta/Categories",
      "method": "GET",
      "summary": "Gets a list of all of the available place property categories and keys.",
      "parameters": [],
      "returnType": "PlaceCategory[]",
      "deprecated": false,
      "tags": [
        "Place"
      ]
    },
    {
      "path": "/Place/Meta/PlaceTypes",
      "method": "GET",
      "summary": "Gets a list of the available types of Place.",
      "parameters": [],
      "returnType": "PlaceCategory[]",
      "deprecated": false,
      "tags": [
        "Place"
      ]
    },
    {
      "path": "/Road/Meta/Categories",
      "method": "GET",
      "summary": "Gets a list of valid RoadDisruption categories",
      "parameters": [],
      "returnType": "array",
      "deprecated": false,
      "tags": [
        "Road"
      ]
    },
    {
      "path": "/Road/Meta/Severities",
      "method": "GET",
      "summary": "Gets a list of valid RoadDisruption severity codes",
      "parameters": [],
      "returnType": "StatusSeverity[]",
      "deprecated": false,
      "tags": [
        "Road"
      ]
    },
    {
      "path": "/Search/Meta/SearchProviders",
      "method": "GET",
      "summary": "Gets the available searchProvider names.",
      "parameters": [],
      "returnType": "array",
      "deprecated": false,
      "tags": [
        "Search"
      ]
    },
    {
      "path": "/Search/Meta/Categories",
      "method": "GET",
      "summary": "Gets the available search categories.",
      "parameters": [],
      "returnType": "array",
      "deprecated": false,
      "tags": [
        "Search"
      ]
    },
    {
      "path": "/Search/Meta/Sorts",
      "method": "GET",
      "summary": "Gets the available sorting options.",
      "parameters": [],
      "returnType": "array",
      "deprecated": false,
      "tags": [
        "Search"
      ]
    },
    {
      "path": "/StopPoint/Meta/Categories",
      "method": "GET",
      "summary": "Gets the list of available StopPoint additional information categories",
      "parameters": [],
      "returnType": "StopPointCategory[]",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint/Meta/StopTypes",
      "method": "GET",
      "summary": "Gets the list of available StopPoint types",
      "parameters": [],
      "returnType": "array",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    },
    {
      "path": "/StopPoint/Meta/Modes",
      "method": "GET",
      "summary": "Gets the list of available StopPoint modes",
      "parameters": [],
      "returnType": "Mode[]",
      "deprecated": false,
      "tags": [
        "StopPoint"
      ]
    }
  ],
  "totalEndpoints": 15,
  "generatedAt": "2025-07-08T14:05:05.591Z"
} as const;

export type META_DATAType = typeof META_DATA;
