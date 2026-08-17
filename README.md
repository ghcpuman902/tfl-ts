# TfL API TypeScript Client

[![npm version](https://badge.fury.io/js/tfl-ts.svg)](https://badge.fury.io/js/tfl-ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![CI](https://github.com/ghcpuman902/tfl-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/ghcpuman902/tfl-ts/actions/workflows/ci.yml)

> Typed TfL client: friendly wrappers, 84 raw REST endpoints, and offline station topology for 20 rail lines.

## Install and first call

Get a Primary key from the [TfL API Portal](https://api-portal.tfl.gov.uk/). Subscribe to "500 Requests per min", then Profile → Show.

```bash
pnpm add tfl-ts
export TFL_APP_KEY=your-primary-key
pnpm exec tfl raw line.statusByIds --ids victoria
```

```json
[
  {
    "id": "victoria",
    "name": "Victoria",
    "lineStatuses": [{ "statusSeverityDescription": "Good Service" }]
  }
]
```

Line names, station order, and colours ship in the package. Status, arrivals, and journeys hit TfL at runtime.

On the portal you'll see two keys (Primary and Secondary); either works. `app_id` has been unused since Jan 2021.

<details>
<summary>Pass credentials in the constructor instead</summary>

```typescript
const client = new TflClient({
  appKey: 'your-primary-key',
});
```

</details>

## Quick starts

### Node

```typescript
import TflClient from 'tfl-ts';

const client = new TflClient(); // reads TFL_APP_KEY from process.env

const status = await client.line.getStatus({ modes: ['tube'] });

const arrivals = await client.stopPoint.getArrivals({
  stopPointIds: ['940GZZLUOXC'], // Oxford Circus
});

const journey = await client.journey.plan({
  from: '940GZZLUOXC',
  to: '940GZZLUBND',
});

const { matches } = await client.stopPoint.search({
  query: 'Oxford Circus',
  modes: ['tube'],
});
```

### Next.js

Server Component with ISR (~60s). Boards and explorer: [tfl-components](https://github.com/ghcpuman902/tfl-components) · [tfl.manglekuo.com/docs/explorer](https://tfl.manglekuo.com/docs/explorer). Tube boards use official line colours; bus boards use route-number chips. Do not mix. See [examples/README.md](examples/README.md).

```typescript
import TflClient, { sortLinesBySeverityAndOrder } from 'tfl-ts';

export const revalidate = 60;

const client = new TflClient();
const tube = await client.line.getStatus({ modes: ['tube'] });
const sorted = sortLinesBySeverityAndOrder(tube);
```

```bash
pnpm dlx shadcn@latest add https://tfl.manglekuo.com/r/tube-status-board.json
pnpm dlx shadcn@latest add https://tfl.manglekuo.com/r/tfl-roundel.json
```

The roundel ships a placeholder unless `NEXT_PUBLIC_ALLOW_TFL_ROUNDEL=true` (you accept trademark responsibility).

### Agent / MCP

Read-only MCP (`npx tfl-ts mcp`), cached and rate-limited. Static tools never call TfL. Setup: [docs/mcp.md](docs/mcp.md).

```json
{
  "mcpServers": {
    "tfl-ts": {
      "command": "npx",
      "args": ["-y", "tfl-ts@latest", "mcp"],
      "env": {
        "TFL_APP_KEY": "your-primary-key"
      }
    }
  }
}
```

Tools: `get_supported_modes`, `resolve_line_id`, `resolve_stop_id`, `get_line_status`, `get_arrivals`, `plan_journey`.

## Gotchas

- Line IDs are lowercase slugs: `'central'`, `'victoria'`, `'elizabeth'`. Not display names like `'Central'`.
- Stop IDs look like `'940GZZLUOXC'`. Resolve with `stopPoint.search()` or `place.search()`.
- Bus stops accept 5-digit NaPTAN-style codes in search (for example `'51800'`).
- Prefer static constants (`LINE_NAMES`, `STATION_SEQUENCES`, mode lists) before live calls.
- Cache status for about 30 to 60s. Do not poll arrivals faster than about 10 to 15s per stop.
- `accidentStats` and `airQuality` are deprecated.
- National Rail arrivals aren't live through TfL: `STATION_HUBS` tracks Southeastern, South Western Railway, and similar operators for topology, but `getArrivals()` returns an empty array for them, not an error.
- Tube boards use official line colours; bus boards use route-number chips. Do not mix patterns.
- Roundel trademark: placeholder unless the consumer opts in.
- A line can carry several `lineStatuses`. Do not read `[0]`. Use `getWorstCurrentStatus(line.lineStatuses)` for the operative row.
- `validityPeriods[].isNow` follows `disruption.category === 'RealTime'`. It is not a clock check. Planned engineering can be in force today with `isNow: false`.
- Severity 20 is scheduled closure (Waterloo & City weekends, end of traffic day), not an unplanned Closed (1). `sortLinesBySeverityAndOrder` ranks it after incidents.
- Circle / H&C / Met `lineId` flips along shared track. Use `withSharedTrackIdentity`. Do not rewrite raw `lineId`.

## Before and after

`getDetailedStatus()` returns shorter types and renamed fields (`severity`, `from`, `closureType`, `originName`) instead of TfL's generated shapes:

```typescript
const lines = await client.line.getDetailedStatus({
  lineIds: ['bakerloo'],
  dateRange: { startDate: '2026-08-08', endDate: '2026-08-10' },
});
const s = lines[0]?.statuses?.[0];
s?.severity;
s?.severityDescription;
s?.validityPeriods?.[0]?.from;
s?.disruption?.closureType;
```

Use `getStatus({ detail: true })` or `client.raw.line.*` for exact TfL field names.

## Station sequences

Tube, Elizabeth line, DLR, Overground, Tram, and river-bus pier topology. No credentials, no network. Identity, order, and branches only (no status or arrivals). River piers are not in `STATION_HUBS` — poll the `NaptanFerryPort` id. Live topology: `client.line.getRouteSequence()`. Also on the client: `client.line.STATION_SEQUENCES`.

```typescript
import { LINE_STATION_SEQUENCES } from 'tfl-ts';

const bakerloo = LINE_STATION_SEQUENCES.bakerloo;
const outbound = bakerloo.orderedRoutes.find(
  (route) => route.direction === 'outbound' && route.serviceType === 'Regular',
);
console.log(outbound?.stationIds, bakerloo.branches);
```

## Station hubs and normalised arrivals

`STATION_HUBS` maps each physical station to its sibling StopPoint ids and the specific id that carries arrivals for each line — Liverpool Street's tube id (`940GZZLULVT`) and rail id (`910GLIVST`) both resolve to one `HUBLST` entry, with Central on the tube id and Elizabeth line on the rail id. No credentials, no network.

```typescript
import { STATION_HUBS, resolveArrivalsStopId } from 'tfl-ts';

const hub = STATION_HUBS['940GZZLULVT']; // any sibling id works
const elizabethStopId = hub && resolveArrivalsStopId(hub, 'elizabeth'); // '910GLIVST'
```

`resolveArrivalsStopId` returns `undefined` when the hub doesn't carry that line, rather than the interchange id — polling the interchange id itself returns zero arrivals from TfL. Third-party National Rail operators (Southeastern, South Western Railway, c2c, and similar) show up in the hub's topology but never return live predictions: TfL's Arrivals API only covers tube, DLR, tram, Overground, and Elizabeth line.

`client.stopPoint.getNormalizedArrivals()` is `getArrivals()` plus a cleaned `destination` (falls through empty or literal `"null"` `towards` to `destinationName`, common on Elizabeth line, Overground, and some bus termini) and `platform` (compass bound, cleaned label, `isUnknown` for TfL's literal "Platform Unknown"):

```typescript
const arrivals = await client.stopPoint.getNormalizedArrivals({
  stopPointIds: ['940GZZLUOXC'],
});
arrivals[0]?.destination.name;
arrivals[0]?.platform.label;
```

`getArrivals()` and `client.raw.*` are unchanged.

On Circle / Hammersmith & City / Metropolitan shared track, TfL assigns `lineId` per station, not per train. The same `vehicleId` can be `circle` at Victoria and `hammersmith-city` at Liverpool Street. `withSharedTrackIdentity(stopRows, lineIds, networkArrivals)` adds `sharedTrackIdentity` (`canonicalLineId` from an exclusive-segment hit, or `ambiguous` + `rawLineIds`). It does not rewrite raw `lineId`. `line.getArrivals({ lineIds })` with no `stopPointId` is the network-wide poll that evidence needs.

## Colours, severity, and detailed types

```typescript
import type {
  DetailedLine,
  DetailedLineStatus,
  DetailedDisruption,
  AffectedRoute,
  AffectedStop,
} from 'tfl-ts';
import {
  getLineColor,
  getLineInlineStyles,
  getLineCssProps,
  getLineDarkReadableStyles,
  sortLinesBySeverityAndOrder,
  getLineStatusSummary,
  getWorstCurrentStatus,
  getStatusKind,
} from 'tfl-ts';

const { hex } = getLineColor('central'); // #E32017
const styles = getLineInlineStyles('central');
const cssProps = getLineCssProps('northern');

const tube = await client.line.getStatus({ modes: ['tube'] });
const sorted = sortLinesBySeverityAndOrder(tube);
const worst = getWorstCurrentStatus(sorted[0]?.lineStatuses);
getStatusKind(worst ?? 10);
```

Northern defaults to `outline` dark contrast. Pass `{ darkContrastMode: 'white' }` for white fill/text. See [CHANGELOG.md](CHANGELOG.md) (2.4.0). Raw escape hatch: `client.raw.line.statusByIds({ ids: ['central'] })`.

## Realtime

Poll arrivals with the same `app_key` as REST. No SignalR. Details: [docs/REALTIME.md](docs/REALTIME.md).

```typescript
const stop = client.realtime.pollArrivals(
  {
    stopPointIds: ['940GZZLUOXC'],
    sortBy: 'timeToStation',
    intervalMs: 30_000,
  },
  (arrivals, meta) => console.log(`[tick ${meta.tick}]`, arrivals.length),
  (error, meta) => console.error(meta.tick, error),
);
stop();
```

## Module index

| Module | Common work |
|--------|-------------|
| `client.line` | Status, detailed status, disruptions, routes, arrivals by line, static `LINE_NAMES` / `STATION_SEQUENCES` |
| `client.stopPoint` | Search, arrivals, normalised arrivals, stop metadata, static `STATION_HUBS` |
| `client.journey` | Journey planning |
| `client.mode` | Mode lists and mode arrivals |
| `client.search` / `place` / `road` / `vehicle` / `occupancy` / `bikePoint` / `cabwise` / `travelTimes` | Supporting APIs |
| `client.raw` | All 84 REST endpoints (`pnpm exec tfl list` in a clone) |
| `client.realtime` | Instant-pull polling over REST arrivals |

Zero runtime dependencies (Node, browser, and edge with `fetch`).

## Deeper docs

| Resource | Purpose |
|----------|---------|
| [CLAUDE.md](CLAUDE.md) | Agent quick-start: static vs live |
| [docs/agent.md](docs/agent.md) | Module reference, caching, Next.js patterns |
| [.claude/skills/tfl-ts/SKILL.md](.claude/skills/tfl-ts/SKILL.md) | Usage patterns and gotchas |
| [docs/mcp.md](docs/mcp.md) | Local MCP server |
| [CHANGELOG.md](CHANGELOG.md) | Release notes |
| [docs/MIGRATION-v2.md](docs/MIGRATION-v2.md) | v1 → v2 migration |
| [examples/](examples/) | Library → UI mapping (tube + bus) |

Playground demos under `playground/demo/` are for clones, not package consumers.

## Architecture

```
OpenAPI snapshot (committed)
  → types.ts        (swagger-typescript-api, types only)
  → raw.ts          (owned generator, uniform object-param API)
  → client.raw.*    (public escape hatch)
  → wrappers        (line, stopPoint, …)
```

`pnpm run build` compiles TypeScript only. No network, no regeneration.

## Contributing

```bash
git clone https://github.com/ghcpuman902/tfl-ts.git
cd tfl-ts
pnpm install
pnpm run build
pnpm run test
```

Useful scripts: `pnpm run generate`, `pnpm run check`, `pnpm run check -- --only=drift`, `pnpm exec tfl list`. See [LLM_context.md](LLM_context.md) and [.cursor/skills/tfl-ts-maintainer/SKILL.md](.cursor/skills/tfl-ts-maintainer/SKILL.md).

## License

MIT. Not affiliated with Transport for London.

| | |
|--|--|
| npm | [tfl-ts](https://www.npmjs.com/package/tfl-ts) |
| GitHub | [ghcpuman902/tfl-ts](https://github.com/ghcpuman902/tfl-ts) |
| Issues | [Report bugs](https://github.com/ghcpuman902/tfl-ts/issues) |
| Live demo | [tfl.manglekuo.com](https://tfl.manglekuo.com/) |
