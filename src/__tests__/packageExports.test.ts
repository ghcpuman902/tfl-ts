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

  test('exposes ., ./ui, and ./meta with sideEffects false', () => {
    expect(pkg.sideEffects).toBe(false);
    expect(pkg.exports['.']).toBeDefined();
    expect(pkg.exports['./ui']).toBeDefined();
    expect(pkg.exports['./meta']).toBeDefined();
    expect(pkg.main).toContain('dist/cjs');
    expect(pkg.module).toContain('dist/esm');
  });
});
