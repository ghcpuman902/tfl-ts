## 📋 Progress Summary for TfL API TypeScript Wrapper Development

### **🚨 CRITICAL REFERENCE FOR AI AGENTS**

**IMPORTANT DECISION (2024)**: We use **flexible `string[]` types** instead of strict TypeScript types for better developer experience.

**Key Points for AI Agents:**
- ✅ Use `string[]` for all parameter types (modes, ids, categories, etc.)
- ✅ Still provide autocomplete through JSDoc comments
- ✅ Include validation examples in all method documentation
- ✅ Don't use strict types like `TflLineId[]` or `ModeName[]`
- ✅ Focus on beginner-friendly approach

**Example Pattern:**
```typescript
// ✅ CORRECT: Flexible types
interface BaseLineQuery {
  /** Array of line IDs (e.g., 'central', 'victoria'). TypeScript provides autocomplete for known values. */
  ids?: string[];
  /** Array of transport modes (e.g., 'tube', 'bus', 'dlr'). TypeScript provides autocomplete for known values. */
  modes?: string[];
}

// ❌ WRONG: Strict types
interface BaseLineQuery {
  ids?: TflLineId[];
  modes?: ModeName[];
}
```

**Always Include Validation Examples:**
```typescript
/**
 * @example
 * // Validate user input before making API calls
 * const userInput = ['central', 'invalid-line'];
 * const validIds = userInput.filter(id => id in client.line.LINE_NAMES);
 * if (validIds.length !== userInput.length) {
 *   throw new Error(`Invalid line IDs: ${userInput.filter(id => !(id in client.line.LINE_NAMES)).join(', ')}`);
 * }
 */
```

### **🚨 CRITICAL: NEVER HARDCODE METADATA**

**CRITICAL RULE**: **NEVER hardcode metadata values!** Always use the generated data from `Meta.ts` and other generated files.

**❌ WRONG - Never do this:**
```typescript
// ❌ NEVER hardcode metadata
const SeverityDescription = [
  'Good Service',
  'Minor Delays', 
  'Severe Delays',
  'Part Suspended',
  // ... hardcoded values
] as const;

const tubeSeverity = [
  { level: 10, description: 'Good Service' },
  { level: 9, description: 'Minor Delays' },
  // ... hardcoded values
] as const;
```

**✅ CORRECT - Always do this:**
```typescript
// ✅ ALWAYS use generated metadata
import { 
  Modes, 
  ServiceTypes, 
  DisruptionCategories, 
  Severity,
  Categories,
  PlaceTypes,
  SearchProviders,
  Sorts,
  StopTypes
} from './generated/meta/Meta';

// Build metadata from generated data
const buildSeverityByMode = (): Record<string, Array<{level: number, description: string}>> => {
  const severityMap: Record<string, Array<{level: number, description: string}>> = {};
  
  Severity.forEach(severity => {
    if (!severityMap[severity.modeName]) {
      severityMap[severity.modeName] = [];
    }
    severityMap[severity.modeName].push({
      level: severity.severityLevel,
      description: severity.description
    });
  });
  
  return severityMap;
};

// Use generated data directly
public readonly SERVICE_TYPES: readonly ServiceType[] = ServiceTypes;
public readonly DISRUPTION_CATEGORIES: readonly DisruptionCategory[] = DisruptionCategories;
public readonly MODE_NAMES: readonly ModeName[] = Modes.map(m => m.modeName);
```

**Required Metadata Constants for Every Module:**
```typescript
export class [ModuleName] {
  // ✅ ALWAYS provide these metadata constants
  public readonly MODE_NAMES: readonly ModeName[] = Modes.map(m => m.modeName);
  public readonly SERVICE_TYPES: readonly ServiceType[] = ServiceTypes;
  public readonly DISRUPTION_CATEGORIES: readonly DisruptionCategory[] = DisruptionCategories;
  public readonly PLACE_TYPES: readonly typeof PlaceTypes[number][] = PlaceTypes;
  public readonly SEARCH_PROVIDERS: readonly typeof SearchProviders[number][] = SearchProviders;
  public readonly SORT_OPTIONS: readonly typeof Sorts[number][] = Sorts;
  public readonly STOP_TYPES: readonly typeof StopTypes[number][] = StopTypes;
  public readonly CATEGORIES: readonly typeof Categories[number][] = Categories;
  public readonly ALL_SEVERITY: readonly typeof Severity[number][] = Severity;
  
  // ✅ Build derived metadata from generated data
  public readonly SEVERITY_BY_MODE = this.buildSeverityByMode();
  public readonly SEVERITY_DESCRIPTIONS = this.buildSeverityDescriptions();
}
```

