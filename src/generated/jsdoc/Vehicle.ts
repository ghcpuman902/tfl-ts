// Auto-generated from TfL Swagger API
// Generated at: 2025-07-08T14:05:05.595Z

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
  "totalEndpoints": 1,
  "generatedAt": "2025-07-08T14:05:05.595Z"
} as const;

export type VEHICLE_DATAType = typeof VEHICLE_DATA;
