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
        coverImage: {
          url: '/uploads/continental.png',
          alternativeText: 'Continental hero',
        },
      },
    ],
  });

  assert.equal(projects?.[0]?.slug, 'continental');
  assert.equal(projects?.[0]?.title, 'Continental');
  assert.equal(projects?.[0]?.imageAlt, 'Continental hero');
  assert.match(projects?.[0]?.imageSrc ?? '', /\/uploads\/continental\.png$/);
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
          coverImage: {
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
  assert.equal(project?.imageAlt, 'Lojas MM');
  assert.match(project?.imageSrc ?? '', /\/uploads\/lojas-mm\.png$/);
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
