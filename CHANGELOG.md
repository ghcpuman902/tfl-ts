# Changelog

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
