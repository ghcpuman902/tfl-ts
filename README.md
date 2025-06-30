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

Example: get arrivals for a specific tube station

```typescript
// playground/demo.ts
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
    at Module.m._compile (/Users/manglekuo/dev/nextjs/tfl-ts/node_modules/.pnpm/ts-node@10.9.2_@types+node@20.17.19_typescript@5.7.3/node_modules/ts-node/src/index.ts:1618:23)
    at node:internal/modules/cjs/loader:1824:10
    at Object.require.extensions.<computed> [as .ts] (/Users/manglekuo/dev/nextjs/tfl-ts/node_modules/.pnpm/ts-node@10.9.2_@types+node@20.17.19_typescript@5.7.3/node_modules/ts-node/src/index.ts:1621:12)
    at Module.load (node:internal/modules/cjs/loader:1427:32)
    at Module._load (node:internal/modules/cjs/loader:1250:12)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
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
// Get current air quality data
const airQuality = await client.airQuality.get();

// Get air quality forecast
const forecast = await client.airQuality.getForecast();

// console output:
// [PLACEHOLDER - Air quality measurements and forecast data]
```

### Get accident statistics
```typescript
// Get accident statistics for a specific year
const accidentStats = await client.accidentStats.get({
  year: 2023
});

// console output:
// [PLACEHOLDER - Accident statistics including severity, mode, and location data]
```

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
  categories: ['Place']
});

// Get place information
const placeInfo = await client.stopPoint.get({
  ids: ['940GZZLULNB']
});

// console output:
// [PLACEHOLDER - Place information including location, facilities, and accessibility]
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

## 🏗️ Contributing 

Help us develop and improve the client. We welcome contributions from the community! This is an open-source project.

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm
- TfL API credentials

### Setup

```bash
# Clone the repository
git clone https://github.com/ghcpuman902/tfl-ts.git
cd tfl-ts

# Install dependencies
pnpm install

# Set up environment variables
touch .env
# Edit .env with your TfL API credentials

# [Optional] Re-generate types from TfL API, only run if you think TFL api has changed
pnpm run generate

# Build the project
pnpm run build
```

### Available Scripts

```bash
# Development
pnpm run build        # Build the project (includes type generation)
pnpm run generate     # Generate types from TfL API
pnpm run playground   # Run interactive playground
pnpm run demo         # Run demo.ts code to test the client

# Testing
pnpm run test         # Run tests
pnpm run test:watch   # Run tests in watch mode

# Code Quality
pnpm run lint         # Run ESLint
pnpm run format       # Format code with Prettier

```

### Project Structure

```
tfl-ts/
├── src/
│   ├── generated/     # Auto-generated types and constants
│   │   ├── jsdoc/     # Generated JSDoc documentation
│   │   ├── meta/      # Generated metadata (lines, modes, etc.)
│   │   └── tfl.ts     # Generated API types and client
│   ├── __tests__/     # Test files
│   ├── utils/         # Utility functions
│   └── *.ts          # Main SDK modules
├── playground/        # Interactive web playground
├── script/           # Type generation scripts
└── types/            # TypeScript type definitions
```

## 🔧 API Module Development Process

This project follows a specific development pattern where each API module in `/src` maps to a corresponding generated JSDoc file in `/src/generated/jsdoc/` without importing from it. Instead, we manually add the types and interfaces from `/src/generated/tfl.ts`.

### Development Pattern

1. **Read the JSDoc file** (`/src/generated/jsdoc/[ModuleName].ts`) to understand the API structure
2. **Extract types from tfl.ts** (`/src/generated/tfl.ts`) for the specific module
3. **Create/update the module** (`/src/[moduleName].ts`) with:
   - Static metadata properties
   - Interfaces and types (imported but extended from tfl.ts)
   - Class methods that wrap the generated API client
   - Comprehensive JSDoc documentation (feel free to use AI to generate)
   - Utility methods for common operations

