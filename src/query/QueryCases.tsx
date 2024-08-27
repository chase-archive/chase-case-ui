import { Flex, Text } from '@mantine/core';
import SearchBar from './SearchBar';
import YearSelector from './YearSelector';
import styles from './QueryCases.module.css';
import { OnSelectOptionProps } from './types';

export default function QueryCases({ onSelectOption }: OnSelectOptionProps) {
  return (
    <Flex direction='row' align='center' gap={8} wrap='wrap'>
      <SearchBar onSelectOption={onSelectOption} />
      <Text fw={800} size='sm' className={styles.yearText}>
        {' '}
        OR YEAR{' '}
      </Text>
      <YearSelector onSelectOption={onSelectOption} />
    </Flex>
  );
}
