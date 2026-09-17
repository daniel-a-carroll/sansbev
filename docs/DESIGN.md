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
| Ingredients | Carbonated water · Organic juice, a named two-fruit blend · Caffeine (from green coffee beans) · L-theanine (from green tea) · Acacia (natural fiber) · Salt |
| Caffeine | **220mg** |
| L-theanine | **200mg**, from green tea (reduced from 400mg; the artwork still shows 400) |
| Format | 12 fl oz (355 mL) slim can |
| Flavors | Lime, Pineapple, Cranberry |

The ingredient list is printed on the **front** of the can. That is the brand's whole
argument made visible, and the site leans on it.

**The site never counts the ingredients.** An earlier version said "five ingredients" and
was wrong within a fortnight, when acacia was added and the juice became a blend. Exactly
the same mistake as counting the flavors. Copy now says where the list is, not how long
it is, and the per-flavor lists are rendered from data.

**The juice is a blend in every SKU**: lime and apple, pineapple and lime, cranberry and
apple. The site names the blend wherever it mentions juice, because the can does.

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

**The real wordmark has landed.** `logo-wordmark.svg` is a single-path SVG authored with
`fill="currentColor"`, and `Wordmark.astro` **inlines** it rather than rendering it through
`<img>`. That matters: an `<img>` loads the SVG in an isolated context page CSS cannot
reach, so it would be locked to black and would ignore the tokens. Inlined, it inherits
`color`, which is what lets one file render ink-on-cream in the header and cream-on-dark
on a color band, exactly as the packaging does.

Cost is about 3KB gzipped per instance against one cached request. Worth it for a logo
that has to change color.

Archivo's condensed instance is kept purely as a fallback if the SVG ever goes missing,
and is no longer preloaded.

The served SVG has its C2PA content-credential metadata stripped: 44% of the original
file, never displayed, and fetched on every page. The untouched original with its
credentials is kept at `assets/logo-wordmark-original.svg`.

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

**Colour bands.** The landing page's one band was near-black, which broke the page up but
read as its footer: a page that goes dark tells a reader it has ended. It now uses the
deep green from the lime can, through a `band--flavor` primitive that takes the colour and
its on-colour as custom properties. That ties the landing page to the flavour pages and
the cans, which already use the same three values.

Only lime and cranberry carry cream text (5.49 and 8.11). **Pineapple is 3.39 against
cream and must use ink**, which is why the on-colour is passed in rather than assumed.

**Motion:** one gesture, the hero colour field rising from the bottom. It plays on load
and replays whenever the visitor cycles to another flavour, in that flavour's colour.

That is a change to the original "one moment, on load" rule, made deliberately. The thing
the rule was protecting against is decoration: motion that fires on scroll, on hover, on
every card, that the visitor did not ask for. This is the opposite. It is user-initiated,
it carries information (the colour IS the flavour), and it is the same gesture the page
already makes rather than a second vocabulary. One gesture, used consistently, is still
one moment.

Collapsed by `prefers-reduced-motion`, where the colour changes instantly instead. The
animation signals the switch; the switch is already obvious from the can and the list.

## 5. Principles

**1. Data is the ornament.** Now literally true of the product itself: the ingredient list
is the front of the can, and the site treats it as the headline fact.

**2. The can is the boldness.** The packaging is already saturated and detailed. The page
stays quiet, gives it room, and lets it carry the weight.

**3. Rules, not cards.** Unchanged.

**4. Every claim is a sentence someone can defend.** Enforced — the build fails if
prohibited claims language reaches the HTML.

## 6. The brand board, and the gap it exposed

The board lives on the **wholesale** page, full-bleed under the intro.

It started on the product index and was wrong there. The board is a *poster*: it carries
its own logo, its own headline and its own tagline, so nesting it inside a page that
already has all three read as a page within a page. It also put the same three cans on
screen twice, once in the board and again in the cards below it.

Two alternatives were built and rejected. Making it a full-bleed hero on the product page
fixed the pasted-in feeling but kept both duplications. Replacing the flavor cards with a
text link row removed the duplication but gutted the page, taking all the flavor color
with it.

On the trade page nothing competes with it. A buyer arrives, reads the pitch, and sees
exactly what they would be stocking. It is a sell piece on the selling page.

It is rendered full-bleed there, which upscales slightly past 1536px; a larger export
would fix that.

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
- The cans and the brand board still print 400 MG L-theanine. The formula is 200mg and the
  site says so, which means a page currently shows both numbers at once. Re-render.
- **"Calm focus"** on the brand board is the most exposed claim on the site: a
  structure/function claim tied to a named ingredient at a named dose, on a conventional
  food. See `claims.ts`.
- **"0 added sugar"** is a regulated nutrient content claim and needs the finished
  Nutrition Facts panel behind it, particularly now the juice blends include apple.
- The pineapple can sets its ingredient panel in ALL CAPS while lime and cranberry use
  sentence case. Cosmetic, but fix it before print.
- Juice percentage, still the open question for any nutrient-content claim.
