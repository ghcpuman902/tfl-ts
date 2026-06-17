// Auto-generated from TfL Swagger API
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ../generated.meta.json

export const AIRQUALITY_DATA = {
  "section": "AirQuality",
  "endpoints": [
    {
      "path": "/AirQuality",
      "method": "GET",
      "summary": "Gets air quality data feed",
      "parameters": [],
      "returnType": "Object",
      "deprecated": false,
      "tags": [
        "AirQuality"
      ]
    }
  ],
  "totalEndpoints": 1
} as const;

export type AIRQUALITY_DATAType = typeof AIRQUALITY_DATA;
