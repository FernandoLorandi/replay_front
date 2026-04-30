import test from 'node:test';
import assert from 'node:assert/strict';
import { getVideoPlaybackSource, toVideoEmbedUrl } from './video.ts';

test('toVideoEmbedUrl converts YouTube watch URLs', () => {
  assert.equal(
    toVideoEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
    'https://www.youtube.com/embed/dQw4w9WgXcQ'
  );
});

test('toVideoEmbedUrl converts YouTube short URLs', () => {
  assert.equal(
    toVideoEmbedUrl('https://youtu.be/dQw4w9WgXcQ'),
    'https://www.youtube.com/embed/dQw4w9WgXcQ'
  );
});

test('toVideoEmbedUrl converts Vimeo URLs', () => {
  assert.equal(
    toVideoEmbedUrl('https://vimeo.com/123456789'),
    'https://player.vimeo.com/video/123456789'
  );
});

test('toVideoEmbedUrl preserves supported embed URLs', () => {
  assert.equal(
    toVideoEmbedUrl('https://www.youtube.com/embed/dQw4w9WgXcQ'),
    'https://www.youtube.com/embed/dQw4w9WgXcQ'
  );
  assert.equal(
    toVideoEmbedUrl('https://player.vimeo.com/video/123456789'),
    'https://player.vimeo.com/video/123456789'
  );
});

test('toVideoEmbedUrl returns null for empty or unsupported URLs', () => {
  assert.equal(toVideoEmbedUrl(''), null);
  assert.equal(toVideoEmbedUrl(null), null);
  assert.equal(toVideoEmbedUrl('https://example.com/video'), null);
});

test('getVideoPlaybackSource supports direct MP4 video URLs', () => {
  assert.deepEqual(
    getVideoPlaybackSource('https://cms.example.com/uploads/full-video.mp4'),
    {
      kind: 'video',
      src: 'https://cms.example.com/uploads/full-video.mp4',
    }
  );
});
