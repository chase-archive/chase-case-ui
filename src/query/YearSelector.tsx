import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Select } from '@mantine/core';
import { useGetCasesByYear } from '../api';
import { useChaseCaseStore } from '../store';
import styles from './QueryCases.module.css';

export default function YearSelector() {
  const currentDateTime = DateTime.now();
  const [year, setYear] = useState(
    currentDateTime.month < 4 ? currentDateTime.year - 1 : currentDateTime.year
  );
  const yearOptions = _.rangeRight(2000, currentDateTime.year + 1).map((year) =>
    year.toString()
  );

  const { data } = useGetCasesByYear(year);
  const [setQueriedCases, setHighlightedCases] = useChaseCaseStore((state) => [
    state.setQueriedCases,
    state.setHighlightedCases,
  ]);

  useEffect(() => {
    if (data) {
      setQueriedCases(data);
      setHighlightedCases([]);
    }
  }, [data, setHighlightedCases, setQueriedCases]);

  return (
    <Select
      className={styles.yearSelector}
      data={yearOptions}
      value={year.toString()}
      onChange={(_value, option) => setYear(Number(option.value))}
    />
  );
}
