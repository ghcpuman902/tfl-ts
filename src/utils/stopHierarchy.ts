import { normalizeLineId } from './ui';
import type { StationHubInfo } from '../generated/meta/StationHubs';

/**
 * StopPoint id that actually carries arrivals for `lineId` at this hub.
 * Returns `undefined` when the line is not in `lineMemberIds` — the hub id
 * itself is not a fallback because TfL's Arrivals endpoint returns an empty
 * array when polled at the interchange id rather than a specific platform.
 * Third-party National Rail operators (for example `southeastern`,
 * `south-western-railway`) can be mapped here for topology but never return
 * live predictions; TfL's Arrivals API only covers tube, DLR, tram,
 * Overground, and Elizabeth line.
 */
export const resolveArrivalsStopId = (
  hub: StationHubInfo,
  lineId: string
): string | undefined => {
  const normalized = normalizeLineId(lineId);
  return hub.lineMemberIds[normalized] ?? hub.lineMemberIds[lineId];
};

/**
 * Unique StopPoint ids to poll for arrivals at a hub.
 * When `lineIds` is omitted, every mapped line member is returned.
 */
export const resolveArrivalsStopIds = (
  hub: StationHubInfo,
  lineIds?: readonly string[]
): string[] => {
  if (lineIds?.length) {
    const ids = new Set<string>();
    for (const lineId of lineIds) {
      const id = resolveArrivalsStopId(hub, lineId);
      if (id) ids.add(id);
    }
    return [...ids];
  }

  const fromLines = Object.values(hub.lineMemberIds);
  if (fromLines.length > 0) {
    return [...new Set(fromLines)];
  }
  // No per-line mapping at all: poll every member id rather than the hub id,
  // which reliably returns zero arrivals when queried directly.
  return hub.members.map((member) => member.id);
};
