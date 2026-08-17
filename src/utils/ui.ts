/**
 * UI Utilities for TfL API Wrapper
 * 
 * This module provides utilities for building user interfaces with TfL data,
 * including line colors, severity helpers, accessibility utilities, and more.
 * 
 * @example
 * import { getLineColor, getSeverityCategory, getAccessibleSeverityLabel } from 'tfl-ts/utils/ui';
 * 
 * // Get line colors for styling
 * const colors = getLineColor('central'); // { hex: '#E32017', poorDarkContrast: false }
 * 
 * // Get severity category for conditional styling
 * const category = getSeverityCategory(6); // 'severe'
 * const kind = getStatusKind(20); // 'closed' — scheduled, not an incident
 * 
 * // Get accessible label for screen readers
 * const label = getAccessibleSeverityLabel(10, 'Good Service'); // 'Good Service - No issues reported'
 */

// Import generated metadata for accurate data
import { Lines } from '../generated/meta/Line';
import { Severity } from '../generated/meta/Meta';
import {
  compareLineStatuses,
  getCurrentLineStatuses,
  getLineStatusSummary as summariseLineStatuses,
  getStatusDescription,
  getStatusKind,
  getStatusSeverity,
  hasNightService as statusHasNightService,
  isNormalService as statusIsNormalService,
  type CurrentStatusOptions,
  type LineStatusLike,
  type StatusKind,
} from './lineStatus';

export {
  getCurrentLineStatuses,
  getStatusKind,
  getWorstCurrentStatus,
  isScheduledClosure,
  STATUS_KIND_ORDER,
} from './lineStatus';
export type { CurrentStatusOptions, LineStatusLike, StatusKind } from './lineStatus';

// Types
export type LineId = typeof Lines[number]['id'];
export type SeverityLevel = number; // Use number to match generated API types
export type SeverityDescription = typeof Severity[number]['description'];

/**
 * How poor-dark-contrast lines (e.g. Northern) stay readable on dark surfaces.
 *
 * - `outline` (default): keep brand black; white outside stroke / hard shadow rings.
 * - `white`: use white fill/text on dark surfaces (opt-in; loses brand black).
 */
export type LineDarkContrastMode = 'outline' | 'white';

/** Options for dark-surface contrast helpers. */
export type LineDarkContrastOptions = {
  /** Default `outline`. Only affects lines with `poorDarkContrast`. */
  darkContrastMode?: LineDarkContrastMode;
};

/**
 * Line color information with accessibility considerations.
 * Use `hex` with inline styles or CSS — do not rely on framework-specific class names.
 */
export interface LineColorInfo {
  /** Official TfL hex color code — brand token; always keep as `--line-color` */
  hex: string;
  /**
   * Whether this brand hex is hard to see on dark backgrounds (e.g. Northern black).
   * When true, use `getLineDarkReadableStyles` / dark CSS vars. Default mode is
   * a hard outline; pass `darkContrastMode: 'white'` to opt into white fill/text.
   */
  poorDarkContrast: boolean;
  /**
   * Accent for dark surfaces when `poorDarkContrast` is true (usually white).
   * Used for stroke / hard rings in `outline` mode, or as fill/text in `white` mode.
   * Prefer `getLineDarkReadableStyles` or dark vars from `getLineCssProps`.
   */
  darkContrastHex?: string;
}

/** Default outside stroke width for dark-mode text outline (px). */
export const LINE_DARK_TEXT_STROKE_WIDTH_PX = 0.5;

/**
 * Hard 8-direction text outline (border-like stroke). Prefer over soft glow blur.
 * Default 0.5px reads as a hairline on dark UI without overpowering brand black.
 */