**Available Generated Metadata Files:**
- `./generated/meta/Meta.ts` - Contains: Modes, Severity, ServiceTypes, DisruptionCategories, Categories, PlaceTypes, SearchProviders, Sorts, StopTypes
- `./generated/meta/Line.ts` - Contains: Lines (all line data)
- `./generated/meta/[OtherModule].ts` - Contains: module-specific metadata

**Benefits of Using Generated Metadata:**
- ✅ **Always up-to-date**: Generated from live TfL API
- ✅ **Complete**: Contains all possible values
- ✅ **Type-safe**: TypeScript types generated automatically
- ✅ **Consistent**: Same data across all modules
- ✅ **Maintainable**: No manual updates needed
- ✅ **Reliable**: No risk of typos or missing values

### **Project Overview**
We're developing a TypeScript wrapper for the Transport for London (TfL) API. The goal is to create well-typed, documented, and consistent API client modules that map to generated JSDoc files without importing from them.

### **Current Progress**

Meta.ts

AccidentStats.ts
AirQuality.ts
BikePoint.ts
Cabwise.ts
Journey.ts
Line.ts
Mode.ts
Occupancy.ts
Place.ts
Road.ts
Search.ts
StopPoint.ts
TravelTimes.ts
Vehicle.ts

### **🎯 BikePoint Module Achievement Summary**

The `bikePoint.ts` module represents one of the most comprehensive implementations in the TfL API wrapper, achieving **610 lines** of well-structured, documented code. Here's what it has accomplished:

#### **🏗️ Architecture & Design**
- **Complete API Coverage**: Implements all 5 TfL BikePoint endpoints
- **Advanced Data Processing**: Transforms raw API responses into structured, user-friendly data
- **Utility Module Integration**: Leverages `utils/bikePoint.ts` for complex data extraction
- **Flexible Type System**: Uses string-based parameters with TypeScript autocomplete

#### **📊 Core Functionality**
1. **`get()`** - Retrieves all bike points with real-time status
2. **`getById(id)`** - Gets detailed information for specific bike points
3. **`search(query)`** - Searches bike points by name/location
4. **`getByRadius(options)`** - Finds bike points within specified radius
5. **`getByBounds(options)`** - Searches within geographic bounding box

#### **🔧 Advanced Features**
- **Status Extraction**: Automatically calculates broken docks, available spaces
- **Electric Bike Support**: Tracks standard vs electric bike availability
- **Distance Calculations**: Provides distance from search points
- **Property Preservation**: Optional `keepTflTypes` for debugging/advanced use
- **Real-time Data**: Current bike/dock availability and operational status

#### **📝 Comprehensive Documentation**
- **Rich JSDoc Examples**: Every method includes practical usage examples
- **Data Structure Examples**: Detailed interface documentation with sample data
- **Validation Examples**: Shows how to validate user input before API calls
- **Utility Function Examples**: Demonstrates advanced filtering and sorting

#### **🛠️ Utility Functions (utils/bikePoint.ts)**
- **`extractStatus()`** - Transforms raw API data into structured status
- **`getPropertyValue()`** - Safely extracts property values
- **`findElectricBikes()`** - Filters bike points with e-bikes
- **`sortByDistance()`** - Sorts bike points by proximity
- **`findClosestWithBikes()`** - Finds nearest available bike point

#### **🎯 Developer Experience**
- **TypeScript Autocomplete**: Full IntelliSense support for all parameters
- **Flexible Parameters**: Accepts strings while providing autocomplete
- **Error Handling**: Graceful handling of missing or invalid data
- **Performance Optimized**: Efficient data processing and caching
- **Beginner-Friendly**: Clear examples and validation patterns

