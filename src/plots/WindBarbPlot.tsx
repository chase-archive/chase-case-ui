import { Layer, Source, useMap } from 'react-map-gl/maplibre';
import { useEffect } from 'react';
import _ from 'lodash';
import { ContourProps } from './types';

function useLoadWindBarbs() {
  const { current: map } = useMap();

  const barbs = _.range(0, 22).map(
    (idx) =>
      `./windbarbs/Symbol_wind_speed_${idx.toString().padStart(2, '0')}.png`
  );
  const wspds = _.range(0, 22).map((idx) => idx * 5);
  const imageIds = wspds.map((wspd) => `wind-barb-${wspd}`);

  useEffect(() => {
    async function loadWindBarbs() {
      const promises = _.zip(barbs, wspds, imageIds).map(
        async ([barb, wspd, imgId]) => {
          if (
            map &&
            !map.hasImage(`wind-barb-${wspd}`) &&
            barb &&
            imgId &&
            wspd !== undefined
          ) {
            const barbImg = await map.loadImage(barb);
            map.addImage(imgId, barbImg.data, { sdf: true });
          }
        }
      );

      await Promise.all(promises);
    }
    loadWindBarbs();
  }, [barbs, imageIds, map, wspds]);

  return { barbs, wspds, imageIds };
}

export default function WindBarbPlot({
  id,
  data,
}: Pick<ContourProps, 'id' | 'data'>) {
  const { imageIds, wspds } = useLoadWindBarbs();

  return (
    <Source id={id} type='geojson' data={data}>
      {_.zip(wspds, imageIds).map(([wspd, imageId], idx) => {
        if (!imageId || wspd === undefined) {
          return null;
        }
        return (
          <Layer
            id={`${id}-${wspd}`}
            key={idx}
            type='symbol'
            filter={['all', ['>=', 'wspd', wspd], ['<', 'wspd', wspd + 5]]}
            layout={{
              'icon-image': imageId,
              'icon-size': wspd === 0 ? 0.12 : 0.2,
              'icon-allow-overlap': false,
              'icon-rotation-alignment': 'map',
              'icon-anchor': 'right',
              'icon-rotate': ['+', ['get', 'wdir'], 180],
              'icon-padding': 1,
            }}
          />
        );
      })}
    </Source>
  );
}
