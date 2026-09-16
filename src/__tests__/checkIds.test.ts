import { checkIds, checkLineId, checkModeName } from '../checkIds';

describe('offline id check', () => {
  test('accepts canonical lowercase line slugs', () => {
    expect(checkLineId('central')).toEqual(
      expect.objectContaining({ ok: true, id: 'central', name: 'Central', modeName: 'tube' }),
    );
  });

  test('rejects display-case Central and suggests central', () => {
    const result = checkLineId('Central');
    expect(result.ok).toBe(false);
    expect(result.suggestion).toBe('central');
    expect(result.fix).toMatch(/lowercase/);
  });

  test('rejects unknown ids with a fix', () => {
    const result = checkLineId('not-a-line');
    expect(result.ok).toBe(false);
    expect(result.suggestion).toBeUndefined();
    expect(result.fix).toMatch(/Unknown line id/);
  });

  test('accepts tube and rejects Tube', () => {
    expect(checkModeName('tube').ok).toBe(true);
    expect(checkModeName('Tube')).toEqual(
      expect.objectContaining({ ok: false, suggestion: 'tube' }),
    );
  });

  test('checkIds is ok only when every input is canonical', () => {
    expect(checkIds({ lines: ['central'], modes: ['tube'] }).ok).toBe(true);
    expect(checkIds({ lines: ['central', 'Central'] }).ok).toBe(false);
  });

  test('does not require TFL_APP_KEY', () => {
    const original = process.env.TFL_APP_KEY;
    delete process.env.TFL_APP_KEY;
    try {
      expect(checkLineId('victoria').ok).toBe(true);
    } finally {
      if (original === undefined) {
        delete process.env.TFL_APP_KEY;
      } else {
        process.env.TFL_APP_KEY = original;
      }
    }
  });
});
