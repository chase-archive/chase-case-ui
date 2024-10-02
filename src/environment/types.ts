import { FeatureCollection } from 'geojson';
import { DisplayVar, Level } from '../types';

export interface EnvironmentData {
  event_id: string;
  timestamp: string;
  level: Level;
  data: {
    height: FeatureCollection | null;
    temperature: FeatureCollection | null;
    dewpoint: FeatureCollection | null;
    vorticity: FeatureCollection | null;
    rh: FeatureCollection | null;
    barbs: FeatureCollection | null;
    isotachs: FeatureCollection | null;
    mslp: FeatureCollection | null;
  };
}

export interface EnvironmentOverview {
  timestamp: string;
  available_data: Record<string, DisplayVar[]>;
}
