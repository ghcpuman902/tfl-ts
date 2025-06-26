// Generated from Tfl API Road data

export type RoadCategory = 'Undefined' | 'RealTime' | 'PlannedWork' | 'Information' | 'Event' | 'Crowding' | 'StatusAlert';

export type roadSeverity =   | { level: 1; description: 'Good Service' }
  | { level: 2; description: 'Minor Delays' }
  | { level: 3; description: 'Severe Delays' }
  | { level: 4; description: 'Part Suspended' }
  | { level: 5; description: 'Suspended' };

export type SeverityDescription = 'Good Service' | 'Minor Delays' | 'Severe Delays' | 'Part Suspended' | 'Suspended';

export const SeverityByMode = {
  "road": "roadSeverity"
} as const;