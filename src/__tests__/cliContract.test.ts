import { execFileSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';
import { CLI_EXIT, CliError, getCliExitCode } from '../bin/cliExit';
import { DocsError } from '../docs';
import { TflConfigError } from '../errors';

const ROOT = path.join(__dirname, '../..');
const BIN = path.join(ROOT, 'dist/cjs/bin/tfl.js');

const envWithoutKey = (): NodeJS.ProcessEnv => {
  const env = { ...process.env };
  delete env.TFL_APP_KEY;
  delete env.TFL_APP_ID;
  return env;
};

const runTfl = (
  args: string[],
  env: NodeJS.ProcessEnv = envWithoutKey(),
): { status: number; stdout: string; stderr: string } => {
  try {
    const stdout = execFileSync(process.execPath, [BIN, ...args], {
      encoding: 'utf8',
      env,
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return { status: 0, stdout, stderr: '' };
  } catch (error) {
    const failed = error as { status?: number | null; stdout?: string; stderr?: string };
    return {
      status: typeof failed.status === 'number' ? failed.status : 1,
      stdout: failed.stdout ?? '',
      stderr: failed.stderr ?? '',
    };
  }
};

describe('CLI exit codes', () => {
  test('maps error classes to stable non-zero codes', () => {
    expect(getCliExitCode(new CliError(CLI_EXIT.USAGE, 'bad'))).toBe(2);
    expect(getCliExitCode(new TflConfigError('Missing TFL_APP_KEY.', 'appKey'))).toBe(3);
    expect(
      getCliExitCode(new DocsError('TFL_DOCS_MISSING_FILE', 'gone', 'reinstall')),
    ).toBe(4);
    expect(
      getCliExitCode(new DocsError('TFL_DOCS_UNKNOWN_ID', 'nope', 'ls')),
    ).toBe(2);
    expect(
      getCliExitCode(new DocsError('TFL_DOCS_NOT_FOUND', 'none', 'narrow')),
    ).toBe(1);
    expect(getCliExitCode(new Error('other'))).toBe(1);
    expect(getCliExitCode(new Error('other'))).not.toBe(0);
  });
});

describe('compiled tfl binary (run pnpm run build before pnpm test)', () => {
  test('dist/cjs/bin/tfl.js exists', () => {
    expect(existsSync(BIN)).toBe(true);
  });

  test('docs cat CLAUDE.md reads the package-root file, not dist/CLAUDE.md', () => {
    const result = runTfl(['docs', 'cat', 'CLAUDE.md']);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('tfl-ts');
    expect(result.stderr).not.toMatch(/dist\/CLAUDE\.md/);
  });

  test('docs find caching succeeds without a key', () => {
    const result = runTfl(['docs', 'find', 'caching']);
    expect(result.status).toBe(0);
    expect(result.stdout).toMatch(/docs\/agent\.md|CLAUDE\.md|docs\/mcp\.md/);
  });

  test('unknown command is usage (2), missing key is config (3), unknown raw op is usage (2)', () => {
    const unknown = runTfl(['foobar']);
    expect(unknown.status).toBe(CLI_EXIT.USAGE);
    expect(unknown.stderr).toMatch(/Unknown command: foobar/);

    const missingKey = runTfl(['raw', 'line.get', '--ids', 'central']);
    expect(missingKey.status).toBe(CLI_EXIT.CONFIG);
    expect(missingKey.stderr).toMatch(/Missing TFL_APP_KEY/);

    const unknownRaw = runTfl(['raw', 'line.notAMethod', '--ids', 'central']);
    expect(unknownRaw.status).toBe(CLI_EXIT.USAGE);
    expect(unknownRaw.stderr).toMatch(/Unknown raw operation: line\.notAMethod/);
    expect(unknownRaw.stderr).not.toMatch(/Missing TFL_APP_KEY/);
  });

  test('list is JSON by default; --text is the prose form', () => {
    const json = runTfl(['list', '--tag', 'line']);
    expect(json.status).toBe(0);
    const parsed = JSON.parse(json.stdout) as Array<{ tag: string; method: string; path: string }>;
    expect(parsed.some((row) => row.tag === 'line' && row.method === 'arrivals')).toBe(true);

    const text = runTfl(['list', '--tag', 'line', '--text']);
    expect(text.status).toBe(0);
    expect(text.stdout).toMatch(/line\.arrivals -> GET /);
  });

  test('check --line central,Central exits 1 without a key and suggests the slug', () => {
    const result = runTfl(['check', '--line', 'central,Central']);
    expect(result.status).toBe(CLI_EXIT.ERROR);
    expect(result.stderr).not.toMatch(/Missing TFL_APP_KEY/);
    const parsed = JSON.parse(result.stdout) as {
      ok: boolean;
      lines: Array<{ input: string; ok: boolean; suggestion?: string }>;
    };
    expect(parsed.ok).toBe(false);
    expect(parsed.lines).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ input: 'central', ok: true }),
        expect.objectContaining({ input: 'Central', ok: false, suggestion: 'central' }),
      ]),
    );
  });

  test('unknown doc id is usage (2); find miss is error (1)', () => {
    const unknownId = runTfl(['docs', 'cat', 'does-not-exist.md']);
    expect(unknownId.status).toBe(CLI_EXIT.USAGE);
    expect(unknownId.stderr).toMatch(/Unknown doc id/);

    const miss = runTfl(['docs', 'find', 'totally-unrelated-nonsense-query']);
    expect(miss.status).toBe(CLI_EXIT.ERROR);
    expect(miss.status).not.toBe(0);
  });
});
