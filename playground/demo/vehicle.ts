// run by:
// pnpm dlx ts-node playground/demo/vehicle.ts

import dotenv from 'dotenv';
import TflClient from '../../src/index';
import { printSection, printSubsection } from '../lib/format';

dotenv.config();

const client = new TflClient();

const main = async (): Promise<void> => {
  printSection('Vehicle module demo');

  const stopSearch = await client.stopPoint.search({ query: '51800', modes: ['bus'] });
  const stopPointId = stopSearch.matches?.[0]?.id;

  if (!stopPointId) {
    console.log('No bus stop found to derive vehicle IDs.');
    return;
  }

  printSubsection(`Using stop point ${stopPointId}`);
  const arrivals = await client.stopPoint.getArrivals({ stopPointIds: [stopPointId] });
  const vehicleIds = Array.from(
    new Set(arrivals.map((arrival) => arrival.vehicleId).filter((id): id is string => Boolean(id))),
  ).slice(0, 3);

  if (vehicleIds.length === 0) {
    console.log('No vehicle IDs found in stop point arrivals.');
    return;
  }

  console.log(`Vehicle IDs: ${vehicleIds.join(', ')}`);
  const vehicleArrivals = await client.vehicle.getArrivals({ vehicleIds });
  printSubsection(`Vehicle predictions (${vehicleArrivals.length})`);
  vehicleArrivals.slice(0, 5).forEach((item, index) => {
    const minutes = Math.round((item.timeToStation ?? 0) / 60);
    console.log(`${index + 1}. ${item.vehicleId} -> ${item.lineName} to ${item.towards} (${minutes} min)`);
  });
};

main().catch((error) => {
  console.error('Vehicle demo failed:', error);
  process.exit(1);
});
