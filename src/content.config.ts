import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { hasEntries } from './lib/data-files';

/**
 * A data file with no entries is the EXPECTED pre-launch state here — there
 * are no stockists and no press yet. Astro's file() loader warns on every
 * build when that happens, which trains you to ignore build warnings, so this
 * substitutes a silent no-op loader until the file actually has entries.
 */
const fileOrEmpty = (path: string) =>
  hasEntries(path) ? file(path) : { name: `empty:${path}`, load: async () => {} };

/* ------------------------------------------------------------------------- *
 * Shared primitives
 * ------------------------------------------------------------------------- */

const hex = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/, 'Use a 6-digit hex color, e.g. #A8123A');

/**
 * A SKU color is never a single value. Picking a new field color without also
 * declaring what text is legible on it is how a re-skin silently breaks WCAG AA,
 * so the pair is enforced here rather than trusted to a component.
 *
 * `field`  full-bleed band behind large display type
 * `onText` the ink used ON that band -- must clear 4.5:1 against `field`
 * `ink`    a darker sibling for small accent text on the page ground
 */
const skuColor = z.object({
  field: hex,
  onText: hex,
  ink: hex,
});

/* ------------------------------------------------------------------------- *
 * flavors -- one markdown file per SKU. Three at launch.
 *
 * `name` is the ONLY required field. Everything else is unknown as of now and
 * every consuming component must render without it. See docs/IA.md.
 * ------------------------------------------------------------------------- */

const nutrition = z
  .object({
    servingSizeFlOz: z.number().positive().optional(),
    servingsPerContainer: z.number().positive().optional(),
    calories: z.number().nonnegative().optional(),
    totalFatG: z.number().nonnegative().optional(),
    saturatedFatG: z.number().nonnegative().optional(),
    transFatG: z.number().nonnegative().optional(),
    cholesterolMg: z.number().nonnegative().optional(),
    sodiumMg: z.number().nonnegative().optional(),
    totalCarbohydrateG: z.number().nonnegative().optional(),
    dietaryFiberG: z.number().nonnegative().optional(),
    totalSugarsG: z.number().nonnegative().optional(),
    addedSugarsG: z.number().nonnegative().optional(),
    sugarAlcoholsG: z.number().nonnegative().optional(),
    proteinG: z.number().nonnegative().optional(),
    // Percent Daily Value is COMPUTED from these amounts against the FDA
    // reference table at render time -- never stored -- so the panel cannot
    // drift out of sync with the amounts or with a serving-size change.
    micronutrients: z
      .array(
        z.object({
          name: z.string(),
          amountMg: z.number().nonnegative().optional(),
          amountMcg: z.number().nonnegative().optional(),
        })
      )
      .optional(),
  })
  .optional();

const flavors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/flavors' }),
  schema: z.object({
    name: z.string(),
    order: z.number().int().optional(),
    status: z
      .enum(['concept', 'in-development', 'launched'])
      .default('concept'),
    tagline: z.string().optional(),
    description: z.string().optional(),
    tastingNotes: z.array(z.string()).optional(),

    // Label data
    ingredients: z.array(z.string()).optional(),
    allergenStatement: z.string().optional(),
    juicePercent: z.number().min(0).max(100).optional(),
    caffeineMg: z.number().nonnegative().optional(),
    lTheanineMg: z.number().nonnegative().optional(),
    nutrition,

    // Trade data
    upc: z
      .string()
      .regex(/^\d{12,14}$/, 'UPC/GTIN is 12-14 digits')
      .optional(),
    canSizeFlOz: z.number().positive().optional(),

    // Provisional SKU color. Absent -> the flavor renders in the house palette.
    color: skuColor.optional(),

    // Overrides the `flavor-<id>-*` asset slot convention. Rarely needed.
    assetSlot: z.string().optional(),

    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),

    draft: z.boolean().default(false),
  }),
});

/* ------------------------------------------------------------------------- *
 * locations -- one hand-maintained YAML file. Add a store, commit, deploy.
 * ------------------------------------------------------------------------- */

const locations = defineCollection({
  loader: fileOrEmpty('src/content/locations.yaml'),
  schema: z.object({
    name: z.string(),
    chain: z.string().optional(),
    type: z
      .enum([
        'natural-grocery',
        'independent',
        'convenience',
        'specialty',
        'foodservice',
        'other',
      ])
      .default('independent'),
    address1: z.string().optional(),
    address2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().length(2).default('CO'),
    zip: z
      .string()
      .regex(/^\d{5}(-\d{4})?$/, 'ZIP must be 5 or 9 digits')
      .optional(),
    // Only needed to appear on the Colorado map. Absent -> list only.
    lat: z.number().min(-90).max(90).optional(),
    lng: z.number().min(-180).max(180).optional(),
    url: z.string().url().optional(),
    phone: z.string().optional(),
    dateAdded: z.coerce.date().optional(),
    notes: z.string().optional(),
  }),
});

/* ------------------------------------------------------------------------- *
 * faq -- split by audience so the trade page and the consumer pages can each
 * pull only what is relevant to their reader.
 * ------------------------------------------------------------------------- */

const faq = defineCollection({
  loader: file('src/content/faq.yaml'),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    audience: z.enum(['consumer', 'trade', 'both']).default('both'),
    order: z.number().int().optional(),
  }),
});

/* ------------------------------------------------------------------------- *
 * press -- empty until there is press. The section hides itself when so.
 * ------------------------------------------------------------------------- */

const press = defineCollection({
  loader: fileOrEmpty('src/content/press.yaml'),
  schema: z.object({
    outlet: z.string(),
    title: z.string(),
    url: z.string().url().optional(),
    date: z.coerce.date().optional(),
    excerpt: z.string().optional(),
  }),
});

export const collections = { flavors, locations, faq, press };
