import { useDebouncedValue } from '@mantine/hooks';
import { useChaseCaseStore } from '../store';
import { useEffect, useState } from 'react';
import { CloseButton, Loader, TextInput } from '@mantine/core';
import { MdSearch } from 'react-icons/md';
import { useCases } from '../hooks';
import styles from './QueryCases.module.css';

const DEBOUNCE_TIME = 300;

export function SearchBar() {
  const setSearchQuery = useChaseCaseStore((state) => state.setSearchQuery);
  const [value, setValue] = useState('');
  const [query] = useDebouncedValue(value, DEBOUNCE_TIME);

  useEffect(() => {
    setSearchQuery(query);
  }, [setSearchQuery, query]);

  const { isLoading } = useCases();

  return (
    <TextInput
      className={styles.searchBar}
      placeholder='Enter a town, year, date, or keyword'
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      rightSectionWidth={value ? 55 : 30}
      rightSection={
        isLoading ? (
          <Loader size={18} />
        ) : (
          <>
            {value && (
              <CloseButton
                size={20}
                onClick={() => {
                  setValue('');
                }}
                mr={5}
                variant='transparent'
              />
            )}
            <MdSearch size={20} />
          </>
        )
      }
    />
  );
}
