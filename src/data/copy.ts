/**
 * Page-level prose singletons.
 *
 * Anything that makes a CLAIM about the product belongs in claims.ts, not here.
 * This file holds brand narrative, section framing, and legal boilerplate.
 *
 * Every unwritten string uses the [[PLACEHOLDER — ...]] format. Run
 * `grep -rn "\[\[PLACEHOLDER" src/` for the full punch list.
 */

import { z } from 'astro/zod';

const seo = z.object({
  title: z.string(),
  description: z.string(),
});

const copySchema = z.object({
  home: z.object({
    seo,
    /** The one large display line. Keep it short enough to set at scale. */
    heroHeadline: z.string(),
    heroSubhead: z.string().optional(),
    /** Trade entry point lives in the hero -- audience priority, per DESIGN.md. */
    heroTradeLinkLabel: z.string(),
    storyHeading: z.string().optional(),
    storyBody: z.array(z.string()).default([]),
    emailCaptureHeading: z.string(),
    emailCaptureBody: z.string().optional(),
  }),

  product: z.object({
    seo,
    heading: z.string(),
    intro: z.string().optional(),
  }),

  whereToBuy: z.object({
    seo,
    heading: z.string(),
    intro: z.string().optional(),
    /** Shown when the locations collection is empty. Not an error state. */
    preLaunchHeading: z.string(),
    preLaunchBody: z.string(),
  }),

  wholesale: z.object({
    seo,
    heading: z.string(),
    intro: z.string().optional(),
    /** Heading over trade.availableOnRequest — the no-values disclosure list. */
    availableOnRequestHeading: z.string(),
    availableOnRequestNote: z.string().optional(),
    channelsHeading: z.string(),
    formHeading: z.string(),
  }),

  about: z.object({
    seo,
    heading: z.string(),
    body: z.array(z.string()).default([]),
  }),

  contact: z.object({
    seo,
    heading: z.string(),
    intro: z.string().optional(),
  }),

  legal: z.object({
    privacy: z.object({ seo, body: z.array(z.string()).default([]) }),
    terms: z.object({ seo, body: z.array(z.string()).default([]) }),
  }),
});

export const copy = copySchema.parse({
  home: {
    seo: {
      title: '[[PLACEHOLDER — home meta title, under 60 chars]]',
      description: '[[PLACEHOLDER — home meta description, under 155 chars]]',
    },
    heroHeadline: '[[PLACEHOLDER — hero headline. Short. Sentence case.]]',
    heroSubhead: '[[PLACEHOLDER — one supporting sentence]]',
    heroTradeLinkLabel: 'See wholesale specs',
    storyHeading: '[[PLACEHOLDER — brand story section heading]]',
    storyBody: [
      '[[PLACEHOLDER — brand story paragraph 1]]',
      '[[PLACEHOLDER — brand story paragraph 2]]',
    ],
    emailCaptureHeading: 'Find out when it lands near you',
    emailCaptureBody:
      'We use your ZIP to decide which markets to open next.',
  },

  product: {
    seo: {
      title: '[[PLACEHOLDER — product meta title]]',
      description: '[[PLACEHOLDER — product meta description]]',
    },
    heading: 'The lineup',
    intro: '[[PLACEHOLDER — one or two sentences introducing the range]]',
  },

  whereToBuy: {
    seo: {
      title: '[[PLACEHOLDER — where to buy meta title]]',
      description: '[[PLACEHOLDER — where to buy meta description]]',
    },
    heading: 'Where to buy',
    intro: undefined,
    preLaunchHeading: 'Not on shelves yet',
    preLaunchBody:
      'We are still in production. Leave your ZIP and we will tell you when there is a store near you carrying it.',
  },

  wholesale: {
    seo: {
      title: '[[PLACEHOLDER — wholesale meta title]]',
      description: '[[PLACEHOLDER — wholesale meta description]]',
    },
    heading: 'Wholesale and retail partners',
    intro: '[[PLACEHOLDER — one paragraph aimed at category buyers and distributors]]',
    availableOnRequestHeading: 'Available on request',
    availableOnRequestNote:
      'Send an inquiry and we will follow up with the current sell sheet and full specifications.',
    channelsHeading: 'Channels we serve',
    formHeading: 'Wholesale inquiry',
  },

  about: {
    seo: {
      title: '[[PLACEHOLDER — about meta title]]',
      description: '[[PLACEHOLDER — about meta description]]',
    },
    heading: 'About',
    body: [
      '[[PLACEHOLDER — founder story paragraph]]',
      '[[PLACEHOLDER — why this product exists paragraph]]',
      '[[PLACEHOLDER — Colorado provenance paragraph]]',
    ],
  },

  contact: {
    seo: {
      title: '[[PLACEHOLDER — contact meta title]]',
      description: '[[PLACEHOLDER — contact meta description]]',
    },
    heading: 'Contact',
    intro: undefined,
  },

  legal: {
    privacy: {
      seo: {
        title: 'Privacy policy',
        description: 'How SansBev handles information collected through this site.',
      },
      body: ['[[PLACEHOLDER — privacy policy. Must describe the email/ZIP capture and the form data retained.]]'],
    },
    terms: {
      seo: {
        title: 'Terms of use',
        description: 'Terms governing use of the SansBev website.',
      },
      body: ['[[PLACEHOLDER — terms of use]]'],
    },
  },
});

export type Copy = z.infer<typeof copySchema>;