### Completed Modules

| Module | Status | JSDoc Source | Key Features |
|--------|--------|--------------|--------------|
| `line.ts` | ✅ Complete | `Line.ts` | Line status, routes, disruptions |
| `stopPoint.ts` | ✅ Complete | `StopPoint.ts` | Stop info, arrivals, search |
| `accidentStats.ts` | ✅ Complete | `AccidentStats.ts` | Accident statistics |
| `airQuality.ts` | ✅ Complete | `AirQuality.ts` | Air quality data and forecasts |
| `bikePoint.ts` | ✅ Complete | `BikePoint.ts` | Bike point info and search |
| `cabwise.ts` | ✅ Complete | `Cabwise.ts` | Taxi/minicab search |

### AI assistance

- always check LLM output.
- you can use LLM to generate code and commit but not PR.
- always use this file [README.md](README.md) and the file [LLM_context.md](LLM_context.md) as a reference.
- do not let LLM add new files except wrtting test and inside `utils/` folder.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests
4. **Run tests**: `pnpm test`
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Code Style

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Run `pnpm lint` and `pnpm format` before committing

## 📊 Status

> **🔄 TODO: Add badges for build status, test coverage, etc.**

| Feature | Status | Notes |
|---------|--------|-------|
| Core Client | ✅ Complete | Full TypeScript client |
| Type Generation | ✅ Complete | Automated from TfL API |
| Test Coverage | ✅ Complete | Comprehensive test suite |
| Playground | ✅ Complete | Interactive web interface |
| Documentation | ✅ Complete | Full API documentation |
| Edge Runtime | ✅ Complete | Compatible with edge environments |

## 📚 API Reference

### Core Classes

- `TflClient` - Main client class for all API operations
- `LineApi` - Line and route information
- `StopPointApi` - Stop point and arrival information  
- `JourneyApi` - Journey planning
- `RoadApi` - Road traffic information
- `ModeApi` - Transport mode information

### Key Methods

#### Line API
- `get(options?)` - Get line information
- `getStatus(options?)` - Get line status and disruptions
- `getRoute(options)` - Get route details

#### Stop Point API
- `get(options)` - Get stop point information
- `getArrivals(options)` - Get arrivals for a stop
- `search(options)` - Search for stops

#### Journey API
- `get(options)` - Plan a journey
- `getMeta()` - Get journey meta information

## 🐛 Troubleshooting

### Common Issues

**"Invalid API credentials"**
- Ensure your `TFL_APP_ID` and `TFL_APP_KEY` are correct
- Check that your API key is active in the TfL portal

**"Type generation failed"**
- Verify you have network access to the TfL API
- Check that your API credentials have sufficient permissions

**"Playground not loading"**
- Ensure you've run `pnpm generate-api-client` first
- Check that your `.env` file is properly configured

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Transport for London](https://tfl.gov.uk/) for providing the public API
- [swagger-typescript-api](https://github.com/acacode/swagger-typescript-api) for type generation
- All contributors and users of this client
- The London developer community for feedback and support

## 📞 Support & Community

- 📧 **Email**: [manglekuo@gmail.com](mailto:manglekuo@gmail.com)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/ghcpuman902/tfl-ts/discussions)
- 🐛 **Issues**: [GitHub Issues](https://github.com/ghcpuman902/tfl-ts/issues)

---

<div align="center">

**Built with ❤️ by the London developer community**

[![GitHub stars](https://img.shields.io/github/stars/ghcpuman902/tfl-ts?style=social)](https://github.com/ghcpuman902/tfl-ts)
[![GitHub forks](https://img.shields.io/github/forks/ghcpuman902/tfl-ts?style=social)](https://github.com/ghcpuman902/tfl-ts)
[![GitHub issues](https://img.shields.io/github/issues/ghcpuman902/tfl-ts)](https://github.com/ghcpuman902/tfl-ts/issues)

</div>