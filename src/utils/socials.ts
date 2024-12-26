export function isSocialLink(url: string) {
  return (
    isYouTubeLink(url) ||
    isTwitterLink(url) ||
    isInstagramLink(url) ||
    isFacebookLink(url)
  );
}

export function getYouTubeVideoId(url: string) {
  const regExp =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match && match[1].length == 11 ? match[1] : null;
}

export function isYouTubeLink(url: string) {
  return getYouTubeVideoId(url) !== null;
}

export function isTwitterLink(url: string) {
  return url.includes('twitter.com/') || url.includes('x.com/');
}

export function isInstagramLink(url: string) {
  return url.includes('instagram.com/');
}

export function isFacebookLink(url: string) {
  return url.includes('facebook.com/');
}

export function isBlueskyLink(url: string) {
  return url.includes('bsky.app/');
}

export function getTweetId(url: string) {
  try {
    const parsedUrl = new URL(url);
    const pathParts = parsedUrl.pathname.split('/'); // Split the path into segments
    console.log('**** PATH PARTS ', {
      pathParts,
      res: pathParts[pathParts.indexOf('status') + 1],
    });
    return pathParts.includes('status')
      ? pathParts[pathParts.indexOf('status') + 1]
      : null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_err) {
    return null;
  }
}
