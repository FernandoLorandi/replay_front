import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeHeroProjects } from './hero-projects.ts';
import { getHeroProjectIndex } from './hero-projects.ts';
import { shouldAnimateHeroTransition } from './hero-projects.ts';

test('normalizeHeroProjects keeps featured projects in their supplied order', () => {
  const projects = [
    { slug: 'first' },
    { slug: 'second' },
  ];

  assert.deepEqual(normalizeHeroProjects(projects, null), projects);
});

test('normalizeHeroProjects falls back to the single project', () => {
  const fallback = { slug: 'fallback' };

  assert.deepEqual(normalizeHeroProjects([], fallback), [fallback]);
});

test('getHeroProjectIndex maps scroll progress to the active project', () => {
  assert.equal(getHeroProjectIndex(0, 3), 0);
  assert.equal(getHeroProjectIndex(0.34, 3), 1);
  assert.equal(getHeroProjectIndex(0.67, 3), 2);
  assert.equal(getHeroProjectIndex(1, 3), 2);
});

test('shouldAnimateHeroTransition only runs for a real project change', () => {
  assert.equal(shouldAnimateHeroTransition(null, 0), false);
  assert.equal(shouldAnimateHeroTransition(0, 0), false);
  assert.equal(shouldAnimateHeroTransition(0, 1), true);
});
