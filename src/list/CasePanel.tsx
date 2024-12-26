import { Flex, Text } from '@mantine/core';
import { CaseList } from './CaseList';
import { SearchBar } from './SearchBar';
import styles from './CasePanel.module.css';
import { useChaseCaseStore } from '../store';
import { TagList } from '../tags/TagList';
import { AddTag } from '../tags/AddTag';

export function CasePanel() {
  const [filteredTags, removeFilteredTag, addFilteredTag] = useChaseCaseStore(
    (state) => [
      state.filteredTags,
      state.removeFilteredTag,
      state.addFilteredTag,
    ]
  );
  return (
    <Flex direction='column' className={styles.casePanel}>
      <SearchBar className={styles.searchBar} />
      <Flex
        direction='row'
        className={styles.caseFilteredTags}
        gap={5}
        align='center'
        wrap='wrap'
        ml={10}
      >
        <Text size='xs' fw={600}>
          Filtered Tags:{' '}
        </Text>
        <TagList tags={[...filteredTags]} onTagClose={removeFilteredTag} />
        <AddTag onSubmit={(tag) => addFilteredTag(tag)} />
      </Flex>
      <CaseList className={styles.caseList} />
    </Flex>
  );
}
