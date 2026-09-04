# SansBev — information architecture

## Routes

| Route | Source | Audience | Notes |
|---|---|---|---|
| `/` | `src/data/copy.ts` | Consumer, with a trade path in the hero | Email + ZIP capture |
| `/product` | `flavors` collection | Consumer | Index of the 3 launch SKUs |
| `/product/[slug]` | `flavors` collection | Consumer | Nutrition panel, ingredients, specs |
| `/where-to-buy` | `locations` collection | Consumer | City-grouped list + Colorado map |
| `/wholesale` | `src/data/trade.ts` | **Trade** | Specs, sell sheet, inquiry form |
| `/about` | `src/data/copy.ts` | Both | Founder story, Colorado provenance |
| `/contact` | `src/data/site.ts` | Both | Trade / general / press |
| `/privacy`, `/terms` | `src/data/copy.ts` | — | Placeholder legal |
| `/404` | — | — | |

Generated: `sitemap.xml`, `robots.txt`.

**Primary nav:** Product · Where to buy · Wholesale · About · Contact.
Wholesale is top-level and visually equal to the rest — not a footer link, and not
styled as a lesser item.

## Worker API routes

Static build; these three live in the Worker alongside the assets binding.

| Route | Payload | Store |
|---|---|---|
| `POST /api/subscribe` | email, **zip (required)** | `submissions` |
| `POST /api/request-store` | store name, city, state, zip, email | `submissions` |
| `POST /api/wholesale` | business, contact, role, channel, store count, region, message | `submissions` |

All three go through one provider-agnostic module so the persistence target can be
swapped for Klaviyo or Mailchimp without touching a component or a route.

## Content model

Four collections plus four typed singletons. The split: **collections are things there
will eventually be many of; singletons are things there is exactly one of.**

### Collections — `src/content.config.ts`

| Collection | Loader | Source | Grows to |
|---|---|---|---|
| `flavors` | `glob` | `src/content/flavors/*.md` | 3 at launch |
| `locations` | `file` | `src/content/locations.yaml` | Hand-maintained, dozens then hundreds |
| `faq` | `file` | `src/content/faq.yaml` | Split by audience: consumer / trade |
| `press` | `file` | `src/content/press.yaml` | Empty until there is press |

`flavors` is markdown because each SKU has prose (the description) wrapped around
structured data. The other three are pure records, so they are single flat data files —
one file to open, one file to edit, no directory of near-empty stubs.

### Singletons — `src/data/`

| File | Holds |
|---|---|
| `site.ts` | Brand name, tagline, domain, the three contact addresses, physical address for JSON-LD, analytics toggle |
| `copy.ts` | Page-level prose: hero, about, legal, section intros |
| `trade.ts` | The trade specifications block and the sell sheet path |
| `claims.ts` | **Every product claim on the site.** FDA-reviewable as one unit. |

`claims.ts` is separated from `copy.ts` on purpose. It is not organized by where the copy
appears — it is organized to be read start to finish by someone checking it against the
physical label.

## The optionality rule

Exactly two fields on the whole site are required: a flavor's `name` and a location's
`name`. Everything else is optional, because none of it exists yet.

Every component that consumes an optional field either renders a labeled placeholder or
removes itself. No component may render an empty heading, a dangling label, a `0`, or an
`undefined`. Sections with no data hide; pages with no data show a written pre-launch
state. This is what makes "drop the real content in later" a data operation instead of a
refactor.

## Data → page → JSON-LD

Structured data is generated from the same objects the page renders, never re-typed:

| Source | Renders | Emits |
|---|---|---|
| `flavors` entry | `/product/[slug]` | `Product` |
| `locations` entry | `/where-to-buy` | `LocalBusiness` per store |
| `site.ts` | site-wide | `Organization` |
| `faq` (consumer) | `/product`, `/where-to-buy` | `FAQPage` |

If a field is absent from the data it is absent from both the page and the JSON-LD, so
the two cannot drift.

## Placeholder convention

Every unwritten string is `[[PLACEHOLDER — what goes here]]`.

```
grep -rn "\[\[PLACEHOLDER" src/
```

That command is the punch list, and `docs/TODO.md` is generated to match it. One format,
greppable, impossible to mistake for real copy if it ships by accident.
