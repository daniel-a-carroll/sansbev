/**
 * sitemap.xml, hand-rolled rather than pulled in as an integration.
 *
 * It is twenty lines and one fewer dependency, and it lets us exclude the
 * noindex pages (thank-you, 404) explicitly rather than configuring an
 * integration to do the same thing.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

const STATIC_PATHS = [
  '/',
  '/product',
  '/where-to-buy',
  '/wholesale',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
];

export const GET: APIRoute = async () => {
  const flavors = await getCollection('flavors', ({ data }) => !data.draft);
  const paths = [...STATIC_PATHS, ...flavors.map((f) => `/product/${f.id}`)];

  const urls = paths
    .map((path) => `  <url><loc>${new URL(path, site.brand.domain).href}</loc></url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};
