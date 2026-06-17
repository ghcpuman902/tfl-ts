// Auto-generated from TfL Swagger API
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ../generated.meta.json

export const MODE_DATA = {
  "section": "Mode",
  "endpoints": [
    {
      "path": "/Mode/ActiveServiceTypes",
      "method": "GET",
      "summary": "Returns the service type active for a mode.\r\n            Currently only supports tube",
      "parameters": [],
      "returnType": "ActiveServiceType[]",
      "deprecated": false,
      "tags": [
        "Mode"
      ]
    },
    {
      "path": "/Mode/{mode}/Arrivals",
      "method": "GET",
      "summary": "Gets the next arrival predictions for all stops of a given mode",
      "parameters": [
        {
          "name": "mode",
          "type": "string",
          "required": true,
          "description": "A mode name e.g. tube, dlr"
        },
        {
          "name": "count",
          "type": "number",
          "required": false,
          "description": "A number of arrivals to return for each stop, -1 to return all available."
        }
      ],
      "returnType": "Prediction[]",
      "deprecated": false,
      "tags": [
        "Mode"
      ]
    }
  ],
  "totalEndpoints": 2
} as const;

export type MODE_DATAType = typeof MODE_DATA;
