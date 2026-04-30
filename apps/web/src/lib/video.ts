export function toVideoEmbedUrl(videoUrl: string | null | undefined) {
  if (!videoUrl?.trim()) {
    return null;
  }

  let url: URL;

  try {
    url = new URL(videoUrl);
  } catch {
    return null;
  }

  const hostname = url.hostname.replace(/^www\./, '');
  const pathname = url.pathname.replace(/\/$/, '');

  if (hostname === 'youtube.com' && pathname.startsWith('/embed/')) {
    return url.toString();
  }

  if (hostname === 'youtube.com' && pathname === '/watch') {
    const videoId = url.searchParams.get('v');
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  if (hostname === 'youtu.be') {
    const videoId = pathname.split('/').filter(Boolean)[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  if (hostname === 'player.vimeo.com' && pathname.startsWith('/video/')) {
    return url.toString();
  }

  if (hostname === 'vimeo.com') {
    const videoId = pathname.split('/').filter(Boolean)[0];
    return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
  }

  return null;
}

export function getVideoPlaybackSource(videoUrl: string | null | undefined) {
  if (!videoUrl?.trim()) {
    return null;
  }

  let url: URL;

  try {
    url = new URL(videoUrl);
  } catch {
    return null;
  }

  if (url.pathname.toLowerCase().endsWith('.mp4')) {
    return {
      kind: 'video' as const,
      src: url.toString(),
    };
  }

  const embedUrl = toVideoEmbedUrl(videoUrl);

  return embedUrl
    ? {
        kind: 'iframe' as const,
        src: embedUrl,
      }
    : null;
}
