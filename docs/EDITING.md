# Editing this site

Written for you months from now, having forgotten all of it.

**The rule that makes everything else work: you should never need to edit a
component to change content.** Copy, product data, colors, and images all live
in data files. If you find yourself opening a `.astro` file to change a word, it
is in the wrong place — move it into a data file instead.

Everything below is "edit the file, commit, push." The site rebuilds and
redeploys itself.

---

## Which file do I edit?

| I want to change… | Edit this |
|---|---|
| Brand name, tagline, contact emails, business address | `src/data/site.ts` |
| **Take the site live (turn off noindex)** | `src/data/site.ts` → `launched: true` |
| Homepage, about, legal copy, page titles and meta descriptions | `src/data/copy.ts` |
| **Anything claiming what the product is or does** | `src/data/claims.ts` — read the header first |
| Wholesale page: what's sent on request, channels, certifications, response time | `src/data/trade.ts` |
| A flavor's name, ingredients, nutrition, UPC, color | `src/content/flavors/<name>.md` |
| Add or remove a flavor | Add/delete a file in `src/content/flavors/` |
| Stores that carry the product | `src/content/locations.yaml` |
| FAQ entries | `src/content/faq.yaml` |
| Press mentions | `src/content/press.yaml` |
| **Every color, font size, and spacing value** | `src/styles/tokens.css` |
| Which images the site expects | `src/data/asset-slots.json`, then `npm run assets:manifest` |
| Where form submissions go | `worker/submissions.ts` |
| Form fields and validation rules | `src/lib/form-schemas.ts` |

---

## Common jobs

### Add a store to "where to buy"

Open `src/content/locations.yaml` and add an entry. Only `name` is required.

```yaml
- id: natural-grocers-boulder
  name: Natural Grocers
  chain: Natural Grocers
  type: natural-grocery
  address1: 1275 Alpine Ave
  city: Boulder
  state: CO
  zip: "80304"
  lat: 40.0274
  lng: -105.2519
```

`id` must be unique and stable — it becomes that store's anchor link. Add `lat`
and `lng` and the store appears on the Colorado map; leave them out and it still
appears in the list.

The page currently shows a pre-launch message because the file is empty. The
first entry you add switches it automatically to the map-and-list layout. You do
not need to change anything else.

### Fill in a flavor

Open the flavor's file in `src/content/flavors/`. Frontmatter above the `---` is
structured data; the body below is prose that renders on the flavor page.

Every field is optional. Add what you know, leave out what you don't — sections
with no data hide themselves rather than rendering empty. The nutrition panel
only appears once at least three nutrients are declared, because a panel showing
just a calorie count looks worse than no panel.

**Do not enter Percent Daily Values.** Enter the amounts; the percentages are
calculated from the FDA reference table in `src/lib/nutrition.ts`. This is
deliberate — it means the panel cannot go stale when an amount or serving size
changes.

### Rename a flavor

Rename the `.md` file, then rename its asset files in `src/assets/` to match the
new slot names (`flavor-<new-id>-can-front.png`, etc). Run
`npm run assets:manifest` to update the shot list.

### Add real photography

Drop the file into `src/assets/` named exactly for its slot:

```
src/assets/home-hero-can.png
src/assets/flavor-citrus-can-front.png
```

That is the entire operation. No import, no code change. The build generates a
responsive `srcset`, converts to WebP, and replaces the placeholder. Because
placeholders already reserve the exact final dimensions, nothing on the page
moves when the real image appears.

`ASSETS.md` is the full shot list with dimensions and direction for each slot.

### Re-skin the site

`src/styles/tokens.css` is the only file. Change the six color values at the top
and the whole site follows.

Two rules if you change colors:

- **Check contrast.** Body text needs 4.5:1 against its background. The file
  documents the current ratios; if you change a value, verify the new one.
- `--c-sunbreak` is a field color only — nothing smaller than 24px sits on it.
  `--c-ember` is its text-safe sibling. Keep that split or the accent will fail
  contrast on links and buttons.

### Publish a sell sheet publicly

Currently it is request-gated: buyers use the form and you send the PDF. To make
it a direct download instead, put the PDF in `public/` and set:

```ts
sellSheet: { mode: 'public', publicPath: '/sansbev-sell-sheet.pdf' }
```

in `src/data/trade.ts`. The page swaps from the request state to a download link.

### Take the site live

1. Work through `docs/TODO.md` until the blocking list is clear.
2. Set the Worker secrets (see [README](../README.md)) — without them, form
   submissions are logged and lost.
3. Set `launched: true` in `src/data/site.ts`.

That last flag turns off site-wide `noindex`, opens up `robots.txt`, and starts
emitting JSON-LD structured data. Nothing else needs to change.

---

## Things that will bite you

**Placeholder text is greppable on purpose.** Everything unwritten reads
`[[PLACEHOLDER — description]]`. Run `npm run todo` for the list, or
`npm run todo:doc` to regenerate `docs/TODO.md`.

**The build fails if prohibited claims language ships.** `npm run build` runs a
check against the `prohibitedTerms` list in `src/data/claims.ts` and fails on a
match. If it stops you, either rewrite the copy or — only if counsel has cleared
the claim — remove that term from the list deliberately. Do not delete the check.

**Unconfirmed claims do not render.** Points in `claims.ts` with
`confirmed: false` are hidden from the site. Flip to `true` only once the
finished formula supports the statement.

**Empty is a valid state everywhere.** No component renders an empty heading, a
dangling label, or `undefined`. If you see one, that is a bug, not something you
need to fill in to hide.

**Local dev needs Node 20.** Wrangler 4.129+ requires Node 22; this project pins
wrangler 4.86 so it runs on Node 20. If you upgrade Node to 22, you can upgrade
wrangler and raise `compatibility_date` in `wrangler.jsonc`.
