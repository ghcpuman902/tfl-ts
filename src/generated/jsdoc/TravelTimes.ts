// Auto-generated from TfL Swagger API
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ../generated.meta.json

export const TRAVELTIMES_DATA = {
  "section": "TravelTimes",
  "endpoints": [
    {
      "path": "/TravelTimes/overlay/{z}/mapcenter/{mapCenterLat}/{mapCenterLon}/pinlocation/{pinLat}/{pinLon}/dimensions/{width}/{height}",
      "method": "GET",
      "summary": "Gets the TravelTime overlay.",
      "parameters": [
        {
          "name": "z",
          "type": "number",
          "required": true,
          "description": "The zoom level."
        },
        {
          "name": "pinLat",
          "type": "number",
          "required": true,
          "description": "The latitude of the pin."
        },
        {
          "name": "pinLon",
          "type": "number",
          "required": true,
          "description": "The longitude of the pin."
        },
        {
          "name": "mapCenterLat",
          "type": "number",
          "required": true,
          "description": "The map center latitude."
        },
        {
          "name": "mapCenterLon",
          "type": "number",
          "required": true,
          "description": "The map center longitude."
        },
        {
          "name": "scenarioTitle",
          "type": "string",
          "required": true,
          "description": "The title of the scenario."
        },
        {
          "name": "timeOfDayId",
          "type": "string",
          "required": true,
          "description": "The id for the time of day (AM/INTER/PM)"
        },
        {
          "name": "modeId",
          "type": "string",
          "required": true,
          "description": "The id of the mode."
        },
        {
          "name": "width",
          "type": "number",
          "required": true,
          "description": "The width of the requested overlay."
        },
        {
          "name": "height",
          "type": "number",
          "required": true,
          "description": "The height of the requested overlay."
        },
        {
          "name": "direction",
          "type": "string",
          "required": true,
          "description": "The direction of travel."
        },
        {
          "name": "travelTimeInterval",
          "type": "number",
          "required": true,
          "description": "The total minutes between the travel time bands"
        }
      ],
      "returnType": "Object",
      "deprecated": false,
      "tags": [
        "TravelTime"
      ]
    },
    {
      "path": "/TravelTimes/compareOverlay/{z}/mapcenter/{mapCenterLat}/{mapCenterLon}/pinlocation/{pinLat}/{pinLon}/dimensions/{width}/{height}",
      "method": "GET",
      "summary": "Gets the TravelTime overlay.",
      "parameters": [
        {
          "name": "z",
          "type": "number",
          "required": true,
          "description": "The zoom level."
        },
        {
          "name": "pinLat",
          "type": "number",
          "required": true,
          "description": "The latitude of the pin."
        },
        {
          "name": "pinLon",
          "type": "number",
          "required": true,
          "description": "The longitude of the pin."
        },
        {
          "name": "mapCenterLat",
          "type": "number",
          "required": true,
          "description": "The map center latitude."
        },
        {
          "name": "mapCenterLon",
          "type": "number",
          "required": true,
          "description": "The map center longitude."
        },
        {
          "name": "scenarioTitle",
          "type": "string",
          "required": true,
          "description": "The title of the scenario."
        },
        {
          "name": "timeOfDayId",
          "type": "string",
          "required": true,
          "description": "The id for the time of day (AM/INTER/PM)"
        },
        {
          "name": "modeId",
          "type": "string",
          "required": true,
          "description": "The id of the mode."
        },
        {
          "name": "width",
          "type": "number",
          "required": true,
          "description": "The width of the requested overlay."
        },
        {
          "name": "height",
          "type": "number",
          "required": true,
          "description": "The height of the requested overlay."
        },
        {
          "name": "direction",
          "type": "string",
          "required": true,
          "description": "The direction of travel."
        },
        {
          "name": "travelTimeInterval",
          "type": "number",
          "required": true,
          "description": "The total minutes between the travel time bands"
        },
        {
          "name": "compareType",
          "type": "string",
          "required": true
        },
        {
          "name": "compareValue",
          "type": "string",
          "required": true
        }
      ],
      "returnType": "Object",
      "deprecated": false,
      "tags": [
        "TravelTime"
      ]
    }
  ],
  "totalEndpoints": 2
} as const;

export type TRAVELTIMES_DATAType = typeof TRAVELTIMES_DATA;
