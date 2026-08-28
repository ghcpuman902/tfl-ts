# Design note: adopting vgpu's offline-docs CLI pattern

Audience: maintainers. This records *why* tfl-ts gained a `tfl docs` CLI command and an `AGENTS.md` file, based on reading another agent-first library's source code, and which of its other ideas were deliberately **not** adopted.

## Source case study: vgpu

[vgpu](https://github.com/vercel-labs/vgpu) is a WebGPU library that spent about seven months iterating on the idea that "a dream API optimized purely for human developers fails when coding agents are the primary users" ([vgpu.sh](https://vgpu.sh)). Its README states the thesis directly:

> Agent-ready. Docs, the example gallery, and shader validation all run from the CLI (`npx vgpu docs`, `npx vgpu examples`, `npx vgpu check`), and vgpu.sh publishes `agents.md` and `llms.txt` for LLM consumption.
> — [`README.md`](https://github.com/vercel-labs/vgpu/blob/main/README.md)

Reading the actual CLI entry point confirms the shape of that claim, not just the marketing copy:

```1:17:packages/vgpu/bin/vgpu.js (vercel-labs/vgpu)
#!/usr/bin/env node
import { readFileSync, realpathSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runCheck } from "../lib/check/run.js";
import { runDocs } from "../lib/docs/run.js";
import { runDoctor } from "../lib/doctor/run.js";
import { runInstallDawn } from "../lib/install-dawn/run.js";
import { runInstallSoftwareRenderer } from "../lib/install-software-renderer/run.js";
import { runSnapshotCommand } from "../lib/snapshot/run.js";
import { runExamples } from "../lib/examples/run.js";
```

And the documented command surface ([`docs/topics/cli.docs.md`](https://github.com/vercel-labs/vgpu/blob/main/docs/topics/cli.docs.md)):

| vgpu command | What it does |
|---|---|
| `vgpu docs ls / cat / grep / find / path / symbols` | Browse the full API reference and guides **offline** — "the full corpus... ships inside the package, so every query runs locally and works offline." |
| `vgpu check <file.wgsl>` | Validate + reflect a shader without a browser or GPU. |
| `vgpu examples search / show / cat / pull` | Discover and copy canonical example source without cloning the repo. |
| `vgpu doctor` | JSON verdict on whether headless rendering will work here. |
| `vgpu mcp` | Serve the same docs/examples over stdio MCP tools. |

The published [`llms.txt`](https://vgpu.sh/llms.txt) reinforces the same idea one layer up: it gives an agent a ranked list of small, fetchable Markdown pages instead of one large document, and explicitly tells the agent to "fetch the full export only when a task requires broad repository context."

The common thread across all of this is **lesson 3 from the source material this PR was scoped from**: agents need fast, non-browser (here: non-network, non-repo-clone) feedback loops, and **lesson 1**: high-level magic that a human learns once is exactly the kind of thing an agent re-derives badly once its context window is compacted. vgpu's answer to both is: *ship the knowledge inside the installed package and make it queryable from the CLI*, not just as prose an agent has to already have open.

## Where tfl-ts already stood

An audit of the existing repo before this change showed tfl-ts already does several things vgpu-style projects consider best practice:

- Layered agent docs: [`CLAUDE.md`](../../CLAUDE.md) → [`.claude/skills/tfl-ts/SKILL.md`](../../.claude/skills/tfl-ts/SKILL.md) → [`docs/agent.md`](../agent.md) → [`docs/mcp.md`](../mcp.md), all shipped in the npm tarball (`files` in [`package.json`](../../package.json)).
- A local MCP server ([`src/mcp/server.ts`](../../src/mcp/server.ts)) with a deliberately small, curated tool set, compact JSON responses, caching, and rate limiting.
- Large static, no-network metadata (`LINE_STATION_SEQUENCES`, `STATION_HUBS`, `LINE_NAMES`, severity tables) that answers most questions without an API key at all.
- A CLI (`src/bin/tfl.ts`) with `raw`, `list`, `smoke`, and `mcp` — already tfl-ts's answer to "fast, no-browser feedback" for the *API surface* (an agent can probe any of the 84 raw endpoints in one shell call instead of writing a script and running it).

What it was missing, specifically compared to vgpu: **there was no way to reach tfl-ts's own conventions from the CLI.** An agent that has lost `CLAUDE.md` from its context (compacted, or working purely from a shell in a sandbox with the package installed but not the repo cloned) had no way to get it back except re-reading files it may not have direct access to. There was also no `AGENTS.md` — the filename that has become the cross-tool convention (Cursor, Codex CLI, GitHub Copilot, and others look for it) — only the Claude-specific `CLAUDE.md`.

## Decision: what to adopt, what to skip

| vgpu idea | tfl-ts equivalent problem | Decision |
|---|---|---|
| `vgpu docs ls/cat/find/grep` — offline doc browsing shipped in the package | tfl-ts's conventions only exist as files an agent must already have open | **Adopt.** New `tfl docs` command (`ls`, `cat <id>`, `find <query>`, `grep [-i] <pattern>`) over a curated manifest of the same Markdown files already shipped in the npm tarball. No new content is created — this is a *retrieval* layer over what already exists, which keeps the maintenance burden at effectively zero (one manifest entry per new doc file). |
| vgpu.sh publishes `agents.md` for cross-tool discovery | tfl-ts only ships `CLAUDE.md`; tools that look specifically for `AGENTS.md` find nothing | **Adopt, with a short self-contained file.** Root `AGENTS.md` is a compact quick start (static vs live, preferred calls, credentials, `tfl docs`, repo invariants), not a pointer and not a copy of `CLAUDE.md`. Tests assert both files still mention the same critical tokens so they cannot silently drift. |
| `vgpu check <file.wgsl>` — instant, no-GPU shader validation | tfl-ts already has an instant, no-browser check for the *live* API surface (`tfl raw`, `tfl smoke`). The closest un-covered case is validating line/stop/mode IDs offline against bundled metadata before making a live call | **Deferred**, not built in this PR. Worth doing later as `tfl check --line <id>,<id>` against `Lines`/`Modes` meta, but it is a new subsystem (parsing, exit codes, tests) rather than a retrieval layer, and out of scope for this change. |
| CPU/headless renderer for GPU-less sandboxes | tfl-ts has no GPU or browser dependency anywhere in its stack | **Not applicable.** tfl-ts is a `fetch`-based HTTP client; there is no environment where it "can't render." Noted here only so a future contributor doesn't wonder why there's no equivalent. |
| WGSL modules as a build-time import graph | No analogous asset type — tfl-ts has no user-authored shader-like artifacts to resolve/prune/minify | **Not applicable.** |
| `vgpu doctor`, `vgpu examples pull` | Environment diagnostics (`TFL_APP_KEY` set? reachable?) and copy-paste example discovery from the CLI | **Future work.** `tfl doctor` is still deferred. `examples pull` is lower priority because tfl-ts already ships `examples/` directly in the npm package. |
| MCP `docs` tool over the same catalogue | CLI docs and MCP were two agent surfaces; only the CLI could read the corpus | **Adopt.** One `docs` tool (`list` / `read` / `find` / `grep`) on the existing stdio server, same `DOC_MANIFEST` as `tfl docs`, paginated `read`/`grep`, no credentials, no writes. |

## What shipped in this change

1. `src/docs.ts` — one catalogue (`DOC_MANIFEST`) and pure operations (`listDocs`, `readDoc`, `findDocs`, `grepDocs`, pagination helpers). Both `tfl docs` and MCP `docs` import this module.
2. `src/bin/docs.ts` — human CLI formatter over that catalogue (`ls`, `cat`, `find`, `grep`).
3. MCP tool `docs` with `list` / `read` / `find` / `grep`, paginated `read`/`grep`, structured `{ code, message, fix }` errors.
4. `AGENTS.md` — a compact self-contained quick start for tools that load that filename. `CLAUDE.md` remains the longer Claude-oriented guide. Tests require both to mention the same critical tokens.

Net effect: an agent working purely from a shell — no repo checkout, context already compacted, only `tfl` on the `PATH` — can run `npx tfl-ts docs cat AGENTS.md` (or `find`/`grep` if it doesn't remember the exact filename) and get back the same conventions a fresh session would have had, in one offline call. An MCP client can do the same without a second corpus. That is the same trade tfl-ts already made for the *API*: `tfl raw`/`tfl list` mean an agent never has to guess raw endpoint names either.

## Non-goals

This change does not attempt to replicate vgpu's browser/headless-GPU duality, its WGSL module system, or its hosted `llms.txt`/`agents.md` website endpoints — none of those map onto a REST API client. The goal was narrowly to adopt the one pattern that generalizes cleanly: **make the docs a coding agent needs into something the installed CLI can answer, not just something a repo/context window has to already contain.**
