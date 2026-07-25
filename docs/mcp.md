# Local MCP server

tfl-ts includes a small, read-only MCP server for coding agents. It runs on the user's machine and uses the user's own TfL API credentials.

## Configure

Register free credentials at [api-portal.tfl.gov.uk](https://api-portal.tfl.gov.uk/), then add this server to your MCP client:

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

The process communicates over stdio. It does not open a network port or send credentials anywhere except the official TfL API.

## Tools

| Tool | Network call | Local cache |
|------|--------------|-------------|
| `get_supported_modes` | No | Bundled metadata |
| `resolve_line_id` | No | Bundled metadata |
| `resolve_stop_id` | Yes | 24 hours |
| `get_line_status` | Yes | 60 seconds |
| `get_arrivals` | Yes | 15 seconds |
| `plan_journey` | Yes | 2 minutes |

The server intentionally exposes a small tool set instead of all raw TfL endpoints. This reduces tool-selection noise and discourages broad, accidental API requests.

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
    "TFL_APP_ID": "your-app-id",
    "TFL_APP_KEY": "your-app-key",
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
TFL_APP_ID=your-app-id TFL_APP_KEY=your-app-key npx -y tfl-ts@latest mcp
```

Manual execution waits for JSON-RPC messages on stdin, so no normal console output is expected.

See also [CHANGELOG.md](../CHANGELOG.md) (2.3.3) and [docs/agent.md](./agent.md).

