import { execFileSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import path from 'path';

const ROOT = path.join(__dirname, '../..');

describe('native Node ESM emit', () => {
  const esmIndex = path.join(ROOT, 'dist/esm/index.js');

  test('dist/esm exists (run pnpm run build before pnpm test)', () => {
    expect(existsSync(esmIndex)).toBe(true);
  });

  test('does not emit generated/raw.js beside generated/raw/', () => {
    expect(existsSync(path.join(ROOT, 'dist/esm/generated/raw.js'))).toBe(false);
    expect(existsSync(path.join(ROOT, 'dist/esm/generated/rawClient.js'))).toBe(true);
    expect(existsSync(path.join(ROOT, 'dist/cjs/generated/raw.js'))).toBe(false);
    expect(existsSync(path.join(ROOT, 'dist/cjs/generated/rawClient.js'))).toBe(true);
  });

  test('rewrites extensionless relative imports in dist/esm', () => {
    const ui = readFileSync(path.join(ROOT, 'dist/esm/ui.js'), 'utf8');
    expect(ui).toMatch(/from ['"]\.\/utils\/ui\.js['"]/);
    expect(ui).not.toMatch(/from ['"]\.\/utils\/ui['"]/);

    const meta = readFileSync(path.join(ROOT, 'dist/esm/meta.js'), 'utf8');
    expect(meta).toMatch(/from ['"]\.\/generated\/meta\/StationSequence\.js['"]/);

    const client = readFileSync(path.join(ROOT, 'dist/esm/client.js'), 'utf8');
    expect(client).toMatch(/from ['"]\.\/generated\/rawClient\.js['"]/);

    const sequences = readFileSync(path.join(ROOT, 'dist/esm/utils/loadStationSequences.js'), 'utf8');
    expect(sequences).toContain('createRequire(import.meta.url)');
    expect(sequences).not.toContain('createRequire(__filename)');

    const road = readFileSync(path.join(ROOT, 'dist/esm/road.js'), 'utf8');
    expect(road).toMatch(/generated\.meta\.json['"] with \{ type: 'json' \}/);
  });

  test('node loads tfl-ts, tfl-ts/ui, tfl-ts/meta, and 2.11 dist specifiers', () => {
    const out = execFileSync(process.execPath, [path.join(__dirname, 'nativeEsmLoad.mjs')], {
      cwd: ROOT,
      encoding: 'utf8',
      env: { ...process.env, TFL_APP_KEY: 'test-app-key' },
    });
    expect(out).toContain('native-esm-ok');
  });

  test('node CJS loads tfl-ts and 2.11 dist specifiers', () => {
    const out = execFileSync(process.execPath, [path.join(__dirname, 'nativeCjsLoad.cjs')], {
      cwd: ROOT,
      encoding: 'utf8',
      env: { ...process.env, TFL_APP_KEY: 'test-app-key' },
    });
    expect(out).toContain('native-cjs-ok');
  });
});
