import { Barbs, FilledContours, LineContour } from '../plots';
import { isotachs } from '../plots/cmaps';
import { useChaseCaseStore } from '../store';
import { DisplayVar } from '../types';
import { useEnvironmentOverviews } from './api';
import { EnvironmentData } from './types';
import ORDERING from './ordering';
import { layers } from '../layers';
import { Colormap } from '../plots/types';
import { useEnvironmentDataSeries } from './hooks';

interface RenderDisplayProps {
  layerId: string;
  cmap?: Colormap;
  displayVar: DisplayVar;
  environmentData: EnvironmentData;
}

function RenderDisplay({
  layerId,
  cmap,
  displayVar,
  environmentData,
}: RenderDisplayProps) {
  const { data } = environmentData;
  if (data[displayVar] === null) {
    return null;
  }
  if (displayVar === 'barbs') {
    return (
      <Barbs
        id={layerId}
        data={data[displayVar]}
        beforeId={layers.queriedCasesHeatmap}
      />
    );
  }
  if (displayVar === 'isotachs') {
    if (!cmap) {
      return null;
    }
    return (
      <FilledContours
        id={layerId}
        data={data[displayVar]}
        cmap={cmap}
        beforeId={layers.queriedCasesHeatmap}
      />
    );
  }
  if (displayVar === 'height') {
    return (
      <LineContour
        id={layerId}
        data={data[displayVar]}
        beforeId={layers.queriedCasesHeatmap}
      />
    );
  }
}

export default function EnvironmentDisplay() {
  const [
    environmentEventId,
    environmentDisplayVars,
    environmentLevel,
    environmentTimeIndex,
  ] = useChaseCaseStore((state) => [
    state.environmentEventId,
    state.environmentDisplayVars,
    state.environmentLevel,
    state.environmentTimeIndex,
  ]);

  const { data: environmentOverviews } =
    useEnvironmentOverviews(environmentEventId);

  const data = useEnvironmentDataSeries(
    environmentEventId,
    environmentLevel,
    environmentOverviews ?? []
  );

  if (!environmentEventId || !data.length || !data[environmentTimeIndex]) {
    return null;
  }

  const environmentDisplaySorted = [...environmentDisplayVars];
  environmentDisplaySorted.sort((e1, e2) => {
    if (!ORDERING[e1] || !ORDERING[e2]) {
      return 0;
    }
    if (ORDERING[e1] > ORDERING[e2]) {
      return -1;
    } else if (ORDERING[e1] < ORDERING[e2]) {
      return 1;
    }
    return 0;
  });

  return (
    <>
      {environmentDisplaySorted.map((displayVar) => {
        const layerId = `${environmentEventId}-${environmentTimeIndex}-${environmentLevel}-${displayVar}`;
        const cmap =
          displayVar === 'isotachs' ? isotachs[environmentLevel] : undefined;
        return (
          <RenderDisplay
            key={layerId}
            layerId={layerId}
            cmap={cmap ?? undefined}
            displayVar={displayVar}
            environmentData={data[environmentTimeIndex]}
          />
        );
      })}
    </>
  );
}
