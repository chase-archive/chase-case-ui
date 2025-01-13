import { Flex } from '@mantine/core';
import { CaseList } from './CaseList';
import { SearchBar } from './SearchBar';
import styles from './CasePanel.module.css';
import { ToggleTagDisplay } from './ToggleTagDisplay';

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
