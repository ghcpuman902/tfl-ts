// run by:
// npx ts-node playground/demo/cabwise.ts
// or
// pnpm dlx ts-node playground/demo/cabwise.ts
// or
// bunx ts-node playground/demo/cabwise.ts
// see example output at the end of the file

import TflClient from '../../src/index';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const client = new TflClient();

// Helper function to format operator information with visual indicators
const formatOperator = (operator: any, index: number) => {
    let info = `   ${index + 1}. ${operator.TradingName || operator.OrganisationName || 'Unknown Company'}`;
    
    if (operator.BookingsPhoneNumber) {
        info += `\n      📞 Phone: ${operator.BookingsPhoneNumber}`;
    }
    if (operator.BookingsEmail && operator.BookingsEmail !== ',') {
        info += `\n      📧 Email: ${operator.BookingsEmail}`;
    }
    if (operator.OperatorTypes && operator.OperatorTypes.length > 0) {
        info += `\n      🚗 Types: ${operator.OperatorTypes.join(', ')}`;
    }
    if (operator.WheelchairAccessible) {
        info += `\n      ♿ Wheelchair Accessible`;
    }
    if (operator.HoursOfOperation24X7) {
        info += `\n      🕐 24/7 Service`;
    }
    if (operator.NumberOfVehicles) {
        info += `\n      🚙 Vehicles: ${operator.NumberOfVehicles}`;
    }
    if (operator.Distance) {
        info += `\n      📍 Distance: ${operator.Distance.toFixed(2)}km`;
    }
    
    return info;
};

