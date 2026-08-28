import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT = path.join(__dirname, '..');

type Ceiling = {
  gzipBytes: number;
  mustNotContainStationSequences?: boolean;
  mustNotContainRawClient?: boolean;
  mustNotContainProcessEnv?: boolean;
};

type MeasureReport = {
  fixtures: Array<{
    id: string;
    skipped?: string;
    gzipBytes?: number;
    containsStationSequences?: boolean;
    containsRawClient?: boolean;
    containsProcessEnv?: boolean;
  }>;
};

const assertExports = (): void => {
  const pkg = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8')) as {
    exports?: Record<string, unknown>;
    sideEffects?: boolean;
  };
  const keys = Object.keys(pkg.exports ?? {});
  for (const key of ['.', './ui', './meta']) {
    if (!keys.includes(key)) {
      console.error(`package.json exports missing ${key}`);
      process.exit(1);
    }
  }
  if (pkg.sideEffects !== false) {
    console.error('package.json sideEffects must be false');
    process.exit(1);
  }
};

const main = (): void => {
  assertExports();

  if (!existsSync(path.join(ROOT, 'dist/esm/ui.js'))) {
    console.log('[check] bundle → building dist first');
    execSync('pnpm run build', { cwd: ROOT, stdio: 'inherit' });
  }

  execSync('pnpm exec ts-node script/measureBundle.ts --phase=after', {
    cwd: ROOT,
    stdio: 'inherit',
  });

  const report = JSON.parse(
    readFileSync(path.join(ROOT, 'docs/design/bundle-after.json'), 'utf8'),
  ) as MeasureReport;
  const ceilings = JSON.parse(
    readFileSync(path.join(ROOT, 'script/bundleCeilings.json'), 'utf8'),
  ) as Record<string, Ceiling>;

  const byId = new Map(report.fixtures.map((fixture) => [fixture.id, fixture]));
  let failed = false;

  for (const [id, ceiling] of Object.entries(ceilings)) {
    const fixture = byId.get(id);
    if (!fixture || fixture.skipped) {
      console.error(`[bundle] missing fixture ${id}`);
      failed = true;
      continue;
    }
    if ((fixture.gzipBytes ?? Infinity) > ceiling.gzipBytes) {
      console.error(
        `[bundle] ${id} gzip ${fixture.gzipBytes} exceeds ceiling ${ceiling.gzipBytes}`,
      );
      failed = true;
    } else {
      console.log(`[bundle] ${id} gzip ${fixture.gzipBytes} <= ${ceiling.gzipBytes}`);
    }
    if (ceiling.mustNotContainStationSequences && fixture.containsStationSequences) {
      console.error(`[bundle] ${id} contains station-sequence payload`);
      failed = true;
    }
    if (ceiling.mustNotContainRawClient && fixture.containsRawClient) {
      console.error(`[bundle] ${id} contains RawClient / statusByIds`);
      failed = true;
    }
    if (ceiling.mustNotContainProcessEnv && fixture.containsProcessEnv) {
      console.error(`[bundle] ${id} contains TFL_APP_KEY`);
      failed = true;
    }
  }

  if (failed) {
    process.exit(1);
  }
  console.log('[bundle] ceilings ok');
};

main();