#### **📈 Data Transformation Capabilities**
```typescript
// Raw API Response → Structured Status
{
  additionalProperties: [
    { key: "NbBikes", value: "5" },
    { key: "NbDocks", value: "15" },
    { key: "NbEmptyDocks", value: "10" }
  ]
}
// ↓ Transformed to ↓
{
  bikes: 5,
  docks: 15,
  spaces: 10,
  brokenDocks: 0,  // Calculated automatically
  eBikes: 1,       // Extracted from properties
  standardBikes: 4 // Extracted from properties
}
```

#### **🔍 Search Capabilities**
- **Name-based Search**: Find bike points by street names or landmarks
- **Radius Search**: Find bike points within specified distance
- **Bounding Box Search**: Search within geographic rectangles
- **Status Integration**: Combine search with real-time availability

#### **📊 Metadata & Constants**
- **Transport Mode**: `'cycle-hire'` constant
- **Property Categories**: Available property types
- **Property Keys**: Standard bike point property names
- **Validation Helpers**: Built-in ID validation patterns

#### **🎯 Quality Standards Met**
- ✅ **610 lines** of comprehensive, well-documented code
- ✅ **5 API endpoints** fully implemented
- ✅ **Advanced data processing** with utility functions
- ✅ **Rich JSDoc documentation** with practical examples
- ✅ **Flexible type system** with TypeScript autocomplete
- ✅ **Error handling** and validation patterns
- ✅ **Performance optimization** for large datasets
- ✅ **Beginner-friendly** approach with clear examples
- ✅ **Utility module integration** for complex operations
- ✅ **Real-time data transformation** capabilities

This module serves as an **exemplary template** for implementing complex TfL API endpoints with advanced data processing, comprehensive documentation, and excellent developer experience.

### **🔍 BikePoint JSDoc to Implementation Conversion Analysis**

#### **📋 JSDoc Structure Analysis (BikePoint.ts)**
The generated JSDoc file contains:
- **3 Core Endpoints**: `/BikePoint`, `/BikePoint/{id}`, `/BikePoint/Search`
- **Endpoint Metadata**: Path, method, summary, parameters, returnType, deprecated status
- **Parameter Definitions**: Type, required status, descriptions
- **Static Data Structure**: No dynamic content, pure metadata

#### **🔄 Conversion Process: JSDoc → Implementation**

**1. Endpoint Mapping**
```typescript
// JSDoc Endpoint → Implementation Method
"/BikePoint" (GET) → get() method
"/BikePoint/{id}" (GET) → getById(id) method  
"/BikePoint/Search" (GET) → search(query) method
```

**2. Parameter Transformation**
```typescript
// JSDoc Parameter → Implementation Interface
{
  "name": "id",
  "type": "string", 
  "required": true,
  "description": "A bike point id..."
}
// ↓ Becomes ↓
async getById(id: string, options: { keepTflTypes?: boolean } = {}): Promise<BikePointStatus>
```

**3. Return Type Enhancement**
```typescript
// JSDoc Return Type → Enhanced Implementation Type
"returnType": "Place[]" 
// ↓ Becomes ↓
Promise<BikePointStatus[]> // With calculated fields like brokenDocks, eBikes, etc.
```

**4. Additional Endpoints Added**
The implementation extends beyond the JSDoc by adding:
- **`getByRadius()`** - Uses `/BikePoint?lat={lat}&lon={lon}&radius={radius}`
- **`getByBounds()`** - Uses `/BikePoint?swLat={swLat}&swLon={swLon}&neLat={neLat}&neLon={neLon}`

#### **🏗️ Implementation Architecture Patterns**

**1. Type System Design**
```typescript
// Base Types (from tfl.ts)
import { TflApiPresentationEntitiesPlace, TflApiPresentationEntitiesAdditionalProperties }

// Enhanced Interfaces (manually created)
export interface BikePointInfo extends TflApiPresentationEntitiesPlace {
  // Enhanced with additional fields and documentation
}

export interface BikePointStatus {
  // Calculated fields not in original API
  bikes: number;
  docks: number; 
  spaces: number;
  brokenDocks: number; // Calculated: docks - (bikes + spaces)
  eBikes?: number;     // Extracted from properties
  standardBikes?: number; // Extracted from properties
}
```

