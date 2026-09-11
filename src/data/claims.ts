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
 *      - L-theanine: RESOLVED on sourcing. The second-generation packaging
 *        declares "L-Theanine (from green tea)", which is a plant source, not
 *        a synthetic or fermentation-derived one. Keep supplier documentation
 *        proving the tea origin: it is the substantiation for the claim.
 *        This removes the specific objection that was open, but does NOT
 *        clear the umbrella term "all natural", which remains a litigation
 *        magnet on its own.
 *    Prefer specific, verifiable statements over the umbrella term regardless.
 *    "150mg caffeine from green tea" is stronger copy AND lower risk than
 *    "all natural".
 *
 * 4b. WHAT WAS REMOVED FROM THE FOUNDER'S ABOUT-PAGE DRAFT.
 *    The founder supplied his story in his own words. The narrative is used
 *    almost intact in copy.ts. These specific phrases were NOT published, and
 *    the reasoning is recorded here so counsel can review the decision rather
 *    than discover the omission:
 *
 *      "still healthy alternative"       -> "healthy" is a regulated nutrient
 *                                          content claim. See item 4 above.
 *                                          The build lint rejects it outright.
 *      "all natural ingredients"         -> unresolved while L-theanine
 *                                          sourcing is open. Build lint
 *                                          rejects it outright.
 *      "benefits my health overall"      -> a health claim about the body,
 *                                          resting on non-nutritive components.
 *                                          See item 3 above.
 *      "gives me the energy that I need" -> an effect claim. Composition only.
 *      "better for you energy drink"     -> category shorthand that functions
 *                                          as an implied health claim.
 *      "probably not the best for me"    -> implies competing products are
 *                                          harmful. See item 5 below.
 *
 *    If counsel clears any of these against the finished formula, they can be
 *    restored to copy.ts and removed from prohibitedTerms deliberately. Do not
 *    restore them by weakening the lint.
 *
 * 4c. NEW EXPOSURES INTRODUCED BY THE SECOND-GENERATION PACKAGING.
 *
 *    "ORGANIC" -- the cans declare "Organic Lime/Pineapple/Cranberry Juice".
 *    Organic is a REGULATED term administered by USDA under the National
 *    Organic Program, not a descriptor. Using it on a label requires the
 *    ingredient to be certified organic and requires certification records.
 *    Labelling an uncertified ingredient organic is a federal violation, not
 *    a marketing risk. Get the supplier's organic certificate on file before
 *    this ships, and keep it. The site repeats the word only because it is
 *    reproducing the declared ingredient list.
 *
 *    L-THEANINE DOSE -- 400mg per can is high relative to the 100-200mg
 *    typical of the category. That is a formulation decision, not a labeling
 *    one, but flag it to whoever reviews the label: dose sits alongside the
 *    220mg caffeine figure and both will draw a reviewer's eye.
 *
 *    THE BRAND BOARD IS NOW PUBLISHED, AND ITS COPY IS NOT CLEARED.
 *    At the founder's direction the marketing board is live on the product
 *    index page. It carries lines the site's own written copy deliberately
 *    avoids, because they are effect claims rather than composition:
 *
 *        "clean energy that moves you forward"
 *        "real ingredients. clean energy. no compromises."
 *        "fuel what matters"
 *        "zero artificial anything"
 *        "made for real life"
 *
 *    These are claims made to a reader exactly as if they were typed into the
 *    page, because FDA does not care whether copy is text or pixels. They are
 *    listed in imageClaims below and flagged there under needsReview.
 *
 *    If counsel objects, the fix is a version of the board WITHOUT those
 *    lines: the three cans and the ingredient panels carry the argument on
 *    their own. Do not solve it by removing the transcript.
 *
 *    HOW THE GUARD COVERS THIS. The lint reads rendered TEXT and cannot read
 *    words inside a picture, so images would otherwise walk straight past it.
 *    Every published image with words on it is therefore transcribed into
 *    imageClaims, and the lint scans those transcripts exactly as it scans the
 *    HTML. Publish an image with copy on it and you must transcribe it first.
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

  /**
   * CLAIM COPY THAT LIVES INSIDE AN IMAGE.
   *
   * The build's claims lint reads rendered TEXT. It cannot read words baked
   * into a picture, so an image carrying marketing copy would otherwise walk
   * straight past the guard.
   *
   * Every published image with words in it is registered here with a full
   * transcript. The lint scans these transcripts exactly as it scans the HTML,
   * which puts image copy back inside the guard and, just as importantly,
   * means a reviewer reading this one file sees ALL the claims the site makes,
   * not only the ones that happen to be selectable text.
   *
   * RULE: if you publish an image with words on it, transcribe it here first.
   */
  imageClaims: z.array(
    z.object({
      /** Asset slot name, so it is traceable to ASSETS.md. */
      asset: z.string(),
      where: z.string(),
      /** Every line of copy in the image, verbatim. */
      transcript: z.array(z.string()),
      /** Lines a reviewer should look at hardest. */
      needsReview: z.array(z.string()).default([]),
    })
  ).default([]),
});

