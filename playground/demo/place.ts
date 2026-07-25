// run by:
// pnpm dlx ts-node playground/demo/place.ts

import dotenv from 'dotenv';
import TflClient from '../../src/index';
import { TflHttpError } from '../../src/errors';
import { printSection, printSubsection } from '../lib/format';

dotenv.config();

const client = new TflClient();

const formatHttpError = (error: unknown): string => {
  if (error instanceof TflHttpError) {
    return `${error.statusCode} ${error.statusText}${error.tflMessage ? ` — ${error.tflMessage}` : ''}`;
  }
  return error instanceof Error ? error.message : String(error);
};

const main = async (): Promise<void> => {
  printSection('Place module demo');

  // Place search types are PlaceTypes (BikePoint, CarPark, …) — not StopPoint.
  try {
    const placeSearch = await client.place.search({
      name: "King's Cross",
      placeTypes: ['BikePoint'],
    });
    printSubsection('Search "King\'s Cross" (BikePoint)');
    console.log(`Results: ${placeSearch.length}`);
    placeSearch.slice(0, 3).forEach((place, index) => {
      console.log(`${index + 1}. ${place.commonName || place.placeType} (${place.id})`);
    });
  } catch (error) {
    printSubsection('Search "King\'s Cross" (BikePoint)');
    console.log(`⚠️  Search unavailable (${formatHttpError(error)})`);
  }

  try {
    const streets = await client.place.getStreetsByPostcode({ postcode: 'SW1A 1AA' });
    printSubsection('Streets by postcode');
    console.log(`Keys: ${Object.keys(streets || {}).slice(0, 8).join(', ')}`);
  } catch (error) {
    printSubsection('Streets by postcode');
    console.log(`⚠️  Streets lookup unavailable (${formatHttpError(error)})`);
  }

  try {
    const geoPlaces = await client.place.getByGeo({
      lat: 51.5074,
      lon: -0.1278,
      radius: 500,
      placeTypes: ['BikePoint'],
      numberOfPlacesToReturn: 5,
    });
    printSubsection('Geo lookup');
    console.log(`Bike points within 500m: ${Array.isArray(geoPlaces) ? geoPlaces.length : 0}`);
  } catch (error) {
    printSubsection('Geo lookup');
    console.log(`⚠️  Geo lookup unavailable (${formatHttpError(error)})`);
  }

  const inputTypes = ['BikePoint', 'CarPark', 'StopPoint', 'NotAType'];
  const validTypes = inputTypes.filter((type) => client.place.PLACE_TYPES.includes(type as never));
  printSubsection('Place type validation');
  console.log(`${inputTypes.join(', ')} -> valid: ${validTypes.join(', ') || '(none)'}`);
  console.log('(StopPoint is a stopPoint search type, not a Place type)');
};

main().catch((error) => {
  console.error('Place demo note:', formatHttpError(error));
  process.exit(0);
});
