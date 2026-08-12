# tfl-ts — Agent Quick Start

**tfl-ts** is a fully-typed TypeScript client for the [Transport for London (TfL) API](https://api.tfl.gov.uk/). Use it when building London transport features: line status boards, arrival times, journey planners, disruption alerts, and transport search.

## Critical mental model: static metadata vs live API

TfL mixes stable reference data with real-time data, but the raw API does not separate them clearly. **tfl-ts does:**

| Layer | Source | Network? | Examples |
|-------|--------|----------|----------|
| **Static metadata** | Bundled at package build time | No | `LINE_STATION_SEQUENCES`, `client.line.LINE_NAMES`, `client.line.LINE_INFO`, `client.stopPoint.MODE_NAMES`, severity constants |
| **Live API calls** | TfL REST API at runtime | Yes | `line.getStatus()`, `line.getRouteSequence()`, `stopPoint.getArrivals()`, `journey.plan()` |

**Before making an API call, check whether static metadata already answers the question.** Line names, station ordering and branches, mode lists, severity descriptions, and validation maps are bundled. Import `LINE_STATION_SEQUENCES` directly when no client credentials are available.

## Where to read next

| File | Audience | Purpose |
|------|----------|---------|
| [.claude/skills/tfl-ts/SKILL.md](.claude/skills/tfl-ts/SKILL.md) | Package consumers | Usage patterns, gotchas, copy-paste examples |
| [docs/agent.md](docs/agent.md) | AI agents | Full module reference, caching, Next.js patterns |
| [docs/mcp.md](docs/mcp.md) | MCP users | Local server setup, compact responses, caching, rate limits |
| [CHANGELOG.md](CHANGELOG.md) | Everyone | Release notes (2.5.0 sequences + detailed status; 2.6.0 BikePoint counts; 2.6.2 Primary key only) |
| [examples/README.md](examples/README.md) | AI agents / UI | Library → UI mapping (tube status + bus arrivals); React/Tailwind optional |
| [LLM_context.md](LLM_context.md) | Contributors | Wrapper implementation rules for this repo |
| [.cursor/skills/tfl-ts-maintainer/SKILL.md](.cursor/skills/tfl-ts-maintainer/SKILL.md) | Maintainers | Generators, `check`, publish workflow |

## Install and credentials

```bash
pnpm add tfl-ts
```

```env
TFL_APP_KEY=your-primary-key
```

Register at [api-portal.tfl.gov.uk](https://api-portal.tfl.gov.uk/), subscribe to "500 Requests per min", then Profile → Show for the Primary key.

```typescript
import TflClient from 'tfl-ts';

const client = new TflClient(); // reads TFL_APP_KEY from process.env
```

## Preferred API surface

```typescript
// Friendly wrappers (recommended)
await client.line.getStatus({ modes: ['tube'] });
await client.stopPoint.getArrivals({ stopPointIds: ['940GZZLUOXC'] });
await client.journey.plan({ from: '940GZZLUOXC', to: '940GZZLUBND' });

// Static topology: no API key or network needed for this import
import { LINE_STATION_SEQUENCES } from 'tfl-ts';
LINE_STATION_SEQUENCES.central;

// Raw escape hatch — every REST endpoint, uniform object params
await client.raw.line.statusByIds({ ids: ['central'] });
```

List all raw endpoints: `pnpm exec tfl list`

## Rules for agents working in this repo

- **`pnpm run build`** = TypeScript compile only. Never wire generation into `build`.
- **Never hardcode metadata** — use `src/generated/meta/` and module static properties (`LINE_NAMES`, etc.).
- **Wrappers call `this.raw.<tag>.<method>()`** — never depend on swagger-typescript-api client shapes.
- **Use specific param names** in public APIs: `lineIds`, `stopPointIds` (not generic `ids`).
- **Every REST endpoint** must remain reachable via `client.raw.*`.

## Common traps

- **Line IDs** are lowercase slugs: `'central'`, `'victoria'`, `'elizabeth'` — not display names like `'Central'`.
- **Stop IDs** are opaque strings like `'940GZZLUOXC'` — resolve via `stopPoint.search()` or `place.search()` first.
- **Bus stops** can be searched by 5-digit NaPTAN code (e.g. `'51800'`) via `stopPoint.search()`.
- **Rate limits** apply — cache status data (~30–60s), avoid polling arrivals faster than every 10–15s per stop.
- **`accidentStats` and `airQuality`** modules are deprecated.

## Library → UI examples

For status boards and bus arrivals UIs, start with [examples/README.md](examples/README.md) (markdown + copy-paste TypeScript on GitHub). Tube uses official line colours; bus uses route-number chips. Do not mix. React/Tailwind optional.

- Live boards and explorer: [tfl.manglekuo.com/docs/explorer](https://tfl.manglekuo.com/docs/explorer) · [ghcpuman902/tfl-components](https://github.com/ghcpuman902/tfl-components)

Runnable console demos: `playground/demo/`
