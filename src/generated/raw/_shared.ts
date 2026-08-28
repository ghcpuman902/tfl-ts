// Auto-generated raw TfL API client. Do not edit manually.
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ./generated.meta.json

export const formatPathParam = (value: string | number | boolean | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value.join(',');
  }
  if (value === undefined || value === null) {
    return '';
  }
  return String(value);
};
