---
name: tfl-ts-maintainer
description: Maintains the tfl-ts library — layered v2 architecture, OpenAPI snapshot generation, deterministic check:generated gate, wrapper patterns, and npm publish workflow. Use when editing generators, wrappers, src/generated, running check:generated/check:drift, preparing releases, or when the user asks how to build, generate, test, or publish tfl-ts.
---

# tfl-ts Maintainer

## Architecture (v2)

```
src/generated/openapi/tfl-v1.json     # committed snapshot (source of truth)
  → generate:types  → src/generated/types.ts
  → generate:raw    → src/generated/raw.ts + endpoints.ts
  → generate:jsdoc  → src/generated/jsdoc/*
  → generate:meta   → src/generated/meta/* (live TfL API; needs .env)
src/core/http.ts                      # stable transport — never regenerate
src/*.ts wrappers                     # friendly API; call this.raw.*
src/index.ts                          # TflClient { raw, realtime, line, … }
```

**Invariants agents must preserve:**
- `pnpm run build` = `tsc` only — never wire generation into `build`
- Wrappers import `./generated/types` and call `this.raw.<tag>.<method>()` — never depend on swagger-typescript-api client method shapes
- Every REST endpoint reachable via `client.raw.*` (84 operations)
- Generated code headers are deterministic; timestamps live only in `src/generated/generated.meta.json`

## Command reference

| Command | Purpose |
|---------|---------|
| `pnpm run build` | Compile only (fast, deterministic) |
| `pnpm run generate` | Full regen: types + raw + meta + jsdoc |
| `pnpm run generate:types` | types.ts via swagger-typescript-api `--no-client` |
| `pnpm run generate:raw` | raw.ts + endpoints.ts (owned generator) |
| `pnpm run generate:jsdoc` | jsdoc reference files |
| `pnpm run generate:meta` | Live TfL metadata (requires `TFL_APP_ID` / `TFL_APP_KEY`) |
| `pnpm run sync:spec` | Fetch live swagger → update snapshot + spec.meta.json |
| `pnpm run check:drift` | Compare committed snapshot vs live REST paths |
| `pnpm run check:generated` | Regenerate types/raw/jsdoc; git-diff gate |
| `pnpm run test` | Jest (raw reachability, transport mocks) |
| `pnpm exec tfl smoke` | Live API smoke (needs `.env`) |

## Regeneration workflow

**When TfL adds/removes REST endpoints:**
1. `pnpm run sync:spec`
2. `pnpm run generate`
3. Review diff — commit `types.ts`, `raw.ts`, `endpoints.ts`, `jsdoc/*`, `openapi/*`
4. Add/adjust friendly wrappers if needed (wrappers are hand-maintained)
5. `pnpm run test && pnpm run check:generated`

**When editing generators** (`script/generateRawClient.ts`, `script/generateJsdoc.ts`, `script/generateTypes.ts`):
1. Change generator script
2. `pnpm run generate:types && pnpm run generate:raw && pnpm run generate:jsdoc`
3. Commit regenerated artifacts + script changes together
4. Verify `pnpm run check:generated` passes twice in a row

**Never** embed `new Date()` in generated `.ts` output — use `script/generatedMeta.ts` → `generated.meta.json` for timestamps.

## generated.meta.json

Single file for all generation timestamps. Updated by each generator; **excluded** from `check:generated` git diff.

After `check:generated`, only this file may change when running a full intentional `pnpm run generate`. Verification (`check:generated`, `prepublishOnly`) sets `TFL_SKIP_GENERATED_META=1` so the file is not updated during drift checks — no manual `git checkout` before publish.

## Wrapper implementation pattern

```typescript
import { RawClient } from './generated/raw';
import type { TflApiPresentationEntitiesLine } from './generated/types';

export class Line {
  constructor(private readonly raw: RawClient) {}

  async getStatus(options: { lineIds?: string[]; detail?: boolean; keepTflTypes?: boolean }) {
    const { lineIds, detail, keepTflTypes } = options;
    if (lineIds?.length) {
      return this.raw.line.statusByIds({ ids: lineIds, detail, keepTflTypes });
    }
    return this.raw.line.status({ detail, keepTflTypes });
  }
}
```

- Use specific param names: `lineIds`, `stopPointIds` (not generic `ids` in public API)
- Use `string[]` for flexibility; document validation via metadata constants
- Never hardcode metadata — use `src/generated/meta/Meta.ts` etc.
- Read endpoint structure from `src/generated/jsdoc/<Module>.ts` (reference only, do not import in wrappers)

Raw naming: swagger `Line_StatusByIds` → `client.raw.line.statusByIds()`.

## Pre-publish checklist

```bash
pnpm run test
pnpm run check:generated
pnpm run build
# optional (network + .env):
pnpm run check:drift
pnpm exec tfl smoke
pnpm pack   # inspect tarball contents
```

`prepublishOnly` runs: `test` → `check:generated` → `build:dist`.

## Publish to npm

```bash
npm login && npm whoami
pnpm publish --dry-run
pnpm publish
git tag vX.Y.Z && git push origin vX.Y.Z
```

Bump `version` in `package.json` before publishing. Major bumps need `docs/MIGRATION-v2.md` updated.

## Common pitfalls

| Symptom | Cause | Fix |
|---------|-------|-----|
| `check:generated` fails after every run | Timestamps in generated `.ts` files | Use `generated.meta.json` only; keep code headers deterministic |
| `build` breaks all wrappers | `generate:types` ran during build | Keep `build` = `tsc`; run `generate` explicitly |
| Raw method not found | Wrong operation name | `pnpm exec tfl list --tag <tag>` |
| `generate:meta` fails | Missing credentials | `.env` with `TFL_APP_ID` / `TFL_APP_KEY` |

## Additional resources

- Architecture & migration: [docs/MIGRATION-v2.md](../../../docs/MIGRATION-v2.md)
- Realtime (deferred push): [docs/REALTIME.md](../../../docs/REALTIME.md)
- AI wrapper conventions: [LLM_context.md](../../../LLM_context.md)
- Detailed file map: [reference.md](reference.md)
