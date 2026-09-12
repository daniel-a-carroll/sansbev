# TODO — what is left

**Generated file — do not edit by hand.** Regenerate with `npm run todo:doc`.

Counts as of the last run: **21 placeholder strings**,
**14 unfulfilled asset slots**, **5 unconfirmed claims**.

## Blocking before launch

These are decisions and inputs only you can supply. Ordered by what blocks the most.

1. **TRADEMARK: confirm clearance on the SANS name before commissioning anything else name-dependent**
   There are at least three existing beverage users in the same class. The wordmark SVG and favicon are ALREADY IN THE REPO and live on the site, so this is not a clean slate: if clearance fails, both are wasted and the domain, the OG image and any printed material follow. Commission nothing further until it is confirmed.

2. **Supply the competitor label photographs**
   Sections 2 and 3 of the landing page are the two highest-converting sections and both are currently gray placeholders. Needed: Celsius ingredient panel, and CONTAINS 0% JUICE visible on Celsius, Alani Nu and Kirkland Signature. Photographs, never retyped: their own label is evidence, a transcription is our word against theirs.

3. **Regulatory review of the caffeine and L-theanine section**
   The one section on the site that describes what an ingredient does. On a conventional food a structure/function claim must derive from nutritive value, and L-theanine is not generally treated as nutritive. It is written as research about the two compounds, explicitly not about this drink, but it needs sign-off before launch.

4. **Verify and paste links for the five research citations**
   The citations in src/data/landing.ts are real and findable, but no URLs were invented for them. Check each resolves, then paste the DOI or PubMed link into the url field. A broken or wrong link on the one section asking for trust is worse than no link.

5. **Confirm the juice percentage and sugar figures against the finished formula**
   The landing page states 20% juice, about 10g sugar all from fruit, 0g added, about 40 calories. These are now published claims, and 0g added sugar is a regulated nutrient content claim needing the finished Nutrition Facts panel behind it.

6. **Have counsel review the brand board copy now that it is published**
   The board on the product page carries five effect-claim lines the written copy avoids: "clean energy that moves you forward", "real ingredients. clean energy. no compromises.", "fuel what matters", "zero artificial anything", "made for real life". They are transcribed in imageClaims in src/data/claims.ts. If they do not clear, re-export the board without them.

7. **Have counsel review "Calm focus" on the brand board before launch**
   It is a structure/function claim about a mental state, sitting directly above "400 MG L-THEANINE", which ties a claimed effect to a named ingredient at a named dose. On a conventional food that construction needs substantiation, and supplement-industry precedent does not transfer. The most exposed line on the site.

8. **Confirm "0 added sugar" against the finished Nutrition Facts panel**
   A regulated nutrient content claim with a codified definition, printed on the brand board. Plausible, since nothing in the list is a sweetener, but the juice blends now include apple and a reviewer will read the two together. Needs the finished panel.

9. **Fix the pineapple can ingredient panel to match the other two**
   Pineapple is set in ALL CAPS while lime and cranberry use sentence case. Cosmetic, but a buyer notices it on a shelf and the printer will not fix it for you.

10. **Get the organic certification records on file**
   The cans declare "Organic ... Juice". Organic is USDA-regulated, not a descriptor. Labelling an uncertified ingredient organic is a federal violation, not a marketing risk.

11. **Confirm the juice percentage in the finished formula**
   Still the open question for any nutrient-content claim. It is the food-group leg of the FDA rule; low sugar, sodium and fat alone do not qualify.

12. **Have counsel review the 400mg L-theanine dose alongside the 220mg caffeine**
   Both are high for the category and sit together on the front of the can. A formulation call, not a labeling one, but reviewers will stop on it.

13. **Legal review of src/data/claims.ts, including the About page language**
   FDA treats this site as labeling. Review that one file, not the whole repo. It records which phrases were removed from the founder story and why.

14. **Legal review of the privacy policy and terms**
   Both are written and accurate about what the site does, but neither has been reviewed. Each carries a REVIEW REQUIRED marker in src/data/copy.ts.

15. **Write the founder biography and production location on the About page**
   The story is written; the specifics only you have are still marked.

16. **Set the three contact email addresses in src/data/site.ts**
   The contact page falls back to a form-only message until they exist.

17. **Set RESEND_API_KEY, NOTIFY_FROM, NOTIFY_TO as Wrangler secrets**
   Without them the Worker logs submissions instead of delivering them. Every lead is silently lost.

18. **Flip `launched` to true in src/data/site.ts**
   The entire site is noindex and robots.txt disallows everything until you do. This is the last step before going live.

## Placeholder copy and data

### `src/data/claims.ts`

- **L270** — one sentence describing what is in the can. Composition only, no effect language.
- **L307** — juice percentage. Also the open question for the "healthy" claim.
- **L311** — sweetener approach, stated as composition
- **L317** — e.g. "No artificial colors"
- **L318** — e.g. "No artificial flavors"
- **L319** — carbohydrate/sugar statement, stated factually

### `src/data/copy.ts`

- **L15** — ...
- **L199** — launch timing, and whether you are taking orders yet. One sentence.
- **L222** — where specifically, and where the product is produced. Buyers ask this early, so answer it plainly here.
- **L245** — date this was last reviewed
- **L275** — the address people should write to in order to be removed. Set the contact addresses in src/data/site.ts, then name the general one here.
- **L284** — REVIEW REQUIRED. This policy was written to describe accurately what the site actually does, but it has not been reviewed by counsel and does not attempt to address state-specific privacy obligations. Have it reviewed before launch.
- **L296** — date this was last reviewed
- **L331** — REVIEW REQUIRED. These terms are a plain-language starting point, not a complete or jurisdiction-specific agreement. They deliberately omit warranty disclaimers, limitation of liability, and governing law, all of which counsel should decide. Have this reviewed before launch.

### `src/data/landing.ts`

- **L173** — confirm the caption against the photograph once supplied.

### `src/data/site.ts`

- **L77** — registered legal entity name
- **L88** — trade/wholesale inquiry address
- **L89** — general address
- **L90** — press address
- **L94** — business address for LocalBusiness JSON-LD
- **L99** — Cloudflare Web Analytics token

## Photography and artwork

14 slots still need real files. Full shot list with dimensions and
direction is in [ASSETS.md](../ASSETS.md).

- `logo-mark`
- `og-default`
- `home-story`
- `about-founder`
- `about-colorado`
- `wholesale-case`
- `wholesale-shelf`
- `competitor-celsius-panel`
- `competitor-celsius-zero-juice`
- `competitor-alani-zero-juice`
- `competitor-kirkland-zero-juice`
- `flavor-cranberry-can-angle`
- `flavor-lime-can-angle`
- `flavor-pineapple-can-angle`

## How to work through this

Everything above is a data or file drop — none of it needs a component change.

- Copy and product data: edit the files listed above.
- Photography: drop files into `src/assets/` named for the slot.
- Both: see [EDITING.md](EDITING.md) for which file controls what.

Run `npm run todo` for the raw grep, or `npm run todo:doc` to regenerate this file.
