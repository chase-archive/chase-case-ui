import { ActionIcon, Drawer, Flex } from '@mantine/core';
import Map from './Map';
import { CasesDetails } from './details';
import { CasesMapDisplay } from './mapDisplay';
import { QueryCases } from './query';
import styles from './Layout.module.css';
import { MdSearch } from 'react-icons/md';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

export default function Layout() {
  const isDesktop = useMediaQuery('(min-width: 801px)');
  return (
    <Map>
      <CasesMapDisplay />
      {isDesktop ? <DesktopOverlay /> : <MobileOverlay />}
    </Map>
  );
}

function DesktopOverlay() {
  return (
    <Flex className={styles.overlay}>
      <QueryCases />
      <CasesDetails />
    </Flex>
  );
}

function MobileOverlay() {
  const [isSearchOpen, { open: openSearch, close: closeSearch }] =
    useDisclosure(false);

  return (
    <>
      <Flex className={styles.mobileOverlay}>
        <ActionIcon size={42} variant='default' onClick={openSearch}>
          <MdSearch />
        </ActionIcon>
      </Flex>
      <Drawer.Root
        opened={isSearchOpen}
        onClose={closeSearch}
        position='top'
        size='65vh'
        shadow='md'
        trapFocus={false}
      >
        <Drawer.Content className={styles.mobileSearchBar}>
          <Flex
            direction='column'
            align='center'
            justify='center'
            gap={10}
            p={20}
          >
            <Drawer.CloseButton />
            <QueryCases onSelectOption={closeSearch} />
          </Flex>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
}
