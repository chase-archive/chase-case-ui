import { Layer, LayerProps } from 'react-map-gl/maplibre';
import {
  transitionIn as generateTransitionIn,
  transition,
} from '../utils/mapbox';
import { LayerDisplayProps } from './types';

interface CasesPointsProps extends LayerDisplayProps {
  color: string;
  strokeWidth: number | ReturnType<typeof transition>;
  strokeColor?: string;
  radius: number | ReturnType<typeof transition>;
  transitionIn: [number, number];
}

export function CasesPoints({
  layerId,
  sourceId,
  color,
  strokeWidth,
  strokeColor,
  radius,
  transitionIn,
}: CasesPointsProps) {
  const [startZoom, endZoom] = transitionIn;
  const layerProps: LayerProps = {
    id: layerId,
    type: 'circle',
    minzoom: startZoom,
    source: sourceId,
    paint: {
      'circle-color': color,
      'circle-stroke-color': strokeColor || 'white',
      'circle-stroke-width': strokeWidth,
      'circle-radius': radius,
      'circle-opacity': generateTransitionIn(startZoom, endZoom),
    } as object,
  };
  return <Layer {...layerProps} />;
}
