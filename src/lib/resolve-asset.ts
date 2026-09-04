/**
 * Build-time lookup of which asset slots are actually fulfilled.
 *
 * Kept separate from assets.ts so that both <Asset /> and any component that
 * needs to branch on presence (the wordmark, for instance, falls back to type
 * rather than to a gray box) share one glob and one resolution rule.
 */

import type { ImageMetadata } from 'astro';

const rasterModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{png,jpg,jpeg,webp,avif}',
  { eager: true }
);

const vectorModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.svg',
  { eager: true }
);

export type ResolvedAsset =
  | { kind: 'raster'; image: ImageMetadata }
  | { kind: 'vector'; image: ImageMetadata };

const basename = (path: string): string =>
  path.split('/').pop()!.replace(/\.[^.]+$/, '');

const lookup = (
  mods: Record<string, { default: ImageMetadata }>,
  slot: string
): ImageMetadata | undefined => {
  const key = Object.keys(mods).find((p) => basename(p) === slot);
  return key ? mods[key]!.default : undefined;
};

export function resolveAsset(slot: string): ResolvedAsset | undefined {
  const raster = lookup(rasterModules, slot);
  if (raster) return { kind: 'raster', image: raster };

  const vector = lookup(vectorModules, slot);
  if (vector) return { kind: 'vector', image: vector };

  return undefined;
}

/** True when real artwork exists for this slot. */
export const hasAsset = (slot: string): boolean => resolveAsset(slot) !== undefined;
