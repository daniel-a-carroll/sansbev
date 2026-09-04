/**
 * Cloudflare Worker entry.
 *
 * The site itself is fully static — this Worker exists only to handle the
 * three form endpoints. Everything else falls through to the static assets
 * binding untouched, so the build stays `output: 'static'`.
 *
 * Progressive enhancement contract:
 *   - Browser without JS posts a normal form encoding and gets a 303 redirect
 *     to /thank-you on success, or a self-contained HTML error page on failure.
 *   - Browser with JS posts JSON with `Accept: application/json` and gets a
 *     JSON result to render inline.
 * No submitted data ever appears in a URL in either path.
 */

import { z } from 'zod';
import {
  subscribeSchema,
  requestStoreSchema,
  wholesaleSchema,
  HONEYPOT_FIELD,
} from '../src/lib/form-schemas';
import { getProvider, type Env, type Submission } from './submissions';

const ROUTES = {
  '/api/subscribe': { schema: subscribeSchema, form: 'subscribe' },
  '/api/request-store': { schema: requestStoreSchema, form: 'request-store' },
  '/api/wholesale': { schema: wholesaleSchema, form: 'wholesale' },
} as const satisfies Record<string, { schema: z.ZodTypeAny; form: Submission['form'] }>;

type RoutePath = keyof typeof ROUTES;

const isRoute = (p: string): p is RoutePath => p in ROUTES;

/* -------------------------------------------------------------------------- *
 * Rate limiting
 *
 * Uses Cloudflare's rate limiting binding when configured — it keeps counters
 * on Cloudflare's side, so no visitor data is stored to enforce it. Falls back
 * to an in-memory counter, which is per-isolate and therefore leaky, but is
 * still enough to stop a naive script and costs nothing. Combined with the
 * honeypot this is proportionate for a brand site; no CAPTCHA, per the brief.
 * -------------------------------------------------------------------------- */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const memory = new Map<string, { count: number; resetAt: number }>();

async function rateLimited(env: Env, key: string): Promise<boolean> {
  if (env.RATE_LIMITER) {
    const { success } = await env.RATE_LIMITER.limit({ key });
    return !success;
  }

  const now = Date.now();
  const entry = memory.get(key);

  if (!entry || now > entry.resetAt) {
    memory.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

/* -------------------------------------------------------------------------- *
 * Responses
 * -------------------------------------------------------------------------- */

const wantsJson = (request: Request): boolean =>
  (request.headers.get('accept') ?? '').includes('application/json');

const escapeHtml = (s: string): string =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!
  );

/**
 * No-JS error page. Self-contained so it cannot drift from a stylesheet it
 * does not load, and intentionally plain — almost nobody reaches it, since
 * client-side validation catches these first when JS is available.
 */
const errorPage = (errors: Record<string, string>, backTo: string): Response =>
  new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>Check your details</title>
<style>
  body{background:#f1f3ef;color:#13241d;font:16px/1.6 system-ui,sans-serif;
       margin:0;padding:3rem 1.5rem;}
  main{max-width:34rem;margin:0 auto;}
  h1{font-size:1.5rem;line-height:1.2;margin:0 0 1rem;}
  ul{padding-left:1.2rem;margin:0 0 1.5rem;}
  a{color:#b63510;}
</style></head><body><main>
<h1>Check your details</h1>
<ul>${Object.entries(errors)
      .map(([, message]) => `<li>${escapeHtml(message)}</li>`)
      .join('')}</ul>
<p><a href="${escapeHtml(backTo)}">Go back and try again</a></p>
</main></body></html>`,
    { status: 400, headers: { 'content-type': 'text/html; charset=utf-8' } }
  );

/* -------------------------------------------------------------------------- *
 * Handler
 * -------------------------------------------------------------------------- */

async function handleSubmission(
  request: Request,
  env: Env,
  path: RoutePath
): Promise<Response> {
  const { schema, form } = ROUTES[path];
  const json = wantsJson(request);
  const referer = request.headers.get('referer') ?? '/';

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: { allow: 'POST' } });
  }

  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
  if (await rateLimited(env, `${form}:${ip}`)) {
    const message = 'Too many submissions. Wait a minute and try again.';
    return json
      ? Response.json({ ok: false, formError: message }, { status: 429 })
      : errorPage({ _: message }, referer);
  }

  // Accept both encodings so the same endpoint serves both paths.
  let raw: Record<string, unknown>;
  try {
    if ((request.headers.get('content-type') ?? '').includes('application/json')) {
      raw = (await request.json()) as Record<string, unknown>;
    } else {
      raw = Object.fromEntries(await request.formData()) as Record<string, unknown>;
    }
  } catch {
    return json
      ? Response.json({ ok: false, formError: 'Could not read submission.' }, { status: 400 })
      : errorPage({ _: 'Could not read submission.' }, referer);
  }

  // Honeypot. Answer exactly as if it succeeded — telling a bot it failed
  // teaches it to try again without the trap.
  if (typeof raw[HONEYPOT_FIELD] === 'string' && raw[HONEYPOT_FIELD] !== '') {
    return json
      ? Response.json({ ok: true })
      : Response.redirect(new URL('/thank-you', request.url).href, 303);
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? '_');
      errors[field] ??= issue.message;
    }
    return json
      ? Response.json({ ok: false, errors }, { status: 400 })
      : errorPage(errors, referer);
  }

  // Whitelist: only validated fields reach the provider, honeypot stripped.
  const data: Record<string, string> = {};
  for (const [key, value] of Object.entries(parsed.data as Record<string, unknown>)) {
    if (key === HONEYPOT_FIELD) continue;
    if (value === undefined || value === '') continue;
    data[key] = String(value);
  }

  try {
    await getProvider(env).submit({
      form,
      data,
      meta: {
        submittedAt: new Date().toISOString(),
        country: request.headers.get('cf-ipcountry') ?? undefined,
        userAgent: request.headers.get('user-agent') ?? undefined,
      },
    });
  } catch (error) {
    // Never swallow this: a dropped lead is the most expensive failure here.
    console.error(`[submission:${form}] provider failed`, error);
    const message =
      'Something went wrong on our end and your details were not sent. Please email us directly.';
    return json
      ? Response.json({ ok: false, formError: message }, { status: 502 })
      : errorPage({ _: message }, referer);
  }

  return json
    ? Response.json({ ok: true })
    : Response.redirect(new URL('/thank-you', request.url).href, 303);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const path = new URL(request.url).pathname.replace(/\/$/, '');

    if (isRoute(path)) {
      return handleSubmission(request, env, path);
    }

    // Everything else is the static site.
    return env.ASSETS.fetch(request);
  },
};
