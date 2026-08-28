import { readFileSync } from 'fs';
import path from 'path';

describe('package exports', () => {
  const pkg = JSON.parse(
    readFileSync(path.join(__dirname, '../../package.json'), 'utf8'),
  ) as {
    exports: Record<string, unknown>;
    sideEffects: boolean;
    main: string;
    module: string;
  };

  test('exposes ., ./ui, ./meta, and 2.11 dist aliases', () => {
    expect(pkg.sideEffects).toBe(false);
    expect(pkg.exports['.']).toBeDefined();
    expect(pkg.exports['./ui']).toBeDefined();
    expect(pkg.exports['./meta']).toBeDefined();
    expect(pkg.exports['./utils/ui']).toBeDefined();
    expect(pkg.exports['./dist/generated/meta/Line.js']).toBeDefined();
    expect(pkg.exports['./dist/generated/raw.js']).toBeDefined();
    expect(pkg.exports['./dist/*.js']).toBeDefined();
    expect(pkg.main).toContain('dist/cjs');
    expect(pkg.module).toContain('dist/esm');
  });
});
