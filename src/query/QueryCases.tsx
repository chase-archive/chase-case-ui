import { Flex } from '@mantine/core';
import SearchBar from './SearchBar';
import { OnSelectOptionProps } from './types';

export default function QueryCases({ onSelectOption }: OnSelectOptionProps) {
  return (
    <Flex direction='row' align='center' gap={8} wrap='wrap'>
      <SearchBar onSelectOption={onSelectOption} />
    </Flex>
  );
}
