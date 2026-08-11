import { spawnSync } from 'child_process';
import path from 'path';

const ROOT = path.join(__dirname, '..');

type DemoTarget = 'console' | 'realtime' | 'smoke';

const TARGET_SCRIPTS: Record<DemoTarget, string> = {
  console: 'playground/demo.ts',
  realtime: 'playground/demo/realtime.ts',
  smoke: 'script/demoSmoke.ts',
};

const stripPnpmSeparator = (argv: string[]): string[] =>
  argv[0] === '--' ? argv.slice(1) : argv;

const parseTarget = (argv: string[]): { target: DemoTarget; rest: string[] } => {
  const args = stripPnpmSeparator(argv);
  const [first, ...rest] = args;
  if (!first || first.startsWith('-')) {
    return { target: 'console', rest: args };
  }

  if (first === 'console' || first === 'realtime' || first === 'smoke') {
    return { target: first, rest };
  }

  console.error(`Unknown demo target: ${first}`);
  console.error('Usage: pnpm run demo [-- console|realtime|smoke] [flags…]');
  process.exit(1);
};

const main = (): void => {
  const { target, rest } = parseTarget(process.argv.slice(2));
  const script = TARGET_SCRIPTS[target];
  console.log(`[demo] ${target} → ${script}`);

  const result = spawnSync('pnpm', ['exec', 'ts-node', script, ...rest], {
    cwd: ROOT,
    stdio: 'inherit',
    env: { ...process.env },
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

main();
