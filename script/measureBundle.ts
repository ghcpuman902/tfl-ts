/**
 * Bundle-size ledger for 2.12 → 2.13.
 *
 *   pnpm exec ts-node script/measureBundle.ts --phase=before
 *   pnpm exec ts-node script/measureBundle.ts --phase=after
 *
 * Writes JSON to stdout. Same esbuild flags both phases.
 */
import { gzipSync } from 'zlib';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import path from 'path';
import * as esbuild from 'esbuild';

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'script', '.bundle-tmp');

type Phase = 'before' | 'after';

type FixtureResult = {
  id: string;
  label: string;
  importPath: string | null;
  skipped?: string;
  rawBytes?: number;
  gzipBytes?: number;
  containsStationSequences?: boolean;
  containsRawClient?: boolean;
  containsProcessEnv?: boolean;
};

const parsePhase = (): Phase => {
  const arg = process.argv.find((item) => item.startsWith('--phase='));
  const value = arg?.slice('--phase='.length);
  if (value === 'before' || value === 'after') {
    return value;
  }
  console.error('Pass --phase=before or --phase=after');
  process.exit(1);
};

const distLayout = () => {
  const esmUi = path.join(ROOT, 'dist/esm/ui.js');
  const esmMeta = path.join(ROOT, 'dist/esm/meta.js');
  const esmIndex = path.join(ROOT, 'dist/esm/index.js');
  const legacyIndex = path.join(ROOT, 'dist/index.js');
  if (existsSync(esmIndex)) {
    return {
      kind: 'dual' as const,
      main: esmIndex,
      ui: existsSync(esmUi) ? esmUi : null,
      meta: existsSync(esmMeta) ? esmMeta : null,
      cjsIndex: path.join(ROOT, 'dist/cjs/index.js'),
      cjsClient: path.join(ROOT, 'dist/cjs/client.js'),
    };
  }
  if (!existsSync(legacyIndex)) {
    console.error('No dist/index.js or dist/esm/index.js. Run pnpm run build first.');
    process.exit(1);
  }
  return {
    kind: 'legacy' as const,
    main: legacyIndex,
    ui: null,
    meta: null,
    cjsIndex: legacyIndex,
    cjsClient: legacyIndex,
  };
};

const STATUS_BOARD_BINDINGS =
  '{ getLineColor, getLineCssProps, sortLinesBySeverityAndOrder, isNormalService, getWorstCurrentStatus }';

const toImportSpecifier = (filePath: string): string =>
  path.relative(ROOT, filePath).split(path.sep).join('/');

const bundleFixture = async (opts: {
  id: string;
  label: string;
  importPath: string;
  platform: 'browser' | 'neutral';
}): Promise<FixtureResult> => {
  let contents: string;
  if (opts.id === 'tflClient') {
    contents = `export { default as TflClient } from ${JSON.stringify('./' + toImportSpecifier(opts.importPath))};\n`;
  } else if (opts.id.startsWith('statusBoard')) {
    contents = `export ${STATUS_BOARD_BINDINGS} from ${JSON.stringify('./' + toImportSpecifier(opts.importPath))};\n`;
  } else if (opts.id.startsWith('topology')) {
    contents = `export { LINE_STATION_SEQUENCES } from ${JSON.stringify('./' + toImportSpecifier(opts.importPath))};\n`;
  } else if (opts.id.startsWith('hubs')) {
    contents = `export { STATION_HUBS, resolveArrivalsStopId } from ${JSON.stringify('./' + toImportSpecifier(opts.importPath))};\n`;
  } else {
    throw new Error(`Unknown fixture ${opts.id}`);
  }

  const outfile = path.join(OUT_DIR, `${opts.id}.js`);
  const result = await esbuild.build({
    stdin: {
      contents,
      resolveDir: ROOT,
      sourcefile: `${opts.id}-entry.js`,
    },
    bundle: true,
    minify: true,
    format: 'esm',
    platform: opts.platform,
    outfile,
    write: true,
    logLevel: 'silent',
    treeShaking: true,
    external: [
      'node:module',
      'node:url',
      'node:path',
      'node:fs',
      'node:http',
      'module',
      'url',
      'path',
      'fs',
    ],
  });
  void result;

  const js = readFileSync(outfile, 'utf8');
  const rawBytes = Buffer.byteLength(js);
  const gzipBytes = gzipSync(js).length;
  return {
    id: opts.id,
    label: opts.label,
    importPath: opts.importPath,
    rawBytes,
    gzipBytes,
    containsStationSequences: js.includes('940GZZLUQPS'),
    containsRawClient: js.includes('statusByIds'),
    containsProcessEnv: js.includes('TFL_APP_KEY'),
  };
};