export const hardOutlineTextShadow = (
  outlineHex: string,
  widthPx = 0.5,
): string =>
  [
    `-${widthPx}px -${widthPx}px 0 ${outlineHex}`,
    `${widthPx}px -${widthPx}px 0 ${outlineHex}`,
    `-${widthPx}px ${widthPx}px 0 ${outlineHex}`,
    `${widthPx}px ${widthPx}px 0 ${outlineHex}`,
    `-${widthPx}px 0 0 ${outlineHex}`,
    `${widthPx}px 0 0 ${outlineHex}`,
    `0 -${widthPx}px 0 ${outlineHex}`,
    `0 ${widthPx}px 0 ${outlineHex}`,
  ].join(', ');

/**
 * Hard ring (0 blur) — hairline border-like outline (default 0.75px).
 */
export const hardOutlineBoxShadow = (
  outlineHex: string,
  widthPx = 0.75,
): string => `0 0 0 ${widthPx}px ${outlineHex}`;

/**
 * Severity category for UI styling
 */
export type SeverityCategory = 'critical' | 'severe' | 'minor' | 'special' | 'good';

/**
 * Severity mapping configuration
 */
export interface SeverityMapping {
  critical: SeverityLevel[];
  severe: SeverityLevel[];
  minor: SeverityLevel[];
  special: SeverityLevel[];
  good: SeverityLevel[];
}

/**
 * Official TfL line hex colors.
 * Keys use normalized line IDs (see `normalizeLineId`).
 */
const LINE_COLOR_HEX = {
  // Tube lines
  'bakerloo': '#B36305',
  'central': '#E32017',
  'circle': '#FFD300',
  'district': '#00782A',
  'hammersmith-city': '#F3A9BB',
  'jubilee': '#A0A5A9',
  'metropolitan': '#9B0056',
  'northern': '#000000',
  'piccadilly': '#003688',
  'victoria': '#0098D4',
  'waterloo-city': '#95CDBA',

  // Other transport modes
  'dlr': '#00A4A7',
  'elizabeth': '#6950A1',
  'tram': '#5fb526',

  // Overground lines
  'liberty': '#0071FD',
  'lioness': '#FC9D9A',
  'mildmay': '#0071FD',
  'suffragette': '#76B82A',
  'weaver': '#A45A2A',
  'windrush': '#EE2E24',

  // River bus — London River Services blue (PMS 299)
  'rb1': '#039BE5',
  'rb4': '#039BE5',
  'rb6': '#039BE5',
  'woolwich-ferry': '#039BE5',
} as const;

/** Lines whose brand hex has poor contrast on dark backgrounds */
const POOR_DARK_CONTRAST_LINES = new Set<string>(['northern']);

const buildLineColorInfo = (lineId: string, hex: string): LineColorInfo => {
  const poorDarkContrast = POOR_DARK_CONTRAST_LINES.has(lineId);
  return {
    hex,
    poorDarkContrast,
    ...(poorDarkContrast ? { darkContrastHex: '#ffffff' } : {}),
  };
};

/**
 * Official TfL line colors with accessibility considerations.
 *
 * Colors are based on TfL's official brand guidelines and include
 * accessibility considerations for dark mode and contrast ratios.
 */
export const LINE_COLORS: Record<string, LineColorInfo> = Object.fromEntries(
  Object.entries(LINE_COLOR_HEX).map(([lineId, hex]) => [
    lineId,
    buildLineColorInfo(lineId, hex),
  ]),
);

/**
 * Default color for unknown lines
 */
export const DEFAULT_LINE_COLOR: LineColorInfo = {
  hex: '#6B7280',
  poorDarkContrast: false,
};

/**
 * API line ID aliases mapped to normalized color lookup keys.
 * TfL returns mode-style IDs (e.g. `elizabeth-line`) that differ from color keys.
 */
const LINE_ID_ALIASES: Record<string, string> = {
  'elizabeth-line': 'elizabeth',
};

/**
 * Normalize a TfL line ID for color and ordering lookups.
 *
 * @example
 * normalizeLineId('elizabeth-line'); // 'elizabeth'
 * normalizeLineId('central'); // 'central'
 */
export const normalizeLineId = (lineId: string): string =>
  LINE_ID_ALIASES[lineId] ?? lineId;

