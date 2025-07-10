// Auto-generated from TfL Swagger API
// Generated at: 2025-07-10T01:28:59.104Z

export const ACCIDENTSTATS_DATA = {
  "section": "AccidentStats",
  "endpoints": [
    {
      "path": "/AccidentStats/{year}",
      "method": "GET",
      "summary": "Gets all accident details for accidents occuring in the specified year",
      "parameters": [
        {
          "name": "year",
          "type": "number",
          "required": true,
          "description": "The year for which to filter the accidents on."
        }
      ],
      "returnType": "AccidentDetail[]",
      "deprecated": false,
      "tags": [
        "AccidentStats"
      ]
    }
  ],
  "totalEndpoints": 1,
  "generatedAt": "2025-07-10T01:28:59.104Z"
} as const;

export type ACCIDENTSTATS_DATAType = typeof ACCIDENTSTATS_DATA;
