#!/usr/bin/env node
/**
 * Regenerates ASSETS.md from src/data/asset-slots.json.
 *
 * ASSETS.md is a build artifact, not a hand-edited document — edit the JSON
 * and re-run `npm run assets:manifest`. Generating it means the shot list a
 * photographer works from can never drift from what the site actually renders.
 *
 * Also reports which slots are already fulfilled by files in src/assets/.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const registry = JSON.parse(
  readFileSync(join(root, 'src/data/asset-slots.json'), 'utf8')
);

// Flavor slot names are derived from the actual flavor entries, so adding a
// SKU automatically adds its shots to the manifest.
const flavorsDir = join(root, 'src/content/flavors');
const flavorIds = existsSync(flavorsDir)
  ? readdirSync(flavorsDir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => basename(f, '.md'))
      .sort()
  : [];

const assetsDir = join(root, 'src/assets');
const present = new Set(
  existsSync(assetsDir)
    ? readdirSync(assetsDir, { recursive: true })
        .map(String)
        .filter((f) => extname(f))
        .map((f) => basename(f, extname(f)))
    : []
);

const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const ratio = (w, h) => {
  const g = gcd(w, h);
  return `${w / g}:${h / g}`;
};

const status = (slot) => (present.has(slot) ? 'have' : 'NEEDED');

const row = (s) =>
  `| \`${s.slot}\` | ${status(s.slot)} | ${s.width}×${s.height} | ${ratio(
    s.width,
    s.height
  )} | ${s.format.toUpperCase()} | ${s.where} | ${s.note} |`;

const header = [
  '| Slot | Status | Dimensions | Ratio | Format | Appears | What the shot should contain |',
  '|---|---|---|---|---|---|---|',
].join('\n');

const flavorRows = flavorIds.flatMap((id) =>
  registry.flavorSlots.map((f) => ({
    ...f,
    slot: `flavor-${id}-${f.kind}`,
    where: `${f.where} (${id})`,
  }))
);

const all = [...registry.slots, ...flavorRows];
const needed = all.filter((s) => !present.has(s.slot)).length;

const out = `# Asset manifest

**Generated file — do not edit by hand.** Source: \`src/data/asset-slots.json\`.
Regenerate with \`npm run assets:manifest\`.

This is the shot list. Hand it to a photographer or designer as-is.

## How to fulfil a slot

Drop the file at \`src/assets/<slot-name>.<ext>\` using the exact slot name as
the filename. Nothing else — no code change, no import, no component edit. The
\`<Asset>\` component picks it up at build time, generates a responsive
\`srcset\`, and replaces the placeholder. Because placeholders already reserve
the exact final dimensions, there is no layout shift when it swaps.

Deliver at the listed dimensions or larger, at the exact aspect ratio. Larger is
fine; the build downscales. Wrong ratio is not fine; it will letterbox.

**${all.length - needed} of ${all.length} slots fulfilled. ${needed} still needed.**

## Site-wide and page slots

${header}
${registry.slots.map(row).join('\n')}

## Per-flavor slots

One set per entry in \`src/content/flavors/\`. Flavor IDs are the markdown
filenames, so these are currently placeholder IDs and the slot names will change
when the real SKUs are named. Do not commission these shots until the SKUs are
final.

${
  flavorRows.length
    ? `${header}\n${flavorRows.map(row).join('\n')}`
    : '_No flavor entries yet._'
}

## Notes for whoever shoots this

- **No stock photography, no AI-generated imagery.** Every slot is either a real
  photograph of the real product or it stays a placeholder.
- Product shots need transparent backgrounds (PNG) so they can sit on the
  brand's color fields without a visible box around them.
- \`home-hero-can\` is the largest image on the site and the LCP element. It is
  the one shot worth paying the most for.
- \`wholesale-shelf\` should not be staged. It is only persuasive to a category
  buyer if it is a genuine shelf placement.
`;

writeFileSync(join(root, 'ASSETS.md'), out);
console.log(
  `ASSETS.md written — ${all.length} slots, ${needed} still needed.`
);
