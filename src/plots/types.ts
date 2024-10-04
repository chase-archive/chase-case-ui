import { FeatureCollection } from 'geojson';

interface ReactMapGlProps {
  beforeId?: string;
}

export interface ContourProps extends ReactMapGlProps {
  id: string;
  data: FeatureCollection;
  levelProp?: string;
  hide?: boolean;
}

export interface Colormap {
  levels: number[];
  colors: string[];
}
