import { Button, Drawer, Flex } from '@mantine/core';
import Map from './Map';
import { CasesDetails } from './details';
import { CasesMapDisplay } from './mapDisplay';
import { QueryCases } from './query';
import { Header } from './header';
import styles from './Layout.module.css';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

export default function Layout() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    <div className={styles.map}>
    <Header />
    <Map>
      <CasesMapDisplay />
      {isDesktop ? <DesktopOverlay /> : <MobileOverlay />}
    </Map>
    </div>
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
  const [areCasesOpen, { open: openCases, close: closeCases }] =
    useDisclosure(false);

  return (
    <>
      <Flex
        className={styles.mobileOverlay}
        direction='column'
        align='center'
        justify='space-between'
      >
        <QueryCases />
        <Button onClick={openCases}>Open Cases</Button>
      </Flex>
      <Drawer
        opened={areCasesOpen}
        onClose={closeCases}
        position='bottom'
        size='45svh'
        shadow='md'
        trapFocus={false}
        withOverlay={false}
        removeScrollProps={{ allowPinchZoom: true }}
        closeOnClickOutside
      >
        <Flex direction='column' align='center' justify='center' mt={1}>
          <CasesDetails />
        </Flex>
      </Drawer>
    </>
  );
}
