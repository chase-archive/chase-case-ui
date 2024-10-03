import { Slider } from '@mantine/core';
import { useChaseCaseStore } from '../store';
import { useEnvironmentOverviews } from './api';
import styles from './Environment.module.css';
import { DateTime } from 'luxon';

export default function EnvironmentTimeSlider() {
  const [environmentEventId, setEnvironmentTimeIndex] = useChaseCaseStore(
    (state) => [state.environmentEventId, state.setEnvironmentTimeIndex]
  );

  const { data: environmentOverviews } =
    useEnvironmentOverviews(environmentEventId);

  if (!environmentOverviews) {
    return null;
  }

  const getTimestamp = (value: number) => {
    const timestamp = DateTime.fromISO(environmentOverviews[value].timestamp);
    return timestamp.toFormat('yyyy-MM-dd HH') + 'Z';
  };

  return (
    <Slider
      className={styles.environmentTimeSlider}
      color='blue'
      marks={environmentOverviews.map((_overview, i) => ({
        value: i,
      }))}
      labelAlwaysOn
      label={(value) => getTimestamp(value)}
      onChange={setEnvironmentTimeIndex}
      min={0}
      max={environmentOverviews.length - 1}
      step={1}
      size='xl'
    />
  );
}
