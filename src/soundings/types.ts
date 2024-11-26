import { Profile } from 'upperair';

export interface Sounding {
  lat: number;
  lon: number;
  timestamp: string;
  data: Profile;
}
