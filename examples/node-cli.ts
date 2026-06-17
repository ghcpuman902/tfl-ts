/**
 * Node.js CLI example — search stop → get arrivals
 *
 * Run:
 *   TFL_APP_ID=... TFL_APP_KEY=... npx ts-node examples/node-cli.ts
 *   TFL_APP_ID=... TFL_APP_KEY=... npx ts-node examples/node-cli.ts "Bank" tube
 */

import TflClient from 'tfl-ts';

const QUERY = process.argv[2] ?? 'Oxford Circus';
const MODES = (process.argv[3] ?? 'tube').split(',');

const client = new TflClient();

const resolveStopId = async (query: string, modes: string[]): Promise<string> => {
  const result = await client.stopPoint.search({ query, modes });
  const id = result.matches?.[0]?.id;

  if (!id) {
    throw new Error(`No stop found for "${query}" (modes: ${modes.join(', ')})`);
  }

  console.log(`Resolved "${query}" → ${id} (${result.matches?.[0]?.name})`);
  return id;
};

const printArrivals = async (stopPointId: string): Promise<void> => {
  const arrivals = await client.stopPoint.getArrivals({ stopPointIds: [stopPointId] });

  const sorted = [...arrivals].sort(
    (a, b) => (a.timeToStation ?? 0) - (b.timeToStation ?? 0),
  );

  if (sorted.length === 0) {
    console.log('No arrivals found.');
    return;
  }

  console.log(`\nNext ${Math.min(5, sorted.length)} arrivals:\n`);

  for (const arrival of sorted.slice(0, 5)) {
    const mins = Math.round((arrival.timeToStation ?? 0) / 60);
    console.log(
      `  ${arrival.lineName ?? 'Unknown'} to ${arrival.towards ?? 'Unknown'}` +
        ` — ${mins}min (${arrival.platformName ?? 'n/a'})`,
    );
  }
};

const main = async (): Promise<void> => {
  // Validate modes against static metadata (no API call)
  const invalidModes = MODES.filter((m) => !client.stopPoint.MODE_NAMES.includes(m));
  if (invalidModes.length > 0) {
    console.warn(`Warning: unknown modes: ${invalidModes.join(', ')}`);
    console.warn(`Valid modes include: ${client.stopPoint.MODE_NAMES.slice(0, 8).join(', ')}…`);
  }

  const stopPointId = await resolveStopId(QUERY, MODES);
  await printArrivals(stopPointId);
};

main().catch((error) => {
  console.error('Error:', error instanceof Error ? error.message : error);
  process.exit(1);
});
