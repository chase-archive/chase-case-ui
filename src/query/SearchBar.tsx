import {
  CloseButton,
  Combobox,
  Flex,
  Loader,
  Text,
  TextInput,
  useCombobox,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useSearchCases } from '../api';
import { ChaseCase } from '../types';
import { MdSearch } from 'react-icons/md';
import { useChaseCaseStore } from '../store';
import { DateTime } from 'luxon';
import styles from './QueryCases.module.css';
import { useMap } from 'react-map-gl';
import { useEffect, useState } from 'react';
import { OnSelectOptionProps } from './types';

const EVENT_TYPES = {
  tornado: 'red',
  hail: 'green',
  derecho: 'blue',
  haboob: 'orange',
  structure: 'purple',
};

function getEventCard(tags: string[]) {
  for (const [eventType, eventColor] of Object.entries(EVENT_TYPES)) {
    if (tags.includes(eventType)) {
      return {
        color: eventColor,
        value: eventType,
      };
    }
  }
  return {
    color: 'gray',
    value: 'other',
  };
}

function SearchEntryOption({ item }: { item: ChaseCase }) {
  const card = getEventCard(item.tags);
  const datetime = DateTime.fromISO(item.timestamp, { zone: 'utc' });
  const datetimeCST = datetime.setZone('America/Chicago');

  return (
    <Flex direction='row' align='center' gap={10}>
      <Text size='md' fw={600} flex={1} mr={2}>
        {item.location}
      </Text>
      <Text fw={500} size='xs' flex={1}>
        {datetimeCST.toFormat('DDD')}
      </Text>
      <Text fw={500} size='sm' c={card.color} flex={1}>
        {card.value}
      </Text>
    </Flex>
  );
}

const SEARCH_ALL_ITEMS = 'search-all';

export default function SearchBar({ onSelectOption }: OnSelectOptionProps) {
  // inspired by https://mantine.dev/combobox/?e=AsyncAutocomplete
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [
    setHighlightedCases,
    setQueriedCases,
    savedSearchQuery,
    setSavedSearchQuery,
  ] = useChaseCaseStore((state) => [
    state.setHighlightedCases,
    state.setQueriedCases,
    state.savedSearchQuery,
    state.setSavedSearchQuery,
  ]);

  const [value, setValue] = useState(savedSearchQuery ?? '');
  const [query] = useDebouncedValue(value, 300);
  const { data, isLoading, refetch } = useSearchCases(query, 3);
  const [selectedOption, setSelectedOption] = useState('');
  const { data: allResults } = useSearchCases(
    query,
    500,
    selectedOption === SEARCH_ALL_ITEMS
  );

  const { current: map } = useMap();

  useEffect(() => {
    // we need to wait for options to render before we can select first one
    combobox.selectFirstOption();
  }, [combobox, value]);

  const options = (data ?? []).map((item) => (
    <Combobox.Option value={item.id} key={item.id}>
      <SearchEntryOption item={item} />
    </Combobox.Option>
  ));

  useEffect(() => {
    if (selectedOption === SEARCH_ALL_ITEMS) {
      if (allResults) {
        setQueriedCases(allResults);
        setHighlightedCases([]);
        setSavedSearchQuery(query);
        setSelectedOption('');
      }
    } else {
      const selectedCases = (data ?? []).filter(
        (item) => item.id === selectedOption
      );
      if (selectedCases && selectedCases[0]) {
        setQueriedCases(selectedCases);
        setHighlightedCases(selectedCases);
        setSavedSearchQuery(selectedCases[0].location);
        setValue(selectedCases[0].location);
        map?.flyTo({
          center: [selectedCases[0].lon, selectedCases[0].lat],
          zoom: 8,
        });
      }
    }
  }, [
    allResults,
    data,
    map,
    query,
    selectedOption,
    setHighlightedCases,
    setQueriedCases,
    setSavedSearchQuery,
  ]);

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setSelectedOption(optionValue);
        combobox.closeDropdown();
        if (onSelectOption) {
          onSelectOption();
        }
        combobox.targetRef.current?.blur();
      }}
      withinPortal={false}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          className={styles.searchBar}
          placeholder='Enter a town, year, date, or keyword'
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.resetSelectedOption();
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => {
            combobox.openDropdown();
            if (!data) {
              refetch();
            }
          }}
          onBlur={() => {
            combobox.closeDropdown();
          }}
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
                      setSavedSearchQuery(null);
                      setHighlightedCases([]);
                      setQueriedCases([]);
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
      </Combobox.Target>

      <Combobox.Dropdown hidden={!data}>
        <Combobox.Options>
          {options}
          {data && data.length > 1 && (
            <Combobox.Option value={SEARCH_ALL_ITEMS} key={SEARCH_ALL_ITEMS}>
              <Flex align='center' gap={6}>
                <MdSearch size={15} />
                Search all results
              </Flex>
            </Combobox.Option>
          )}
          {data && !data.length && (
            <Combobox.Empty>No results found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
