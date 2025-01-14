import { useDebouncedValue } from '@mantine/hooks';
import { useChaseCaseStore } from '../store';
import { HTMLProps, useEffect, useState } from 'react';
import { CloseButton, Loader, TextInput } from '@mantine/core';
import { MdSearch } from 'react-icons/md';
import { useCases } from '../hooks';

const DEBOUNCE_TIME = 300;

export function SearchBar({
  className,
}: Partial<Pick<HTMLProps<HTMLElement>, 'className'>>) {
  const setSearchQuery = useChaseCaseStore((state) => state.setSearchQuery);
  const [value, setValue] = useState('');
  const [query] = useDebouncedValue(value, DEBOUNCE_TIME);

  useEffect(() => {
    setSearchQuery(query);
  }, [setSearchQuery, query]);

  const { isLoading } = useCases();

  return (
    <TextInput
      className={className}
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
