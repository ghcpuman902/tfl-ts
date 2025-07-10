import TflClient from '../../src/index';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const client = new TflClient();

const main = async () => {
  try {
    console.log('🌬️ Air Quality Data:');
    console.log('====================');

    // Get current air quality data
    try {
      console.log('\n📊 Current Air Quality:');
      console.log('-'.repeat(40));

      const airQuality = await client.airQuality.get();

      console.log(`   Update Period: ${airQuality.updatePeriod || 'Unknown'}`);
      console.log(`   Update Frequency: ${airQuality.updateFrequency || 'Unknown'}`);
      console.log(`   Data Source: ${airQuality.updateSource || 'Unknown'}`);

      if (airQuality.currentForecast && airQuality.currentForecast.length > 0) {
        console.log(`   Total Forecasts: ${airQuality.currentForecast.length}`);

        // Process each forecast
        airQuality.currentForecast.forEach((forecast, index) => {
          console.log(`\n   Forecast ${index + 1}:`);
          console.log(`     Type: ${forecast.forecastType || 'Unknown'}`);
          console.log(`     Overall Band: ${forecast.forecastBand || 'Unknown'}`);
          console.log(`     Summary: ${forecast.forecastSummary || 'No summary available'}`);

          // Pollutant breakdown
          const pollutants: string[] = [];
          if (forecast.nO2Band) pollutants.push(`NO2: ${forecast.nO2Band}`);
          if (forecast.o3Band) pollutants.push(`O3: ${forecast.o3Band}`);
          if (forecast.pM10Band) pollutants.push(`PM10: ${forecast.pM10Band}`);
          if (forecast.pM25Band) pollutants.push(`PM2.5: ${forecast.pM25Band}`);
          if (forecast.sO2Band) pollutants.push(`SO2: ${forecast.sO2Band}`);

          if (pollutants.length > 0) {
            console.log(`     Pollutants: ${pollutants.join(', ')}`);
          }

          // Health assessment
          if (forecast.forecastBand) {
            const band = forecast.forecastBand as 'Low' | 'Moderate' | 'High' | 'Very High';
            const isPoor = client.airQuality.isPoorAirQuality(band);
            const healthAdvice = client.airQuality.getHealthAdvice(band);
            
            console.log(`     Health Status: ${isPoor ? '⚠️ Poor' : '✅ Good'}`);
            console.log(`     Health Advice: ${healthAdvice}`);
          }
        });

        // Group forecasts by band
        const bandCounts = airQuality.currentForecast!.reduce((acc, forecast) => {
          const band = forecast.forecastBand || 'Unknown';
          acc[band] = (acc[band] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        console.log('\n   Forecasts by Air Quality Band:');
        Object.entries(bandCounts)
          .sort(([, a], [, b]) => b - a)
          .forEach(([band, count]) => {
            const percentage = ((count / airQuality.currentForecast!.length) * 100).toFixed(1);
            console.log(`     ${band}: ${count} (${percentage}%)`);
          });

      } else {
        console.log('   No current forecast data available');
      }

      // Show additional metadata if available
      if (airQuality.bbox) {
        const [minLat, minLon, maxLat, maxLon] = airQuality.bbox;
        console.log(`\n   London Area: ${minLat.toFixed(2)},${minLon.toFixed(2)} to ${maxLat.toFixed(2)},${maxLon.toFixed(2)}`);
      }

      if (airQuality.disclaimerText) {
        console.log(`\n   Disclaimer: ${airQuality.disclaimerText}`);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.log(`   ❌ Error fetching air quality data: ${errorMessage}`);

      // Provide helpful suggestions based on error type
      if (errorMessage.includes('500') || errorMessage.includes('Internal Server Error')) {
        console.log(`      💡 This API is deprecated and poorly maintained. Consider using:`);
        console.log(`         - London Air API: https://londonair.org.uk/Londonair/API/`);
        console.log(`         - London Datastore: https://data.london.gov.uk/air-quality/`);
      } else if (errorMessage.includes('Access denied')) {
        console.log(`      💡 Check your TfL API credentials in the .env file.`);
      } else if (errorMessage.includes('timeout')) {
        console.log(`      💡 TfL API is taking too long to respond. Try again later.`);
      }
    }

    // Demonstrate utility methods with sample data
    console.log('\n🔧 Utility Methods Demo:');
    console.log('-'.repeat(40));

    const sampleBands = ['Low', 'Moderate', 'High', 'Very High'];
    sampleBands.forEach(band => {
      const description = client.airQuality.getBandDescription(band as any);
      const isPoor = client.airQuality.isPoorAirQuality(band as any);
      const healthAdvice = client.airQuality.getHealthAdvice(band as any);
      
      console.log(`   ${band}:`);
      console.log(`     Description: ${description}`);
      console.log(`     Is Poor: ${isPoor ? '⚠️ Yes' : '✅ No'}`);
      console.log(`     Health Advice: ${healthAdvice}`);
      console.log('');
    });

    console.log('\n💡 Tips:');
    console.log('   - This API is deprecated and may not return reliable data');
    console.log('   - Consider using London Air API or London Datastore for better alternatives');
    console.log('   - Always handle errors gracefully as the API is poorly maintained');
    console.log('   - Use utility methods for consistent data processing');
    console.log('   - AirQuality API makes actual HTTP calls to TfL (no cached metadata)');

  } catch (error) {
    console.error('❌ Error:', error);
  }
};

main(); 