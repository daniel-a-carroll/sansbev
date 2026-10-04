/**
 * THE NUMBERS. Every price, time and product figure the site states.
 *
 * These are the verified figures from the brief. Do not re-derive or re-round
 * them in components: if a number changes, it changes here and nowhere else.
 * Display strings sit beside the raw values on purpose, so that a rounding
 * decision ("about $730", "about 57 hours") is made once, by a person, rather
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
  /** Effective per-can price for a steady subscriber: every 4th case free on
   *  $6.00 is exactly 25% off. Was $4.67 / 22%, which did not match the
   *  offer; corrected by the founder 2026-10-04. */
  subscriberPerCan: '$4.50',
  subscriberDiscount: 'roughly 25%',
} as const;

export const money = {
  cafeDrinkPerDay: '$6.50',
  cafeDrinkPerYear: '$2,372',
  // $4.50 x 365 = $1,642.50, shown as $1,642 to match how $2,372.50 is shown.
  subscriberPerYear: '$1,642',
  savingPerYear: 'about $730',
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
