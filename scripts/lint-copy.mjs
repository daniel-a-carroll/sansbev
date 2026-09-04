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
    .replace(/\s+/g, ' ');

const violations = [];

for (const file of htmlFiles) {
  const text = visibleText(readFileSync(file, 'utf8')).toLowerCase();
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

console.log(
  `lint-copy: ${htmlFiles.length} pages scanned, ${terms.length} terms checked, none present.`
);
