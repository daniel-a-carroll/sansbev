/**
 * Trade specifications for the /wholesale page.
 *
 * This is the highest-value data on the site. A category buyer evaluating a
 * listing needs case pack, dimensions, pallet configuration, shelf life, and
 * SRP before they can model it. Every field is optional now; the specs table
 * renders only the rows that have values and hides itself entirely if empty.
 *
 * Edit this file to change anything in the trade specifications block, or to
 * point at a sell sheet PDF once one exists.
 */

import { z } from 'astro/zod';

const dimensionsSchema = z.object({
  length: z.number().positive(),
  width: z.number().positive(),
  height: z.number().positive(),
  unit: z.enum(['in', 'cm']).default('in'),
});

const tradeSchema = z.object({
  /** Brand-level GTIN. Per-SKU UPCs live on the flavor entries. */
  gtin: z.string().regex(/^\d{12,14}$/).optional(),

  casePack: z.number().int().positive().optional(),
  caseDimensions: dimensionsSchema.optional(),
  caseWeightLb: z.number().positive().optional(),

  /** Ti = cases per pallet layer. Hi = layers per pallet. */
  palletTi: z.number().int().positive().optional(),
  palletHi: z.number().int().positive().optional(),

  shelfLifeDays: z.number().int().positive().optional(),
  storageRequirements: z.string().optional(),

  srpUsd: z.number().positive().optional(),
  /** Free-form so it can express "5 cases" or "1 pallet mixed". */
  minimumOrder: z.string().optional(),

  leadTimeDays: z.number().int().positive().optional(),

  distributors: z
    .array(
      z.object({
        name: z.string(),
        regions: z.array(z.string()).optional(),
        note: z.string().optional(),
      })
    )
    .default([]),

  production: z
    .object({
      facility: z.string().optional(),
      city: z.string().optional(),
      state: z.string().length(2).optional(),
      certifications: z.array(z.string()).default([]),
    })
    .optional(),

  /**
   * Path to the sell sheet PDF, relative to /public.
   * Drop the file in and set this string -- the page swaps from the
   * "contact us for the current sell sheet" state automatically.
   */
  sellSheetPath: z.string().optional(),
  sellSheetUpdated: z.coerce.date().optional(),
});

export const trade = tradeSchema.parse({
  gtin: undefined,
  casePack: undefined, // [[PLACEHOLDER — units per case]]
  caseDimensions: undefined, // [[PLACEHOLDER — L x W x H in inches]]
  caseWeightLb: undefined,
  palletTi: undefined, // [[PLACEHOLDER — cases per layer]]
  palletHi: undefined, // [[PLACEHOLDER — layers per pallet]]
  shelfLifeDays: undefined, // [[PLACEHOLDER — shelf life from production date]]
  storageRequirements: undefined,
  srpUsd: undefined, // [[PLACEHOLDER — suggested retail price per unit]]
  minimumOrder: undefined, // [[PLACEHOLDER — MOQ]]
  leadTimeDays: undefined,
  distributors: [], // Empty until relationships exist. Section hides itself.
  production: undefined, // [[PLACEHOLDER — co-packer and certifications]]
  sellSheetPath: undefined, // Drop a PDF in /public and set the path here.
  sellSheetUpdated: undefined,
});

export type Trade = z.infer<typeof tradeSchema>;
