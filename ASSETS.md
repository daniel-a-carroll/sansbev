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

**0 of 19 slots fulfilled. 19 still needed.**

## Site-wide and page slots

| Slot | Status | Dimensions | Ratio | Format | Appears | What the shot should contain |
|---|---|---|---|---|---|---|
| `logo-wordmark` | NEEDED | 640×128 | 5:1 | SVG | Site header, footer | Horizontal wordmark, transparent background, single color so it can be recolored via CSS. Until this exists the header renders a typographic wordmark. |
| `logo-mark` | NEEDED | 512×512 | 1:1 | SVG | Favicon, app icons, social profile | Square standalone mark, no wordmark, legible at 32px. |
| `og-default` | NEEDED | 1200×630 | 40:21 | PNG | Open Graph / social preview for any page without its own image | Brand lockup on a flat field. Keep text large; this is rendered small in feeds. |
| `home-hero-can` | NEEDED | 1400×1750 | 4:5 | PNG | Home hero | Single can, three-quarter angle, transparent background. The hero product shot. Studio lighting, no props, no ice, no condensation styling. This is the LCP image — the most important shot on the site. |
| `home-story` | NEEDED | 1800×1200 | 3:2 | JPG | Home, brand story section | Environmental Front Range shot or ingredient still. No people holding cans. Should read as place, not as lifestyle stock. |
| `product-lineup` | NEEDED | 2000×1250 | 8:5 | PNG | Product index page | All three SKUs together, straight-on, evenly spaced, transparent background. Reshoot whenever the lineup changes. |
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
| `flavor-flavor-one-can-front` | NEEDED | 1000×1600 | 5:8 | PNG | Flavor page hero, product index card (flavor-one) | Single can, straight-on, label centered and fully legible, transparent background. Slim 12oz can. |
| `flavor-flavor-one-can-angle` | NEEDED | 1400×1400 | 1:1 | PNG | Flavor page secondary (flavor-one) | Same can, three-quarter angle, transparent background. |
| `flavor-flavor-one-ingredient-still` | NEEDED | 1600×1200 | 4:3 | JPG | Flavor page, tasting notes section (flavor-one) | The actual fruit for this SKU, styled simply on a plain surface. Real fruit, matching the flavor. No syrup splashes, no motion photography. |
| `flavor-flavor-three-can-front` | NEEDED | 1000×1600 | 5:8 | PNG | Flavor page hero, product index card (flavor-three) | Single can, straight-on, label centered and fully legible, transparent background. Slim 12oz can. |
| `flavor-flavor-three-can-angle` | NEEDED | 1400×1400 | 1:1 | PNG | Flavor page secondary (flavor-three) | Same can, three-quarter angle, transparent background. |
| `flavor-flavor-three-ingredient-still` | NEEDED | 1600×1200 | 4:3 | JPG | Flavor page, tasting notes section (flavor-three) | The actual fruit for this SKU, styled simply on a plain surface. Real fruit, matching the flavor. No syrup splashes, no motion photography. |
| `flavor-flavor-two-can-front` | NEEDED | 1000×1600 | 5:8 | PNG | Flavor page hero, product index card (flavor-two) | Single can, straight-on, label centered and fully legible, transparent background. Slim 12oz can. |
| `flavor-flavor-two-can-angle` | NEEDED | 1400×1400 | 1:1 | PNG | Flavor page secondary (flavor-two) | Same can, three-quarter angle, transparent background. |
| `flavor-flavor-two-ingredient-still` | NEEDED | 1600×1200 | 4:3 | JPG | Flavor page, tasting notes section (flavor-two) | The actual fruit for this SKU, styled simply on a plain surface. Real fruit, matching the flavor. No syrup splashes, no motion photography. |

## Notes for whoever shoots this

- **No stock photography, no AI-generated imagery.** Every slot is either a real
  photograph of the real product or it stays a placeholder.
- Product shots need transparent backgrounds (PNG) so they can sit on the
  brand's color fields without a visible box around them.
- `home-hero-can` is the largest image on the site and the LCP element. It is
  the one shot worth paying the most for.
- `wholesale-shelf` should not be staged. It is only persuasive to a category
  buyer if it is a genuine shelf placement.