export const claims = claimsSchema.parse({
  productDescriptor:
    '[[PLACEHOLDER: one sentence describing what is in the can. Composition only, no effect language.]]',

  compositionPoints: [
    // Confirmed: printed on all three packaging renders.
    {
      label: '220mg caffeine from green coffee',
      detail: 'Per 12 fl oz can.',
      confirmed: true,
    },
    {
      label: 'Made with real fruit juice',
      detail: undefined,
      confirmed: true,
    },
    // CAFFEINE FIGURE HISTORY -- the number has now moved three times:
    //   150mg  discussed early in development
    //   160mg  first-generation packaging renders
    //   200mg  founder direction
    //   220mg  second-generation packaging (current, and used here)
    //
    // The site and the can now AGREE at 220mg, which they did not before.
    // Keep them in lockstep: FDA treats this site as labeling, so any future
    // change has to land in both places in the same breath.
    {
      label: '400mg L-theanine from green tea',
      detail: 'Per 12 fl oz can.',
      confirmed: true,
    },
    {
      label: '[[PLACEHOLDER: juice percentage. Also the open question for the "healthy" claim.]]',
      confirmed: false,
    },
    {
      label: '[[PLACEHOLDER: sweetener approach, stated as composition]]',
      confirmed: false,
    },
  ],

  absencePoints: [
    { label: '[[PLACEHOLDER: e.g. "No artificial colors"]]', confirmed: false },
    { label: '[[PLACEHOLDER: e.g. "No artificial flavors"]]', confirmed: false },
    { label: '[[PLACEHOLDER: carbohydrate/sugar statement, stated factually]]', confirmed: false },
  ],

  disclosures: {
    // Matches the packaging exactly. Keep these two in sync.
    caffeine: 'Contains 220mg caffeine per 12 fl oz can.',
    // Category-standard advisory. At 200mg per can this is worth carrying
    // whether or not it is strictly required. Confirm exact wording with counsel.
    notRecommendedFor:
      'Not recommended for children, or for people sensitive to caffeine.',
    general: undefined,
  },

  imageClaims: [
    {
      asset: 'brand-board',
      where: 'Product index page, above the flavor cards',
      // Transcribed from assets/ChatGPT Image Sep 10, 2026, 10_15_07 PM.png
      transcript: [
        'SANS',
        'ENERGY DRINK',
        "WHAT'S IMPORTANT IS WHAT'S NOT IN IT",
        'PLANT-BASED CAFFEINE',
        'ZERO ARTIFICIAL ANYTHING',
        'REAL INGREDIENTS',
        'MADE FOR REAL LIFE',
        'CLEAN ENERGY THAT MOVES YOU FORWARD',
        'INGREDIENTS',
        'Carbonated Water',
        'Organic Lime Juice',
        'Organic Pineapple Juice',
        'Organic Cranberry Juice',
        'Caffeine (from green coffee) 220 MG',
        'L-Theanine (from green tea) 400 MG',
        'Salt',
        'LIME',
        'PINEAPPLE',
        'CRANBERRY',
        'REAL INGREDIENTS. CLEAN ENERGY. NO COMPROMISES.',
        'FUEL WHAT MATTERS',
      ],
      // None of these trip prohibitedTerms, so the build passes. That is not
      // the same as being cleared. Publishing this image publishes these lines
      // as labeling, and the site's own written copy deliberately avoids them:
      needsReview: [
        'CLEAN ENERGY THAT MOVES YOU FORWARD',
        'REAL INGREDIENTS. CLEAN ENERGY. NO COMPROMISES.',
        'FUEL WHAT MATTERS',
        'ZERO ARTIFICIAL ANYTHING',
        'MADE FOR REAL LIFE',
      ],
    },
  ],

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
