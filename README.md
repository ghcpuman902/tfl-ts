# TfL API TypeScript SDK

[![npm version](https://badge.fury.io/js/tfl-api-ts.svg)](https://badge.fury.io/js/tfl-api-ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
<!-- [![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)](https://github.com/manglekuo/tfl-api-ts/actions) -->
<!-- [![Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen.svg)](https://github.com/manglekuo/tfl-api-ts/actions) -->

> A community-driven TypeScript SDK that makes the Transport for London (TfL) API easy to use in Node.js and JavaScript environments. Built by developers, for developers.

## Getting Started

### 1. Get your API credentials from TfL

First, you'll need to register for free API credentials at the [TfL API Portal](https://api-portal.tfl.gov.uk/). This is required to access TfL's public API.

### 2. Install the package

```bash
pnpm add tfl-api-ts
```
or

```bash
npm i tfl-api-ts
```
### 3. Start coding
Create a `.env` file in your project root:

```env
TFL_APP_ID=your-app-id
TFL_APP_KEY=your-app-key
```

Create a TypeScript file:
```typescript
// playground/demo.ts
import TflClient from 'tfl-api-ts';

const client = new TflClient(); // Automatically reads appId and appKey from .env

// You can also pass credentials directly
// const client = new TflClient({
//   appId: 'your-app-id',
//   appKey: 'your-app-key'
// });


const main = async () => {
  const query = "Oxford Circus";
  const modes = ['tube'];

  const stopPointSearchResult = await client.stopPoint.search({ query, modes });
  const stopPointId = stopPointSearchResult.matches?.[0]?.id;
  console.log('Stop ID found:', stopPointId); // "940GZZLUOXC"

  if (!stopPointId) {
    throw new Error(`No stop ID found for the given query: ${query}`);
  }

  // Get arrivals for Central line at Oxford Circus station
  const arrivals = await client.line.getArrivals({
    ids: ['central'],
    stopPointId: stopPointId 
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
}

main().catch(console.error);

```

Run the file:
```bash
node-ts playground/demo.ts
```

## Goal + Highlights

![Using the SDK to get timetable of a specific station following a search](<Using API client to get timetable of a specific station following a search.gif>)

![Autocomplete Example](<Autocomplete Example.gif>)

- **TypeScript-first:** Full type safety and autocompletion for all endpoints and IDs.
- **Batch & parallel requests:** The SDK bundles requests for common use cases, and run them in parallel if possible.
- **Universal compatibility:** Works in Node.js, browsers, and edge runtimes. (help us test! Feedback welcome)
- **Auto-updating:** API endpoints and metadata are automatically generated from TfL's OpenAPI specification. This includes all REST endpoints plus metadata that would otherwise require separate API calls. We fetch this data at build time, making it available as constants in your code. The SDK stays current even when TfL adds new lines or services.

```typescript
// Get real-time tube status
const tubeStatus = await client.line.getStatus({ modes: ['tube'] });
```
Example output:
```json
[
  ...
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
  ...
]
```


```typescript
// Autocomplete for line IDs, modes, etc.
const lines = await client.line.get({ 
  ids: ['central', 'victoria'] // ✅ Autocomplete available, also type-safe so numbers won't be accepted
});

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

// Validate user input
const userInput = ['central', 'invalid-line'];
const validIds = userInput.filter(id => id in client.line.LINE_NAMES);
if (validIds.length !== userInput.length) {
  throw new Error(`Invalid line IDs: ${userInput.filter(id => !(id in client.line.LINE_NAMES)).join(', ')}`);
}

// Get bus arrivals for a stop
const arrivals = await client.stopPoint.getArrivals({
  id: '490000014N',
  lineIds: ['1', '2']
});

// Plan a journey
const journey = await client.journey.get({
  from: '940GZZLUOXC', // Oxford Circus
  to: '940GZZLUVIC'    // Victoria
});
```

> See the [Playground](#playground) or [API Reference](#api-reference) for more examples.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage Examples](#usage-examples)
- [API Reference](#api-reference)
- [TypeScript Support](#typescript-support)
- [Playground](#playground)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Quick Start

```typescript
import TflClient from 'tfl-api-ts';

// Initialize with your TfL API credentials
const client = new TflClient({
  appId: 'your-app-id',
  appKey: 'your-app-key'
});

// Get real-time tube status
const tubeStatus = await client.line.getStatus({ modes: ['tube'] });
console.log(tubeStatus);

// Get bus arrivals for a specific stop
const arrivals = await client.stopPoint.getArrivals({
  id: '490000014N',
  lineIds: ['1', '2']
});
console.log(arrivals);
```

## 📦 Installation

```bash
# Using npm
npm install tfl-api-ts

# Using yarn
yarn add tfl-api-ts

# Using pnpm
pnpm add tfl-api-ts
```

## 🎯 Usage Examples

### Basic Line Information

```typescript
import TflClient from 'tfl-api-ts';

const client = new TflClient({
  appId: process.env.TFL_APP_ID!,
  appKey: process.env.TFL_APP_KEY!
});

// Get all tube lines
const tubeLines = await client.line.get({ modes: ['tube'] });

// Get specific lines with full type safety
const specificLines = await client.line.get({ 
  ids: ['central', 'victoria', 'jubilee'] 
});

// Get line status with disruptions
const status = await client.line.getStatus({ 
  modes: ['tube', 'dlr'] 
});
```

### Stop Point Information

```typescript
// Get arrivals for a bus stop
const arrivals = await client.stopPoint.getArrivals({
  id: '490000014N',
  lineIds: ['1', '2', '3']
});

// Search for stops
const stops = await client.stopPoint.search({
  query: 'Oxford Circus',
  modes: ['tube', 'bus']
});

// Get stop information
const stopInfo = await client.stopPoint.get({ id: '940GZZLUOXC' });
```

### Journey Planning

```typescript
// Plan a journey
const journey = await client.journey.get({
  from: '940GZZLUOXC', // Oxford Circus
  to: '940GZZLUVIC',   // Victoria
  modes: ['tube', 'bus']
});

// Get journey meta information
const meta = await client.journey.getMeta();
```

## 🔧 TypeScript Support

The SDK provides complete TypeScript support with auto-generated types and flexible validation:

```typescript
import { TflLine, TflStopPoint, TflLineId, ModeName } from 'tfl-api-ts';

// All responses are properly typed
const lines: TflLine[] = await client.line.getStatus();

// TypeScript provides autocomplete for known values
const specificLines = await client.line.get({ 
  ids: ['central', 'victoria'] // ✅ Autocomplete available
});

// But you can also use custom strings when needed
const customModes = ['tube', 'custom-mode'];
const tubeLines = await client.line.get({ 
  modes: customModes // ✅ Flexible, but validate first!
});

// Validate user input before making API calls
const validateLineIds = (ids: string[]) => {
  const validIds = ids.filter(id => id in client.line.LINE_NAMES);
  if (validIds.length !== ids.length) {
    const invalidIds = ids.filter(id => !(id in client.line.LINE_NAMES));
    throw new Error(`Invalid line IDs: ${invalidIds.join(', ')}`);
  }
  return validIds;
};

// Access generated constants for validation
const lineName = client.line.LINE_NAMES['central']; // "Central"
const lineInfo = client.line.LINE_INFO['central']; // Full line information
const validModes = Object.keys(client.line.MODE_METADATA); // All valid modes
```

### Flexible Type Design

We believe in providing a great developer experience without TypeScript getting in your way:

- **Autocomplete available** for known values like line IDs and modes
- **Flexible types** that accept strings for custom scenarios
- **Validation helpers** to check inputs before making API calls
- **No strict enforcement** that blocks beginners from getting started

This approach lets you start quickly while still providing the tools to build robust applications.

## 🎮 Interactive Playground

> **🔄 TODO: Add online demo link and screenshot**

Explore the TfL API interactively with our web-based playground:

### Features
- 🔍 **Explore Transport Modes** - Browse all available transport modes
- 🚇 **View Routes** - See all routes/lines for each transport mode  
- 📊 **Route Details** - Get comprehensive information about specific routes
- 🎨 **Clean UI** - Modern, responsive interface

### Running Locally

```bash
# Clone and install
git clone https://github.com/manglekuo/tfl-api-ts.git
cd tfl-api-ts
pnpm install

# Set up credentials
echo "TFL_APP_ID=your-app-id" > .env
echo "TFL_APP_KEY=your-app-key" >> .env

# Generate types and start playground
pnpm generate-api-client
pnpm playground
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 API Credentials

This SDK requires free API credentials from TfL. Register at the [TfL API Portal](https://api-portal.tfl.gov.uk/) to get your `appId` and `appKey`.

### Environment Variables (Recommended)

Create a `.env` file in your project root:

```env
TFL_APP_ID=your-app-id
TFL_APP_KEY=your-app-key
```

### Direct Configuration

```typescript
const client = new TflClient({
  appId: 'your-app-id',
  appKey: 'your-app-key'
});
```

## 🏗️ Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- TfL API credentials

### Setup

```bash
# Clone the repository
git clone https://github.com/manglekuo/tfl-api-ts.git
cd tfl-api-ts

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your TfL API credentials

# Re-generate types from TfL API, only run if TFL api has changed
pnpm generate-api-client

# Build the project
pnpm build
```

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build the project
pnpm generate-api-client # Generate types from TfL API

# Testing
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
pnpm test:coverage # Run tests with coverage

# Code Quality
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm type-check   # Run TypeScript type checking

# Playground
pnpm playground   # Start the interactive playground
```

### Project Structure

```
tfl-api-ts/
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
   - Interfaces and types (manually copied from tfl.ts)
   - Class methods that wrap the generated API client
   - Comprehensive JSDoc documentation
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

### Example Development Request

When asking an AI to create a new module, use this format:

```
Create src/[moduleName].ts to cover @[ModuleName].ts from /src/generated/jsdoc/.
Don't import anything - manually add the types from @tfl.ts.

Requirements:
- Read /src/generated/jsdoc/[ModuleName].ts for API structure
- Extract relevant types from /src/generated/tfl.ts
- Create a class with static metadata properties
- Implement all API endpoints as methods
- Add comprehensive JSDoc documentation
- Include utility methods for common operations
- Follow the existing code style and patterns
```

### Key Principles

- **No imports from generated files**: All types are manually added to maintain control
- **Static metadata**: Each module includes static properties for API documentation
- **Type safety**: Full TypeScript support with proper interfaces
- **Consistent patterns**: All modules follow the same structure and naming conventions
- **Comprehensive docs**: Full JSDoc coverage for all methods and properties

### Using Generated Metadata

Some modules benefit from pre-generated metadata in `/src/generated/meta/`:
- **Line IDs**: Use `Lines` from `Line.ts` instead of API calls
- **Mode names**: Use `Modes` from `Meta.ts` for validation
- **Severity levels**: Use `Severity` from `Meta.ts` for status descriptions

This approach provides better performance and reduces API calls while maintaining type safety.

## 🤝 Contributing

We welcome contributions from the community! This is an open-source project built by developers, for developers.

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
| Core SDK | ✅ Complete | Full TypeScript SDK |
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
- All contributors and users of this SDK
- The London developer community for feedback and support

## 📞 Support & Community

- 📧 **Email**: [Add support email]
- 💬 **Discussions**: [GitHub Discussions](https://github.com/manglekuo/tfl-api-ts/discussions)
- 🐛 **Issues**: [GitHub Issues](https://github.com/manglekuo/tfl-api-ts/issues)
- 📖 **Documentation**: [Add documentation link]

---

<div align="center">

**Built with ❤️ by the London developer community**

[![GitHub stars](https://img.shields.io/github/stars/manglekuo/tfl-api-ts?style=social)](https://github.com/manglekuo/tfl-api-ts)
[![GitHub forks](https://img.shields.io/github/forks/manglekuo/tfl-api-ts?style=social)](https://github.com/manglekuo/tfl-api-ts)
[![GitHub issues](https://img.shields.io/github/issues/manglekuo/tfl-api-ts)](https://github.com/manglekuo/tfl-api-ts/issues)

</div>

