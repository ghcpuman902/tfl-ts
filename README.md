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

see the [playgorund/demo folder](playground/demo) for complete set of examples for each endpoint.

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

Please see the [playgorund/demo folder](playground/demo) for complete set of examples for each endpoint.


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