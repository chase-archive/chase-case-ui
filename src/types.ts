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
  magnitude: string | null;
  features: string[];
  records: string[];
  nickname: string | null;
  outbreak: string | null;
  notes: string[];
  user_comments: string[];
  photo_video: string[];
  account_summary: string | null;
}
