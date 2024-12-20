import { Layer, LayerProps } from 'react-map-gl';
import { transitionIn as generateTransitionIn } from '../utils/mapbox';
import { LayerDisplayProps } from './types';

export default function HighlightedPoints({
  sourceId,
  layerId,
  transitionIn,
  beforeId,
  color,
}: LayerDisplayProps & {
  transitionIn: [number, number];
  beforeId?: string;
  color: string;
}) {
  const [startZoom, endZoom] = transitionIn;
  const layerProps: LayerProps = {
    id: layerId,
    type: 'circle',
    minzoom: startZoom,
    source: sourceId,
    paint: {
      'circle-color': color,
      'circle-radius': 25,
      'circle-opacity': generateTransitionIn(startZoom, endZoom),
      'circle-blur': 0.8,
    } as object,
  };
  return <Layer {...layerProps} beforeId={beforeId} />;
}
