/**
 * COPY-PASTE REFERENCE — tube / rail status board (showcase-aligned)
 *
 * Paste into YOUR app (e.g. Next.js App Router `app/status/page.tsx`).
 * This file is NOT compiled or run by the tfl-ts package. No React dependency
 * is required by tfl-ts — adapt the JSX to Vue, Svelte, plain HTML, etc.
 *
 * Data → UI contract (framework-agnostic):
 *   1. line.getStatus for tube + rail modes
 *   2. sortLinesBySeverityAndOrder
 *   3. partition with isNormalService (disruptions vs good service)
 *   4. brand titles/bars with getLineInlineStyles + getLineCssProps
 *   5. night badge via hasNightService; severity copy from statusSeverityDescription
 *
 * Live reference UI: https://manglekuo.com/showcase/tfl-ts
 * Clone-local HTML board: pnpm run playground → /status
 *
 * Prerequisites in YOUR app:
 *   pnpm add tfl-ts
 *   TFL_APP_ID / TFL_APP_KEY in server env only
 */

import TflClient, {
  sortLinesBySeverityAndOrder,
  getLineInlineStyles,
  getLineCssProps,
  getSeverityClasses,
  isNormalService,
  hasNightService,
} from 'tfl-ts';

/** ISR-friendly: line status changes on disruptions — ~60s is enough. */
export const revalidate = 60;

const hasOvergroundStripe = (modeName?: string) =>
  modeName === 'overground' || modeName === 'elizabeth-line';

const stripStatusReason = (reason: string, lineName?: string) =>
  reason
    .replace(new RegExp(`^${lineName?.toUpperCase()}( LINE)?: `, 'i'), '')
    .replace(
      /^(Hammersmith and City Line: )|(London Overground: )|(Docklands Light Railway: )\s*/,
      '',
    );

const getLineStatuses = async () => {
  const client = new TflClient();
  const statuses = await client.line.getStatus({
    modes: ['tube', 'elizabeth-line', 'dlr', 'tram', 'overground'],
  });
  return sortLinesBySeverityAndOrder(statuses);
};

export default async function StatusPage() {
  const sorted = await getLineStatuses();
  const disrupted = sorted.filter((line) => !isNormalService(line.lineStatuses ?? []));
  const goodService = sorted.filter((line) => isNormalService(line.lineStatuses ?? []));

  return (
    <main className="mx-auto max-w-4xl p-6 space-y-8">
      <h1 className="text-2xl font-bold">London line status</h1>

      {disrupted.length > 0 && (
        <section aria-label="Service disruptions">
          <h2 className="mb-3 text-lg font-semibold">Service disruptions</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {disrupted.map((line) => {
              const styles = getLineInlineStyles(line.id ?? '');
              const cssProps = getLineCssProps(line.id ?? '');

              return (
                <li
                  key={line.id}
                  className="flex flex-col gap-1 border border-neutral-200 p-4"
                  style={cssProps}
                >
                  <h3
                    className="text-lg font-semibold dark:[text-shadow:var(--line-dark-text-shadow)]"
                    style={{ color: styles.color }}
                  >
                    {line.name}
                  </h3>
                  {/* Color bar: brand hex via --line-color; Overground/Elizabeth get a white stripe */}
                  <div className="relative h-[6px] w-full">
                    <div
                      className="h-full w-full dark:[box-shadow:var(--line-dark-box-shadow)]"
                      style={{ backgroundColor: 'var(--line-color)' }}
                    />
                    {hasOvergroundStripe(line.modeName) && (
                      <div className="absolute left-0 top-[2px] h-[2px] w-full bg-white" />
                    )}
                  </div>

                  {line.lineStatuses?.map((status, index) => {
                    const severity = getSeverityClasses(status.statusSeverity ?? 10, true);
                    return (
                      <div key={index} className="mt-2">
                        <span className={`font-medium ${severity.text} ${severity.animation}`}>
                          {status.statusSeverityDescription}
                        </span>
                        {status.reason && (
                          <span className="mt-1 block text-sm text-neutral-600">
                            {stripStatusReason(status.reason, line.name)}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section aria-label="Good service">
        <h2 className="mb-3 text-lg font-semibold">Good service</h2>
        <ul className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" role="list">
          {goodService.map((line) => {
            const styles = getLineInlineStyles(line.id ?? '');
            const cssProps = getLineCssProps(line.id ?? '');
            const night = hasNightService(line.lineStatuses ?? []);

            return (
              <li
                key={line.id}
                className="flex flex-col gap-2 border border-neutral-200 p-3"
                style={cssProps}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="text-sm font-semibold leading-tight dark:[text-shadow:var(--line-dark-text-shadow)]"
                    style={{ color: styles.color }}
                  >
                    {line.name}
                  </h3>
                  {night && (
                    <span className="text-xs text-neutral-500">
                      {
                        line.lineStatuses?.find((s) => s.statusSeverity === 20)
                          ?.statusSeverityDescription
                      }
                    </span>
                  )}
                </div>
                <div className="relative h-[4px] w-full">
                  <div
                    className="h-full w-full dark:[box-shadow:var(--line-dark-box-shadow)]"
                    style={{ backgroundColor: 'var(--line-color)' }}
                  />
                  {hasOvergroundStripe(line.modeName) && (
                    <div className="absolute left-0 top-[1px] h-[2px] w-full bg-white" />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

/**
 * Static metadata (no API call) — use anywhere:
 *
 *   const client = new TflClient();
 *   const displayName = client.line.LINE_NAMES['central']; // "Central"
 *
 * Do NOT call getStatus() just to get line names.
 */
