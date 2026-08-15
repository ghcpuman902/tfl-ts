---
name: tfl-ts
description: Use the tfl-ts npm package to build London transport features with TfL API data. Covers static metadata vs live API calls, line/stop ID resolution, caching, error handling, and Next.js patterns. Use when integrating TfL line status, arrivals, journey planning, disruptions, or transport search.
---

# tfl-ts — TfL API TypeScript Client

## When to use this skill

Use **tfl-ts** when the user wants to:

- Display tube/bus/DLR line status or disruptions
- Show live arrival times at a station or stop
- Plan journeys across London transport
- Search for stops, places, or lines
- Validate transport IDs before API calls
- Build Next.js or Node.js apps with TfL data

Do **not** scrape tfl.gov.uk or call `api.tfl.gov.uk` directly — use this client.

## Core mental model

```
Static metadata (no network)          Live API (network required)
─────────────────────────────         ────────────────────────────
client.line.LINE_NAMES                client.line.getStatus()
client.line.LINE_INFO                 client.line.getArrivals()
LINE_STATION_SEQUENCES                client.line.getRouteSequence()
STATION_HUBS                          client.stopPoint.getArrivals()
client.stopPoint.MODE_NAMES           client.stopPoint.getNormalizedArrivals()
client.journey.MODE_NAMES             client.journey.plan()
severity / mode constants             client.stopPoint.search()
```

**Always check static metadata first.** If you only need line names, station order and branches, mode lists, or ID validation, do not call the API. Import `LINE_STATION_SEQUENCES` directly when no configured client is available.

## Setup

```bash
pnpm add tfl-ts
```

```env
TFL_APP_KEY=your-primary-key
```

