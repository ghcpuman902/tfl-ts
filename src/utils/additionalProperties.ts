/**
 * Parse StopPoint / Place `additionalProperties[].value`.
 *
 * TfL always sends a string. Facility flags are `yes`/`no`, BikePoint uses
 * `true`/`false`, empty fields are `""` or the literal `"null"`, and dates are
 * ISO or unix milliseconds (BikePoint `InstallDate`). The bag itself stays
 * strings — this helper is for consumers that want a typed read.
 */

export type AdditionalPropertyPrecision = 'date' | 'datetime';

export type ParsedAdditionalPropertyValue =
  | { kind: 'null' }
  | { kind: 'boolean'; value: boolean }
  | { kind: 'number'; value: number }
  | { kind: 'date'; ms: number; precision: AdditionalPropertyPrecision }
  | { kind: 'text'; value: string };

const ISO_DATE_ONLY_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
const ISO_DATETIME_RE =
  /^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d+))?)?(Z|[+-]\d{2}:?\d{2})?$/;
const UNIX_MS_RE = /^\d{12,13}$/;
const UNIX_S_RE = /^\d{10}$/;
const NUMBER_RE = /^-?(?:0|[1-9]\d*)(?:\.\d+)?$/;

const MIN_REASONABLE_MS = Date.UTC(1990, 0, 1);
const MAX_REASONABLE_MS = Date.UTC(2100, 0, 1);

const asDate = (
  ms: number,
  precision: AdditionalPropertyPrecision
): ParsedAdditionalPropertyValue | undefined => {
  if (!Number.isFinite(ms) || ms < MIN_REASONABLE_MS || ms >= MAX_REASONABLE_MS) {
    return undefined;
  }
  return { kind: 'date', ms, precision };
};

/**
 * Turn a TfL additional-property string into null / boolean / number / date / text.
 * Does not mutate the original bag.
 */
export const parseAdditionalPropertyValue = (
  raw?: string | null
): ParsedAdditionalPropertyValue => {
  const trimmed = raw?.trim();
  if (!trimmed || /^(null|undefined)$/i.test(trimmed)) {
    return { kind: 'null' };
  }

  const lower = trimmed.toLowerCase();
  if (lower === 'true' || lower === 'yes') return { kind: 'boolean', value: true };
  if (lower === 'false' || lower === 'no') return { kind: 'boolean', value: false };

  const dateOnly = trimmed.match(ISO_DATE_ONLY_RE);
  if (dateOnly) {
    const year = Number(dateOnly[1]);
    const month = Number(dateOnly[2]);
    const day = Number(dateOnly[3]);
    const parsed = asDate(Date.UTC(year, month - 1, day), 'date');
    if (parsed) return parsed;
  }

  if (ISO_DATETIME_RE.test(trimmed)) {
    const ms = Date.parse(trimmed);
    const parsed = asDate(ms, 'datetime');
    if (parsed) return parsed;
  }

  if (UNIX_MS_RE.test(trimmed)) {
    const parsed = asDate(Number(trimmed), 'datetime');
    if (parsed) return parsed;
  }

  if (UNIX_S_RE.test(trimmed)) {
    const parsed = asDate(Number(trimmed) * 1000, 'datetime');
    if (parsed) return parsed;
  }

  if (NUMBER_RE.test(trimmed)) {
    const value = Number(trimmed);
    if (Number.isFinite(value)) return { kind: 'number', value };
  }

  return { kind: 'text', value: trimmed };
};
