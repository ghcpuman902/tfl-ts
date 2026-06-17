// Auto-generated from TfL Swagger API
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ../generated.meta.json

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
  "totalEndpoints": 2
} as const;

export type SEARCH_DATAType = typeof SEARCH_DATA;
