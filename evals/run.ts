import { config as loadDotenv } from 'dotenv';
import path from 'path';
import { SCENARIOS } from './scenarios';
import {
  scoreObservations,
  type ScenarioSummary,
  type TrialResult,
} from './types';

loadDotenv({ path: path.join(__dirname, '..', '.env') });

type Flags = {
  live: boolean;
  trials: number;
  failUnder: number | null;
};

const parseFlags = (argv: string[]): Flags => {
  const live = argv.includes('--live');
  const trialsFlag = argv.find((token) => token.startsWith('--trials='));
  const failFlag = argv.find((token) => token.startsWith('--fail-under='));
  const trials = trialsFlag ? Number(trialsFlag.slice('--trials='.length)) : 3;
  const failUnder = failFlag ? Number(failFlag.slice('--fail-under='.length)) : null;
  return {
    live,
    trials: Number.isFinite(trials) && trials > 0 ? Math.floor(trials) : 3,
    failUnder: failUnder !== null && Number.isFinite(failUnder) ? failUnder : null,
  };
};

const mean = (values: Array<number | null>): number | null => {
  const present = values.filter((value): value is number => value !== null);
  if (present.length === 0) {
    return null;
  }
  return present.reduce((sum, value) => sum + value, 0) / present.length;
};

const formatScore = (score: number | null): string =>
  score === null ? 'n/a' : `${(score * 100).toFixed(0)}%`;

const run = async (): Promise<void> => {
  const flags = parseFlags(process.argv.slice(2));
  const hasKey = Boolean(process.env.TFL_APP_KEY);

  if (flags.live && !hasKey) {
    console.error('tfl eval --live needs TFL_APP_KEY in the environment or .env.');
    process.exit(2);
  }

  const selected = SCENARIOS.filter((scenario) => scenario.kind === 'offline' || flags.live);
  const summaries: ScenarioSummary[] = [];

  for (const scenario of selected) {
    const trialCount = scenario.kind === 'live' ? flags.trials : 1;
    const trials: TrialResult[] = [];
    for (let trial = 1; trial <= trialCount; trial += 1) {
      const observations = await scenario.run();
      trials.push({
        scenarioId: scenario.id,
        trial,
        observations,
        score: scoreObservations(observations),
      });
    }
    const skipped = trials.every((trial) => trial.score === null);
    summaries.push({
      id: scenario.id,
      useCase: scenario.useCase,
      kind: scenario.kind,
      trials,
      score: mean(trials.map((trial) => trial.score)),
      skipped,
      ...(skipped
        ? { skipReason: trials[0]?.observations.find((row) => row.note)?.note }
        : {}),
    });
  }

  const overall = mean(summaries.map((row) => row.score));
  const report = {
    kind: 'tfl-ts-eval',
    live: flags.live,
    trials: flags.live ? flags.trials : 1,
    overall,
    summaries,
    honesty: [
      'Jest is the hard gate. This report is observed rates, not a publish blocker.',
      'These runs call tfl-ts in-process. They do not prove a coding agent will choose these calls.',
      'Empty arrivals, a closed Waterloo & City, or a 429 are skips or notes, not product bugs.',
      'An agent that hardcodes hex and fake journeys never touches this harness.',
    ],
  };

  console.log(JSON.stringify(report, null, 2));
  console.error('');
  console.error(`tfl-ts eval  overall ${formatScore(overall)}${flags.live ? `  (${flags.trials} live trials)` : '  (offline only)'}`);
  for (const summary of summaries) {
    const mark = summary.skipped ? 'skip' : formatScore(summary.score);
    console.error(`  ${summary.id.padEnd(28)} ${mark.padEnd(6)}  ${summary.useCase}`);
  }
  console.error('Not a CI gate. See evals/README.md and docs/design/evals.md.');

  if (flags.failUnder !== null && overall !== null && overall < flags.failUnder) {
    console.error(`overall ${formatScore(overall)} is below --fail-under=${flags.failUnder}`);
    process.exit(1);
  }
};

run().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(2);
});
