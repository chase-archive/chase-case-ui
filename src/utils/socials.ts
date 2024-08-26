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