/**
 * Line ordering by passenger volume and importance
 * Used for consistent sorting in UI displays
 */
export const LINE_ORDER: readonly string[] = [
  // Tube lines by passenger volume (busiest first)
  'central',
  'northern',
  'jubilee',
  'piccadilly',
  'district',
  'victoria',
  'circle',
  'hammersmith-city',
  'bakerloo',
  'metropolitan',
  'waterloo-city',
  
  // Other transport modes
  'dlr',
  'tram',
  'elizabeth',
  
  // Overground group
  'liberty',
  'lioness',
  'mildmay',
  'suffragette',
  'weaver',
  'windrush'
] as const;

/**
 * Build severity mapping from generated TfL data
 * 
 * This creates a smart categorization of severity levels based on
 * the actual descriptions from the TfL API, making it easier to
 * apply consistent styling across different transport modes.
 */
const severityCategoryFromKind = (
  kind: StatusKind,
  severityLevel?: number,
): SeverityCategory => {
  if (kind === 'good') return 'good';
  if (kind === 'info' || kind === 'closed') return 'special';
  if (kind === 'plannedWork') return 'severe';
  if (severityLevel === 1 || severityLevel === 2 || severityLevel === 3) return 'critical';
  if (severityLevel === 6) return 'severe';
  return 'minor';
};

export const buildSeverityMapping = (): SeverityMapping => {
  const mapping: SeverityMapping = {
    critical: [],
    severe: [],
    minor: [],
    special: [],
    good: []
  };

  const seen = new Set<number>();
  for (const item of Severity) {
    if (item.modeName !== 'tube' || seen.has(item.severityLevel)) continue;
    seen.add(item.severityLevel);
    mapping[severityCategoryFromKind(getStatusKind(item.severityLevel), item.severityLevel)]
      .push(item.severityLevel);
  }

  return mapping;
};

/**
 * Pre-built severity mapping for immediate use
 */
export const SEVERITY_MAPPING = buildSeverityMapping();

/**
 * Get line color information
 * 
 * @param lineId - The line ID to get colors for
 * @returns LineColorInfo with official hex color and accessibility metadata
 *
 * @example
 * const colors = getLineColor('central');
 * // Returns: { hex: '#E32017', poorDarkContrast: false }
 *
 * // Northern stays black — use getLineDarkReadableStyles / CSS outline vars on dark UI
 * // const northern = getLineColor('northern');
 * // // { hex: '#000000', poorDarkContrast: true, darkContrastHex: '#ffffff' }
 *
 * // React / inline styles (works in any CSS setup)
 * <span style={{ color: colors.hex }}>Central</span>
 * <div style={{ backgroundColor: colors.hex }} />
 */
export const getLineColor = (lineId: string): LineColorInfo => {
  const normalized = normalizeLineId(lineId);
  return LINE_COLORS[normalized] || DEFAULT_LINE_COLOR;
};

/**
 * Get severity category for a severity level
 * 
 * @param severityLevel - The severity level number
 * @returns SeverityCategory for conditional styling
 * 
 * @example
 * const category = getSeverityCategory(6); // 'severe'
 * const category = getSeverityCategory(10); // 'good'
 */
export const getSeverityCategory = (severityLevel: SeverityLevel): SeverityCategory =>
  severityCategoryFromKind(getStatusKind(severityLevel), severityLevel);

/**
 * Get Tailwind CSS classes for severity styling
 * 
 * @param severityLevel - The severity level number
 * @param includeAnimation - Whether to include animation classes
 * @returns Object with text and animation classes
 * 
 * @example
 * const classes = getSeverityClasses(6, true);
 * // Returns: { text: 'text-orange-700', animation: 'animate-[pulse_1.5s_ease-in-out_infinite]' }
 */
