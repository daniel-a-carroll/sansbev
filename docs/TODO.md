# TODO — what is left

**Generated file — do not edit by hand.** Regenerate with `npm run todo:doc`.

Counts as of the last run: **21 placeholder strings**,
**15 unfulfilled asset slots**, **6 unconfirmed claims**.

## Blocking before launch

These are decisions and inputs only you can supply. Ordered by what blocks the most.

1. **Resolve the caffeine figure: site says 200mg, the can art says 160MG**
   FDA treats this site as labeling, so the site and the physical can must state the same number. They currently do not. Update the artwork or bring the site figure back down.

2. **Confirm the juice percentage in the finished formula**
   Gates the nutrient-content claim. It is the food-group leg of the FDA rule; low sugar, sodium and fat alone do not qualify. See src/data/claims.ts.

3. **Confirm L-theanine sourcing, natural or synthetic**
   Decides whether any "natural" positioning is defensible. Commonly synthesized rather than tea-extracted.

4. **Legal review of src/data/claims.ts, including the About page language**
   FDA treats this site as labeling. Review that one file, not the whole repo. It records which phrases were removed from the founder story and why.

5. **Legal review of the privacy policy and terms**
   Both are written and accurate about what the site does, but neither has been reviewed. Each carries a REVIEW REQUIRED marker in src/data/copy.ts.

6. **Write the founder biography and production location on the About page**
   The story is written; the specifics only you have are still marked. Buyers read the About page as evidence of a real operator.

7. **Set the three contact email addresses in src/data/site.ts**
   The contact page falls back to a form-only message until they exist.

8. **Set RESEND_API_KEY, NOTIFY_FROM, NOTIFY_TO as Wrangler secrets**
   Without them the Worker logs submissions instead of delivering them. Every lead is silently lost.

9. **Flip `launched` to true in src/data/site.ts**
   The entire site is noindex and robots.txt disallows everything until you do. This is the last step before going live.

## Placeholder copy and data

### `src/data/claims.ts`

- **L151** — one sentence describing what is in the can. Composition only, no effect language.
- **L175** — L-theanine amount and source. Sourcing still open.
- **L179** — juice percentage. Also the open question for the "healthy" claim.
- **L183** — sweetener approach, stated as composition
- **L189** — e.g. "No artificial colors"
- **L190** — e.g. "No artificial flavors"
- **L191** — carbohydrate/sugar statement, stated factually

### `src/data/copy.ts`

- **L15** — ...
- **L167** — launch timing, and whether you are taking orders yet. One sentence.
- **L190** — where specifically, and where the product is produced. Buyers ask this early, so answer it plainly here.
- **L213** — date this was last reviewed
- **L243** — the address people should write to in order to be removed. Set the contact addresses in src/data/site.ts, then name the general one here.
- **L252** — REVIEW REQUIRED. This policy was written to describe accurately what the site actually does, but it has not been reviewed by counsel and does not attempt to address state-specific privacy obligations. Have it reviewed before launch.
- **L264** — date this was last reviewed
- **L299** — REVIEW REQUIRED. These terms are a plain-language starting point, not a complete or jurisdiction-specific agreement. They deliberately omit warranty disclaimers, limitation of liability, and governing law, all of which counsel should decide. Have this reviewed before launch.

### `src/data/site.ts`

- **L77** — registered legal entity name
- **L88** — trade/wholesale inquiry address
- **L89** — general address
- **L90** — press address
- **L94** — business address for LocalBusiness JSON-LD
- **L99** — Cloudflare Web Analytics token

## Photography and artwork

15 slots still need real files. Full shot list with dimensions and
direction is in [ASSETS.md](../ASSETS.md).

- `logo-wordmark`
- `logo-mark`
- `og-default`
- `home-story`
- `product-lineup`
- `about-founder`
- `about-colorado`
- `wholesale-case`
- `wholesale-shelf`
- `flavor-cranberry-can-angle`
- `flavor-cranberry-ingredient-still`
- `flavor-lime-can-angle`
- `flavor-lime-ingredient-still`
- `flavor-pineapple-can-angle`
- `flavor-pineapple-ingredient-still`

## How to work through this

Everything above is a data or file drop — none of it needs a component change.

- Copy and product data: edit the files listed above.
- Photography: drop files into `src/assets/` named for the slot.
- Both: see [EDITING.md](EDITING.md) for which file controls what.

Run `npm run todo` for the raw grep, or `npm run todo:doc` to regenerate this file.
