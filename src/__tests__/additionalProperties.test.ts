import { parseAdditionalPropertyValue } from '../utils/additionalProperties';

describe('parseAdditionalPropertyValue', () => {
  test('treats empty and literal null as null', () => {
    expect(parseAdditionalPropertyValue(undefined)).toEqual({ kind: 'null' });
    expect(parseAdditionalPropertyValue('')).toEqual({ kind: 'null' });
    expect(parseAdditionalPropertyValue('  ')).toEqual({ kind: 'null' });
    expect(parseAdditionalPropertyValue('null')).toEqual({ kind: 'null' });
    expect(parseAdditionalPropertyValue('NULL')).toEqual({ kind: 'null' });
    expect(parseAdditionalPropertyValue('undefined')).toEqual({ kind: 'null' });
  });

  test('parses BikePoint true/false and facility yes/no', () => {
    expect(parseAdditionalPropertyValue('true')).toEqual({ kind: 'boolean', value: true });
    expect(parseAdditionalPropertyValue('False')).toEqual({ kind: 'boolean', value: false });
    expect(parseAdditionalPropertyValue('yes')).toEqual({ kind: 'boolean', value: true });
    expect(parseAdditionalPropertyValue('NO')).toEqual({ kind: 'boolean', value: false });
  });

  test('parses counts without treating ids as numbers', () => {
    expect(parseAdditionalPropertyValue('13')).toEqual({ kind: 'number', value: 13 });
    expect(parseAdditionalPropertyValue('0')).toEqual({ kind: 'number', value: 0 });
    expect(parseAdditionalPropertyValue('1.5')).toEqual({ kind: 'number', value: 1.5 });
    expect(parseAdditionalPropertyValue('1+2')).toEqual({ kind: 'text', value: '1+2' });
    expect(parseAdditionalPropertyValue('001')).toEqual({ kind: 'text', value: '001' });
    expect(parseAdditionalPropertyValue('940GZZLUOXC')).toEqual({
      kind: 'text',
      value: '940GZZLUOXC',
    });
  });

  test('parses ISO dates', () => {
    expect(parseAdditionalPropertyValue('2010-07-12')).toEqual({
      kind: 'date',
      ms: Date.UTC(2010, 6, 12),
      precision: 'date',
    });
    expect(parseAdditionalPropertyValue('2026-08-10T18:46:07.87Z')).toEqual({
      kind: 'date',
      ms: Date.parse('2026-08-10T18:46:07.87Z'),
      precision: 'datetime',
    });
  });

  test('parses BikePoint unix millisecond timestamps', () => {
    expect(parseAdditionalPropertyValue('1278947280000')).toEqual({
      kind: 'date',
      ms: 1278947280000,
      precision: 'datetime',
    });
  });

  test('keeps destination wording as text', () => {
    expect(parseAdditionalPropertyValue('Aldwych')).toEqual({
      kind: 'text',
      value: 'Aldwych',
    });
  });
});
