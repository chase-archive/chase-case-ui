import { FeatureCollection } from 'geojson';

export interface ContourProps {
  id: string;
  data: FeatureCollection;
  levelProp?: string;
}

export interface Colormap {
  levels: number[];
  colors: string[];
}