Credentials: [api-portal.tfl.gov.uk](https://api-portal.tfl.gov.uk/) (Products → "500 Requests per min" → Profile → Show). On the portal you'll see two keys (Primary and Secondary); either works.

```typescript
import TflClient from 'tfl-ts';

const client = new TflClient({
  appKey: process.env.TFL_APP_KEY,
});
```

Works in Node.js 18+, browsers, and edge runtimes. Zero runtime dependencies.

## Static vs live decision table

| Need | Use | Network? |
|------|-----|----------|
| Validate line ID | `id in client.line.LINE_NAMES` | No |
| Line display name | `client.line.LINE_NAMES['central']` | No |
| Station names, order, and branches | `LINE_STATION_SEQUENCES.central` | No |
| Interchange siblings, which id has arrivals for a line | `STATION_HUBS`, `resolveArrivalsStopId()` | No |
| List transport modes | `client.stopPoint.MODE_NAMES` | No |
| Severity labels | `client.line.SEVERITY_DESCRIPTIONS` | No |
| Current line status, exact TfL shape | `client.line.getStatus()` | Yes |
| Detailed closures with friendly types | `client.line.getDetailedStatus()` | Yes |
| Current route sequence from TfL | `client.line.getRouteSequence()` | Yes |
| Live arrivals | `client.stopPoint.getArrivals()` | Yes |
| Journey options | `client.journey.plan()` | Yes |
| Resolve stop by name | `client.stopPoint.search()` | Yes |

## Example 1: Tube line status board

Full branded board (partition disruptions / good service, colour bars, night badge):
[tfl-components](https://github.com/ghcpuman902/tfl-components) · try it in the [API explorer](https://tfl.manglekuo.com/docs/explorer)

```typescript
import TflClient, {
  sortLinesBySeverityAndOrder,
  getSeverityCategory,
  getLineColor,
  getWorstCurrentStatus,
  isNormalService,
} from 'tfl-ts';

const client = new TflClient();

const statuses = await client.line.getStatus({
  modes: ['tube', 'elizabeth-line', 'dlr', 'tram', 'overground'],
});
const sorted = sortLinesBySeverityAndOrder(statuses);
const disrupted = sorted.filter((line) => !isNormalService(line.lineStatuses ?? []));

for (const line of disrupted) {
  const worst = getWorstCurrentStatus(line.lineStatuses);
  const category = getSeverityCategory(worst?.statusSeverity ?? 10);
  const colors = getLineColor(line.id ?? ''); // hex only — use with inline styles
  console.log(`${line.name} (${colors.hex}): ${worst?.statusSeverityDescription} [${category}]`);
}
```

For planned closures, affected stops, ordered route sections, and validity periods, use the friendly detailed response:

```typescript
const lines = await client.line.getDetailedStatus({
  lineIds: ['bakerloo'],
  dateRange: {
    startDate: '2026-08-08',
    endDate: '2026-08-10',
  },
});

const disruption = lines[0]?.statuses[0]?.disruption;
console.log(disruption?.closureType);
console.log(disruption?.affectedRoutes[0]?.stops);
```

Use `getStatus({ detail: true })` only when the exact generated TfL field names are required.

### Line colors (framework-agnostic)

`getLineColor()` returns hex values, not CSS framework classes. Use inline styles so colors work regardless of Tailwind/CSS setup:

```tsx
import { getLineColor, getLineCssProps } from 'tfl-ts';

const colors = getLineColor(line.id ?? ''); // normalizes elizabeth-line → elizabeth

<span style={{ color: colors.hex }}>{line.name}</span>
<div style={{ backgroundColor: colors.hex, height: 4 }} />
<article style={{ ...getLineCssProps(line.id ?? ''), borderLeft: `4px solid ${colors.hex}` }} />
```

**Bus ≠ tube:** do not use these colour helpers for bus route numbers — see bus boards in [tfl-components](https://github.com/ghcpuman902/tfl-components) or the mapping rules in [examples/README.md](../../../examples/README.md).

## Example 2: Search stop → get arrivals

```typescript
import TflClient from 'tfl-ts';

const client = new TflClient();

// Stage 1: resolve stop ID (live API)
const search = await client.stopPoint.search({ query: 'Oxford Circus', modes: ['tube'] });
const stopPointId = search.matches?.[0]?.id;
if (!stopPointId) throw new Error('Stop not found');

// Stage 2: get arrivals, normalised (live API)
// getNormalizedArrivals() fills a blank `towards` with destinationName —
// TfL sends `towards: ''` for Elizabeth line and Overground predictions.
const arrivals = await client.stopPoint.getNormalizedArrivals({ stopPointIds: [stopPointId] });

const sorted = [...arrivals].sort(
  (a, b) => (a.timeToStation ?? 0) - (b.timeToStation ?? 0),
);

for (const a of sorted.slice(0, 5)) {
  const mins = Math.round((a.timeToStation ?? 0) / 60);
  console.log(`${a.lineName} to ${a.destination.name} in ${mins}min`);
}
```

### Interchanges: which StopPoint id actually has arrivals

A tube station and its mainline rail counterpart can share one physical interchange but different StopPoint ids, each with different lines. `STATION_HUBS` resolves the right one:

```typescript
import { STATION_HUBS, resolveArrivalsStopId } from 'tfl-ts';

// Liverpool Street: tube id and rail id both resolve to the same hub
const hub = STATION_HUBS['940GZZLULVT'];
const elizabethStopId = hub && resolveArrivalsStopId(hub, 'elizabeth'); // '910GLIVST'
const centralStopId = hub && resolveArrivalsStopId(hub, 'central'); // '940GZZLULVT'
```

`resolveArrivalsStopId` returns `undefined`, not the hub id, when the hub doesn't carry that line — polling the interchange id directly returns zero arrivals from TfL. Third-party National Rail operators (Southeastern, South Western Railway, c2c) show up in the hub's topology for completeness, but TfL's Arrivals API never has live predictions for them, only for tube, DLR, tram, Overground, and Elizabeth line.

## Example 2b: Nearby bus stops by GPS

Full bus UI mapping (boardable `490…` IDs, route chips, countdown):
[tfl-components](https://github.com/ghcpuman902/tfl-components) · [API explorer](https://tfl.manglekuo.com/docs/explorer)

```typescript
import TflClient from 'tfl-ts';

const client = new TflClient();

// Truncate GPS to ~3 decimal places (~100 m) in UI demos to avoid mobile jitter re-fetching
const stops = await client.stopPoint.getByGeoPoint({
  lat: 51.508,
  lon: -0.065,
  radius: 400,
  modes: ['bus'],
  stoptypes: ['NaptanPublicBusCoachTram'],
});

for (const stop of stops.stopPoints ?? []) {
  console.log(stop.commonName, stop.id);
}
```

## Example 3: Journey planning

```typescript
import TflClient from 'tfl-ts';

const client = new TflClient();

const result = await client.journey.plan({
  from: '940GZZLUOXC', // Oxford Circus
  to: '940GZZLUBND',   // Bank
  mode: ['tube', 'bus', 'walking'],
});

for (const journey of result.journeys ?? []) {
  const mins = Math.round((journey.duration ?? 0) / 60);
  console.log(`${mins}min, ${journey.legs?.length} legs`);
}
```

Handle disambiguation: if `result.disambiguation` is set, present options to the user and re-plan with specific `from`/`to` IDs.

## Example 4: Validate user input (no API call)

```typescript
import TflClient from 'tfl-ts';

const client = new TflClient();

const userLineIds = ['central', 'elizabeth-line', 'invalid-line'];
const valid = userLineIds.filter((id) => id in client.line.LINE_NAMES);
const invalid = userLineIds.filter((id) => !(id in client.line.LINE_NAMES));

if (invalid.length > 0) {
  throw new Error(`Invalid line IDs: ${invalid.join(', ')}`);
}

// Safe to call API with validated IDs
const status = await client.line.getStatus({ lineIds: valid });
```

## Example 5: Bus stop by NaPTAN code

```typescript
import TflClient from 'tfl-ts';

const client = new TflClient();

// Bus stops can be found by 5-digit code from Google Maps
const search = await client.stopPoint.search({ query: '51800', modes: ['bus'] });
const stopId = search.matches?.[0]?.id;
if (!stopId) throw new Error('Bus stop not found');

const arrivals = await client.stopPoint.getArrivals({ stopPointIds: [stopId] });
```

## Known traps

| Trap | Wrong | Right |
|------|-------|-------|
| Line ID casing | `'Central'`, `'ELIZABETH'` | `'central'`, `'elizabeth'` |
| Line color lookup | Tailwind classes from `getLineColor()` | `colors.hex` with inline styles |
| Elizabeth line ID | `getLineColor('elizabeth')` only | `getLineColor('elizabeth-line')` auto-normalizes |
| Stop ID format | `'Oxford Circus'` as ID | Search first → `'940GZZLUOXC'` |
| Polling too fast | `setInterval(..., 1000)` on arrivals | 10–15s minimum per stop |
| Hardcoding metadata | `['tube', 'bus', 'dlr']` inline | `client.stopPoint.MODE_NAMES` |
| Missing credentials | `new TflClient()` without env | Set `TFL_APP_KEY` |
| Deprecated modules | `accidentStats`, `airQuality` | Avoid — marked deprecated |
| Blank `towards` on Elizabeth/Overground | Reading `a.towards` directly | `getNormalizedArrivals()` — falls through to `destinationName` |
| Polling a National Rail operator's id | Expecting live Southeastern/SWR predictions | TfL's Arrivals API only covers tube, DLR, tram, Overground, Elizabeth line — returns `[]` |
| First `lineStatuses` row | `line.lineStatuses[0]` as "the" status | `getWorstCurrentStatus(line.lineStatuses)` — TfL does not order rows, and a standing hours notice can sit at index 0 |
| `isNow` as a clock | Hiding rows with `isNow: false` | `isNow` tracks `disruption.category === 'RealTime'`. Planned work can be in force today with `isNow: false` |
| Severity 20 as an incident | Sorting Service Closed above Severe Delays | 20 is scheduled closure (weekend W&C, end of traffic day). `sortLinesBySeverityAndOrder` ranks `closed` after incidents |
| Circle / H&C / Met `lineId` flips on shared track | Trusting `lineId` at Liverpool Street / King's Cross | `withSharedTrackIdentity(stopRows, lineIds, networkArrivals)` — exclusive-segment → `canonicalLineId`; 2+ raw lines with no exclusive hit → `ambiguous` + `rawLineIds`; do not invent a line |

## Raw escape hatch

When no friendly wrapper exists, use `client.raw.*`:

```typescript
// Friendly: client.line.getStatus({ lineIds: ['central'] })
// Raw:      client.raw.line.statusByIds({ ids: ['central'] })
```

Discover endpoints: `npx tfl list` or `npx tfl list --tag line`

## Error handling

```typescript
import TflClient, { TflError, TflHttpError } from 'tfl-ts';

try {
  await client.line.getStatus({ modes: ['tube'] });
} catch (error) {
  if (error instanceof TflHttpError && error.isRateLimitError()) {
    // Back off and retry later
  } else if (error instanceof TflError) {
    console.error(error.message, error.requestId);
  }
}
```

The client retries transient errors automatically (configurable via `maxRetries`, `retryDelay`).

## Caching guidance

| Data type | Suggested TTL | Notes |
|-----------|---------------|-------|
| Line status | 30–60s | Changes on disruptions |
| Arrivals | 10–15s | Real-time; don't cache longer |
| Stop search results | 24h+ | Stop IDs are stable |
| Static metadata | Forever | Already bundled in package |

## Additional resources

- Library → UI index: [examples/README.md](../../../examples/README.md)
- Full agent reference: [docs/agent.md](../../../docs/agent.md)
- Local MCP server: [docs/mcp.md](../../../docs/mcp.md)
- Live React boards: [tfl.manglekuo.com](https://tfl.manglekuo.com/) · [ghcpuman902/tfl-components](https://github.com/ghcpuman902/tfl-components)
- API explorer: [tfl.manglekuo.com/docs/explorer](https://tfl.manglekuo.com/docs/explorer)
- Error handling: [ERROR.md](../../../ERROR.md)
- v2 migration: [docs/MIGRATION-v2.md](../../../docs/MIGRATION-v2.md)
- Realtime polling: [docs/REALTIME.md](../../../docs/REALTIME.md)