**2. Data Transformation Layer**
```typescript
// Raw API Response → Structured Data
const rawData = await this.api.bikePoint.bikePointGetAll()
  .then((response: any) => stripTypeFields(response.data, options.keepTflTypes));

return rawData.map((bikePoint: BikePointInfo) => 
  extractStatus(bikePoint, options.keepTflTypes)
);
```

**3. Utility Module Integration**
```typescript
// Complex logic extracted to utils/bikePoint.ts
import { extractStatus } from './utils/bikePoint';

// extractStatus() function:
// - Parses additionalProperties array
// - Calculates broken docks
// - Extracts electric bike counts
// - Handles type conversion and validation
```

#### **📊 Advanced Features Beyond JSDoc**

**1. Status Calculation**
```typescript
// Automatically calculated from raw properties
const bikesCount = Number(getPropertyValue(bikePoint, 'NbBikes')) || 0;
const docksCount = Number(getPropertyValue(bikePoint, 'NbDocks')) || 0;
const spacesCount = Number(getPropertyValue(bikePoint, 'NbEmptyDocks')) || 0;
const brokenDocks = Math.max(0, docksCount - (bikesCount + spacesCount));
```

**2. Electric Bike Support**
```typescript
// Extracted from additional properties
const standardBikes = getPropertyValue(bikePoint, 'StandardBikes');
const eBikes = getPropertyValue(bikePoint, 'EBikes');
```

**3. Geographic Search**
```typescript
// Radius search with distance calculation
async getByRadius(options: BikePointRadiusQuery): Promise<BikePointRadiusResponse> {
  // Uses direct API calls with query parameters
  const queryParams = new URLSearchParams();
  queryParams.append('lat', lat.toString());
  queryParams.append('lon', lon.toString());
  queryParams.append('radius', radius.toString());
}
```

#### **🎯 Key Conversion Principles**

**1. JSDoc as Blueprint, Not Limitation**
- Use JSDoc for endpoint discovery and basic structure
- Extend with additional endpoints not in JSDoc
- Enhance return types with calculated fields
- Add comprehensive error handling and validation

**2. Data Enhancement Strategy**
- Transform raw API responses into user-friendly formats
- Calculate derived fields (broken docks, availability percentages)
- Extract meaningful data from property arrays
- Provide both raw and processed data options

**3. Developer Experience Focus**
- Rich JSDoc documentation with practical examples
- Flexible parameter types with TypeScript autocomplete
- Utility functions for common operations
- Comprehensive error handling and validation patterns

**4. Performance Optimization**
- Efficient data processing with utility functions
- Optional type field preservation for debugging
- Batch processing capabilities for large datasets
- Caching strategies for frequently accessed data

#### **📈 Conversion Metrics**

| Aspect | JSDoc | Implementation | Enhancement |
|--------|-------|----------------|-------------|
| **Endpoints** | 3 | 5 | +67% |
| **Lines of Code** | 60 | 610 | +917% |
| **Interface Types** | 0 | 8 | +∞% |
| **Utility Functions** | 0 | 5 | +∞% |
| **Documentation** | Basic | Comprehensive | +1000%+ |
| **Error Handling** | None | Full | +∞% |
| **Data Transformation** | None | Advanced | +∞% |

#### **🎯 Lessons for Future Module Development**

**1. JSDoc Analysis Process**
- Extract endpoint structure and parameters
- Identify return types and data structures
- Note any special handling requirements
- Plan additional endpoints not in JSDoc

**2. Implementation Strategy**
- Start with basic endpoint mapping
- Add comprehensive type definitions
- Implement data transformation layer
- Create utility functions for complex operations
- Add extensive documentation and examples

**3. Quality Standards**
- Follow established patterns from successful modules
- Include comprehensive error handling
- Provide flexible parameter types
- Create utility modules for complex operations
- Document everything with practical examples

This analysis demonstrates how a simple JSDoc file can be transformed into a comprehensive, production-ready API module with advanced features, excellent developer experience, and robust error handling.


