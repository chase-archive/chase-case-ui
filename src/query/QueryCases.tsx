import { Flex } from '@mantine/core';
import { SearchBar } from './SearchBar';

export default function QueryCases() {
  return (
    <Flex direction='row' align='center' gap={8} wrap='wrap'>
      <SearchBar />
    </Flex>
  );
}
