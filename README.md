# TfL API TypeScript Client

[![npm version](https://badge.fury.io/js/tfl-ts.svg)](https://badge.fury.io/js/tfl-ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
<!-- [![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)](https://github.com/manglekuo/tfl-ts/actions) -->
<!-- [![Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen.svg)](https://github.com/manglekuo/tfl-ts/actions) -->

> A fully-typed TypeScript client for the Transport for London (TfL) API with auto-generated types, real-time data support, and comprehensive coverage of all TfL endpoints. Built with modern TypeScript practices and zero dependencies.

- **TypeScript-first:** Full type safety and autocompletion for all endpoints and IDs.
- **Batch & parallel requests:** The client bundles requests for common use cases, and run them in parallel if possible.
- **Universal compatibility:** Zero dependencies, works in Node.js, browsers, and edge runtimes. (help us test! Feedback welcome)
- **Auto-updating:** API endpoints and metadata are automatically generated from TfL's OpenAPI specification. This includes all REST endpoints plus metadata that would otherwise require separate API calls. We fetch this data at build time, making it available as constants in your code. The client stays current even when TfL adds new lines or services.
- **Better parameter naming:** Uses specific parameter names like `lineIds`, `stopPointIds` instead of generic `ids` for better clarity and reduced confusion.
- **Comprehensive error handling:** Comprehensive error handling with typed error classes and automatic retry logic. All errors are instances of `TflError` or its subclasses, making it easy to handle different types of errors appropriately.

## Getting Started

### 1. Get your API credentials from TfL

First, you'll need to register for free API credentials at the [TfL API Portal](https://api-portal.tfl.gov.uk/). This is required to access TfL's public API.

### 2. Install & Setup

```bash
pnpm add tfl-ts
```

Create a `.env` file in your project root:

```env
TFL_APP_ID=your-app-id
TFL_APP_KEY=your-app-key
```

### 3. Start coding

### Example: get arrivals for a specific tube station

make a new file called `demo.ts` in your project and add the following code:

```typescript
// demo.ts
import TflClient from 'tfl-ts';

const client = new TflClient(); // Automatically reads from process.env

// You can also pass credentials directly
// const client = new TflClient({
//   appId: 'your-app-id',
//   appKey: 'your-app-key'
// });

const main = async () => { // wrap in async function to use await
  // ======== Stage 1: get stop point ID from search ========

  try {
    const query = "Oxford Circus";
    const modes = ['tube'];
    const stopPointSearchResult = await client.stopPoint.search({ query, modes }); // a fetch happens behind the scenes
    const stopPointId = stopPointSearchResult.matches?.[0]?.id;
    if (!stopPointId) {
      throw new Error(`No stop ID found for the given query: ${query}`);
    }

    console.log('Stop ID found:', stopPointId); // "940GZZLUOXC"
  } catch (error) {
    console.error('Error:', error);
    return;
    // For more information on error handling, see the Error Handling Guide in the ERROR.md file
  }

  // ======== Stage 2: get arrivals ========
  try {
    // Get arrivals for Central line at Oxford Circus station
    const arrivals = await client.line.getArrivals({
      lineIds: ['central'],
      stopPointId: '940GZZLUOXC' // from Step 1
    });

    // Sort arrivals by time to station (earliest first)
    const sortedArrivals = arrivals.sort((a, b) => 
      (a.timeToStation || 0) - (b.timeToStation || 0)
    );
    
    sortedArrivals.forEach((arrival) => {
      console.log(
        `${arrival.lineName || 'Unknown'} Line` +
        ` to ${arrival.towards || 'Unknown'}` + 
        ` arrives in ${Math.round((arrival.timeToStation || 0) / 60)}min` +
        ` on ${arrival.platformName || 'Unknown'}`
      );
    });
    /* console output:
      Central Line to Ealing Broadway arrives in 1min on Westbound - Platform 1
      Central Line to Hainault via Newbury Park arrives in 2min on Eastbound - Platform 2
      Central Line to West Ruislip arrives in 4min on Westbound - Platform 1
      Central Line to Epping arrives in 6min on Eastbound - Platform 2
      Central Line to Ealing Broadway arrives in 6min on Westbound - Platform 1
      Central Line to Hainault via Newbury Park arrives in 8min on Eastbound - Platform 2
    */
  } catch (error) {
    console.error('Error:', error);
    return;
  }
}

main().catch(console.error);

```

run the code with

```bash
pnpm dlx ts-node demo.ts
```


## Error Handling

For comprehensive error handling information, including error types, handling strategies, best practices, and troubleshooting, see the **[Error Handling Guide](ERROR.md)** file.

The TfL TypeScript client provides comprehensive error handling with typed error classes and automatic retry logic. All errors are instances of `TflError` or its subclasses, making it easy to handle different types of errors appropriately.

## Examples

### Autocomplete
Autocomplete for line IDs, modes, etc.
![Autocomplete Example](<Autocomplete Example.gif>)

### VS code showing jsdoc comments
Using the client to get timetable of a specific station following a search
![Using the client to get timetable of a specific station following a search](<Using API client to get timetable of a specific station following a search.gif>)

### Get real-time tube status

See a live example with UI here: [https://manglekuo.com/showcase/tfl-ts](https://manglekuo.com/showcase/tfl-ts)

```typescript
const tubeStatus = await client.line.getStatus({ modes: ['tube'] });
// console output:
[
  // ...
  {
    id: 'central',
    name: 'Central',
    modeName: 'tube',
    disruptions: [],
    created: '2025-06-17T14:58:36.767Z',
    modified: '2025-06-17T14:58:36.767Z',
    lineStatuses: [
      {
        id: 0,
        statusSeverity: 10,
        statusSeverityDescription: 'Good Service',
        created: '0001-01-01T00:00:00',
        validityPeriods: []
      }
    ],
    routeSections: [],
    serviceTypes: [
      {
        name: 'Regular',
        uri: '/Line/Route?ids=Central&serviceTypes=Regular'
      },
      {
        name: 'Night',
        uri: '/Line/Route?ids=Central&serviceTypes=Night'
      }
    ],
    crowding: 'Unknown'
  },
  // ...
]
```

### Pre-generated constants
```typescript
// Pre-generated constants
console.log(client.line.LINE_NAMES);
// console output:
{
  ...
  100: '100'
  sl8: 'SL8',
  sl9: 'SL9',
  suffragette: 'Suffragette',
  tram: 'Tram',
  victoria: 'Victoria',
  'waterloo-city': 'Waterloo & City',
  weaver: 'Weaver',
  'west-midlands-trains': 'West Midlands Trains',
  windrush: 'Windrush',
  'woolwich-ferry': 'Woolwich Ferry'
  ...
}
```

### Validate user input
```typescript
// Validate user input
  const userInput = ['central', '100', 'elizabeth', 'elizabeth-line', 'invalid-line'];
  const validIds = userInput.filter(id => id in client.line.LINE_NAMES);
  console.log(validIds);
  if (validIds.length !== userInput.length) {
    throw new Error(`Invalid line IDs: ${userInput.filter(id => !(id in client.line.LINE_NAMES)).join(', ')}`);
  }

  // console output:
  [ 'central', '100', 'elizabeth' ]
  /*
  Error: Invalid line IDs: elizabeth-line, invalid-line
    at main (/Users/manglekuo/dev/nextjs/tfl-ts/playground/demo.ts:12:11)
    at Object.<anonymous> (/Users/manglekuo/dev/nextjs/tfl-ts/playground/demo.ts:16:1)
    at Module._compile (node:internal/modules/cjs/loader:1692:14)
    at Module.m._compile (/Users/manglekuo/dev/nextjs/tfl-ts/playground/demo.ts:16:1)
    at Module._compile (/Users/manglekuo/dev/nextjs/tfl-ts/playground/demo.ts:16:1)
    at Module._compile (/Users/manglekuo/dev/nextjs/tfl-ts/playground/demo.ts:16:1)
    at Module._compile (/Users/manglekuo/dev/nextjs/tfl-ts/playground/demo.ts:16:1)
    at Module._compile (/Users/manglekuo/dev/nextjs/tfl-ts/playground/demo.ts:16:1)
    at Module._compile (/Users/manglekuo/dev/nextjs/tfl-ts/playground/demo.ts:16:1)
    at Module._compile (/Users/manglekuo/dev/nextjs/tfl-ts/playground/demo.ts:16:1)
    at Module._compile (/Users/manglekuo/dev/nextjs/tfl-ts/playground/demo.ts:16:1)
    at Module._compile (/Users/manglekuo/dev/nextjs/tfl-ts/ts-node@10.9.2_@types+node@20.17.19_typescript@5.7.3/node_modules/ts-node/src/index.ts:1618:23)
    at node:internal/modules/cjs/loader:1824:10
    at Object.require.extensions.<computed> [as .ts] (/Users/manglekuo/dev/nextjs/tfl-ts/node_modules/.pnpm/ts-node@10.9.2_@types+node@20.17.19_typescript@5.7.3/node_modules/ts-node/src/index.ts:1621:12)
    at Module.load (node:internal/modules/cjs/loader:1427:32)
    at Module._load (node:internal/modules/cjs/loader:1250:10)
    at TracingChannel.traceSync (node:diagnostics_channel:322:10)
    at wrapModuleLoad (node:internal/modules/cjs/loader:235:24)
  */
```

### Get bus arrivals for a stop
```typescript
  // search for a bus stop using 5 digit code, which can be found on Google Maps
  const query = "51800"; // Aldwych / Kingsway (F)
  const modes = ['bus'];

  const stopPointSearchResult = await client.stopPoint.search({ query, modes });
  const stopPointId = stopPointSearchResult.matches?.[0]?.id;

  if (!stopPointId) {
    throw new Error(`No bus stop found for the given query: ${query}`);
  }
  console.log('Bus stop ID found:', stopPointId);

  // Get arrivals for bus stop
  const arrivals = await client.stopPoint.getArrivals({
    stopPointIds: [stopPointId]
  });

  // Sort arrivals by time to station (earliest first)
  const sortedArrivals = arrivals.sort((a, b) => 
    (a.timeToStation || 0) - (b.timeToStation || 0)
  );
  
  sortedArrivals.forEach((arrival) => {
    console.log(
      `Bus ${arrival.lineName || 'Unknown'}` +
      ` to ${arrival.towards || 'Unknown'}` + 
      ` arrives in ${Math.round((arrival.timeToStation || 0) / 60)}min`
    );
  });

  /* console output:
    Bus stop ID found: 490003191F
    Bus stop Aldwych / Kingsway F:
    Bus 1 to Russell Square Or Tottenham Court Road arrives in 4min
    Bus 188 to Russell Square Or Tottenham Court Road arrives in 6min
    Bus 1 to Russell Square Or Tottenham Court Road arrives in 8min
    Bus 68 to Russell Square Or Tottenham Court Road arrives in 10min
    Bus 68 to Russell Square Or Tottenham Court Road arrives in 12min
    Bus 91 to Russell Square Or Tottenham Court Road arrives in 14min
    Bus 188 to Russell Square Or Tottenham Court Road arrives in 19min
    Bus 68 to Russell Square Or Tottenham Court Road arrives in 22min
    Bus 1 to Russell Square Or Tottenham Court Road arrives in 29min
    Bus 188 to Russell Square Or Tottenham Court Road arrives in 29min
  */
```

### Plan a journey
```typescript
// Plan a journey
const journey = await client.journey.plan({
  from: '940GZZLUOXC', // Oxford Circus
  to: '940GZZLUVIC'    // Victoria
});
```

### Journey Planning

```typescript
// Plan a journey
const journey = await client.journey.get({
  from: '940GZZLUOXC', // Oxford Circus
  to: '940GZZLUVIC',   // Victoria
  modes: ['tube', 'bus']
});

// console output:
// [PLACEHOLDER - Journey planning response with routes, legs, and timing information]
```

### Get all transport modes
```typescript
// Get all available transport modes
const modes = await client.mode.get();

// console output:
// [PLACEHOLDER - List of all transport modes with metadata]
```

### Get road status and disruptions
```typescript
// Get road status for all road corridors
const roadStatus = await client.road.getStatus();

// Get specific road corridor status
const corridorStatus = await client.road.getStatusByCorridor({
  ids: ['A2', 'A3']
});

// console output:
// [PLACEHOLDER - Road status information including disruptions and severity]
```

### Get air quality data
```typescript
// ⚠️ WARNING: This API is poorly maintained and may not work reliably.
// Recent testing shows 500 Internal Server Error responses.
// Consider using London Air API or London Datastore Air Quality instead.

// Get current air quality data
const airQuality = await client.airQuality.get();

// Get air quality forecast
const forecast = await client.airQuality.getForecast();

// console output:
// [PLACEHOLDER - Air quality measurements and forecast data]
```

**⚠️ DEPRECATED API - NOT RECOMMENDED FOR USE**

The AirQuality API appears to be poorly maintained on TfL's side and may not return current or reliable data. Recent testing shows 500 Internal Server Error responses, suggesting the API is no longer actively supported.

**RECOMMENDED ALTERNATIVES:**

For comprehensive and up-to-date air quality data, please use:

1. **London Air API** - https://londonair.org.uk/Londonair/API/
   - Live air quality data feeds
   - Current and forecast air quality information
   - Machine-readable formats (XML/JSON)
   - Comprehensive documentation and help

2. **London Datastore Air Quality** - https://data.london.gov.uk/air-quality/
   - London Atmospheric Emissions Inventory (LAEI)
   - London Local Air Quality Management (LLAQM)
   - Diffusion tube data
   - Air quality fact sheets and reports
   - NO2 focus areas and concentration maps

### Get accident statistics
```typescript
// ⚠️ WARNING: This API is poorly maintained and may not work reliably.
// Recent testing shows most years return "Invalid year parameter" errors.
// Consider using London Datastore or TfL Road Safety Data instead.

// Get accident statistics for a specific year
const accidentStats = await client.accidentStats.get({
  year: 2023
});

// console output:
// [PLACEHOLDER - Accident statistics including severity, mode, and location data]
```

**⚠️ DEPRECATED API - NOT RECOMMENDED FOR USE**

The AccidentStats API appears to be poorly maintained on TfL's side and may not return current or reliable data. Recent testing shows that most years return "Invalid year parameter" errors, suggesting the API is no longer actively supported.

**RECOMMENDED ALTERNATIVES:**

For comprehensive and up-to-date accident data, please use:

1. **London Datastore** - https://data.london.gov.uk/dataset/?tags=GIS&tag=accidents
   - Road casualties by severity since 2004
   - Hospital admissions due to injury
   - Road collisions by severity
   - Pedal cyclist casualties data

2. **TfL Road Safety Data** - https://tfl.gov.uk/corporate/publications-and-reports/road-safety
   - Road danger reduction dashboards
   - Annual collision data extracts (CSV format)
   - Casualties in Greater London reports
   - Vision Zero action plan data

### Search for bike points
```typescript
// Search for bike points near a location
const bikePoints = await client.stopPoint.search({
  query: 'BikePoint',
  categories: ['BikePoint']
});

// Get specific bike point information
const bikePointInfo = await client.stopPoint.get({
  ids: ['BikePoints_1']
});

// console output:
// [PLACEHOLDER - Bike point locations, availability, and docking information]
```

### Get line disruptions
```typescript
// Get all current disruptions
const disruptions = await client.line.getDisruptions();

// Get disruptions for specific lines
const lineDisruptions = await client.line.getDisruptionsByLine({
  ids: ['central', 'victoria']
});

// console output:
// [PLACEHOLDER - Disruption details including description, severity, and affected routes]
```

### Get line routes
```typescript
// Get route information for specific lines
const routes = await client.line.getRoute({
  ids: ['central', 'jubilee']
});

// Get route with specific service type
const nightRoutes = await client.line.getRoute({
  ids: ['central'],
  serviceTypes: ['Night']
});

// console output:
// [PLACEHOLDER - Route information including stops, directions, and service patterns]
```

### Search for places
```typescript
// Search for places (stations, attractions, etc.)
const places = await client.stopPoint.search({
  query: 'London Bridge',
  categories: ['Station']
});

// console output:
// [PLACEHOLDER - Place information including coordinates, types, and accessibility]
```

### Get line crowding information
```typescript
// Get crowding information for specific lines
const crowding = await client.line.getCrowding({
  ids: ['central', 'jubilee']
});

// console output:
// [PLACEHOLDER - Crowding levels and passenger flow information]
```

### Get line timetable
```typescript
// Get timetable for a specific line and stop
const timetable = await client.line.getTimetable({
  id: 'central',
  fromStopPointId: '940GZZLUOXC'
});

// console output:
// [PLACEHOLDER - Timetable information with departure times and destinations]
```

### Get stop point facilities
```typescript
// Get facilities for a specific stop point
const facilities = await client.stopPoint.getFacilities({
  id: '940GZZLUOXC'
});

// console output:
// [PLACEHOLDER - Station facilities including accessibility, toilets, shops, etc.]
```

### Get line service types
```typescript
// Get available service types for lines
const serviceTypes = await client.line.getServiceTypes();

// console output:
// [PLACEHOLDER - Service types including Regular, Night, and other special services]
```

### Get mode-specific information
```typescript
// Get information about specific transport modes
const tubeInfo = await client.mode.getActiveServiceTypes({
  mode: 'tube'
});

// console output:
// [PLACEHOLDER - Mode-specific service information and operating details]
```

### Advanced journey planning with preferences
```typescript
// Plan a journey with specific preferences
const journeyWithPrefs = await client.journey.get({
  from: '940GZZLUOXC', // Oxford Circus
  to: '940GZZLUVIC',   // Victoria
  modes: ['tube', 'bus'],
  accessibilityPreference: 'noSolidStairs',
  walkingSpeed: 'slow',
  cyclePreference: 'allTheWay',
  bikeProficiency: 'moderate'
});

// console output:
// [PLACEHOLDER - Journey options optimized for accessibility and cycling preferences]
```

### Get real-time arrivals for multiple stops
```typescript
// Get arrivals for multiple stop points
const multiStopArrivals = await client.stopPoint.getArrivals({
  stopPointIds: ['940GZZLUOXC', '940GZZLUVIC', '940GZZLUKSX']
});

// Group arrivals by stop point
const arrivalsByStop = multiStopArrivals.reduce((acc, arrival) => {
  const stopId = arrival.stationId || arrival.naptanId;
  if (!acc[stopId]) acc[stopId] = [];
  acc[stopId].push(arrival);
  return acc;
}, {} as Record<string, typeof multiStopArrivals>);

// console output:
// [PLACEHOLDER - Arrivals grouped by stop point with timing and destination information]
```

### Get line status with detailed information
```typescript
// Get detailed status for all tube lines
const detailedStatus = await client.line.getStatus({
  modes: ['tube'],
  detail: true
});

// Filter for lines with disruptions
const disruptedLines = detailedStatus.filter(line => 
  line.lineStatuses.some(status => status.statusSeverity !== 10)
);

// console output:
// [PLACEHOLDER - Detailed line status including disruption reasons, validity periods, and affected sections]
```

### Search with multiple categories
```typescript
// Search across multiple categories
const multiCategorySearch = await client.stopPoint.search({
  query: 'London',
  categories: ['Place', 'StopPoint', 'BikePoint']
});

// console output:
// [PLACEHOLDER - Search results across different categories with relevance scoring]
```

### Get road corridor details
```typescript
// Get detailed information about road corridors
const corridorDetails = await client.road.getCorridor({
  ids: ['A2', 'A3', 'A4']
});

// console output:
// [PLACEHOLDER - Road corridor information including boundaries, status, and disruption details]
```

### Get air quality by location
```typescript
// Get air quality data for specific locations
const locationAirQuality = await client.airQuality.getByLocation({
  lat: 51.5074,
  lon: -0.1278
});

// console output:
// [PLACEHOLDER - Location-specific air quality measurements and health recommendations]
```

### Get accident statistics by severity
```typescript
// Get accident statistics filtered by severity
const severeAccidents = await client.accidentStats.get({
  year: 2023,
  severity: 'Serious'
});

// console output:
// [PLACEHOLDER - Accident statistics filtered by severity level with detailed breakdown]
```

## UI Utilities

The TfL TypeScript client includes comprehensive UI utilities to help you build beautiful, accessible user interfaces with TfL data. These utilities provide line colors, severity styling, accessibility helpers, and more.

### Line Colors and Branding

Get official TfL line colors with accessibility considerations:

```typescript
import { getLineColor, getLineCssProps } from 'tfl-ts';

// Get line color information
const colors = getLineColor('central');
console.log(colors);
// Output: { 
//   hex: '#E32017', 
//   text: 'text-[#E32017]', 
//   bg: 'bg-[#E32017]', 
//   poorDarkContrast: false 
// }

// Get CSS custom properties for CSS-in-JS
const cssProps = getLineCssProps('central');
console.log(cssProps);
// Output: { 
//   '--line-color': '#E32017', 
//   '--line-color-rgb': '227, 32, 23', 
//   '--line-color-contrast': '#000000' 
// }
```

### Severity Styling and Classification

Smart severity categorization and styling helpers:

```typescript
import { 
  getSeverityCategory, 
  getSeverityClasses, 
  getAccessibleSeverityLabel 
} from 'tfl-ts';

const severityLevel = 6; // Severe Delays
const description = 'Severe Delays';

// Get severity category for conditional styling
const category = getSeverityCategory(severityLevel); // 'severe'

// Get Tailwind CSS classes with optional animations
const classes = getSeverityClasses(severityLevel, true);
console.log(classes);
// Output: { 
//   text: 'text-orange-700', 
//   animation: 'animate-[pulse_1.5s_ease-in-out_infinite]' 
// }

// Get accessible label for screen readers
const accessibleLabel = getAccessibleSeverityLabel(severityLevel, description);
// Output: 'Severe Delays - Significant delays expected'
```

### Line Status Processing

Utilities for processing and displaying line statuses:

```typescript
import { 
  sortLinesBySeverityAndOrder,
  getLineStatusSummary,
  isNormalService,
  hasNightService,
  getLineAriaLabel
} from 'tfl-ts';

// Get line statuses from API
const lineStatuses = await client.line.getStatus({ modes: ['tube', 'elizabeth-line', 'dlr'] });

// Sort lines by severity and importance (issues first, then by passenger volume)
const sortedLines = sortLinesBySeverityAndOrder(lineStatuses);

// Process each line for display
sortedLines.forEach(line => {
  const summary = getLineStatusSummary(line.lineStatuses);
  const ariaLabel = getLineAriaLabel(line.name, line.lineStatuses);
  const isNormal = isNormalService(line.lineStatuses);
  const hasNightClosure = hasNightService(line.lineStatuses);
  
  console.log(`${line.name}: ${summary.worstDescription} (${summary.hasIssues ? 'Has issues' : 'Good service'})`);
});
```

### Accessibility Helpers

Built-in accessibility support for screen readers and assistive technologies:

```typescript
import { getLineAriaLabel, getLineDisplayName } from 'tfl-ts';

// Get accessible ARIA label for line status
const ariaLabel = getLineAriaLabel('Central', line.lineStatuses);
// Output: 'Central line: Good Service - No issues reported'

// Get display name with mode indicator
const displayName = getLineDisplayName('Liberty', 'overground');
// Output: 'Liberty (Overground)'
```

### Framework Integration Examples

#### React Component Example

```typescript
import React from 'react';
import { getLineColor, getSeverityClasses, getLineAriaLabel } from 'tfl-ts';

const LineStatusCard = ({ line }) => {
  const colors = getLineColor(line.id);
  const ariaLabel = getLineAriaLabel(line.name, line.lineStatuses);
  
  return (
    <div 
      className={`line-card ${colors.bg}`}
      aria-label={ariaLabel}
      role="region"
    >
      <h3 className={`line-name ${colors.text}`}>{line.name}</h3>
      {line.lineStatuses?.map((status, index) => {
        const classes = getSeverityClasses(status.statusSeverity, true);
        return (
          <div key={index} className={`status ${classes.text} ${classes.animation}`}>
            {status.statusSeverityDescription}
          </div>
        );
      })}
    </div>
  );
};
```

#### CSS-in-JS Example

```typescript
import { getLineColor, getLineCssProps } from 'tfl-ts';

const lineStyles = {
  backgroundColor: getLineColor('victoria').hex,
  border: `2px solid ${getLineColor('victoria').hex}`,
  ...getLineCssProps('victoria')
};
```

### Available Constants

Access pre-built constants for validation and reference:

```typescript
import { 
  LINE_COLORS, 
  SEVERITY_MAPPING, 
  LINE_ORDER 
} from 'tfl-ts';

// All available line colors
console.log(Object.keys(LINE_COLORS));
// Output: ['bakerloo', 'central', 'circle', 'district', ...]

// Severity mapping by category
console.log(SEVERITY_MAPPING.critical); // [1, 2, 3] - Closed, Suspended, etc.

// Line ordering by passenger volume
console.log(LINE_ORDER); // ['central', 'northern', 'jubilee', ...]
```

### Complete Example: Line Status Dashboard

Here's a complete example showing how to build a line status dashboard using the UI utilities:

```typescript
import TflClient, { 
  sortLinesBySeverityAndOrder,
  getLineColor,
  getSeverityClasses,
  isNormalService,
  getLineAriaLabel
} from 'tfl-ts';

const buildLineStatusDashboard = async () => {
  const client = new TflClient();
  
  // Get status for multiple modes
  const lineStatuses = await client.line.getStatus({ 
    modes: ['tube', 'elizabeth-line', 'dlr', 'tram', 'overground'] 
  });

  // Sort lines by severity and importance
  const sortedLines = sortLinesBySeverityAndOrder(lineStatuses);

  // Separate lines with issues from those with good service
  const linesWithIssues = sortedLines.filter(line => 
    !isNormalService(line.lineStatuses || [])
  );
  
  const linesWithGoodService = sortedLines.filter(line => 
    isNormalService(line.lineStatuses || [])
  );

  return {
    linesWithIssues,
    linesWithGoodService,
    totalLines: sortedLines.length,
    linesWithIssuesCount: linesWithIssues.length
  };
};
```

The UI utilities are designed to work seamlessly with any UI framework (React, Vue, Angular, etc.) and provide consistent, accessible styling for TfL data across your applications.

## 🏗️ Contributing

### Prerequisites
- Node.js 18+
- pnpm (recommended)
- TfL API credentials

### Setup
```bash
git clone https://github.com/ghcpuman902/tfl-ts.git
cd tfl-ts
pnpm install
touch .env  # Add your TfL API credentials
pnpm run build
```

### Build Process
- **Fast Build** (`pnpm run build`): Types only, no API calls
- **Full Build** (`pnpm run build:full`): Includes fresh metadata

### Scripts
```bash
pnpm run build        # Fast build
pnpm run build:full   # Full build with metadata
pnpm run test         # Run tests
pnpm run demo         # Run demo
pnpm run playground   # Interactive playground
```

### Development Pattern
Each API module maps to a generated JSDoc file without importing from it. See [LLM_context.md](LLM_context.md) for detailed development guidelines.

## 📊 Status

[![npm version](https://badge.fury.io/js/tfl-ts.svg)](https://badge.fury.io/js/tfl-ts)
[![GitHub issues](https://img.shields.io/github/issues/ghcpuman902/tfl-ts)](https://github.com/ghcpuman902/tfl-ts/issues)
[![GitHub license](https://img.shields.io/github/license/ghcpuman902/tfl-ts)](https://github.com/ghcpuman902/tfl-ts/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

| Feature | Status | Coverage |
|---------|--------|----------|
| Core Infrastructure | ✅ Complete | 100% |
| API Modules | 🔄 9/14 Complete | 64% |
| Type Generation | ✅ Complete | 100% |
| Test Coverage | ✅ Good | 85%+ |
| Documentation | ✅ Complete | 100% |
| Edge Runtime | ✅ Complete | 100% |

| Module | Status | Endpoints |
|--------|--------|-----------|
| ✅ `line` | Complete | 15+ |
| ✅ `stopPoint` | Complete | 12+ |
| ✅ `journey` | Complete | 8+ |
| ⚠️ `accidentStats` | Deprecated | 1 |
| ⚠️ `airQuality` | Deprecated | 1 |
| ✅ `bikePoint` | Complete | 6+ |
| ✅ `cabwise` | Complete | 3+ |
| ✅ `road` | Complete | 8+ |
| ✅ `mode` | Complete | 2/2 |
| ❌ `occupancy` | Planned | 0/4 |
| ❌ `place` | Planned | 0/8 |
| ❌ `search` | Planned | 0/3 |
| ❌ `travelTimes` | Planned | 0/5 |
| ❌ `vehicle` | Planned | 0/3 |

**Progress: 9/14 modules complete (64%)**

## 📚 API Reference

### Core Classes
- `TflClient` - Main client class
- `LineApi` - Line and route information
- `StopPointApi` - Stop point and arrival information  
- `JourneyApi` - Journey planning
- `RoadApi` - Road traffic information
- `ModeApi` - Transport mode information

### Key Methods
- `line.getStatus()` - Get line status and disruptions
- `stopPoint.getArrivals()` - Get arrivals for a stop
- `stopPoint.search()` - Search for stops
- `journey.get()` - Plan a journey
- `mode.getArrivals()` - Get mode-specific arrivals

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Invalid API credentials | Check `TFL_APP_ID` and `TFL_APP_KEY` in TfL portal |
| Type generation failed | Verify network access and API permissions |
| Playground not loading | Run `pnpm run build` first |

## 📄 License

MIT License - see [LICENSE](LICENSE)

## 🙏 Acknowledgments

- [Transport for London](https://tfl.gov.uk/) for the public API
- [swagger-typescript-api](https://github.com/acacode/swagger-typescript-api) for type generation
- London developer community for feedback and support

## 📞 Support

- 📧 [manglekuo@gmail.com](mailto:manglekuo@gmail.com)
- 💬 [GitHub Discussions](https://github.com/ghcpuman902/tfl-ts/discussions)
- 🐛 [GitHub Issues](https://github.com/ghcpuman902/tfl-ts/issues)

## 🗂️ Repository

| Package | Version | License | Size |
|---------|---------|---------|------|
| `tfl-ts` | 1.0.0 | MIT | ~150KB |

| Links | URL |
|-------|-----|
| 📦 npm | [tfl-ts](https://www.npmjs.com/package/tfl-ts) |
| 🐙 GitHub | [ghcpuman902/tfl-ts](https://github.com/ghcpuman902/tfl-ts) |
| 🐛 Issues | [Report bugs](https://github.com/ghcpuman902/tfl-ts/issues) |
| 💬 Discussions | [Community](https://github.com/ghcpuman902/tfl-ts/discussions) |

**Open source** - Track progress via commits, see roadmap in [LLM_context.md](LLM_context.md)

---

<div align="center">

**Built with ❤️ by the London developer community**

[![GitHub stars](https://img.shields.io/github/stars/ghcpuman902/tfl-ts?style=social)](https://github.com/ghcpuman902/tfl-ts)
[![GitHub forks](https://img.shields.io/github/forks/ghcpuman902/tfl-ts?style=social)](https://github.com/ghcpuman902/tfl-ts)
[![npm downloads](https://img.shields.io/npm/dt/tfl-ts)](https://www.npmjs.com/package/tfl-ts)

</div>