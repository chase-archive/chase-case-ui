import { Center, Flex, Loader, Modal, Tabs, Text } from '@mantine/core';
import { useChaseCaseStore } from '../store';
import { useGetCaseDetails } from './api';
import { TagList } from '../tags/TagList';
import { MediaSwiper } from '../media/MediaSwiper';
import { ChaseCase } from '../types';
import styles from './CaseDetails.module.css';
import { ChaseCaseProps } from './types';
import { CaseDataTable } from './CaseDataTable';
import { isSocialLink } from '../media/utils';
import { SoundingViewer } from '../soundings/SoundingViewer';

export function CaseDetailsModal() {
  const [selectedCaseId, setSelectedCaseId] = useChaseCaseStore((state) => [
    state.selectedCaseId,
    state.setSelectedCaseId,
  ]);
  const { data: caseDetails, isLoading } = useGetCaseDetails(selectedCaseId);

  const onClose = () => {
    setSelectedCaseId(null);
  };

  return (
    <Modal
      className={styles.caseDetailsModal}
      opened={selectedCaseId !== null}
      onClose={onClose}
      size='xl'
      title={
        <Flex direction='row' gap={15} justify='center'>
          <Text size='xl' fw={700}>
            {caseDetails?.event_name}
          </Text>
          <TagList tags={caseDetails?.tags ?? []} />
        </Flex>
      }
    >
      {isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        caseDetails && (
          <CaseDetailsContent chaseCase={caseDetails as ChaseCase} />
        )
      )}
    </Modal>
  );
}

function CaseDetailsContent({ chaseCase }: ChaseCaseProps) {
  const socialLinks = chaseCase.photo_video.filter((link) =>
    isSocialLink(link)
  );
  return (
    <Tabs
      defaultValue='data-table'
      variant='outline'
      color='gray'
      mt={2}
      w='full'
    >
      <Tabs.List>
        <Tabs.Tab value='data-table'>Data Table</Tabs.Tab>
        <Tabs.Tab value='social-media'>Social Media</Tabs.Tab>
        <Tabs.Tab value='soundings'>Soundings</Tabs.Tab>
        {/* <Tabs.Tab value='synoptic'>Synoptic Maps</Tabs.Tab>
        <Tabs.Tab value='radar'>Radar</Tabs.Tab> */}
      </Tabs.List>

      <Tabs.Panel value='data-table' className={styles.caseDetailsContent}>
        <CaseDataTable chaseCase={chaseCase} />
      </Tabs.Panel>
      <Tabs.Panel value='social-media' className={styles.caseDetailsContent}>
        <MediaSwiper urls={socialLinks} />
      </Tabs.Panel>
      <Tabs.Panel value='soundings' className={styles.caseDetailsContent}>
        <SoundingViewer caseId={chaseCase.id} />
      </Tabs.Panel>
    </Tabs>
  );
}
