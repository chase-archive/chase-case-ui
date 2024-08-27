import { Flex, Text } from '@mantine/core';
import SearchBar from './SearchBar';
import YearSelector from './YearSelector';
import styles from './QueryCases.module.css';

export default function QueryCases() {
  return (
    <Flex direction='row' align='center' gap={8} wrap='wrap'>
      <SearchBar />
      <Text fw={800} size='sm' className={styles.yearText}>
        {' '}
        OR{' '}
      </Text>
      <YearSelector />
    </Flex>
  );
}
