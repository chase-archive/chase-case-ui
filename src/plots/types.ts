import { FeatureCollection } from 'geojson';

interface ReactMapGlProps {
  beforeId?: string;
}

export interface ContourProps extends ReactMapGlProps {
  id: string;
  data: FeatureCollection;
  levelProp?: string;
}

export interface Colormap {
  levels: number[];
  colors: string[];
}
