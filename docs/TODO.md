# TODO — what is left

**Generated file — do not edit by hand.** Regenerate with `npm run todo:doc`.

Counts as of the last run: **60 placeholder strings**,
**19 unfulfilled asset slots**, **7 unconfirmed claims**.

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

### `src/content/flavors/flavor-one.md`

- **L2** — SKU 1 flavor name
- **L5** — short flavor tagline
- **L6** — one or two sentences. Composition and taste, not effect.

### `src/content/flavors/flavor-three.md`

- **L2** — SKU 3 flavor name
- **L5** — short flavor tagline
- **L6** — one or two sentences. Composition and taste, not effect.

### `src/content/flavors/flavor-two.md`

- **L2** — SKU 2 flavor name
- **L5** — short flavor tagline
- **L6** — one or two sentences. Composition and taste, not effect.

### `src/data/claims.ts`

- **L126** — one sentence describing what is in the can. Composition only, no effect language.
- **L130** — caffeine source and amount, e.g. "150mg caffeine from green tea"
- **L131** — source detail, needed for any natural positioning
- **L135** — L-theanine amount and source
- **L139** — juice content, e.g. "X% real fruit juice"
- **L143** — sweetener approach, stated as composition
- **L149** — e.g. "No artificial colors"
- **L150** — e.g. "No artificial flavors"
- **L151** — carbohydrate/sugar statement, stated factually
- **L156** — caffeine per can disclosure, e.g. "Contains 150mg caffeine per 12 fl oz can."
- **L158** — standard category advisory. Confirm exact wording with counsel.

### `src/data/copy.ts`

- **L7** — ...
- **L79** — home meta title, under 60 chars
- **L80** — home meta description, under 155 chars
- **L82** — hero headline. Short. Sentence case.
- **L83** — one supporting sentence
- **L85** — brand story section heading
- **L87** — brand story paragraph 1
- **L88** — brand story paragraph 2
- **L97** — product meta title
- **L98** — product meta description
- **L101** — one or two sentences introducing the range
- **L106** — where to buy meta title
- **L107** — where to buy meta description
- **L118** — wholesale meta title
- **L119** — wholesale meta description
- **L122** — one paragraph aimed at category buyers and distributors
- **L132** — about meta title
- **L133** — about meta description
- **L137** — founder story paragraph
- **L138** — why this product exists paragraph
- **L139** — Colorado provenance paragraph
- **L145** — contact meta title
- **L146** — contact meta description
- **L158** — privacy policy. Must describe the email/ZIP capture and the form data retained.
- **L165** — terms of use

### `src/data/site.ts`

- **L73** — registered legal entity name
- **L74** — one-line tagline, sentence case, no filler
- **L83** — trade/wholesale inquiry address
- **L84** — general address
- **L85** — press address
- **L89** — business address for LocalBusiness JSON-LD
- **L94** — Cloudflare Web Analytics token

### `src/data/trade.ts`

- **L71** — channel 1, e.g. Natural grocery
- **L72** — channel 2, e.g. Independent markets
- **L73** — channel 3, e.g. Convenience
- **L91** — response commitment, e.g. "We reply within two business days."

## Photography and artwork

19 slots still need real files. Full shot list with dimensions and
direction is in [ASSETS.md](../ASSETS.md).

- `logo-wordmark`
- `logo-mark`
- `og-default`
- `home-hero-can`
- `home-story`
- `product-lineup`
- `about-founder`
- `about-colorado`
- `wholesale-case`
- `wholesale-shelf`
- `flavor-flavor-one-can-front`
- `flavor-flavor-one-can-angle`
- `flavor-flavor-one-ingredient-still`
- `flavor-flavor-three-can-front`
- `flavor-flavor-three-can-angle`
- `flavor-flavor-three-ingredient-still`
- `flavor-flavor-two-can-front`
- `flavor-flavor-two-can-angle`
- `flavor-flavor-two-ingredient-still`

## How to work through this

Everything above is a data or file drop — none of it needs a component change.

- Copy and product data: edit the files listed above.
- Photography: drop files into `src/assets/` named for the slot.
- Both: see [EDITING.md](EDITING.md) for which file controls what.

Run `npm run todo` for the raw grep, or `npm run todo:doc` to regenerate this file.
