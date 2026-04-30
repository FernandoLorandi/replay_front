import test from 'node:test';
import assert from 'node:assert/strict';
import {
  mapNavigationResponse,
  mapProjectResponse,
  mapProjectsResponse,
} from './mappers.ts';

test('mapProjectsResponse supports flattened Strapi entities', () => {
  const projects = mapProjectsResponse({
    data: [
      {
        slug: 'continental',
        title: 'Continental',
        category: 'Institucionais',
        summary: 'Narrativa de marca.',
        videoUrl: 'https://www.youtube.com/watch?v=continental123',
        previewVideo: {
          url: '/uploads/continental.png',
          alternativeText: 'Continental hero',
        },
      },
    ],
  });

  assert.equal(projects?.[0]?.slug, 'continental');
  assert.equal(projects?.[0]?.title, 'Continental');
  assert.equal(
    projects?.[0]?.videoUrl,
    'https://www.youtube.com/watch?v=continental123'
  );
  assert.equal(projects?.[0]?.previewMediaAlt, 'Continental hero');
  assert.match(
    projects?.[0]?.previewMediaSrc ?? '',
    /\/uploads\/continental\.png$/
  );
});

test('mapProjectResponse supports attribute-based Strapi entities', () => {
  const project = mapProjectResponse({
    data: [
      {
        id: 1,
        attributes: {
          slug: 'lojas-mm',
          title: 'Lojas MM',
          category: 'Institucionais',
          summary: 'Conteudo editorial.',
          videoUrl: 'https://vimeo.com/123456789',
          previewVideo: {
            data: {
              attributes: {
                url: '/uploads/lojas-mm.png',
                alternativeText: 'Lojas MM',
              },
            },
          },
        },
      },
    ],
  });

  assert.equal(project?.slug, 'lojas-mm');
  assert.equal(project?.videoUrl, 'https://vimeo.com/123456789');
  assert.equal(project?.previewMediaAlt, 'Lojas MM');
  assert.match(project?.previewMediaSrc ?? '', /\/uploads\/lojas-mm\.png$/);
});

test('mapProjectsResponse identifies preview videos and home highlight fields', () => {
  const projects = mapProjectsResponse({
    data: [
      {
        slug: 'preview-video',
        title: 'Preview Video',
        category: 'Reels',
        videoUrl: 'https://www.youtube.com/watch?v=fullvideo',
        showOnHome: true,
        homeOrder: 2,
        homeTitle: 'Titulo da home',
        homeSummary: 'Resumo da home',
        previewVideo: {
          url: '/uploads/preview.mp4',
          alternativeText: 'Preview em movimento',
          mime: 'video/mp4',
        },
        homeHeroVideo: {
          url: '/uploads/hero.mp4',
          alternativeText: 'Hero em movimento',
          mime: 'video/mp4',
        },
      },
    ],
  });

  assert.equal(projects?.[0]?.previewMediaSrc, '/uploads/preview.mp4');
  assert.equal(projects?.[0]?.previewMediaAlt, 'Preview em movimento');
  assert.equal(projects?.[0]?.previewMediaType, 'video');
  assert.equal(projects?.[0]?.showOnHome, true);
  assert.equal(projects?.[0]?.homeOrder, 2);
  assert.equal(projects?.[0]?.homeTitle, 'Titulo da home');
  assert.equal(projects?.[0]?.homeSummary, 'Resumo da home');
  assert.equal(projects?.[0]?.homeHeroMediaSrc, '/uploads/hero.mp4');
  assert.equal(projects?.[0]?.homeHeroMediaAlt, 'Hero em movimento');
  assert.equal(projects?.[0]?.homeHeroMediaType, 'video');
});

test('mapNavigationResponse reads single-type navigation items', () => {
  const navigation = mapNavigationResponse({
    data: {
      items: [
        {
          label: 'Projetos',
          href: '/projetos',
        },
        {
          label: 'Equipe',
          href: '/equipe',
          external: false,
        },
      ],
    },
  });

  assert.deepEqual(navigation, [
    {
      external: false,
      href: '/projetos',
      label: 'Projetos',
    },
    {
      external: false,
      href: '/equipe',
      label: 'Equipe',
    },
  ]);
});
