// Auto-generated from TfL Swagger API
// Generated at: 2025-06-19T16:03:07.560Z

export const BIKEPOINT_DATA = {
  "section": "BikePoint",
  "endpoints": [
    {
      "path": "/BikePoint",
      "method": "GET",
      "summary": "Gets all bike point locations. The Place object has an addtionalProperties array which contains the nbBikes, nbDocks and nbSpaces\r\n            numbers which give the status of the BikePoint. A mismatch in these numbers i.e. nbDocks - (nbBikes + nbSpaces) != 0 indicates broken docks.",
      "parameters": [],
      "returnType": "Place[]",
      "deprecated": false,
      "tags": [
        "BikePoint"
      ]
    },
    {
      "path": "/BikePoint/{id}",
      "method": "GET",
      "summary": "Gets the bike point with the given id.",
      "parameters": [
        {
          "name": "id",
          "type": "string",
          "required": true,
          "description": "A bike point id (a list of ids can be obtained from the above BikePoint call)"
        }
      ],
      "returnType": "Place",
      "deprecated": false,
      "tags": [
        "BikePoint"
      ]
    },
    {
      "path": "/BikePoint/Search",
      "method": "GET",
      "summary": "Search for bike stations by their name, a bike point's name often contains information about the name of the street\r\n            or nearby landmarks, for example. Note that the search result does not contain the PlaceProperties i.e. the status\r\n            or occupancy of the BikePoint, to get that information you should retrieve the BikePoint by its id on /BikePoint/id.",
      "parameters": [
        {
          "name": "query",
          "type": "string",
          "required": true,
          "description": "The search term e.g. \"St. James\""
        }
      ],
      "returnType": "Place[]",
      "deprecated": false,
      "tags": [
        "BikePoint"
      ]
    }
  ],
  "totalEndpoints": 3,
  "generatedAt": "2025-06-19T16:03:07.560Z"
} as const;

export type BIKEPOINT_DATAType = typeof BIKEPOINT_DATA;
