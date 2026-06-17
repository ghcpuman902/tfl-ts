// Auto-generated from TfL Swagger API
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ../generated.meta.json

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
  "totalEndpoints": 5
} as const;

export type OCCUPANCY_DATAType = typeof OCCUPANCY_DATA;
