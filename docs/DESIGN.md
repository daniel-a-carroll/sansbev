# SansBev — provisional design plan

Status: **provisional.** No brand identity exists yet. Every choice here is a deliberate
placeholder made to be replaced, and all of it is expressed through the tokens in
`src/styles/tokens.css`. Changing that one file re-skins the site.

Audience priority, per the brief: **trade first, consumers second.** A category buyer at
Natural Grocers or an independent market should read this site as a real, fundable,
fulfillable company inside about eight seconds. Everything below is downstream of that.

---

## 1. Palette

Five named colors plus a per-SKU accent slot. Named for Front Range conditions, not for
their hex values, so the names survive a re-skin.

| Token | Hex | Role |
|---|---|---|
| `--c-snowfield` | `#F1F3EF` | Page ground. Cool near-white with a faint green cast. |
| `--c-spruce` | `#13241D` | Primary ink, dark bands, buttons. A green-black, not a neutral black. |
| `--c-granite` | `#5A635C` | Secondary text, captions, hairline rules. |
| `--c-mist` | `#E2E6E0` | Recessed surfaces: table banding, form fields, asset placeholders. |
| `--c-sunbreak` | `#D6451B` | **The one loud color.** Full-bleed fields and display type only. |
| `--c-ember` | `#B63510` | Text-safe sibling of sunbreak. Links, buttons, focus rings, small accent text. |

Sunbreak and ember are the same hue at two depths, so they read as one brand color while
letting every use pass contrast. The split exists because `#D6451B` cannot carry small
text against either ink — rather than compromise the color or the accessibility floor,
the system separates "color as field" from "color as text."

**Verified contrast** (computed, not eyeballed):

| Pair | Ratio | Verdict |
|---|---|---|
| spruce on snowfield | 14.49 | AAA |
| granite on snowfield | 5.57 | AA |
| granite on mist | 4.93 | AA |
| snowfield on spruce | 14.49 | AAA |
| ember on snowfield | 5.36 | AA — links, focus ring |
| snowfield on ember | 5.99 | AA — filled buttons |
| spruce on sunbreak | 3.64 | AA large type + non-text UI **only** |

The binding rule: **nothing smaller than 24px (or 19px bold) ever sits on sunbreak.**
Enforced by giving the sunbreak field its own type scale floor rather than by discipline.

### Per-SKU accent

Each of the three launch SKUs gets one saturated color, supplied as data on the flavor
entry, not hardcoded. Each declares its own text color so contrast holds regardless of
which hues you eventually choose:

| Slot | Provisional field | On-field ink | Ratio | Text-safe variant |
|---|---|---|---|---|
| SKU A | `#A8123A` | snowfield | 6.69 AA | `#A8123A` (6.69 on snowfield) |
| SKU B | `#C97A05` | spruce | 4.83 AA | `#8A5203` (5.72 on snowfield) |
| SKU C | `#2C4B7C` | snowfield | 7.82 AAA | `#2C4B7C` (7.82 on snowfield) |

These are placeholders keyed to nothing — the flavors aren't chosen yet. When they are,
each flavor's color derives from the actual fruit, and the schema requires the on-field
ink alongside it so a new color can't silently break contrast.

## 2. Type

**One family: Archivo** (Omnibus-Type, SIL Open Font License), self-hosted as a subset
variable font with weight and width axes.

| Role | Setting |
|---|---|
| Display | Archivo, wdth 112, wght 700, tight tracking |
| Headings | Archivo, wdth 100, wght 600 |
| Body | Archivo, wdth 100, wght 400 |
| Data / tabular | Archivo, wght 400, `font-variant-numeric: tabular-nums` |

One family, two registers. The width axis gives a genuine display voice without
introducing a second typeface, so the wordmark, the nutrition panel, and the case-spec
table all speak in the same accent. Archivo has proper tabular lining figures, which is
the actual requirement here — this site is going to be full of numbers a buyer reads in
columns (caffeine mg, case dimensions, Ti/Hi, MOQ, ZIP codes), and figures that don't
align make a brand look unserious.

One variable file, subset to Latin, roughly 40–60KB. No second family to load, no
network request to Google.

