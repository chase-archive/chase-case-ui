import { Drawer, Flex } from '@mantine/core';
import { useChaseCaseStore } from '../store';
import { useScrollToEvent } from './context';
import { useEffect, useRef } from 'react';
import { ToggleTagDisplay } from './ToggleTagDisplay';
import { CaseList } from './CaseList';
import styles from './CasePanel.module.css';

interface CaseDrawerProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function CaseDrawer({ isOpen, onOpen, onClose }: CaseDrawerProps) {
  const topRef = useRef<HTMLDivElement>(null);
  const highlightedCaseId = useChaseCaseStore(
    (state) => state.highlightedCaseId
  );

  const { scrollToEvent } = useScrollToEvent();

  useEffect(() => {
    if (highlightedCaseId) {
      onOpen();
      // 500 ms delay to allow the drawer to open before scrolling list
      // otherwise it does not scroll!
      setTimeout(() => {
        scrollToEvent(highlightedCaseId);

        // hack to make the drawer itself "non-scrollable"
        topRef.current?.scrollIntoView(true);
      }, 500);
    }
  }, [highlightedCaseId, onOpen, scrollToEvent]);

  return (
    <Drawer.Root
      opened={isOpen}
      onClose={onClose}
      position='bottom'
      trapFocus={false}
      removeScrollProps={{ enabled: false }}
    >
      <Drawer.Content className={styles.caseDrawerContent}>
        <Drawer.Body className={styles.caseDrawerBg}>
          <Flex direction='row' ref={topRef}>
            <ToggleTagDisplay />
            <Drawer.CloseButton onClick={onClose} />
          </Flex>
          <div className={styles.caseList}>
            <CaseList />
          </div>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}
