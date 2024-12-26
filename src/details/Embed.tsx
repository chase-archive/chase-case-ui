export function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <iframe
      src={'https://www.youtube.com/embed/' + videoId}
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      referrerPolicy='strict-origin-when-cross-origin'
      allowFullScreen
    />
  );
}