const probeConstruct = (
  cjsClient: string,
): {
  journeyConstructedOnNew: boolean;
  journeyConstructedOnLineAccess: boolean;
  journeyConstructedOnJourneyAccess: boolean;
  sequencesModuleLoadedOnClientImport: boolean;
  sequencesLoadedOnLineAccess: boolean;
  sequencesLoadedOnSequencesAccess: boolean;
} => {
  process.env.TFL_APP_KEY = process.env.TFL_APP_KEY || 'measure-app-key';
  const clientPath = require.resolve(cjsClient);
  const journeyPath = require.resolve(path.join(path.dirname(cjsClient), 'journey.js'));
  delete require.cache[clientPath];
  delete require.cache[journeyPath];
  for (const key of Object.keys(require.cache)) {
    if (key.includes('StationSequence')) {
      delete require.cache[key];
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const clientMod = require(cjsClient) as { default: new () => {
    line: { STATION_SEQUENCES: unknown; LINE_NAMES: unknown };
    journey: unknown;
  } };
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Journey } = require(journeyPath) as { Journey: { instanceCount: number } };
  Journey.instanceCount = 0;

  const sequencesLoaded = (): boolean =>
    Object.keys(require.cache).some((key) => key.includes('StationSequence'));

  const sequencesOnImport = sequencesLoaded();
  const TflClient = clientMod.default;
  const client = new TflClient();
  const journeyOnNew = Journey.instanceCount > 0;
  void client.line.LINE_NAMES;
  const journeyOnLine = Journey.instanceCount > 0;
  const sequencesOnLine = sequencesLoaded();
  void client.line.STATION_SEQUENCES;
  const sequencesOnGetter = sequencesLoaded();
  void client.journey;
  const journeyOnJourney = Journey.instanceCount > 0;

  return {
    journeyConstructedOnNew: journeyOnNew,
    journeyConstructedOnLineAccess: journeyOnLine,
    journeyConstructedOnJourneyAccess: journeyOnJourney,
    sequencesModuleLoadedOnClientImport: sequencesOnImport,
    sequencesLoadedOnLineAccess: sequencesOnLine,
    sequencesLoadedOnSequencesAccess: sequencesOnGetter,
  };
};

const main = async (): Promise<void> => {
  const phase = parsePhase();
  const layout = distLayout();
  mkdirSync(OUT_DIR, { recursive: true });

  const fixtures: FixtureResult[] = [];

  fixtures.push(
    await bundleFixture({
      id: 'statusBoardBarrel',
      label: `Status board via '${phase === 'after' ? 'tfl-ts' : 'tfl-ts'}' (barrel)`,
      importPath: layout.main,
      platform: 'browser',
    }),
  );

  if (layout.ui) {
    fixtures.push(
      await bundleFixture({
        id: 'statusBoardUi',
        label: 'Status board via tfl-ts/ui',
        importPath: layout.ui,
        platform: 'browser',
      }),
    );
  } else {
    fixtures.push({
      id: 'statusBoardUi',
      label: 'Status board via tfl-ts/ui',
      importPath: null,
      skipped: 'tfl-ts/ui does not exist in this emit (2.12)',
    });
  }

  fixtures.push(
    await bundleFixture({
      id: 'topologyBarrel',
      label: 'Topology via barrel',
      importPath: layout.main,
      platform: 'browser',
    }),
  );

  if (layout.meta) {
    fixtures.push(
      await bundleFixture({
        id: 'topologyMeta',
        label: 'Topology via tfl-ts/meta',
        importPath: layout.meta,
        platform: 'browser',
      }),
    );
    fixtures.push(
      await bundleFixture({
        id: 'hubsMeta',
        label: 'Hubs + resolveArrivalsStopId via tfl-ts/meta',
        importPath: layout.meta,
        platform: 'browser',
      }),
    );
  } else {
    fixtures.push({
      id: 'topologyMeta',
      label: 'Topology via tfl-ts/meta',
      importPath: null,
      skipped: 'tfl-ts/meta does not exist in this emit (2.12)',
    });
  }

  fixtures.push(
    await bundleFixture({
      id: 'hubsBarrel',
      label: 'Hubs + resolveArrivalsStopId via barrel',
      importPath: layout.main,
      platform: 'browser',
    }),
  );

  fixtures.push(
    await bundleFixture({
      id: 'tflClient',
      label: 'import TflClient from tfl-ts',
      importPath: layout.main,
      platform: 'neutral',
    }),
  );

  const construct = probeConstruct(layout.cjsClient);

  const report = {
    phase,
    layout: layout.kind,
    measuredAt: new Date().toISOString(),
    esbuild: '0.25',
    flags: {
      bundle: true,
      minify: true,
      format: 'esm',
    },
    fixtures,
    construct,
  };

  const outPath = path.join(ROOT, 'docs', 'design', `bundle-${phase}.json`);
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
  console.log(`\nWrote ${outPath}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
