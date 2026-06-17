# tfl-ts — Agent Reference

This document is the detailed reference for AI coding agents integrating the **tfl-ts** npm package. For quick patterns, see [.claude/skills/tfl-ts/SKILL.md](../.claude/skills/tfl-ts/SKILL.md). For repo maintenance, see [LLM_context.md](../LLM_context.md).

## Package overview

```typescript
import TflClient from 'tfl-ts';

const client = new TflClient(); // requires TFL_APP_ID + TFL_APP_KEY
```

**Architecture (v2):**

```
client.line / stopPoint / journey / …   ← friendly wrappers (use these)
client.raw.<tag>.<method>()             ← escape hatch (all 84 REST endpoints)
client.realtime.pollArrivals()          ← REST polling helper
```

## Static metadata vs live API

### Static (bundled — no network, no credentials for reads)

These are available synchronously on the client instance after construction:

| Property | Module | Purpose |
|----------|--------|---------|
| `LINE_NAMES` | `line` | Map of line ID → display name |
| `LINE_INFO` | `line` | Full line metadata per ID |
| `MODE_NAMES` | `line`, `stopPoint`, `journey`, `mode` | Valid transport mode strings |
| `MODE_METADATA` | `line` | `isTflService`, `isFarePaying`, etc. |
| `SEVERITY_DESCRIPTIONS` | `line` | All severity label strings |
| `SEVERITY_BY_MODE` | `line` | Severity levels per mode |
| `SERVICE_TYPES` | `line`, `stopPoint` | `'Regular'`, `'Night'` |
| `DISRUPTION_CATEGORIES` | `line`, `stopPoint` | Disruption type strings |
| `STOP_POINT_CATEGORIES` | `stopPoint` | Stop category enums |
| `STOP_POINT_TYPES` | `stopPoint` | Stop type enums |
| `LINE_IDS` | package export | Mode-grouped line name → ID maps |

**Use static metadata for:** input validation, dropdowns, display labels, severity styling, mode filtering — anything that does not need current operational state.

### Live (runtime TfL REST API)

Any method that returns a `Promise` hits the network. Key live endpoints:

| Method | Module | Typical use | Suggested cache TTL |
|--------|--------|-------------|---------------------|
| `getStatus()` | `line` | Disruptions, good service | 30–60s |
| `getArrivals()` | `line`, `stopPoint`, `mode` | Countdown boards | 10–15s |
| `search()` | `stopPoint`, `line`, `search`, `place` | Resolve IDs from names | 1h–24h |
| `get()` | `stopPoint`, `line` | Stop/line details | 1h+ |
| `plan()` | `journey` | Route options | 2–5min |
| `getDisruptions()` | `line`, `road` | Active disruptions | 30–60s |
| `pollArrivals()` | `realtime` | Polling helper | 10–15s interval |

**Avoid:** calling `line.get()` to list all lines when `LINE_INFO` already has the data. Avoid re-searching the same stop on every page load — cache the resolved ID.

## Module reference (14 modules)

### `line` — Lines, routes, status, arrivals

```typescript
// Static
client.line.LINE_NAMES['central'];        // "Central"
'id' in client.line.LINE_NAMES;           // validate

// Live
await client.line.getStatus({ modes: ['tube'] });
await client.line.getStatus({ lineIds: ['central', 'victoria'] });
await client.line.getArrivals({ lineIds: ['central'], stopPointId: '940GZZLUOXC' });
await client.line.search({ query: 'victoria' });
await client.line.get({ modes: ['tube'] });
```

### `stopPoint` — Stops, arrivals, timetables

```typescript
// Static
client.stopPoint.MODE_NAMES;
client.stopPoint.STOP_POINT_TYPES;

// Live
await client.stopPoint.search({ query: 'Oxford Circus', modes: ['tube'] });
await client.stopPoint.get({ stopPointIds: ['940GZZLUOXC'] });
await client.stopPoint.getArrivals({ stopPointIds: ['940GZZLUOXC'] });
```

**Stop ID pattern:** always search → cache ID → use ID for subsequent calls.

Bus stops: search by 5-digit NaPTAN code (e.g. `'51800'`) with `modes: ['bus']`.

