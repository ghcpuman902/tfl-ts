/**
 * IDE autocomplete helpers for public wrapper inputs.
 *
 * TypeScript/VS Code only suggest string literals from union types — plain
 * `string` / `string[]` never complete, and JSDoc `@example` is hover-only.
 * `AutocompleteString<T>` keeps IntelliSense for known values while still
 * accepting any string (open enums, bus route numbers, future TfL IDs).
 */

type LinesList = (typeof import('../generated/meta/Line').Lines);
type ModesList = (typeof import('../generated/meta/Meta').Modes);
type ServiceTypesList = (typeof import('../generated/meta/Meta').ServiceTypes);

/** Suggests `T` literals; still accepts any string at the type level. */
export type AutocompleteString<T extends string> = T | (string & {});

export type ModeName = ModesList[number]['modeName'];
export type ServiceType = ServiceTypesList[number];
export type TflLineId = LinesList[number]['id'];

/**
 * Slug-style line IDs for IntelliSense (tube, DLR, rail, river, …).
 * Excludes numeric bus route IDs so completion lists stay usable; bus
 * routes remain valid via {@link AutocompleteString}.
 */
export type NamedLineId = Extract<
  LinesList[number],
  { modeName: Exclude<ModeName, 'bus'> }
>['id'];

export type ModeInput = AutocompleteString<ModeName>;
export type ServiceTypeInput = AutocompleteString<ServiceType>;
/** Accepts any line id; IDE suggests named (non-bus) lines. */
export type LineIdInput = AutocompleteString<NamedLineId>;
