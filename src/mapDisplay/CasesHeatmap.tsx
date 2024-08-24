import { Layer, LayerProps } from 'react-map-gl/maplibre';
import {
  scale,
  rgb,
  rgba,
  transition,
  transitionOut as generateTransitionOut,
} from '../utils/mapbox';

interface CasesHeatmapProps {
  layerId: string;
  sourceId: string;
  transitionOut: [number, number];
}

export default function CasesHeatmap({
  layerId,
  sourceId,
  transitionOut,
}: CasesHeatmapProps) {
  const [startZoom, endZoom] = transitionOut;
  const layerProps: LayerProps = {
    id: layerId,
    type: 'heatmap',
    source: sourceId,
    maxzoom: endZoom,
    paint: {
      'heatmap-intensity': transition([4, 8], [1, 3]),
      'heatmap-radius': transition([4, 7.5, 8], [20, 15, 10]),
      'heatmap-opacity': generateTransitionOut(startZoom, endZoom),

      // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
      // Begin color ramp at 0-stop with a 0-transparancy color
      // to create a blur-like effect.
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        rgba(33, 102, 172, 0),
        ...scale(
          [
            rgb(103, 169, 207),
            rgb(209, 229, 240),
            rgb(253, 219, 199),
            rgb(239, 138, 98),
            rgb(178, 24, 43),
          ],
          0.15,
          0.9
        ),
      ],
    } as object,
  };
  return <Layer {...layerProps} />;
}
