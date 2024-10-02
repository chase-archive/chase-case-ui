import { DateTime } from 'luxon';
import { useChaseCaseStore } from '../store';
import { useEnvironmentOverviews } from './api';
import { useEffect } from 'react';

export default function EnvironmentToggle() {
  const [
    environmentEventId,
    setEnvironmentTimestamp,
    setEnvironmentDisplayVars,
    environmentLevel,
  ] = useChaseCaseStore((state) => [
    state.environmentEventId,
    state.setEnvironmentTimestamp,
    state.setEnvironmentDisplayVars,
    state.environmentLevel,
  ]);

  const { data: environmentOverviews } =
    useEnvironmentOverviews(environmentEventId);

  useEffect(() => {
    if (environmentOverviews && environmentOverviews.length > 0) {
      const firstEnvOverview = environmentOverviews[0];
      const { timestamp, available_data } = firstEnvOverview;
      const timestampISO = DateTime.fromISO(timestamp, { zone: 'utc' });

      const availableDataForLevel = available_data[environmentLevel.toString()];
      if (
        availableDataForLevel.includes('height') &&
        availableDataForLevel.includes('isotachs') &&
        availableDataForLevel.includes('barbs')
      ) {
        setEnvironmentTimestamp(timestampISO);
        setEnvironmentDisplayVars(['height', 'isotachs', 'barbs']);
      }
    }
  }, [
    environmentLevel,
    environmentOverviews,
    setEnvironmentDisplayVars,
    setEnvironmentTimestamp,
  ]);

  return <></>;
}
