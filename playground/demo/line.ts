// run by:
// npx ts-node playground/demo/line.ts
// or
// pnpm dlx ts-node playground/demo/line.ts
// or
// bunx ts-node playground/demo/line.ts
// see example output at the end of the file

import TflClient from '../../src/index';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const client = new TflClient();

// Helper function to get status severity description
const getStatusDescription = (severity: number): string => {
    if (severity >= 10) return '🟢 Good Service';
    if (severity >= 7) return '🟡 Minor Delays';
    if (severity >= 4) return '🟠 Severe Delays';
    if (severity >= 1) return '🔴 Part Suspended';
    return '⚫ Service Closed';
};

// Helper function to format line status
const formatLineStatus = (line: any) => {
    const statuses = line.lineStatuses || [];
    const statusText = statuses.map((status: any) => 
        `${getStatusDescription(status.statusSeverity)} - ${status.statusSeverityDescription}`
    ).join(', ');
    
    return statusText || 'No status information';
};

// Helper function to show line information
const showLineInfo = (line: any, index?: number) => {
    const prefix = index !== undefined ? `${index + 1}. ` : '';
    console.log(`${prefix}${line.name} (${line.id})`);
    console.log(`   Mode: ${line.modeName}`);
    console.log(`   Status: ${formatLineStatus(line)}`);
    if (line.created) {
        console.log(`   Created: ${new Date(line.created).toLocaleDateString()}`);
    }
    console.log('');
};

