/**
 * PRE-LAUNCH LANDING PAGE CONTENT
 *
 * The site's only job right now is turning a visitor into an email subscriber.
 * Not selling, not explaining the founder, not building a library.
 *
 * THE ARGUMENT IS COMPOSITIONAL. Every section names a problem the reader
 * already feels, gives the solution, and backs it with proof, and the proof is
 * the ingredient panel. A six-item list a person can read and verify is
 * stronger than any claim, testimonial or study, because it cannot be argued
 * with.
 *
 * So: DO NOT WRITE PERSUASIVE COPY WHERE A PHOTOGRAPHED LABEL WOULD DO THE
 * WORK. If you find yourself adding adjectives to a section, the section
 * probably needs a better photograph instead.
 *
 * What must never appear here, because a brand built on not overstating cannot
 * afford any of it:
 *   - that plant-sourced caffeine works better than synthetic. It does not;
 *     the trials found them bioequivalent. State the SOURCE, never superiority.
 *   - "clinically proven" or similar about the finished product. No clinical
 *     work has been done on it.
 *   - disease claims of any kind.
 *   - competitor ingredients described as toxic, dangerous or unsafe. Show
 *     their labels. Do not editorialise. Brands that editorialised here drew
 *     regulatory and credibility problems.
 *   - comparative performance claims without substantiation on file.
 *
 * The rule throughout: state what is in the can, let the reader conclude.
 */

import { z } from 'astro/zod';

const captureSchema = z.object({
  fieldLabel: z.string(),
  submitLabel: z.string(),
  successHeading: z.string(),
  /** Repeat the OFFER here. The confirmation is the last thing anyone reads. */
  successBody: z.string(),
  note: z.string(),
});

/** A competitor label shown as evidence. Photograph, never a retyped list. */
const competitorSchema = z.object({
  /** Asset slot holding the photograph. */
  asset: z.string(),
  brand: z.string(),
  /** Factual caption. Describes what is visible. No editorialising. */
  caption: z.string(),
  /** Roughly how many items their list runs to, if counted. */
  ingredientCount: z.number().int().positive().optional(),
});

const landingSchema = z.object({
  capture: captureSchema,

  hero: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    subheadIntro: z.string(),
    captureLabel: z.string(),
  }),

  /** Section 2. The longest section on the page, and the most load-bearing. */
  label: z.object({
    problem: z.string(),
    heading: z.string(),
    body: z.array(z.string()).default([]),
    oursHeading: z.string(),
    theirsHeading: z.string(),
    competitors: z.array(competitorSchema).default([]),
    captureLabel: z.string(),
  }),

  /**
   * Section 3. Their own packaging is the evidence, but it is NOT the headline.
   *
   * The big type is our 20%, not their 0%. Setting a competitor's line as the
   * largest text on the section spends our own emphasis amplifying their
   * phrase, and leaves the reader's strongest visual memory of the section
   * being someone else's brand. Their disclosure still does the work, one size
   * down, directly above the photographs where it belongs as a caption to
   * evidence rather than as our argument.
   */
  juice: z.object({
    problem: z.string(),
    heading: z.string(),
    subhead: z.string().optional(),
    body: z.array(z.string()).default([]),
    competitorHeading: z.string(),
    competitorNote: z.string().optional(),
    competitors: z.array(competitorSchema).default([]),
    captureLabel: z.string(),
  }),

  /**
   * Section 4. Absorbs the taste point from section 3: the two were making one
   * argument across two headings.
   *
   * State the sugar number OURSELVES. Omitting it would be the single dishonest
   * move on a page whose whole claim is that it does not overstate.
   */
  sweetener: z.object({
    problem: z.string(),
    heading: z.string(),
    body: z.array(z.string()).default([]),
    facts: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    /**
     * Sweeteners used across the category, as a plain list.
     *
     * The length is the argument, exactly as with the ingredient panels: our
     * sweetener line is empty and this one runs to forty items. It is a neutral
     * enumeration of what the category sweetens with, NOT a claim that any of
     * them is unsafe. Do not add adjectives here. Brands that editorialised
     * about competitor ingredients drew regulatory and credibility problems,
     * and the plain list is more damaging anyway.
     */
    categorySweetenersHeading: z.string(),
    categorySweetenersNote: z.string(),
    categorySweeteners: z.array(z.string()).default([]),
    captureLabel: z.string(),
  }),

  /** Section 5. Deliberately the SHORTEST. See the note in the data below. */
  pairing: z.object({
    problem: z.string(),
    heading: z.string(),
    body: z.array(z.string()).default([]),
    researchHeading: z.string(),
    researchNote: z.string(),
    research: z
      .array(
        z.object({
          citation: z.string(),
          /** Paste the DOI or PubMed link after verifying it resolves. */
          url: z.string().url().optional(),
        })
      )
      .default([]),
    captureLabel: z.string(),
  }),

  /** Section 6. The most shareable element on the page. */
  constraint: z.object({
    heading: z.string(),
    intro: z.string().optional(),
    rules: z.array(z.string()).default([]),
    captureLabel: z.string(),
  }),

  /**
   * Section 7. BUILT BUT HIDDEN. Add entries and it appears; the section hides
   * itself while the array is empty, so six months of reactions land here
   * without a redesign.
   */
  reactions: z.object({
    heading: z.string(),
    items: z
      .array(z.object({ text: z.string(), attribution: z.string().optional() }))
      .default([]),
    captureLabel: z.string(),
  }),

  /** Section 8. One action. No competing links. */
  ask: z.object({
    heading: z.string(),
    body: z.array(z.string()).default([]),
    captureLabel: z.string(),
  }),
});

