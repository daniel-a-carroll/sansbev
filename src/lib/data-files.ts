/**
 * Emptiness check for the hand-maintained YAML collections.
 *
 * Pre-launch, `locations` and `press` are legitimately empty, and both Astro's
 * file() loader and getCollection() log a warning when they are. A build that
 * always prints warnings is a build nobody reads warnings from, so this is
 * shared by src/content.config.ts (to pick a silent loader) and
 * src/lib/collections.ts (to skip the getCollection call entirely).
 *
 * Matches a YAML list item at the start of a line. Commented-out example
 * entries sit behind a `#` and correctly do not count as entries.
 */

import { existsSync, readFileSync } from 'node:fs';

export const DATA_FILES = {
  locations: 'src/content/locations.yaml',
  press: 'src/content/press.yaml',
} as const;

export type FileBackedCollection = keyof typeof DATA_FILES;

export const hasEntries = (path: string): boolean => {
  if (!existsSync(path)) return false;
  return /^\s*-\s/m.test(readFileSync(path, 'utf8'));
};