#### **Module Status (14 total) - Current Status**

| API wrapper file | Status | Description | JSDoc file used | Size/Complexity |
|------------------|--------|-------------|-----------------|-----------------|
| `accidentStats.ts` | ✅ Complete | Accident statistics | AccidentStats.ts | Simple (160 lines) |
| `airQuality.ts` | ✅ Complete | Air quality data and forecasts | AirQuality.ts | Medium (318 lines) |
| `bikePoint.ts` | ✅ Complete | Bike point information and search | BikePoint.ts | **Large (610 lines)** |
| `cabwise.ts` | ✅ Complete | Taxi/minicab search (functional API) | Cabwise.ts | Simple (238 lines) |
| `journey.ts` | ✅ Complete | Journey planning and routing | Journey.ts | Large (567 lines) |
| `line.ts` | ✅ Complete | Line status, routes, disruptions | Line.ts | Large (799 lines) |
| `road.ts` | ✅ Complete | Road status and disruptions | Road.ts | Medium (417 lines) |
| `stopPoint.ts` | ✅ Complete | Stop information, arrivals, search | StopPoint.ts | Very Large (1081 lines) |
| **Remaining Modules** | | | |
| `mode.ts` | ✅ Complete | Transport modes and categories | Mode.ts | Complete (347 lines) |
| `occupancy.ts` | ❌ Missing | Occupancy data and predictions | Occupancy.ts | **TO CREATE** (~300 lines) |
| `place.ts` | ❌ Missing | Place information and search | Place.ts | **TO CREATE** (~400 lines) |
| `search.ts` | ❌ Missing | General search functionality | Search.ts | **TO CREATE** (~200 lines) |
| `travelTimes.ts` | ❌ Missing | Travel time calculations | TravelTimes.ts | **TO CREATE** (~350 lines) |
| `vehicle.ts` | ❌ Missing | Vehicle information and tracking | Vehicle.ts | **TO CREATE** (~150 lines) |

#### **🎯 Completion Plan (100% API Coverage)**

**Phase 1: Complete Partial Module** ✅ **COMPLETED**
- [x] **mode.ts** - Complete the existing 32-line stub to full implementation
  - ✅ Add comprehensive method coverage
  - ✅ Add metadata constants 
  - ✅ Add JSDoc documentation
  - ✅ Add utility methods for mode validation and filtering
  - ✅ Follow established patterns from other modules

**Phase 2: Create Missing Modules** (Priority Order)
1. [ ] **search.ts** - General search functionality (simplest remaining)
2. [ ] **vehicle.ts** - Vehicle information and tracking
3. [ ] **occupancy.ts** - Occupancy data and predictions  
4. [ ] **place.ts** - Place information and search
5. [ ] **travelTimes.ts** - Travel time calculations

**Phase 3: Integration & Quality Assurance**
- [ ] Update main index.ts to export all modules
- [ ] Add comprehensive tests for new modules
- [ ] Update README.md examples to showcase new modules
- [ ] Verify 100% API endpoint coverage
- [ ] Performance testing for batch operations

**Estimated Completion Timeline:**
- **Phase 1**: 2-4 hours (1 module completion)
- **Phase 2**: 8-12 hours (5 modules creation) 
- **Phase 3**: 2-4 hours (integration & testing)
- **Total**: 12-20 hours of development time

**Success Criteria:**
- ✅ All 14 TfL API modules implemented
- ✅ 100% endpoint coverage verified
- ✅ Comprehensive test coverage (>90%)
- ✅ Complete JSDoc documentation
- ✅ Consistent code patterns across modules
- ✅ Performance benchmarks pass
- ✅ Zero linter errors

### **🎯 Flexible Type Design Pattern**

#### **Problem Statement**
Users need **both** type safety/autocomplete **and** flexibility. The API should:
- Provide TypeScript autocomplete for known values
- Allow users to pass custom strings when needed
- Let users validate their inputs against metadata
- Not force users to import from generated files
- **Not drive beginners crazy with strict TypeScript enforcement**

#### **Solution: Flexible Types with Validation Helpers**

