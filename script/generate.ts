import { execSync } from 'child_process';
import path from 'path';

const ROOT = path.join(__dirname, '..');

const TARGETS = ['types', 'raw', 'meta', 'station-sequences', 'station-hubs', 'jsdoc'] as const;
type Target = (typeof TARGETS)[number];

const TARGET_SCRIPTS: Record<Target, string> = {
  types: 'script/generateTypes.ts',
  raw: 'script/generateRawClient.ts',
  meta: 'script/generateMeta.ts',
  'station-sequences': 'script/generateStationSequences.ts',
  'station-hubs': 'script/generateStationHubs.ts',
  jsdoc: 'script/generateJsdoc.ts',
};

const stripPnpmSeparator = (argv: string[]): string[] =>
  argv[0] === '--' ? argv.slice(1) : argv;

const parseOnly = (argv: string[]): Target[] => {
  const args = stripPnpmSeparator(argv);
  const onlyArg = args.find((arg) => arg.startsWith('--only='));
  if (!onlyArg) return [...TARGETS];

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
    console.error(`Unknown generate target(s): ${invalid.join(', ')}`);
    console.error(`Valid targets: ${TARGETS.join(', ')}`);
    process.exit(1);
  }

  return TARGETS.filter((target) => requested.includes(target));
};

const runTarget = (target: Target): void => {
  const script = TARGET_SCRIPTS[target];
  console.log(`\n[generate] ${target} → ${script}`);
  execSync(`pnpm exec ts-node ${script}`, {
    cwd: ROOT,
    stdio: 'inherit',
    env: { ...process.env },
  });
};

const main = (): void => {
  const targets = parseOnly(process.argv.slice(2));
  console.log(`[generate] Running: ${targets.join(', ')}`);
  targets.forEach(runTarget);
  console.log('\n[generate] Done.');
};

main();
