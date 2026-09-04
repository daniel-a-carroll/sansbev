/**
 * Nutrition panel logic.
 *
 * Percent Daily Values are COMPUTED here from the amounts stored on a flavor
 * entry, never stored alongside them. If a serving size or an amount changes,
 * the percentages follow automatically and cannot go stale — which matters,
 * because a wrong %DV on a page FDA treats as labeling is a real problem.
 *
 * Reference values are the FDA Daily Values for adults and children 4+ years
 * (21 CFR 101.9(c)(8)(iv) and (c)(9)), as used on the current Nutrition Facts
 * label format.
 */

export const DAILY_VALUES = {
  totalFatG: 78,
  saturatedFatG: 20,
  cholesterolMg: 300,
  sodiumMg: 2300,
  totalCarbohydrateG: 275,
  dietaryFiberG: 28,
  addedSugarsG: 50,
  proteinG: 50,
} as const;

/** Micronutrient Daily Values, keyed by lowercased name. */
export const MICRONUTRIENT_DV: Record<string, { amount: number; unit: 'mg' | 'mcg' }> = {
  'vitamin c': { amount: 90, unit: 'mg' },
  'vitamin d': { amount: 20, unit: 'mcg' },
  'vitamin e': { amount: 15, unit: 'mg' },
  thiamin: { amount: 1.2, unit: 'mg' },
  riboflavin: { amount: 1.3, unit: 'mg' },
  niacin: { amount: 16, unit: 'mg' },
  'vitamin b6': { amount: 1.7, unit: 'mg' },
  folate: { amount: 400, unit: 'mcg' },
  'vitamin b12': { amount: 2.4, unit: 'mcg' },
  biotin: { amount: 30, unit: 'mcg' },
  'pantothenic acid': { amount: 5, unit: 'mg' },
  calcium: { amount: 1300, unit: 'mg' },
  iron: { amount: 18, unit: 'mg' },
  magnesium: { amount: 420, unit: 'mg' },
  zinc: { amount: 11, unit: 'mg' },
  potassium: { amount: 4700, unit: 'mg' },
};

/**
 * FDA rounds %DV to the nearest whole percent. Values that round to zero are
 * expressed as 0%, not omitted, when the nutrient is declared.
 */
export const percentDV = (
  amount: number | undefined,
  dailyValue: number
): number | undefined =>
  amount === undefined ? undefined : Math.round((amount / dailyValue) * 100);

export const micronutrientPercentDV = (
  name: string,
  amountMg?: number,
  amountMcg?: number
): number | undefined => {
  const dv = MICRONUTRIENT_DV[name.trim().toLowerCase()];
  if (!dv) return undefined;

  const amount = dv.unit === 'mg' ? amountMg : amountMcg;
  if (amount === undefined) return undefined;

  return Math.round((amount / dv.amount) * 100);
};

/** Formats a declared amount with its unit, dropping trailing zeros. */
export const amount = (value: number | undefined, unit: string): string =>
  value === undefined ? '' : `${Number(value.toFixed(1))}${unit}`;

/**
 * True when there is enough data to render a panel at all. A panel with only
 * a calorie count is worse than no panel, so the component hides itself below
 * this threshold rather than rendering a mostly-empty regulated format.
 */
export const hasEnoughForPanel = (n: Record<string, unknown> | undefined): boolean => {
  if (!n) return false;
  const declared = [
    'calories',
    'totalFatG',
    'sodiumMg',
    'totalCarbohydrateG',
    'totalSugarsG',
    'proteinG',
  ].filter((k) => n[k] !== undefined);
  return declared.length >= 3;
};