**Type Definition Pattern:**
```typescript
// ✅ GOOD: Accept strings for flexibility, provide autocomplete
modes?: string[];
ids?: string[];

// ❌ BAD: Too restrictive for beginners
modes?: ModeName[];
ids?: TflLineId[];
```

**User Experience:**
```typescript
// ✅ TypeScript autocomplete available for known values
const knownModes = ['tube', 'bus', 'dlr']; // Autocomplete works
await client.stopPoint.search({ query: "Oxford", modes: knownModes });

// ✅ Flexible strings also work
const userInput = ['tube', 'custom-mode'];
await client.stopPoint.search({ query: "Oxford", modes: userInput });

// ✅ Users can validate against metadata (encouraged but not enforced)
const validateLineIds = (ids: string[]) => {
  const validIds = ids.filter(id => id in client.line.LINE_NAMES);
  if (validIds.length !== ids.length) {
    const invalidIds = ids.filter(id => !(id in client.line.LINE_NAMES));
    throw new Error(`Invalid line IDs: ${invalidIds.join(', ')}`);
  }
  return validIds;
};
```

#### **Implementation Guidelines**

1. **Type Definitions:**
   ```typescript
   // Use string types for flexibility
   modes?: string[];
   categories?: string[];
   ```

2. **JSDoc Comments:**
   ```typescript
   /** Array of transport modes (e.g., 'tube', 'bus', 'dlr'). TypeScript provides autocomplete for known values. */
   modes?: string[];
   ```
   - Keep user-facing docs simple and readable
   - Show examples of common values
   - Mention autocomplete availability
   - Include validation examples in method documentation

3. **Metadata Constants:**
   ```typescript
   // Provide validation metadata
   public readonly MODE_NAMES: readonly ModeName[] = MODE_NAMES;
   public readonly LINE_NAMES: Record<TflLineId, string> = LINE_NAMES;
   ```

4. **Validation Examples:**
   ```typescript
   // Include validation examples in JSDoc
   /**
    * @example
    * // Validate user input before making API calls
    * const userInput = ['central', 'invalid-line'];
    * const validIds = userInput.filter(id => id in client.line.LINE_NAMES);
    * if (validIds.length !== userInput.length) {
    *   throw new Error(`Invalid line IDs: ${userInput.filter(id => !(id in client.line.LINE_NAMES)).join(', ')}`);
    * }
    */
   ```

#### **Benefits of This Pattern**

- **Developer Experience**: Full TypeScript autocomplete without strict enforcement
- **Beginner-friendly**: No TypeScript errors blocking progress
- **Flexibility**: Users can pass custom strings when needed
- **Validation**: Users can check inputs against metadata constants
- **Maintainability**: No redundant type aliases or confusing imports
- **Consistency**: Same pattern across all modules
- **Best Practices**: Encourages proper validation without forcing it

### **🎯 Improved ID Naming Pattern**

#### **Problem Statement**
Generic parameter names like `ids` are too vague and can lead to confusion when working with multiple types of IDs (line IDs, stop point IDs, disruption IDs, etc.).

#### **Solution: Specific ID Parameter Names**

**Naming Convention:**
```typescript
// ✅ GOOD: Specific and clear parameter names
interface LineQuery {
  lineIds?: string[];        // Clear: these are line IDs
  modes?: string[];
}

interface StopPointQuery {
  stopPointIds?: string[];   // Clear: these are stop point IDs
  lineIds?: string[];        // Clear: these are line IDs
  modes?: string[];
}

interface JourneyQuery {
  from: string;              // Clear: origin location
  to: string;                // Clear: destination location
  modes?: string[];
}

// ❌ BAD: Generic and confusing
interface GenericQuery {
  ids?: string[];            // Vague: what type of IDs?
  modes?: string[];
}
```

**API Call Mapping:**
```typescript
// User-facing interface uses clear names
async getStatus(options: LineStatusQuery): Promise<TflLine[]> {
  const { lineIds, modes, severity, detail, keepTflTypes } = options;
  
  if (lineIds?.length) {
    // Map clear parameter names to API expectations
    return this.api.line.lineStatusByIds({ 
      ids: lineIds,  // Map lineIds to ids for API call
      detail 
    }).then(response => stripTypeFields(response.data, keepTflTypes));
  }
  // ... rest of implementation
}
```

