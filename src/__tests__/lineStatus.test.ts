import { Severity } from '../generated/meta/Meta';
import {
  getCurrentLineStatuses,
  getLineStatusSummary,
  getSeverityCategory,
  getStatusKind,
  getWorstCurrentStatus,
  isNormalService,
  isScheduledClosure,
  sortLinesBySeverityAndOrder,
} from '../utils/ui';
import type { LineStatusLike } from '../utils/lineStatus';

const SATURDAY_AFTERNOON = '2026-08-15T16:30:00Z';

const waterlooCityStatuses: LineStatusLike[] = [
  {
    statusSeverity: 4,
    statusSeverityDescription: 'Planned Closure',
    reason:
      'Waterloo & City line: service operates 06:00 until 00:30, Monday to Friday only. There is no service on Saturdays, Sundays and on bank/public holidays.',
    validityPeriods: [
      {
        fromDate: '2026-08-15T03:15:00Z',
        toDate: '2026-08-15T22:59:00Z',
        isNow: false,
      },
    ],
    disruption: { category: 'Information' },
  },
  {
    statusSeverity: 20,
    statusSeverityDescription: 'Service Closed',
    reason: 'Waterloo and City Line: Service will resume at 06:00 on Monday. ',
    validityPeriods: [
      {
        fromDate: '2026-08-14T23:30:27Z',
        toDate: '2026-08-15T19:17:22Z',
        isNow: true,
      },
    ],
    disruption: { category: 'RealTime' },
  },
];

const jubileeSevere: LineStatusLike[] = [
  {
    statusSeverity: 6,
    statusSeverityDescription: 'Severe Delays',
    reason: 'Jubilee Line: Severe delays due to an earlier signal failure.',
    validityPeriods: [
      {
        fromDate: '2026-08-15T15:29:09Z',
        toDate: '2026-08-16T00:29:00Z',
        isNow: true,
      },
    ],
    disruption: { category: 'RealTime' },
  },
];

const mildmayStatuses: LineStatusLike[] = [
  {
    statusSeverity: 6,
    statusSeverityDescription: 'Severe Delays',
    reason: 'Mildmay Line: Severe delays and part suspended.',
    validityPeriods: [{ fromDate: '2026-08-15T14:00:00Z', toDate: '2026-08-16T00:29:00Z', isNow: true }],
    disruption: { category: 'RealTime' },
  },
  {
    statusSeverity: 3,
    statusSeverityDescription: 'Part Suspended',
    reason: 'Mildmay Line: Severe delays and part suspended.',
    validityPeriods: [{ fromDate: '2026-08-15T14:00:00Z', toDate: '2026-08-16T00:29:00Z', isNow: true }],
    disruption: { category: 'RealTime' },
  },
];

const tramPlannedWork: LineStatusLike[] = [
  {
    statusSeverity: 5,
    statusSeverityDescription: 'Part Closure',
    reason: 'LONDON TRAMS: no service between Reeves Corner and East Croydon.',
    validityPeriods: [
      {
        fromDate: '2026-08-15T03:15:00Z',
        toDate: '2026-08-15T22:59:00Z',
        isNow: false,
      },
    ],
    disruption: { category: 'PlannedWork' },
  },
];

describe('getStatusKind', () => {
  test('classifies scheduled closures and access notices by code', () => {
    expect(getStatusKind(20)).toBe('closed');
    expect(getStatusKind(16)).toBe('closed');
    expect(getStatusKind(12)).toBe('info');
    expect(getStatusKind(13)).toBe('info');
    expect(getStatusKind(19)).toBe('info');
    expect(getStatusKind(10)).toBe('good');
    expect(getStatusKind(18)).toBe('good');
    expect(getStatusKind(0)).toBe('good');
    expect(getStatusKind(6)).toBe('incident');
    expect(getStatusKind(1)).toBe('incident');
  });

  test('splits Planned Closure on disruption.category', () => {
    expect(
      getStatusKind({
        statusSeverity: 4,
        statusSeverityDescription: 'Planned Closure',
        disruption: { category: 'PlannedWork' },
      }),
    ).toBe('plannedWork');
    expect(
      getStatusKind({
        statusSeverity: 4,
        statusSeverityDescription: 'Planned Closure',
        disruption: { category: 'Information' },
      }),
    ).toBe('closed');
    expect(
      getStatusKind({
        statusSeverity: 5,
        statusSeverityDescription: 'Part Closure',
        disruption: { category: 'RealTime' },
      }),
    ).toBe('incident');
  });

  test('treats National Rail 20 No Service as closed', () => {
    expect(
      getStatusKind({
        statusSeverity: 20,
        statusSeverityDescription: 'No Service',
      }),
    ).toBe('closed');
  });

  test('covers every generated severity description', () => {
    const unclassified = new Set<string>();
    for (const item of Severity) {
      const kind = getStatusKind({
        statusSeverity: item.severityLevel,
        statusSeverityDescription: item.description,
      });
      if (!kind) unclassified.add(`${item.modeName}:${item.description}`);
    }
    expect([...unclassified]).toEqual([]);
  });
});