## 3. Layout concept: the listing sheet

The site is organized like a well-made spec document, not like a consumer beverage
landing page.

- **Rules, not cards.** Sections are separated by 1px granite hairlines at low alpha,
  running the full measure. No uniform rounded boxes, no soft shadows anywhere.
- **One asymmetric grid.** 12 columns, left-weighted. Prose sits in a ~66ch measure
  offset from the left edge; data tables span wider. The asymmetry is consistent enough
  to feel structural rather than decorative.
- **Data is rendered, never pictured.** Nutrition panels and trade specs are real
  semantic tables built from the content collections — indexable, screen-readable, and
  incapable of drifting from the JSON-LD, because both read the same source.
- **The loud field.** Sunbreak (or a SKU color) appears as an unbounded full-bleed band
  behind large display type. It is never a box around a photo, never a card, never a
  button fill. It appears at most twice per page.
- **Motion:** exactly one orchestrated moment — the home hero's color field settling once
  on load. Nothing else animates on scroll. Nothing animates on hover except the
  underline offset on links. Fully suppressed under `prefers-reduced-motion`.

## 4. Principles

**1. Data is the ornament.**
For the primary audience, the case-pack table *is* the brand asset. Specs get the same
typographic care as the hero, and they are not hidden behind a PDF download or a form.

**2. Quiet ground, one loud field.**
Neutral document everywhere; saturation appears in one unbounded band per view. If a
page needs a second bold element to work, the page is wrong.

**3. Rules, not cards.**
Hairlines and whitespace carry the structure. Nothing gets a shadow. This is the single
most load-bearing anti-default in the plan.

**4. Every claim is a sentence someone can defend.**
FDA treats this site as labeling (see `src/data/claims.ts`). Copy describes what is in
the can, not what it does to a body. Constraint drives voice: plain, specific, no filler.

---

## 5. Self-review — what I changed and why

The brief asked me to write the plan, then attack it for generic defaults. Five things
did not survive.

**Sage-green "wellness natural" accent → green moved into the ink.**
Muted sage as the natural-products signal is the single most exhausted move in this
category. I killed it as an accent and pushed the green into `--c-spruce` instead, so the
whole page is subtly green-cast without ever announcing it. The brand color became a
warm, high-chroma sunbreak — fruit and altitude, not a supplement bottle.

**Warm cream ground → cool snowfield.**
My first ground was `#F7F4EC`. That is the exact cream the brief flagged, and it drags
everything toward the terracotta-and-serif tell. `#F1F3EF` is cooler and slightly green,
which reads high-altitude light rather than artisanal bakery.

**Two families (grotesque + mono for data) → one superfamily.**
Reaching for a mono to make specs "look technical" is costume. Archivo's tabular figures
do the real job — alignment — without a second voice, one less font file, and no
developer-tooling connotation on a beverage site.

**Centered consumer hero → left-aligned hero with the trade path in it.**
A big centered statement over a can is the category default and it buries the audience
that actually matters. The hero is now left-aligned and asymmetric, and the wholesale
entry point sits inside it rather than at the end of the page. That is the layout
admitting out loud who the site is for.

**Per-flavor color as decoration → color as data with a contrast contract.**
Full-bleed fruit color fields put this in Waterloo/Spindrift territory, which is on-brief
but risks becoming the whole idea. Two changes: the field is flat and unbounded (never a
container around product photography, which is the actual sparkling-water tell), and each
color ships with its required on-color in the schema, so contrast is a validated data
constraint instead of a thing I promised to remember.

### Known risk, flagged rather than hidden

Archivo is well-used in startup design. It is not as tired as Inter or Space Grotesk, and
the width axis is doing specific work here that most Archivo users never touch. But if it
reads generic to you, the swap is one `@font-face` block and one token — say so at review
and I'll move to something with more character in the display register.

---

## 6. What is deliberately not decided

- Logo and wordmark — typographic placeholder in Archivo display until identity exists.
- Actual flavor names, colors, and photography — all placeholder slots.
- Whether the sunbreak accent survives contact with a real brand identity. It probably
  does not. That is fine; it is one token.
