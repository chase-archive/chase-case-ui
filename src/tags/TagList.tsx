import { Flex, Text } from '@mantine/core';
import { Tag } from './Tag';

interface TagListProps {
  tags: string[];
  maxTagLength?: number;
}

export function TagList({ tags, maxTagLength = 10 }: TagListProps) {
  const visibleTags = tags.slice(0, maxTagLength);
  const otherTags = tags.slice(maxTagLength);
  return (
    <Flex direction='row' gap={5} align='center'>
      {visibleTags.map((tag) => (
        <Tag key={tag} name={tag} />
      ))}
      {otherTags.length > 0 && (
        <Text size='xs'>{`and ${otherTags.length} more`}</Text>
      )}
    </Flex>
  );
}
