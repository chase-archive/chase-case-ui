import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Select } from '@mantine/core';
import { useGetCasesByYear } from '../api';
import { useChaseCaseStore } from '../store';
import styles from './QueryCases.module.css';
import { OnSelectOptionProps } from './types';

export default function YearSelector({ onSelectOption }: OnSelectOptionProps) {
  const savedYearQuery = useChaseCaseStore((state) => state.savedYearQuery);
  const [year, setYear] = useState<number | null>(savedYearQuery ?? null);
  const yearOptions = _.rangeRight(1970, DateTime.now().year + 1).map((year) =>
    year.toString()
  );

  const { data } = useGetCasesByYear(year);
  const [
    setQueriedCases,
    setHighlightedCases,
    setSavedYearQuery,
    savedSearchQuery,
  ] = useChaseCaseStore((state) => [
    state.setQueriedCases,
    state.setHighlightedCases,
    state.setSavedYearQuery,
    state.savedSearchQuery,
  ]);

  useEffect(() => {
    if (data) {
      setQueriedCases(data);
      setHighlightedCases([]);
      setSavedYearQuery(year);
    }
  }, [data, setHighlightedCases, setQueriedCases, setSavedYearQuery, year]);

  useEffect(() => {
    if (savedSearchQuery !== null) {
      setYear(null);
    }
  }, [savedSearchQuery]);

  return (
    <Select
      className={styles.yearSelector}
      data={yearOptions}
      value={year?.toString() ?? null}
      onChange={(value) => {
        setYear(Number(value));
        if (value && onSelectOption) {
          onSelectOption();
        }
      }}
      searchable
      placeholder='--'
      clearable
    />
  );
}
