// run by:
// pnpm dlx ts-node playground/demo/occupancy.ts

import dotenv from 'dotenv';
import TflClient from '../../src/index';
import { printSection, printSubsection } from '../lib/format';

dotenv.config();

const client = new TflClient();

const main = async (): Promise<void> => {
  printSection('Occupancy module demo');

  const carParks = await client.occupancy.getAllCarParks();
  printSubsection(`Car parks (${carParks.length})`);
  if (carParks[0]) {
    console.log({
      id: carParks[0].id,
      name: carParks[0].name,
      bays: carParks[0].bays?.length ?? 0,
    });
  }

  const bikePoints = await client.bikePoint.get();
  const bikePointIds = bikePoints
    .map((point) => point.id)
    .filter((id): id is string => Boolean(id))
    .slice(0, 2);

  if (!bikePointIds.length) {
    console.log('No bike point IDs available for occupancy lookup.');
    return;
  }

  const bikePointOccupancies = await client.occupancy.getBikePointsByIds({ bikePointIds });
  printSubsection(`Bike point occupancy (${bikePointOccupancies.length})`);
  bikePointOccupancies.forEach((entry, index) => {
    console.log(`${index + 1}. ${entry.id} -> ${entry.name}`);
  });
};

main().catch((error) => {
  console.error('Occupancy demo failed:', error);
  process.exit(1);
});
