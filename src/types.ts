export interface HasLocation {
  lat: number;
  lon: number;
  location: string;
  country: string;
}

export interface HasTime {
  timestamp: string;
}

export interface HasTags {
  tags: string[];
}

export interface ChaseCase extends HasLocation, HasTime, HasTags {
  id: string;
  documentation: string[];
}

export type Level = number | 'sfc';

export type DisplayVar =
  | 'height'
  | 'temperature'
  | 'dewpoint'
  | 'vorticity'
  | 'rh'
  | 'barbs'
  | 'isotachs'
  | 'mslp';
