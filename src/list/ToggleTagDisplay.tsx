import { useChaseCaseStore } from '../store';
import { AddTag } from '../tags/AddTag';
import { TagList } from '../tags/TagList';
import { Flex, Text } from '@mantine/core';
import styles from './CasePanel.module.css';

export function ToggleTagDisplay() {
  const [filteredTags, removeFilteredTag, addFilteredTag] = useChaseCaseStore(
    (state) => [
      state.filteredTags,
      state.removeFilteredTag,
      state.addFilteredTag,
    ]
  );
  return (
    <Flex
      direction='row'
      className={styles.caseFilteredTags}
      gap={5}
      align='center'
      wrap='wrap'
    >
      <Text size='xs' fw={600}>
        Filtered Tags:{' '}
      </Text>
      <TagList tags={[...filteredTags]} onTagClose={removeFilteredTag} />
      <AddTag onSubmit={(tag) => addFilteredTag(tag)} />
    </Flex>
  );
}
