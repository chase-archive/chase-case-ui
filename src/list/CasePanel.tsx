import { Flex, Text } from '@mantine/core';
import { CaseList } from './CaseList';
import { SearchBar } from './SearchBar';
import styles from './CasePanel.module.css';
import { useChaseCaseStore } from '../store';
import { TagList } from '../tags/TagList';

export function CasePanel() {
  const [filteredTags, removeFilteredTag] = useChaseCaseStore((state) => [
    state.filteredTags,
    state.removeFilteredTag,
  ]);
  return (
    <Flex direction='column' className={styles.casePanel}>
      <SearchBar className={styles.searchBar} />
      <Flex className={styles.caseFilteredTags} gap={5} align='center'>
        <Text size='xs' fw={600} ml={10}>
          Filtered Tags:{' '}
        </Text>
        <TagList tags={[...filteredTags]} onTagClose={removeFilteredTag} />
      </Flex>
      <CaseList className={styles.caseList} />
    </Flex>
  );
}
