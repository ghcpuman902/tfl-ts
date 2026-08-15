import { Severity } from '../generated/meta/Meta';

/** Passenger-facing class for a line status row. Not TfL's 0–20 disruption-order key. */
export type StatusKind = 'incident' | 'plannedWork' | 'closed' | 'info' | 'good';

export const STATUS_KIND_ORDER = [
  'incident',
  'plannedWork',
  'closed',
  'info',
  'good',
] as const satisfies readonly StatusKind[];

/** A line status from `getStatus()` or `getDetailedStatus()`. */
export type LineStatusLike = {
  statusSeverity?: number;
  severity?: number;
  statusSeverityDescription?: string;
  severityDescription?: string;
  reason?: string;
  disruption?: { category?: string };
  validityPeriods?: Array<{
    from?: string;
    to?: string;
    fromDate?: string;
    toDate?: string;
    isNow?: boolean;
  }>;
};

export type CurrentStatusOptions = {
  /**
   * Clock used to test validity windows. Pass the time the payload was fetched
   * (for example in a prerendered board) instead of letting the helper call
   * `Date.now()`.
   */
  now?: Date | number | string;
};

/**
 * Exact TfL severity labels → kind. Built from generated metadata descriptions,
 * not substring matching ("No Issues" must not match "issues").
 *
 * "No Service" is incident at levels 2–3 (cable-car) and closed at 20 (National Rail).
 */
const KIND_BY_DESCRIPTION: Record<string, StatusKind> = {
  'special service': 'good',
  'good service': 'good',
  'no issues': 'good',
  'no exceptional delays': 'good',
  'service closed': 'closed',
  'not running': 'closed',
  'planned closure': 'plannedWork',
  'part closure': 'plannedWork',
  'part closed': 'plannedWork',
  'exit only': 'info',
  'no step free access': 'info',
  information: 'info',
  'change of frequency': 'info',
  closed: 'incident',
  suspended: 'incident',
  'part suspended': 'incident',
  'no service': 'incident',
  'severe delays': 'incident',
  'reduced service': 'incident',
  'bus service': 'incident',
  'minor delays': 'incident',
  diverted: 'incident',
  'issues reported': 'incident',
  closure: 'incident',
  severe: 'incident',
  serious: 'incident',
  moderate: 'incident',
  minimal: 'incident',
};

const TUBE_DESCRIPTION_BY_LEVEL = new Map<number, string>();
for (const item of Severity) {
  if (item.modeName !== 'tube') continue;
  if (!TUBE_DESCRIPTION_BY_LEVEL.has(item.severityLevel)) {
    TUBE_DESCRIPTION_BY_LEVEL.set(item.severityLevel, item.description);
  }
}

const PLANNED_WORK_DESCRIPTIONS = new Set(
  Severity.filter((item) => {
    const description = item.description.toLowerCase();
    return (
      description === 'planned closure' ||
      description === 'part closure' ||
      description === 'part closed'
    );
  }).map((item) => item.description.toLowerCase()),
);

export const getStatusSeverity = (status: LineStatusLike): number | undefined =>
  status.statusSeverity ?? status.severity;

export const getStatusDescription = (status: LineStatusLike): string | undefined =>
  status.statusSeverityDescription ?? status.severityDescription;

export const getKindRank = (kind: StatusKind): number => {
  const rank = STATUS_KIND_ORDER.indexOf(kind);
  return rank === -1 ? STATUS_KIND_ORDER.length : rank;
};

const descriptionForLevel = (level: number): string | undefined =>
  TUBE_DESCRIPTION_BY_LEVEL.get(level);

const kindFromDescription = (
  level: number | undefined,
  description: string | undefined,
): StatusKind => {
  if (!description) {
    return level === undefined ? 'info' : 'incident';
  }

  const normalised = description.toLowerCase();
  if (normalised === 'no service' && level === 20) {
    return 'closed';
  }

  return KIND_BY_DESCRIPTION[normalised] ?? 'incident';
};

