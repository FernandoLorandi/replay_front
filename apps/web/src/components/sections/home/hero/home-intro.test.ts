import assert from 'node:assert/strict';
import test from 'node:test';
import { shouldPlayHomeIntro } from './home-intro.ts';

test('plays the home intro when this session has not completed it', () => {
  assert.equal(shouldPlayHomeIntro(null), true);
});

test('skips the home intro after this session completes it', () => {
  assert.equal(shouldPlayHomeIntro('seen'), false);
});
