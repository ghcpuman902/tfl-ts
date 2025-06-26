// Auto-generated from TfL Swagger API
// Generated at: 2025-06-19T16:03:07.560Z

export const JOURNEY_DATA = {
  "section": "Journey",
  "endpoints": [
    {
      "path": "/Journey/JourneyResults/{from}/to/{to}",
      "method": "GET",
      "summary": "Perform a Journey Planner search from the parameters specified in simple types",
      "parameters": [
        {
          "name": "from",
          "type": "string",
          "required": true,
          "description": "Origin of the journey. Can be WGS84 coordinates expressed as \"lat,long\", a UK postcode, a Naptan (StopPoint) id, an ICS StopId, or a free-text string (will cause disambiguation unless it exactly matches a point of interest name)."
        },
        {
          "name": "to",
          "type": "string",
          "required": true,
          "description": "Destination of the journey. Can be WGS84 coordinates expressed as \"lat,long\", a UK postcode, a Naptan (StopPoint) id, an ICS StopId, or a free-text string (will cause disambiguation unless it exactly matches a point of interest name)."
        },
        {
          "name": "via",
          "type": "string",
          "required": false,
          "description": "Travel through point on the journey. Can be WGS84 coordinates expressed as \"lat,long\", a UK postcode, a Naptan (StopPoint) id, an ICS StopId, or a free-text string (will cause disambiguation unless it exactly matches a point of interest name)."
        },
        {
          "name": "nationalSearch",
          "type": "boolean",
          "required": false,
          "description": "Does the journey cover stops outside London? eg. \"nationalSearch=true\""
        },
        {
          "name": "date",
          "type": "string",
          "required": false,
          "description": "The date must be in yyyyMMdd format"
        },
        {
          "name": "time",
          "type": "string",
          "required": false,
          "description": "The time must be in HHmm format"
        },
        {
          "name": "timeIs",
          "type": "string",
          "required": false,
          "description": "Does the time given relate to arrival or leaving time? Possible options: \"departing\" | \"arriving\""
        },
        {
          "name": "journeyPreference",
          "type": "string",
          "required": false,
          "description": "The journey preference eg possible options: \"leastinterchange\" | \"leasttime\" | \"leastwalking\""
        },
        {
          "name": "mode",
          "type": "any",
          "required": false,
          "description": "The mode must be a comma separated list of modes. eg possible options: \"public-bus,overground,train,tube,coach,dlr,cablecar,tram,river,walking,cycle\""
        },
        {
          "name": "accessibilityPreference",
          "type": "any",
          "required": false,
          "description": "The accessibility preference must be a comma separated list eg. \"noSolidStairs,noEscalators,noElevators,stepFreeToVehicle,stepFreeToPlatform\""
        },
        {
          "name": "fromName",
          "type": "string",
          "required": false,
          "description": "An optional name to associate with the origin of the journey in the results."
        },
        {
          "name": "toName",
          "type": "string",
          "required": false,
          "description": "An optional name to associate with the destination of the journey in the results."
        },
        {
          "name": "viaName",
          "type": "string",
          "required": false,
          "description": "An optional name to associate with the via point of the journey in the results."
        },
        {
          "name": "maxTransferMinutes",
          "type": "string",
          "required": false,
          "description": "The max walking time in minutes for transfer eg. \"120\""
        },
        {
          "name": "maxWalkingMinutes",
          "type": "string",
          "required": false,
          "description": "The max walking time in minutes for journeys eg. \"120\""
        },
        {
          "name": "walkingSpeed",
          "type": "string",
          "required": false,
          "description": "The walking speed. eg possible options: \"slow\" | \"average\" | \"fast\"."
        },
        {
          "name": "cyclePreference",
          "type": "string",
          "required": false,
          "description": "The cycle preference. eg possible options: \"allTheWay\" | \"leaveAtStation\" | \"takeOnTransport\" | \"cycleHire\""
        },
        {
          "name": "adjustment",
          "type": "string",
          "required": false,
          "description": "Time adjustment command. eg possible options: \"TripFirst\" | \"TripLast\""
        },
        {
          "name": "bikeProficiency",
          "type": "any",
          "required": false,
          "description": "A comma separated list of cycling proficiency levels. eg possible options: \"easy,moderate,fast\""
        },
        {
          "name": "alternativeCycle",
          "type": "boolean",
          "required": false,
          "description": "Option to determine whether to return alternative cycling journey"
        },
        {
          "name": "alternativeWalking",
          "type": "boolean",
          "required": false,
          "description": "Option to determine whether to return alternative walking journey"
        },
        {
          "name": "applyHtmlMarkup",
          "type": "boolean",
          "required": false,
          "description": "Flag to determine whether certain text (e.g. walking instructions) should be output with HTML tags or not."
        },
        {
          "name": "useMultiModalCall",
          "type": "boolean",
          "required": false,
          "description": "A boolean to indicate whether or not to return 3 public transport journeys, a bus journey, a cycle hire journey, a personal cycle journey and a walking journey"
        },
        {
          "name": "walkingOptimization",
          "type": "boolean",
          "required": false,
          "description": "A boolean to indicate whether to optimize journeys using walking"
        },
        {
          "name": "taxiOnlyTrip",
          "type": "boolean",
          "required": false,
          "description": "A boolean to indicate whether to return one or more taxi journeys. Note, setting this to true will override \"useMultiModalCall\"."
        },
        {
          "name": "routeBetweenEntrances",
          "type": "boolean",
          "required": false,
          "description": "A boolean to indicate whether public transport routes should include directions between platforms and station entrances."
        },
        {
          "name": "useRealTimeLiveArrivals",
          "type": "boolean",
          "required": false,
          "description": "A boolean to indicate if we want to receive real time live arrivals data where available."
        },
        {
          "name": "calcOneDirection",
          "type": "boolean",
          "required": false,
          "description": "A boolean to make Journey Planner calculate journeys in one temporal direction only. In other words, only calculate journeys after the 'depart' time, or before the 'arrive' time. By default, the Journey Planner engine (EFA) calculates journeys in both temporal directions."
        },
        {
          "name": "includeAlternativeRoutes",
          "type": "boolean",
          "required": false,
          "description": "A boolean to make Journey Planner return alternative routes. Alternative routes are calculated by removing one or more lines included in the fastest route and re-calculating. By default, these journeys will not be returned."
        },
        {
          "name": "overrideMultiModalScenario",
          "type": "number",
          "required": false,
          "description": "An optional integer to indicate what multi modal scenario we want to use."
        },
        {
          "name": "combineTransferLegs",
          "type": "boolean",
          "required": false,
          "description": "A boolean to indicate whether walking leg to station entrance and walking leg from station entrance to platform should be combined. Defaults to true"
        }
      ],
      "returnType": "ItineraryResult",
      "deprecated": false,
      "tags": [
        "Journey"
      ]
    }
  ],
  "totalEndpoints": 1,
  "generatedAt": "2025-06-19T16:03:07.560Z"
} as const;

export type JOURNEY_DATAType = typeof JOURNEY_DATA;
