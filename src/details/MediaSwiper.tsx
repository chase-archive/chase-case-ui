import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import {
  isFacebookLink,
  isInstagramLink,
  isTwitterLink,
  isYouTubeLink,
} from '../utils/socials';
import {
  FacebookEmbed,
  InstagramEmbed,
  TwitterEmbed,
  YouTubeEmbed,
} from './Embed';
import styles from './CasesDetails.module.css';
import { Flex } from '@mantine/core';

interface MediaSwiperProps {
  urls: string[];
}

export function MediaSwiper({ urls }: MediaSwiperProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      loop
      pagination={{ clickable: true }}
    >
      {urls.map((url) => (
        <SwiperSlide key={url}>
          <Flex
            className={styles.caseMediaCarousel}
            direction='column'
            justify='space-between'
            align='center'
          >
            {isYouTubeLink(url) && <YouTubeEmbed url={url} />}
            {isTwitterLink(url) && <TwitterEmbed url={url} />}
            {isInstagramLink(url) && <InstagramEmbed url={url} />}
            {isFacebookLink(url) && <FacebookEmbed url={url} />}
          </Flex>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
