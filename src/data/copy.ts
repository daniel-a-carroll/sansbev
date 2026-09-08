/**
 * Page-level prose singletons.
 *
 * Anything that makes a CLAIM about the product belongs in claims.ts, not here.
 * This file holds brand narrative, section framing, and legal boilerplate.
 *
 * Copy rules, inherited from the claims constraints:
 *   - Describe composition and taste, never an effect on the body.
 *   - No comparisons to named or implied competitors. "Most energy drinks..."
 *     is a comparative advertising claim, not a turn of phrase.
 *   - Plain sentence case, active voice, no filler. Buttons state what happens.
 *
 * Remaining unwritten strings use the [[PLACEHOLDER — ...]] format. Run
 * `npm run todo` for the list.
 */

import { z } from 'astro/zod';

const seo = z.object({
  title: z.string(),
  description: z.string(),
});

/** Legal pages need headings, not a flat run of paragraphs. */
const legalPage = z.object({
  seo,
  /** Shown under the h1. Say plainly what the page covers. */
  summary: z.string().optional(),
  lastUpdated: z.string().optional(),
  sections: z
    .array(
      z.object({
        heading: z.string().optional(),
        body: z.array(z.string()),
      })
    )
    .default([]),
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
    privacy: legalPage,
    terms: legalPage,
  }),
});

