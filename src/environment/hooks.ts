import { useEffect, useState } from 'react';
import { EnvironmentData, EnvironmentOverview } from './types';
import { Level } from '../types';
import { useEnvironmentData, useEnvironmentOverviews } from './api';
import { DateTime } from 'luxon';
import { useChaseCaseStore } from '../store';
import ORDERING from './ordering';
import { useShallow } from 'zustand/react/shallow';

export function useEnvironmentDataSeries(
  caseId: string | null,
  level: Level,
  overviews: EnvironmentOverview[],
  simultaneous: number = 3
) {
  const [index, setIndex] = useState(0);
  const overviewSlice = overviews.slice(index, index + simultaneous);
  const [allEnvironmentData, setAllEnvironmentData] = useState<
    EnvironmentData[]
  >([]);

  const result = useEnvironmentData(
    caseId,
    overviewSlice.map((o) => DateTime.fromISO(o.timestamp)),
    level
  );

  useEffect(() => {
    if (result.data && !result.isFetching) {
      if (index + simultaneous < overviews.length) {
        setIndex((i) => i + simultaneous);
      }
      setAllEnvironmentData((prev) => [...prev, ...result.data]);
    }
  }, [index, overviews.length, result.data, result.isFetching, simultaneous]);

  useEffect(() => {
    setIndex(0);
    setAllEnvironmentData([]);
  }, [caseId]);

  return allEnvironmentData;
}

export function useEnvironmentLayerDefs() {
  const [environmentEventId, environmentDisplayVars, environmentLevel] =
    useChaseCaseStore(
      useShallow((state) => [
        state.environmentEventId,
        state.environmentDisplayVars,
        state.environmentLevel,
      ])
    );

  const { data: environmentOverviews } =
    useEnvironmentOverviews(environmentEventId);

  const data = useEnvironmentDataSeries(
    environmentEventId,
    environmentLevel,
    environmentOverviews ?? []
  );

  if (!environmentEventId || !data.length) {
    return [];
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

  return data.flatMap((dataSlice, idx) => {
    return environmentDisplaySorted
      .map((displayVar) => {
        if (!dataSlice.data[displayVar]) {
          return null;
        }
        return {
          id: `${environmentEventId}-${environmentLevel}-${displayVar}-${idx}`,
          data: dataSlice.data[displayVar],
          displayVar,
          level: environmentLevel,
          timeIndex: idx,
        };
      })
      .filter((d) => d !== null);
  });
}
