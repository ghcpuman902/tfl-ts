// run by:
// pnpm dlx ts-node playground/demo/realtime.ts

import dotenv from 'dotenv';
import TflClient from '../../src/index';

dotenv.config();

const client = new TflClient();

const main = async (): Promise<void> => {
  console.log('⏱️ Realtime instant-pull demo');
  console.log('==============================\n');

  const stopPointId = '940GZZLUOXC';

  const stop = client.realtime.pollArrivals(
    { stopPointId, intervalMs: 15000 },
    (arrivals) => {
      console.log(`[${new Date().toLocaleTimeString()}] ${arrivals.length} arrivals at Oxford Circus`);
      arrivals.slice(0, 3).forEach((arrival) => {
        const minutes = Math.round((arrival.timeToStation || 0) / 60);
        console.log(`  ${arrival.lineName} → ${arrival.towards} in ${minutes}min`);
      });
      console.log('');
    },
  );

  setTimeout(() => {
    stop();
    console.log('Stopped polling.');
    process.exit(0);
  }, 16000);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
