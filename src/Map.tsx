import MapGL from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { PropsWithChildren } from 'react';
import { layers } from './layers';
import _ from 'lodash';
import { useChaseCaseStore } from './store';

export default function Map({ children }: PropsWithChildren) {
  const [queriedCases, setHighlightedCases] = useChaseCaseStore((state) => [
    state.queriedCases,
    state.setHighlightedCases,
  ]);
  return (
    <MapGL
      initialViewState={{
        longitude: -98.5556,
        latitude: 39.8097,
        zoom: 4,
      }}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
      }}
      // onRender={(event) => event.target.resize()}
      minZoom={4}
      maxZoom={10}
      touchPitch={false}
      mapStyle='https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
      interactiveLayerIds={[
        layers.queriedCasesHeatmap,
        layers.queriedCasesPoints,
      ]}
      onClick={({ lngLat, features }) => {
        const cases: string[] = (features ?? [])
          .map((feat) => {
            const { properties } = feat;
            const { lng: lon, lat } = lngLat || {};
            if (!lon || isNaN(lon) || !lat || isNaN(lat)) {
              return null;
            }
            return properties.id;
          })
          .filter((chaseCase) => !!chaseCase) as string[];

        // remove dups - point and cluster cases will be duplicated
        const casesFiltered = _.uniq(cases);

        // we only want to replace view of highlighted reports
        // if there are any
        if (casesFiltered.length) {
          setHighlightedCases(
            queriedCases.filter((item) => casesFiltered.includes(item.id))
          );
        }
      }}
    >
      {children}
    </MapGL>
  );
}