export const getSeverityClasses = (severityLevel: SeverityLevel, includeAnimation = false) => {
  const category = getSeverityCategory(severityLevel);
  
  const textClasses = {
    critical: 'text-red-700',
    severe: 'text-orange-700',
    minor: 'text-yellow-700',
    special: 'text-blue-700',
    good: 'text-green-700'
  };
  
  const animationClasses = {
    critical: 'animate-[pulse_1s_ease-in-out_infinite]',
    severe: 'animate-[pulse_1.5s_ease-in-out_infinite]',
    minor: 'animate-[pulse_2s_ease-in-out_infinite]',
    special: '',
    good: ''
  };
  
  return {
    text: textClasses[category],
    animation: includeAnimation ? animationClasses[category] : ''
  };
};

/**
 * Get accessible severity label for screen readers
 * 
 * @param severityLevel - The severity level number
 * @param description - The severity description
 * @returns Accessible label with additional context
 * 
 * @example
 * const label = getAccessibleSeverityLabel(10, 'Good Service');
 * // Returns: 'Good Service - No issues reported'
 */
export const getAccessibleSeverityLabel = (severityLevel: SeverityLevel, description: string): string => {
  if (getStatusKind(severityLevel) === 'closed') {
    return `${description} - Not running at this time`;
  }

  const category = getSeverityCategory(severityLevel);
  
  const contextMap = {
    critical: ' - Service disruption affecting travel',
    severe: ' - Significant delays expected',
    minor: ' - Minor delays possible',
    special: ' - Special service information',
    good: ' - No issues reported'
  };
  
  return `${description}${contextMap[category]}`;
};

/**
 * Get line order index for sorting
 * 
 * @param lineId - The line ID to get order for
 * @returns Order index (lower = higher priority)
 * 
 * @example
 * const order = getLineOrder('central'); // 0 (highest priority)
 * const order = getLineOrder('unknown'); // LINE_ORDER.length (lowest priority)
 */
export const getLineOrder = (lineId: string): number => {
  const index = LINE_ORDER.indexOf(normalizeLineId(lineId));
  return index === -1 ? LINE_ORDER.length : index;
};

/**
 * Check if line statuses indicate normal service
 * 
 * @param statuses - Array of line status objects
 * @returns True if all statuses indicate good or special service
 * 
 * @example
 * const isNormal = isNormalService(line.lineStatuses);
 * if (isNormal) {
 *   // Apply normal service styling
 * }
 */
export const isNormalService = (
  statuses: readonly LineStatusLike[] | undefined,
  options?: CurrentStatusOptions,
): boolean => statusIsNormalService(statuses, options);

/**
 * @deprecated Use {@link isScheduledClosure}. Severity 20 means the line is
 * closed, not that it runs a night service.
 */
export const hasNightService = (
  statuses: readonly LineStatusLike[] | undefined,
): boolean => statusHasNightService(statuses);

/**
 * Get ARIA label for line status
 * 
 * @param lineName - The line name
 * @param statuses - Array of line status objects
 * @returns Accessible ARIA label
 * 
 * @example
 * const ariaLabel = getLineAriaLabel('Central', line.lineStatuses);
 * // Returns: 'Central line: Good Service - No issues reported'
 */
export const getLineAriaLabel = (
  lineName: string,
  statuses: readonly LineStatusLike[] | undefined,
  options?: CurrentStatusOptions,
): string => {
  const current = getCurrentLineStatuses(statuses, options);
  if (!current.length) {
    return `${lineName} line: No status information available`;
  }

  const statusLabels = current.map((status) => {
    const severity = getStatusSeverity(status);
    const description = getStatusDescription(status);
    if (severity === undefined || !description) {
      return 'Unknown status';
    }
    return getAccessibleSeverityLabel(severity, description);
  });

  return `${lineName} line: ${statusLabels.join(', ')}`;
};

/**
 * Get inline style properties for common line color UI patterns.
 *
 * @example
 * const styles = getLineInlineStyles('central');
 * // { color: '#E32017', backgroundColor: '#E32017', borderLeftColor: '#E32017' }
 *
 * <div style={{ ...styles, borderLeftWidth: 4, borderLeftStyle: 'solid' }} />
 */
