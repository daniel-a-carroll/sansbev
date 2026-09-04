/* ===========================================================================
 * PRODUCT CLAIMS -- REVIEW THIS FILE AS ONE UNIT BEFORE LAUNCH
 * ===========================================================================
 *
 * FDA treats website content as product labeling. Every user-visible string in
 * this file is legally equivalent to text printed on the can, and must be
 * reviewed against the physical label by qualified counsel before launch.
 *
 * This file is deliberately organized to be READ TOP TO BOTTOM by a reviewer,
 * not organized by where the copy appears on the site. Nothing that makes a
 * claim about the product may live anywhere else in the codebase.
 *
 * ---------------------------------------------------------------------------
 * RULES FOR ANY STRING ADDED HERE
 * ---------------------------------------------------------------------------
 *
 * 1. DESCRIBE COMPOSITION, NOT EFFECT.
 *    "Contains 100mg L-theanine" is a fact about the can.
 *    "Keeps you calm and focused" is a claim about a body. Prefer the first.
 *
 * 2. NO DISEASE CLAIMS, EVER.
 *    Nothing may state or imply that the product treats, prevents, mitigates,
 *    cures, or diagnoses any condition -- including soft forms such as
 *    "supports immune health", "reduces stress", "fights fatigue", or naming a
 *    condition anywhere near the product.
 *
 * 3. STRUCTURE/FUNCTION CLAIMS ARE NARROWER HERE THAN FOR A SUPPLEMENT.
 *    This is a CONVENTIONAL FOOD, not a dietary supplement. For conventional
 *    foods, a structure/function claim must derive from the food's NUTRITIVE
 *    VALUE. Caffeine and L-theanine are not generally treated as nutritive
 *    components, so effect claims resting on them are materially riskier than
 *    the same words on a supplement label. Do not assume supplement-industry
 *    copy is a safe template.
 *
 * 4. TWO TERMS THE FOUNDER HAS USED IN CONVERSATION ARE NOT CLEARED:
 *
 *    "healthy" -- This is a REGULATED nutrient content claim with a codified
 *    definition, not a descriptive adjective. FDA finalized an updated
 *    definition in December 2024 (compliance date in 2028). It has TWO legs,
 *    and low numbers only satisfy one of them:
 *
 *      (a) LIMITS on added sugars, sodium, and saturated fat. Founder reports
 *          the formula will clear these. Plausible -- but it is the easy leg.
 *      (b) A QUALIFYING FOOD-GROUP AMOUNT. The product must actually contain a
 *          meaningful equivalent from a recognized food group. For this
 *          beverage the only realistic route is FRUIT, via juice content.
 *          A drink can be low in everything and still fail "healthy" by
 *          containing too little real juice.
 *
 *    So the open question is not the sugar or sodium numbers -- it is the juice
 *    percentage in the finished formula. Confirm (b) against the rule before
 *    this word appears anywhere on the site. Until then it stays in
 *    prohibitedTerms below. "Healthy energy drink alternative" remains fine as
 *    internal positioning; it is a labeling claim as on-site copy.
 *
 *    "all natural" -- FDA has no codified definition, but does apply a
 *    longstanding policy that nothing artificial or synthetic is included that
 *    a consumer would not expect. Separately, "natural" is the most-litigated
 *    term in food labeling and a standing class-action magnet.
 *      - Caffeine: founder confirms naturally derived. Record the actual source
 *        (green tea, green coffee bean, guarana) in compositionPoints -- the
 *        specific source is both better copy and better substantiation than the
 *        umbrella word.
 *      - L-theanine: OPEN. Commonly synthesized or fermentation-derived rather
 *        than tea-extracted. Founder is researching naturally derived supply.
 *        If the sourced ingredient is synthetic, "all natural" is a live risk
 *        even though the caffeine is clean.
 *    Prefer specific, verifiable statements over the umbrella term regardless.
 *    "150mg caffeine from green tea" is stronger copy AND lower risk than
 *    "all natural".
 *
 * 5. COMPARATIVE CLAIMS ARE ADVERTISING CLAIMS.
 *    Naming or alluding to a competitor invokes Lanham Act exposure on top of
 *    FDA. Any comparison must be to a substantiated, documented fact.
 *
 * 6. CERTIFICATIONS ARE CLAIMS TOO.
 *    Organic, non-GMO, gluten-free, kosher, "clean label" -- none of these go
 *    on the site until the certification exists on paper.
 *
 * This file is not legal advice. It is a structure for getting legal advice
 * efficiently: hand this one file to counsel rather than the whole repo.
 * ======================================================================== */