export const landing = landingSchema.parse({
  capture: {
    fieldLabel: 'Email address',
    submitLabel: 'Join the list',
    successHeading: "You're on the list",
    successBody:
      'You will be invited to the taste panel before launch, and the first cans go to this list first.',
    note: 'One email when there is something worth telling you. Nothing else.',
  },

  hero: {
    eyebrow: 'Energy drink',
    headline: 'The energy drink you would actually want to be drinking',
    subheadIntro: 'The whole ingredient list, on the front of the can.',
    captureLabel: 'Get invited to the taste panel',
  },

  label: {
    problem: 'You cannot pronounce what is in your energy drink.',
    heading: 'Read the label',
    body: [
      'Ours is on the left. Theirs is on the right.',
    ],
    oursHeading: 'SANS',
    theirsHeading: 'Celsius',
    competitors: [
      {
        asset: 'competitor-celsius-panel',
        brand: 'Celsius',
        caption: 'Their ingredient statement, reproduced as printed.',
      },
    ],
    captureLabel: 'Want to read the real one? Join the list',
  },

  juice: {
    problem: 'Every energy drink flavour is synthetic.',
    heading: 'SANS is 20% real organic juice',
    subhead: 'Not from concentrate.',
    body: [
      'The flavour is the fruit. There is no flavour system doing an impression of it.',
    ],
    competitorHeading: 'Contains 0% juice',
    competitorNote:
      'That line is printed on their cans, by them. It is not our accusation, it is their disclosure.',
    competitors: [
      {
        asset: 'competitor-celsius-zero-juice',
        brand: 'Celsius',
        caption: 'CONTAINS 0% JUICE, printed on the can.',
      },
      {
        asset: 'competitor-alani-zero-juice',
        brand: 'Alani Nu',
        caption: 'CONTAINS 0% JUICE, printed on the can.',
      },
      {
        asset: 'competitor-kirkland-zero-juice',
        brand: 'Kirkland Signature',
        caption: 'CONTAINS 0% JUICE, printed on the can.',
      },
    ],
    captureLabel: 'Taste it before anyone else. Join the list',
  },

  sweetener: {
    problem:
      'Every option is bad. Sucralose, stevia, sugar alcohols, or 54 grams of sugar.',
    heading: 'Nothing to sweeten it',
    body: [
      'Theirs is sweet. Ours tastes real. That is why we use real juice, not from concentrate.',
      'Never sweetened. Always tasty.',
      'Our panel has no sweetener line at all. Not a natural one, not a synthetic one, not one hidden inside a blend name. The sugar is the fruit, and the number is ours to state rather than yours to discover.',
    ],
    facts: [
      { value: '10 g', label: 'sugar, all of it from the juice' },
      { value: '0 g', label: 'added sugar' },
      { value: '40', label: 'calories' },
    ],

    categorySweetenersHeading: 'What the category sweetens with',
    categorySweetenersNote:
      'Sweeteners in common use across energy drinks and soft drinks. Our panel uses none of them.',
    categorySweeteners: [
      'Aspartame', 'Acesulfame potassium', 'Sucralose', 'Saccharin', 'Neotame',
      'Advantame', 'Cyclamate', 'Neohesperidin dihydrochalcone',
      'Steviol glycosides (Reb A, Reb D, Reb M)', 'Monk fruit mogrosides',
      'Thaumatin', 'Brazzein', 'Monellin', 'Miraculin', 'Glycyrrhizin',
      'Erythritol', 'Xylitol', 'Sorbitol', 'Maltitol', 'Isomalt', 'Lactitol',
      'Allulose', 'Tagatose', 'Isomaltulose', 'Trehalose',
      'High-fructose corn syrup', 'Sucrose', 'Glucose / dextrose',
      'Glucose syrup', 'Fructose', 'Invert sugar', 'Honey', 'Agave',
      'Maple syrup', 'Coconut sugar', 'Date sugar', 'Brown rice syrup',
      'Tapioca syrup',
    ],
    captureLabel: 'Join the list',
  },

  pairing: {
    problem: 'Caffeine on its own gives you the jitter and the crash.',
    heading: 'Caffeine and L-theanine',
    body: [
      'Both are in the can, and both amounts are on the front of it. The caffeine comes from green coffee beans and the L-theanine from green tea.',
    ],
    researchHeading: 'The research on the pairing',
    researchNote:
      'These are studies on the two compounds together, not on this drink. No clinical work has been done on SANS, and we will not imply otherwise.',
    research: [
      {
        citation:
          'Owen GN, Parnell H, De Bruin EA, Rycroft JA. The combined effects of L-theanine and caffeine on cognitive performance and mood. Nutritional Neuroscience, 2008;11(4):193-198.',
      },
      {
        citation:
          'Haskell CF, Kennedy DO, Milne AL, Wesnes KA, Scholey AB. The effects of L-theanine, caffeine and their combination on cognition and mood. Biological Psychology, 2008;77(2):113-122.',
      },
      {
        citation:
          'Giesbrecht T, Rycroft JA, Rowson MJ, De Bruin EA. The combination of L-theanine and caffeine improves cognitive performance and increases subjective alertness. Nutritional Neuroscience, 2010;13(6):283-290.',
      },
      {
        citation:
          'Camfield DA, Stough C, Farrimond J, Scholey AB. Acute effects of tea constituents L-theanine, caffeine, and epigallocatechin gallate on cognitive function and mood: a systematic review and meta-analysis. Nutrition Reviews, 2014;72(8):507-522.',
      },
      {
        citation:
          'Kahathuduwa CN, Dassanayake TL, Amarakoon AMT, Weerasinghe VS. Acute effects of theanine, caffeine and theanine-caffeine combination on attention. Nutritional Neuroscience, 2017;20(6):369-377.',
      },
    ],
    captureLabel: 'Join the list',
  },

  constraint: {
    heading: 'What we will not do',
    intro:
      'Not features we added. Rules we are bound by, and the reason there is nothing else to find on the label.',
    rules: [
      'Every ingredient recognisable as food',
      'No synthetic or high-intensity sweeteners of any kind',
      'No artificial flavours, colours or preservatives',
      'Caffeine from a plant',
      'Real juice, never flavouring',
    ],
    captureLabel: 'Hold us to it. Join the list',
  },

  reactions: {
    heading: 'What people said',
    // EMPTY ON PURPOSE. The section does not render until this has entries.
    // Paste real messages as they arrive; no redesign needed.
    items: [],
    captureLabel: 'Join the list',
  },

  ask: {
    heading: 'Join the list',
    body: [
      'There is nothing to buy yet and will not be for a while. What there is, is a taste panel before launch and a first run that goes to this list first.',
    ],
    captureLabel: 'Get invited to the taste panel',
  },
});

export type Landing = z.infer<typeof landingSchema>;
