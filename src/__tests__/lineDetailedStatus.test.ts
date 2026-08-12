import TflClient, { mapDetailedLines } from '../index';

process.env.TFL_APP_KEY = 'test-app-key';
delete process.env.TFL_APP_ID;

const rawLine = {
  id: 'bakerloo',
  name: 'Bakerloo',
  modeName: 'tube',
  lineStatuses: [
    {
      id: 12,
      lineId: 'bakerloo',
      statusSeverity: 5,
      statusSeverityDescription: 'Part Closure',
      reason: "No service between Queen's Park and Harrow & Wealdstone.",
      validityPeriods: [
        {
          fromDate: '2026-08-08T03:30:00Z',
          toDate: '2026-08-10T00:29:00Z',
          isNow: false,
        },
      ],
      disruption: {
        category: 'PlannedWork' as const,
        closureText: 'partClosure',
        description: 'Bakerloo line planned closure.',
        affectedRoutes: [
          {
            id: '1910',
            direction: 'inbound',
            originationName: 'Harrow & Wealdstone Underground Station',
            destinationName: 'Elephant & Castle Underground Station',
            isEntireRouteSection: false,
            routeSectionNaptanEntrySequence: [
              {
                ordinal: 0,
                stopPoint: {
                  id: '940GZZLUHAW',
                  naptanId: '940GZZLUHAW',
                  commonName: 'Harrow & Wealdstone Underground Station',
                },
              },
            ],
          },
        ],
        affectedStops: [
          {
            id: '940GZZLUHAW',
            naptanId: '940GZZLUHAW',
            commonName: 'Harrow & Wealdstone Underground Station',
          },
        ],
      },
    },
  ],
};

describe('Line.getDetailedStatus', () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    mockFetch.mockReset();
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  test('requests detail and returns friendly status and disruption fields', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [rawLine],
    });

    const client = new TflClient();
    const lines = await client.line.getDetailedStatus({ lineIds: ['bakerloo'] });

    expect(String(mockFetch.mock.calls[0][0])).toContain('detail=true');
    expect(lines).toEqual([
      expect.objectContaining({
        id: 'bakerloo',
        name: 'Bakerloo',
        statuses: [
          expect.objectContaining({
            severity: 5,
            severityDescription: 'Part Closure',
            validityPeriods: [
              {
                from: '2026-08-08T03:30:00Z',
                to: '2026-08-10T00:29:00Z',
                isNow: false,
              },
            ],
            disruption: expect.objectContaining({
              category: 'PlannedWork',
              closureType: 'partClosure',
              affectedRoutes: [
                expect.objectContaining({
                  originName: 'Harrow & Wealdstone Underground Station',
                  isEntireRouteSection: false,
                  stops: [
                    expect.objectContaining({
                      id: '940GZZLUHAW',
                      ordinal: 0,
                    }),
                  ],
                }),
              ],
              affectedStops: [expect.objectContaining({ id: '940GZZLUHAW' })],
            }),
          }),
        ],
      }),
    ]);
  });

  test('maps missing arrays to empty arrays', () => {
    expect(mapDetailedLines([{ id: 'victoria', name: 'Victoria' }])).toEqual([
      {
        id: 'victoria',
        name: 'Victoria',
        modeName: undefined,
        created: undefined,
        modified: undefined,
        statuses: [],
        disruptions: [],
      },
    ]);
  });
});
