import { execSync } from 'child_process';
import path from 'path';

const ROOT = path.join(__dirname, '..');

const TARGETS = ['generated', 'station-sequences', 'station-hubs', 'drift'] as const;
type Target = (typeof TARGETS)[number];

const DEFAULT_TARGETS: Target[] = ['generated', 'station-sequences', 'station-hubs'];

const TARGET_SCRIPTS: Record<Target, string> = {
  generated: 'script/checkGenerated.ts',
  'station-sequences': 'script/checkStationSequences.ts',
  'station-hubs': 'script/checkStationHubs.ts',
  drift: 'script/checkDrift.ts',
};

const stripPnpmSeparator = (argv: string[]): string[] =>
  argv[0] === '--' ? argv.slice(1) : argv;

const parseOnly = (argv: string[]): Target[] => {
  const args = stripPnpmSeparator(argv);
  const onlyArg = args.find((arg) => arg.startsWith('--only='));
  if (!onlyArg) return [...DEFAULT_TARGETS];

  const requested = onlyArg
    .slice('--only='.length)
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

  if (requested.length === 0) {
    console.error('`--only=` needs at least one target.');
    process.exit(1);
  }

  const invalid = requested.filter((name) => !TARGETS.includes(name as Target));
  if (invalid.length > 0) {
    console.error(`Unknown check target(s): ${invalid.join(', ')}`);
    console.error(`Valid targets: ${TARGETS.join(', ')}`);
    process.exit(1);
  }

  return requested as Target[];
};

const runTarget = (target: Target): void => {
  const script = TARGET_SCRIPTS[target];
  console.log(`\n[check] ${target} → ${script}`);
  execSync(`pnpm exec ts-node ${script}`, {
    cwd: ROOT,
    stdio: 'inherit',
    env: { ...process.env },
  });
};

const main = (): void => {
  const targets = parseOnly(process.argv.slice(2));
  console.log(`[check] Running: ${targets.join(', ')}`);
  targets.forEach(runTarget);
  console.log('\n[check] Done.');
};

main();
