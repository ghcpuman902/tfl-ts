import {
  DEFAULT_LINE_COLOR,
  getLineColor,
  getLineCssProps,
  getLineInlineStyles,
  normalizeLineId,
} from '../utils/ui';

describe('line color UI helpers', () => {
  test('getLineColor returns official hex for tube lines', () => {
    expect(getLineColor('central')).toEqual({
      hex: '#E32017',
      poorDarkContrast: false,
    });
  });

  test('getLineColor normalizes API line IDs', () => {
    expect(getLineColor('elizabeth-line')).toEqual({
      hex: '#6950A1',
      poorDarkContrast: false,
    });
    expect(normalizeLineId('elizabeth-line')).toBe('elizabeth');
  });

  test('getLineColor includes dark contrast hint for northern line', () => {
    expect(getLineColor('northern')).toEqual({
      hex: '#000000',
      poorDarkContrast: true,
      darkContrastHex: '#ffffff',
    });
  });

  test('getLineColor falls back to default for unknown lines', () => {
    expect(getLineColor('unknown-line')).toEqual(DEFAULT_LINE_COLOR);
  });

  test('getLineCssProps returns CSS custom properties from hex', () => {
    expect(getLineCssProps('central')).toEqual({
      '--line-color': '#E32017',
      '--line-color-rgb': '227, 32, 23',
      '--line-color-contrast': '#000000',
    });
  });

  test('getLineCssProps normalizes line IDs', () => {
    expect(getLineCssProps('elizabeth-line')['--line-color']).toBe('#6950A1');
  });

  test('getLineInlineStyles returns framework-agnostic inline style values', () => {
    expect(getLineInlineStyles('victoria')).toEqual({
      color: '#0098D4',
      backgroundColor: '#0098D4',
      borderLeftColor: '#0098D4',
    });
  });
});
