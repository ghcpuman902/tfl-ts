#!/bin/sh
# Bot verify gate (Coefficient, 2026-11-16). Runs only for bot-launched runs.
# Check: tsc + eslint (~5s). Jest is left out: its dist/ tests need a build first.
[ "$BOT_RUN" = "1" ] || exit 0
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
{ npx tsc --noEmit -p tsconfig.json && pnpm -s lint; } 1>&2 || exit 2
