// Generated from Tfl API StopPoint data

export type StopPointCategory = 'Accessibility' | 'AirQuality' | 'BikePoint' | 'CarPark' | 'CycleSuperhighway' | 'Disruption' | 'JourneyPlanner' | 'Line' | 'Mode' | 'Place' | 'Route' | 'StopPoint' | 'Train' | 'Tube';

export type StopPointType = 'NaptanMetroStation' | 'NaptanRailStation' | 'NaptanBusCoachStation' | 'NaptanPublicBusCoachTram' | 'NaptanAccessibleArea' | 'NaptanFlexibleZone';

export type ModeName = 'tube' | 'bus' | 'dlr' | 'overground' | 'elizabeth-line' | 'river-bus' | 'cable-car' | 'coach' | 'cycle' | 'cycle-hire' | 'walking' | 'national-rail';

export type TflServiceMode = 'tube' | 'bus' | 'dlr' | 'overground' | 'elizabeth-line' | 'river-bus' | 'cable-car' | 'cycle-hire';

export type FarePayingMode = 'tube' | 'bus' | 'dlr' | 'overground' | 'elizabeth-line' | 'river-bus' | 'cable-car' | 'coach' | 'cycle-hire' | 'national-rail';

export type ScheduledServiceMode = 'tube' | 'bus' | 'dlr' | 'overground' | 'elizabeth-line' | 'river-bus' | 'cable-car' | 'coach' | 'national-rail';

export const modeMetadata = {
  "tube": {
    "isTflService": true,
    "isFarePaying": true,
    "isScheduledService": true
  },
  "bus": {
    "isTflService": true,
    "isFarePaying": true,
    "isScheduledService": true
  },
  "dlr": {
    "isTflService": true,
    "isFarePaying": true,
    "isScheduledService": true
  },
  "overground": {
    "isTflService": true,
    "isFarePaying": true,
    "isScheduledService": true
  },
  "elizabeth-line": {
    "isTflService": true,
    "isFarePaying": true,
    "isScheduledService": true
  },
  "river-bus": {
    "isTflService": true,
    "isFarePaying": true,
    "isScheduledService": true
  },
  "cable-car": {
    "isTflService": true,
    "isFarePaying": true,
    "isScheduledService": true
  },
  "coach": {
    "isTflService": false,
    "isFarePaying": true,
    "isScheduledService": true
  },
  "cycle": {
    "isTflService": false,
    "isFarePaying": false,
    "isScheduledService": false
  },
  "cycle-hire": {
    "isTflService": true,
    "isFarePaying": true,
    "isScheduledService": false
  },
  "walking": {
    "isTflService": false,
    "isFarePaying": false,
    "isScheduledService": false
  },
  "national-rail": {
    "isTflService": false,
    "isFarePaying": true,
    "isScheduledService": true
  }
} as const;

export interface ModeInfo {
    isTflService: boolean;
    isFarePaying: boolean;
    isScheduledService: boolean;
}

export type ModeMetadata = {
    [key in ModeName]: ModeInfo;
};