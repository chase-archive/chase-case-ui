import { Layer, Source } from 'react-map-gl/maplibre';
import { ContourProps } from './types';

interface FilledContoursProps extends ContourProps {
  levels: number[];
  colors: string[];
  opacity?: number;
}

export default function FilledContours({
  id,
  data,
  levelProp = 'level',
  levels,
  colors,
  opacity = 0.8,
}: FilledContoursProps) {
  return (
    <Source id={id} type='geojson' data={data}>
      <Layer
        id={`${id}-fill`}
        type='fill'
        paint={{
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', levelProp],
            ...levels.flatMap((level, i) => [
              level,
              colors[i] ?? 'rgba(1, 1, 1, 0)',
            ]),
          ],
          'fill-opacity': opacity,
        }}
      />
    </Source>
  );
}
