import {
  Combobox,
  Flex,
  Loader,
  Text,
  TextInput,
  useCombobox,
} from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { useSearchCases } from '../api';
import { ChaseCase } from '../types';
import { MdSearch } from 'react-icons/md';
import { useChaseCaseStore } from '../store';
import { DateTime } from 'luxon';
import styles from './QueryCases.module.css';

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

export default function SearchBar() {
  // inspired by https://mantine.dev/combobox/?e=AsyncAutocomplete
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [query, setQuery] = useDebouncedState('', 300);
  const { data, isLoading, refetch } = useSearchCases(query);
  const setSelectedCase = useChaseCaseStore((state) => state.setSelectedCase);

  const options = (data ?? []).map((item) => (
    <Combobox.Option value={item.id} key={item.id}>
      <SearchEntryOption item={item} />
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setSelectedCase(
          (data ?? []).find((item) => item.id === optionValue) ?? null
        );
        combobox.closeDropdown();
      }}
      withinPortal={false}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          className={styles.searchBar}
          placeholder='Enter a town, date, or keyword'
          onChange={(event) => {
            setQuery(event.currentTarget.value);
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
          onBlur={() => combobox.closeDropdown()}
          rightSection={
            isLoading ? <Loader size={18} /> : <MdSearch size={20} />
          }
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={!data}>
        <Combobox.Options>
          {options}
          {data && !data.length && (
            <Combobox.Empty>No results found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}