# tfl-ts Maintainer Reference

## Directory map

```
src/
├── core/http.ts              # TflHttpClient — auth, retry, timeout, stripTypes
├── generated/
│   ├── openapi/
│   │   ├── tfl-v1.json       # Committed OpenAPI snapshot
│   │   └── spec.meta.json    # sha256, fetchedAt, pathCount
│   ├── generated.meta.json   # Generation timestamps (excluded from drift check)
│   ├── types.ts              # swagger-typescript-api --no-client
│   ├── raw.ts                # RawClient — uniform object-param API
│   ├── endpoints.ts          # Registry (84 endpoints)
│   ├── jsdoc/                # AI/human reference — do not import in wrappers
│   ├── meta/                 # TfL metadata constants (from live API)
│   └── tfl.ts                # Deprecated re-export of types.ts
├── realtime/index.ts         # pollArrivals (REST polling only)
├── bin/tfl.ts                # CLI: raw, list, smoke
└── *.ts                      # 14 friendly wrapper modules

script/
├── generatedMeta.ts          # Writes generated.meta.json
├── generateTypes.ts          # types + record artifact meta
├── generateRawClient.ts      # raw.ts + endpoints.ts
├── generateJsdoc.ts          # jsdoc/*
├── generateMeta.ts           # meta/* (live API)
├── syncSpec.ts               # Fetch live swagger
├── checkDrift.ts             # Snapshot vs live paths
└── checkGenerated.ts         # Regenerate + git diff gate
```

## Generator ownership

| Output | Tool | Deterministic? |
|--------|------|----------------|
| `types.ts` | swagger-typescript-api 13.12.2 (pinned) | Yes (from snapshot) |
| `raw.ts`, `endpoints.ts` | `generateRawClient.ts` | Yes |
| `jsdoc/*` | `generateJsdoc.ts` | Yes |
| `meta/*` | `generateMeta.ts` | No (live API data) |
| `generated.meta.json` | `generatedMeta.ts` | No (timestamps) — excluded from check |

## check:generated internals

1. Runs `generate:types`, `generate:raw`, `generate:jsdoc`
2. `git diff --name-only src/generated`
3. Ignores `src/generated/generated.meta.json`
4. Fails if any other generated file differs from committed copy

## sync:spec + check:drift

- `sync:spec`: maintainer-only; fetches `https://api.tfl.gov.uk/swagger/docs/v1`
- `check:drift`: compares path keys in committed snapshot vs live; exits 1 if added/removed

Realtime (SignalR, URA stream) is **not** in OpenAPI — see `docs/REALTIME.md`.

## Test coverage expectations

- `basic.test.ts`: all 14 modules, `client.raw`, every endpoint in `ENDPOINTS` reachable
- `http.test.ts`: auth query params, stripTypes, retry, errors
- `realtime.test.ts`: pollArrivals subscribe/unsubscribe

## Commit message style

Recent examples:
- `refactor: migrate to v2 architecture with layered design…`
- `fix: centralize generation timestamps in generated.meta.json`

Use conventional commits: `feat`, `fix`, `chore`, `docs`. Focus on **why** in the body.

## npm package contents

Published via `package.json` `files`: `dist/`, `README.md`, `LICENSE`, `docs/`.

Generator scripts under `script/` are **not** published. `dist/generated/generated.meta.json` is included when imported by `road.ts`.

## 14 wrapper modules

`line`, `stopPoint`, `journey`, `mode`, `road`, `bikePoint`, `cabwise`, `accidentStats`, `airQuality`, `search`, `vehicle`, `occupancy`, `place`, `travelTimes`

Each constructor receives `RawClient`, not a generated API class.
