# TfL API TypeScript SDK

A TypeScript SDK for the Transport for London (TfL) API with auto-generated types and real-time data support.

## Features

- 🚇 Full TypeScript support with auto-generated types from TfL's Swagger API
- 🔄 Real-time data fetching for London transport
- 🎯 Type-safe API calls with proper error handling
- 📦 Zero dependencies (except TypeScript)
- 🧪 Comprehensive test coverage
- 🔍 Support for all TfL API endpoints

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

// Initialize the client with your TfL API credentials
// You can either pass them directly:
const client = new TflClient({
  appId: 'your-app-id',
  appKey: 'your-app-key'
});

// Or use environment variables:
// Create a .env file in your project root with:
// TFL_APP_ID=your-app-id
// TFL_APP_KEY=your-app-key
const client = new TflClient();

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

## API Credentials

To use the TfL API, you need to register for an API key at the [TfL API Portal](https://api-portal.tfl.gov.uk/).

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

## Available Endpoints

The SDK provides access to all TfL API endpoints:

- Line Status
- Stop Points
- Journey Planner
- Air Quality
- Bike Points
- Road Status
- And more...

## TypeScript Support

The SDK is written in TypeScript and provides full type support:

```typescript
import { TflLine, TflStopPoint } from 'tfl-api-ts';

// All responses are properly typed
const lines: TflLine[] = await client.line.getStatus();
const stops: TflStopPoint[] = await client.stopPoint.getByMode({ modes: ['tube'] });
```

## Error Handling

The SDK includes proper error handling:

```typescript
try {
  const status = await client.line.getStatus();
} catch (error) {
  if (error instanceof TflApiError) {
    console.error('TfL API Error:', error.message);
  }
}
```

## Development Timeline

### Phase 1 - Core Features (Current)
- ✅ Basic SDK structure
- ✅ Type generation from TfL Swagger API
- ✅ Line status endpoints
- ✅ Stop point endpoints
- ✅ Basic error handling
- ✅ TypeScript support
- ✅ Initial test coverage

### Phase 2 - Enhanced Features (Next)
- 🔄 Caching layer implementation
- 🔄 Rate limiting
- 🔄 Retry mechanism
- 🔄 Advanced error handling
- 🔄 Additional endpoint coverage
- 🔄 Extended test coverage

### Phase 3 - Advanced Features (Future)
- 📅 Real-time data streaming
- 📅 WebSocket support
- 📅 Advanced querying capabilities
- 📅 Performance optimizations
- 📅 Documentation improvements
- 📅 Example applications

### Phase 4 - Enterprise Features (Future)
- 📅 Authentication improvements
- 📅 Analytics integration
- 📅 Enterprise support
- 📅 Advanced monitoring
- 📅 Custom endpoint support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/manglekuo/tfl-api-ts/issues).

