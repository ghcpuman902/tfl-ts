# Changelog

## 2.6.1 — 2026-08-11

### Packaging, docs, and maintain tooling

- Ship `ERROR.md` in the npm tarball so linked error docs resolve for package consumers.
- Collapse maintain scripts into `generate`, `check`, and `demo` with `--only` / target args; `prepublishOnly` and CI use `pnpm run check`.
- Remove paste-in UI board examples and the local Express playground board; point readers at [tfl-components](https://github.com/ghcpuman902/tfl-components) and the [API explorer](https://tfl.manglekuo.com/docs/explorer).
- Rewrite the README for first-success (v2.6.1 tagline, screenshots above the fold, Node / Next.js / MCP lanes).
- Add GitHub Actions CI on `main` (`build`, `test`, `check`).

No runtime API changes.

## 2.6.0 — 2026-08-10

### Fix BikePoint e-bike / classic bike counts

Live `/BikePoint` payloads expose classic and electric availability as `NbStandardBikes` and `NbEBikes`. Status extraction previously looked up the unprefixed `StandardBikes` / `EBikes` keys, so `standardBikes` and `eBikes` were almost always `0` even when `bikes` was correct (for example Pennington Street showing 13 bikes total but `0` / `0` in the split).

`extractStatus` and `findElectricBikes` now prefer the live `Nb*` keys and still accept the unprefixed names as a fallback. `PROPERTY_KEYS` documents the live keys.

## 2.5.0 — 2026-08-09

### Static station sequences

`LINE_STATION_SEQUENCES` and `client.line.STATION_SEQUENCES` provide station IDs, station names, ordered routes, directions, service types, and branch relationships. The committed topology covers Tube, Elizabeth line, DLR, London Overground, and Tram. Importing `LINE_STATION_SEQUENCES` needs neither TfL credentials nor a live internet connection. The data contains no service status, disruption, validity, or arrival information.

`line.getRouteSequence()` remains the explicitly live API. Consumers can update `tfl-ts` when they want a newer permanent network topology, or call the live method when they need TfL's current response.

The new `generate:station-sequences` command builds the constants from TfL route sequences in memory and validates every included line before replacing the committed file. Empty or malformed responses fail generation and leave the previous snapshot intact. `check:station-sequences` validates the committed snapshot locally without contacting TfL and now runs before publish.

### Fix dated `line.getStatus` 404

TfL's `/Line/{ids}/Status/{startDate}/to/{endDate}` endpoint returns **404** when the same `startDate`/`endDate` values are also sent as query parameters. The generated raw client no longer duplicates path dates into the query string (and the generator skips query params that share names with path params). `client.line.getStatus({ lineIds, dateRange, detail: true })` works again.

### Friendly detailed line status

`line.getDetailedStatus()` requests `detail=true` and returns a compact model with short, stable names. Consumers can use `DetailedLine`, `DetailedLineStatus`, `DetailedDisruption`, `AffectedRoute`, and `AffectedStop` without importing TfL's generated `TflApiPresentationEntities*` types.

The mapper renames common fields such as `statusSeverity` to `severity`, `validityPeriods[].fromDate` to `from`, `closureText` to `closureType`, and route `originationName` to `originName`. Missing TfL arrays become empty arrays, which removes repetitive guards in application code.

`getStatus()` and `client.raw.line.*` still return the exact generated TfL response. `mapDetailedLines()` is exported for callers that already have a detailed raw response.

### README rewrite

The package README leads with install and three short recipes (status, arrivals, journey), then gotchas, module index, and the new APIs. Architecture, agents, and MCP sit below the fold. Contributing commands are separated from the consumer path.

## 2.4.0 — 2026-08-07

### Northern dark-contrast modes

`getLineCssProps` and `getLineDarkReadableStyles` accept `{ darkContrastMode: 'outline' | 'white' }` (default `outline`).

- **outline:** keep brand black; expose `--line-dark-text-stroke` / `--line-dark-paint-order` for outside text stroke, plus existing hard text/box shadow rings as fallback.
- **white:** opt into white fill/text on dark surfaces (`--line-dark-fill` / `--line-dark-text`), clear stroke and shadows; chip labels use `--line-dark-on-fill`.

`--line-color` remains the official brand hex in both modes. Additive CSS vars for lines without poor dark contrast are harmless no-ops.

## 2.3.3 — 2026-07-25

### IDE autocomplete for wrapper inputs

JSDoc `@example` blocks never drove Tab completion, and public options typed as plain `string` / `string[]` gave IntelliSense nothing to suggest — so `modes: ['|']` felt broken even when `ModeName` already existed in the package.

Wrapper inputs now use open unions (`ModeInput`, `LineIdInput`, `ServiceTypeInput` via `AutocompleteString<T>`): known literals complete in the IDE, unknown strings (including bus route numbers) still type-check. Line ID suggestions use named/slug lines only so the list is not flooded with hundreds of bus numbers.

Fixed-shape methods also gain positional overloads alongside the options-object form (`getStopPoints('central')`, `plan(from, to)`, `search(query)`, …). With `typescript.suggest.completeFunctionCalls`, Tab can place real argument placeholders instead of a single opaque `options` bag.

Object-param call sites remain valid; this is additive.

### Journey plan disambiguation (HTTP 300)

Ambiguous `from` / `to` / `via` values make TfL respond with HTTP 300 and a disambiguation body. That path now goes through `TflHttpError` and returns options on `JourneyResult.disambiguation` instead of treating 300 as a failed fetch of a raw `Response`. Covered by unit tests; the journey playground demo prints the option list more consistently.

### `line.get()` requires `lineIds` or `modes`

Calling `line.get()` with no filters hit `/Line/` with an empty id list and came back as a confusing 404. TfL has no unfiltered “all lines” list endpoint. The method now throws `TflValidationError` and tells you to pass `modes` / `lineIds`, or use `LINE_NAMES` / `LINE_INFO` for the static catalogue.

### AccidentStats marked as retiring

TfL’s Unified API tidy-up retires `/AccidentStats/{year}` on 31 July 2026; the feed only ever covered 2005–2019. Module docs and the playground demo say so plainly, probe 2019 as best-effort, and treat upstream failure as expected rather than a broken wrapper.

### Playground demos tolerate flaky TfL endpoints

Live demos for occupancy, place, travelTimes, and line no longer dump stack traces and exit 1 when TfL returns 500/400 on optional calls. They print a short warning and continue so a full demo sweep stays readable.

### Cleaner publish / test output

Realtime poller tests now use the default 30s interval (and matching fake-timer advances) instead of 1s, so they no longer trip the “below recommended TTL” warning. Package scripts chain with `pnpm run` rather than `npm run`, which stops pnpm’s store/registry settings being passed into npm as unknown config during `prepublishOnly`.

## 2.3.2 — 2026-07-25

### Local MCP server

Coding agents often need live TfL data without inventing their own HTTP client. A hosted MCP would share one API key across users and burn rate limits. This release adds a small read-only MCP server inside the package: `tfl mcp` over stdio, using each user's own `TFL_APP_ID` / `TFL_APP_KEY`.

The tool set is intentionally small (`get_supported_modes`, `resolve_line_id`, `resolve_stop_id`, `get_line_status`, `get_arrivals`, `plan_journey`). Tools return compact JSON with a plain-text `summary` field, not raw TfL payloads. Live calls are cached, duplicate in-flight requests are combined, and outbound traffic is spaced (default 250ms; override with `TFL_MCP_MIN_INTERVAL_MS`).

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

Details: [docs/mcp.md](docs/mcp.md).

### Agent-facing docs and examples

TfL mixes stable reference data with live operational data, but the raw API does not draw that line. Agents that treat every question as an HTTP call waste quota and invent wrong IDs.

This release adds:

- [CLAUDE.md](CLAUDE.md) and [.claude/skills/tfl-ts/SKILL.md](.claude/skills/tfl-ts/SKILL.md) for the static-vs-live model, traps, and copy-paste patterns
- [docs/agent.md](docs/agent.md) for module reference, caching TTLs, and Next.js usage
- [examples/](examples/) for library → UI mapping (tube status boards and bus arrivals)
- README pitch clarifying wrappers vs raw, static metadata vs live data, and UI helpers

npm keywords now include `mcp`, `claude-skill`, `ai-agent`, and related terms.

### Playground status and arrivals boards

The local HTML playground (`pnpm run playground`) uses official line colours and bus route chips for `/status` and `/arrivals`, aligned with the examples mapping docs.
