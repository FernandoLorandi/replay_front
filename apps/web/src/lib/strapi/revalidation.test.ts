import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveRevalidationTargets } from './revalidation.ts';

test('project webhooks revalidate home, listing and detail routes', () => {
  const result = resolveRevalidationTargets({
    model: 'project',
    slug: 'continental',
  });

  assert.deepEqual(result.paths, [
    { path: '/' },
    { path: '/projetos' },
    { path: '/projetos/continental' },
  ]);
  assert.deepEqual(result.tags, ['projects']);
});

test('explicit paths and tags are preserved for generic webhooks', () => {
  const result = resolveRevalidationTargets({
    paths: ['/custom'],
    tags: ['navigation'],
  });

  assert.deepEqual(result.paths, [{ path: '/custom' }]);
  assert.deepEqual(result.tags, ['navigation']);
});
