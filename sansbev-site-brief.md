# SansBev Website Build Brief

Build the marketing website for SansBev, a Colorado-based natural functional energy drink brand, at sansbev.com.

Read this entire brief before writing code. Ask me questions about anything genuinely ambiguous before you start, but do not stall on brand details I have flagged as not yet decided. Where brand specifics are missing, build the structure and fill it with clearly labeled placeholder content.

---

## 1. Business context

This is a retail-first, distribution-led beverage brand, not a DTC ecommerce brand. There is no online store and there will not be one in the near term.

The site has two audiences, in this priority order:

1. **Trade.** Retail category buyers (natural grocery, independent markets, convenience), distributor and broker reps. They will look the brand up before or after a meeting. The site's job for them is to signal that this is a real, fundable, fulfillable brand and to give them the operational data they need to evaluate a listing.
2. **Consumers.** Their job on the site is to understand what the product is, then find out where to buy it.

Design and copy decisions should be made in that order of priority.

## 2. Stack and hosting constraints

- **Astro, static output** (`output: 'static'`). No SSR, no server framework.
- **TypeScript** throughout.
- Deploy target is **Cloudflare Workers with static assets** (not Cloudflare Pages, which is being folded into Workers). Configure `wrangler.jsonc`/`wrangler.toml` accordingly and include the deploy scripts.
- Source of truth is a **GitHub repo** with push-to-deploy. Include the GitHub Actions workflow or document the Cloudflare Git integration setup, whichever you judge more maintainable for a solo operator.
- No CMS, no database, no auth. Content lives in the repo.
- Styling: your choice of vanilla CSS with custom properties or Tailwind. Justify the choice in one line. Do not add a component library.
- Keep dependencies minimal. Every dependency you add must earn its place.

## 3. The controlling architectural requirement

**I do not have brand assets, final copy, product photography, a logo, or finalized nutrition and ingredient data yet. I will be adding them over the coming months while product development runs in parallel.**

Therefore the single most important property of this codebase is that adding real assets and real content later must be a **data and file drop operation, never a component refactor.**

Concretely:

- **All copy, product data, and structured content lives in typed data files**, not inline in components. Use Astro content collections with Zod schemas where the shape is repeating (flavors, retail locations, FAQ entries, press mentions), and a small number of typed config/JSON/YAML files for singleton content (brand name, tagline, contact details, hero copy, about copy).
- **All design tokens live in one file.** Colors, type scale, typefaces, spacing scale, radii. When brand identity is finalized, changing that one file should re-skin the whole site.
- **All images are referenced through a single asset resolver**, not scattered `<img src>` tags. See section 4.
- **Every schema field that I have not yet supplied should be optional**, and components must render gracefully when it is absent. The site must never break because a field is empty. It should degrade to a placeholder or hide the section.

Write a short `CONTRIBUTING.md` or `docs/EDITING.md` that tells future-me, in plain language, exactly which files to edit to change which parts of the site. Assume I will be coming back to this after months away.

## 4. Asset placeholder system

Build a placeholder system rather than sourcing stock imagery.

- A single `<Asset>` component takes a slot name. If a real file exists at the expected path, it renders the real image with correct `width`, `height`, `loading`, and responsive `srcset`. If not, it renders a generated SVG placeholder of the exact final dimensions, labeled with the slot name and the required dimensions, in a muted neutral treatment.
- Generate an **`ASSETS.md` manifest** listing every asset slot the site expects: slot name, where it appears, required dimensions, aspect ratio, file format, and a one-line note on what the shot should contain (for example, "single can, three-quarter angle, transparent or plain background, product hero"). This file is my shot list for when I brief a photographer or designer.
- The logo is a slot like any other. Use a typographic wordmark placeholder in the interim.
- No stock photos, no AI-generated imagery, no Unsplash links.

## 5. Pages and content

### Home
Brand story and positioning, product introduction, primary email capture, a path to the trade section. Consumer-facing but should not read as though the brand has no commercial substance.

### Product
Per-flavor pages or sections driven by a `flavors` content collection. Each flavor entry supports: name, description, tasting notes, full ingredient list, nutrition facts panel data, caffeine content, allergen statement, UPC, can size. All optional at this stage. Render a real, accessible nutrition panel component from structured data rather than an image of a panel, so it stays correct and indexable.

### Where to buy
Driven by a `locations` content collection: store name, address, city, state, ZIP, coordinates, chain or independent, date added. Render as a list grouped by city, with a simple map only if you can do it without a paid API key or a heavy dependency. **Do not build or integrate a hosted store locator service.** This starts as a hand-maintained data file. Handle the empty state as a pre-launch message with an email capture, not as a broken page.

### Wholesale / retail partners
A top-level nav item, not buried in a footer. This page serves buyers and distributors.

- Inquiry form (see section 6)
- A prominent slot for a downloadable sell sheet PDF, driven by a config value so I can drop the file in later. If no file is present, show a "contact us for the current sell sheet" state.
- A structured trade specifications block rendered from a data file, with all fields optional: UPC/GTIN, case pack, case dimensions and weight, pallet Ti/Hi, shelf life, suggested retail price, minimum order quantity, current distributor relationships, production facility and certifications.

### About
Founder story, why the product exists, Colorado provenance. Placeholder copy for now, clearly marked.

