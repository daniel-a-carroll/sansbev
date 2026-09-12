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
 *    THE BRAND BOARD IS PUBLISHED, AND ITS COPY IS NOT CLEARED.
 *    At the founder's direction the marketing board is live, full-bleed, on the
 *    wholesale page. The SECOND board carries different and materially riskier
 *    copy than the first. Full transcript in imageClaims below.
 *
 *    "CALM FOCUS" IS THE MOST EXPOSED LINE ON THE SITE.
 *    It is a structure/function claim about a mental state, and it sits
 *    directly above "400 MG L-THEANINE", which ties the claimed effect to a
 *    specific ingredient at a specific dose. That pairing is the problem: it
 *    reads as "this ingredient, at this amount, produces this state", which is
 *    precisely the construction that needs substantiation.
 *
 *    Re-read item 3 above. This is a CONVENTIONAL FOOD. For conventional foods
 *    a structure/function claim must derive from NUTRITIVE VALUE, and
 *    L-theanine is not generally treated as a nutritive component. Supplement
 *    brands make this exact claim routinely; that is not precedent, because
 *    they are regulated under a different section. The same words on a can of
 *    soda are a different question.
 *
 *    "NATURAL ENERGY" has the same shape, paired with the caffeine figure, but
 *    is weaker: energy from caffeine is closer to common understanding.
 *
 *    "0 ADDED SUGAR" is a REGULATED nutrient content claim, not a description.
 *    It has a codified definition (21 CFR 101.60(c)(2)) and it obliges the
 *    Nutrition Facts panel to declare 0g added sugars. It is plausible here,
 *    since nothing in the ingredient list is a sweetener. But note the juice is
 *    now a BLEND, and apple juice is a common way to sweeten a formula without
 *    adding "sugar". That is legitimate and the claim can still hold, because
 *    juice sugars are intrinsic rather than added. Two consequences to expect:
 *    total sugars will not be zero, and a reviewer will read "0 added sugar"
 *    next to an apple-juice blend with interest. Have the finished panel in
 *    hand before this ships.
 *
 *    "NO PRESERVATIVES" and "NO ARTIFICIAL INGREDIENTS" are absence claims.
 *    Cheap to make, expensive to be wrong about. They must hold for the
 *    finished formula including processing aids, not just the declared list.
 *
 *    "A CLEANER WAY" invites the question "cleaner than what?". Comparative in
 *    spirit even without a named competitor. See item 5.
 *
 *    If counsel objects to any of it, the fix is a board export without those
 *    lines. The cans and their ingredient panels carry the argument alone, and
 *    that is the argument the written copy already makes.
 *
 *    HOW THE GUARD COVERS THIS. The lint reads rendered TEXT and cannot read
 *    words inside a picture, so images would otherwise walk straight past it.
 *    Every published image with words on it is therefore transcribed into
 *    imageClaims, and the lint scans those transcripts exactly as it scans the
 *    HTML. Publish an image with copy on it and you must transcribe it first.
 *    NOTE that none of the lines above trip prohibitedTerms: the transcript is
 *    there so a human reviewer sees them, not because the lint will catch them.
 *
 * 4d. THE FORMULA CHANGED. Ingredients are now, in label order: carbonated
 *    water, organic juice (a named two-fruit blend), caffeine from green coffee
 *    beans, L-theanine from green tea, acacia (natural fiber), and salt.
 *
 *    ACACIA is new. It is gum arabic, a soluble dietary fiber. It is not a
 *    claim in itself, but it will appear as dietary fiber on the Nutrition
 *    Facts panel, and "natural fiber" on the can is a description that the
 *    panel has to support.
 *
 *    THE JUICE IS A BLEND, and every SKU contains a second fruit: lime and
 *    apple, pineapple and lime, cranberry and apple. The site names the blend
 *    everywhere rather than saying "fruit juice", because the can does. This
 *    also bears on the juice-percentage question in item 4 above: the
 *    food-group leg of "healthy" depends on total juice content, and a blend
 *    may make that easier to reach.
 *
 *    ARTWORK INCONSISTENCY, worth fixing before print: the pineapple can sets
 *    its ingredient panel in ALL CAPS while lime and cranberry use sentence
 *    case. Purely cosmetic, but it is the kind of thing a buyer notices on a
 *    shelf and a printer will not fix for you.
 *
 * 4e. THE COMBINED JUICE LINE MAY NOT SURVIVE A REAL LABEL REVIEW.
 *
 *    The artwork declares one line, "Organic Juice (Lime and Apple)". Founder
 *    raised the obvious question: that is two ingredients, and an ingredient
 *    statement normally lists every ingredient separately, by common name, in
 *    DESCENDING ORDER OF PREDOMINANCE BY WEIGHT (21 CFR 101.4(a)(1)).
 *
 *    There is a route by which the combined line can be legitimate. If the
 *    juice is bought as a single pre-made blend from a supplier, it is a
 *    COMPOUND ingredient, and those may be declared either by naming the blend
 *    with its components in parentheses, or by dropping the components into the
 *    main list (21 CFR 101.4(b)(2)). Note the "and/or" shorthand that exists
 *    for fats and oils does NOT extend to juices.
 *
 *    So the question for the co-packer and the label reviewer is narrow:
 *      - Is the juice purchased as one blended ingredient, or are two juices
 *        dosed separately at the plant? If dosed separately, they must be
 *        listed separately and the combined line goes.
 *
 *    THE ORDERING CONSEQUENCE MATTERS MORE THAN THE COUNT. Either way the
 *    components appear in descending order by weight. Apple is a common, cheap
 *    juice base, so if apple predominates the label reads APPLE FIRST, on a can
 *    whose front says LIME. That is a bigger deal than whether the list runs to
 *    six lines or seven, and it should be settled before print rather than
 *    discovered by a category buyer reading the panel.
 *
 *    It also bears on the juice-percentage question in item 4: total juice is
 *    what the food-group leg of "healthy" turns on, and on a beverage naming a
 *    fruit, 21 CFR 102.33 governs how the flavour may be named relative to what
 *    is actually in it.
 *
 *    THE SITE DOES NOT DEPEND ON THE ANSWER. No copy states an ingredient
 *    count, and the panels render from the per-flavor `ingredients` arrays. If
 *    the label splits the juice into two lines, that is a data edit in
 *    src/content/flavors/, with no component or copy change.
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
      label: '220mg caffeine from green coffee beans',
      detail: 'Per 12 fl oz can.',
      confirmed: true,
    },
    {
      label: 'Made with organic fruit juice',
      // The juice is a BLEND and the can names it. Lime is lime and apple,
      // pineapple is pineapple and lime, cranberry is cranberry and apple.
      // Per-flavor lists live on the flavor entries.
      detail: 'A named blend, printed on the front of the can.',
      confirmed: true,
    },
    {
      label: 'Acacia fiber',
      detail: 'A natural soluble fiber. Per 12 fl oz can.',
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
      where: 'Wholesale page, full-bleed under the intro',
      // Transcribed from src/assets/brand-board.png. SECOND BOARD: the copy
      // changed substantially from the first one, so this is a fresh
      // transcription, not an edit.
      transcript: [
        'SANS',
        'ENERGY DRINK',
        "What's important is what's not in it.",
        '0 ADDED SUGAR',
        'NO ARTIFICIAL INGREDIENTS',
        'NO PRESERVATIVES',
        'REAL ENERGY. A CLEANER WAY.',
        'INGREDIENTS',
        'Carbonated Water',
        'Organic Juice (Lime and Apple)',
        'Organic Juice (Pineapple and Lime)',
        'Organic Juice (Cranberry and Apple)',
        'Caffeine (From Green Coffee Beans) 220 MG',
        'L-Theanine (From Green Tea) 400 MG',
        'Acacia (Natural Fiber)',
        'Salt (For Balance)',
        'LIME',
        'PINEAPPLE',
        'CRANBERRY',
        'NATURAL ENERGY',
        '220 MG CAFFEINE (FROM GREEN COFFEE BEANS)',
        'CALM FOCUS',
        '400 MG L-THEANINE (FROM GREEN TEA)',
        'PLANT-BASED GOODNESS',
        'ACACIA (NATURAL FIBER)',
        'REAL FRUIT JUICE',
        'LIME, PINEAPPLE OR CRANBERRY',
        'SIMPLE INGREDIENTS. BIG DIFFERENCE.',
      ],
      // None of these trip prohibitedTerms, so the build passes. That is NOT
      // the same as being cleared, and this board is riskier than the last one.
      needsReview: [
        'CALM FOCUS',        // see 4d below. The most exposed line on the site.
        'NATURAL ENERGY',
        '0 ADDED SUGAR',     // regulated nutrient content claim
        'NO PRESERVATIVES',
        'NO ARTIFICIAL INGREDIENTS',
        'REAL ENERGY. A CLEANER WAY.',
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
