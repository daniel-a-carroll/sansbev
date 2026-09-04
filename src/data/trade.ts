/**
 * Wholesale page data.
 *
 * DECISION: specifications are NOT published on the site. No SRP, MOQ, case
 * pack, dimensions, pallet configuration, or co-packer appears publicly. A
 * buyer requests them through the inquiry form and the founder sends the sell
 * sheet directly. That keeps pricing flexible per account and turns every
 * spec request into a conversation.
 *
 * What IS published is the LIST of what you will send, with no values attached
 * (`availableOnRequest` below). It signals that the operational answers exist
 * and are ready, which is the credibility the spec table would have carried,
 * and it makes the form's payoff concrete instead of "contact us".
 *
 * There are deliberately no numeric spec fields in this file. Dead data that
 * never renders does not belong in the repo. If you later decide to publish
 * real specs, add the fields back then.
 *
 * Edit this file to change anything on the wholesale page except the prose,
 * which lives in copy.ts.
 */

import { z } from 'astro/zod';

const tradeSchema = z.object({
  /**
   * Retail channels actively being sought. Rendered so an inquiry from a
   * channel you do not serve filters itself out before it reaches your inbox.
   */
  channels: z.array(z.string()).default([]),

  /**
   * The disclosure list. Published without values -- this is the replacement
   * for the public specifications table. Order matters; lead with what a
   * category buyer needs first to model a listing.
   */
  availableOnRequest: z.array(z.string()).default([]),

  /**
   * Certifications are credibility rather than negotiating leverage, so these
   * are safe to publish -- but only once they exist on paper. An unearned
   * certification claim is a claims-compliance problem, not just a fib.
   * See src/data/claims.ts.
   */
  certifications: z.array(z.string()).default([]),

  /**
   * Response-time commitment shown next to the inquiry form. Buyers read this
   * as a competence signal. An unanswered form is worse than no form, so do
   * not publish a window you will not hold.
   */
  responseTime: z.string().optional(),

  /**
   * Sell sheet delivery.
   * 'request' -- gated behind the inquiry form (current decision)
   * 'public'  -- direct download; requires publicPath to be set
   */
  sellSheet: z
    .object({
      mode: z.enum(['request', 'public']).default('request'),
      /** Path under /public. Only used when mode is 'public'. */
      publicPath: z.string().optional(),
      updated: z.coerce.date().optional(),
    })
    .default({ mode: 'request' }),
});

export const trade = tradeSchema.parse({
  channels: [
    '[[PLACEHOLDER — channel 1, e.g. Natural grocery]]',
    '[[PLACEHOLDER — channel 2, e.g. Independent markets]]',
    '[[PLACEHOLDER — channel 3, e.g. Convenience]]',
  ],

  // Values are never published. This list is the point.
  availableOnRequest: [
    'Case pack and case dimensions',
    'Pallet configuration',
    'Shelf life',
    'SRP guidance',
    'Minimum order quantity',
    'Lead times',
    'Certifications',
    'Current distributor coverage',
  ],

  // Empty until certifications actually exist. The section hides itself.
  certifications: [],

  responseTime: '[[PLACEHOLDER — response commitment, e.g. "We reply within two business days."]]',

  sellSheet: {
    mode: 'request',
    publicPath: undefined,
    updated: undefined,
  },
});

export type Trade = z.infer<typeof tradeSchema>;
