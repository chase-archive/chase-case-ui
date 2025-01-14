import { Flex } from '@mantine/core';
import { CaseList } from './CaseList';
import styles from './CasePanel.module.css';
import { ToggleTagDisplay } from './ToggleTagDisplay';
import { SearchBar } from '../search/SearchBar';

export function CasePanel() {
  return (
    <Flex direction='column' className={styles.casePanel}>
      <SearchBar className={styles.searchBar} />
      <ToggleTagDisplay />
      <div className={styles.caseList}>
        <CaseList />
      </div>
    </Flex>
  );
}
