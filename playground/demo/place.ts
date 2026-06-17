// run by:
// pnpm dlx ts-node playground/demo/place.ts

import TflClient from '../../src/index';
import dotenv from 'dotenv';

dotenv.config();

const client = new TflClient();

const main = async () => {
  try {
    console.log('Place demo');
    console.log('==========');

    const search = await client.place.search({ name: 'Bank' });
    console.log(`Place search "Bank": ${search.length} results`);
    search.slice(0, 3).forEach((place, index) => {
      console.log(`${index + 1}. ${place.commonName} (${place.id}) [${place.placeType}]`);
    });

    const streets = await client.place.getStreetsByPostcode({ postcode: 'SW1A 1AA' });
    console.log('Postcode streets keys:', Object.keys(streets).slice(0, 8));

    const geoResults = await client.place.getByGeo({
      lat: 51.5074,
      lon: -0.1278,
      radius: 500,
      placeTypes: ['BikePoint'],
      numberOfPlacesToReturn: 5,
    });
    console.log(`Geo lookup (BikePoint, 500m): ${geoResults.length} places`);

    const overlay = await client.place.getOverlay({
      placeType: 'BikePoint',
      z: 12,
      lat: 51.5074,
      lon: -0.1278,
      width: 256,
      height: 256,
    });
    console.log('Overlay object keys:', Object.keys(overlay).slice(0, 8));

    console.log('Available place types (constants):', client.place.PLACE_TYPES.slice(0, 8), '...');
  } catch (error) {
    console.error('Place demo failed:', error);
  }
};

main();
import dotenv from 'dotenv';
import TflClient from '../../src/index';

dotenv.config();

const client = new TflClient();

const main = async () => {
  try {
    console.log('Place demo');
    console.log('==========');

    const placeSearch = await client.place.search({ name: 'Bank', placeTypes: ['StopPoint'] });
    console.log(`Found ${placeSearch.length} places for "Bank"`);
    placeSearch.slice(0, 3).forEach((place, index) => {
      console.log(`${index + 1}. ${place.commonName || place.placeType} (${place.id})`);
    });

    const streets = await client.place.getStreetsByPostcode({ postcode: 'SW1A 1AA' });
    const streetKeys = Object.keys(streets || {});
    console.log(`\nStreet lookup keys for SW1A 1AA: ${streetKeys.join(', ')}`);

    const geoPlaces = await client.place.getByGeo({
      lat: 51.5074,
      lon: -0.1278,
      radius: 500,
      placeTypes: ['BikePoint'],
      numberOfPlacesToReturn: 5,
    });
    console.log(`\nGeo place results: ${geoPlaces.length}`);

    const inputTypes = ['BikePoint', 'CarPark', 'NotAType'];
    const validTypes = inputTypes.filter(type => client.place.PLACE_TYPES.includes(type as never));
    console.log(`Valid place types from ${inputTypes.join(', ')} => ${validTypes.join(', ')}`);
  } catch (error) {
    console.error('Place demo failed:', error);
  }
};

main();
