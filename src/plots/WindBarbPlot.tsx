import { Layer, Source, useMap } from 'react-map-gl/maplibre';
import { useEffect } from 'react';
import _ from 'lodash';
import { ContourProps } from './types';
import { FilterSpecification } from 'maplibre-gl';

function useLoadWindBarbs() {
  const { current: map } = useMap();

  const wspds = _.range(0, 51).map((idx) => idx * 5);
  const barbs = wspds.map((wspd) => `./windbarbs/wind_barb_${wspd}kt.png`);
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
      {_.zip(wspds, wspds.slice(1), imageIds).map(
        ([wspd, nextWspd, imageId], idx) => {
          if (!imageId || wspd === undefined) {
            return null;
          }
          const filter: FilterSpecification = ['all', ['>=', 'wspd', wspd]];
          if (nextWspd !== undefined) {
            filter.push(['<', 'wspd', nextWspd]);
          }
          return (
            <Layer
              id={`${id}-${wspd}`}
              key={idx}
              type='symbol'
              filter={filter}
              layout={{
                'icon-image': imageId,
                'icon-size': 0.25,
                'icon-allow-overlap': false,
                'icon-anchor': 'top-right',
                'icon-rotate': ['-', ['get', 'wdir'], 90],
                'icon-padding': 3,
              }}
            />
          );
        }
      )}
    </Source>
  );
}