import { z } from 'astro/zod';

const claimsSchema = z.object({
  /** One sentence. What the product IS. No effect language. */
  productDescriptor: z.string(),

  /** The composition facts. Each must be verifiable from the finished spec. */
  compositionPoints: z.array(
    z.object({
      label: z.string(),
      /** Optional supporting detail. Keep it factual. */
      detail: z.string().optional(),
      /** false until the finished formula confirms it. Unconfirmed points
       *  render with a review flag in dev and are omitted from the build. */
      confirmed: z.boolean().default(false),
    })
  ),

  /** Statements about what is NOT in the can. Safer ground than effects,
   *  but still require the finished formula to be true. */
  absencePoints: z.array(
    z.object({
      label: z.string(),
      confirmed: z.boolean().default(false),
    })
  ),

  /** Required disclosures. Caffeine content disclosure is standard practice
   *  for this category even where not strictly mandated. */
  disclosures: z.object({
    caffeine: z.string().optional(),
    notRecommendedFor: z.string().optional(),
    general: z.string().optional(),
  }),

  /** Terms banned from generated copy. Referenced by the copy lint in stage 5,
   *  which fails the build if any appear in rendered output. */
  prohibitedTerms: z.array(z.string()),
});

export const claims = claimsSchema.parse({
  productDescriptor:
    '[[PLACEHOLDER — one sentence describing what is in the can. Composition only, no effect language.]]',

  compositionPoints: [
    {
      label: '[[PLACEHOLDER — caffeine source and amount, e.g. "150mg caffeine from green tea"]]',
      detail: '[[PLACEHOLDER — source detail, needed for any natural positioning]]',
      confirmed: false,
    },
    {
      label: '[[PLACEHOLDER — L-theanine amount and source]]',
      confirmed: false,
    },
    {
      label: '[[PLACEHOLDER — juice content, e.g. "X% real fruit juice"]]',
      confirmed: false,
    },
    {
      label: '[[PLACEHOLDER — sweetener approach, stated as composition]]',
      confirmed: false,
    },
  ],

  absencePoints: [
    { label: '[[PLACEHOLDER — e.g. "No artificial colors"]]', confirmed: false },
    { label: '[[PLACEHOLDER — e.g. "No artificial flavors"]]', confirmed: false },
    { label: '[[PLACEHOLDER — carbohydrate/sugar statement, stated factually]]', confirmed: false },
  ],

  disclosures: {
    caffeine:
      '[[PLACEHOLDER — caffeine per can disclosure, e.g. "Contains 150mg caffeine per 12 fl oz can."]]',
    notRecommendedFor:
      '[[PLACEHOLDER — standard category advisory. Confirm exact wording with counsel.]]',
    general: undefined,
  },

  // Enforced by the build-time copy lint added in stage 5.
  prohibitedTerms: [
    'healthy',
    'healthful',
    'all natural',
    'detox',
    'cleanse',
    'boosts immunity',
    'immune support',
    'reduces stress',
    'anxiety',
    'depression',
    'fights fatigue',
    'burns fat',
    'metabolism booster',
    'clinically proven',
    'doctor recommended',
    'cures',
    'treats',
    'prevents',
  ],
});

export type Claims = z.infer<typeof claimsSchema>;