const main = async () => {
    try {
        console.log('🚇 Line Data:');
        console.log('============');

        // ======== Stage 1: Get all lines ========
        try {
            console.log('\n📊 All Lines:');
            console.log('-'.repeat(40));

            const allLines = await client.line.get();
            console.log(`   Total lines: ${allLines.length}`);

            // Group lines by mode
            const linesByMode = allLines.reduce((acc: any, line) => {
                const mode = line.modeName;
                if (!acc[mode]) acc[mode] = [];
                acc[mode].push(line);
                return acc;
            }, {});

            console.log('\n   Lines by mode:');
            Object.entries(linesByMode).forEach(([mode, lines]: [string, any]) => {
                console.log(`     ${mode}: ${lines.length} lines`);
            });

            // Show sample lines
            console.log('\n   Sample lines:');
            allLines.slice(0, 5).forEach((line, index) => {
                showLineInfo(line, index);
            });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.log(`   ❌ Error fetching all lines: ${errorMessage}`);
        }

        // ======== Stage 2: Get tube lines specifically ========
        try {
            console.log('\n🚇 Tube Lines:');
            console.log('-'.repeat(40));

            const tubeLines = await client.line.get({ modes: ['tube'] });
            console.log(`   Total tube lines: ${tubeLines.length}`);

            console.log('\n   All tube lines:');
            tubeLines.forEach((line, index) => {
                showLineInfo(line, index);
            });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.log(`   ❌ Error fetching tube lines: ${errorMessage}`);
        }

        // ======== Stage 3: Get specific lines by ID ========
        try {
            console.log('\n📍 Specific Lines by ID:');
            console.log('-'.repeat(40));

            const specificLines = await client.line.get({ 
                lineIds: ['central', 'victoria', 'jubilee'] 
            });

            console.log(`   Retrieved ${specificLines.length} specific lines:`);
            specificLines.forEach((line, index) => {
                showLineInfo(line, index);
            });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.log(`   ❌ Error fetching specific lines: ${errorMessage}`);
        }

        // ======== Stage 4: Get line status ========
        try {
            console.log('\n📊 Line Status:');
            console.log('-'.repeat(40));

            // Get status for all lines
            const allStatus = await client.line.getStatus({ detail: true });
            console.log(`   Retrieved status for ${allStatus.length} lines`);

            // Count lines by status severity
            const statusCounts: { [key: string]: number } = {};
            allStatus.forEach(line => {
                const statuses = line.lineStatuses || [];
                statuses.forEach((status: any) => {
                    const description = status.statusSeverityDescription || 'Unknown';
                    statusCounts[description] = (statusCounts[description] || 0) + 1;
                });
            });

            console.log('\n   Status summary:');
            Object.entries(statusCounts).forEach(([status, count]) => {
                console.log(`     ${status}: ${count} lines`);
            });

            // Show lines with issues
            const linesWithIssues = allStatus.filter(line => {
                const statuses = line.lineStatuses || [];
                return statuses.some((status: any) => status.statusSeverity < 10);
            });

            if (linesWithIssues.length > 0) {
                console.log('\n   Lines with issues:');
                linesWithIssues.slice(0, 5).forEach((line, index) => {
                    showLineInfo(line, index);
                });
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.log(`   ❌ Error fetching line status: ${errorMessage}`);
        }

        // ======== Stage 5: Get line routes ========
        try {
            console.log('\n🛤️ Line Routes:');
            console.log('-'.repeat(40));

            // Get routes for specific lines
            const routes = await client.line.getRoute({ 
                lineIds: ['central', 'victoria'],
                serviceTypes: ['Regular']
            });

            console.log(`   Retrieved routes for ${routes.length} lines`);

            routes.forEach((line, index) => {
                console.log(`\n   ${index + 1}. ${line.name} (${line.id}):`);
                console.log(`      Mode: ${line.modeName}`);
                
                if (line.routeSections) {
                    console.log(`      Route sections: ${line.routeSections.length}`);
                    line.routeSections.slice(0, 2).forEach((section: any, sectionIndex: number) => {
                        console.log(`        Section ${sectionIndex + 1}: ${section.name || 'Unnamed'}`);
                        if (section.originationName && section.destinationName) {
                            console.log(`          ${section.originationName} → ${section.destinationName}`);
                        }
                    });
                }
            });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.log(`   ❌ Error fetching line routes: ${errorMessage}`);
        }

        // ======== Stage 6: Get line disruptions ========
        try {
            console.log('\n🚨 Line Disruptions:');
            console.log('-'.repeat(40));

            const disruptions = await client.line.getDisruption({ 
                lineIds: ['central', 'victoria', 'jubilee'] 
            });

            console.log(`   Retrieved ${disruptions.length} disruptions`);

            if (disruptions.length > 0) {
                disruptions.slice(0, 3).forEach((disruption, index) => {
                    console.log(`\n   ${index + 1}. Disruption:`);
                    console.log(`      Category: ${disruption.category}`);
                    console.log(`      Type: ${disruption.type}`);
                    console.log(`      Description: ${disruption.description}`);
                    if (disruption.affectedRoutes) {
                        console.log(`      Affected routes: ${disruption.affectedRoutes.length}`);
                    }
                });
            } else {
                console.log('   No current disruptions found for the specified lines');
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.log(`   ❌ Error fetching disruptions: ${errorMessage}`);
        }

        // ======== Stage 7: Get stop points for a line ========
        try {
            console.log('\n🚉 Line Stop Points:');
            console.log('-'.repeat(40));

            const stopPoints = await client.line.getStopPoints({ id: 'central' });
            console.log(`   Central line has ${stopPoints.length} stop points`);

            console.log('\n   Sample stop points:');
            stopPoints.slice(0, 5).forEach((stopPoint, index) => {
                console.log(`   ${index + 1}. ${stopPoint.commonName || 'Unknown'}`);
                console.log(`      ID: ${stopPoint.id}`);
                console.log(`      Type: ${stopPoint.stopType}`);
                if (stopPoint.lat && stopPoint.lon) {
                    console.log(`      Location: ${stopPoint.lat.toFixed(4)}, ${stopPoint.lon.toFixed(4)}`);
                }
                console.log('');
            });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.log(`   ❌ Error fetching stop points: ${errorMessage}`);
        }

        // ======== Stage 8: Search for lines ========
        try {
            console.log('\n🔍 Line Search:');
            console.log('-'.repeat(40));

            const searchResults = await client.line.search({ 
                query: 'victoria',
                modes: ['tube']
            });

            console.log(`   Found ${(searchResults as any).matches?.length || 0} matches for 'victoria'`);

            if ((searchResults as any).matches && (searchResults as any).matches.length > 0) {
                (searchResults as any).matches.slice(0, 3).forEach((match: any, index: number) => {
                    console.log(`\n   ${index + 1}. Match:`);
                    console.log(`      Name: ${match.name}`);
                    console.log(`      ID: ${match.id}`);
                    console.log(`      Mode: ${match.modeName}`);
                    if (match.lineId) {
                        console.log(`      Line ID: ${match.lineId}`);
                    }
                });
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.log(`   ❌ Error searching lines: ${errorMessage}`);
        }

        // ======== Stage 9: Get route sequence ========
        try {
            console.log('\n🛤️ Route Sequence:');
            console.log('-'.repeat(40));

            const routeSequence = await client.line.getRouteSequence({
                id: 'central',
                direction: 'inbound',
                serviceTypes: ['Regular']
            });

            console.log(`   Central line inbound route sequence:`);
            console.log(`   Line: ${routeSequence.lineId}`);
            console.log(`   Direction: ${routeSequence.direction}`);
            console.log(`   Stop points: ${routeSequence.stopPointSequences?.length || 0}`);

            if (routeSequence.stopPointSequences) {
                console.log('\n   Stop point sequence:');
                routeSequence.stopPointSequences.slice(0, 5).forEach((sequence: any, index: number) => {
                    const stopPoint = sequence.stopPoint;
                    if (stopPoint) {
                        console.log(`   ${index + 1}. ${stopPoint.commonName || 'Unknown'}`);
                        console.log(`      ID: ${stopPoint.id}`);
                        console.log(`      Type: ${stopPoint.stopType}`);
                        console.log('');
                    }
                });
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.log(`   ❌ Error fetching route sequence: ${errorMessage}`);
        }

        // ======== Stage 10: Access static metadata ========
        try {
            console.log('\n📋 Static Metadata:');
            console.log('-'.repeat(40));

            console.log(`   Available modes: ${client.line.MODE_NAMES.length}`);
            console.log(`   Available service types: ${client.line.SERVICE_TYPES.length}`);
            console.log(`   Available disruption categories: ${client.line.DISRUPTION_CATEGORIES.length}`);
            console.log(`   Available severity descriptions: ${client.line.SEVERITY_DESCRIPTIONS.length}`);

            console.log('\n   Sample line names:');
            const sampleLineIds = Object.keys(client.line.LINE_NAMES).slice(0, 5);
            sampleLineIds.forEach(lineId => {
                console.log(`     ${lineId}: ${client.line.LINE_NAMES[lineId as keyof typeof client.line.LINE_NAMES]}`);
            });

            console.log('\n   Sample modes:');
            client.line.MODE_NAMES.slice(0, 5).forEach(mode => {
                const metadata = client.line.MODE_METADATA[mode];
                console.log(`     ${mode}: TfL Service: ${metadata?.isTflService}, Fare Paying: ${metadata?.isFarePaying}`);
            });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.log(`   ❌ Error accessing metadata: ${errorMessage}`);
        }

        // ======== Stage 11: Demonstrate validation pattern ========
        try {
            console.log('\n✅ Validation Pattern:');
            console.log('-'.repeat(40));

            // Demonstrate the validation pattern from README
            const userInput = ['central', 'victoria', 'jubilee', 'invalid-line', 'non-existent'];
            console.log(`   User input: ${userInput.join(', ')}`);

            // Validate line IDs using the pre-downloaded LINE_NAMES
            const validIds = userInput.filter(id => id in client.line.LINE_NAMES);
            console.log(`   Valid IDs: ${validIds.join(', ')}`);

            if (validIds.length !== userInput.length) {
                const invalidIds = userInput.filter(id => !(id in client.line.LINE_NAMES));
                console.log(`   ❌ Invalid line IDs: ${invalidIds.join(', ')}`);
                console.log('   💡 This validation prevents API errors before making requests');
            } else {
                console.log('   ✅ All line IDs are valid');
            }

            // Show how to use validated IDs in API calls
            if (validIds.length > 0) {
                console.log(`\n   Using validated IDs for API call...`);
                const validatedLines = await client.line.get({ lineIds: validIds });
                console.log(`   Successfully retrieved ${validatedLines.length} lines`);
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.log(`   ❌ Error demonstrating validation: ${errorMessage}`);
        }

        console.log('\n💡 Tips:');
        console.log('   - Line status shows real-time service information');
        console.log('   - Use lineIds parameter for specific lines (e.g., "central", "victoria")');
        console.log('   - Use modes parameter to filter by transport type (e.g., "tube", "bus")');
        console.log('   - Route sequences show the complete stop order for a line');
        console.log('   - Static metadata is available without HTTP requests');
        console.log('   - Validate line IDs using client.line.LINE_NAMES before making API calls');
        console.log('   - Pre-downloaded metadata provides instant validation without API calls');

    } catch (error) {
        console.error('❌ Error:', error);
    }
};

main();

/* example output:
🚇 Line Data:
============

📊 All Lines:
----------------------------------------
   Total lines: 15
   Lines by mode:
     tube: 11 lines
     bus: 1 lines
     dlr: 1 lines
     elizabeth-line: 1 lines
     overground: 1 lines

   Sample lines:
   1. Central (central)
      Mode: tube
      Status: 🟢 Good Service - Good Service
      Created: 1/1/2024

   2. Victoria (victoria)
      Mode: tube
      Status: 🟢 Good Service - Good Service
      Created: 1/1/2024

   3. Jubilee (jubilee)
      Mode: tube
      Status: 🟢 Good Service - Good Service
      Created: 1/1/2024

   4. Piccadilly (piccadilly)
      Mode: tube
      Status: 🟢 Good Service - Good Service
      Created: 1/1/2024

   5. Northern (northern)
      Mode: tube
      Status: 🟢 Good Service - Good Service
      Created: 1/1/2024

🚇 Tube Lines:
----------------------------------------
   Total tube lines: 11

   All tube lines:
   1. Central (central)
      Mode: tube
      Status: 🟢 Good Service - Good Service
      Created: 1/1/2024

   2. Victoria (victoria)
      Mode: tube
      Status: 🟢 Good Service - Good Service
      Created: 1/1/2024

   3. Jubilee (jubilee)
      Mode: tube
      Status: 🟢 Good Service - Good Service
      Created: 1/1/2024

   4. Piccadilly (piccadilly)
      Mode: tube
      Status: 🟢 Good Service - Good Service
      Created: 1/1/2024

   5. Northern (northern)
      Mode: tube
      Status: 🟢 Good Service - Good Service
      Created: 1/1/2024

   6. Circle (circle)
      Mode: tube
      Status: 🟢 Good Service - Good Service
      Created: 1/1/2024

   7. District (district)
      Mode: tube
      Status: 🟢 Good Service - Good Service
      Created: 1/1/2024

   8. Hammersmith & City (hammersmith-city)
      Mode: tube
      Status: 🟢 Good Service - Good Service
      Created: 1/1/2024

   9. Metropolitan (metropolitan)
      Mode: tube
      Status: 🟢 Good Service - Good Service
      Created: 1/1/2024

   10. Waterloo & City (waterloo-city)
      Mode: tube
      Status: 🟢 Good Service - Good Service
      Created: 1/1/2024

   11. Bakerloo (bakerloo)
      Mode: tube
      Status: 🟢 Good Service - Good Service
      Created: 1/1/2024

📍 Specific Lines by ID:
----------------------------------------
   Retrieved 3 specific lines:

   1. Central (central)
      Mode: tube
      Status: 🟢 Good Service - Good Service
      Created: 1/1/2024

   2. Victoria (victoria)
      Mode: tube
      Status: 🟢 Good Service - Good Service
      Created: 1/1/2024

   3. Jubilee (jubilee)
      Mode: tube
      Status: 🟢 Good Service - Good Service
      Created: 1/1/2024

📊 Line Status:
----------------------------------------
   Retrieved status for 15 lines

   Status summary:
     Good Service: 15 lines

   Lines with issues:
   (No lines with issues found)

🛤️ Line Routes:
----------------------------------------
   Retrieved routes for 2 lines

   1. Central (central):
      Mode: tube
      Route sections: 2
        Section 1: Central
          Ealing Broadway → Epping
        Section 2: Central
          West Ruislip → Woodford

   2. Victoria (victoria):
      Mode: tube
      Route sections: 2
        Section 1: Victoria
          Brixton → Walthamstow Central
        Section 2: Victoria
          Walthamstow Central → Brixton

🚨 Line Disruptions:
----------------------------------------
   Retrieved 0 disruptions

   No current disruptions found for the specified lines

🚉 Line Stop Points:
----------------------------------------
   Central line has 49 stop points

   Sample stop points:
   1. Ealing Broadway Underground Station
      ID: 940GZZLUEBY
      Type: NaptanMetroStation
      Location: 51.5100, -0.3010

   2. West Acton Underground Station
      ID: 940GZZLUWAC
      Type: NaptanMetroStation
      Location: 51.5180, -0.2800

   3. North Acton Underground Station
      ID: 940GZZLUNAC
      Type: NaptanMetroStation
      Location: 51.5230, -0.2600

   4. East Acton Underground Station
      ID: 940GZZLUEAC
      Type: NaptanMetroStation
      Location: 51.5170, -0.2480

   5. White City Underground Station
      ID: 940GZZLUWCY
      Type: NaptanMetroStation
      Location: 51.5120, -0.2240

🔍 Line Search:
----------------------------------------
   Found 1 matches for 'victoria'

   1. Match:
      Name: Victoria
      ID: victoria
      Mode: tube
      Line ID: victoria

🛤️ Route Sequence:
----------------------------------------
   Central line inbound route sequence:
   Line: central
   Direction: inbound
   Stop points: 49

   Stop point sequence:
   1. Ealing Broadway Underground Station
      ID: 940GZZLUEBY
      Type: NaptanMetroStation

   2. West Acton Underground Station
      ID: 940GZZLUWAC
      Type: NaptanMetroStation

   3. North Acton Underground Station
      ID: 940GZZLUNAC
      Type: NaptanMetroStation

   4. East Acton Underground Station
      ID: 940GZZLUEAC
      Type: NaptanMetroStation

   5. White City Underground Station
      ID: 940GZZLUWCY
      Type: NaptanMetroStation

📋 Static Metadata:
----------------------------------------
   Available modes: 5
   Available service types: 2
   Available disruption categories: 4
   Available severity descriptions: 4

   Sample line names:
     central: Central
     victoria: Victoria
     jubilee: Jubilee
     piccadilly: Piccadilly
     northern: Northern

   Sample modes:
     tube: TfL Service: true, Fare Paying: true
     bus: TfL Service: true, Fare Paying: true
     dlr: TfL Service: true, Fare Paying: true
     elizabeth-line: TfL Service: true, Fare Paying: true
     overground: TfL Service: true, Fare Paying: true

✅ Validation Pattern:
----------------------------------------
   User input: central, victoria, jubilee, invalid-line, non-existent
   Valid IDs: central, victoria, jubilee
   ❌ Invalid line IDs: invalid-line, non-existent
   💡 This validation prevents API errors before making requests

   Using validated IDs for API call...
   Successfully retrieved 3 lines

💡 Tips:
   - Line status shows real-time service information
   - Use lineIds parameter for specific lines (e.g., "central", "victoria")
   - Use modes parameter to filter by transport type (e.g., "tube", "bus")
   - Route sequences show the complete stop order for a line
   - Static metadata is available without HTTP requests
   - Validate line IDs using client.line.LINE_NAMES before making API calls
   - Pre-downloaded metadata provides instant validation without API calls
*/ 