const applyCategoryOverride = (
  kind: StatusKind,
  description: string | undefined,
  category: string | undefined,
): StatusKind => {
  if (!PLANNED_WORK_DESCRIPTIONS.has((description ?? '').toLowerCase())) {
    return kind;
  }
  if (category === 'Information') return 'closed';
  if (category === 'RealTime') return 'incident';
  return 'plannedWork';
};

/**
 * Classify a status row or a bare TfL severity number.
 *
 * Planned / part closures depend on `disruption.category`: `PlannedWork` stays
 * planned work, `Information` is a standing timetable notice, `RealTime` is an
 * incident. Severity 20 is scheduled closure, not an unplanned Closed (1).
 */
export const getStatusKind = (
  statusOrLevel: LineStatusLike | number,
): StatusKind => {
  if (typeof statusOrLevel === 'number') {
    return kindFromDescription(statusOrLevel, descriptionForLevel(statusOrLevel));
  }

  const level = getStatusSeverity(statusOrLevel);
  const description =
    getStatusDescription(statusOrLevel) ??
    (level !== undefined ? descriptionForLevel(level) : undefined);
  const kind = kindFromDescription(level, description);
  return applyCategoryOverride(kind, description, statusOrLevel.disruption?.category);
};

const toEpoch = (now?: Date | number | string): number => {
  if (now === undefined) return Date.now();
  if (typeof now === 'number') return now;
  if (now instanceof Date) return now.getTime();
  const parsed = Date.parse(now);
  return Number.isNaN(parsed) ? Date.now() : parsed;
};

const periodOverlapsNow = (
  period: NonNullable<LineStatusLike['validityPeriods']>[number],
  now: number,
): boolean => {
  const from = period.from ?? period.fromDate;
  const to = period.to ?? period.toDate;
  if (!from && !to) return true;
  const fromMs = from ? Date.parse(from) : Number.NEGATIVE_INFINITY;
  const toMs = to ? Date.parse(to) : Number.POSITIVE_INFINITY;
  if (Number.isNaN(fromMs) || Number.isNaN(toMs)) return true;
  return now >= fromMs && now <= toMs;
};

const statusOverlapsNow = (status: LineStatusLike, now: number): boolean => {
  const periods = status.validityPeriods ?? [];
  if (periods.length === 0) return true;
  return periods.some((period) => periodOverlapsNow(period, now));
};

const isRealTimeStatus = (status: LineStatusLike): boolean =>
  status.disruption?.category === 'RealTime';

const isWindowedNotice = (status: LineStatusLike): boolean => {
  const category = status.disruption?.category;
  return category === 'PlannedWork' || category === 'Information';
};

/**
 * Status rows that are operative right now.
 *
 * `validityPeriods[].isNow` follows `disruption.category === 'RealTime'`. It is
 * not a clock check. Planned engineering can sit inside today's window with
 * `isNow: false` (London Trams). Prefer RealTime rows, then PlannedWork /
 * Information rows whose window overlaps `now`, then standing rows with no
 * window, then the full list so a line never loses every status.
 */
export const getCurrentLineStatuses = <T extends LineStatusLike>(
  statuses: readonly T[] | undefined,
  options?: CurrentStatusOptions,
): T[] => {
  if (!statuses?.length) return [];

  const realTime = statuses.filter(isRealTimeStatus);
  if (realTime.length) return realTime;

  const now = toEpoch(options?.now);
  const windowed = statuses.filter(
    (status) => isWindowedNotice(status) && statusOverlapsNow(status, now),
  );
  if (windowed.length) return windowed;

  const standing = statuses.filter((status) => !status.validityPeriods?.length);
  if (standing.length) return standing;

  return [...statuses];
};