**Benefits:**
- **Clarity**: `lineIds` is immediately clear that these are line IDs
- **Consistency**: All modules use the same pattern (`lineIds`, `stopPointIds`)
- **Better Developer Experience**: Users understand what type of IDs they're working with
- **API Compatibility**: Generated API calls still work by mapping clear names to expected parameters
- **Reduced Errors**: Less chance of passing wrong ID types to methods

**Implementation Pattern for AI Agents:**
1. **Interface Definition**: Use specific ID parameter names (`lineIds`, `stopPointIds`, `disruptionIds`)
2. **Method Implementation**: Map specific names to API expectations (`ids: lineIds`)
3. **Documentation**: Update all examples to use the new parameter names
4. **Consistency**: Apply the same pattern across all modules

**Example Module Updates:**
```typescript
// Before (vague)
interface BaseLineQuery {
  ids?: string[];  // ❌ What type of IDs?
}

// After (clear)
interface BaseLineQuery {
  lineIds?: string[];  // ✅ Clear: line IDs
}

// Before (vague)
interface StopPointQuery {
  ids?: string[];  // ❌ What type of IDs?
  lines?: string[];  // ❌ What type of lines?
}

// After (clear)
interface StopPointQuery {
  stopPointIds?: string[];  // ✅ Clear: stop point IDs
  lineIds?: string[];       // ✅ Clear: line IDs
}
```

### **Development Pattern**

#### **File Structure**
```
src/
├── generated/
│   ├── jsdoc/          # Generated JSDoc documentation by script/generateJsdoc.ts, only for AI and human to read, not imported
│   ├── meta/           # Generated metadata (lines, modes, etc.) by script/generateMeat.ts
│   └── tfl.ts          # Generated API logic by `swagger-typescript-api`
├── line.ts             # ✅ Complete and tested
├── stopPoint.ts        # ✅ Complete and tested
├── accidentStats.ts    # ✅ Complete and tested
├── airQuality.ts       # ✅ Complete and tested
├── bikePoint.ts        # ✅ Complete and tested
├── cabwise.ts          # ✅ Complete and tested
├── journey.ts          # ✅ Complete
├── mode.ts             # ✅ Complete
├── occupancy.ts        # 🔄 In Progress
├── place.ts            # 🔄 In Progress
├── road.ts             # 🔄 In Progress
├── search.ts           # 🔄 In Progress
├── travelTimes.ts      # 🔄 In Progress
└── vehicle.ts          # 🔄 In Progress
script/
├── generateJsdoc.ts
└── generateMeta.ts
```

#### **Key Principles**
1. **No imports from generated files** - All types and jsdoc are manually added / copied over by you!
2. **Read JSDoc for API structure** - Understand endpoints from `/src/generated/jsdoc/[ModuleName].ts`
3. **Extract types from tfl.ts** - Import relevant interfaces from `/src/generated/tfl.ts`, occationally also from 
4. **Create consistent modules** - Follow established patterns and naming conventions
5. **Use flexible type design** - Accept strings for user flexibility, provide autocomplete
6. **Encourage validation** - Include validation examples in documentation
7. **🚨 NEVER HARDCODE METADATA** - Always use generated data from `Meta.ts` and other generated files
8. **Provide comprehensive metadata constants** - Export all relevant metadata for validation and autocomplete

### **Standard Request Format for AI**

```
Create src/[moduleName].ts to cover @[ModuleName].ts from /src/generated/jsdoc/.
Don't import anything - manually add the types from @tfl.ts.

Requirements:
- Read /src/generated/jsdoc/[ModuleName].ts for API structure
- Extract relevant types from /src/generated/tfl.ts
- Create a class with static metadata properties
- Implement all API endpoints as methods
- Add comprehensive JSDoc documentation
- Include utility methods for common operations
- Follow the existing code style and patterns
- Use flexible type design: string[] for user flexibility with autocomplete
- Provide metadata constants for validation
- Include validation examples in JSDoc
- 🚨 NEVER HARDCODE METADATA - Always use generated data from Meta.ts and other generated files
- Provide comprehensive metadata constants (MODE_NAMES, SERVICE_TYPES, DISRUPTION_CATEGORIES, etc.)
```

