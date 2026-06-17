// run by:
// npx ts-node playground/demo/journey.ts
// or
// pnpm dlx ts-node playground/demo/journey.ts
// or
// bunx ts-node playground/demo/journey.ts

import TflClient from '../../src/index';
import dotenv from 'dotenv';
import { formatDistance, formatDuration, formatDateForDisplay, formatTimeForDisplay } from '../../src/utils/format';

// Load environment variables from .env file
dotenv.config();

const client = new TflClient();



/**
 * Extract unique mode names from journey legs
 */
function extractModeNames(journey: any): string {
  const modeNames = journey.legs?.map((leg: any) => leg.mode?.name).filter(Boolean) || [];
  const uniqueModes = [...new Set(modeNames)];
  return uniqueModes.length > 0 ? `(${uniqueModes.join(', ')})` : '';
}

/**
 * Display a journey in the formatted style
 */
function displayJourney(journey: any, journeyIndex: number, client: any) {
  const modeDisplay = extractModeNames(journey);
  const journeyLetter = String.fromCharCode(65 + journeyIndex); // A, B, C, D, etc.

  console.log(`   Journey ${journeyLetter}: ${formatDuration(journey.duration)} ${modeDisplay}`);

  // Show fare first if available
  if (journey.fare?.totalCost) {
    console.log(`      Cost: £${((journey.fare.totalCost) / 100).toFixed(2)}`);
  }

  // Format dates
  if (journey.startDateTime) {
    const dateDisplay = formatDateForDisplay(journey.startDateTime);
    const timeDisplay = formatTimeForDisplay(journey.startDateTime);
    console.log(`      Start: ${dateDisplay} ${timeDisplay}`);
  }

  if (journey.arrivalDateTime) {
    const dateDisplay = formatDateForDisplay(journey.arrivalDateTime);
    const timeDisplay = formatTimeForDisplay(journey.arrivalDateTime);
    console.log(`      Arrival: ${dateDisplay} ${timeDisplay}`);
  }

  // Show alternative route indicator
  if (journey.alternativeRoute) {
    console.log(`      🔄 Alternative route`);
  }

  // Show leg details with natural language and icons
  if (journey.legs && journey.legs.length > 0) {
    console.log('      Steps:');
    journey.legs.forEach((leg: any, index: number) => {
      const naturalInstruction = client.journey.generateNaturalInstruction(leg, index === 0);
      const modeIcon = client.journey.getModeIcon(leg.mode?.name || 'walking');
      console.log(`        ${index + 1}. ${modeIcon} ${naturalInstruction}`);
      // Only show distance separately for non-walking legs
      if (leg.distance && leg.distance > 0 && leg.mode?.name !== 'walking') {
        console.log(`           📏 Distance: ${formatDistance(leg.distance)}`);
      }
      if (leg.isDisrupted) {
        console.log(`           ⚠️  Disrupted`);
      }
    });
  }
  console.log('');
}

/**
 * Display multiple journeys in the formatted style
 */
function displayJourneys(journeys: any[], client: any, prefix: string = '') {
  console.log(`${prefix}✅ Journey found: ${journeys.length} journeys`);

  journeys.forEach((journey, journeyIndex) => {
    displayJourney(journey, journeyIndex, client);
  });
}

/**
 * Journey Planning Demo
 * 
 * This demo showcases the comprehensive journey planning capabilities of the TfL API wrapper,
 * including disambiguation handling, accessibility options, cycling journeys, and validation.
 */
