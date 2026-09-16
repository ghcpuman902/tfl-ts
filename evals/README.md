# Use-case evals

Observed rates for the jobs people actually ask of tfl-ts: a tube board, arrivals at a named station, a short journey, resolving "Central", and recovering docs after context is gone.

These are not Jest. `pnpm test` stays the hard gate. `pnpm run eval` never runs in `prepublishOnly`.

## What a green report does not prove

- That a coding agent will choose `getStatus({ modes: ['tube'] })` instead of inventing an HTTP client.
- That Oxford Circus has trains right now. An empty arrivals array late at night is a skip, not a failure.
- That the journey planner returns a walk you would take. It scores "got journeys or disambiguation", not optimality.
- That TfL will not 429. A 429 skips the live trial.
- That someone who hardcodes `#E32017` and a fake status JSON used this library. The harness calls tfl-ts in-process. An agent-in-the-loop runner does not exist here.

What it does observe: the recommended call sequence still returns a usable shape against today's TfL, and the offline traps (display-case line ids, docs find) still fire.

## Run

```bash
pnpm run eval              # offline only: ids, docs, tfl list JSON
pnpm run eval -- --live    # plus status / arrivals / journey (needs TFL_APP_KEY)
pnpm run eval -- --live --trials=5
pnpm run eval -- --live --fail-under=0.7   # opt-in gate; default is report-only
```

Live scenarios default to 3 trials and report a mean rate. Offline scenarios run once.

Stdout is the JSON report. The table on stderr is for humans.

See [docs/design/evals.md](../docs/design/evals.md) for the trust model.
