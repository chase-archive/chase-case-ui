import { useEffect, useState } from 'react';
import { EnvironmentData, EnvironmentOverview } from './types';
import { Level } from '../types';
import { useEnvironmentData } from './api';
import { DateTime } from 'luxon';

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