export const getLineInlineStyles = (lineId: string): {
  color: string;
  backgroundColor: string;
  borderLeftColor: string;
} => {
  const { hex } = getLineColor(lineId);
  return {
    color: hex,
    backgroundColor: hex,
    borderLeftColor: hex,
  };
};

export type LineDarkReadableStyles = {
  /** Text colour on dark surfaces (brand black in outline mode; white in white mode). */
  color: string;
  /** Fill for chips / bars on dark surfaces. */
  backgroundColor: string;
  /** Label colour when sitting on the fill (chip text). */
  onFillColor: string;
  /** Hard 8-direction shadow fallback when text-stroke is unsupported. */
  textShadow: string;
  /** Hard ring for chips / bars in outline mode; `none` in white mode. */
  boxShadow: string;
  /** Stroke / ring accent colour (usually white); transparent in white mode. */
  outlineColor: string;
  /** `-webkit-text-stroke` value for outside outline; `none` in white mode. */
  textStroke: string;
  /** `paint-order` so stroke sits outside the fill; `normal` in white mode. */
  paintOrder: string;
};

const resolveDarkContrastMode = (
  options?: LineDarkContrastOptions,
): LineDarkContrastMode => options?.darkContrastMode ?? 'outline';

/**
 * Styles that keep brand line colors readable on dark surfaces.
 *
 * Default `outline` keeps Northern `#000000` with a white outside stroke (prefer
 * `-webkit-text-stroke` + `paint-order: stroke fill`; `textShadow` is the
 * fallback). Pass `{ darkContrastMode: 'white' }` to use white fill/text instead.
 *
 * Returns `null` when no dark-surface adjustment is needed.
 *
 * @example
 * const dark = getLineDarkReadableStyles('northern');
 * // outline: black fill/text, white stroke + hard shadow rings
 *
 * const white = getLineDarkReadableStyles('northern', { darkContrastMode: 'white' });
 * // white fill/text, no stroke/shadow
 */
export const getLineDarkReadableStyles = (
  lineId: string,
  options?: LineDarkContrastOptions,
): LineDarkReadableStyles | null => {
  const color = getLineColor(lineId);
  if (!color.poorDarkContrast || !color.darkContrastHex) {
    return null;
  }

  const mode = resolveDarkContrastMode(options);
  const accent = color.darkContrastHex;

  if (mode === 'white') {
    return {
      color: accent,
      backgroundColor: accent,
      onFillColor: color.hex,
      textShadow: 'none',
      boxShadow: 'none',
      outlineColor: 'transparent',
      textStroke: 'none',
      paintOrder: 'normal',
    };
  }

  return {
    color: color.hex,
    backgroundColor: color.hex,
    onFillColor: accent,
    textShadow: hardOutlineTextShadow(accent),
    boxShadow: hardOutlineBoxShadow(accent),
    outlineColor: accent,
    textStroke: `${LINE_DARK_TEXT_STROKE_WIDTH_PX}px ${accent}`,
    paintOrder: 'stroke fill',
  };
};

/**
 * Get CSS custom properties for line colors.
 *
 * `--line-color` is always the official brand hex. On dark surfaces use
 * `--line-dark-fill` / `--line-dark-text` / `--line-dark-on-fill` plus stroke
 * and shadow vars. Default mode is outline; pass `{ darkContrastMode: 'white' }`
 * for white fill/text on dark UI.
 *
 * @param lineId - The line ID
 * @param options - Optional dark-contrast mode
 * @returns CSS custom properties object
 *
 * @example
 * const cssProps = getLineCssProps('northern');
 * // brand --line-color + outline dark vars
 *
 * getLineCssProps('northern', { darkContrastMode: 'white' });
 * // --line-dark-fill / --line-dark-text → #ffffff; stroke/shadows none
 */
