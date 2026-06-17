// run by:
// pnpm dlx ts-node playground/demo/occupancy.ts

import TflClient from '../../src/index';
import dotenv from 'dotenv';

dotenv.config();

const client = new TflClient();

const main = async () => {
  try {
    console.log('Occupancy demo');
    console.log('==============');

    const carParks = await client.occupancy.getAllCarParks();
    console.log(`Car parks with occupancy: ${carParks.length}`);
    if (carParks[0]) {
      console.log('First car park sample:', {
        id: carParks[0].id,
        name: carParks[0].name,
        bays: carParks[0].bays?.length ?? 0,
      });
    }

    const allBikePoints = await client.bikePoint.get();
    const bikePointIds = allBikePoints
      .map((bikePoint) => bikePoint.id)
      .filter((id): id is string => Boolean(id))
      .slice(0, 2);

    if (bikePointIds.length > 0) {
      const bikePointOccupancy = await client.occupancy.getBikePointsByIds({ bikePointIds });
      console.log(`Bike point occupancy records for ${bikePointIds.length} IDs: ${bikePointOccupancy.length}`);
    } else {
      console.log('No bike point IDs available for occupancy lookup.');
    }
  } catch (error) {
    console.error('Occupancy demo failed:', error);
  }
};

main();
import dotenv from 'dotenv';
import TflClient from '../../src/index';

dotenv.config();

const client = new TflClient();

const main = async () => {
  try {
    console.log('Occupancy demo');
    console.log('==============');

    const carParks = await client.occupancy.getAllCarParks();
    console.log(`Car parks with occupancy data: ${carParks.length}`);
    if (carParks[0]) {
      console.log('First car park sample:', {
        id: carParks[0].id,
        name: carParks[0].name,
        bays: carParks[0].bays?.length ?? 0,
      });
    }

    const bikePoints = await client.bikePoint.get();
    const bikePointIds = bikePoints.slice(0, 2).map(point => point.id).filter(Boolean) as string[];

    if (!bikePointIds.length) {
      console.log('No bike point IDs available for occupancy lookup.');
      return;
    }

    const bikePointOccupancies = await client.occupancy.getBikePointsByIds({ bikePointIds });
    console.log(`Bike point occupancies fetched: ${bikePointOccupancies.length}`);
    bikePointOccupancies.forEach((entry, index) => {
      console.log(`${index + 1}. ${entry.id} => ${entry.name}`);
    });
  } catch (error) {
    console.error('Occupancy demo failed:', error);
  }
};

main();
