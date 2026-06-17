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
client.stopPoint.MODE_NAMES           client.stopPoint.getArrivals()
client.journey.MODE_NAMES             client.journey.plan()
severity / mode constants             client.stopPoint.search()
```

**Always check static metadata first.** If you only need line names, mode lists, or ID validation, do not call the API.

## Setup

```bash
pnpm add tfl-ts
```

```env
TFL_APP_ID=your-app-id
TFL_APP_KEY=your-app-key
```

Credentials: [api-portal.tfl.gov.uk](https://api-portal.tfl.gov.uk/)

```typescript
import TflClient from 'tfl-ts';

const client = new TflClient({
  appId: process.env.TFL_APP_ID,
  appKey: process.env.TFL_APP_KEY,
});
```

Works in Node.js 18+, browsers, and edge runtimes. Zero runtime dependencies.

## Static vs live decision table

| Need | Use | Network? |
|------|-----|----------|
| Validate line ID | `id in client.line.LINE_NAMES` | No |
| Line display name | `client.line.LINE_NAMES['central']` | No |
| List transport modes | `client.stopPoint.MODE_NAMES` | No |
| Severity labels | `client.line.SEVERITY_DESCRIPTIONS` | No |
| Current line status | `client.line.getStatus()` | Yes |
| Live arrivals | `client.stopPoint.getArrivals()` | Yes |
| Journey options | `client.journey.plan()` | Yes |
| Resolve stop by name | `client.stopPoint.search()` | Yes |

## Example 1: Tube line status board

```typescript
import TflClient, { sortLinesBySeverityAndOrder, getSeverityCategory, getLineColor } from 'tfl-ts';

const client = new TflClient();

const statuses = await client.line.getStatus({ modes: ['tube', 'elizabeth-line', 'dlr'] });
const sorted = sortLinesBySeverityAndOrder(statuses);

for (const line of sorted) {
  const worst = line.lineStatuses?.[0];
  const category = getSeverityCategory(worst?.statusSeverity ?? 10);
  const colors = getLineColor(line.id ?? ''); // hex only — use with inline styles
  console.log(`${line.name} (${colors.hex}): ${worst?.statusSeverityDescription} [${category}]`);
}
```

### Line colors (framework-agnostic)

`getLineColor()` returns hex values, not CSS framework classes. Use inline styles so colors work regardless of Tailwind/CSS setup:

```tsx
import { getLineColor, getLineCssProps } from 'tfl-ts';

const colors = getLineColor(line.id ?? ''); // normalizes elizabeth-line → elizabeth

<span style={{ color: colors.hex }}>{line.name}</span>
<div style={{ backgroundColor: colors.hex, height: 4 }} />
<article style={{ ...getLineCssProps(line.id ?? ''), borderLeft: `4px solid ${colors.hex}` }} />
```

## Example 2: Search stop → get arrivals

```typescript
import TflClient from 'tfl-ts';

const client = new TflClient();

// Stage 1: resolve stop ID (live API)
const search = await client.stopPoint.search({ query: 'Oxford Circus', modes: ['tube'] });
const stopPointId = search.matches?.[0]?.id;
if (!stopPointId) throw new Error('Stop not found');

// Stage 2: get arrivals (live API)
const arrivals = await client.line.getArrivals({
  lineIds: ['central'],
  stopPointId,
});

const sorted = [...arrivals].sort(
  (a, b) => (a.timeToStation ?? 0) - (b.timeToStation ?? 0),
);

for (const a of sorted.slice(0, 5)) {
  const mins = Math.round((a.timeToStation ?? 0) / 60);
  console.log(`${a.lineName} to ${a.towards} in ${mins}min`);
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
| Missing credentials | `new TflClient()` without env | Set `TFL_APP_ID` + `TFL_APP_KEY` |
| Deprecated modules | `accidentStats`, `airQuality` | Avoid — marked deprecated |

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

- Full agent reference: [docs/agent.md](../../../docs/agent.md)
- Runnable examples: [examples/](../../../examples/)
- Error handling: [ERROR.md](../../../ERROR.md)
- v2 migration: [docs/MIGRATION-v2.md](../../../docs/MIGRATION-v2.md)
- Realtime polling: [docs/REALTIME.md](../../../docs/REALTIME.md)