describe('getSeverityCategory', () => {
  test('does not treat Service Closed or No Issues as a live incident', () => {
    expect(getSeverityCategory(20)).toBe('special');
    expect(getSeverityCategory(18)).toBe('good');
    expect(getSeverityCategory(17)).toBe('minor');
    expect(getSeverityCategory(10)).toBe('good');
    expect(getSeverityCategory(6)).toBe('severe');
    expect(getSeverityCategory(1)).toBe('critical');
    expect(getSeverityCategory(4)).toBe('severe');
  });
});

describe('current status resolution', () => {
  test('Waterloo & City ranks on the live Service Closed row, not the stale Planned Closure', () => {
    const current = getCurrentLineStatuses(waterlooCityStatuses, { now: SATURDAY_AFTERNOON });
    expect(current).toHaveLength(1);
    expect(current[0]?.statusSeverity).toBe(20);

    const worst = getWorstCurrentStatus(waterlooCityStatuses, { now: SATURDAY_AFTERNOON });
    expect(worst?.statusSeverity).toBe(20);
    expect(worst?.statusSeverityDescription).toBe('Service Closed');
    expect(getStatusKind(worst!)).toBe('closed');
    expect(isNormalService(waterlooCityStatuses, { now: SATURDAY_AFTERNOON })).toBe(false);
    expect(isScheduledClosure(waterlooCityStatuses, { now: SATURDAY_AFTERNOON })).toBe(true);
  });

  test('keeps both RealTime rows on a line and ranks the worse one', () => {
    const current = getCurrentLineStatuses(mildmayStatuses);
    expect(current).toHaveLength(2);
    expect(getWorstCurrentStatus(mildmayStatuses)?.statusSeverity).toBe(3);
  });

  test('treats PlannedWork inside today\'s window as current even when isNow is false', () => {
    const current = getCurrentLineStatuses(tramPlannedWork, { now: SATURDAY_AFTERNOON });
    expect(current).toHaveLength(1);
    expect(getStatusKind(current[0]!)).toBe('plannedWork');
  });

  test('summary follows the current row, not index 0', () => {
    const summary = getLineStatusSummary(waterlooCityStatuses, { now: SATURDAY_AFTERNOON });
    expect(summary.worstSeverity).toBe(20);
    expect(summary.worstDescription).toBe('Service Closed');
    expect(summary.kind).toBe('closed');
    expect(summary.hasIssues).toBe(true);
  });
});

describe('sortLinesBySeverityAndOrder', () => {
  test('does not let Waterloo & City outrank a live Severe Delays line', () => {
    const lines = [
      { id: 'waterloo-city', lineStatuses: waterlooCityStatuses },
      { id: 'jubilee', lineStatuses: jubileeSevere },
      { id: 'victoria', lineStatuses: [{ statusSeverity: 10, statusSeverityDescription: 'Good Service' }] },
    ];
    const originalOrder = lines.map((line) => line.id);

    const sorted = sortLinesBySeverityAndOrder(lines, { now: SATURDAY_AFTERNOON });

    expect(sorted.map((line) => line.id)).toEqual(['jubilee', 'waterloo-city', 'victoria']);
    expect(lines.map((line) => line.id)).toEqual(originalOrder);
    expect(sorted).not.toBe(lines);
  });

  test('ranks overlapping PlannedWork above timetable closed and below incidents', () => {
    const sorted = sortLinesBySeverityAndOrder(
      [
        { id: 'waterloo-city', lineStatuses: waterlooCityStatuses },
        { id: 'tram', lineStatuses: tramPlannedWork },
        { id: 'jubilee', lineStatuses: jubileeSevere },
      ],
      { now: SATURDAY_AFTERNOON },
    );
    expect(sorted.map((line) => line.id)).toEqual(['jubilee', 'tram', 'waterloo-city']);
  });

  test('does not treat a missing severity as Special Service', () => {
    const sorted = sortLinesBySeverityAndOrder([
      { id: 'unknown', lineStatuses: [{}] },
      { id: 'central', lineStatuses: [{ statusSeverity: 2, statusSeverityDescription: 'Suspended' }] },
    ]);
    expect(sorted.map((line) => line.id)).toEqual(['central', 'unknown']);
  });
});
