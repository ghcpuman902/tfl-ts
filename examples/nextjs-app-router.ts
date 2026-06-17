/**
 * Next.js App Router example — tube status board (Server Component)
 *
 * Copy into a Next.js 15+ app:
 *   app/status/page.tsx
 *
 * Prerequisites:
 *   pnpm add tfl-ts
 *   Set TFL_APP_ID and TFL_APP_KEY in .env.local (server-side only)
 */

import TflClient, {
  sortLinesBySeverityAndOrder,
  getSeverityCategory,
  getLineColor,
  getLineCssProps,
} from 'tfl-ts';

// ISR: revalidate every 60 seconds (line status changes on disruptions)
export const revalidate = 60;

const getTubeStatus = async () => {
  const client = new TflClient();
  const statuses = await client.line.getStatus({
    modes: ['tube', 'elizabeth-line', 'dlr'],
  });
  return sortLinesBySeverityAndOrder(statuses);
};

export default async function StatusPage() {
  const lines = await getTubeStatus();

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">London Line Status</h1>
      <ul className="space-y-3" role="list" aria-label="Line status board">
        {lines.map((line) => {
          const worst = line.lineStatuses?.[0];
          const severity = worst?.statusSeverity ?? 10;
          const category = getSeverityCategory(severity);
          const colors = getLineColor(line.id ?? '');
          const cssProps = getLineCssProps(line.id ?? '');

          return (
            <li
              key={line.id}
              className="flex items-center justify-between rounded-lg border p-4"
              style={{ borderLeft: `4px solid ${colors.hex}`, ...cssProps }}
              aria-label={`${line.name}: ${worst?.statusSeverityDescription ?? 'Unknown'}`}
            >
              <span className="font-medium" style={{ color: colors.hex }}>
                {line.name}
              </span>
              <span
                className={
                  category === 'good'
                    ? 'text-green-700'
                    : category === 'severe'
                      ? 'text-orange-700'
                      : 'text-red-700'
                }
              >
                {worst?.statusSeverityDescription ?? 'No data'}
              </span>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

/**
 * Static metadata usage (no API call) — use in any component:
 *
 *   const client = new TflClient();
 *   const isValid = 'central' in client.line.LINE_NAMES;
 *   const displayName = client.line.LINE_NAMES['central']; // "Central"
 *
 * Do NOT call getStatus() just to get line names — use LINE_NAMES instead.
 */
