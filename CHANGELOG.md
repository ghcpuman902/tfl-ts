# Changelog

## Unreleased

### IDE autocomplete for wrapper inputs

JSDoc `@example` blocks never drove Tab completion, and public options typed as plain `string` / `string[]` gave IntelliSense nothing to suggest — so `modes: ['|']` felt broken even when `ModeName` already existed in the package.

Wrapper inputs now use open unions (`ModeInput`, `LineIdInput`, `ServiceTypeInput` via `AutocompleteString<T>`): known literals complete in the IDE, unknown strings (including bus route numbers) still type-check. Line ID suggestions use named/slug lines only so the list is not flooded with hundreds of bus numbers.

Fixed-shape methods also gain positional overloads alongside the options-object form (`getStopPoints('central')`, `plan(from, to)`, `search(query)`, …). With `typescript.suggest.completeFunctionCalls`, Tab can place real argument placeholders instead of a single opaque `options` bag.

Object-param call sites remain valid; this is additive.

### Journey plan disambiguation (HTTP 300)

Ambiguous `from` / `to` / `via` values make TfL respond with HTTP 300 and a disambiguation body. That path now goes through `TflHttpError` and returns options on `JourneyResult.disambiguation` instead of treating 300 as a failed fetch of a raw `Response`. Covered by unit tests; the journey playground demo prints the option list more consistently.

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
