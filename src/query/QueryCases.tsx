import { Flex, Text } from '@mantine/core';
import SearchBar from './SearchBar';
import styles from './QueryCases.module.css';
import YearSelector from './YearSelector';

export default function QueryCases() {
  return (
    <Flex direction='row' align='center' gap={10} className={styles.query}>
      <SearchBar />
      <Text fw={800} c='#696969'>
        {' '}
        OR SELECT YEAR:{' '}
      </Text>
      <YearSelector />
    </Flex>
  );
}
