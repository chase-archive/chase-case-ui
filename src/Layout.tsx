import { Flex } from '@mantine/core';
import Map from './Map';
import { CasesDetails } from './details';
import { CasesMapDisplay } from './mapDisplay';
import { QueryCases } from './query';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <Map>
      <CasesMapDisplay />
      <Flex className={styles.overlay}>
        <QueryCases />
        <CasesDetails />
      </Flex>
    </Map>
  );
}
