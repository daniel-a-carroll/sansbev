/**
 * getCollection wrapper for the two collections that are legitimately empty
 * before launch.
 *
 * Astro logs "the collection does not exist or is empty" on every build when
 * you query an empty collection. That is correct behaviour for a typo and
 * noise for an expected pre-launch state, so this skips the call when the
 * backing file has no entries and returns an empty array with the right type.
 *
 * Behaviour is otherwise identical — the moment you add a store to
 * locations.yaml, this delegates straight to getCollection.
 */

import { getCollection, type CollectionEntry } from 'astro:content';
import { DATA_FILES, hasEntries, type FileBackedCollection } from './data-files';

export async function getFileCollection<C extends FileBackedCollection>(
  name: C
): Promise<CollectionEntry<C>[]> {
  if (!hasEntries(DATA_FILES[name])) return [];
  return getCollection(name) as Promise<CollectionEntry<C>[]>;
}
