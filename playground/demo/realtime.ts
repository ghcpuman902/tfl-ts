// run by:
// pnpm dlx ts-node playground/demo/realtime.ts

import dotenv from 'dotenv';
import TflClient from '../../src/index';
import { printSection } from '../lib/format';

dotenv.config();

const client = new TflClient();

const POLL_DURATION_MS = 16000;
const POLL_INTERVAL_MS = 15000;

const main = async (): Promise<void> => {
  printSection('Realtime instant-pull demo');

  const stopPointId = '940GZZLUOXC';
  console.log(`Polling arrivals for ${stopPointId} for ${POLL_DURATION_MS / 1000}s`);

  const stop = client.realtime.pollArrivals(
    { stopPointId, intervalMs: POLL_INTERVAL_MS },
    (arrivals) => {
      console.log(`[${new Date().toLocaleTimeString()}] ${arrivals.length} arrivals`);
      arrivals.slice(0, 3).forEach((arrival) => {
        const minutes = Math.round((arrival.timeToStation || 0) / 60);
        console.log(`  ${arrival.lineName} -> ${arrival.towards} in ${minutes}min`);
      });
      console.log('');
    },
  );

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      stop();
      console.log('Stopped polling.');
      resolve();
    }, POLL_DURATION_MS);
  });
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
