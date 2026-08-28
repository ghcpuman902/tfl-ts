# AGENTS.md

tfl-ts is a typed TypeScript client for the [Transport for London (TfL) API](https://api.tfl.gov.uk/). Use it for line status boards, arrival times, journey planners, disruption alerts, and transport search.

Claude Code also loads [CLAUDE.md](./CLAUDE.md), which is the longer form of this file. Other agents should treat **this** file as enough to start.

## Static metadata vs live API

TfL mixes stable reference data with real-time data. tfl-ts splits them:

- **Static (no network):** `LINE_STATION_SEQUENCES`, `STATION_HUBS`, `client.line.LINE_NAMES`, `client.line.LINE_INFO`, `client.stopPoint.MODE_NAMES`, severity tables. Import these when you only need names, order, or ID checks.
- **Live (network):** `line.getStatus()`, `stopPoint.getArrivals()`, `journey.plan()`, and the rest of the wrappers. These need `TFL_APP_KEY`.

Check static metadata before you call the API.

## Credentials

```env
TFL_APP_KEY=your-primary-key
```

Register at [api-portal.tfl.gov.uk](https://api-portal.tfl.gov.uk/), subscribe to "500 Requests per min", then Profile → Show for the Primary key.

```typescript
import TflClient, { LINE_STATION_SEQUENCES, STATION_HUBS, resolveArrivalsStopId } from 'tfl-ts';

const client = new TflClient(); // reads TFL_APP_KEY from process.env

await client.line.getStatus({ modes: ['tube'] });
await client.stopPoint.getArrivals({ stopPointIds: ['940GZZLUOXC'] });
await client.raw.line.statusByIds({ ids: ['central'] });
```

Line IDs are lowercase slugs (`central`, not `Central`). Stop IDs look like `940GZZLUOXC`.

## Offline docs (no clone, no API key)

The same catalogue is on the CLI and on the local MCP `docs` tool:

```bash
npx tfl-ts docs ls
npx tfl-ts docs cat AGENTS.md
npx tfl-ts docs find caching
npx tfl-ts docs grep -i STATION_HUBS
```

`find` searches id, title, audience, then document body. `grep` is a literal substring.

## Rules if you are working in this repo

- **`pnpm run build`** compiles TypeScript only. Never wire generation into `build`.
- Wrappers call `this.raw.<tag>.<method>()`. Keep every REST endpoint on `client.raw`.
- Use `lineIds` / `stopPointIds` in public wrappers, not generic `ids`.

## Deeper docs

Shipped with the package (`tfl docs cat` / MCP `docs` read): [CLAUDE.md](./CLAUDE.md), [docs/agent.md](docs/agent.md), [docs/mcp.md](docs/mcp.md), [examples/README.md](examples/README.md), [ERROR.md](ERROR.md).

Repo only: [LLM_context.md](LLM_context.md), [.cursor/skills/tfl-ts-maintainer/SKILL.md](.cursor/skills/tfl-ts-maintainer/SKILL.md).
