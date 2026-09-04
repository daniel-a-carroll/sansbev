# SansBev

Marketing site for SansBev, a Colorado natural functional energy drink brand.
Static Astro site on Cloudflare Workers, with three form endpoints handled by
the Worker that serves it.

**The site is pre-launch and deliberately not indexable.** Every page emits
`noindex` and `robots.txt` disallows everything until you set `launched: true`
in `src/data/site.ts`.

- **Changing content?** → [docs/EDITING.md](docs/EDITING.md)
- **What's left to do?** → [docs/TODO.md](docs/TODO.md)
- **Need photography?** → [ASSETS.md](ASSETS.md)
- **Pulling the signup list?** → [docs/EXPORT.md](docs/EXPORT.md)

---

## Running it

Requires **Node 20**. (Wrangler 4.129+ needs Node 22; this project pins 4.86 so
it runs on 20. If you move to Node 22, you can upgrade wrangler and raise
`compatibility_date` in `wrangler.jsonc`.)

```bash
npm install
npm run dev          # Astro dev server — pages, styling, content
```

`npm run dev` does not run the Worker, so forms will not submit. To exercise the
full stack including the form endpoints:

```bash
npm run preview      # builds, then serves via wrangler with the Worker
```

| Script | What it does |
|---|---|
| `npm run dev` | Astro dev server. Fast, no Worker. |
| `npm run build` | Static build to `dist/`, then the claims lint. |
| `npm run preview` | Build + `wrangler dev` — the real thing, locally. |
| `npm run deploy` | Build + deploy to Cloudflare. |
| `npm run check` | TypeScript and Astro diagnostics. |
| `npm run todo` | Grep for remaining placeholders. |
| `npm run todo:doc` | Regenerate `docs/TODO.md`. |
| `npm run assets:manifest` | Regenerate `ASSETS.md`. |
| `npm run lint:copy` | Claims language check against built output. |

## Deploying

Source of truth is GitHub. Two options, pick one:

**Cloudflare Workers Builds (recommended).** In the Cloudflare dashboard,
Workers → Create → connect this repo. Build command `npm run build`, output
directory `dist`. Every push to `main` deploys. No workflow file to maintain and
no API token to store in GitHub — for a solo operator that is meaningfully less
to remember.

**Manual.** `npm run deploy` from your machine. Requires `wrangler login`.

### Secrets

Form submissions are emailed via Resend. Set these once:

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put NOTIFY_FROM     # verified sender, e.g. site@sansbev.com
npx wrangler secret put NOTIFY_TO       # where inquiries land
```

**Without these, the Worker logs submissions instead of sending them and every
lead is silently lost.** For local development put the same keys in `.dev.vars`
(gitignored).

### Custom domain

Attach `sansbev.com` in the Cloudflare dashboard under the Worker's Settings →
Domains & Routes. Do this **last** — before then the site is placeholder content
and a buyer finding it is worse than them finding nothing.

## How it is built

| | |
|---|---|
| **Astro 5**, `output: 'static'` | No SSR, no adapter. Every page is HTML at build time. |
| **TypeScript**, strict | |
| **Vanilla CSS with custom properties** | One file re-skins the site, which is the controlling requirement. Tailwind would scatter those values across markup. |
| **Zod** | Server-side validation in the Worker; also types the content collections. |
| **Wrangler** | Deploy tooling. |

Four dependencies total. No UI framework, no component library, no CSS
framework. `sitemap.xml` and `robots.txt` are twenty-line endpoints rather than
an integration.

### Structure

```
src/
  data/              Typed singletons — site, copy, claims, trade, asset slots
  content/           Content collections — flavors, locations, faq, press
  styles/tokens.css  Every design token. The re-skin file.
  lib/               Asset resolution, nutrition math, JSON-LD, form schemas
  components/        Presentation. No content lives here.
  pages/             Routes
worker/
  index.ts           /api/* handlers; everything else falls through to assets
  submissions.ts     Provider-agnostic submission interface
```

### Three things worth knowing

**Content is never in components.** Copy, product data, and structured content
live in typed data files so that filling the site in later is a data drop, not a
refactor. Every field that has not been supplied yet is optional, and components
hide themselves rather than rendering empty.

**Images are slots, not paths.** `<Asset slot="home-hero-can" />` renders a real
responsive image if `src/assets/home-hero-can.png` exists, and a
dimension-exact labeled placeholder if it does not. Placeholders reserve the
same intrinsic dimensions as the real file, so swapping one in causes no layout
shift. There are no `<img>` tags anywhere else.

**Claims are quarantined.** FDA treats website content as product labeling, so
every product claim lives in `src/data/claims.ts` and nowhere else — hand that
one file to counsel rather than the repo. `npm run build` fails if prohibited
claims language reaches the built HTML.

## Forms

Three endpoints: `/api/subscribe`, `/api/request-store`, `/api/wholesale`.

They work without JavaScript — a native POST gets a 303 to `/thank-you`, and
validation failures get a self-contained HTML error page. With JavaScript they
upgrade to inline async submission with field-level errors and focus management.
No submitted data ever appears in a URL.

Protection is a honeypot field plus per-IP rate limiting (5/minute). No CAPTCHA.
The rate limiter uses Cloudflare's binding when configured and an in-memory
counter otherwise — see the commented block in `wrangler.jsonc`.

Every submission goes through one `SubmissionProvider` interface in
`worker/submissions.ts`. Swapping Resend for D1, Klaviyo, or Mailchimp is one
new class and one line in `getProvider()`; no component, route, or schema
changes. See [docs/EXPORT.md](docs/EXPORT.md).

## Design

Provisional. There is no brand identity yet — the palette, typeface, and layout
are deliberate placeholder choices, documented with reasoning and a written
self-review in [docs/DESIGN.md](docs/DESIGN.md). Information architecture and
the content model are in [docs/IA.md](docs/IA.md).
