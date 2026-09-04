/**
 * Site-wide singleton config. Brand identity, contact routes, and the values
 * that feed Organization / LocalBusiness JSON-LD.
 *
 * Edit this file to change: the brand name anywhere it appears, the tagline,
 * any email address, or the physical address in structured data.
 */

import { z } from 'astro/zod';

const siteSchema = z.object({
  brand: z.object({
    /** Working name. Appears in the wordmark, <title>, and JSON-LD. */
    name: z.string(),
    /** Legal entity, for the footer and Organization schema. */
    legalName: z.string().optional(),
    tagline: z.string().optional(),
    domain: z.string().url(),
    /** Set true once the name is final -- flips the wordmark out of its
     *  provisional treatment and clears the dev banner. */
    nameIsFinal: z.boolean().default(false),
  }),

  /**
   * THE LAUNCH SWITCH.
   *
   * While false, every page emits <meta name="robots" content="noindex,
   * nofollow"> and robots.txt disallows everything. This is what keeps Google
   * from indexing placeholder copy, which is slow and annoying to undo.
   *
   * Flip to true only when the site is genuinely ready to be found. Nothing
   * else in the codebase needs to change.
   */
  launched: z.boolean().default(false),

  contact: z.object({
    trade: z.string().email().optional(),
    general: z.string().email().optional(),
    press: z.string().email().optional(),
    phone: z.string().optional(),
  }),

  /** Required for LocalBusiness JSON-LD. Omit entirely rather than faking it --
   *  the schema block is skipped when absent. */
  address: z
    .object({
      street: z.string().optional(),
      city: z.string(),
      state: z.string().length(2),
      zip: z.string().regex(/^\d{5}$/),
      country: z.string().default('US'),
    })
    .optional(),

  social: z
    .array(
      z.object({
        platform: z.string(),
        url: z.string().url(),
      })
    )
    .default([]),

  analytics: z.object({
    /** Cloudflare Web Analytics. Cookie-free, so no consent banner needed. */
    cloudflareToken: z.string().optional(),
  }),
});

export const site = siteSchema.parse({
  brand: {
    name: 'SansBev',
    legalName: '[[PLACEHOLDER — registered legal entity name]]',
    tagline: '[[PLACEHOLDER — one-line tagline, sentence case, no filler]]',
    domain: 'https://sansbev.com',
    nameIsFinal: false,
  },

  // Pre-launch: the whole site is noindex until this is true. See docs/EDITING.md.
  launched: false,

  contact: {
    trade: undefined, // [[PLACEHOLDER — trade/wholesale inquiry address]]
    general: undefined, // [[PLACEHOLDER — general address]]
    press: undefined, // [[PLACEHOLDER — press address]]
    phone: undefined,
  },

  address: undefined, // [[PLACEHOLDER — business address for LocalBusiness JSON-LD]]

  social: [],

  analytics: {
    cloudflareToken: undefined, // [[PLACEHOLDER — Cloudflare Web Analytics token]]
  },
});

export type Site = z.infer<typeof siteSchema>;
