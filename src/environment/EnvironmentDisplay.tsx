import { DateTime } from 'luxon';
import { Barbs, FilledContours, LineContour } from '../plots';
import { isotachs } from '../plots/cmaps';
import { useChaseCaseStore } from '../store';
import { DisplayVar, Level } from '../types';
import { useEnvironmentData } from './api';
import { EnvironmentData } from './types';
import ORDERING from './ordering';
import { layers } from '../layers';

interface RenderDisplayProps {
  eventId: string;
  timestamp: DateTime;
  level: Level;
  displayVar: DisplayVar;
  environmentData: EnvironmentData;
}

function RenderDisplay({
  eventId,
  timestamp,
  level,
  displayVar,
  environmentData,
}: RenderDisplayProps) {
  const { data } = environmentData;
  if (data[displayVar] === null) {
    return null;
  }
  const layerId = `${eventId}-${timestamp.toISO()}-${level}-${displayVar}`;
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
    const cmap = isotachs[level];
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
    environmentTimestamp,
    environmentDisplayVars,
    environmentLevel,
  ] = useChaseCaseStore((state) => [
    state.environmentEventId,
    state.environmentTimestamp,
    state.environmentDisplayVars,
    state.environmentLevel,
  ]);

  const { data: environmentData } = useEnvironmentData(
    environmentEventId,
    environmentTimestamp,
    environmentLevel
  );

  if (!environmentEventId || !environmentTimestamp || !environmentData?.data) {
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
      {environmentDisplaySorted.map((displayVar) => (
        <RenderDisplay
          key={`${environmentEventId}-${environmentTimestamp.toISO()}-${environmentLevel}-${displayVar}`}
          eventId={environmentEventId}
          timestamp={environmentTimestamp}
          level={environmentLevel}
          displayVar={displayVar}
          environmentData={environmentData}
        />
      ))}
    </>
  );
}