async function journeyDemo() {
  console.log('🚇 Journey Planning Demo\n');

  try {
    // 1. Basic Journey Planning
    console.log('1️⃣ Basic Journey Planning');
    console.log('Planning journey from Oxford Circus to Victoria...\n');

    const basicJourney = await client.journey.plan({
      from: '940GZZLUOXC', // Oxford Circus Station ID
      to: '940GZZLUVIC'    // Victoria Station ID c
    });

    if (basicJourney.journeys && basicJourney.journeys.length > 0) {
      displayJourneys(basicJourney.journeys, client);
    } else {
      console.log('❌ No journeys found');
    }
    console.log('');

    // 2. Disambiguation Handling
    console.log('2️⃣ Disambiguation Handling');
    console.log('Planning journey from \'Westminster\' to \'Bank\' (ambiguous locations)...\n');


    let fromOption = 'Westminster';
    let toOption = 'Bank';

    const ambiguousJourney = await client.journey.plan({
      from: fromOption,
      to: toOption
    });

    if (ambiguousJourney.disambiguation) {
      console.log('🔍 Multiple options found! Disambiguation required.');

      // Show 'from' options
      if (ambiguousJourney.disambiguation.fromLocationDisambiguation && ambiguousJourney.disambiguation.fromLocationDisambiguation.matchStatus !== 'identified') {
        if (ambiguousJourney.disambiguation.fromLocationDisambiguation.matchStatus === 'list') {
          console.log('\n📍 From options:');
          ambiguousJourney.disambiguation.fromLocationDisambiguation.disambiguationOptions
            .slice(0, 5) // Show first 5 options
            .forEach((option, index) => {
              console.log(`   ${index + 1}. ${option.place.commonName} (${option.parameterValue})`
                + ` | ${option.place.placeType} | ${option.matchQuality / 10}%`);
            });
          fromOption = ambiguousJourney.disambiguation.fromLocationDisambiguation.disambiguationOptions[0].parameterValue;
        } else if (ambiguousJourney.disambiguation.fromLocationDisambiguation.matchStatus === 'notidentified') {
          console.log('❌ No from options found, try again with a different from location');
        }
      }

      // Show 'to' options
      if (ambiguousJourney.disambiguation.toLocationDisambiguation && ambiguousJourney.disambiguation.toLocationDisambiguation.matchStatus !== 'identified') {
        if (ambiguousJourney.disambiguation.toLocationDisambiguation.matchStatus === 'list') {
          console.log('\n🎯 To options:');
          ambiguousJourney.disambiguation.toLocationDisambiguation.disambiguationOptions
            .slice(0, 5) // Show first 5 options
            .forEach((option, index) => {
              console.log(`   ${index + 1}. ${option.place.commonName} (${option.parameterValue})`
                + ` | ${option.place.placeType} | ${option.matchQuality / 10}%`);
            });
          toOption = ambiguousJourney.disambiguation.toLocationDisambiguation.disambiguationOptions[0].parameterValue;
        } else if (ambiguousJourney.disambiguation.toLocationDisambiguation.matchStatus === 'notidentified') {
          console.log('❌ No to options found, try again with a different to location');
        }
      }

      // Use 1st options from disambiguation
      console.log(`\nSelecting the 1st options and trying again with \'${fromOption}\' to \'${toOption}\'...\n`);
      const specificJourney = await client.journey.plan({
        from: fromOption,
        to: toOption
      });
      // make sure not ambiguous anymore
      if (specificJourney.disambiguation) {
        console.log('❌ Still ambiguous');
      }

      if (specificJourney.journeys && specificJourney.journeys.length > 0) {
        displayJourneys(specificJourney.journeys, client, '✅ Specific ');
      }
    } else if (ambiguousJourney.journeys && ambiguousJourney.journeys.length > 0) {
      displayJourneys(ambiguousJourney.journeys, client, '✅ Direct journey found (no disambiguation needed)');
    }
    console.log('');

    // 3. Accessibility Journey Planning
    console.log('3️⃣ Accessibility Journey Planning');
    console.log('Planning accessible journey from Kings Cross to London Bridge...\n');

    const accessibleJourney = await client.journey.plan({
      from: '1012553', // Kings Cross journey parameter
      to: '1004756',    // London Bridge journey parameter
      accessibilityPreference: ['StepFreeToPlatform']
    });

    if (accessibleJourney.journeys && accessibleJourney.journeys.length > 0) {
      displayJourneys(accessibleJourney.journeys, client, '✅ Accessible ');
    } else {
      console.log('❌ No accessible journeys found');
    }
    console.log('');

    // 4. Cycling Journey Planning
    console.log('4️⃣ Cycling Journey Planning');
    console.log('Planning cycling journey from Buckingham Palace to Kensington Palace...\n');

    const cycleJourney = await client.journey.plan({
      from: '51.501476,-0.141922', //WGS84 of Buckingham Palace
      to: '51.5052987,-0.1865762', //WGS84 of Kensington Palace
      mode: ['cycle']
    });

    if (cycleJourney.journeys && cycleJourney.journeys.length > 0) {
      displayJourneys(cycleJourney.journeys, client, '✅ Cycling ');
    } else {
      console.log('❌ No cycling journeys found');
    }
    console.log('');

    // 5. Natural Language Journey Instructions
    console.log('5️⃣ Natural Language Journey Instructions');
    console.log('Generating human-readable journey instructions...\n');

    if (basicJourney.journeys && basicJourney.journeys.length > 0) {
      const journey = basicJourney.journeys[0];

      // Show natural language description
      const naturalDescription = client.journey.generateNaturalDescription(journey);
      console.log(`🗣️  Natural Language Description:`);
      console.log(`   ${naturalDescription}\n`);

      // Show individual leg instructions
      console.log(`📋 Individual Leg Instructions:`);
      journey.legs?.forEach((leg, index) => {
        const instruction = client.journey.generateNaturalInstruction(leg, index === 0);
        console.log(`   ${index + 1}. ${instruction}`);
      });
      console.log('');

      // Show mode verbs
      console.log(`🔤 Mode Verbs Examples:`);
      const modes = ['tube', 'bus', 'walking', 'cycle', 'river-bus'];
      modes.forEach(mode => {
        const verbs = client.journey.getModeVerbs(mode);
        const modeDisplay = client.journey.getModeDisplayName(mode);

        if (modeDisplay === '') {
          // For modes like walking that don't need an article or object
          console.log(`   ${mode}: ${verbs.imperative}`);
        } else {
          const article = verbs.article ? `${verbs.article} ` : '';
          console.log(`   ${mode}: ${verbs.imperative} ${article}${modeDisplay}`);
        }
      });
      console.log('');
    }

    // 6. Multi-Modal Journey
    console.log('6️⃣ Multi-Modal Journey');
    console.log('Planning multi-modal (tube and bus) journey from London Bridge to Canary Wharf...\n');

    const multiModalJourney = await client.journey.plan({
      from: '51.504549,-0.084994', // London Bridge WGS84
      to: '51.503664,-0.019723', // Canary Wharf WGS84
      mode: ['tube', 'bus']
    });

    if (multiModalJourney.journeys && multiModalJourney.journeys.length > 0) {
      displayJourneys(multiModalJourney.journeys.slice(0, 2), client, '✅ Multi-Modal ');
    } else {
      console.log('❌ No multi-modal journeys found');
    }
    console.log('');

    // 6. Validation Examples
    console.log('6️⃣ Input Validation');
    console.log('Validating journey options...\n');

    const validationExamples = [
      {
        name: 'Valid options',
        options: {
          from: 'Oxford Circus',
          to: 'Victoria',
          mode: ['tube', 'bus'],
          timeIs: 'Departing' as const
        }
      },
      {
        name: 'Invalid modes',
        options: {
          from: 'Oxford Circus',
          to: 'Victoria',
          mode: ['tube', 'invalid-mode'],
          timeIs: 'Departing' as const
        }
      },
      {
        name: 'Invalid timeIs',
        options: {
          from: 'Oxford Circus',
          to: 'Victoria',
          timeIs: 'InvalidTime' as any
        }
      }
    ];

    validationExamples.forEach(example => {
      console.log(`   ${example.name}:`);
      const validation = client.journey.validateOptions(example.options);

      if (validation.isValid) {
        console.log('   ✅ Valid');
      } else {
        console.log('   ❌ Invalid:');
        validation.errors.forEach(error => {
          console.log(`      - ${error}`);
        });
      }
      console.log('');
    });

    // 7. Metadata and Constants
    console.log('7️⃣ Metadata and Constants');
    console.log('Available journey planning options:\n');

    const metadata = client.journey.getMetadata();
    console.log(`   Transport modes: ${metadata.modes.length} available`);
    console.log(`   Journey preferences: ${metadata.journeyPreferences.join(', ')}`);
    console.log(`   Accessibility options: ${metadata.accessibilityPreferences.join(', ')}`);
    console.log(`   Walking speeds: ${metadata.walkingSpeeds.join(', ')}`);
    console.log(`   Cycle preferences: ${metadata.cyclePreferences.join(', ')}`);
    console.log(`   Bike proficiencies: ${metadata.bikeProficiencies.join(', ')}`);
    console.log('');

    // 8. Station Name Extraction
    console.log('8️⃣ Station Name Extraction');
    console.log('Extracting station names from journey results...\n');

    if (basicJourney.journeys && basicJourney.journeys.length > 0) {
      const stationNames = client.journey.getStationNames(basicJourney);
      console.log(`   From: ${stationNames.from || 'Unknown'}`);
      console.log(`   To: ${stationNames.to || 'Unknown'}`);
    }
    console.log('');

    // 9. Future Journey
    console.log('9️⃣ Future Journey');
    console.log('Planning journey happening in the future...\n');

    const futureDate = new Date(new Date().setDate(new Date().getDate() + 7)); // next weekend Saturday 10am
    const futureJourney = await client.journey.plan({
      from: '940GZZLUOXC', // Oxford Circus
      to: '940GZZLUVIC',    // Victoria
      timeIs: 'Arriving',
      date: client.journey.formatDate(futureDate), // yyyyMMdd format
      time: client.journey.formatTime('16:00') // HHmm format (4pm)
    });

    if (futureJourney.journeys && futureJourney.journeys.length > 0) {
      displayJourneys(futureJourney.journeys, client, '✅ Future ');
    } else {
      console.log('❌ No future journeys found');
    }
    console.log('');

    // 10. Journey with Specific Preferences
    console.log('🔟 Journey with Specific Preferences');
    console.log('Planning journey with least walking preference...\n');

    const walkingJourney = await client.journey.plan({
      from: '940GZZLUOXC', // Oxford Circus
      to: '940GZZLUVIC',    // Victoria
      journeyPreference: 'LeastWalking' 
    });

    if (walkingJourney.journeys && walkingJourney.journeys.length > 0) {
      displayJourneys(walkingJourney.journeys, client, '✅ Walking-optimized ');
    } else {
      console.log('❌ No walking-optimized journeys found');
    }

    console.log('\n🎉 Journey Planning Demo Complete!');

  } catch (error) {
    console.error('❌ Error in journey demo:', error);
  }
}