### **Module Structure Pattern**

Each module should include:
- **Static metadata properties** (API documentation, endpoint info)
- **Interfaces and types** (manually copied from tfl.ts)
- **Class methods** that wrap the generated API client
- **Comprehensive JSDoc** documentation with validation examples
- **Utility methods** for common operations
- **Flexible type definitions** that accept strings while providing autocomplete
- **🚨 Comprehensive metadata constants** from generated files (never hardcoded)
- **Derived metadata builders** for complex data structures

### **Example Implementation**

```typescript
/**
 * [ModuleName] API Module
 * 
 * [Description of what this module does]
 */

// Import generated metadata (NEVER hardcode!)
import { 
  Modes, 
  ServiceTypes, 
  DisruptionCategories, 
  Severity,
  Categories,
  PlaceTypes,
  SearchProviders,
  Sorts,
  StopTypes
} from './generated/meta/Meta';

// Types from tfl.ts (manually added)
export interface [ModuleName]Params {
  // Parameter definitions with flexible types
  modes?: string[]; // TypeScript provides autocomplete
  ids?: string[];   // TypeScript provides autocomplete
}

export class [ModuleName]Api {
  // Static metadata
  static readonly API_NAME = '[ModuleName] API';
  static readonly ENDPOINTS = {
    // Endpoint definitions
  };
  
  // 🚨 ALWAYS use generated metadata (never hardcode!)
  public readonly MODE_NAMES: readonly ModeName[] = Modes.map(m => m.modeName);
  public readonly SERVICE_TYPES: readonly ServiceType[] = ServiceTypes;
  public readonly DISRUPTION_CATEGORIES: readonly DisruptionCategory[] = DisruptionCategories;
  public readonly PLACE_TYPES: readonly typeof PlaceTypes[number][] = PlaceTypes;
  public readonly SEARCH_PROVIDERS: readonly typeof SearchProviders[number][] = SearchProviders;
  public readonly SORT_OPTIONS: readonly typeof Sorts[number][] = Sorts;
  public readonly STOP_TYPES: readonly typeof StopTypes[number][] = StopTypes;
  public readonly CATEGORIES: readonly typeof Categories[number][] = Categories;
  public readonly ALL_SEVERITY: readonly typeof Severity[number][] = Severity;
  
  // Build derived metadata from generated data
  public readonly SEVERITY_BY_MODE = this.buildSeverityByMode();
  public readonly SEVERITY_DESCRIPTIONS = this.buildSeverityDescriptions();

  // Constructor
  constructor(private api: any) {}

  // API methods
  async methodName(params: [ModuleName]Params): Promise<any> {
    return this.api.[moduleName].methodName(params);
  }

  // Utility methods
  utilityMethod() {
    // Helper functionality
  }
  
  // 🚨 Build derived metadata from generated data
  private buildSeverityByMode() {
    // Implementation using generated Severity data
  }
}
```

### **Using Generated Metadata**

Some modules can leverage pre-generated metadata:
- **Line IDs**: Use `Lines` from `/src/generated/meta/Line.ts`
- **Mode names**: Use `Modes` from `/src/generated/meta/Meta.ts`
- **Severity levels**: Use `Severity` from `/src/generated/meta/Meta.ts`

This provides better performance and reduces API calls while maintaining type safety.

### **Quality Standards**
- ✅ Full TypeScript autocomplete support
- ✅ Comprehensive JSDoc documentation with validation examples
- ✅ Consistent code style and patterns
- ✅ No linter errors
- ✅ Utility methods for common operations
- ✅ Static metadata for API documentation
- ✅ Flexible type design for user convenience
- ✅ Metadata constants for validation
- ✅ Beginner-friendly approach
- ✅ 🚨 NEVER hardcoded metadata - always use generated data
- ✅ Comprehensive metadata constants from generated files
- ✅ Derived metadata builders for complex data structures

### **Next Steps**
Continue with the remaining 8 modules following the established pattern. Each module should be self-contained, well-documented, and provide a clean API surface for developers using the TfL API wrapper.