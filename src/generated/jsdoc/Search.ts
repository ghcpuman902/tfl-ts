// Auto-generated from TfL Swagger API
// Generated at: 2025-08-22T11:23:57.227Z

export const SEARCH_DATA = {
  "section": "Search",
  "endpoints": [
    {
      "path": "/Search",
      "method": "GET",
      "summary": "Search the site for occurrences of the query string. The maximum number of results returned is equal to the maximum page size\r\n            of 100. To return subsequent pages, use the paginated overload.",
      "parameters": [
        {
          "name": "query",
          "type": "string",
          "required": true,
          "description": "The search query"
        }
      ],
      "returnType": "SearchResponse",
      "deprecated": false,
      "tags": [
        "Search"
      ]
    },
    {
      "path": "/Search/BusSchedules",
      "method": "GET",
      "summary": "Searches the bus schedules folder on S3 for a given bus number.",
      "parameters": [
        {
          "name": "query",
          "type": "string",
          "required": true,
          "description": "The search query"
        }
      ],
      "returnType": "SearchResponse",
      "deprecated": false,
      "tags": [
        "Search"
      ]
    }
  ],
  "totalEndpoints": 2,
  "generatedAt": "2025-08-22T11:23:57.227Z"
} as const;

export type SEARCH_DATAType = typeof SEARCH_DATA;
