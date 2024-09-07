import { Layer, Source } from 'react-map-gl/maplibre';
import { ContourProps } from './types';

interface LineContoursProps extends ContourProps {
  color?: string;
  width?: number;
  labels?: boolean;
}

export default function LineContours({
  id,
  data,
  levelProp = 'level',
  color = '#000000',
  width = 1.5,
  labels = false,
}: LineContoursProps) {
  return (
    <Source id={id} type='geojson' data={data}>
      <Layer
        id={`${id}-line`}
        type='line'
        paint={{
          'line-color': color,
          'line-width': width,
        }}
      />
      {labels && (
        <Layer
          id={`${id}-label`}
          type='symbol'
          layout={{
            'text-field': ['get', levelProp],
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-size': 12,
            'symbol-placement': 'line-center',
            // 'symbol-spacing': 1000,
            'symbol-avoid-edges': true,
          }}
          paint={{
            'text-color': color,
            'text-halo-color': 'rgba(255, 255, 255, 0.8)',
            'text-halo-width': 10,
          }}
        />
      )}
    </Source>
  );
}
