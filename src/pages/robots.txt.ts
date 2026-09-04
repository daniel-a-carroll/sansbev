/**
 * robots.txt, generated so it stays in sync with the launch switch.
 *
 * While site.launched is false this disallows everything — placeholder copy
 * getting indexed is slow and irritating to undo. Flipping site.launched to
 * true opens it up and adds the sitemap reference.
 */
import type { APIRoute } from 'astro';
import { site } from '../data/site';

export const GET: APIRoute = () => {
  const body = site.launched
    ? [
        'User-agent: *',
        'Allow: /',
        '',
        `Sitemap: ${new URL('/sitemap.xml', site.brand.domain).href}`,
        '',
      ].join('\n')
    : [
        '# Pre-launch. The site is not ready to be indexed.',
        '# Flip `launched` in src/data/site.ts to open this up.',
        'User-agent: *',
        'Disallow: /',
        '',
      ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
