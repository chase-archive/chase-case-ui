import { Button, Flex } from '@mantine/core';
import { Map } from './map/Map';
import { CasesMapDisplay } from './map/CasesMapDisplay';
import styles from './Layout.module.css';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { CasePanel } from './list/CasePanel';
import { EventScrollProvider } from './list/EventScrollProvider';
import { CaseDetailsModal } from './details/CaseDetails';
import { CaseDrawer } from './list/CaseDrawer';
import { SearchBar } from './search/SearchBar';

export default function Layout() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    <EventScrollProvider>
      <Map>
        <CasesMapDisplay />
        {isDesktop ? <DesktopOverlay /> : <MobileOverlay />}
      </Map>
    </EventScrollProvider>
  );
}

function DesktopOverlay() {
  return (
    <>
      <img src='/logo.png' alt='logo' className={styles.logo} width={60} />
      <CasePanel />
      <CaseDetailsModal />
    </>
  );
}

function MobileOverlay() {
  const [opened, handlers] = useDisclosure(false);
  return (
    <>
      <Flex
        direction='column'
        gap={15}
        justify='space-between'
        className={styles.mobileOverlay}
      >
        <Flex gap={10} className={styles.mobileTopbar}>
          <img src='/logo.png' alt='logo' width={40} />
          <SearchBar />
        </Flex>
        <Button onClick={handlers.open}>Open Cases</Button>
      </Flex>
      <CaseDrawer
        isOpen={opened}
        onOpen={handlers.open}
        onClose={handlers.close}
      />
      <CaseDetailsModal />
    </>
  );
}
