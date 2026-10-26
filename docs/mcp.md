# Local MCP server

tfl-ts includes a small, read-only MCP server for coding agents. It runs on the user's machine and uses the user's own TfL API credentials.

## Configure

Register at [api-portal.tfl.gov.uk](https://api-portal.tfl.gov.uk/), subscribe to "500 Requests per min", then add this server to your MCP client:

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

The process communicates over stdio. It does not open a network port or send credentials anywhere except the official TfL API.

## How the process starts

The package publishes one binary, `tfl`, at `./dist/cjs/bin/tfl.js` (the compile of `src/bin/tfl.ts`). `npx -y tfl-ts@latest mcp` installs the package and runs that binary with the argument `mcp`.

`dispatchCli` treats `mcp` as a subcommand and calls `startTflMcpServer()` in `src/mcp/server.ts`. The process reads one JSON-RPC message per line from stdin and writes one JSON response per line to stdout.

The official MCP Registry reads root `server.json`. Its `name` is `io.github.ghcpuman902/tfl-ts`, the same string as `package.json` `mcpName`. The packages entry is registry type `npm`, identifier `tfl-ts`, this package's version, transport `stdio`, and a positional argument `mcp` (the subcommand above). `registryBaseUrl` is `https://registry.npmjs.org`.

Environment variables the running server actually reads:

| Variable | Required | Role |
|----------|----------|------|
| `TFL_APP_KEY` | For live tools | TfL primary key. `TflClient` throws `TflConfigError` when it is missing. Static tools (`docs`, `resolve_line_id`, `get_supported_modes`) never construct a client. |
| `TFL_MCP_MIN_INTERVAL_MS` | No | Minimum milliseconds between outbound TfL requests. Default `250`. A non-numeric value falls through to that default (`Number(value) || 250`). Cache hits do not wait. |
| `TFL_APP_ID` | No | `TflClient` still reads it, then warns and ignores it. TfL has not required an app id since January 2021. Leave it unset. |

## Tools

| Tool | Network call | Local cache |
|------|--------------|-------------|
| `get_supported_modes` | No | Bundled metadata |
| `resolve_line_id` | No | Bundled metadata |
| `docs` | No | Bundled Markdown (`DOC_MANIFEST`) |
| `resolve_stop_id` | Yes | 24 hours |
| `get_line_status` | Yes | 60 seconds |
| `get_arrivals` | Yes | 15 seconds |
| `plan_journey` | Yes | 2 minutes |

Every tool has a `title` and annotations `readOnlyHint: true`, `destructiveHint: false`, `idempotentHint: true`. `openWorldHint` is `false` for the three offline tools and `true` for the four that call TfL.

The server has no resources or prompts. `resources/list`, `resources/templates/list` and `prompts/list` return empty arrays.

The server intentionally exposes a small tool set instead of all raw TfL endpoints. This reduces tool-selection noise and discourages broad, accidental API requests.

### Offline `docs` tool

`docs` is the MCP face of `tfl docs`. It needs no `TFL_APP_KEY` and never calls TfL. One tool, four operations:

| `operation` | Required input | Notes |
|-------------|----------------|-------|
| `list` | — | Full catalogue: id, title, audience |
| `find` | `query` | Ranked id/title/audience, then body. Capped at 20. |
| `read` | `id` | Line slice. Defaults: `offset` 0, `limit` 80 (max 200). Returns `totalLines`, `truncated`, `nextOffset`. |
| `grep` | `pattern` | Literal substring. Optional `caseInsensitive`. Match pagination via `offset` / `limit` (default 50). Returns `totalMatches`, `truncated`, `nextOffset`. |

```json
{ "operation": "find", "query": "caching" }
{ "operation": "read", "id": "docs/agent.md", "offset": 0, "limit": 80 }
{ "operation": "grep", "pattern": "STATION_HUBS", "caseInsensitive": true }
```

Unknown ids, empty queries, no matches, and invalid pagination return a tool error (`isError: true`) whose text is JSON `{ "code", "message", "fix" }` with codes such as `TFL_DOCS_UNKNOWN_ID`, `TFL_DOCS_NOT_FOUND`, and `TFL_DOCS_INVALID_ARGUMENT`. Live tools use the same JSON shape (`TFL_MCP_INVALID_ARGUMENT`, `TFL_MCP_MISSING_APP_KEY`, `TFL_MCP_UPSTREAM`). The `message` field keeps the previous English sentence; parse the JSON rather than matching the raw text as a plain string. Do not request the whole of `ERROR.md` in one read; follow `nextOffset`.

`get_line_status` requires `lineIds` or `modes` in its schema (`anyOf`). An empty argument object is invalid.

`docs` advertises `anyOf` per operation: `list` needs only `operation`; `read` needs `id`; `find` needs `query`; `grep` needs `pattern`. MCP `serverInfo.version` is `1.4.1`.

## Response shape (agent-friendly)

Live and static tools return **compact JSON**, not raw TfL payloads. Every response includes:

- `summary` — short plain-text lines an agent can quote directly
- Structured fields (`lines`, `arrivals`, `matches`, `journeys`, …)
- For live tools: `cacheHit` and `fetchedAt`

Example status summary:

```text
Central: Severe Delays — earlier faulty train at Hainault
Victoria: Minor Delays — earlier customer incident
```

Use `issuesOnly: true` on `get_line_status` to hide Good Service lines. Use `modes: ["tube"]` on `resolve_line_id` to avoid national-rail name collisions (e.g. Central vs Grand Central).

This is better for agents than ASCII-only boards: models can read `summary` for humans and still use fields like `minutes` or `id` without re-parsing tables.

## Rate-limit behavior

Using a local server means each user supplies their own TfL key, but TfL still applies limits to that key. The server therefore:

- Spaces outbound requests by at least 250ms by default
- Combines simultaneous identical requests
- Caches responses using data-appropriate TTLs
- Requires a line or mode filter for line-status requests
- Limits returned search and arrival results

Override the minimum interval if your TfL agreement requires a lower request rate:

```json
{
  "env": {
    "TFL_APP_KEY": "your-primary-key",
    "TFL_MCP_MIN_INTERVAL_MS": "1000"
  }
}
```

`1000` allows at most one new outbound request per second from this server process. Cache hits do not count as outbound requests.

## Security

- Keep credentials in the MCP client's environment configuration; do not commit them.
- The server is read-only and does not modify TfL or project state.
- Live calls go only through the tfl-ts HTTP client to `https://api.tfl.gov.uk/`.
- Tool arguments are validated before use.
- Stop the local process to clear its in-memory cache.

## Run manually

```bash
TFL_APP_KEY=your-primary-key npx -y tfl-ts@latest mcp
```

Manual execution waits for JSON-RPC messages on stdin, so no normal console output is expected.

See also [CHANGELOG.md](../CHANGELOG.md) and [docs/agent.md](./agent.md).

