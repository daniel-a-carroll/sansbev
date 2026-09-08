# SANS — design record

Status: **derived from the packaging.** This document previously held a provisional
palette invented in the absence of brand assets. That is superseded. Everything below is
sampled from the can renders in `assets/`, cross-checked against
`assets/sans-palette.json`, and independently verified for contrast.

The provisional plan and its reasoning are preserved in git history at commit `5bc2116`,
if you ever want to see what was replaced and why.

Audience priority is unchanged: **trade first, consumers second.** A category buyer should
read this site as a real, fundable, fulfillable company inside about eight seconds.

---

## 1. What the packaging established

Facts taken directly off the can art, not invented here:

| | |
|---|---|
| Brand | **SANS** — set in heavy condensed caps |
| Descriptor | Energy drink |
| Line | Made with real fruit juice |
| Tagline | *what's important is what's not in it* |
| Caffeine | 160mg from green coffee |
| Format | 12 fl oz (355 mL) slim can |
| Flavors | Lime, Pineapple, Cranberry |
| Signature device | Lens flare with hexagonal bokeh |

**Two of these contradict earlier conversation and need confirming:** the caffeine figure
(160mg on the can vs 150mg discussed) and the brand name (SANS on the can vs SansBev as
the working name). Both are flagged in `docs/TODO.md`. The site follows the can, on the
principle that printed artwork outranks a remembered number — but a labeling figure has
to be right, so confirm it.

## 2. Palette

Every value sampled from the renders. Every ratio below computed, not estimated —
including re-verifying the ones the palette file supplied. All eleven matched exactly.

| Token | Hex | Role |
|---|---|---|
| `--c-ink` | `#0A0A08` | Body text, wordmark. The can's own ink. |
| `--c-cream` | `#EEE2D0` | Text on dark grounds. The cranberry can's wordmark color. |
| `--c-paper` | `#E6E3DF` | Page ground. **This is the render's studio background** — see §4. |
| `--c-surface` | `#CBC6BC` | Recessed surfaces, table banding. |
| `--c-slate` | `#54524F` | Secondary text. Darkened from the aluminum mid to clear AA. |
| `--c-lime` | `#7ED02C` | Lime SKU field |
| `--c-pineapple` | `#F6C90C` | Pineapple SKU field |
| `--c-cranberry` | `#A7172B` | Cranberry SKU field **and the house accent** |

**Cranberry does double duty.** It is the only packaging color dark enough to work as
text, which means links, buttons, and focus rings can use a real brand color instead of a
neutral. Lime and pineapple are near-white in luminance and stay field-only.

### Verified contrast

| Pair | Ratio | |
|---|---|---|
| ink on paper | 15.49 | AAA — body |
| slate on paper | 6.09 | AA — secondary |
| slate on surface | 4.58 | AA |
| cranberry on paper | 5.86 | AA — links, focus |
| white on cranberry | 7.50 | AAA — filled buttons |
| cream on ink | 15.50 | AAA — dark bands |
| ink on lime | 10.33 | AAA — lime band |
| ink on pineapple | 12.53 | AAA — pineapple band |
| cream on cranberry | 5.86 | AA — cranberry band |

**Never:** ink on cranberry (2.64), or any flavor base as small text on paper — lime is
1.50 and pineapple 1.24.

Two values needed inventing because the packaging had no equivalent, both derived by
darkening a sampled color until it cleared AA: `--c-slate` `#54524F` for secondary text,
and `--c-pineapple-ink` `#875514` for pineapple as text.

### The constraint is now data, not discipline

Every flavor entry carries `color.field`, `color.onText`, and `color.ink`. A new SKU
cannot be added without declaring what text is legible on it. The previous approach — a
global minimum type size on accent fields — has been **removed entirely**, because with
real colors each field passes AA at any size.

## 3. Type

**Archivo** (SIL OFL), self-hosted, split into two files:

| File | Size | Role |
|---|---|---|
| `archivo-text-var.woff2` | 34KB | Variable weight 400–900, normal width. Everything. |
| `archivo-wordmark.woff2` | 2KB | Static 900 weight at 82% width, uppercase only. The wordmark. |

The split is the interesting decision. The can's SANS lockup is heavy *and* condensed, so
matching it needs the width axis — but carrying that axis across the full range cost
42KB. Since only the wordmark needs condensed, it gets a static instance subset to A–Z.

**Total 36KB, down from 52KB before**, while gaining a wordmark that matches the
packaging instead of approximating it.

Tabular figures remain the load-bearing feature for the spec and nutrition tables.

## 4. Layout

**The ground is the product photography's background.** `--c-paper` `#E6E3DF` is not a
taste decision — it is the exact studio background the cans were rendered on, so the
product sits on the page almost seamlessly.

This turned out to be the governing constraint. The renders are **not transparent
cutouts**; each carries its own background. The first build put cans on saturated flavor
fields and the render backgrounds showed as pale rectangles inside the color — it looked
broken. So:

- **Cans always sit on `--color-bg`.** Never on a color field.
- **Flavor color appears as rules and full-bleed bands the cans never overlap.** A 6px
  flavor rule under each can on the home and product pages; a full-bleed flavor band on
  each flavor page carrying the name and tagline, with the can below it on paper.

When transparent cutouts exist, cans can move onto color fields and the bands can carry
product. Noted in `ASSETS.md`.

Otherwise unchanged: hairline rules instead of cards, no shadows anywhere, asymmetric
left-weighted 12-column grid, data rendered as real semantic tables.

**Motion:** one moment — the flavor rule under the hero can drawing across once on load.
Collapsed by `prefers-reduced-motion`.

## 5. Principles

**1. Data is the ornament.** Unchanged, and now carrying more weight, since the wholesale
page publishes no specifications — the list of what you'll send is doing that job.

**2. The can is the boldness.** Superseding "quiet ground, one loud field." The packaging
is already extremely saturated. Adding a second bold element competes with it. The page
stays quiet and lets the product be loud.

**3. Rules, not cards.** Unchanged, and now doing more: rules carry flavor color where
fields would have fought the photography.

**4. Every claim is a sentence someone can defend.** Unchanged and enforced — the build
fails if prohibited claims language reaches the HTML.

## 6. What the packaging overturned

Honest record of what I got wrong when guessing.

**Cool ground → warm paper.** I chose `#F1F3EF`, a cool near-white, and explicitly
rejected warm off-white as a category tell. The packaging's own background is `#E6E3DF`,
warm. I was right that warm cream is overused and wrong that it was wrong *here* — the
photography decides the ground, not taste.

**Invented accent → cranberry.** The provisional `#D6451B` was a reasonable guess at a
warm high-chroma accent, and it needed a second darker value to pass contrast as text.
Cranberry does both jobs at one value.

**Green-black ink → true near-black.** I pushed green into the ink so "natural" was felt
rather than stated. The packaging uses a plain `#0A0A08`. The fruit carries the color;
the ink stays out of the way.

**Width axis everywhere → width only where it earns it.** Applying it site-wide would
have cost 42KB for one element.

**Tracked-out caps, reconsidered.** The provisional plan listed these as a tell to avoid.
The can sets ENERGY DRINK exactly that way, so they are now the `.label` style. A pattern
is only generic when it is unmotivated; on the packaging it is motivated.

## 7. Still open

- Brand name: SANS vs SansBev (site uses SANS as product brand, SansBev as company/domain)
- Caffeine: 160mg on the can vs 150mg discussed
- Transparent can cutouts at higher resolution — 460px is soft on high-DPI at hero size
- The lens-flare device is on the cans but not yet used anywhere in the page design
