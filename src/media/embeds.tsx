import { getTweetId, getYouTubeVideoId } from './utils';
import {
  InstagramEmbed as ReactInstagramEmbed,
  FacebookEmbed as ReactFacebookEmbed,
} from 'react-social-media-embed';
import { useEffect, useState } from 'react';
import { TweetEmbed } from './TwitterEmbed';
import { Instagram as LoadingPlaceholder } from 'react-content-loader';
import { Center } from '@mantine/core';

interface EmbedProps {
  url: string;
}

export function YouTubeEmbed({ url }: EmbedProps) {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) {
    return null;
  }
  return (
    <iframe
      src={'https://www.youtube.com/embed/' + videoId}
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      referrerPolicy='strict-origin-when-cross-origin'
      allowFullScreen
      style={{
        height: '100%',
        width: '100%',
        minHeight: '400px',
        minWidth: '600px',
      }}
    />
  );
}

export function TwitterEmbed({ url }: EmbedProps) {
  const tweetId = getTweetId(url);
  if (!tweetId) {
    return null;
  }
  return (
    <TweetEmbed
      tweetId={tweetId}
      placeholder={
        <Center>
          <LoadingPlaceholder width={480} height={480} />
        </Center>
      }
    />
  );
}

export function InstagramEmbed({ url }: EmbedProps) {
  return <ReactInstagramEmbed url={url} height='100%' width='100%' />;
}

export function FacebookEmbed({ url }: EmbedProps) {
  return <ReactFacebookEmbed url={url} height='100%' width='100%' />;
}

export function ThreadsEmbed({ url }: EmbedProps) {
  const [embedHtml, setEmbedHtml] = useState('');

  useEffect(() => {
    const fetchEmbedHtml = async () => {
      try {
        const response = await fetch(
          `https://www.threads.net/oembed?url=${'https://www.threads.net/t/DBhf5f8yzr0'}`
        );
        const data = await response.json();
        setEmbedHtml(data.html);
      } catch (error) {
        console.error('Error fetching embed HTML:', error);
      }
    };

    fetchEmbedHtml();
  }, [url]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: embedHtml }}
      style={{ height: '100%', width: '90%' }}
    />
  );
}

export function BlueskyEmbed({ url }: EmbedProps) {
  const [embedHtml, setEmbedHtml] = useState('');

  useEffect(() => {
    const fetchEmbedHtml = async () => {
      try {
        const response = await fetch(
          `https://embed.bsky.app/oembed?url=${url}`,
          { mode: 'no-cors' }
        );
        const data = await response.json();
        setEmbedHtml(data.html);
      } catch (error) {
        console.error('Error fetching embed HTML:', error);
      }
    };

    fetchEmbedHtml();
  }, [url]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: embedHtml }}
      style={{ height: '100%', width: '90%' }}
    />
  );
}
