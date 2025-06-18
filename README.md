# Tfl API TypeScript Wrapper

A typescript wrapper for the Transport for London (Tfl) API.
- expose all info following the tfl api swagger by default from https://api.tfl.gov.uk/swagger/docs/v1
- additional hand written information for common apis to provide more useful information overwriting the generated types
- predownload enums for line ids, modes, service types, etc.

The goal is for VS code autocomplete and AI coding tools to work so well you don't need to read the docs.

additional features:
- batch processing of requests
- parallel processing of requests


# for developers
- to update the types, run `pnpm generate-types`
- to run the playground, run `pnpm playground`
- to run the tests, run `pnpm test`
- to run the lint, run `pnpm lint`
- to run the format, run `pnpm format`

please edit each file under src/ to add additional features or overwrite the generated types.

Behind the scenes, it uses the [swagger-typescript-api](https://github.com/acacode/swagger-typescript-api) to generate the types.









## Features

- 🚇 Full TypeScript support with auto-generated types from Tfl's Swagger API
- 🔄 Real-time data fetching for London transport
- 🎯 Type-safe API calls with proper error handling
- 📦 Zero dependencies (except TypeScript)
- 🧪 Comprehensive test coverage
- 🔍 Support for all Tfl API endpoints
- 🎮 Interactive playground for exploring the API
- 🎨 Modern, user-friendly interface with simplified response types
- ✨ Dynamic type generation for Tfl-specific values (line IDs, modes, etc.)

## Installation

```bash
npm install tfl-api-ts
# or
yarn add tfl-api-ts
# or
pnpm add tfl-api-ts
```

## Quick Start

```typescript
import TflClient from 'tfl-api-ts';

// Initialize the client with your Tfl API credentials
const client = new TflClient({
  appId: 'your-app-id',
  appKey: 'your-app-key'
});

// Get line status for the tube
const tubeStatus = await client.line.getStatus({ modes: ['tube'] });
console.log(tubeStatus);

// Get bus arrivals for a specific stop
const busArrivals = await client.stopPoint.getArrivals({
  id: '490000014N',
  lineIds: ['1', '2']
});
console.log(busArrivals);
```

## TypeScript Support

The SDK is written in TypeScript and provides full type support with simplified interfaces:

```typescript
import { TflLine, TflStopPoint, TflLineId, ModeName } from 'tfl-api-ts';

// All responses are properly typed with simplified interfaces
const lines: TflLine[] = await client.line.getStatus();

// Get autocompletion for line IDs
const specificLines = await client.line.get({ 
  ids: ['central', 'victoria'] // TypeScript will ensure these are valid line IDs
});

// Get autocompletion for transport modes
const tubeLines = await client.line.get({ 
  modes: ['tube', 'dlr'] // TypeScript will ensure these are valid modes
});

// Access line information
const lineName = client.line.LINE_NAMES['central']; // "Central"
const lineInfo = client.line.LINE_INFO['central']; // Full line information
```

### Dynamic Type Generation

The SDK automatically generates TypeScript types from the Tfl API, ensuring your code is always up-to-date with the latest Tfl data:

```typescript
// These types are generated from the Tfl API
type TflLineId = 'bakerloo' | 'central' | 'circle' | /* ... */;
type ModeName = 'tube' | 'bus' | 'dlr' | /* ... */;

// Constants are also generated
const LINE_NAMES: Record<TflLineId, string> = {
  'bakerloo': 'Bakerloo',
  'central': 'Central',
  // ...
};
```

To update the generated types:

```bash
# Generate types from Tfl API
npm run generate-enums

# Or if you're using pnpm
pnpm generate-enums
```

### Documentation Strategy

The SDK uses a hybrid approach to documentation that combines the best of both worlds:

1. **Swagger-Generated Types**: We use the official Tfl Swagger API to generate our base TypeScript types, ensuring accuracy and completeness of the API interface.

2. **Enhanced Wrapper Documentation**: Our wrapper classes add comprehensive JSDoc documentation that includes:
   - Clear parameter descriptions
   - Return type documentation
   - Real-world usage examples
   - Type-safe interfaces

Example of our enhanced documentation:

```typescript
/**
 * Get line information
 * @param options - Query options for filtering lines
 * @returns Promise resolving to an array of line information
 * @example
 * // Get all lines
 * const allLines = await client.line.get();
 * 
 * // Get tube lines  
 * const tubeLines = await client.line.get({ modes: ['tube'] });
 * 
 * // Get specific lines
 * const specificLines = await client.line.get({ 
 *   ids: ['central', 'victoria', 'jubilee'] 
 * });
 */
async get(options?: BaseLineQuery): Promise<LineInfo[]>
```

### Architectural Decisions

The SDK is built with several key architectural decisions:

1. **Dynamic Type Generation**:
   - Types are generated from live Tfl API data
   - Includes line IDs, modes, service types, and more
   - Ensures types stay current with Tfl's data

2. **Enhanced Wrapper Layer**:
   - Batch processing with automatic request chunking
   - Unified filtering across multiple endpoints
   - Rich TypeScript JSDoc documentation
   - Type-safe constants and enums

3. **Developer Experience**:
   - Comprehensive error handling
   - Automatic retry mechanism
   - Parallel processing support
   - Type-safe constants exported independently

4. **Performance Optimizations**:
   - Efficient batch processing
   - Automatic request chunking
   - Rate limiting protection
   - Response caching where appropriate

## API Credentials

To use the Tfl API, you need to register for an API key at the [Tfl API Portal](https://api-portal.tfl.gov.uk/).

You can provide your API credentials in two ways:

1. **Environment Variables** (Recommended for production):
   Create a `.env` file in your project root with:
   ```
   TFL_APP_ID=your-app-id
   TFL_APP_KEY=your-app-key
   ```
   The client will automatically read these environment variables.

2. **Direct Configuration**:
   Pass the credentials directly when initializing the client:
   ```typescript
   const client = new TflClient({
     appId: 'your-app-id',
     appKey: 'your-app-key'
   });
   ```

## Playground

The SDK includes an interactive Express-based playground to explore the Tfl API data through a web interface.

### Running the Playground

1. **Clone the repository and install dependencies:**
   ```bash
   git clone https://github.com/manglekuo/tfl-api-ts.git
   cd tfl-api-ts
   pnpm install
   ```

2. **Set up your Tfl API credentials:**
   Create a `.env` file in the project root:
   ```
   TFL_APP_ID=your-app-id
   TFL_APP_KEY=your-app-key
   ```

3. **Generate types:**
   ```bash
   pnpm generate-enums
   ```

4. **Start the playground:**
   ```bash
   pnpm run playground
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Playground Features

The interactive playground allows you to:

- 🔍 **Explore Transport Modes**: Browse all available transport modes (tube, bus, DLR, etc.)
- 🚇 **View Routes**: See all routes/lines for each transport mode
- 📊 **Route Details**: Get comprehensive information about specific routes including:
  - Basic route information (ID, name, mode)
  - Real-time status and disruptions
  - Full API response data
- 🎨 **Clean UI**: Modern, responsive interface built with vanilla HTML/CSS

## Contributing

Contributions are welcome! Here's how to get started:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/manglekuo/tfl-api-ts.git
   cd tfl-api-ts
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up your Tfl API credentials:**
   Create a `.env` file in the project root:
   ```
   TFL_APP_ID=your-app-id
   TFL_APP_KEY=your-app-key
   ```

4. **Build the project:**
   ```bash
   pnpm build
   ```
   This will:
   - Generate TypeScript types from Tfl API
   - Compile the TypeScript code
   - Create the distribution files

5. **Run tests:**
   ```bash
   pnpm test        # Run tests once
   pnpm test:watch  # Run tests in watch mode
   ```

6. **Start the playground:**
   ```bash
   pnpm playground
   ```

7. **Code quality:**
   ```bash
   pnpm lint   # Run ESLint
   pnpm format # Format code with Prettier
   ```

8. **Make your changes and submit a PR!**

### Available Scripts

- `build`: Generates types from Tfl API and builds the project
- `test`: Runs the test suite
- `test:watch`: Runs tests in watch mode
- `playground`: Starts the interactive playground
- `lint`: Runs ESLint for code quality
- `format`: Formats code with Prettier

### Development Timeline

| Feature | Status | Date |
|---------|--------|------|
| Basic SDK structure | ✅ | 2024-03-20 |
| Type generation from Tfl Swagger API | ✅ | 2024-03-20 |
| Dynamic type generation for Tfl values | ✅ | 2024-03-20 |
| Line status endpoints | ✅ | 2024-03-20 |
| Stop point endpoints | ✅ | 2024-03-20 |
| Basic error handling | ✅ | 2024-03-20 |
| TypeScript support | ✅ | 2024-03-20 |
| Initial test coverage | ✅ | 2024-03-20 |

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/manglekuo/tfl-api-ts/issues).