const compareStatuses = (a: LineStatusLike, b: LineStatusLike): number => {
  const kindDelta = getKindRank(getStatusKind(a)) - getKindRank(getStatusKind(b));
  if (kindDelta !== 0) return kindDelta;

  const aSeverity = getStatusSeverity(a);
  const bSeverity = getStatusSeverity(b);
  const aRank = aSeverity === undefined ? Number.POSITIVE_INFINITY : aSeverity;
  const bRank = bSeverity === undefined ? Number.POSITIVE_INFINITY : bSeverity;
  return aRank - bRank;
};

/** Worst operative row for a line. Ties use kind, then lower TfL severity number. */
export const getWorstCurrentStatus = <T extends LineStatusLike>(
  statuses: readonly T[] | undefined,
  options?: CurrentStatusOptions,
): T | undefined => {
  const current = getCurrentLineStatuses(statuses, options);
  if (!current.length) return undefined;
  return current.reduce((worst, status) =>
    compareStatuses(status, worst) < 0 ? status : worst,
  );
};

/**
 * True when every operative status is good service or an access / information
 * notice. Scheduled closures (20, 16, timetable Planned Closure) are not normal.
 */
export const isNormalService = (
  statuses: readonly LineStatusLike[] | undefined,
  options?: CurrentStatusOptions,
): boolean => {
  const current = getCurrentLineStatuses(statuses, options);
  if (!current.length) return true;
  return current.every((status) => {
    if (getStatusSeverity(status) === undefined && !getStatusDescription(status)) {
      return false;
    }
    const kind = getStatusKind(status);
    return kind === 'good' || kind === 'info';
  });
};

/** True when the operative status is a scheduled / timetable closure. */
export const isScheduledClosure = (
  statuses: readonly LineStatusLike[] | undefined,
  options?: CurrentStatusOptions,
): boolean =>
  getCurrentLineStatuses(statuses, options).some(
    (status) => getStatusKind(status) === 'closed',
  );

/**
 * @deprecated Use {@link isScheduledClosure}. Severity 20 means the line is
 * closed, not that it runs a night service.
 */
export const hasNightService = (
  statuses: readonly LineStatusLike[] | undefined,
): boolean =>
  (statuses ?? []).some((status) => getStatusSeverity(status) === 20);

export const getLineStatusSummary = (
  statuses: readonly LineStatusLike[] | undefined,
  options?: CurrentStatusOptions,
): {
  worstSeverity: number;
  worstDescription: string;
  hasIssues: boolean;
  issueCount: number;
  kind: StatusKind;
} => {
  const current = getCurrentLineStatuses(statuses, options);
  const worst = getWorstCurrentStatus(statuses, options);

  if (!worst) {
    return {
      worstSeverity: 10,
      worstDescription: 'No Status',
      hasIssues: false,
      issueCount: 0,
      kind: 'good',
    };
  }

  const worstSeverity = getStatusSeverity(worst);
  if (worstSeverity === undefined && !getStatusDescription(worst)) {
    return {
      worstSeverity: 10,
      worstDescription: 'Unknown Status',
      hasIssues: true,
      issueCount: current.length,
      kind: getStatusKind(worst),
    };
  }

  const hasIssues = !isNormalService(statuses, options);
  return {
    worstSeverity: worstSeverity ?? 10,
    worstDescription: getStatusDescription(worst) ?? 'Unknown',
    hasIssues,
    issueCount: hasIssues
      ? current.filter((status) => {
          const kind = getStatusKind(status);
          return kind !== 'good' && kind !== 'info';
        }).length
      : 0,
    kind: getStatusKind(worst),
  };
};

export const compareLineStatuses = (
  a: readonly LineStatusLike[] | undefined,
  b: readonly LineStatusLike[] | undefined,
  options?: CurrentStatusOptions,
): number => {
  const aNormal = isNormalService(a, options);
  const bNormal = isNormalService(b, options);
  if (aNormal && bNormal) return 0;

  const aWorst = getWorstCurrentStatus(a, options);
  const bWorst = getWorstCurrentStatus(b, options);
  if (!aWorst && !bWorst) return 0;
  if (!aWorst) return 1;
  if (!bWorst) return -1;
  return compareStatuses(aWorst, bWorst);
};
