// run by:
// npx ts-node playground/demo/bikePoint.ts
// or
// pnpm dlx ts-node playground/demo/bikePoint.ts
// or
// bunx ts-node playground/demo/bikePoint.ts
// see example output at the end of the file

import TflClient from '../../src/index';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const client = new TflClient();

// Helper function to create visual representation of bike availability
const getVisualStatus = (status: any) => {
    const standardBikes = status.standardBikes || 0;
    const eBikes = status.eBikes || 0;
    const spaces = status.spaces;
    const brokenDocks = status.brokenDocks;

    let visual = '';

    // Add electric bikes (solid blocks)
    for (let i = 0; i < eBikes; i++) {
        visual += '█';
    }

    // Add standard bikes (half-shaded blocks)
    for (let i = 0; i < standardBikes; i++) {
        visual += '▓';
    }

    // Add empty spaces (empty blocks)
    for (let i = 0; i < spaces; i++) {
        visual += '░';
    }

    // Add broken docks (cross blocks)
    for (let i = 0; i < brokenDocks; i++) {
        visual += '✗';
    }

    return visual;
};

const main = async () => {
    let allBikePointsStore;
    try {
        console.log('🚴 Bike Point Data:');
        console.log('==================');

        // ======== Stage 1: Get all bike points ========
        try {
            console.log('\n📊 All Bike Points:');
            console.log('-'.repeat(40));

            const allBikePoints = await client.bikePoint.get();
            allBikePointsStore = allBikePoints; // for later use

            console.log(`   Total bike points: ${allBikePoints.length}`);

            // Group bike points by availability
            const availableBikes = allBikePoints.filter(bikePoint => bikePoint.bikes > 0);
            const availableSpaces = allBikePoints.filter(bikePoint => bikePoint.spaces > 0);

            console.log(`   Bike points with available bikes: ${availableBikes.length}`);
            console.log(`   Bike points with available spaces: ${availableSpaces.length}`);

            // Count total bikes and ebikes
            const totalBikes = availableBikes.reduce((sum, bikePoint) => sum + bikePoint.bikes, 0);
            const totalEbikes = availableBikes.reduce((sum, bikePoint) => sum + (bikePoint.eBikes || 0), 0);

            console.log(`   Total bikes: ${totalBikes}`);
            console.log(`   Total ebikes: ${totalEbikes}`);


            // Show sample bike points
            console.log('\n   Sample bike points:');
            allBikePoints.slice(0, 5).forEach((bikePoint, index) => {
                console.log(`     ${index + 1}. ${bikePoint.name}`);
                console.log(`        Bikes: ${bikePoint.bikes} (${bikePoint.standardBikes} standard, ${bikePoint.eBikes} electric)`);
                console.log(`        Spaces: ${bikePoint.spaces}, Docks: ${bikePoint.docks}`);
                console.log(`        Visual: ${getVisualStatus(bikePoint)}`);
                if (bikePoint.brokenDocks > 0) {
                    console.log(`        ⚠️ Broken docks: ${bikePoint.brokenDocks}`);
                }
                if (bikePoint.lat && bikePoint.lon) {
                    console.log(`        Location: ${bikePoint.lat.toFixed(4)}, ${bikePoint.lon.toFixed(4)}`);
                }
                console.log('');
            });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.log(`   ❌ Error fetching all bike points: ${errorMessage}`);

            if (errorMessage.includes('Access denied')) {
                console.log(`      💡 Check your TfL API credentials in the .env file.`);
            } else if (errorMessage.includes('timeout')) {
                console.log(`      💡 TfL API is taking too long to respond. Try again later.`);
            }
        }

        // ======== Stage 2: Search using query  ========
        try {
            console.log('\n🔍 Search using query:');
            console.log('-'.repeat(40));

            const searchResults = await client.bikePoint.search({ query: 'Soho' });

            if (searchResults.length === 0) {
                console.log('   No bike points found using query \'Soho\'');
            } else {
                console.log(`   Found ${searchResults.length} bike points using query \'Soho\'${searchResults.length > 3 ? ', showing first 3' : ''}:`);

                // Get detailed status for each search result
                for (const bikePoint of searchResults.slice(0, 3)) {
                    try {
                        const detailedBikePoint = await client.bikePoint.getById(bikePoint.id!);

                        console.log(`\n     ${detailedBikePoint.name}:`);
                        console.log(`       Bikes available: ${detailedBikePoint.bikes} (${detailedBikePoint.standardBikes} standard, ${detailedBikePoint.eBikes} electric)`);
                        console.log(`       Spaces available: ${detailedBikePoint.spaces}`);
                        console.log(`       Total docks: ${detailedBikePoint.docks}`);
                        console.log(`       Visual: ${getVisualStatus(detailedBikePoint)}`);

                        if (detailedBikePoint.brokenDocks > 0) {
                            console.log(`       ⚠️ Broken docks: ${detailedBikePoint.brokenDocks}`);
                        }

                        if (detailedBikePoint.lat && detailedBikePoint.lon) {
                            console.log(`       Location: ${detailedBikePoint.lat.toFixed(4)}, ${detailedBikePoint.lon.toFixed(4)}`);
                        }
                    } catch (detailError) {
                        console.log(`     ${bikePoint.commonName}: Unable to get detailed status`);
                    }
                }
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.log(`   ❌ Error searching bike points: ${errorMessage}`);
        }

        // ======== Stage 3: Get specific bike point by ID ========
        try {
            console.log('\n📍 Specific Bike Point Details:');
            console.log('-'.repeat(40));

            // Try to get a specific bike point (using first in all bike points)
            const allBikePoints = allBikePointsStore;
            if (allBikePoints && allBikePoints.length > 0) {
                const sampleBikePoint = allBikePoints[0];
                const bikePointId = sampleBikePoint.id!;

                console.log(`   Getting details for bike point: ${bikePointId}`);

                const detailedBikePoint = await client.bikePoint.getById(bikePointId);

                console.log(`   Name: ${detailedBikePoint.name}`);
                console.log(`   Available bikes: ${detailedBikePoint.bikes} (${detailedBikePoint.standardBikes} standard, ${detailedBikePoint.eBikes} electric)`);
                console.log(`   Available spaces: ${detailedBikePoint.spaces}`);
                console.log(`   Total docks: ${detailedBikePoint.docks}`);

                // Visual representation of bike availability
                const visualStatus = getVisualStatus(detailedBikePoint);
                console.log(`   Visual: ${visualStatus}`);

                if (detailedBikePoint.brokenDocks > 0) {
                    console.log(`   ⚠️ Broken docks: ${detailedBikePoint.brokenDocks}`);
                }

                if (detailedBikePoint.lat && detailedBikePoint.lon) {
                    console.log(`   Coordinates: ${detailedBikePoint.lat.toFixed(4)}, ${detailedBikePoint.lon.toFixed(4)}`);
                }

                // Show enhanced status as JSON
                console.log('\n   Raw JSON:');
                console.dir(detailedBikePoint, { depth: null });
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.log(`   ❌ Error getting specific bike point: ${errorMessage}`);
        }

        // ======== Stage 4: Location-based search around Aldwych ========
        try {
            console.log('\n📍 Location-based Search around Aldwych:');
            console.log('-'.repeat(40));

            // Get bike points within 300m of Aldwych
            const nearbyBikePoints = await client.bikePoint.getByRadius({
                lat: 51.514792, // Aldwych area
                lon: -0.118509,
                radius: 300 // 300m radius
            });

            console.log(`   Found ${nearbyBikePoints.places.length} bike points within 300m of Aldwych`);
            console.log(`   Center point: ${nearbyBikePoints.centrePoint[0]}, ${nearbyBikePoints.centrePoint[1]}`);

            // Show closest 3 bike points
            console.log('\n   Closest 3 bike points:');
            nearbyBikePoints.places.slice(0, 3).forEach((bikePoint, index) => {
                console.log(`     ${index + 1}. ${bikePoint.name}:`);
                console.log(`        Bikes: ${bikePoint.bikes} (${bikePoint.standardBikes} standard, ${bikePoint.eBikes} electric), Spaces: ${bikePoint.spaces} (${bikePoint.distance?.toFixed(0)}m away)`);
                console.log(`        Visual: ${getVisualStatus(bikePoint)}`);
                if (bikePoint.lat && bikePoint.lon) {
                    console.log(`        Location: ${bikePoint.lat.toFixed(4)}, ${bikePoint.lon.toFixed(4)}`);
                }
                console.log('');
            });



        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.log(`   ❌ Error with location-based search: ${errorMessage}`);
        }

        console.log('\n💡 Tips:');
        console.log('   - Bike points show real-time availability of bikes and spaces');
        console.log('   - Broken docks are calculated as: total docks - (bikes + spaces)');
        console.log('   - Search results don\'t include status - use getById() for details');
        console.log('   - Use getByRadius() to find bike points near a specific location');
        console.log('   - BikePoint API makes actual HTTP calls to TfL (no cached metadata)');

    } catch (error) {
        console.error('❌ Error:', error);
    }
};

main(); 


/* example output:
🚴 Bike Point Data:
==================

📊 All Bike Points:
----------------------------------------
   Total bike points: 798
   Bike points with available bikes: 643
   Bike points with available spaces: 709
   Total bikes: 9456
   Total ebikes: 0

   Sample bike points:
     1. River Street , Clerkenwell
        Bikes: 4 (0 standard, 0 electric)
        Spaces: 13, Docks: 19
        Visual: ░░░░░░░░░░░░░✗✗
        ⚠️ Broken docks: 2
        Location: 51.5292, -0.1100

     2. Phillimore Gardens, Kensington
        Bikes: 21 (0 standard, 0 electric)
        Spaces: 15, Docks: 37
        Visual: ░░░░░░░░░░░░░░░✗
        ⚠️ Broken docks: 1
        Location: 51.4996, -0.1976

     3. Christopher Street, Liverpool Street
        Bikes: 0 (0 standard, 0 electric)
        Spaces: 29, Docks: 32
        Visual: ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░✗✗✗
        ⚠️ Broken docks: 3
        Location: 51.5213, -0.0846

     4. St. Chad's Street, King's Cross
        Bikes: 9 (0 standard, 0 electric)
        Spaces: 12, Docks: 23
        Visual: ░░░░░░░░░░░░✗✗
        ⚠️ Broken docks: 2
        Location: 51.5301, -0.1210

     5. Sedding Street, Sloane Square
        Bikes: 10 (0 standard, 0 electric)
        Spaces: 15, Docks: 27
        Visual: ░░░░░░░░░░░░░░░✗✗
        ⚠️ Broken docks: 2
        Location: 51.4931, -0.1569


🔍 Search using query:
----------------------------------------
   Found 6 bike points using query 'Soho', showing first 3:

     Soho Square , Soho:
       Bikes available: 0 (0 standard, 0 electric)
       Spaces available: 57
       Total docks: 57
       Visual: ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
       Location: 51.5156, -0.1323

     Golden Square, Soho:
       Bikes available: 0 (0 standard, 0 electric)
       Spaces available: 15
       Total docks: 18
       Visual: ░░░░░░░░░░░░░░░✗✗✗
       ⚠️ Broken docks: 3
       Location: 51.5119, -0.1370

     Wardour Street, Soho:
       Bikes available: 0 (0 standard, 0 electric)
       Spaces available: 15
       Total docks: 16
       Visual: ░░░░░░░░░░░░░░░✗
       ⚠️ Broken docks: 1
       Location: 51.5125, -0.1332

📍 Specific Bike Point Details:
----------------------------------------
   Getting details for bike point: BikePoints_1
   Name: River Street , Clerkenwell
   Available bikes: 4 (0 standard, 0 electric)
   Available spaces: 13
   Total docks: 19
   Visual: ░░░░░░░░░░░░░✗✗
   ⚠️ Broken docks: 2
   Coordinates: 51.5292, -0.1100

   Raw JSON:
{
  id: 'BikePoints_1',
  name: 'River Street , Clerkenwell',
  bikes: 4,
  docks: 19,
  spaces: 13,
  brokenDocks: 2,
  lat: 51.529163,
  lon: -0.10997,
  terminalName: '001023',
  isInstalled: true,
  isLocked: false,
  installDate: '1278947280000',
  removalDate: '',
  isTemporary: false,
  standardBikes: 0,
  eBikes: 0
}

📍 Location-based Search around Aldwych:
----------------------------------------
   Found 9 bike points within 300m of Aldwych
   Center point: 51.514, -0.118

   Closest 3 bike points:
     1. Kingsway Southbound, Strand:
        Bikes: 0 (0 standard, 0 electric), Spaces: 30 (21m away)
        Visual: ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░✗✗✗
        Location: 51.5139, -0.1178

     2. Kingsway, Covent Garden:
        Bikes: 5 (0 standard, 0 electric), Spaces: 11 (56m away)
        Visual: ░░░░░░░░░░░
        Location: 51.5144, -0.1185

     3. Houghton Street, Strand:
        Bikes: 0 (0 standard, 0 electric), Spaces: 15 (95m away)
        Visual: ░░░░░░░░░░░░░░░
        Location: 51.5136, -0.1168


💡 Tips:
   - Bike points show real-time availability of bikes and spaces
   - Broken docks are calculated as: total docks - (bikes + spaces)
   - Search results don't include status - use getById() for details
   - Use getByRadius() to find bike points near a specific location
   - BikePoint API makes actual HTTP calls to TfL (no cached metadata)
*/