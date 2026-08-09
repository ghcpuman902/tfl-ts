# TfL API TypeScript Client

[![npm version](https://badge.fury.io/js/tfl-ts.svg)](https://badge.fury.io/js/tfl-ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

> Typed TypeScript client for the Transport for London API (v2.5.0). Friendly wrappers for everyday work, every REST endpoint via `client.raw`, build-time line metadata, and UI helpers for official colours.

Older npm wrappers (`tfl-api-wrapper`, `tfl-unified-api`) covered a subset of endpoints with per-module constructors. This package covers the full REST surface, wraps the common jobs, and ships line names, station sequences, and colours so you do not refetch static facts.

## Install

Register free credentials at the [TfL API Portal](https://api-portal.tfl.gov.uk/), then:

```bash
pnpm add tfl-ts
```

```env
TFL_APP_ID=your-app-id
TFL_APP_KEY=your-app-key
```

```typescript
import TflClient from 'tfl-ts';

const client = new TflClient(); // reads TFL_APP_ID / TFL_APP_KEY from process.env
```

You can also pass `{ appId, appKey }` to the constructor.

## Three common recipes

```typescript
// Tube line status
const status = await client.line.getStatus({ modes: ['tube'] });

// Arrivals at a known stop (Oxford Circus)
const arrivals = await client.stopPoint.getArrivals({
  stopPointIds: ['940GZZLUOXC'],
});

// Journey plan
const journey = await client.journey.plan({
  from: '940GZZLUOXC',
  to: '940GZZLUBND',
});
```

Resolve a name when you do not have a stop ID yet:

```typescript
const { matches } = await client.stopPoint.search({
  query: 'Oxford Circus',
  modes: ['tube'],
});
const stopPointId = matches?.[0]?.id;
```

## Gotchas

- Line IDs are lowercase slugs: `'central'`, `'victoria'`, `'elizabeth'`. Not display names like `'Central'`.
- Stop IDs look like `'940GZZLUOXC'`. Resolve with `stopPoint.search()` or `place.search()`.
- Bus stops accept 5-digit codes in search (for example `'51800'`).
- Prefer static constants (`LINE_NAMES`, `STATION_SEQUENCES`, mode lists) before live calls.
- Cache status for about 30–60s. Do not poll arrivals faster than about 10–15s per stop.

## What you get

- **Friendly wrappers plus a raw escape hatch.** `client.line`, `client.stopPoint`, and the other modules for common work. `client.raw.*` for every REST endpoint.
- **Build-time metadata vs live data.** Line names, station sequences, branches, modes, and severity labels ship as constants (no network). Status, arrivals, journeys, and `getRouteSequence()` hit TfL at runtime.
- **Friendly detailed status.** `line.getDetailedStatus()` returns compact types (`DetailedLine`, `DetailedDisruption`, …) instead of TfL's generated `TflApiPresentationEntities*` names.
- **Zero runtime dependencies.** Node.js, browser, and edge.
- **UI helpers.** Official hex colours (`getLineInlineStyles`, `getLineCssProps`), severity sorting, accessibility labels.

```typescript
// Friendly wrapper
await client.line.getStatus({ lineIds: ['central'] });

// Raw escape hatch
await client.raw.line.statusByIds({ ids: ['central'] });
```

## Module index

| Module | Common work |
|--------|-------------|
| `client.line` | Status, disruptions, routes, arrivals by line, static `LINE_NAMES` / `STATION_SEQUENCES` |
| `client.stopPoint` | Search, arrivals, stop metadata |
| `client.journey` | Journey planning |
| `client.mode` | Mode lists and mode arrivals |
| `client.search` / `place` / `road` / `vehicle` / `occupancy` / `bikePoint` / `cabwise` / `travelTimes` | Supporting APIs |
| `client.raw` | Every REST endpoint (`pnpm exec tfl list` in a clone) |
| `client.realtime` | Instant-pull polling over REST arrivals |

Runnable console demos live in [playground/demo](playground/demo) after you clone the repo. Package consumers should use the snippets above, not `pnpm run demo`.

## Static station sequences

Tube, Elizabeth line, DLR, Overground, and Tram topology ships in the package. No credentials, no network:

```typescript
import { LINE_STATION_SEQUENCES } from 'tfl-ts';

const bakerloo = LINE_STATION_SEQUENCES.bakerloo;
const outbound = bakerloo.orderedRoutes.find(
  (route) => route.direction === 'outbound' && route.serviceType === 'Regular',
);

console.log(bakerloo.stations);
console.log(outbound?.stationIds);
console.log(bakerloo.branches);
```

Same data on the client: `client.line.STATION_SEQUENCES`. For a live TfL response use `client.line.getRouteSequence()`. Sequences contain identity, order, and branches only, not service status or arrivals.

## Detailed line status

When a UI needs validity periods, affected stops, or ordered affected route sections:

```typescript
const lines = await client.line.getDetailedStatus({
  lineIds: ['bakerloo'],
  dateRange: {
    startDate: '2026-08-08',
    endDate: '2026-08-10',
  },
});

for (const status of lines[0]?.statuses ?? []) {
  console.log(status.severityDescription);
  console.log(status.validityPeriods);
  console.log(status.disruption?.closureType);
  console.log(status.disruption?.affectedStops);
}
```

```typescript
import type {
  DetailedLine,
  DetailedLineStatus,
  DetailedDisruption,
  AffectedRoute,
  AffectedStop,
} from 'tfl-ts';
```

Use `line.getStatus({ detail: true })` or `client.raw.line.*` when you need the exact TfL field names.

## Line colours and severity helpers

```typescript
import {
  getLineColor,
  getLineInlineStyles,
  getLineCssProps,
  getLineDarkReadableStyles,
  sortLinesBySeverityAndOrder,
  getLineStatusSummary,
} from 'tfl-ts';

const { hex } = getLineColor('central'); // #E32017
const styles = getLineInlineStyles('central');
const cssProps = getLineCssProps('northern'); // dark-contrast CSS vars for black lines

const tube = await client.line.getStatus({ modes: ['tube'] });
const sorted = sortLinesBySeverityAndOrder(tube);
```

Northern defaults to `outline` dark contrast (keep brand black). Pass `{ darkContrastMode: 'white' }` for white fill/text. See [CHANGELOG.md](CHANGELOG.md) for 2.4.0 details.

## Live React boards

Polished status and arrivals UI lives in a separate repo so this package stays framework-agnostic:

[![Live TfL status board (light)](https://raw.githubusercontent.com/ghcpuman902/tfl-ts/main/docs/assets/status-board-light.png)](https://tfl-components.vercel.app/)
[![Live TfL status board (dark)](https://raw.githubusercontent.com/ghcpuman902/tfl-ts/main/docs/assets/status-board-dark.png)](https://tfl-components.vercel.app/)

Demo: [tfl-components.vercel.app](https://tfl-components.vercel.app) · Source: [ghcpuman902/tfl-components](https://github.com/ghcpuman902/tfl-components)

```bash
pnpm dlx shadcn@latest add https://tfl-components.vercel.app/r/tube-status-board.json
pnpm dlx shadcn@latest add https://tfl-components.vercel.app/r/tfl-roundel.json
```

The roundel ships a placeholder by default. Set `NEXT_PUBLIC_ALLOW_TFL_ROUNDEL=true` to render the official mark (you accept trademark responsibility).

Library → UI mapping (tube + bus): [examples/README.md](examples/README.md).

## Realtime (instant pull)

Poll arrivals with the same `app_key` as REST. No SignalR:

```typescript
const stop = client.realtime.pollArrivals(
  {
    stopPointIds: ['940GZZLUOXC'],
    sortBy: 'timeToStation',
    intervalMs: 30_000,
  },
  (arrivals, meta) => {
    console.log(`[tick ${meta.tick}]`, arrivals.length, 'predictions');
  },
  (error, meta) => console.error(meta.tick, error),
);

stop(); // cancel
```

See [docs/REALTIME.md](docs/REALTIME.md). In a clone: `pnpm run playground` → `/arrivals`.

## For AI agents and MCP

Prefer static constants before live requests.

| Resource | Purpose |
|----------|---------|
| [CLAUDE.md](CLAUDE.md) | Repo-level agent quick-start |
| [docs/agent.md](docs/agent.md) | Module reference, caching, Next.js patterns |
| [.claude/skills/tfl-ts/SKILL.md](.claude/skills/tfl-ts/SKILL.md) | Usage patterns and gotchas |
| [docs/mcp.md](docs/mcp.md) | Local MCP server |
| [CHANGELOG.md](CHANGELOG.md) | Release notes |

Local MCP (`tfl mcp`) is read-only, cached, and rate-limited. Static tools never call TfL:

```json
{
  "mcpServers": {
    "tfl-ts": {
      "command": "npx",
      "args": ["-y", "tfl-ts@latest", "mcp"],
      "env": {
        "TFL_APP_ID": "your-app-id",
        "TFL_APP_KEY": "your-app-key"
      }
    }
  }
}
```

Tools: `get_supported_modes`, `resolve_line_id`, `resolve_stop_id`, `get_line_status`, `get_arrivals`, `plan_journey`.

## Architecture

```
OpenAPI snapshot (committed)
  → types.ts        (swagger-typescript-api, types only)
  → raw.ts          (owned generator, uniform object-param API)
  → client.raw.*    (public escape hatch)
  → wrappers        (line, stopPoint, …)
```

`pnpm run build` compiles TypeScript only. No network, no regeneration. Migration notes: [docs/MIGRATION-v2.md](docs/MIGRATION-v2.md). Error handling: [ERROR.md](ERROR.md).

## Contributing

Clone the repo if you are changing generators or wrappers:

```bash
git clone https://github.com/ghcpuman902/tfl-ts.git
cd tfl-ts
pnpm install
pnpm run build
pnpm run test
```

Useful scripts: `pnpm run generate`, `pnpm run check:generated`, `pnpm run check:station-sequences`, `pnpm run playground`, `pnpm exec tfl list`. See [LLM_context.md](LLM_context.md) and [.cursor/skills/tfl-ts-maintainer/SKILL.md](.cursor/skills/tfl-ts-maintainer/SKILL.md).

## License

MIT. Not affiliated with Transport for London.

| | |
|--|--|
| npm | [tfl-ts](https://www.npmjs.com/package/tfl-ts) |
| GitHub | [ghcpuman902/tfl-ts](https://github.com/ghcpuman902/tfl-ts) |
| Issues | [Report bugs](https://github.com/ghcpuman902/tfl-ts/issues) |
| Live demo | [tfl-components.vercel.app](https://tfl-components.vercel.app) |