export const getLineCssProps = (
  lineId: string,
  options?: LineDarkContrastOptions,
): Record<string, string> => {
  const color = getLineColor(lineId);
  const hex = color.hex;

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const accent = color.darkContrastHex ?? '#ffffff';
  const needsDarkContrast = Boolean(color.poorDarkContrast && color.darkContrastHex);
  const mode = resolveDarkContrastMode(options);
  const useWhite = needsDarkContrast && mode === 'white';
  const useOutline = needsDarkContrast && !useWhite;

  const darkFill = useWhite ? accent : hex;
  const darkText = useWhite ? accent : hex;
  const darkOnFill = useWhite ? hex : accent;

  return {
    '--line-color': hex,
    '--line-color-rgb': `${r}, ${g}, ${b}`,
    '--line-color-contrast': color.poorDarkContrast ? accent : '#000000',
    '--line-dark-fill': needsDarkContrast ? darkFill : hex,
    '--line-dark-text': needsDarkContrast ? darkText : hex,
    '--line-dark-on-fill': needsDarkContrast ? darkOnFill : '#ffffff',
    '--line-dark-text-stroke': useOutline
      ? `${LINE_DARK_TEXT_STROKE_WIDTH_PX}px ${accent}`
      : 'none',
    '--line-dark-paint-order': useOutline ? 'stroke fill' : 'normal',
    '--line-dark-text-shadow': useOutline
      ? hardOutlineTextShadow(accent)
      : 'none',
    '--line-dark-box-shadow': useOutline
      ? hardOutlineBoxShadow(accent)
      : 'none',
  };
};

/**
 * Sort lines by status kind, then TfL severity, then {@link LINE_ORDER}.
 * Uses the operative row per line, not `Math.min` across every status.
 * Returns a new array.
 *
 * @example
 * const sortedLines = sortLinesBySeverityAndOrder(lineStatuses);
 */
export const sortLinesBySeverityAndOrder = <T extends {
  id?: string;
  lineStatuses?: readonly LineStatusLike[];
}>(lines: readonly T[], options?: CurrentStatusOptions): T[] => {
  return [...lines].sort((a, b) => {
    const statusDelta = compareLineStatuses(a.lineStatuses, b.lineStatuses, options);
    if (statusDelta !== 0) return statusDelta;
    return getLineOrder(a.id || '') - getLineOrder(b.id || '');
  });
};

/**
 * Get line display name with mode indicator
 * 
 * @param lineName - The line name
 * @param modeName - The transport mode
 * @returns Formatted display name
 * 
 * @example
 * const displayName = getLineDisplayName('Central', 'tube'); // 'Central'
 * const displayName = getLineDisplayName('Liberty', 'overground'); // 'Liberty (Overground)'
 */
export const getLineDisplayName = (lineName: string, modeName: string): string => {
  // For tube lines, just use the name
  if (modeName === 'tube') {
    return lineName;
  }
  
  // For other modes, add mode indicator
  const modeDisplayNames: Record<string, string> = {
    'overground': 'Overground',
    'elizabeth-line': 'Elizabeth line',
    'dlr': 'DLR',
    'tram': 'Tram',
    'bus': 'Bus',
    'river-bus': 'River Bus',
    'river-tour': 'River Tour',
    'cable-car': 'Cable Car',
    'cycle-hire': 'Cycle Hire',
    'national-rail': 'National Rail'
  };
  
  const modeDisplay = modeDisplayNames[modeName] || modeName;
  return `${lineName} (${modeDisplay})`;
};

/**
 * Get line status summary for quick overview
 * 
 * @param statuses - Array of line status objects
 * @returns Summary object with worst severity and count
 * 
 * @example
 * const summary = getLineStatusSummary(line.lineStatuses);
 * // { worstSeverity: 6, worstDescription: 'Severe Delays', hasIssues: true, issueCount: 1, kind: 'incident' }
 */
export const getLineStatusSummary = (
  statuses: readonly LineStatusLike[] | undefined,
  options?: CurrentStatusOptions,
) => summariseLineStatuses(statuses, options); 