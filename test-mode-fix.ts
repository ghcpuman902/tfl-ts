import TflClient from './src/index';

const client = new TflClient();

async function testModeFix() {
  console.log('Testing mode parameter fix...\n');
  
  try {
    // Test with multiple modes
    console.log('Testing journey with mode: ["tube", "bus"]');
    const journey = await client.journey.plan({
      from: '51.504549,-0.084994', // London Bridge WGS84
      to: '51.503664,-0.019723', // Canary Wharf WGS84
      mode: ['tube', 'bus']
    });
    
    console.log('✅ Journey planning successful with multiple modes');
    console.log(`Found ${journey.journeys?.length || 0} journeys`);
    
    // Test with single mode
    console.log('\nTesting journey with mode: ["cycle"]');
    const cycleJourney = await client.journey.plan({
      from: '51.501476,-0.141922', // Buckingham Palace
      to: '51.5052987,-0.1865762', // Kensington Palace
      mode: ['cycle']
    });
    
    console.log('✅ Journey planning successful with single mode');
    console.log(`Found ${cycleJourney.journeys?.length || 0} journeys`);
    
    console.log('\n🎉 Mode parameter fix is working correctly!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testModeFix(); 