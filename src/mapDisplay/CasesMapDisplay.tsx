import { Source } from 'react-map-gl';
import toGeojson from '../utils/geojson';
import CasesHeatmap from './CasesHeatmap';
import CasesPoints from './CasesPoints';
import { sources, layers } from '../layers';
import { ChaseCase, HasLocation } from '../types';

import { PropsWithChildren } from 'react';
import { useChaseCaseStore } from '../store';
import HighlightedPoints from './HighlightedPoints';

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
  const [highlightedCases, queriedCases] = useChaseCaseStore((state) => [
    state.highlightedCases,
    state.queriedCases,
  ]);

  return (
    <>
      <CasesSource id={sources.queriedCases} cases={queriedCases}>
        <CasesHeatmap
          layerId={layers.queriedCasesHeatmap}
          sourceId={sources.queriedCases}
          transitionOut={[6, 6.5]}
          beforeId={layers.highlightedCasesPoints}
        />
        <CasesPoints
          layerId={layers.queriedCasesPoints}
          sourceId={sources.queriedCases}
          color='red'
          strokeWidth={0}
          radius={6}
          transitionIn={[6, 6.5]}
        />
      </CasesSource>
      <CasesSource id={sources.highlightedCases} cases={highlightedCases}>
        <HighlightedPoints
          layerId={layers.highlightedCasesPoints}
          sourceId={sources.highlightedCases}
          transitionIn={[1, 2]}
          beforeId={layers.queriedCasesPoints}
          color='rgba(128, 0, 255, 0.9)'
          radius={15}
        />
      </CasesSource>
    </>
  );
}
