/**
 * THE NUMBERS. Every price, time and product figure the site states.
 *
 * These are the verified figures from the brief. Do not re-derive or re-round
 * them in components: if a number changes, it changes here and nowhere else.
 * Display strings sit beside the raw values on purpose, so that a rounding
 * decision ("about $670", "about 57 hours") is made once, by a person, rather
 * than by whatever Math.round happens to do in a template.
 *
 * The savings and time figures are ILLUSTRATIVE ESTIMATES. Anywhere they are
 * shown, `assumptions` must be shown with them.
 */

export const product = {
  canFlOz: 12,
  juicePercent: 20,
  caffeineMg: 220,
  lTheanineMg: 200,
  /** The rule. Also the current count, but the copy says the rule. */
  maxIngredients: 6,
} as const;

export const price = {
  /** List price per can. */
  perCan: '$6.00',
  /** Every Nth case free on subscription. */
  freeCaseEvery: 4,
  freeCaseEveryWord: 'fourth',
  /** Effective per-can price for a steady subscriber. */
  subscriberPerCan: '$4.67',
  subscriberDiscount: 'roughly 22%',
} as const;

export const money = {
  cafeDrinkPerDay: '$6.50',
  cafeDrinkPerYear: '$2,372',
  subscriberPerYear: '$1,703',
  savingPerYear: 'about $670',
} as const;

export const time = {
  driveThruVisit: '5 minutes 24 seconds',
  detour: '4-minute',
  driveThruPerDay: '9.4 minutes',
  driveThruPerYear: 'about 57 hours',
  homeEspressoPerDay: 'about 10 minutes',
  homeEspressoPerYear: 'about 60 hours',
  eitherWay: 'roughly two and a half days a year',
} as const;

/** Printed wherever the figures above appear. */
export const assumptions = [
  `Illustrative estimates, not measurements of you. Both columns assume one drink a day, every day of the year.`,
  `Money: a representative 2026 café drink at ${money.cafeDrinkPerDay}, against a subscriber paying an effective ${price.subscriberPerCan} a can with every ${price.freeCaseEveryWord} case free.`,
  `Time: the 2026 average drive-thru visit of ${time.driveThruVisit}, plus a ${time.detour} detour to get there. Home espresso is ${time.homeEspressoPerDay} a day including grinding and cleanup.`,
];
