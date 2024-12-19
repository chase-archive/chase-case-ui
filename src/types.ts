export interface HasLocation {
  lat: number;
  lon: number;
  event_name: string;
  country: string;
}

export interface HasTime {
  time_start: string;
  time_end: string | null;
}

export interface HasTags {
  tags: string[];
}

export interface ChaseCase extends HasLocation, HasTime, HasTags {
  id: string;
  photo_video: string[];
}