const main = async () => {
    try {
        console.log('🚕 Cabwise (Taxi & Minicab) Data:');
        console.log('================================');

        // ======== Example 1: Basic search around Aldwych ========
        try {
            console.log('\n🔍 Basic Search around Aldwych:');
            console.log('-'.repeat(50));

            const results = await client.cabwise.search({
                lat: 51.514792, // Aldwych area
                lon: -0.118509,
                radius: 5000,
            });

            if (results.Operators?.OperatorList && results.Operators.OperatorList.length > 0) {
                console.log(`   Found ${results.Operators.OperatorList.length} services${results.Operators.OperatorList.length > 3 ? ', showing first 3' : ''}:`);
                console.log('');

                // Show first 3 operators with detailed formatting
                results.Operators.OperatorList.slice(0, 3).forEach((operator: any, index: number) => {
                    console.log(formatOperator(operator, index));
                    console.log('');
                });

                // Show summary statistics
                const totalVehicles = results.Operators.OperatorList.reduce((sum: number, op: any) => sum + (op.NumberOfVehicles || 0), 0);
                const wheelchairAccessible = results.Operators.OperatorList.filter((op: any) => op.WheelchairAccessible).length;
                const twentyFourSeven = results.Operators.OperatorList.filter((op: any) => op.HoursOfOperation24X7).length;

                console.log('   📊 Summary:');
                console.log(`      Total vehicles: ${totalVehicles}`);
                console.log(`      Wheelchair accessible: ${wheelchairAccessible}`);
                console.log(`      24/7 services: ${twentyFourSeven}`);

                if (results.Header) {
                    console.log(`\n   📋 Data source: ${results.Header.DisplayTitle || results.Header.Identifier}`);
                    console.log(`   📅 Last updated: ${results.Header.PublishDateTime}`);
                }

                // Show raw JSON for first operator
                console.log('\n   📄 Raw JSON (first operator):');
                console.dir(results.Operators.OperatorList[0], { depth: null });

            } else {
                console.log('   No services found in the area');
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.log(`   ❌ Error: ${errorMessage}`);
        }

        // ======== Example 2: Search by specific company name ========
        try {
            console.log('\n🏢 Search by Company Name (Paddington Cars LTD):');
            console.log('-'.repeat(50));

            const results = await client.cabwise.search({
                lat: 51.514792,
                lon: -0.118509,
                name: 'Paddington Cars LTD'
                // No radius restriction to allow broader search
            });

            if (results.Operators?.OperatorList && results.Operators.OperatorList.length > 0) {
                console.log(`   Found ${results.Operators.OperatorList.length} matching services:`);
                console.log('');
                
                results.Operators.OperatorList.forEach((operator: any, index: number) => {
                    console.log(formatOperator(operator, index));
                    console.log('');
                });

                // Show raw JSON for the found operator
                console.log('   📄 Raw JSON:');
                console.dir(results.Operators.OperatorList[0], { depth: null });

            } else {
                console.log('   No services found with that name');
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.log(`   ❌ Error: ${errorMessage}`);
        }

        // ======== Example 3: API Information ========
        try {
            console.log('\n🔧 API Information:');
            console.log('-'.repeat(50));
            
            const endpoints = client.cabwise.getEndpoints();
            console.log('\n   Available Endpoints:');
            Object.keys(endpoints).forEach(endpointKey => {
                const endpoint = endpoints[endpointKey as keyof typeof endpoints];
                console.log(`   - ${endpointKey}: ${endpoint.method} ${endpoint.path}`);
                console.log(`     Description: ${endpoint.description}`);
                console.log(`     Parameters: ${endpoint.parameters.length}`);
            });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.log(`   ❌ Error: ${errorMessage}`);
        }

        console.log('\n💡 Demo Summary:');
        console.log('   - Cabwise API provides real-time taxi and minicab contact information');
        console.log('   - Search by location, company name, operator type, and accessibility');
        console.log('   - Each search returns detailed operator information');
        console.log('   - API makes actual HTTP calls to TfL (no cached data)');

    } catch (error) {
        console.error('❌ Error:', error);
    }
};

main(); 



/* example output:
🚕 Cabwise (Taxi & Minicab) Data:
================================

🔍 Basic Search around Aldwych:
--------------------------------------------------
   Found 11 services, showing first 3:

   1. Minicab Waterloo
      📞 Phone: 020 3538 9188
      📧 Email: INFO@WATERLOOCARS.CO.UK
      🚗 Types: Minicab, Executive, Chauffeur, Contract, Driver Guide(Tourist service), MPV, School Runs
      🕐 24/7 Service
      🚙 Vehicles: 30
      📍 Distance: 0.75km

   2. CENTRAL LONDON EXECUTIVE
      📞 Phone: 020 4536 1611
      📧 Email: BOOKING@CENTRAL-LONDON-CARS.CO.UK
      🚗 Types: Contract, Executive, MPV, Minicab, School Runs
      ♿ Wheelchair Accessible
      🚙 Vehicles: 100
      📍 Distance: 1.15km

   3. Uclick Idrive
      📞 Phone: 02079318006
      🚗 Types: Chauffeur, Contract, Executive, Limousine, MPV, Minicab, School Runs
      🚙 Vehicles: 15
      📍 Distance: 1.65km

   📊 Summary:
      Total vehicles: 227
      Wheelchair accessible: 2
      24/7 services: 5

   📋 Data source: Licenced Private Hire Operators (Find a ride)
   📅 Last updated: Jul 09 2025 07:26PM

   📄 Raw JSON (first operator):
{
  OperatorId: 0,
  OrganisationName: 'Euro Mobile Cars Limited',
  TradingName: 'Minicab Waterloo',
  AlsoKnownAs: [
    'Drop us Minicabs',
    'Waterloo cars',
    'Via Airport',
    'Euro Mobile cars'
  ],
  CentreId: 27936,
  AddressLine1: '135',
  AddressLine2: 'Mepham Street',
  AddressLine3: ',',
  Town: ',',
  County: ',',
  Postcode: 'SE1 8SQ',
  BookingsPhoneNumber: '020 3538 9188',
  BookingsEmail: 'INFO@WATERLOOCARS.CO.UK',
  PublicAccess: true,
  PublicWaitingRoom: true,
  WheelchairAccessible: false,
  CreditDebitCard: false,
  ChequeBankersCard: false,
  AccountServicesAvailable: true,
  HoursOfOperation24X7: true,
  HoursOfOperationMonThu: false,
  StartTimeMonThu: '',
  EndTimeMonThu: '',
  HoursOfOperationFri: false,
  StartTimeFri: '',
  EndTimeFri: '',
  HoursOfOperationSat: false,
  StartTimeSat: '',
  EndTimeSat: '',
  HoursOfOperationSun: false,
  StartTimeSun: '',
  EndTimeSun: '',
  HoursOfOperationPubHol: false,
  StartTimePubHol: '',
  EndTimePubHol: '',
  NumberOfVehicles: 30,
  NumberOfVehiclesWheelchair: 0,
  Longitude: -0.113151,
  Latitude: 51.503646,
  OperatorTypes: [
    'Minicab',
    'Executive',
    'Chauffeur',
    'Contract',
    'Driver Guide(Tourist service)',
    'MPV',
    'School Runs'
  ],
  Distance: 0.75
}

🏢 Search by Company Name (Paddington Cars LTD):
--------------------------------------------------
   Found 1 matching services:

   1. Paddington Cars LTD
      📞 Phone: 0207 262 1255
      🚗 Types: Minicab
      🕐 24/7 Service
      🚙 Vehicles: 4
      📍 Distance: 2.48km

   📄 Raw JSON:
{
  OperatorId: 0,
  OrganisationName: 'Paddington Cars Limited',
  TradingName: 'Paddington Cars LTD',
  AlsoKnownAs: [],
  CentreId: 2029,
  AddressLine1: '189',
  AddressLine2: 'Praed Street',
  AddressLine3: 'Paddington',
  Town: ',',
  County: ',',
  Postcode: 'W2 1RH',
  BookingsPhoneNumber: '0207 262 1255',
  BookingsEmail: ',',
  PublicAccess: false,
  PublicWaitingRoom: false,
  WheelchairAccessible: false,
  CreditDebitCard: false,
  ChequeBankersCard: false,
  AccountServicesAvailable: false,
  HoursOfOperation24X7: true,
  HoursOfOperationMonThu: false,
  StartTimeMonThu: '',
  EndTimeMonThu: '',
  HoursOfOperationFri: false,
  StartTimeFri: '',
  EndTimeFri: '',
  HoursOfOperationSat: false,
  StartTimeSat: '',
  EndTimeSat: '',
  HoursOfOperationSun: false,
  StartTimeSun: '',
  EndTimeSun: '',
  HoursOfOperationPubHol: false,
  StartTimePubHol: '',
  EndTimePubHol: '',
  NumberOfVehicles: 4,
  NumberOfVehiclesWheelchair: 0,
  Longitude: -0.175618,
  Latitude: 51.515464,
  OperatorTypes: [ 'Minicab' ],
  Distance: 2.48
}

🔧 API Information:
--------------------------------------------------
   API Name: Cabwise API
   Total Endpoints: 1

   Available Endpoints:
   - SEARCH: GET /Cabwise/search
     Description: Gets taxis and minicabs contact information
     Parameters: 10

💡 Demo Summary:
   - Cabwise API provides real-time taxi and minicab contact information
   - Search by location, company name, operator type, and accessibility
   - Each search returns detailed operator information
   - API makes actual HTTP calls to TfL (no cached data)
*/