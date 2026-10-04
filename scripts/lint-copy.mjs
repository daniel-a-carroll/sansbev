#!/usr/bin/env node
/**
 * Build-time claims guard.
 *
 * Scans the built HTML for terms listed in `prohibitedTerms` in
 * src/data/claims.ts and fails the build if any of them shipped.
 *
 * This exists because FDA treats this site as product labeling, and the most
 * likely way a non-compliant claim reaches production is not a considered
 * decision — it is someone writing a natural-sounding sentence months from now
 * and nobody noticing. A grep in CI is a cheap backstop for that.
 *
 * It is NOT a substitute for legal review. Clearing this check means only that
 * the specific words on the list are absent.
 *
 * Run automatically as part of `npm run build`.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');

if (!existsSync(distDir)) {
  console.error('lint-copy: no dist/ directory. Run the build first.');
  process.exit(1);
}

// Read the term list straight out of claims.ts rather than duplicating it —
// the source of truth for what is prohibited is the file counsel reviews.
const claimsSource = readFileSync(join(root, 'src/data/claims.ts'), 'utf8');
const listMatch = claimsSource.match(/prohibitedTerms:\s*\[([\s\S]*?)\]/);

if (!listMatch) {
  console.error('lint-copy: could not find prohibitedTerms in src/data/claims.ts.');
  process.exit(1);
}

const terms = [...listMatch[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);

// Copy baked into an image is invisible to an HTML scan, so every published
// image carrying words is transcribed into `imageClaims` in claims.ts. Those
// transcripts are checked exactly like rendered text, which puts image copy
// back inside the guard. See the header of src/data/claims.ts.
const imageBlock = claimsSource.match(/imageClaims:\s*\[([\s\S]*?)\n  \],/);
const imageSources = [];
if (imageBlock) {
  const assetNames = [...imageBlock[1].matchAll(/asset:\s*'([^']+)'/g)].map((m) => m[1]);
  for (const [, body] of imageBlock[1].matchAll(/transcript:\s*\[([\s\S]*?)\]/g)) {
    const lines = [...body.matchAll(/(?:'([^']*)'|"([^"]*)")/g)].map((m) => m[1] ?? m[2]);
    imageSources.push({ asset: assetNames[imageSources.length] ?? 'unknown', lines });
  }
}

const htmlFiles = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (extname(full) === '.html') htmlFiles.push(full);
  }
};
walk(distDir);

// Strip tags, comments, and script/style bodies: a term inside a class name or
// a code comment is not a claim made to a reader.
const visibleText = (html) =>
  html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    // Decode the entities that could smuggle a forbidden character past the
    // character check below.
    .replace(/&mdash;|&#8212;|&#x2014;/gi, '\u2014')
    .replace(/&trade;|&#8482;|&#x2122;/gi, '\u2122')
    .replace(/&reg;|&#174;|&#xae;/gi, '\u00ae')
    .replace(/&excl;|&#33;|&#x21;/gi, '!')
    .replace(/\s+/g, ' ');

const violations = [];

// Characters the brand never uses in reader-facing text. Word-boundary
// matching cannot see these, so they are checked separately. Exclamation marks
// are allowed only inside code-like contexts, which visibleText() strips.
const forbiddenChars = [
  { char: '\u2014', name: 'em dash' },
  { char: '\u2122', name: 'trademark symbol (nothing is registered)' },
  { char: '\u00ae', name: 'registered symbol (nothing is registered)' },
  { char: '!', name: 'exclamation mark' },
];

// 1. Transcribed image copy.
for (const { asset, lines } of imageSources) {
  const text = lines.join(' ').toLowerCase();
  for (const term of terms) {
    const pattern = new RegExp(
      `\\b${term.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`
    );
    const match = pattern.exec(text);
    if (match) {
      const start = Math.max(0, match.index - 60);
      violations.push({
        file: `image: ${asset} (transcribed in src/data/claims.ts)`,
        term,
        context: `...${text.slice(start, match.index + term.length + 60).trim()}...`,
      });
    }
  }
}

// 2. Rendered page text.
for (const file of htmlFiles) {
  const raw = visibleText(readFileSync(file, 'utf8'));
  for (const { char, name } of forbiddenChars) {
    const at = raw.indexOf(char);
    if (at !== -1) {
      violations.push({
        file: file.replace(`${root}/`, ''),
        term: name,
        context: `…${raw.slice(Math.max(0, at - 60), at + 60).trim()}…`,
      });
    }
  }
  const text = raw.toLowerCase();
  for (const term of terms) {
    const pattern = new RegExp(`\\b${term.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
    const match = pattern.exec(text);
    if (match) {
      const start = Math.max(0, match.index - 60);
      violations.push({
        file: file.replace(`${root}/`, ''),
        term,
        context: `…${text.slice(start, match.index + term.length + 60).trim()}…`,
      });
    }
  }
}

if (violations.length > 0) {
  console.error('\nlint-copy: prohibited claims language found in built output.\n');
  for (const v of violations) {
    console.error(`  ${v.file}`);
    console.error(`    term:    "${v.term}"`);
    console.error(`    context: ${v.context}\n`);
  }
  console.error(
    'These terms are listed in prohibitedTerms in src/data/claims.ts.\n' +
      'Either rewrite the copy, or — if the claim is genuinely substantiated and\n' +
      'cleared by counsel — remove the term from that list deliberately.\n'
  );
  process.exit(1);
}

const imageLineCount = imageSources.reduce((n, i) => n + i.lines.length, 0);
console.log(
  `lint-copy: ${htmlFiles.length} pages and ${imageSources.length} transcribed image(s) ` +
    `(${imageLineCount} lines) scanned, ${terms.length} terms checked, none present.`
);
