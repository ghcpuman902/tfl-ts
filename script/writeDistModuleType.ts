import fs from 'fs';
import path from 'path';

const ROOT = path.join(__dirname, '..');

const write = (dir: string, type: 'commonjs' | 'module'): void => {
  const target = path.join(ROOT, dir);
  fs.mkdirSync(target, { recursive: true });
  fs.writeFileSync(
    path.join(target, 'package.json'),
    `${JSON.stringify({ type }, null, 2)}\n`,
  );
};

write('dist/cjs', 'commonjs');
write('dist/esm', 'module');
