import { Source } from 'react-map-gl';
import toGeojson from '../utils/geojson';
import CasesHeatmap from './CasesHeatmap';
import CasesPoints from './CasesPoints';
import { sources, layers } from '../layers';
import { ChaseCase, HasLocation } from '../types';
import { PropsWithChildren } from 'react';
import HighlightedPoints from './HighlightedPoints';
import { useCases } from '../hooks';

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
  const { queriedCases, highlightedCase } = useCases();

  return (
    <>
      <CasesSource
        id={sources.highlightedCases}
        cases={highlightedCase ? [highlightedCase] : []}
      />
      <CasesSource id={sources.queriedCases} cases={queriedCases} />
      <CasesHeatmap
        layerId={layers.queriedCasesHeatmap}
        sourceId={sources.queriedCases}
        transitionOut={[5, 6]}
        beforeId={layers.highlightedCasesPoints}
      />
      <CasesPoints
        layerId={layers.queriedCasesPoints}
        sourceId={sources.queriedCases}
        color='red'
        strokeWidth={0}
        radius={6}
        transitionIn={[5, 6]}
      />
      <HighlightedPoints
        layerId={layers.highlightedCasesPoints}
        sourceId={sources.highlightedCases}
        transitionIn={[1, 2]}
        beforeId={layers.queriedCasesPoints}
        color='rgba(128, 0, 255, 0.9)'
        radius={15}
      />
    </>
  );
}
