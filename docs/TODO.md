# TODO — what is left

**Generated file — do not edit by hand.** Regenerate with `npm run todo:doc`.

Counts as of the last run: **52 placeholder strings**,
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

### `src/content/faq.yaml`

- **L15** — how much caffeine is in a can?
- **L16** — factual amount and source. Composition only.
- **L21** — what is the case pack and MOQ?
- **L22** — point at the specs table or state directly

### `src/content/flavors/cranberry.md`

- **L5** — short flavor tagline. The line on the can is brand-level, not per-flavor.
- **L6** — one or two sentences. Composition and taste, not effect.

### `src/content/flavors/lime.md`

- **L5** — short flavor tagline. The line on the can is brand-level, not per-flavor.
- **L6** — one or two sentences. Composition and taste, not effect.

### `src/content/flavors/pineapple.md`

- **L5** — short flavor tagline. The line on the can is brand-level, not per-flavor.
- **L6** — one or two sentences. Composition and taste, not effect.

### `src/data/claims.ts`

- **L126** — one sentence describing what is in the can. Composition only, no effect language.
- **L145** — L-theanine amount and source. Sourcing still open.
- **L149** — juice percentage. Also the open question for the "healthy" claim.
- **L153** — sweetener approach, stated as composition
- **L159** — e.g. "No artificial colors"
- **L160** — e.g. "No artificial flavors"
- **L161** — carbohydrate/sugar statement, stated factually
- **L168** — standard category advisory. Confirm exact wording with counsel.

### `src/data/copy.ts`

- **L7** — ...
- **L79** — home meta title, under 60 chars
- **L80** — home meta description, under 155 chars
- **L87** — one supporting sentence. Composition only; see src/data/claims.ts before writing.
- **L89** — brand story section heading
- **L91** — brand story paragraph 1
- **L92** — brand story paragraph 2
- **L101** — product meta title
- **L102** — product meta description
- **L105** — one or two sentences introducing the range
- **L110** — where to buy meta title
- **L111** — where to buy meta description
- **L122** — wholesale meta title
- **L123** — wholesale meta description
- **L126** — one paragraph aimed at category buyers and distributors
- **L136** — about meta title
- **L137** — about meta description
- **L141** — founder story paragraph
- **L142** — why this product exists paragraph
- **L143** — Colorado provenance paragraph
- **L149** — contact meta title
- **L150** — contact meta description
- **L162** — privacy policy. Must describe the email/ZIP capture and the form data retained.
- **L169** — terms of use

### `src/data/site.ts`

- **L77** — registered legal entity name
- **L88** — trade/wholesale inquiry address
- **L89** — general address
- **L90** — press address
- **L94** — business address for LocalBusiness JSON-LD
- **L99** — Cloudflare Web Analytics token

### `src/data/trade.ts`

- **L71** — channel 1, e.g. Natural grocery
- **L72** — channel 2, e.g. Independent markets
- **L73** — channel 3, e.g. Convenience
- **L91** — response commitment, e.g. "We reply within two business days."

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
