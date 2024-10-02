import { Layer, Source } from 'react-map-gl/maplibre';
import { Colormap, ContourProps } from './types';
import { DataDrivenPropertyValueSpecification } from 'maplibre-gl';

interface FilledContoursProps extends ContourProps {
  cmap: Colormap;
  opacity?: number;
}

export default function FilledContours({
  id,
  data,
  levelProp = 'level',
  cmap,
  opacity = 0.8,
  beforeId,
}: FilledContoursProps) {
  return (
    <Source id={id} type='geojson' data={data}>
      <Layer
        id={`${id}-fill`}
        type='fill'
        paint={{
          'fill-color': toFill(cmap, levelProp),
          'fill-opacity': opacity,
        }}
        beforeId={beforeId}
      />
    </Source>
  );
}

function toFill(
  cmap: Colormap,
  levelProp: string
): DataDrivenPropertyValueSpecification<string> {
  const { colors, levels } = cmap;
  return [
    'interpolate',
    ['linear'],
    ['get', levelProp],
    ...levels.flatMap((level, i) => [level, colors[i] ?? 'rgba(1, 1, 1, 0)']),
  ];
}
