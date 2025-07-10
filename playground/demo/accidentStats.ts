import TflClient from '../../src/index';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const client = new TflClient();

const main = async () => {
  try {
    console.log('🚨 Accident Statistics Data:');
    console.log('=============================');

    // Get accident statistics for the last 3 years
    const currentYear = new Date().getFullYear();
    const yearsToCheck = [currentYear - 2, currentYear - 1, currentYear];

    for (const year of yearsToCheck) {
      try {
        console.log(`\n📅 ${year} Accident Statistics:`);
        console.log('-'.repeat(40));

        const accidents = await client.accidentStats.get({ year });

        if (accidents.length === 0) {
          console.log(`   No accident data available for ${year}`);
          continue;
        }

        console.log(`   Total accidents: ${accidents.length}`);

        // Group accidents by severity
        const severityCounts = accidents.reduce((acc, accident) => {
          const severity = accident.severity || 'Unknown';
          acc[severity] = (acc[severity] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        console.log('\n   Accidents by severity:');
        Object.entries(severityCounts)
          .sort(([, a], [, b]) => b - a)
          .forEach(([severity, count]) => {
            const percentage = ((count / accidents.length) * 100).toFixed(1);
            console.log(`     ${severity}: ${count} (${percentage}%)`);
          });

        // Group accidents by borough
        const boroughCounts = accidents.reduce((acc, accident) => {
          const borough = accident.borough || 'Unknown';
          acc[borough] = (acc[borough] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        console.log('\n   Top 5 boroughs by accident count:');
        Object.entries(boroughCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .forEach(([borough, count], index) => {
            const percentage = ((count / accidents.length) * 100).toFixed(1);
            console.log(`     ${index + 1}. ${borough}: ${count} (${percentage}%)`);
          });

        // Show some sample accidents
        console.log('\n   Sample accidents:');
        accidents.slice(0, 3).forEach((accident, index) => {
          console.log(`     ${index + 1}. ${accident.location || 'Unknown location'}`);
          console.log(`        Date: ${accident.date ? new Date(accident.date).toLocaleDateString() : 'Unknown date'}`);
          console.log(`        Severity: ${accident.severity || 'Unknown'}`);
          console.log(`        Borough: ${accident.borough || 'Unknown'}`);
          if (accident.lat && accident.lon) {
            console.log(`        Coordinates: ${accident.lat.toFixed(4)}, ${accident.lon.toFixed(4)}`);
          }
          console.log('');
        });

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.log(`   ❌ Error fetching data for ${year}: ${errorMessage}`);

        // Provide helpful suggestions based on error type
        if (errorMessage.includes('No accident data available')) {
          console.log(`      💡 This year may not have published accident data yet.`);
        } else if (errorMessage.includes('Invalid year parameter')) {
          console.log(`      💡 Try using a year between 2000 and ${currentYear}.`);
        } else if (errorMessage.includes('Access denied')) {
          console.log(`      💡 Check your TfL API credentials in the .env file.`);
        } else if (errorMessage.includes('server error')) {
          console.log(`      💡 TfL API is experiencing issues. Try again later.`);
        }
      }
    }

    console.log('\n💡 Tips:');
    console.log('   - This is a simple API with only one endpoint: GET /AccidentStats/{year}');
    console.log('   - Always handle errors gracefully as data availability varies by year');
    console.log('   - Consider data privacy and sensitivity when displaying accident information');
    console.log('   - Use the keepTflTypes option if you need the original TfL response format');
    console.log('   - AccidentStats API makes actual HTTP calls to TfL (no cached metadata)');

  } catch (error) {
    console.error('❌ Error:', error);
  }
};
main();
