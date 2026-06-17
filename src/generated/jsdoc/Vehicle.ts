// Auto-generated from TfL Swagger API
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ../generated.meta.json

export const VEHICLE_DATA = {
  "section": "Vehicle",
  "endpoints": [
    {
      "path": "/Vehicle/{ids}/Arrivals",
      "method": "GET",
      "summary": "Gets the predictions for a given list of vehicle Id's.",
      "parameters": [
        {
          "name": "ids",
          "type": "any",
          "required": true,
          "description": "A comma-separated list of vehicle ids e.g. LX58CFV,LX11AZB,LX58CFE. Max approx. 25 ids."
        }
      ],
      "returnType": "Prediction[]",
      "deprecated": false,
      "tags": [
        "Vehicle"
      ]
    }
  ],
  "totalEndpoints": 1
} as const;

export type VEHICLE_DATAType = typeof VEHICLE_DATA;