/**
 * Utility function to format journey details for display
 */
export function formatJourneyDetails(journey: any) {
  return {
    description: journey.description,
    duration: `${journey.duration} minutes`,
    startTime: journey.startDateTime,
    arrivalTime: journey.arrivalDateTime,
    legs: journey.legs?.map((leg: any, index: number) => ({
      number: index + 1,
      mode: leg.mode?.name || 'Walking',
      duration: `${leg.duration} minutes`,
      instruction: leg.instruction?.summary,
      distance: leg.distance ? `${leg.distance}m` : undefined,
      disrupted: leg.isDisrupted
    })) || [],
    fare: journey.fare ? `£${(journey.fare.totalCost || 0) / 100}` : undefined
  };
}

/**
 * Utility function to handle disambiguation results
 */
export function handleDisambiguation(disambiguation: any) {
  const result = {
    fromOptions: [] as any[],
    toOptions: [] as any[],
    viaOptions: [] as any[]
  };

  if (disambiguation.fromLocationDisambiguation) {
    result.fromOptions = disambiguation.fromLocationDisambiguation.disambiguationOptions;
  }

  if (disambiguation.toLocationDisambiguation) {
    result.toOptions = disambiguation.toLocationDisambiguation.disambiguationOptions;
  }

  if (disambiguation.viaLocationDisambiguation) {
    result.viaOptions = disambiguation.viaLocationDisambiguation.disambiguationOptions;
  }

  return result;
}

