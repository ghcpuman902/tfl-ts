// run by:
// pnpm run demo:realtime

import dotenv from 'dotenv';
import TflClient from '../../src/index';
import { printSection, printSubsection } from '../lib/format';

dotenv.config();

const client = new TflClient();

const POLL_DURATION_MS = 18_000;
const POLL_INTERVAL_MS = 15_000;

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const main = async (): Promise<void> => {
  printSection('Realtime instant-pull demo (v2.2)');

  // 1. Multi-stop poll with sort + meta
  printSubsection('pollArrivals — multi-stop, sorted');
  const oxfordCircus = '940GZZLUOXC';
  const victoria = '940GZZLUVIC';

  const multiStop = client.realtime.pollArrivals(
    {
      stopPointIds: [oxfordCircus, victoria],
      intervalMs: POLL_INTERVAL_MS,
      sortBy: 'timeToStation',
      lineIds: ['central', 'victoria', 'northern'],
    },
    (arrivals, meta) => {
      console.log(
        `[${meta.fetchedAt.toLocaleTimeString()}] tick ${meta.tick} — ${arrivals.length} arrivals` +
          (meta.hadDeletions ? ' (had deletions)' : ''),
      );
      arrivals.slice(0, 4).forEach((arrival) => {
        const minutes = Math.round((arrival.timeToStation || 0) / 60);
        console.log(
          `  ${arrival.stationName?.slice(0, 12) ?? '?'} | ${arrival.lineName} → ${arrival.destinationName} in ${minutes}min`,
        );
      });
      console.log('');
    },
    (error, meta) => {
      console.error(`[tick ${meta.tick}] poll error:`, error);
    },
  );

  await sleep(POLL_DURATION_MS);
  multiStop();
  console.log('Stopped multi-stop poll.\n');

  // 2. Line-filtered poll at one stop
  printSubsection('pollLineArrivals — Central at Oxford Circus');
  const linePoll = client.realtime.pollLineArrivals(
    {
      lineIds: ['central'],
      stopPointId: oxfordCircus,
      intervalMs: POLL_INTERVAL_MS,
      immediate: true,
    },
    (arrivals, meta) => {
      console.log(
        `[line poll tick ${meta.tick}] ${arrivals.length} central arrivals at Oxford Circus`,
      );
      arrivals.slice(0, 2).forEach((a) => {
        console.log(`  → ${a.destinationName} (${a.timeToStation}s)`);
      });
    },
  );

  await sleep(8_000);
  linePoll();
  console.log('Stopped line poll.');
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
