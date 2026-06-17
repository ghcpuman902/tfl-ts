// run by:
// pnpm dlx ts-node playground/demo/vehicle.ts

import TflClient from '../../src/index';
import dotenv from 'dotenv';

dotenv.config();

const client = new TflClient();

const main = async () => {
  try {
    console.log('Vehicle demo');
    console.log('============');

    const stopSearch = await client.stopPoint.search({ query: '51800', modes: ['bus'] });
    const stopPointId = stopSearch.matches?.[0]?.id;

    if (!stopPointId) {
      console.log('No bus stop found to derive vehicle IDs.');
      return;
    }

    console.log('Using stop point:', stopPointId);
    const arrivals = await client.stopPoint.getArrivals({ stopPointIds: [stopPointId] });
    const vehicleIds = Array.from(
      new Set(arrivals.map((arrival) => arrival.vehicleId).filter((id): id is string => Boolean(id)))
    ).slice(0, 3);

    if (vehicleIds.length === 0) {
      console.log('No vehicle IDs found in stop point arrivals.');
      return;
    }

    console.log('Vehicle IDs:', vehicleIds.join(', '));
    const vehicleArrivals = await client.vehicle.getArrivals({ vehicleIds });
    console.log(`Fetched ${vehicleArrivals.length} vehicle predictions.`);
    vehicleArrivals.slice(0, 5).forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.vehicleId} -> ${item.lineName} to ${item.towards} (${Math.round(
          (item.timeToStation ?? 0) / 60
        )} min)`
      );
    });
  } catch (error) {
    console.error('Vehicle demo failed:', error);
  }
};

main();
import dotenv from 'dotenv';
import TflClient from '../../src/index';

dotenv.config();

const client = new TflClient();

const main = async () => {
  try {
    console.log('Vehicle arrivals demo');
    console.log('=====================');

    const stopPointId = '490003191F';
    const stopArrivals = await client.stopPoint.getArrivals({ stopPointIds: [stopPointId] });
    const vehicleIds = Array.from(
      new Set((stopArrivals || []).map(arrival => arrival.vehicleId).filter(Boolean)),
    ).slice(0, 3) as string[];

    if (!vehicleIds.length) {
      console.log(`No vehicle IDs found from stop point ${stopPointId}.`);
      return;
    }

    console.log(`Vehicle IDs from stop ${stopPointId}: ${vehicleIds.join(', ')}`);

    const arrivals = await client.vehicle.getArrivals({ vehicleIds });
    console.log(`Received ${arrivals.length} vehicle predictions`);
    arrivals.slice(0, 5).forEach((arrival, index) => {
      console.log(
        `${index + 1}. ${arrival.vehicleId} | ${arrival.lineName} | ${arrival.towards} | ${
          arrival.timeToStation ?? 'n/a'
        }s`,
      );
    });
  } catch (error) {
    console.error('Vehicle demo failed:', error);
  }
};

main();
