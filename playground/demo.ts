import TflClient, { 
  TflError, 
  TflHttpError, 
  TflNetworkError, 
  TflTimeoutError,
  TflValidationError,
  TflConfigError,
  TflErrorHandler 
} from '../src/index';
import dotenv from 'dotenv';
import { JourneyLegData } from '../src/journey';
dotenv.config();

const client = new TflClient(); // Automatically reads from process.env

// You can also pass credentials directly
// const client = new TflClient({
//   appId: 'your-app-id',
//   appKey: 'your-app-key',
//   timeout: 30000,        // 30 second timeout
//   maxRetries: 3,         // Retry up to 3 times
//   retryDelay: 1000       // Start with 1 second delay
// });

const main = async () => { // wrap in async function to use await
  // Step 1: get stop point ID from search
  const query = "Oxford Circus";
  const modes = ['tube'];

  try {
    const stopPointSearchResult = await client.stopPoint.search({ query, modes }); // a fetch happens behind the scenes
    const stopPointId = stopPointSearchResult.matches?.[0]?.id;

    if (!stopPointId) {
      throw new Error(`No stop ID found for the given query: ${query}`);
    }

    console.log('Stop ID found:', stopPointId); // "940GZZLUOXC"

    // Get arrivals for Central line at Oxford Circus station
    const arrivals = await client.line.getArrivals({
      lineIds: ['central'],
      stopPointId: stopPointId 
    });

    // Sort arrivals by time to station (earliest first)
    const sortedArrivals = arrivals.sort((a, b) => 
      (a.timeToStation || 0) - (b.timeToStation || 0)
    );
    
    sortedArrivals.forEach((arrival) => {
      console.log(
        `${arrival.lineName || 'Unknown'} Line` +
        ` to ${arrival.towards || 'Unknown'}` + 
        ` arrives in ${Math.round((arrival.timeToStation || 0) / 60)}min` +
        ` on ${arrival.platformName || 'Unknown'}`
      );
    });
    /* console output:
      Central Line to Ealing Broadway arrives in 1min on Westbound - Platform 1
      Central Line to Hainault via Newbury Park arrives in 2min on Eastbound - Platform 2
      Central Line to West Ruislip arrives in 4min on Westbound - Platform 1
      Central Line to Epping arrives in 6min on Eastbound - Platform 2
      Central Line to Ealing Broadway arrives in 6min on Westbound - Platform 1
      Central Line to Hainault via Newbury Park arrives in 8min on Eastbound - Platform 2
    */

  } catch (error) {
    // Comprehensive error handling
    if (error instanceof TflError) {
      console.error('=== TfL API Error ===');
      console.error('Type:', error.constructor.name);
      console.error('Message:', error.message);
      console.error('Request ID:', error.requestId);
      console.error('Timestamp:', error.timestamp);
      
      if (error instanceof TflHttpError) {
        console.error('HTTP Status:', error.statusCode);
        console.error('Status Text:', error.statusText);
        console.error('Response Body:', error.responseBody);
        console.error('URL:', error.url);
        
        if (error.isAuthError()) {
          console.error('❌ Authentication failed - check your API credentials');
        } else if (error.isRateLimitError()) {
          console.error('⚠️ Rate limit exceeded - try again later');
        } else if (error.isServerError()) {
          console.error('🔧 TfL server error - try again later');
        } else if (error.isClientError()) {
          console.error('📝 Client error - check your request parameters');
        }
      } else if (error instanceof TflNetworkError) {
        console.error('🌐 Network error - check your internet connection');
        console.error('Error Code:', error.code);
        console.error('URL:', error.url);
      } else if (error instanceof TflTimeoutError) {
        console.error('⏰ Request timeout - try again later');
        console.error('Timeout (ms):', error.timeoutMs);
        console.error('URL:', error.url);
      } else if (error instanceof TflValidationError) {
        console.error('📋 Validation error - check your input parameters');
        console.error('Field:', error.field);
        console.error('Value:', error.value);
      } else if (error instanceof TflConfigError) {
        console.error('⚙️ Configuration error - check your setup');
        console.error('Config Field:', error.configField);
      }
      
      // Check if error is retryable
      if (TflErrorHandler.isRetryableError(error)) {
        console.error('🔄 This error is retryable');
      } else {
        console.error('❌ This error is not retryable');
      }
      
    } else {
      console.error('=== Unexpected Error ===');
      console.error('Error:', error);
    }
    
    return;
  }
}

// Example of error handling with different scenarios
const demonstrateErrorHandling = async () => {
  console.log('\n=== Error Handling Examples ===\n');
  
  // Example 1: Invalid line ID (should trigger validation error)
  try {
    console.log('Testing invalid line ID...');
    await client.line.getStatus({ lineIds: ['invalid-line-id'] });
  } catch (error) {
    if (error instanceof TflHttpError && error.statusCode === 404) {
      console.log('✅ Correctly handled 404 for invalid line ID');
    }
  }
  
  // Example 2: Test timeout handling (with very short timeout)
  try {
    console.log('Testing timeout handling...');
    const timeoutClient = new TflClient({
      timeout: 1, // 1ms timeout to trigger timeout error
      maxRetries: 0
    });
    await timeoutClient.line.getStatus({ modes: ['tube'] });
  } catch (error) {
    if (error instanceof TflTimeoutError) {
      console.log('✅ Correctly handled timeout error');
    }
  }
  
  // Example 3: Test configuration error
  try {
    console.log('Testing configuration error...');
    new TflClient({}); // No credentials
  } catch (error) {
    if (error instanceof TflConfigError) {
      console.log('✅ Correctly handled configuration error');
    }
  }
  
  console.log('\n=== Error Handling Examples Complete ===\n');
};

// Run both examples
main()
  .then(() => demonstrateErrorHandling())
  .catch(console.error);

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
