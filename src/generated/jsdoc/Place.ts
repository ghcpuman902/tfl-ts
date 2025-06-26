// Auto-generated from TfL Swagger API
// Generated at: 2025-06-19T16:03:07.560Z

export const PLACE_DATA = {
  "section": "Place",
  "endpoints": [
    {
      "path": "/Place/Address/Streets/{Postcode}",
      "method": "GET",
      "summary": "Gets the set of streets associated with a post code.",
      "parameters": [
        {
          "name": "postcode",
          "type": "string",
          "required": true
        },
        {
          "name": "postcodeInput.postcode",
          "type": "string",
          "required": false
        }
      ],
      "returnType": "Object",
      "deprecated": false,
      "tags": [
        "Place"
      ]
    },
    {
      "path": "/Place/Type/{types}",
      "method": "GET",
      "summary": "Gets all places of a given type",
      "parameters": [
        {
          "name": "types",
          "type": "any",
          "required": true,
          "description": "A comma-separated list of the types to return. Max. approx 12 types.\r\n            A valid list of place types can be obtained from the /Place/Meta/placeTypes endpoint."
        },
        {
          "name": "activeOnly",
          "type": "boolean",
          "required": false,
          "description": "An optional parameter to limit the results to active records only (Currently only the 'VariableMessageSign' place type is supported)"
        }
      ],
      "returnType": "Place[]",
      "deprecated": false,
      "tags": [
        "Place"
      ]
    },
    {
      "path": "/Place/{id}",
      "method": "GET",
      "summary": "Gets the place with the given id.",
      "parameters": [
        {
          "name": "id",
          "type": "string",
          "required": true,
          "description": "The id of the place, you can use the /Place/Types/{types} endpoint to get a list of places for a given type including their ids"
        },
        {
          "name": "includeChildren",
          "type": "boolean",
          "required": false,
          "description": "Defaults to false. If true child places e.g. individual charging stations at a charge point while be included, otherwise just the URLs of any child places will be returned"
        }
      ],
      "returnType": "Place[]",
      "deprecated": false,
      "tags": [
        "Place"
      ]
    },
    {
      "path": "/Place",
      "method": "GET",
      "summary": "Gets the places that lie within a geographic region. The geographic region of interest can either be specified\r\n            by using a lat/lon geo-point and a radius in metres to return places within the locus defined by the lat/lon of\r\n            its centre or alternatively, by the use of a bounding box defined by the lat/lon of its north-west and south-east corners.\r\n            Optionally filters on type and can strip properties for a smaller payload.",
      "parameters": [
        {
          "name": "radius",
          "type": "number",
          "required": false,
          "description": "The radius of the bounding circle in metres when only lat/lon are specified."
        },
        {
          "name": "categories",
          "type": "any",
          "required": false,
          "description": "An optional list of comma separated property categories to return in the Place's property bag. If null or empty, all categories of property are returned. Pass the keyword \"none\" to return no properties (a valid list of categories can be obtained from the /Place/Meta/categories endpoint)"
        },
        {
          "name": "includeChildren",
          "type": "boolean",
          "required": false,
          "description": "Defaults to false. If true child places e.g. individual charging stations at a charge point while be included, otherwise just the URLs of any child places will be returned"
        },
        {
          "name": "type",
          "type": "any",
          "required": false,
          "description": "Place types to filter on, or null to return all types"
        },
        {
          "name": "activeOnly",
          "type": "boolean",
          "required": false,
          "description": "An optional parameter to limit the results to active records only (Currently only the 'VariableMessageSign' place type is supported)"
        },
        {
          "name": "numberOfPlacesToReturn",
          "type": "number",
          "required": false,
          "description": "If specified, limits the number of returned places equal to the given value"
        },
        {
          "name": "placeGeo.swLat",
          "type": "number",
          "required": false
        },
        {
          "name": "placeGeo.swLon",
          "type": "number",
          "required": false
        },
        {
          "name": "placeGeo.neLat",
          "type": "number",
          "required": false
        },
        {
          "name": "placeGeo.neLon",
          "type": "number",
          "required": false
        },
        {
          "name": "placeGeo.lat",
          "type": "number",
          "required": false
        },
        {
          "name": "placeGeo.lon",
          "type": "number",
          "required": false
        }
      ],
      "returnType": "StopPoint[]",
      "deprecated": false,
      "tags": [
        "Place"
      ]
    },
    {
      "path": "/Place/{type}/At/{Lat}/{Lon}",
      "method": "GET",
      "summary": "Gets any places of the given type whose geography intersects the given latitude and longitude. In practice this means the Place\r\n            must be polygonal e.g. a BoroughBoundary.",
      "parameters": [
        {
          "name": "type",
          "type": "any",
          "required": true,
          "description": "The place type (a valid list of place types can be obtained from the /Place/Meta/placeTypes endpoint)"
        },
        {
          "name": "lat",
          "type": "string",
          "required": true
        },
        {
          "name": "lon",
          "type": "string",
          "required": true
        },
        {
          "name": "location.lat",
          "type": "number",
          "required": true
        },
        {
          "name": "location.lon",
          "type": "number",
          "required": true
        }
      ],
      "returnType": "Object",
      "deprecated": false,
      "tags": [
        "Place"
      ]
    },
    {
      "path": "/Place/{type}/overlay/{z}/{Lat}/{Lon}/{width}/{height}",
      "method": "GET",
      "summary": "Gets the place overlay for a given set of co-ordinates and a given width/height.",
      "parameters": [
        {
          "name": "z",
          "type": "number",
          "required": true,
          "description": "The zoom level"
        },
        {
          "name": "type",
          "type": "any",
          "required": true,
          "description": "The place type (a valid list of place types can be obtained from the /Place/Meta/placeTypes endpoint)"
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
          "name": "lat",
          "type": "string",
          "required": true
        },
        {
          "name": "lon",
          "type": "string",
          "required": true
        },
        {
          "name": "location.lat",
          "type": "number",
          "required": true
        },
        {
          "name": "location.lon",
          "type": "number",
          "required": true
        }
      ],
      "returnType": "Object",
      "deprecated": false,
      "tags": [
        "Place"
      ]
    },
    {
      "path": "/Place/Search",
      "method": "GET",
      "summary": "Gets all places that matches the given query",
      "parameters": [
        {
          "name": "name",
          "type": "string",
          "required": true,
          "description": "The name of the place, you can use the /Place/Types/{types} endpoint to get a list of places for a given type including their names."
        },
        {
          "name": "types",
          "type": "any",
          "required": false,
          "description": "A comma-separated list of the types to return. Max. approx 12 types."
        }
      ],
      "returnType": "Place[]",
      "deprecated": false,
      "tags": [
        "Place"
      ]
    }
  ],
  "totalEndpoints": 7,
  "generatedAt": "2025-06-19T16:03:07.560Z"
} as const;

export type PLACE_DATAType = typeof PLACE_DATA;
