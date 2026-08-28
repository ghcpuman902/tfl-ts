import { dispatchCli, parseCliArgs } from '../bin/tfl';
import { CLI_EXIT, getCliExitCode } from '../bin/cliExit';

describe('CLI dispatch', () => {
  const originalAppId = process.env.TFL_APP_ID;
  const originalAppKey = process.env.TFL_APP_KEY;

  beforeEach(() => {
    delete process.env.TFL_APP_ID;
    delete process.env.TFL_APP_KEY;
  });

  afterAll(() => {
    if (originalAppId === undefined) {
      delete process.env.TFL_APP_ID;
    } else {
      process.env.TFL_APP_ID = originalAppId;
    }
    if (originalAppKey === undefined) {
      delete process.env.TFL_APP_KEY;
    } else {
      process.env.TFL_APP_KEY = originalAppKey;
    }
  });

  test('parseCliArgs turns --ids central into an array', () => {
    expect(parseCliArgs(['--ids', 'central'])).toEqual({ ids: ['central'] });
  });

  test('parseCliArgs splits comma-separated arrays, scalars, and valueless booleans', () => {
    expect(parseCliArgs(['--ids', 'central,victoria'])).toEqual({ ids: ['central', 'victoria'] });
    expect(parseCliArgs(['--id', '940GZZLUOXC'])).toEqual({ id: '940GZZLUOXC' });
    expect(parseCliArgs(['--detail'])).toEqual({ detail: 'true' });
  });

  test('raw --ids reaches the credential error, not an unknown option', async () => {
    await expect(dispatchCli(['raw', 'line.get', '--ids', 'central'])).rejects.toThrow(/Missing TFL_APP_KEY/);
    await expect(dispatchCli(['raw', 'line.get', '--ids', 'central'])).rejects.not.toThrow(/Unknown option/);
    try {
      await dispatchCli(['raw', 'line.get', '--ids', 'central']);
    } catch (error) {
      expect(getCliExitCode(error)).toBe(CLI_EXIT.CONFIG);
    }
  });

  test('unknown raw operations reject before asking for TFL_APP_KEY', async () => {
    await expect(dispatchCli(['raw', 'line.notAMethod', '--ids', 'central'])).rejects.toThrow(
      /Unknown raw operation: line\.notAMethod/,
    );
    try {
      await dispatchCli(['raw', 'line.notAMethod']);
      throw new Error('expected throw');
    } catch (error) {
      expect(getCliExitCode(error)).toBe(CLI_EXIT.USAGE);
      expect(String(error)).not.toMatch(/Missing TFL_APP_KEY/);
    }
  });

  test('unknown commands reject', async () => {
    await expect(dispatchCli(['foobar'])).rejects.toThrow(/Unknown command: foobar/);
    await expect(dispatchCli(['foobar'])).rejects.toThrow(/tfl --help/);
  });

  test('no args and help remain successful', async () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    await expect(dispatchCli([])).resolves.toBeUndefined();
    await expect(dispatchCli(['--help'])).resolves.toBeUndefined();
    await expect(dispatchCli(['-h'])).resolves.toBeUndefined();
    expect(log).toHaveBeenCalled();
    log.mockRestore();
  });

  test('list --tag line still routes', async () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    await dispatchCli(['list', '--tag', 'line']);
    const output = log.mock.calls.map((call) => String(call[0])).join('\n');
    expect(output).toContain('line.');
    log.mockRestore();
  });
});
