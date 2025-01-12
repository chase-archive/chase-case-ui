import { Flex, Text } from '@mantine/core';
import { Tag } from './Tag';
import { TagInteractionProps } from './types';

interface TagListProps extends TagInteractionProps {
  tags: string[];
  maxTagLength?: number;
}

export function TagList({ tags, maxTagLength = 10, ...rest }: TagListProps) {
  const visibleTags = tags.slice(0, maxTagLength);
  const otherTags = tags.slice(maxTagLength);
  return (
    <Flex direction='row' gap={5} align='center' wrap='wrap'>
      {visibleTags.map((tag, idx) => (
        <Tag key={`${tag}-${idx}`} name={tag} {...rest} />
      ))}
      {otherTags.length > 0 && (
        <Text size='xs'>{`and ${otherTags.length} more`}</Text>
      )}
    </Flex>
  );
}
