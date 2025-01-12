import { Flex, Group, Pagination } from '@mantine/core';
import { useState } from 'react';
import styles from './MediaSwiper.module.css';
import {
  FacebookEmbed,
  InstagramEmbed,
  TwitterEmbed,
  YouTubeEmbed,
} from './Embed';
import {
  isFacebookLink,
  isInstagramLink,
  isTwitterLink,
  isYouTubeLink,
} from './utils';

interface MediaSwiperProps {
  urls: string[];
}

export function MediaSwiper({ urls }: MediaSwiperProps) {
  const [activePage, setActivePage] = useState(1);
  if (!urls.length) {
    return null;
  }

  const activeUrl = urls[activePage - 1];

  return (
    <Flex
      direction='column'
      align='stretch'
      justify='center'
      className={styles.mediaSwiper}
      gap={5}
      flex={1}
    >
      <div className={styles.mediaContent}>
        {isYouTubeLink(activeUrl) && <YouTubeEmbed url={activeUrl} />}
        {isTwitterLink(activeUrl) && <TwitterEmbed url={activeUrl} />}
        {isInstagramLink(activeUrl) && <InstagramEmbed url={activeUrl} />}
        {isFacebookLink(activeUrl) && <FacebookEmbed url={activeUrl} />}
      </div>
      <Pagination.Root
        total={urls.length}
        value={activePage}
        onChange={setActivePage}
      >
        <Group gap={5} justify='center'>
          <Pagination.Previous />
          <Pagination.Items />
          <Pagination.Next />
        </Group>
      </Pagination.Root>
    </Flex>
  );
}
