interface ReactMapGlProps {
  beforeId?: string;
}

export interface ContourProps extends ReactMapGlProps {
  id: string;
  levelProp?: string;
  hide?: boolean;
}

export interface Colormap {
  levels: number[];
  colors: string[];
}
