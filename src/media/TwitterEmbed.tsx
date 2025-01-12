import { ReactNode, useEffect, useRef, useState } from 'react';
import script from 'scriptjs';

interface TweetEmbedProps {
  tweetId: string;
  placeholder?: ReactNode;
}

const TWITTER_WIDGET_JS = 'https://platform.twitter.com/widgets.js';

// inspired from https://github.com/saurabhnemade/react-twitter-embed/issues/105
export function TweetEmbed({ tweetId, placeholder }: TweetEmbedProps) {
  const tweetRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isComponentMounted = true;

    script(TWITTER_WIDGET_JS, 'twitter-embed', () => {
      if (!window.twttr) {
        console.error('Failed to load Twitter widget JS.');
        return;
      }

      if (isComponentMounted && tweetRef.current) {
        if (!window.twttr.widgets.createTweet) {
          console.error('Failed to load Twitter widget JS.');
          return;
        }

        tweetRef.current.innerHTML = '';
        setIsLoading(true);

        window.twttr.widgets
          .createTweet(tweetId, tweetRef.current, {
            // theme: 'dark',
            align: 'center',
            conversation: 'none',
          })
          .then(() => {
            setIsLoading(false);
          })
          .catch((error: Error) => {
            console.error('Failed to create Twitter widget:', error);
            setIsLoading(false);
          });
      }
    });

    return () => {
      isComponentMounted = false;
    };
  }, [placeholder, tweetId]);

  return (
    <>
      {isLoading && placeholder}
      <div ref={tweetRef} />
    </>
  );
}
