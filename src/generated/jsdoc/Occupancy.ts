// Auto-generated from TfL Swagger API
// Generated at: 2025-07-08T14:05:05.594Z

export const OCCUPANCY_DATA = {
  "section": "Occupancy",
  "endpoints": [
    {
      "path": "/Occupancy/CarPark/{id}",
      "method": "GET",
      "summary": "Gets the occupancy for a car park with a given id",
      "parameters": [
        {
          "name": "id",
          "type": "string",
          "required": true,
          "description": ""
        }
      ],
      "returnType": "CarParkOccupancy",
      "deprecated": false,
      "tags": [
        "Occupancy"
      ]
    },
    {
      "path": "/Occupancy/CarPark",
      "method": "GET",
      "summary": "Gets the occupancy for all car parks that have occupancy data",
      "parameters": [],
      "returnType": "CarParkOccupancy[]",
      "deprecated": false,
      "tags": [
        "Occupancy"
      ]
    },
    {
      "path": "/Occupancy/ChargeConnector/{ids}",
      "method": "GET",
      "summary": "Gets the occupancy for a charge connectors with a given id (sourceSystemPlaceId)",
      "parameters": [
        {
          "name": "ids",
          "type": "any",
          "required": true
        }
      ],
      "returnType": "ChargeConnectorOccupancy[]",
      "deprecated": false,
      "tags": [
        "Occupancy"
      ]
    },
    {
      "path": "/Occupancy/ChargeConnector",
      "method": "GET",
      "summary": "Gets the occupancy for all charge connectors",
      "parameters": [],
      "returnType": "ChargeConnectorOccupancy[]",
      "deprecated": false,
      "tags": [
        "Occupancy"
      ]
    },
    {
      "path": "/Occupancy/BikePoints/{ids}",
      "method": "GET",
      "summary": "Get the occupancy for bike points.",
      "parameters": [
        {
          "name": "ids",
          "type": "any",
          "required": true,
          "description": ""
        }
      ],
      "returnType": "BikePointOccupancy[]",
      "deprecated": false,
      "tags": [
        "Occupancy"
      ]
    }
  ],
  "totalEndpoints": 5,
  "generatedAt": "2025-07-08T14:05:05.594Z"
} as const;

export type OCCUPANCY_DATAType = typeof OCCUPANCY_DATA;
