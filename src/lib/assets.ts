/**
 * Asset slot registry.
 *
 * Every image on the site is referenced by SLOT NAME through <Asset />, never
 * by path. A slot either resolves to a real file at src/assets/<slot>.<ext> or
 * renders a dimension-exact placeholder. Dropping in real photography is
 * therefore a file operation with no code change and no layout shift.
 *
 * The slot data lives in src/data/asset-slots.json so that this module and
 * scripts/generate-assets-manifest.mjs read the same source.
 */

import { z } from 'astro/zod';
import raw from '../data/asset-slots.json';

const formatSchema = z.enum(['png', 'jpg', 'jpeg', 'webp', 'svg']);

const slotSchema = z.object({
  slot: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  format: formatSchema,
  where: z.string(),
  note: z.string(),
  /** LCP candidate. Rendered eagerly with high fetch priority. */
  priority: z.boolean().default(false),
});

const flavorSlotSchema = slotSchema
  .omit({ slot: true })
  .extend({ kind: z.string() });

const registrySchema = z.object({
  slots: z.array(slotSchema),
  flavorSlots: z.array(flavorSlotSchema),
});

const registry = registrySchema.parse(raw);

export type AssetSlotDef = z.infer<typeof slotSchema>;
export type FlavorSlotKind = string;

const bySlot = new Map(registry.slots.map((s) => [s.slot, s]));

/** Slot name for a per-flavor asset, e.g. flavorSlot('citrus', 'can-front'). */
export function flavorSlot(flavorId: string, kind: string): string {
  return `flavor-${flavorId}-${kind}`;
}

/**
 * Resolves a slot definition. Per-flavor slots are matched by their kind
 * suffix so they do not each need a registry entry.
 *
 * Throws on an unknown slot: a typo'd slot name should fail the build, not
 * silently render a placeholder that nobody ever notices is wrong.
 */
export function getSlot(slot: string): AssetSlotDef {
  const direct = bySlot.get(slot);
  if (direct) return direct;

  const flavorMatch = registry.flavorSlots.find((f) =>
    slot.startsWith('flavor-') && slot.endsWith(`-${f.kind}`)
  );
  if (flavorMatch) {
    const { kind, ...rest } = flavorMatch;
    return { ...rest, slot };
  }

  throw new Error(
    `Unknown asset slot "${slot}". Add it to src/data/asset-slots.json, ` +
      `then run \`npm run assets:manifest\`.`
  );
}

export function allSlots(): AssetSlotDef[] {
  return registry.slots;
}

export function allFlavorSlotKinds() {
  return registry.flavorSlots;
}

export const aspectRatio = (d: AssetSlotDef): string => {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const g = gcd(d.width, d.height);
  return `${d.width / g}:${d.height / g}`;
};