### `journey` — Journey planning

```typescript
await client.journey.plan({
  from: '940GZZLUOXC',
  to: '940GZZLUBND',
  mode: ['tube', 'bus', 'walking'],
});
```

- `from` / `to` accept stop IDs, postcodes, or lat/lon strings per TfL API.
- Check `result.disambiguation` — status 300 means multiple matches; present options and re-plan.
- Helpers: `generateNaturalInstruction()`, `getModeIcon()`, `simplifyJourneyResult()`.

### `mode` — Transport mode arrivals

```typescript
await client.mode.getArrivals({ mode: 'tube', stopPointId: '940GZZLUOXC' });
```

### `search` — Global search

```typescript
await client.search.search({ query: 'Oxford Circus' });
```

### `place` — Places and geocoding

```typescript
await client.place.search({ name: 'Bank', placeTypes: ['StopPoint'] });
```

### `road` — Road traffic and disruptions

```typescript
// Static
client.road.ROAD_CATEGORIES;
client.road.SEVERITY_DESCRIPTIONS;

// Live
await client.road.getDisruptions();
```

### `bikePoint` — Santander Cycles

```typescript
await client.bikePoint.getAll();
await client.bikePoint.search({ query: 'Hyde Park' });
```

### `vehicle` — Vehicle-specific arrivals

```typescript
await client.vehicle.getArrivals({ vehicleIds: ['LX58CFV'] });
```

### `occupancy` — Car park occupancy

```typescript
await client.occupancy.getAllCarParks();
```

### `travelTimes` — Travel time overlay maps

```typescript
await client.travelTimes.getOverlay({ z: 12, mapCenterLat: 51.5074, /* … */ });
```

### `cabwise` — Taxi/minicab search

```typescript
await client.cabwise.search({ latitude: 51.5074, longitude: -0.1278 });
```

### Deprecated — avoid in new code

- `accidentStats` — deprecated
- `airQuality` — deprecated

## ID resolution patterns

### Line IDs

```typescript
const validateLineIds = (ids: string[]): string[] => {
  const valid = ids.filter((id) => id in client.line.LINE_NAMES);
  const invalid = ids.filter((id) => !(id in client.line.LINE_NAMES));
  if (invalid.length > 0) throw new Error(`Invalid line IDs: ${invalid.join(', ')}`);
  return valid;
};
```

Common IDs: `'central'`, `'victoria'`, `'northern'`, `'elizabeth'`, `'dlr'`, `'overground'`.

Aliases like `'elizabeth-line'` may not be in `LINE_NAMES` — validate before use.

### Stop IDs

```typescript
const resolveStopId = async (name: string, modes: string[]): Promise<string> => {
  const result = await client.stopPoint.search({ query: name, modes });
  const id = result.matches?.[0]?.id;
  if (!id) throw new Error(`No stop found for: ${name}`);
  return id;
};
```

Stop IDs look like `'940GZZLUOXC'` (tube) or `'490003191F'` (bus). They are opaque — never guess.

## Error handling

```typescript
import TflClient, {
  TflError,
  TflHttpError,
  TflNetworkError,
  TflTimeoutError,
  TflConfigError,
} from 'tfl-ts';
```

| Error | When | Agent action |
|-------|------|--------------|
| `TflConfigError` | Missing `TFL_APP_ID` / `TFL_APP_KEY` | Set env vars or pass config |
| `TflHttpError` (401/403) | Bad credentials | Check TfL portal keys |
| `TflHttpError` (429) | Rate limit | Back off, increase cache TTL |
| `TflHttpError` (5xx) | TfL server error | Retry (client does this automatically) |
| `TflNetworkError` | Connectivity | Retry with backoff |
| `TflTimeoutError` | Slow response | Increase `timeout` config |

```typescript
const client = new TflClient({
  timeout: 30000,
  maxRetries: 3,
  retryDelay: 1000,
});
```

## Caching guidance

### What to cache and for how long

