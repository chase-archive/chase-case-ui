import { Layer, LayerProps } from 'react-map-gl';
import { transitionIn as generateTransitionIn } from '../utils/mapbox';
import { LayerDisplayProps } from './types';

export function HighlightedPoints({
  sourceId,
  layerId,
  transitionIn,
  beforeId,
  color,
  radius,
}: LayerDisplayProps & {
  transitionIn: [number, number];
  beforeId?: string;
  color: string;
  radius: number;
}) {
  const [startZoom, endZoom] = transitionIn;
  const layerProps: LayerProps = {
    id: layerId,
    type: 'circle',
    minzoom: startZoom,
    source: sourceId,
    paint: {
      'circle-color': color,
      'circle-radius': radius,
      'circle-opacity': generateTransitionIn(startZoom, endZoom),
      'circle-blur': 1,
    } as object,
  };
  return <Layer {...layerProps} beforeId={beforeId} />;
}
