import TflClient from '../src/index';
import { config } from 'dotenv';

config();

// Initialize Tfl client
const client = new TflClient();

const main = async () => {
    // Example: Search for a stop by name and get it's arrival times
    const result = await client.stopPoint.search('51800');
    // check if there are any matches
    if (result.matches?.length) {
        // get the first match
        const match = result.matches[0];
        console.dir(match, { depth: null, colors: true });
        // get the arrival times
        const arrivals = await client.stopPoint.getArrivals([match.id!]);
        // sort the arrivals by timeToStation
        arrivals.sort((a, b) => a.timeToStation! - b.timeToStation!);
        if (arrivals.length) {
            for (const arrival of arrivals) {
                const timeToArrival = Math.floor(arrival.timeToStation! / 60);
                const seconds = arrival.timeToStation! % 60;
                console.log(`${arrival.lineName} to ${arrival.destinationName} (${arrival.direction}) - Arriving in ${timeToArrival}m${seconds}s`);
            }
        } else {
            console.log('No arrivals found');
        }
    } else {
        console.log('No matches found');
    }
}

main();