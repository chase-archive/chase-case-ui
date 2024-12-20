import { Layer, LayerProps } from 'react-map-gl/maplibre';
import {
  scale,
  rgba,
  transition,
  transitionOut as generateTransitionOut,
} from '../utils/mapbox';
import { LayerDisplayProps } from './types';

export default function CasesHeatmap({
  layerId,
  sourceId,
  transitionOut,
}: LayerDisplayProps & { transitionOut: [number, number] }) {
  const [startZoom, endZoom] = transitionOut;
  const layerProps: LayerProps = {
    id: layerId,
    type: 'heatmap',
    source: sourceId,
    maxzoom: endZoom,
    paint: {
      'heatmap-intensity': transition([4, 8], [1, 3]),
      'heatmap-radius': transition([7.5, 8], [35, 30]),
      'heatmap-opacity': generateTransitionOut(startZoom, endZoom),

      // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
      // Begin color ramp at 0-stop with a 0-transparancy color
      // to create a blur-like effect.
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        rgba(255, 255, 0, 0),
        ...scale(
          [
            rgba(255, 255, 0, 0.15), // Light Yellow (low intensity)
            rgba(255, 204, 0, 0.4), // Yellow-Orange (medium-low intensity)
            rgba(255, 153, 0, 0.65), // Deep Orange (medium intensity)
            rgba(255, 102, 0, 0.7), // Reddish Orange (high intensity)
            rgba(255, 50, 0, 0.75),
            rgba(255, 0, 0, 0.8), // Red (maximum intensity)
          ],
          0.15,
          0.9
        ),
      ],
    } as object,
  };
  return <Layer {...layerProps} />;
}
