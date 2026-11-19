import { readFileSync } from 'fs';
import path from 'path';
import * as esbuild from 'esbuild';

const SRC = path.join(__dirname, '..');
const ROOT = path.join(SRC, '..');

const bundle = async (entry: string): Promise<{ code: string; inputs: string[] }> => {
  const result = await esbuild.build({
    entryPoints: [path.join(SRC, entry)],
    bundle: true,
    write: false,
    metafile: true,
    platform: 'node',
    format: 'cjs',
    logLevel: 'silent',
    treeShaking: true,
  });
  const inputs = Object.keys(result.metafile.inputs).map((file) => file.split(path.sep).join('/'));
  return { code: result.outputFiles[0].text, inputs };
};

const STOP_FILES = /(^|\/)src\/(stops\/|generated\/stops\/|utils\/stop(Search|Merge)\.ts)/;

describe('tfl-ts/meta/stops stays out of the other entries', () => {
  // Each of these is a published entry point: `.`, `./meta`, `./ui`, `./utils/ui`.
  test.each(['index.ts', 'meta.ts', 'ui.ts', 'client.ts', 'utils/ui.ts'])(
    '%s does not reach the stop index, search or merge',
    async (entry) => {
      const { code, inputs } = await bundle(entry);
      expect(inputs.filter((file) => STOP_FILES.test(file))).toEqual([]);
      expect(code).not.toContain('tfl-stop-index/');
      expect(code).not.toContain('STOP_INDEX');
    },
  );

  test('the stops entry carries the index, and nothing that holds a key or talks to the network', async () => {
    const { code, inputs } = await bundle('stops/index.ts');
    expect(inputs.some((file) => file.endsWith('src/generated/stops/StopIndex.ts'))).toBe(true);
    expect(inputs.some((file) => file.endsWith('src/utils/stopSearch.ts'))).toBe(true);
    expect(code).toContain('tfl-stop-index/');
    expect(code).not.toContain('TFL_APP_KEY');
    expect(code).not.toContain('app_key');
    expect(inputs.filter((file) => /src\/(core|generated\/rawClient)/.test(file))).toEqual([]);
    // The builder is a separate entry and is not pulled in by the runtime one.
    expect(inputs.some((file) => file.endsWith('src/stops/build.ts'))).toBe(false);
    expect(inputs.some((file) => file.endsWith('src/stops/encode.ts'))).toBe(false);
  });

  test('the build entry never reads the environment: the key is a parameter', async () => {
    const { code } = await bundle('stops/build.ts');
    expect(code).not.toContain('process.env');
  });
});

describe('package.json subpath exports', () => {
  const pkg = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8')) as {
    exports: Record<string, Record<string, string>>;
  };

  test.each([
    ['./meta/stops', 'stops/index'],
    ['./meta/stops/build', 'stops/build'],
  ])('%s has cjs, esm and types', (key, file) => {
    expect(pkg.exports[key]).toEqual({
      types: `./dist/cjs/${file}.d.ts`,
      import: `./dist/esm/${file}.js`,
      require: `./dist/cjs/${file}.js`,
    });
  });

  test('`.` and `./meta` still point at their own files', () => {
    expect(pkg.exports['.'].import).toBe('./dist/esm/index.js');
    expect(pkg.exports['./meta'].import).toBe('./dist/esm/meta.js');
  });
});