export const copy = copySchema.parse({
  home: {
    seo: {
      title: 'SANS — energy drink made with real fruit juice',
      description:
        'A Colorado energy drink made with real fruit juice and 200mg of caffeine from green coffee. Three flavors: lime, pineapple, and cranberry.',
    },
    // The line printed on every can. It is the strongest copy the brand has, it
    // makes no claim about the body, and it is already on the packaging.
    heroHeadline: "What's important is what's not in it",
    heroSubhead:
      'Three flavors, made with real fruit juice, with 200mg of caffeine from green coffee.',
    heroTradeLinkLabel: 'See wholesale specs',

    storyHeading: 'It starts with the juice',
    storyBody: [
      'SANS is built around the fruit it is named for. Lime, pineapple, and cranberry are on the front of the can because they are what you taste.',
      'The caffeine comes from green coffee — 200mg in a 12 ounce can. The line on the can is the whole idea: what matters is the list of things that are not in it.',
    ],

    emailCaptureHeading: 'Find out when it lands near you',
    emailCaptureBody: 'We use your ZIP to decide which markets to open next.',
  },

  product: {
    seo: {
      title: 'Three flavors',
      description:
        'Lime, pineapple, and cranberry. Each made with real fruit juice, with 200mg of caffeine from green coffee, in a 12 ounce slim can.',
    },
    heading: 'Three flavors',
    intro:
      'Each one is built around the fruit it is named for. Twelve ounce slim cans, 200mg of caffeine from green coffee.',
  },

  whereToBuy: {
    seo: {
      title: 'Where to buy',
      description:
        'Find the stores carrying SANS. Not on shelves near you yet? Tell us where you shop.',
    },
    heading: 'Where to buy',
    intro: undefined,
    preLaunchHeading: 'Not on shelves yet',
    preLaunchBody:
      'We are still in production. Leave your ZIP and we will tell you when there is a store near you carrying it.',
  },

  wholesale: {
    seo: {
      title: 'Wholesale and retail partners',
      description:
        'Trade information for retail buyers, distributors, and brokers. Request the current sell sheet and full specifications.',
    },
    heading: 'Wholesale and retail partners',
    intro:
      'SANS is a 12 ounce slim-can energy drink made with real fruit juice, in three flavors, with 200mg of caffeine from green coffee. We are talking to buyers, distributors, and brokers in Colorado now. [[PLACEHOLDER — launch timing, and whether you are taking orders yet. One sentence.]]',
    availableOnRequestHeading: 'Available on request',
    availableOnRequestNote:
      'Send an inquiry and we will follow up with the current sell sheet and full specifications.',
    channelsHeading: 'Channels we serve',
    formHeading: 'Wholesale inquiry',
  },

  about: {
    seo: {
      title: 'About',
      description:
        'SANS is a Colorado energy drink made with real fruit juice. Who makes it and why.',
    },
    heading: 'About',
    body: [
      '[[PLACEHOLDER — founder story. Who started SANS, when, and what you were doing before. Two or three specific sentences. A category buyer reads this as evidence that there is a real operator behind the brand, so specifics matter more than polish.]]',
      'The idea was narrow enough to fit on the front of a can: put real fruit juice in an energy drink, name the fruit, and keep the rest of the ingredient list short enough to read in a store aisle.',
      'We are based in Colorado. [[PLACEHOLDER — where specifically, and where the product is produced. Buyers ask this early; answer it plainly here.]]',
    ],
  },

  contact: {
    seo: {
      title: 'Contact',
      description: 'Trade, general, and press contacts for SANS.',
    },
    heading: 'Contact',
    intro:
      'Trade inquiries are answered first. For wholesale specifications, the inquiry form is faster than email.',
  },

  legal: {
    privacy: {
      seo: {
        title: 'Privacy policy',
        description:
          'What SANS collects through this site, why, and how it is handled.',
      },
      summary:
        'This site collects very little, stores none of it on our own servers, and sets no cookies.',
      lastUpdated: '[[PLACEHOLDER — date this was last reviewed]]',
      sections: [
        {
          heading: 'What we collect',
          body: [
            'We collect information only when you choose to submit one of the three forms on this site.',
            'The email signup collects your email address and your ZIP code. The ZIP code is required, and we use it to decide which markets to open next.',
            'The store request form collects the name and location of a store you would like to see carrying SANS, and your email address if you choose to give it.',
            'The wholesale inquiry form collects your business name, your name, your email address, your role, and your channel, plus your number of locations, your region, and a message if you provide them.',
          ],
        },
        {
          heading: 'How it is handled',
          body: [
            'Submissions are forwarded to us by email through Resend, our email provider. They are not written to a database or stored on any server we operate. The record is our inbox.',
            'We do not sell this information, and we do not share it outside the business except with our email provider, which processes it in order to deliver the message.',
            'We may report demand in aggregate — for example, how many people in a given area have asked for the product — to retailers and distributors. That reporting does not identify individuals.',
          ],
        },
        {
          heading: 'Cookies and analytics',
          body: [
            'This site sets no cookies and runs no advertising or cross-site tracking.',
            'We use Cloudflare Web Analytics, which measures page views without cookies and without collecting personal information. That is why this site does not ask you to dismiss a consent banner.',
          ],
        },
        {
          heading: 'Keeping or removing your information',
          body: [
            'We keep submissions for as long as they are useful to the business and then delete them.',
            '[[PLACEHOLDER — the address people should write to in order to be removed. Set the contact addresses in src/data/site.ts, then name the general one here.]]',
          ],
        },
        {
          heading: 'Changes',
          body: ['If this policy changes we will update this page and the date above.'],
        },
        {
          body: [
            '[[PLACEHOLDER — REVIEW REQUIRED. This policy was written to describe accurately what the site actually does, but it has not been reviewed by counsel and does not attempt to address state-specific privacy obligations. Have it reviewed before launch.]]',
          ],
        },
      ],
    },

    terms: {
      seo: {
        title: 'Terms of use',
        description: 'Terms governing use of the SANS website.',
      },
      summary: 'The short version: this site is informational.',
      lastUpdated: '[[PLACEHOLDER — date this was last reviewed]]',
      sections: [
        {
          heading: 'About this site',
          body: [
            'This site exists to describe our products and to let retailers, distributors, and customers get in touch. It does not sell anything and does not process payments.',
          ],
        },
        {
          heading: 'Product information',
          body: [
            'We work to keep product information on this site accurate and current. Formulations, ingredients, and specifications can change, and the label on the can you are holding is the authoritative source for that product.',
            'Trade specifications provided on request describe our products at the time they are sent, and are not an offer or a binding quotation.',
          ],
        },
        {
          heading: 'What you send us',
          body: [
            'Please do not submit information through this site that is confidential or that you do not have the right to share. How we handle what you do send is described in our privacy policy.',
          ],
        },
        {
          heading: 'Content and trademarks',
          body: [
            'The content of this site, including the SANS name and packaging design, belongs to us. Please do not reproduce it for commercial purposes without permission.',
          ],
        },
        {
          heading: 'Links to other sites',
          body: [
            'Where we link to a retailer or another outside site, we do not control that site and are not responsible for its content.',
          ],
        },
        {
          body: [
            '[[PLACEHOLDER — REVIEW REQUIRED. These terms are a plain-language starting point, not a complete or jurisdiction-specific agreement. They deliberately omit warranty disclaimers, limitation of liability, and governing law, all of which counsel should decide. Have this reviewed before launch.]]',
          ],
        },
      ],
    },
  },
});

export type Copy = z.infer<typeof copySchema>;
