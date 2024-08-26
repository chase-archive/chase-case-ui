import { Modal } from '@mantine/core';
import {
  getYouTubeVideoId,
  isTwitterLink,
  isYouTubeLink,
} from '../utils/socials';
import { ReactNode } from 'react';

interface EmbedProps {
  link: string;
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
}

export function Embed({ title, link, isOpen, onClose }: EmbedProps) {
  let component: ReactNode = null;
  if (isYouTubeLink(link)) {
    component = <YouTubeEmbed link={link} />;
  } else if (isTwitterLink(link)) {
    component = <TwitterEmbed link={link} />;
  }

  if (!component) {
    return null;
  }
  return (
    <Modal title={title} opened={isOpen} onClose={onClose} size='fit-content'>
      {component}
    </Modal>
  );
}

export function YouTubeEmbed({ link }: Pick<EmbedProps, 'link'>) {
  const videoId = getYouTubeVideoId(link);

  return (
    <iframe
      width='560'
      height='315'
      src={'https://www.youtube.com/embed/' + videoId}
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      referrerPolicy='strict-origin-when-cross-origin'
      allowFullScreen
    />
  );
}

export function TwitterEmbed({ link }: Pick<EmbedProps, 'link'>) {
  // only twitter.com links embed, not x.com links. Not sure if feature or overlooked
  const twitterLink = link.replace('x.com/', 'twitter.com/');
  return (
    <iframe
      srcDoc={`<!DOCTYPE html><html><body>
  <blockquote class="twitter-tweet">
    <a href="${twitterLink}"></a>
  </blockquote>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  </body></html>`}
      width='560'
      height='560'
      style={{ border: 'none', overflow: 'hidden' }}
    />
  );
}
