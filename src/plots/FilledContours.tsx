import { Layer } from 'react-map-gl/maplibre';
import { Colormap, ContourProps } from './types';
import { DataDrivenPropertyValueSpecification } from 'maplibre-gl';
import { useMemo } from 'react';

interface FilledContoursProps extends ContourProps {
  cmap: Colormap;
  opacity?: number;
}

export default function FilledContours({
  id,
  levelProp = 'level',
  cmap,
  opacity = 0.8,
  beforeId,
  hide,
}: FilledContoursProps) {
  const visibilityLayout = useMemo(
    () => ({ visibility: hide ? 'none' : 'visible' }),
    [hide]
  );
  return (
    <Layer
      id={`${id}-fill`}
      source={id}
      type='fill'
      paint={{
        'fill-color': toFill(cmap, levelProp),
        'fill-opacity': opacity,
      }}
      layout={visibilityLayout as object}
      beforeId={beforeId}
    />
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
