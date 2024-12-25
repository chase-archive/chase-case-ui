import { Flex } from '@mantine/core';
import { CaseList } from './CaseList';
import { SearchBar } from './SearchBar';
import styles from './CasePanel.module.css';

export function CasePanel() {
  return (
    <Flex direction='column' className={styles.casePanel}>
      <SearchBar className={styles.searchBar} />
      <CaseList className={styles.caseList} />
    </Flex>
  );
}
