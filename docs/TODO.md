# TODO — what is left

**Generated file — do not edit by hand.** Regenerate with `npm run todo:doc`.

Counts as of the last run: **22 placeholder strings**,
**15 unfulfilled asset slots**, **6 unconfirmed claims**.

## Blocking before launch

These are decisions and inputs only you can supply. Ordered by what blocks the most.

1. **Confirm the juice percentage in the finished formula**
   Decides whether "healthy" is legally usable. It is the food-group leg of the FDA rule — low sugar/sodium/fat alone does not qualify. See src/data/claims.ts.

2. **Confirm L-theanine sourcing (natural vs synthetic)**
   Decides whether any "natural" positioning is defensible. Commonly synthesized rather than tea-extracted.

3. **Legal review of src/data/claims.ts**
   FDA treats this site as labeling. Review that one file, not the whole repo.

4. **Write the privacy policy**
   It must accurately describe the email/ZIP capture. Currently placeholder.

5. **Set the three contact email addresses in src/data/site.ts**
   The contact page falls back to a form-only message until they exist.

6. **Set RESEND_API_KEY, NOTIFY_FROM, NOTIFY_TO as Wrangler secrets**
   Without them the Worker logs submissions instead of delivering them. Every lead is silently lost.

7. **Flip `launched` to true in src/data/site.ts**
   The entire site is noindex and robots.txt disallows everything until you do. This is the last step before going live.

## Placeholder copy and data

### `src/data/claims.ts`

- **L126** — one sentence describing what is in the can. Composition only, no effect language.
- **L150** — L-theanine amount and source. Sourcing still open.
- **L154** — juice percentage. Also the open question for the "healthy" claim.
- **L158** — sweetener approach, stated as composition
- **L164** — e.g. "No artificial colors"
- **L165** — e.g. "No artificial flavors"
- **L166** — carbohydrate/sugar statement, stated factually

### `src/data/copy.ts`

- **L13** — ...
- **L154** — launch timing, and whether you are taking orders yet. One sentence.
- **L170** — founder story. Who started SANS, when, and what you were doing before. Two or three specific sentences. A category buyer reads this as evidence that there is a real operator behind the brand, so specifics matter more than polish.
- **L172** — where specifically, and where the product is produced. Buyers ask this early; answer it plainly here.
- **L195** — date this was last reviewed
- **L225** — the address people should write to in order to be removed. Set the contact addresses in src/data/site.ts, then name the general one here.
- **L234** — REVIEW REQUIRED. This policy was written to describe accurately what the site actually does, but it has not been reviewed by counsel and does not attempt to address state-specific privacy obligations. Have it reviewed before launch.
- **L246** — date this was last reviewed
- **L281** — REVIEW REQUIRED. These terms are a plain-language starting point, not a complete or jurisdiction-specific agreement. They deliberately omit warranty disclaimers, limitation of liability, and governing law, all of which counsel should decide. Have this reviewed before launch.

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
