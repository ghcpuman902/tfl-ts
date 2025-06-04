// Generated from TfL API Mode data
export type ModeName = 'bus' | 'cable-car' | 'coach' | 'cycle' | 'cycle-hire' | 'dlr' | 'elizabeth-line' | 'interchange-keep-sitting' | 'interchange-secure' | 'national-rail' | 'overground' | 'replacement-bus' | 'river-bus' | 'river-tour' | 'taxi' | 'tram' | 'tube' | 'walking';

export type TflServiceMode = 'bus' | 'cable-car' | 'cycle-hire' | 'dlr' | 'elizabeth-line' | 'overground' | 'replacement-bus' | 'river-bus' | 'river-tour' | 'tram' | 'tube';

export type FarePayingMode = 'bus' | 'cable-car' | 'coach' | 'cycle-hire' | 'dlr' | 'elizabeth-line' | 'national-rail' | 'overground' | 'replacement-bus' | 'river-bus' | 'river-tour' | 'tram' | 'tube';

export type ScheduledServiceMode = 'bus' | 'cable-car' | 'coach' | 'dlr' | 'elizabeth-line' | 'national-rail' | 'overground' | 'replacement-bus' | 'river-bus' | 'river-tour' | 'tram' | 'tube';

export interface ModeInfo {
    isTflService: boolean;
    isFarePaying: boolean;
    isScheduledService: boolean;
}

export type ModeMetadata = {
    [key in ModeName]: ModeInfo;
};

export const modeMetadata = {
    'bus': {
        isTflService: true,
        isFarePaying: true,
        isScheduledService: true
    },
    'cable-car': {
        isTflService: true,
        isFarePaying: true,
        isScheduledService: true
    },
    'coach': {
        isTflService: false,
        isFarePaying: true,
        isScheduledService: true
    },
    'cycle': {
        isTflService: false,
        isFarePaying: false,
        isScheduledService: false
    },
    'cycle-hire': {
        isTflService: true,
        isFarePaying: true,
        isScheduledService: false
    },
    'dlr': {
        isTflService: true,
        isFarePaying: true,
        isScheduledService: true
    },
    'elizabeth-line': {
        isTflService: true,
        isFarePaying: true,
        isScheduledService: true
    },
    'interchange-keep-sitting': {
        isTflService: false,
        isFarePaying: false,
        isScheduledService: false
    },
    'interchange-secure': {
        isTflService: false,
        isFarePaying: false,
        isScheduledService: false
    },
    'national-rail': {
        isTflService: false,
        isFarePaying: true,
        isScheduledService: true
    },
    'overground': {
        isTflService: true,
        isFarePaying: true,
        isScheduledService: true
    },
    'replacement-bus': {
        isTflService: true,
        isFarePaying: true,
        isScheduledService: true
    },
    'river-bus': {
        isTflService: true,
        isFarePaying: true,
        isScheduledService: true
    },
    'river-tour': {
        isTflService: true,
        isFarePaying: true,
        isScheduledService: true
    },
    'taxi': {
        isTflService: false,
        isFarePaying: false,
        isScheduledService: false
    },
    'tram': {
        isTflService: true,
        isFarePaying: true,
        isScheduledService: true
    },
    'tube': {
        isTflService: true,
        isFarePaying: true,
        isScheduledService: true
    },
    'walking': {
        isTflService: false,
        isFarePaying: false,
        isScheduledService: false
    }
};