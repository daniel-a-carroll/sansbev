/**
 * Site-wide singleton config. Brand identity, contact routes, and the values
 * that feed Organization / LocalBusiness JSON-LD.
 *
 * Edit this file to change: the brand name anywhere it appears, the tagline,
 * any email address, or the physical address in structured data.
 */

import { z } from 'astro/zod';

/**
 * THE NAME. Working name, trademark clearance pending.
 *
 * This is the only place the brand name is written. Every page title, the
 * footer, JSON-LD and any copy that names the brand reads it from here, so a
 * rename is this one line. Never append a trademark or registered symbol to
 * it, here or anywhere: nothing is registered, and the build lint fails if
 * either character ships.
 */
export const BRAND_NAME = 'SIX';

/**
 * THE WORDMARK. Rendered as live text by Wordmark.astro, never as an image.
 *
 * Open question: the word or the numeral. To try the numeral, set this to '6'.
 * The typeface, weight and tracking it is set in live in tokens.css under
 * --wordmark-*, so trying a different face is also a one-place edit.
 */
export const WORDMARK = BRAND_NAME;

/**
 * THE WORDMARK ARTWORK. The basename of an SVG in src/assets (any subfolder).
 * When set and present, the header and footer inline it and it takes the
 * --wordmark-color token. Set to null to fall back to the live-text WORDMARK
 * above, for example to try the numeral.
 */
export const WORDMARK_ART: string | null = 'six-logo';

const siteSchema = z.object({
  brand: z.object({
    /** Working name. Appears in the wordmark, <title>, and JSON-LD. */
    name: z.string(),
    /** Legal entity, for the footer and Organization schema. */
    legalName: z.string().optional(),
    tagline: z.string().optional(),
    domain: z.string().url(),
    /** The string Wordmark.astro sets. See WORDMARK above. */
    wordmark: z.string(),
    /** SVG basename for the logo artwork. Null means live text. */
    wordmarkArt: z.string().nullable(),
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
    name: BRAND_NAME,
    wordmark: WORDMARK,
    wordmarkArt: WORDMARK_ART,
    legalName: '[[PLACEHOLDER: registered legal entity name]]',
    // The rule, not a count. A promise survives reformulation; a description
    // of the current recipe does not.
    tagline: 'Never more than six.',
    domain: 'https://sansbev.com',
    nameIsFinal: false,
  },

  // Pre-launch: the whole site is noindex until this is true. See docs/EDITING.md.
  launched: false,

  contact: {
    trade: undefined, // [[PLACEHOLDER: trade/wholesale inquiry address]]
    general: undefined, // [[PLACEHOLDER: general address]]
    press: undefined, // [[PLACEHOLDER: press address]]
    phone: undefined,
  },

  address: undefined, // [[PLACEHOLDER: business address for LocalBusiness JSON-LD]]

  social: [],

  analytics: {
    cloudflareToken: undefined, // [[PLACEHOLDER: Cloudflare Web Analytics token]]
  },
});

export type Site = z.infer<typeof siteSchema>;