### Contact
Trade contact, general contact, press contact. Driven by config.

### Legal
Privacy policy and terms placeholder pages. Cookie-free analytics only, so no consent banner is required. If you add analytics, use a privacy-preserving option that does not require a banner, or leave a documented, easily enabled slot for one.

## 6. Forms and the "functionally dynamic" layer

The site is statically generated, but three interactions need to work. Implement these as Worker routes alongside the static assets, keeping the site's build fully static.

1. **Consumer email capture.** Collect email **and ZIP code.** ZIP is required, not optional. Rationale: geographic demand data is a sales asset in buyer meetings, so the capture is a distribution tool, not just a newsletter list.
2. **"Request SansBev at your store."** Consumer submits their preferred store name and location. Same rationale.
3. **Wholesale inquiry.** Business name, contact, role, channel type, store count, region, message.

Requirements for all three:

- Put every submission handler behind a **single provider-agnostic module** with a clearly defined interface. Ship a default implementation that persists to Cloudflare KV or D1 and, optionally, forwards a notification email. I will later swap the implementation for Klaviyo or Mailchimp without touching any component or route. Document the swap in one paragraph.
- Server-side validation with Zod on the Worker, plus client-side validation for UX. Do not trust the client.
- Honeypot field and a basic rate limit. No CAPTCHA.
- Progressive enhancement: forms must submit and work without JavaScript, then upgrade to inline async submission when JS is available.
- Accessible: real `<label>` elements, `aria-describedby` error messaging, focus moved to the error summary on failure, clear success state.
- Never place submitted personal data in URL query strings.
- Include an `EXPORT.md` note on how I pull the collected list out for a buyer meeting.

## 7. Regulatory constraint on copy

**FDA treats website content as product labeling.** This is a functional beverage with caffeine and L-theanine, which makes claims language a real compliance risk.

- Keep all product claims copy in a **single dedicated data file** so it can be reviewed as one unit alongside the physical label.
- Add an inline comment block in that file flagging that claims must be structure/function claims only, must avoid disease claims, and require review before launch.
- Write the placeholder copy conservatively. Describe what the product contains rather than what it does to the body.
- Do not write copy that implies treatment, prevention, or mitigation of any condition.

## 8. Design direction

I do not have a finalized brand identity, so make deliberate provisional choices and document them, rather than reaching for defaults.

Before writing any CSS, produce a short written design plan: a 4 to 6 color named palette with hex values, typeface selections and their roles, a layout concept, and three or four principles specific to this brand. Then review that plan and revise anything that reads as a generic default rather than a choice made for a Colorado natural functional beverage aimed at natural grocery buyers. Tell me what you changed and why. Only then write code.

Constraints and cautions:

- Ground the aesthetic in the actual subject matter: real fruit juice, clean label, Front Range natural products, functional but not a hard-charging gym energy brand. The reference point is the natural sparkling beverage set, not the mainstream energy drink set.
- Use one typeface family, or two that are clearly distinct. Choose deliberately. Self-host the fonts, do not hotlink Google Fonts.
- Avoid these tells: warm cream background with high-contrast serif display and terracotta accent; near-black with a single acid accent; identical rounded cards with identical soft shadows for every content block; tracked-out all-caps eyebrow labels above every heading; arrows appended to link text; numbered 01/02/03 markers on content that is not a sequence.
- Motion: at most one deliberate orchestrated moment. No fade-and-slide-up on every section, no hover transitions on every card.
- Spend boldness in one place. The rest stays quiet.
- Because the primary audience is trade, the site should read as credible and operationally serious first, and stylish second.

Copy: write in plain sentence case, active voice, no filler. Buttons state what happens. Every placeholder string must be obviously placeholder, in a consistent recognizable format, so I can grep for what remains to be written.

## 9. Quality floor

- Responsive to mobile, tested at 375px through 1920px
- Visible keyboard focus states, full keyboard navigability, semantic landmarks
- `prefers-reduced-motion` respected
- WCAG AA contrast across the palette
- Lighthouse: 95+ on performance, accessibility, and SEO on the built site
- Per-page meta titles and descriptions driven by frontmatter, Open Graph tags, `sitemap.xml`, `robots.txt`
- `LocalBusiness` and `Product` JSON-LD structured data, populated from the same content collections so it never drifts from the visible content
- No layout shift from the placeholder-to-real-asset swap: placeholders reserve exact final dimensions

## 10. Deliverables

1. Working Astro site, builds clean, no console errors or warnings
2. `wrangler` config and deploy scripts for Cloudflare Workers static assets
3. Worker routes for the three forms, with the provider-agnostic submission module
4. `README.md`: how to run, build, and deploy
5. `docs/EDITING.md`: which file to edit to change what, written for a non-daily maintainer
6. `ASSETS.md`: the full asset slot manifest and shot list
7. `docs/TODO.md`: an explicit inventory of every placeholder, unwritten copy block, and unpopulated data field remaining, so I have a punch list

## 11. Working process

Work in stages and stop for my review between them:

1. Design plan and information architecture, plus the content schema definitions. No code beyond schemas.
2. Layout, tokens, component shell, and placeholder system.
3. Pages and content.
4. Forms and Worker routes.
5. SEO, structured data, accessibility, performance pass, and the documentation deliverables.

Do not scaffold all five stages before I have reviewed stage one.
