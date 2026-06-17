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
 * 
 * // Get accessible label for screen readers
 * const label = getAccessibleSeverityLabel(10, 'Good Service'); // 'Good Service - No issues reported'
 */

// Import generated metadata for accurate data
import { Lines } from '../generated/meta/Line';
import { Severity } from '../generated/meta/Meta';

// Types
export type LineId = typeof Lines[number]['id'];
export type SeverityLevel = number; // Use number to match generated API types
export type SeverityDescription = typeof Severity[number]['description'];

/**
 * Line color information with accessibility considerations.
 * Use `hex` with inline styles or CSS — do not rely on framework-specific class names.
 */
export interface LineColorInfo {
  /** Official TfL hex color code */
  hex: string;
  /** Whether this color has poor contrast on dark backgrounds */
  poorDarkContrast: boolean;
  /** Suggested contrasting hex when `poorDarkContrast` is true (e.g. on dark themes) */
  darkContrastHex?: string;
}

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
export const buildSeverityMapping = (): SeverityMapping => {
  const mapping: SeverityMapping = {
    critical: [],
    severe: [],
    minor: [],
    special: [],
    good: []
  };

  Severity.forEach(item => {
    const level = item.severityLevel;
    const description = item.description.toLowerCase();

    if (description.includes('closed') || description.includes('suspended') || description.includes('not running')) {
      mapping.critical.push(level);
    } else if (description.includes('severe') || description.includes('part closure') || description.includes('exit only')) {
      mapping.severe.push(level);
    } else if (description.includes('minor') || description.includes('reduced') || description.includes('bus service') || description.includes('diverted') || description.includes('issues')) {
      mapping.minor.push(level);
    } else if (description.includes('special') || description.includes('no step free') || description.includes('information')) {
      mapping.special.push(level);
    } else if (description.includes('good') || description.includes('no issues') || description.includes('closed for the night')) {
      mapping.good.push(level);
    }
  });

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
export const getSeverityCategory = (severityLevel: SeverityLevel): SeverityCategory => {
  if (SEVERITY_MAPPING.critical.includes(severityLevel)) return 'critical';
  if (SEVERITY_MAPPING.severe.includes(severityLevel)) return 'severe';
  if (SEVERITY_MAPPING.minor.includes(severityLevel)) return 'minor';
  if (SEVERITY_MAPPING.special.includes(severityLevel)) return 'special';
  if (SEVERITY_MAPPING.good.includes(severityLevel)) return 'good';
  
  // Default to minor for unknown severity levels
  return 'minor';
};

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
export const isNormalService = (statuses: Array<{ statusSeverity?: SeverityLevel }>): boolean => {
  return statuses.every(status => {
    const severity = status.statusSeverity;
    if (severity === undefined) return false;
    return SEVERITY_MAPPING.good.includes(severity) || SEVERITY_MAPPING.special.includes(severity);
  });
};

/**
 * Check if line has night closure
 * 
 * @param statuses - Array of line status objects
 * @returns True if any status indicates night closure (severity 20)
 * 
 * @example
 * const hasNightClosure = hasNightService(line.lineStatuses);
 * if (hasNightClosure) {
 *   // Show night closure indicator
 * }
 */
export const hasNightService = (statuses: Array<{ statusSeverity?: SeverityLevel }>): boolean => {
  return statuses.some(status => status.statusSeverity === 20);
};

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
  statuses: Array<{ statusSeverity?: SeverityLevel; statusSeverityDescription?: string }>
): string => {
  if (!statuses.length) {
    return `${lineName} line: No status information available`;
  }
  
  const statusLabels = statuses.map(status => {
    if (!status.statusSeverity || !status.statusSeverityDescription) {
      return 'Unknown status';
    }
    return getAccessibleSeverityLabel(status.statusSeverity, status.statusSeverityDescription);
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

/**
 * Get CSS custom properties for line colors
 * 
 * @param lineId - The line ID
 * @returns CSS custom properties object
 * 
 * @example
 * const cssProps = getLineCssProps('central');
 * // Returns: { '--line-color': '#E32017', '--line-color-rgb': '227, 32, 23' }
 */
export const getLineCssProps = (lineId: string): Record<string, string> => {
  const color = getLineColor(lineId);
  const hex = color.hex;
  
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  return {
    '--line-color': hex,
    '--line-color-rgb': `${r}, ${g}, ${b}`,
    '--line-color-contrast': color.poorDarkContrast ? '#ffffff' : '#000000'
  };
};

/**
 * Sort lines by severity and importance
 * 
 * @param lines - Array of line objects with status information
 * @returns Sorted array of lines
 * 
 * @example
 * const sortedLines = sortLinesBySeverityAndOrder(lineStatuses);
 */
export const sortLinesBySeverityAndOrder = <T extends { 
  id?: string; 
  lineStatuses?: Array<{ statusSeverity?: SeverityLevel }> 
}>(lines: T[]): T[] => {
  return lines.sort((a, b) => {
    const aMinSeverity = Math.min(...(a.lineStatuses?.map(s => s.statusSeverity || 0) || []));
    const bMinSeverity = Math.min(...(b.lineStatuses?.map(s => s.statusSeverity || 0) || []));

    // If both lines have normal service, sort by predefined order
    if (isNormalService(a.lineStatuses || []) && isNormalService(b.lineStatuses || [])) {
      return getLineOrder(a.id || '') - getLineOrder(b.id || '');
    }

    // If severities are different, sort by severity (lower = more severe)
    if (aMinSeverity !== bMinSeverity) {
      return aMinSeverity - bMinSeverity;
    }

    // If both lines have the same severity level (but not normal),
    // still sort by predefined order as a fallback
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
 * // Returns: { worstSeverity: 6, worstDescription: 'Severe Delays', hasIssues: true, issueCount: 1 }
 */
export const getLineStatusSummary = (statuses: Array<{ 
  statusSeverity?: SeverityLevel; 
  statusSeverityDescription?: string 
}>) => {
  if (!statuses.length) {
    return {
      worstSeverity: 10,
      worstDescription: 'No Status',
      hasIssues: false,
      issueCount: 0
    };
  }
  
  const validStatuses = statuses.filter(s => s.statusSeverity !== undefined);
  if (!validStatuses.length) {
    return {
      worstSeverity: 10,
      worstDescription: 'Unknown Status',
      hasIssues: false,
      issueCount: 0
    };
  }
  
  const worstStatus = validStatuses.reduce((worst, current) => {
    return (current.statusSeverity || 10) < (worst.statusSeverity || 10) ? current : worst;
  });
  
  const hasIssues = !isNormalService(validStatuses);
  
  return {
    worstSeverity: worstStatus.statusSeverity || 10,
    worstDescription: worstStatus.statusSeverityDescription || 'Unknown',
    hasIssues,
    issueCount: hasIssues ? validStatuses.length : 0
  };
}; 