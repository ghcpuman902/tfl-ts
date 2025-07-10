// Auto-generated from TfL Swagger API
// Generated at: 2025-07-08T14:05:05.593Z

export const CABWISE_DATA = {
  "section": "Cabwise",
  "endpoints": [
    {
      "path": "/Cabwise/search",
      "method": "GET",
      "summary": "Gets taxis and minicabs contact information",
      "parameters": [
        {
          "name": "lat",
          "type": "number",
          "required": true,
          "description": "Latitude"
        },
        {
          "name": "lon",
          "type": "number",
          "required": true,
          "description": "Longitude"
        },
        {
          "name": "optype",
          "type": "string",
          "required": false,
          "description": "Operator Type e.g Minicab, Executive, Limousine"
        },
        {
          "name": "wc",
          "type": "string",
          "required": false,
          "description": "Wheelchair accessible"
        },
        {
          "name": "radius",
          "type": "number",
          "required": false,
          "description": "The radius of the bounding circle in metres"
        },
        {
          "name": "name",
          "type": "string",
          "required": false,
          "description": "Trading name of operating company"
        },
        {
          "name": "maxResults",
          "type": "number",
          "required": false,
          "description": "An optional parameter to limit the number of results return. Default and maximum is 20."
        },
        {
          "name": "legacyFormat",
          "type": "boolean",
          "required": false,
          "description": "Legacy Format"
        },
        {
          "name": "forceXml",
          "type": "boolean",
          "required": false,
          "description": "Force Xml"
        },
        {
          "name": "twentyFourSevenOnly",
          "type": "boolean",
          "required": false,
          "description": "Twenty Four Seven Only"
        }
      ],
      "returnType": "Object",
      "deprecated": false,
      "tags": [
        "Cabwise"
      ]
    }
  ],
  "totalEndpoints": 1,
  "generatedAt": "2025-07-08T14:05:05.593Z"
} as const;

export type CABWISE_DATAType = typeof CABWISE_DATA;
