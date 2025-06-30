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


#### **Module Status (14 total)**

| API wrapper file | description | jsdoc file used |
| `accidentStats.ts` ✅ | Accident statistics | AccidentStats.ts |
| `airQuality.ts` ✅ | Air quality data and forecasts | AirQuality.ts |
| `bikePoint.ts` ✅ | Bike point information and search | BikePoint.ts |
| `cabwise.ts` ✅ | Taxi/minicab search | Cabwise.ts |
| `journey.ts` 🔄 | Journey planning and routing | Journey.ts |
| `line.ts` ✅ | Line status, routes, disruptions | Line.ts |
| `mode.ts` 🔄 | Transport modes and categories | Mode.ts |
| `occupancy.ts` 🔄 | Occupancy data and predictions | Occupancy.ts |
| `place.ts` 🔄 | Place information and search | Place.ts |
| `road.ts` 🔄 | Road status and disruptions | Road.ts |
| `search.ts` 🔄 | General search functionality | Search.ts |
| `stopPoint.ts` ✅ | Stop information, arrivals, search | StopPoint.ts |
| `travelTimes.ts` 🔄 | Travel time calculations | TravelTimes.ts |
| `vehicle.ts` 🔄 | Vehicle information and tracking | Vehicle.ts |

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
├── line.ts             # ✅ Complete
├── stopPoint.ts        # ✅ Complete
├── accidentStats.ts    # ✅ Complete
├── airQuality.ts       # ✅ Complete
├── bikePoint.ts        # ✅ Complete
├── cabwise.ts          # ✅ Complete
├── journey.ts          # 🔄 In Progress
├── mode.ts             # 🔄 In Progress
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