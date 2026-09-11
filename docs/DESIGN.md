# SANS — design record

Status: **derived from the second-generation packaging.** Sampled from the can cutouts
and brand board in `assets/`, with every contrast ratio computed rather than estimated.

The direction is **premium**. The richness comes from depth of color and generous space,
not from contrast tricks or ornament.

Two earlier versions are preserved in git history if you want to see what was replaced:
the invented provisional palette at `5bc2116`, and the first-generation packaging palette
at `d9f52a4`.

Audience priority is unchanged: **trade first, consumers second.**

---

## 1. What the packaging establishes

Facts taken off the artwork, not invented here:

| | |
|---|---|
| Brand | **SANS**, with a trademark mark |
| Descriptor | Energy drink |
| Tagline | *what's important is what's not in it* |
| Ingredients | Carbonated water · Organic fruit juice · Caffeine (from green coffee) · L-theanine (from green tea) · Salt |
| Caffeine | **220mg** |
| L-theanine | **400mg**, from green tea |
| Format | 12 fl oz (355 mL) slim can |
| Flavors | Lime, Pineapple, Cranberry |

The ingredient list is printed on the **front** of the can. That is the brand's whole
argument made visible, and the site leans on it: the product page intro and the home story
both lead with the five ingredients rather than with adjectives.

**The caffeine figure has now moved three times** — 150mg discussed, 160mg on the
first-generation art, 200mg by direction, 220mg on the current art. Site and can now agree
at 220mg. Keep them in lockstep; the history is recorded in `claims.ts`.

**L-theanine sourcing is resolved.** "From green tea" is a plant source, which closes the
question that had been blocking any natural positioning. Keep the supplier documentation.

## 2. Palette

| Token | Hex | Role |
|---|---|---|
| `--c-cream` | `#F9EFE2` | Page ground. Warm, not white. From the brand board. |
| `--c-ink` | `#101509` | Body text. Near-black with a green cast. |
| `--c-stone` | `#575247` | Secondary text. Derived to clear AA on cream. |
| `--c-surface` | `#F0E4D3` | Recessed surfaces, table banding. |
| `--c-lime` | `#3F6C13` | Lime field **and the house accent** |
| `--c-pineapple` | `#A87A08` | Pineapple field |
| `--c-cranberry` | `#8E1520` | Cranberry field |

### Verified contrast

| Pair | Ratio | |
|---|---|---|
| ink on cream | 16.30 | AAA — body |
| cream on ink | 16.30 | AAA — dark bands |
| stone on cream | 6.83 | AA — secondary |
| stone on surface | 6.19 | AA |
| lime on cream | 5.49 | AA — links, focus ring |
| cream on lime | 5.49 | AA — lime band |
| **ink** on pineapple | 4.81 | AA — pineapple band |
| pineapple-ink on cream | 5.38 | AA |
| cream on cranberry | 8.11 | AAA — cranberry band |

**Pineapple is the awkward one and the reason the schema is shaped the way it is.** Cream
on it is 3.39, so its band carries ink instead. And the field color fails as small text on
cream, so it needs a darker sibling. Because every flavor declares `field`, `onText` and
`ink` separately, that irregularity is data rather than a rule someone has to remember.

The deep green doubles as the house accent. The brand board sets the operative words of
the tagline in it, so it reads as brand rather than as one SKU.

## 3. Type

**Archivo** (SIL OFL), self-hosted, 36KB total across two files: a 34KB variable text face
and a 2KB uppercase-only condensed instance for the wordmark.

**The wordmark face is now a known stand-in.** The packaging uses a distinct
high-contrast display face with tapered stems that Archivo only approximates. Fulfilling
the `logo-wordmark` slot with a proper SVG export is the highest-value missing asset —
higher than any photography, because the identity has clearly firmed up and the header is
the first thing a buyer sees.

## 4. Layout

**The cutouts changed the layout.** The first-generation renders were opaque, each
carrying its own studio background, which meant a can on a saturated field showed a pale
rectangle. That single constraint shaped the previous design: cans on the page ground,
flavor color demoted to rules.

The current renders have a real alpha channel, so the product goes back into the color:

- **Home hero:** the lead flavor's color as a flat field bleeding off the right edge, can
  sitting in it.
- **Product index:** each can centered in its own flavor field, whole can visible with
  even room around it. The card ratio is derived from the render's 400×1010 proportions
  so nothing crops.
- **Flavor page:** full-bleed flavor band carrying the name, the tagline and the can
  together.

Otherwise unchanged: hairline rules instead of cards, no shadows anywhere, asymmetric
left-weighted 12-column grid, data as real semantic tables.

**Motion:** one moment — the hero color field rising once behind the can on load.
Collapsed by `prefers-reduced-motion`.

## 5. Principles

**1. Data is the ornament.** Now literally true of the product itself: the ingredient list
is the front of the can, and the site treats it as the headline fact.

**2. The can is the boldness.** The packaging is already saturated and detailed. The page
stays quiet, gives it room, and lets it carry the weight.

**3. Rules, not cards.** Unchanged.

**4. Every claim is a sentence someone can defend.** Enforced — the build fails if
prohibited claims language reaches the HTML.

## 6. The brand board, and the gap it exposed

The board is published at the top of the product index: brand statement first, then the
three cards as the index into each flavor. It is held to the container width rather than
bled edge to edge, because the source is 1536px and a true full bleed would upscale it.

Publishing it exposed a real hole in the claims guard. **The lint reads rendered text and
cannot read words baked into an image**, so the board's copy would have shipped
completely unchecked.

That is now closed. Every published image carrying words is transcribed into `imageClaims`
in `claims.ts`, and the lint scans those transcripts exactly as it scans the HTML. The
transcript is also what makes `claims.ts` a complete review unit: a reviewer reading that
one file now sees every claim the site makes, not only the selectable ones.

**The board's copy is published but not cleared.** It carries five lines the written copy
deliberately avoids, because they are effect claims rather than composition:

> clean energy that moves you forward · real ingredients. clean energy. no compromises. ·
> fuel what matters · zero artificial anything · made for real life

None trip `prohibitedTerms`, so the build passes. That is not the same as being cleared.
They are flagged under `needsReview`. If counsel objects, the fix is a version of the
board without those lines — the cans and their ingredient panels carry the argument on
their own.

## 7. Still open

- Brand name: SANS as product brand, SansBev as company and domain. Unconfirmed.
- **Organic** is a USDA-regulated claim now printed on the cans. Certification records
  need to exist before this ships.
- 400mg L-theanine is high for the category. A formulation call, but reviewers will notice.
- A real SVG wordmark.
- Juice percentage, still the open question for any nutrient-content claim.
