import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(__dirname, '..');
const DEMO_DIR = path.join(ROOT, 'playground', 'demo');

const REQUIRED_DEMOS = [
  'accidentStats.ts',
  'airQuality.ts',
  'bikePoint.ts',
  'cabwise.ts',
  'journey.ts',
  'line.ts',
  'mode.ts',
  'occupancy.ts',
  'place.ts',
  'raw.ts',
  'realtime.ts',
  'road.ts',
  'search.ts',
  'stopPoint.ts',
  'travelTimes.ts',
  'ui.ts',
  'vehicle.ts',
] as const;

const runStep = (label: string, command: string, args: string[]): void => {
  console.log(`\n[demo:smoke] ${label}`);
  const result = spawnSync(command, args, {
    cwd: ROOT,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    throw new Error(`${label} failed`);
  }
};

const verifyDemoCatalog = (): void => {
  console.log('[demo:smoke] Verifying demo catalog');
  const files = new Set(readdirSync(DEMO_DIR));
  const missing = REQUIRED_DEMOS.filter((file) => !files.has(file));

  if (missing.length > 0) {
    throw new Error(`Missing demo files: ${missing.join(', ')}`);
  }

  console.log(`Found ${REQUIRED_DEMOS.length} required module demos`);
};

const verifyEntryPoints = (): void => {
  const entryPoints = ['playground/demo.ts', 'playground/index.ts'];
  entryPoints.forEach((entryPoint) => {
    const fullPath = path.join(ROOT, entryPoint);
    if (!existsSync(fullPath)) {
      throw new Error(`Missing entry point: ${entryPoint}`);
    }
  });
};

const main = (): void => {
  const live = process.argv.includes('--live');

  verifyDemoCatalog();
  verifyEntryPoints();
  runStep('Type-check playground and demos', 'pnpm', ['exec', 'tsc', '-p', 'tsconfig.playground.json']);

  if (live) {
    runStep('Run v2 tour demo', 'pnpm', ['run', 'demo']);
    runStep('Run raw demo', 'pnpm', ['exec', 'ts-node', 'playground/demo/raw.ts']);
    runStep('Run mode demo', 'pnpm', ['exec', 'ts-node', 'playground/demo/mode.ts']);
    runStep('Run stopPoint demo', 'pnpm', ['exec', 'ts-node', 'playground/demo/stopPoint.ts']);
  } else {
    console.log('\n[demo:smoke] Compile-only checks passed.');
    console.log('[demo:smoke] Run with --live to execute live TfL API demos.');
  }
};

try {
  main();
} catch (error) {
  console.error('[demo:smoke] Failed:', error instanceof Error ? error.message : error);
  process.exit(1);
}
