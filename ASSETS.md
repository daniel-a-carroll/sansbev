# Asset manifest

**Generated file — do not edit by hand.** Source: `src/data/asset-slots.json`.
Regenerate with `npm run assets:manifest`.

This is the shot list. Hand it to a photographer or designer as-is.

## How to fulfil a slot

Drop the file at `src/assets/<slot-name>.<ext>` using the exact slot name as
the filename. Nothing else — no code change, no import, no component edit. The
`<Asset>` component picks it up at build time, generates a responsive
`srcset`, and replaces the placeholder. Because placeholders already reserve
the exact final dimensions, there is no layout shift when it swaps.

Deliver at the listed dimensions or larger, at the exact aspect ratio. Larger is
fine; the build downscales. Wrong ratio is not fine; it will letterbox.

**8 of 18 slots fulfilled. 10 still needed.**

## Site-wide and page slots

| Slot | Status | Dimensions | Ratio | Format | Appears | What the shot should contain |
|---|---|---|---|---|---|---|
| `logo-wordmark` | have | 450×200 | 9:4 | SVG | Site header, footer | FULFILLED. Single-path SVG with fill="currentColor", so CSS recolors it: ink on cream in the header, cream on the dark bands. Dimensions match the file's own viewBox (450x200) so nothing distorts. The served copy has the C2PA content-credential metadata stripped (44% of the original file, never displayed, fetched on every page); the untouched original with its credentials is kept at assets/logo-wordmark-original.svg. |
| `logo-mark` | NEEDED | 512×512 | 1:1 | SVG | Favicon, app icons, social profile | Square standalone mark, no wordmark, legible at 32px. |
| `og-default` | NEEDED | 1200×630 | 40:21 | PNG | Open Graph / social preview for any page without its own image | Brand lockup on a flat field, ideally the cranberry can on paper. Keep text large; this renders small in feeds. |
| `brand-board` | have | 1774×887 | 2:1 | PNG | Wholesale page, full-bleed under the intro | FULFILLED. Second-generation board: three cans in a styled fruit scene, with the positioning copy down both sides. Lives full-bleed on the WHOLESALE page, not the product page: it is a poster carrying its own logo, headline and tagline, so nesting it in a page that already has all three read as a page within a page. IT CARRIES CLAIM COPY IN THE PIXELS, including the structure/function claims "Natural energy" and "Calm focus" and the regulated nutrient content claim "0 added sugar". Every line is transcribed into imageClaims in src/data/claims.ts and the build lint scans that transcript. IF YOU REPLACE THIS IMAGE, RE-TRANSCRIBE IT IN THE SAME COMMIT, or the new copy ships unchecked. |
| `home-story` | NEEDED | 1800×1200 | 3:2 | JPG | Home, brand story section | Environmental Front Range shot or ingredient still. No people holding cans. Should read as place, not as lifestyle stock. |
| `about-founder` | NEEDED | 1400×1750 | 4:5 | JPG | About page | Founder portrait, natural light, working context rather than posed studio. Buyers read this as evidence of a real operator. |
| `about-colorado` | NEEDED | 2400×1200 | 2:1 | JPG | About page, provenance section | Wide Colorado landscape or production facility exterior. Avoid the generic mountain-range stock crop. |
| `wholesale-case` | NEEDED | 1600×1200 | 4:3 | JPG | Wholesale page, near the specs table | The shipper case, and a pallet if one exists. Plain background. This is an operational photo for buyers, not a beauty shot — it should show the case as it arrives on a dock. |
| `wholesale-shelf` | NEEDED | 1600×1200 | 4:3 | JPG | Wholesale page | Product on a real retail shelf, facing forward. Powerful proof for a category buyer. Omit until there is a genuine shelf placement — do not stage this. |

## Per-flavor slots

One set per entry in `src/content/flavors/`. Flavor IDs are the markdown
filenames, so these are currently placeholder IDs and the slot names will change
when the real SKUs are named. Do not commission these shots until the SKUs are
final.

| Slot | Status | Dimensions | Ratio | Format | Appears | What the shot should contain |
|---|---|---|---|---|---|---|
| `flavor-cranberry-can-front` | have | 560×1470 | 8:21 | PNG | Flavor page hero, product index card (cranberry) | FULFILLED. 560x1470 PNG with a real alpha channel, which is why cans sit directly on flavor colour fields. Any replacement must keep transparency: an opaque render reintroduces a pale rectangle on every coloured band. The front panel is the product's whole argument, so keep the ingredient list legible at the sizes used here. |
| `flavor-cranberry-can-angle` | NEEDED | 560×1470 | 8:21 | PNG | Flavor page secondary (cranberry) | Same can, three-quarter angle, transparent background, matching the front cutout's framing and lighting. |
| `flavor-cranberry-scene` | have | 1024×1536 | 2:3 | JPG | Flavor page, below the specifications (cranberry) | FULFILLED. Portrait scene shot: the can in a styled setting with its own fruit. Carries the flavour pages now that the invented tasting copy was removed, which is the better trade: a real photograph instead of adjectives written by someone who had not tasted the product. |
| `flavor-lime-can-front` | have | 560×1470 | 8:21 | PNG | Flavor page hero, product index card (lime) | FULFILLED. 560x1470 PNG with a real alpha channel, which is why cans sit directly on flavor colour fields. Any replacement must keep transparency: an opaque render reintroduces a pale rectangle on every coloured band. The front panel is the product's whole argument, so keep the ingredient list legible at the sizes used here. |
| `flavor-lime-can-angle` | NEEDED | 560×1470 | 8:21 | PNG | Flavor page secondary (lime) | Same can, three-quarter angle, transparent background, matching the front cutout's framing and lighting. |
| `flavor-lime-scene` | have | 1024×1536 | 2:3 | JPG | Flavor page, below the specifications (lime) | FULFILLED. Portrait scene shot: the can in a styled setting with its own fruit. Carries the flavour pages now that the invented tasting copy was removed, which is the better trade: a real photograph instead of adjectives written by someone who had not tasted the product. |
| `flavor-pineapple-can-front` | have | 560×1470 | 8:21 | PNG | Flavor page hero, product index card (pineapple) | FULFILLED. 560x1470 PNG with a real alpha channel, which is why cans sit directly on flavor colour fields. Any replacement must keep transparency: an opaque render reintroduces a pale rectangle on every coloured band. The front panel is the product's whole argument, so keep the ingredient list legible at the sizes used here. |
| `flavor-pineapple-can-angle` | NEEDED | 560×1470 | 8:21 | PNG | Flavor page secondary (pineapple) | Same can, three-quarter angle, transparent background, matching the front cutout's framing and lighting. |
| `flavor-pineapple-scene` | have | 1024×1536 | 2:3 | JPG | Flavor page, below the specifications (pineapple) | FULFILLED. Portrait scene shot: the can in a styled setting with its own fruit. Carries the flavour pages now that the invented tasting copy was removed, which is the better trade: a real photograph instead of adjectives written by someone who had not tasted the product. |

## Notes for whoever shoots this

- **No stock photography, no AI-generated imagery.** Every slot is either a real
  photograph of the real product or it stays a placeholder.
- Product shots need transparent backgrounds (PNG) so they can sit on the
  brand's color fields without a visible box around them.
- `home-hero-can` is the largest image on the site and the LCP element. It is
  the one shot worth paying the most for.
- `wholesale-shelf` should not be staged. It is only persuasive to a category
  buyer if it is a genuine shelf placement.
