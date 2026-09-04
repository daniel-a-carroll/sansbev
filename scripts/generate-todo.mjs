#!/usr/bin/env node
/**
 * Regenerates docs/TODO.md — the punch list of everything still unwritten,
 * unsupplied, or unshot.
 *
 * Generated rather than hand-kept, for the same reason ASSETS.md is: a
 * hand-maintained checklist on a project you return to after months away is a
 * checklist that lies. Run `npm run todo:doc` any time.
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, basename, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/* --- 1. Placeholder strings ---------------------------------------------- */

const sourceFiles = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (['.ts', '.astro', '.md', '.yaml', '.json'].includes(extname(full)))
      sourceFiles.push(full);
  }
};
walk(join(root, 'src'));

const placeholders = [];
for (const file of sourceFiles) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    const match = line.match(/\[\[PLACEHOLDER\s*—?\s*([^\]]*)\]\]/);
    if (match) {
      placeholders.push({
        file: relative(root, file),
        line: i + 1,
        what: match[1].trim() || '(unlabelled)',
      });
    }
  });
}

const byFile = new Map();
for (const p of placeholders) {
  byFile.set(p.file, [...(byFile.get(p.file) ?? []), p]);
}

/* --- 2. Unfulfilled asset slots ------------------------------------------ */

const registry = JSON.parse(
  readFileSync(join(root, 'src/data/asset-slots.json'), 'utf8')
);
const flavorsDir = join(root, 'src/content/flavors');
const flavorIds = existsSync(flavorsDir)
  ? readdirSync(flavorsDir).filter((f) => f.endsWith('.md')).map((f) => basename(f, '.md'))
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
const allSlots = [
  ...registry.slots.map((s) => s.slot),
  ...flavorIds.flatMap((id) => registry.flavorSlots.map((f) => `flavor-${id}-${f.kind}`)),
];
const missingSlots = allSlots.filter((s) => !present.has(s));

/* --- 3. Unconfirmed claims ----------------------------------------------- */

const claimsSource = readFileSync(join(root, 'src/data/claims.ts'), 'utf8');
const unconfirmed = (claimsSource.match(/confirmed:\s*false/g) ?? []).length;

/* --- 4. Blocking decisions ----------------------------------------------- */

const decisions = [
  {
    item: 'Confirm the juice percentage in the finished formula',
    why: 'Decides whether "healthy" is legally usable. It is the food-group leg of the FDA rule — low sugar/sodium/fat alone does not qualify. See src/data/claims.ts.',
  },
  {
    item: 'Confirm L-theanine sourcing (natural vs synthetic)',
    why: 'Decides whether any "natural" positioning is defensible. Commonly synthesized rather than tea-extracted.',
  },
  {
    item: 'Legal review of src/data/claims.ts',
    why: 'FDA treats this site as labeling. Review that one file, not the whole repo.',
  },
  {
    item: 'Write the privacy policy',
    why: 'It must accurately describe the email/ZIP capture. Currently placeholder.',
  },
  {
    item: 'Set the three contact email addresses in src/data/site.ts',
    why: 'The contact page falls back to a form-only message until they exist.',
  },
  {
    item: 'Set RESEND_API_KEY, NOTIFY_FROM, NOTIFY_TO as Wrangler secrets',
    why: 'Without them the Worker logs submissions instead of delivering them. Every lead is silently lost.',
  },
  {
    item: 'Flip `launched` to true in src/data/site.ts',
    why: 'The entire site is noindex and robots.txt disallows everything until you do. This is the last step before going live.',
  },
];

/* --- Write --------------------------------------------------------------- */

const section = (title, body) => `\n## ${title}\n\n${body}\n`;

const out = `# TODO — what is left

**Generated file — do not edit by hand.** Regenerate with \`npm run todo:doc\`.

Counts as of the last run: **${placeholders.length} placeholder strings**,
**${missingSlots.length} unfulfilled asset slots**, **${unconfirmed} unconfirmed claims**.
${section(
  'Blocking before launch',
  `These are decisions and inputs only you can supply. Ordered by what blocks the most.\n\n${decisions
    .map((d, i) => `${i + 1}. **${d.item}**\n   ${d.why}`)
    .join('\n\n')}`
)}${section(
  'Placeholder copy and data',
  byFile.size === 0
    ? '_None. Every placeholder string has been replaced._'
    : [...byFile.entries()]
        .sort()
        .map(
          ([file, items]) =>
            `### \`${file}\`\n\n${items
              .map((p) => `- **L${p.line}** — ${p.what}`)
              .join('\n')}`
        )
        .join('\n\n')
)}${section(
  'Photography and artwork',
  missingSlots.length === 0
    ? '_All asset slots fulfilled._'
    : `${missingSlots.length} slots still need real files. Full shot list with dimensions and\ndirection is in [ASSETS.md](../ASSETS.md).\n\n${missingSlots
        .map((s) => `- \`${s}\``)
        .join('\n')}`
)}${section(
  'How to work through this',
  `Everything above is a data or file drop — none of it needs a component change.\n\n- Copy and product data: edit the files listed above.\n- Photography: drop files into \`src/assets/\` named for the slot.\n- Both: see [EDITING.md](EDITING.md) for which file controls what.\n\nRun \`npm run todo\` for the raw grep, or \`npm run todo:doc\` to regenerate this file.`
)}`;

writeFileSync(join(root, 'docs/TODO.md'), out);
console.log(
  `docs/TODO.md written — ${placeholders.length} placeholders, ${missingSlots.length} missing assets, ${unconfirmed} unconfirmed claims.`
);
