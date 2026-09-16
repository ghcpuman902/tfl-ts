# tfl-ts — Agent Quick Start

**tfl-ts** is a fully-typed TypeScript client for the [Transport for London (TfL) API](https://api.tfl.gov.uk/). Use it when building London transport features: line status boards, arrival times, journey planners, disruption alerts, and transport search.

## Critical mental model: static metadata vs live API

TfL mixes stable reference data with real-time data, but the raw API does not separate them clearly. **tfl-ts does:**

| Layer | Source | Network? | Examples |
|-------|--------|----------|----------|
| **Static metadata** | Bundled at package build time | No | `LINE_STATION_SEQUENCES`, `STATION_HUBS`, `client.line.LINE_NAMES`, `client.line.LINE_INFO`, `client.stopPoint.MODE_NAMES`, severity constants |
| **Live API calls** | TfL REST API at runtime | Yes | `line.getStatus()`, `line.getRouteSequence()`, `stopPoint.getArrivals()`, `journey.plan()` |

**Before making an API call, check whether static metadata already answers the question.** Line names, station ordering and branches, mode lists, severity descriptions, and validation maps are bundled. Import `LINE_STATION_SEQUENCES` from `tfl-ts/meta` when no client credentials are available. Client Components should import colours from `tfl-ts/ui`, not from `'tfl-ts'`.

## Where to read next

This file and the shipped docs below are readable offline once the package is installed: `npx tfl-ts docs cat CLAUDE.md`. Run `npx tfl-ts docs ls` for the full catalogue, `docs find <query>` to locate the right file (id, title, audience, then body), and `docs grep <pattern>` to search all of them. The local MCP `docs` tool uses the same catalogue.

### Shipped (`tfl docs` / MCP `docs`)

| File | Audience | Purpose |
|------|----------|---------|
| [AGENTS.md](AGENTS.md) | Any agent/tool that looks for `AGENTS.md` | Self-contained quick start |
| [CLAUDE.md](CLAUDE.md) | Claude Code / any agent | This file — fuller quick start |
| [README.md](README.md) | Humans and agents installing the package | Install, examples, MCP snippet |
| [.claude/skills/tfl-ts/SKILL.md](.claude/skills/tfl-ts/SKILL.md) | Package consumers | Usage patterns, gotchas, copy-paste examples |
| [docs/agent.md](docs/agent.md) | AI agents | Full module reference, caching, Next.js patterns |
| [docs/mcp.md](docs/mcp.md) | MCP users | Local server setup, compact responses, caching, rate limits |
| [docs/design/agent-friendly-cli.md](docs/design/agent-friendly-cli.md) | Maintainers | Why `tfl docs`, `AGENTS.md`, and MCP `docs` exist |
| [docs/design/evals.md](docs/design/evals.md) | Maintainers | Why `pnpm run eval` is a rate, not a Jest gate |
| [CHANGELOG.md](CHANGELOG.md) | Everyone | Release notes (2.15.0 offline `tfl check` + JSON `tfl list`; 2.14.0 docs root + CLI exit codes; 2.13.1 native ESM load; 2.13.0 tree-shake `tfl-ts/ui` + `tfl-ts/meta`) |
| [examples/README.md](examples/README.md) | AI agents / UI | Library → UI mapping (tube status + bus arrivals); React/Tailwind optional |
| [ERROR.md](ERROR.md) | Anyone handling failures | Error shapes |
| [docs/REALTIME.md](docs/REALTIME.md) | Agents building live boards | Polling vs deferred push |
| [docs/MIGRATION-v2.md](docs/MIGRATION-v2.md) | Upgraders | v1 → v2 |

### Repo only (clone; not in `tfl docs`)

| File | Audience | Purpose |
|------|----------|---------|
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

// Static topology: no API key or network needed for these imports
import { LINE_STATION_SEQUENCES, STATION_HUBS, resolveArrivalsStopId, Lines } from 'tfl-ts/meta';
import { getLineColor } from 'tfl-ts/ui';
LINE_STATION_SEQUENCES.central;
const hub = STATION_HUBS['940GZZLULVT']; // Liverpool Street, any sibling id works
resolveArrivalsStopId(hub, 'elizabeth'); // '910GLIVST' — the id that actually carries arrivals

// Raw escape hatch — every REST endpoint, uniform object params
await client.raw.line.statusByIds({ ids: ['central'] });
```

List all raw endpoints as JSON: `pnpm exec tfl list`. Prose form: `tfl list --text`. Validate slugs offline (no key): `pnpm exec tfl check --line central,Central`.

Read a shipped doc offline: `pnpm exec tfl docs cat <id>` (e.g. `docs/mcp.md`). Search with `pnpm exec tfl docs find <query>` / `docs grep <pattern>`. The MCP `docs` tool is the same catalogue.

## Rules for agents working in this repo

- **`pnpm run build`** = TypeScript compile only (CJS `dist/cjs` + ESM `dist/esm`). Never wire generation into `build`.
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
- **Third-party National Rail arrivals aren't live** — `STATION_HUBS` tracks operators like Southeastern and South Western Railway for topology, but TfL's Arrivals API returns an empty array (not an error) for them; only tube, DLR, tram, Overground, Elizabeth line, bus, and river-bus have live predictions.
- **River-bus arrivals are on the pier, not the berth** — poll `NaptanFerryPort` (`930G…`). Berths (`9300…`) and `StopPoint/Mode/river-bus` return empty. Piers are not in `STATION_HUBS`.
- **Stop compass is `CompassPoint`, not Prediction `bearing`.** `get` / `getByGeoPoint` lift `towards`, `compassPoint`, `compassBearingDegrees`, and `smsCode`. A painted stop letter `W` is not west.

## Library → UI examples

For status boards and bus arrivals UIs, start with [examples/README.md](examples/README.md) (markdown + copy-paste TypeScript on GitHub). Tube uses official line colours; bus uses route-number chips. Do not mix. React/Tailwind optional.

- Live boards and explorer: [tfl.manglekuo.com/docs/explorer](https://tfl.manglekuo.com/docs/explorer) · [ghcpuman902/tfl-components](https://github.com/ghcpuman902/tfl-components)

Runnable console demos: `playground/demo/`
