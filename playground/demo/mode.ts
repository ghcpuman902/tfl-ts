// run by:
// pnpm dlx ts-node playground/demo/mode.ts

import dotenv from 'dotenv';
import TflClient from '../../src/index';
import { printSection, printSubsection } from '../lib/format';

dotenv.config();

const client = new TflClient();

const main = async (): Promise<void> => {
  printSection('Mode module demo');

  printSubsection('Static metadata');
  console.log(`Known modes: ${client.mode.MODE_NAMES.length}`);
  console.log(`TfL-operated sample: ${client.mode.TFL_OPERATED_MODES.slice(0, 5).join(', ')}`);

  const serviceTypes = await client.mode.getActiveServiceTypes();
  printSubsection(`Active service types (${serviceTypes.length})`);
  serviceTypes.forEach((type, index) => {
    console.log(`${index + 1}. ${type.serviceType || type.mode || 'Unknown'}`);
  });

  const tubeArrivals = await client.mode.getArrivals({ mode: 'tube', count: 3 });
  printSubsection(`Tube arrivals sample (${tubeArrivals.length})`);
  tubeArrivals.slice(0, 5).forEach((arrival, index) => {
    const minutes = Math.round((arrival.timeToStation || 0) / 60);
    console.log(
      `${index + 1}. ${arrival.stationName || arrival.naptanId} -> ${arrival.lineName} in ${minutes}min`,
    );
  });
};

main().catch((error) => {
  console.error('Mode demo failed:', error);
  process.exit(1);
});
