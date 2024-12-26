import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import {
  getTweetId,
  getYouTubeVideoId,
  isTwitterLink,
  isYouTubeLink,
} from '../utils/socials';
import { YouTubeEmbed } from './Embed';
import styles from './CasesDetails.module.css';
import { TwitterTweetEmbed } from 'react-twitter-embed';
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
            {isYouTubeLink(url) && getYouTubeVideoId(url) && (
              <YouTubeEmbed videoId={getYouTubeVideoId(url) as string} />
            )}
            {isTwitterLink(url) && getTweetId(url) && (
              <TwitterTweetEmbed tweetId={getTweetId(url) as string} />
            )}
          </Flex>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