| Data | TTL | Mechanism |
|------|-----|-----------|
| Line status | 30–60s | `unstable_cache` / Redis / in-memory |
| Arrivals per stop | 10–15s | Short TTL; tag by stop ID |
| Resolved stop IDs | Hours–days | Key: `stop:${normalizedName}:${modes}` |
| Journey results | 2–5min | Key: `journey:${from}:${to}:${time}` |
| Static metadata | Never expire | Already in package |

### What NOT to do

- Poll arrivals every second
- Call `line.get()` on every request when you only need status
- Search for the same stop name on every page view
- Cache arrivals longer than 15 seconds for "live" displays

## Next.js App Router patterns

### Server Component (recommended for status boards)

```typescript
// app/status/page.tsx
import TflClient, { sortLinesBySeverityAndOrder } from 'tfl-ts';

export const revalidate = 60; // ISR: refresh every 60s

const getTubeStatus = async () => {
  const client = new TflClient();
  const statuses = await client.line.getStatus({ modes: ['tube'] });
  return sortLinesBySeverityAndOrder(statuses);
};

export default async function StatusPage() {
  const lines = await getTubeStatus();
  return (
    <ul>
      {lines.map((line) => (
        <li key={line.id}>
          {line.name}: {line.lineStatuses?.[0]?.statusSeverityDescription}
        </li>
      ))}
    </ul>
  );
}
```

**Credentials:** set `TFL_APP_ID` and `TFL_APP_KEY` in Vercel environment variables (server-side only). Never expose keys to the client.

### Route Handler with cache

```typescript
// app/api/arrivals/[stopId]/route.ts
import { NextResponse } from 'next/server';
import TflClient from 'tfl-ts';

export const revalidate = 15;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ stopId: string }> },
) => {
  const { stopId } = await params;
  const client = new TflClient();
  const arrivals = await client.stopPoint.getArrivals({ stopPointIds: [stopId] });
  return NextResponse.json(arrivals);
};
```

### Client Component (live polling)

For countdown boards that update in the browser, expose a Route Handler or Server Action — do not instantiate `TflClient` in client components with embedded credentials.

```typescript
'use client';

import { useEffect, useState } from 'react';

export const ArrivalBoard = ({ stopId }: { stopId: string }) => {
  const [arrivals, setArrivals] = useState([]);

  useEffect(() => {
    const fetchArrivals = async () => {
      const res = await fetch(`/api/arrivals/${stopId}`);
      setArrivals(await res.json());
    };
    fetchArrivals();
    const interval = setInterval(fetchArrivals, 15000);
    return () => clearInterval(interval);
  }, [stopId]);

  // render arrivals…
};
```

## UI helpers (no API calls)

```typescript
import {
  getLineColor,
  getLineCssProps,
  getSeverityCategory,
  getSeverityClasses,
  getAccessibleSeverityLabel,
  sortLinesBySeverityAndOrder,
  getLineStatusSummary,
  isNormalService,
} from 'tfl-ts';
```

Use these for styling status boards — they operate on data already fetched from the API.

## Raw client escape hatch

When a wrapper does not exist or you need exact OpenAPI parameter names:

```typescript
// Wrapper:  client.line.getStatus({ lineIds: ['central'] })
// Raw:        client.raw.line.statusByIds({ ids: ['central'], detail: true })

// List all endpoints
import { ENDPOINTS, ENDPOINT_COUNT } from 'tfl-ts';
// Or CLI: npx tfl list --tag journey
```

Raw naming: swagger `Line_StatusByIds` → `client.raw.line.statusByIds()`.

## Realtime

Push/stream (SignalR, URA) is deferred. Use `client.realtime.pollArrivals()` for REST-based polling. See [REALTIME.md](./REALTIME.md).

## Network calls summary

All live methods call `https://api.tfl.gov.uk/` with `app_id` and `app_key` query parameters. The client:

- Adds auth automatically
- Retries transient failures (up to `maxRetries`)
- Throws typed `TflError` subclasses on failure
- Has zero runtime npm dependencies

## Further reading

- [examples/](../examples/) — copy-paste patterns
- [ERROR.md](../ERROR.md) — full error handling guide
- [MIGRATION-v2.md](./MIGRATION-v2.md) — v1 → v2 migration
- [REALTIME.md](./REALTIME.md) — polling vs push