const main = async () => {
  try {
    await journeyDemo();
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

main(); 


/* example output:
🚇 Journey Planning Demo

1️⃣ Basic Journey Planning
Planning journey from Oxford Circus to Victoria...

✅ Journey found: 4 journeys
   Journey A: 3 minutes (tube)
      Cost: £2.90
      Start: today 09:21 am
      Arrival: today 09:24 am
      Steps:
        1. 🚇 Take the tube for 3 minutes

   Journey B: 3 minutes (tube)
      Cost: £2.90
      Start: today 09:23 am
      Arrival: today 09:26 am
      Steps:
        1. 🚇 Take the tube for 3 minutes

   Journey C: 4 minutes (tube)
      Cost: £2.90
      Start: today 09:24 am
      Arrival: today 09:28 am
      Steps:
        1. 🚇 Take the tube for 4 minutes

   Journey D: 35 minutes (walking)
      Start: today 09:20 am
      Arrival: today 09:55 am
      Steps:
        1. 🚶 Walk 35 minutes (2,267m)


2️⃣ Disambiguation Handling
Planning journey from 'Westminster' to 'Bank' (ambiguous locations)...

🔍 Multiple options found! Disambiguation required.

📍 From options:
   1. Westminster (London), Westminster Pier (1002085) | StopPoint | 96.7%
   2. City of Westminster, Westminster Hall (51.499887251393,-0.125352379181) | PointOfInterest | 96.7%
   3. City of Westminster, Westminster Arms (51.50055186582,-0.129806010901) | PointOfInterest | 96.7%
   4. Westminster (London), Westminster Abbey (1014495) | StopPoint | 96.4%
   5. Palmers Green, Westminster Drive (1019109) | StopPoint | 96.4%

🎯 To options:
   1. City of London, Bank (1000013) | StopPoint | 100%
   2. London Borough of Tower Hamlets, Bankrupt (51.52407942006,-0.071684599032) | PointOfInterest | 96.4%
   3. Southwark, BANKSIDE (51.508173117253,-0.097661185688) | StopPoint | 96.4%
   4. Enfield (London), BANKSIDE (51.661709605436,-0.094288236636) | StopPoint | 96.4%
   5. Ealing, BANKSIDE (51.511561760287,-0.390703976564) | StopPoint | 96.4%

Selecting the 1st options and trying again with '1002085' to '1000013'...

✅ Specific ✅ Journey found: 4 journeys
   Journey A: 20 minutes (walking, tube)
      Cost: £2.90
      Start: today 09:20 am
      Arrival: today 09:40 am
      Steps:
        1. 🚶 Walk 6 minutes (200m)
        2. 🚇 Then take the tube for 10 minutes
        3. 🚶 Then walk 4 minutes (299m)

   Journey B: 19 minutes (walking, tube)
      Cost: £2.80
      Start: today 09:23 am
      Arrival: today 09:42 am
      Steps:
        1. 🚶 Walk 6 minutes (200m)
        2. 🚇 Then take the tube for 9 minutes
        3. 🚶 Then walk 4 minutes (299m)

   Journey C: 23 minutes (walking, tube)
      Cost: £2.80
      Start: today 09:24 am
      Arrival: today 09:47 am
      Steps:
        1. 🚶 Walk 8 minutes (400m)
        2. 🚇 Then take the tube for 1 minute
        3. 🚇 Then take the tube for 4 minutes

   Journey D: 49 minutes (walking)
      Start: today 09:20 am
      Arrival: today 10:09 am
      Steps:
        1. 🚶 Walk 49 minutes (3,153m)


3️⃣ Accessibility Journey Planning
Planning accessible journey from Kings Cross to London Bridge...

✅ Accessible ✅ Journey found: 4 journeys
   Journey A: 35 minutes (walking, tube)
      Cost: £2.80
      Start: today 09:20 am
      Arrival: today 09:55 am
      Steps:
        1. 🚶 Walk 11 minutes (368m)
        2. 🚇 Then take the tube for 9 minutes
        3. 🚶 Then walk 15 minutes

   Journey B: 31 minutes (walking, tube)
      Cost: £2.80
      Start: today 09:24 am
      Arrival: today 09:55 am
      Steps:
        1. 🚶 Walk 7 minutes (154m)
        2. 🚇 Then take the tube for 17 minutes
        3. 🚶 Then walk 7 minutes

   Journey C: 35 minutes (walking, tube)
      Cost: £2.80
      Start: today 09:25 am
      Arrival: today 10:00 am
      Steps:
        1. 🚶 Walk 11 minutes (368m)
        2. 🚇 Then take the tube for 9 minutes
        3. 🚶 Then walk 15 minutes

   Journey D: 1 hour 3 minutes (walking)
      Start: today 09:20 am
      Arrival: today 10:23 am
      Steps:
        1. 🚶 Walk 63 minutes (3,949m)


4️⃣ Cycling Journey Planning
Planning cycling journey from Buckingham Palace to Kensington Palace...

✅ Cycling ✅ Journey found: 1 journeys
   Journey A: 14 minutes (cycle)
      Start: today 09:20 am
      Arrival: today 09:34 am
      Steps:
        1. 🚲 Cycle for 14 minutes
           📏 Distance: 3,771m


5️⃣ Natural Language Journey Instructions
Generating human-readable journey instructions...

🗣️  Natural Language Description:
   Take the tube for 3 minutes

📋 Individual Leg Instructions:
   1. Take the tube for 3 minutes

🔤 Mode Verbs Examples:
   tube: take the tube
   bus: board the bus
   walking: walk walking
   cycle: cycle bike
   river-bus: board the river bus

6️⃣ Multi-Modal Journey
Planning multi-modal (tube and bus) journey from London Bridge to Canary Wharf...

✅ Multi-Modal ✅ Journey found: 2 journeys
   Journey A: 20 minutes (walking, tube)
      Cost: £3.50
      Start: today 09:20 am
      Arrival: today 09:40 am
      Steps:
        1. 🚶 Walk 8 minutes (217m)
        2. 🚇 Then take the tube for 7 minutes
           ⚠️  Disrupted
        3. 🚶 Then walk 5 minutes (126m)

   Journey B: 20 minutes (walking, tube)
      Cost: £2.90
      Start: today 09:22 am
      Arrival: today 09:42 am
      Steps:
        1. 🚶 Walk 8 minutes (217m)
        2. 🚇 Then take the tube for 7 minutes
           ⚠️  Disrupted
        3. 🚶 Then walk 5 minutes (126m)


6️⃣ Input Validation
Validating journey options...

   Valid options:
   ✅ Valid

   Invalid modes:
   ❌ Invalid:
      - Invalid modes: invalid-mode. Valid modes: bus, cable-car, coach, cycle, cycle-hire, dlr, elizabeth-line, interchange-keep-sitting, interchange-secure, national-rail, overground, replacement-bus, river-bus, river-tour, taxi, tram, tube, walking

   Invalid timeIs:
   ❌ Invalid:
      - Invalid timeIs: InvalidTime. Valid options: Arriving, Departing

7️⃣ Metadata and Constants
Available journey planning options:

   Transport modes: 18 available
   Journey preferences: LeastInterchange, LeastTime, LeastWalking
   Accessibility options: NoRequirements, NoSolidStairs, NoEscalators, NoElevators, StepFreeToVehicle, StepFreeToPlatform
   Walking speeds: Slow, Average, Fast
   Cycle preferences: None, LeaveAtStation, TakeOnTransport, AllTheWay, CycleHire
   Bike proficiencies: Easy, Moderate, Fast

8️⃣ Station Name Extraction
Extracting station names from journey results...

   From: Victoria
   To: Victoria

9️⃣ Real-time Journey with Live Arrivals
Planning journey with real-time data...

✅ Real-time ✅ Journey found: 4 journeys
   Journey A: 3 minutes (tube)
      Cost: £2.90
      Start: today 09:22 am
      Arrival: today 09:25 am
      Steps:
        1. 🚇 Take the tube for 3 minutes

   Journey B: 3 minutes (tube)
      Cost: £2.90
      Start: today 09:23 am
      Arrival: today 09:26 am
      Steps:
        1. 🚇 Take the tube for 3 minutes

   Journey C: 4 minutes (tube)
      Cost: £2.90
      Start: today 09:24 am
      Arrival: today 09:28 am
      Steps:
        1. 🚇 Take the tube for 4 minutes

   Journey D: 35 minutes (walking)
      Start: today 09:20 am
      Arrival: today 09:55 am
      Steps:
        1. 🚶 Walk 35 minutes (2,267m)


🔟 Journey with Specific Preferences
Planning journey with least walking preference...

✅ Walking-optimized ✅ Journey found: 4 journeys
   Journey A: 3 minutes (tube)
      Cost: £2.90
      Start: today 09:22 am
      Arrival: today 09:25 am
      Steps:
        1. 🚇 Take the tube for 3 minutes

   Journey B: 3 minutes (tube)
      Cost: £2.90
      Start: today 09:23 am
      Arrival: today 09:26 am
      Steps:
        1. 🚇 Take the tube for 3 minutes

   Journey C: 4 minutes (tube)
      Cost: £2.90
      Start: today 09:24 am
      Arrival: today 09:28 am
      Steps:
        1. 🚇 Take the tube for 4 minutes

   Journey D: 35 minutes (walking)
      Start: today 09:20 am
      Arrival: today 09:55 am
      Steps:
        1. 🚶 Walk 35 minutes (2,267m)


🎉 Journey Planning Demo Complete!
*/