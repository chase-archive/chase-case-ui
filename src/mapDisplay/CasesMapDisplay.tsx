import { Source } from 'react-map-gl';
import toGeojson from '../utils/geojson';
import CasesHeatmap from './CasesHeatmap';
import CasesPoints from './CasesPoints';
import { sources, layers } from '../layers';
import { rgba, transition } from '../utils/mapbox';
import { ChaseCase, HasLocation } from '../types';

import { PropsWithChildren } from 'react';
import { useChaseCaseStore } from '../store';

interface CasesSourceProps<T extends HasLocation> extends PropsWithChildren {
  id: string;
  cases: T[];
}

function CasesSource({ id, cases, children }: CasesSourceProps<ChaseCase>) {
  return (
    <Source id={id} type='geojson' data={toGeojson(cases)}>
      {children}
    </Source>
  );
}

export default function CasesMapDisplay() {
  const [highlightedCases, selectedCases] = useChaseCaseStore((state) => [
    state.highlightedCases,
    state.selectedCases,
  ]);

  return (
    <>
      <CasesSource id={sources.selectedCases} cases={selectedCases} />
      <CasesSource id={sources.highlightedCases} cases={highlightedCases} />
      <CasesHeatmap
        layerId={layers.selectedCasesHeatmap}
        sourceId={sources.selectedCases}
        transitionOut={[8, 8.5]}
      />
      <CasesPoints
        layerId={layers.selectedCasesPoints}
        sourceId={sources.selectedCases}
        color='red'
        strokeWidth={1}
        radius={6}
        transitionIn={[8, 8.5]}
      />
      <CasesPoints
        layerId={layers.highlightedCasesPoints}
        sourceId={sources.highlightedCases}
        color={rgba(1, 1, 1, 0)}
        strokeColor='yellow'
        strokeWidth={transition([7.5, 8.5], [2, 4])}
        radius={transition([5, 8.5], [3, 6])}
        transitionIn={[3, 4]}
      />
    </>
  );
}