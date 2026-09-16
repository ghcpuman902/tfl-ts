# Design note: use-case evals are observed rates

Audience: maintainers. This records why tfl-ts grew an `evals/` runner next to Jest, and what a green report is allowed to mean.

## The gap Jest cannot cover

Jest in this repo is a hard gate: mocked `fetch`, compiled-binary CLI contracts, exact `toEqual` on colour tokens. That is the right tool for "did we break `tfl docs cat`" and "does `Central` still type-check".

It is the wrong tool for "does the tube-board sequence still work against today's TfL". Line counts move. Waterloo & City closes on Sundays. Arrivals at Oxford Circus are empty at 03:00. A 429 is TfL, not a regression. Asserting byte-identical live payloads would flap the publish gate and teach the suite to lie.

## Decision

Ship a second runner, `pnpm run eval`, that scores **observations** on real jobs and prints a rate.

- Offline jobs (id check, docs find, `tfl list` JSON) run without a key.
- Live jobs (`getStatus`, `getArrivals`, `journey.plan`) run only with `--live` and `TFL_APP_KEY`.
- Live jobs repeat (`--trials`, default 3) and report a mean.
- Empty arrivals and 429s are skips, not failures.
- Default exit is 0 unless the harness itself crashes. `--fail-under` is opt-in.
- Not part of `pnpm test` or `prepublishOnly`.

Each scenario keeps the passenger request and the expected library moves as data. This harness executes the library path. It does not start a coding agent. An agent-in-the-loop eval would be a different product.

## What remains unproven

A process that never imports tfl-ts never touches this harness. A green live rate does not mean the journey is the one a person would walk. Jest can still go green while TfL is down.

That split is the point. Hard gates stay hard. Live weather stays a rate.
