// run by:
// pnpm dlx ts-node playground/demo/place.ts

import dotenv from 'dotenv';
import TflClient from '../../src/index';
import { printSection, printSubsection } from '../lib/format';

dotenv.config();

const client = new TflClient();

const main = async (): Promise<void> => {
  printSection('Place module demo');

  const placeSearch = await client.place.search({ name: 'Bank', placeTypes: ['StopPoint'] });
  printSubsection('Search "Bank"');
  console.log(`Results: ${placeSearch.length}`);
  placeSearch.slice(0, 3).forEach((place, index) => {
    console.log(`${index + 1}. ${place.commonName || place.placeType} (${place.id})`);
  });

  const streets = await client.place.getStreetsByPostcode({ postcode: 'SW1A 1AA' });
  printSubsection('Streets by postcode');
  console.log(`Keys: ${Object.keys(streets || {}).slice(0, 8).join(', ')}`);

  const geoPlaces = await client.place.getByGeo({
    lat: 51.5074,
    lon: -0.1278,
    radius: 500,
    placeTypes: ['BikePoint'],
    numberOfPlacesToReturn: 5,
  });
  printSubsection('Geo lookup');
  console.log(`Bike points within 500m: ${geoPlaces.length}`);

  const inputTypes = ['BikePoint', 'CarPark', 'NotAType'];
  const validTypes = inputTypes.filter((type) => client.place.PLACE_TYPES.includes(type as never));
  printSubsection('Place type validation');
  console.log(`${inputTypes.join(', ')} -> valid: ${validTypes.join(', ')}`);
};

main().catch((error) => {
  console.error('Place demo failed:', error);
  process.exit(1);
});
