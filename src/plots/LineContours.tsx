import { Layer } from 'react-map-gl/maplibre';
import { ContourProps } from './types';
import { useMemo } from 'react';

interface LineContoursProps extends ContourProps {
  color?: string;
  width?: number;
  labels?: boolean;
}

export default function LineContours({
  id,
  levelProp = 'level',
  color = '#000000',
  width = 1.5,
  labels = true,
  beforeId,
  hide,
}: LineContoursProps) {
  const visibilityLayout = useMemo(
    () => ({ visibility: hide ? 'none' : 'visible' }),
    [hide]
  );

  return (
    <>
      <Layer
        id={`${id}-line`}
        type='line'
        paint={{
          'line-color': color,
          'line-width': width,
        }}
        source={id}
        layout={visibilityLayout as object}
      />
      {labels && (
        <Layer
          id={`${id}-label`}
          source={id}
          type='symbol'
          layout={
            {
              'text-field': ['get', levelProp],
              'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
              'text-size': 12,
              'symbol-placement': 'line-center',
              // 'symbol-spacing': 1000,
              'symbol-avoid-edges': true,
              'icon-allow-overlap': true,
              'icon-ignore-placement': true,
              // 'icon-overlap': 'cooperative',
              // 'icon-ignore-placement': true,
              'text-padding': 1,
              ...visibilityLayout,
            } as object
          }
          paint={{
            'text-color': color,
            'text-halo-color': 'rgba(255, 255, 255, 0.8)',
            'text-halo-width': 10,
          }}
          beforeId={beforeId}
        />
      )}
    </>
  );
}
