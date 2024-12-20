import MapGL from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { PropsWithChildren, useState } from 'react';
import { layers } from './layers';
import _ from 'lodash';
import { useChaseCaseStore } from './store';

const INITIAL_VIEW_STATE = {
  longitude: -98.5556,
  latitude: 39.8097,
  zoom: 4,
};

export default function Map({ children }: PropsWithChildren) {
  const [queriedCases, setHighlightedCases] = useChaseCaseStore((state) => [
    state.queriedCases,
    state.setHighlightedCases,
  ]);

  const [hoveredFeature, setHoveredFeature] = useState<string | number | null>(
    null
  );

  return (
    <MapGL
      initialViewState={INITIAL_VIEW_STATE}
      style={{
        position: 'absolute',
        width: '100svw',
        height: '100svh',
        left: 0,
        top: 0,
      }}
      // onRender={(event) => event.target.resize()}
      minZoom={2.5}
      maxZoom={10}
      touchPitch={false}
      mapStyle='https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
      interactiveLayerIds={[
        layers.queriedCasesHeatmap,
        layers.queriedCasesPoints,
      ]}
      onMouseEnter={({ features }) => {
        if (features) {
          const { properties } = features[0] ?? {};
          if (properties) {
            setHoveredFeature(properties.id);
          }
        }
      }}
      onMouseLeave={() => {
        setHoveredFeature(null);
      }}
      cursor={hoveredFeature ? 'pointer' : 'grab'}
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
