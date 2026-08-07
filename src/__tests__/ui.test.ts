import {
  DEFAULT_LINE_COLOR,
  getLineColor,
  getLineCssProps,
  getLineDarkReadableStyles,
  getLineInlineStyles,
  hardOutlineBoxShadow,
  hardOutlineTextShadow,
  LINE_DARK_TEXT_STROKE_WIDTH_PX,
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
      '--line-dark-fill': '#E32017',
      '--line-dark-text': '#E32017',
      '--line-dark-on-fill': '#ffffff',
      '--line-dark-text-stroke': 'none',
      '--line-dark-paint-order': 'normal',
      '--line-dark-text-shadow': 'none',
      '--line-dark-box-shadow': 'none',
    });
  });

  test('getLineCssProps exposes outline dark vars for northern by default', () => {
    expect(getLineCssProps('northern')).toEqual({
      '--line-color': '#000000',
      '--line-color-rgb': '0, 0, 0',
      '--line-color-contrast': '#ffffff',
      '--line-dark-fill': '#000000',
      '--line-dark-text': '#000000',
      '--line-dark-on-fill': '#ffffff',
      '--line-dark-text-stroke': `${LINE_DARK_TEXT_STROKE_WIDTH_PX}px #ffffff`,
      '--line-dark-paint-order': 'stroke fill',
      '--line-dark-text-shadow': hardOutlineTextShadow('#ffffff'),
      '--line-dark-box-shadow': hardOutlineBoxShadow('#ffffff'),
    });
  });

  test('getLineCssProps white mode uses white fill/text and clears stroke/shadows', () => {
    expect(getLineCssProps('northern', { darkContrastMode: 'white' })).toEqual({
      '--line-color': '#000000',
      '--line-color-rgb': '0, 0, 0',
      '--line-color-contrast': '#ffffff',
      '--line-dark-fill': '#ffffff',
      '--line-dark-text': '#ffffff',
      '--line-dark-on-fill': '#000000',
      '--line-dark-text-stroke': 'none',
      '--line-dark-paint-order': 'normal',
      '--line-dark-text-shadow': 'none',
      '--line-dark-box-shadow': 'none',
    });
  });

  test('getLineCssProps darkContrastMode is a no-op for lines without poor contrast', () => {
    expect(getLineCssProps('central', { darkContrastMode: 'white' })).toEqual(
      getLineCssProps('central'),
    );
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

  test('getLineDarkReadableStyles returns outline for northern by default, null otherwise', () => {
    expect(getLineDarkReadableStyles('central')).toBeNull();
    expect(getLineDarkReadableStyles('northern')).toEqual({
      color: '#000000',
      backgroundColor: '#000000',
      onFillColor: '#ffffff',
      textShadow: hardOutlineTextShadow('#ffffff'),
      boxShadow: hardOutlineBoxShadow('#ffffff'),
      outlineColor: '#ffffff',
      textStroke: `${LINE_DARK_TEXT_STROKE_WIDTH_PX}px #ffffff`,
      paintOrder: 'stroke fill',
    });
  });

  test('getLineDarkReadableStyles white mode returns white fill/text', () => {
    expect(
      getLineDarkReadableStyles('northern', { darkContrastMode: 'white' }),
    ).toEqual({
      color: '#ffffff',
      backgroundColor: '#ffffff',
      onFillColor: '#000000',
      textShadow: 'none',
      boxShadow: 'none',
      outlineColor: 'transparent',
      textStroke: 'none',
      paintOrder: 'normal',
    });
  });
});
