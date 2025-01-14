import { Anchor, Flex } from '@mantine/core';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface ExternalLinkListProps {
  links: string[];
}
export function ExternalLinkList({ links }: ExternalLinkListProps) {
  return (
    <Flex direction='row' gap={5}>
      {links.map((link, idx) => (
        <Anchor
          key={link}
          href={link}
          target='_blank'
          size='sm'
          underline='hover'
        >
          <Flex direction='row' align='center' gap={3}>
            {idx + 1}
            <FaExternalLinkAlt />
            {`${idx < links.length - 1 ? ',' : ''}`}
          </Flex>
        </Anchor>
      ))}
    </Flex>
  );
}
