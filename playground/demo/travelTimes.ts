// run by:
// pnpm dlx ts-node playground/demo/travelTimes.ts

import TflClient from '../../src/index';
import dotenv from 'dotenv';

dotenv.config();

const client = new TflClient();

const baseQuery = {
  z: 12,
  mapCenterLat: 51.5074,
  mapCenterLon: -0.1278,
  pinLat: 51.5154,
  pinLon: -0.1419,
  width: 256,
  height: 256,
  scenarioTitle: 'Demo',
  timeOfDayId: 'AM',
  modeId: 'tube',
  direction: 'From' as const,
  travelTimeInterval: 15,
};

const main = async () => {
  try {
    console.log('TravelTimes demo');
    console.log('================');

    const overlay = await client.travelTimes.getOverlay(baseQuery);
    console.log('Overlay type:', typeof overlay);
    console.log('Overlay keys:', Object.keys(overlay).slice(0, 10));

    const compareOverlay = await client.travelTimes.getCompareOverlay({
      ...baseQuery,
      compareType: 'mode',
      compareValue: 'bus',
    });
    console.log('Compare overlay type:', typeof compareOverlay);
    console.log('Compare overlay keys:', Object.keys(compareOverlay).slice(0, 10));
  } catch (error) {
    console.error('TravelTimes demo failed:', error);
  }
};

main();
import dotenv from 'dotenv';
import TflClient from '../../src/index';

dotenv.config();

const client = new TflClient();

const baseOverlayInput = {
  z: 12,
  mapCenterLat: 51.5074,
  mapCenterLon: -0.1278,
  pinLat: 51.5154,
  pinLon: -0.1419,
  width: 256,
  height: 256,
  scenarioTitle: 'TfL ts demo',
  timeOfDayId: 'AM',
  modeId: 'tube',
  direction: 'From' as const,
  travelTimeInterval: 15,
};

const main = async () => {
  try {
    console.log('TravelTimes demo');
    console.log('================');

    const overlay = await client.travelTimes.getOverlay(baseOverlayInput);
    console.log(`Overlay type: ${typeof overlay}`);
    console.log(`Overlay keys: ${Object.keys(overlay).join(', ')}`);

    const compareOverlay = await client.travelTimes.getCompareOverlay({
      ...baseOverlayInput,
      compareType: 'timeOfDayId',
      compareValue: 'PM',
    });

    console.log(`Compare overlay type: ${typeof compareOverlay}`);
    console.log(`Compare overlay keys: ${Object.keys(compareOverlay).join(', ')}`);
  } catch (error) {
    console.error('TravelTimes demo failed:', error);
  }
};

main();
