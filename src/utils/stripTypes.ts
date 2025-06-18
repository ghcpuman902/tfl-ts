/**
 * Utility function to strip $type fields from objects and handle empty objects
 * @param obj - The object to process
 * @param keepTflTypes - Whether to keep $type fields
 * @returns The processed object with $type fields removed (unless keepTflTypes is true)
 */
export const stripTypeFields = (obj: any, keepTflTypes: boolean = false): any => {
  if (!obj) return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(item => stripTypeFields(item, keepTflTypes));
  }
  
  if (typeof obj === 'object') {
    // Handle empty objects with $type
    if (Object.keys(obj).length === 1 && obj.$type) {
      return 'Unknown';
    }

    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key === '$type' && !keepTflTypes) continue;
      result[key] = stripTypeFields(value, keepTflTypes);
    }
    return result;
  }
  
  return obj;
}; 