import TflClient from '../src/index';
import dotenv from 'dotenv';
import { JourneyLegData } from '../src/journey';
dotenv.config();

const client = new TflClient(); // will read appId and appKey from .env

const main = async () => {
  console.log('🚇 Planning journey from Liverpool Street to Leicester Square...\n');

  // const journey = await client.journey.plan({
  //   from: '1000176', // Liverpool Street (ICS code)
  //   to: '1000135',   // Leicester Square (ICS code from disambiguation)
  //   mode: ['tube'],
  //   timeIs: 'Departing',
  //   date: '20250627',
  //   time: '1030'
  // });

  // // Check for disambiguation response
  // if (journey.disambiguation) {
  //   console.log('❌ Disambiguation required!');
  //   console.log('==========================');
  //   console.log(journey.stopMessages?.[0] || 'Multiple options found for the specified stations.');
  //   console.log('\nAvailable options:');
  //   console.log(JSON.stringify(journey.disambiguation, null, 2));
  //   console.log('\n💡 Tip: Use specific station IDs instead of station names.');
  //   console.log('   Example: "1000176" for Liverpool Street Station');
  //   console.log('   Example: "1000135" for Leicester Square Station');
  //   return;
  // }

  // if (!journey.journeys || journey.journeys.length === 0) {
  //   console.log('❌ No journeys found for this route.');
  //   return;
  // }

  // // Get the fastest journey
  // const fastestJourney = journey.journeys[0];

  // console.log('📍 Journey Summary');
  // console.log('==================');
  // console.log(`From: ${journey.stationNames?.from}`);
  // console.log(`To: ${journey.stationNames?.to}`);
  // console.log(`Departure: ${new Date(fastestJourney.startDateTime || '').toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}`);
  // console.log(`Arrival: ${new Date(fastestJourney.arrivalDateTime || '').toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}`);
  // console.log(`Duration: ${Math.floor((fastestJourney.duration || 0) / 60)} minutes\n`);

  // // Show fare information
  // if (fastestJourney.fare) {
  //   console.log('💰 Fare Information');
  //   console.log('==================');
  //   console.log(`Total cost: £${((fastestJourney.fare.totalCost || 0) / 100).toFixed(2)}`);
  //   console.log('');
  // }

  // // Show step-by-step instructions
  // console.log('🚶‍♂️ Step-by-Step Instructions');
  // console.log('============================');
  
  // fastestJourney.legs?.forEach((leg, index) => {
  //   console.log(`\nStep ${index + 1}:`);
    
  //     console.log(`  [${leg.mode?.name}] ${leg.instruction?.summary}`);

    
  //   if (leg.departureTime && leg.arrivalTime) {
  //     console.log(`  ${new Date(leg.departureTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}` +
  //     ` -> ${new Date(leg.arrivalTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}`);
  //   }
  // });

  // console.log('\n✅ Journey planning complete!');
}

// Direct fetch to the TfL Journey Planner API (bypassing all wrappers)
const directFetchTest = async () => {
  const from = '1000176'; // Liverpool Street (ICS code)
  const to = '1000135';   // Leicester Square (ICS code)
  const date = '20250627';
  const time = '1030';
  const mode = 'tube';
  const timeIs = 'Departing';

  const appId = process.env.TFL_APP_ID;
  const appKey = process.env.TFL_APP_KEY;

  const params = new URLSearchParams({
    date,
    time,
    mode,
    timeIs,
    ...(appId && appKey ? { app_id: appId, app_key: appKey } : {})
  });

  const url = `https://api.tfl.gov.uk/Journey/JourneyResults/${from}/to/${to}?${params.toString()}`;

  console.log('\n🌐 Direct fetch to TfL API:', url);

  try {
    const res = await fetch(url);
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    // --- Formatting logic ---
    if (data && typeof data === 'object') {
      // Disambiguation
      if (data.disambiguation) {
        console.log('❌ Disambiguation required!');
        console.log('==========================');
        if (data.stopMessages && data.stopMessages.length > 0) {
          console.log(data.stopMessages[0]);
        } else {
          console.log('Multiple options found for the specified stations.');
        }
        console.log('\nAvailable options:');
        console.log(JSON.stringify(data.disambiguation, null, 2));
        console.log('\n💡 Tip: Use specific station IDs instead of station names.');
        console.log('   Example: "1000176" for Liverpool Street Station');
        console.log('   Example: "1000135" for Leicester Square Station');
        return;
      }

      // No journeys
      if (!data.journeys || data.journeys.length === 0) {
        console.log('❌ No journeys found for this route.');
        return;
      }

      // Get the fastest journey
      const fastestJourney = data.journeys[0];

      // Try to extract station names from the journey legs
      let fromName = '';
      let toName = '';
      if (fastestJourney.legs && fastestJourney.legs.length > 0) {
        const firstLeg = fastestJourney.legs[0];
        const lastLeg = fastestJourney.legs[fastestJourney.legs.length - 1];
        if (firstLeg.instruction?.summary) {
          const match = firstLeg.instruction.summary.match(/to (.+?)(?: Underground Station| Station|$)/i);
          if (match) fromName = match[1];
        }
        if (lastLeg.instruction?.summary) {
          const match = lastLeg.instruction.summary.match(/to (.+?)(?: Underground Station| Station|$)/i);
          if (match) toName = match[1];
        }
      }

      console.log('📍 Journey Summary');
      console.log('==================');
      console.log(`From: ${fromName || from}`);
      console.log(`To: ${toName || to}`);
      console.log(`Departure: ${new Date(fastestJourney.startDateTime || '').toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}`);
      console.log(`Arrival: ${new Date(fastestJourney.arrivalDateTime || '').toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}`);
      console.log(`Duration: ${Math.floor((fastestJourney.duration || 0) / 60)} minutes\n`);

      // Show fare information
      if (fastestJourney.fare) {
        console.log('💰 Fare Information');
        console.log('==================');
        console.log(`Total cost: £${((fastestJourney.fare.totalCost || 0) / 100).toFixed(2)}`);
        console.log('');
      }

      // Show step-by-step instructions
      console.log('🚶‍♂️ Step-by-Step Instructions');
      console.log('============================');
      (fastestJourney.legs as JourneyLegData[] | undefined)?.forEach((leg: JourneyLegData, index: number) => {
        console.log(`\nStep ${index + 1}:`);
        console.log(`  [${leg.mode?.name}] ${leg.instruction?.summary}`);
        if (leg.departureTime && leg.arrivalTime) {
          console.log(
            `  ${new Date(leg.departureTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}` +
            ` -> ${new Date(leg.arrivalTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}`
          );
        }
      });

      console.log('\n✅ Journey planning complete!');
    } else {
      // Fallback: print raw response
      console.log('\n--- Raw API response ---');
      console.dir(data, { depth: 10 });
      console.log('--- End of response ---\n');
    }
  } catch (err) {
    console.error('Direct fetch error:', err);
  }
};

// Call the direct fetch after your main demo
main().then(directFetchTest).catch(console.error);
