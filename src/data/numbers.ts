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

/*
 * SOURCES, checked 2026-10-06. Keep these on file; they are what the figures
 * rest on if anyone asks. Do not name any café on the page itself.
 *
 * $6.50 café drink, built up from:
 *   - $5.59 average US 16oz iced latte menu price ($5.44 for a 12oz hot
 *     latte), before tax. Joe Coffee, State of Coffee report, Q2 2026,
 *     ~42,600 menu prices across 30+ US cities, via Brikly's 2026 Café
 *     Drinks Trend Report (brik.ly/reports/cafe-drinks-trend-report-2026,
 *     published 2026-05-06).
 *   - +7.53% sales tax: Tax Foundation, 2026 population-weighted average
 *     combined state and local rate (taxfoundation.org).
 *   - +14.52% tip when a tip is left: Square, Food & Beverage data, Q1 2026
 *     (squareup.com/us/en/press/food-beverage-q1-2026-data, 2026-05-12).
 *     Roughly half of café purchases are tipped (older Square figure, 45-50%).
 *   Iced latte with tax: $6.01. With tax and tip: $6.82. Typical day with
 *   about half of purchases tipped: ~$6.40-6.50. So $6.50 is a fair,
 *   slightly conservative figure for ONE DRINK. An average ticket (per visit,
 *   often more than one item) is not a substitute for it.
 *
 * 5 minutes 24 seconds drive-thru: Intouch Insight, 2026 Drive-Thru Study
 *   (intouchinsight.com/press-releases/2026-drive-thru-study, 2026-10-01).
 *   2,145 mystery-shopper visits to 13 quick-service chains (4 of them coffee
 *   chains), June-July 2026. It is the all-chain average, which is how the
 *   page words it; some coffee chains in the study ran faster.
 *
 * UNSOURCED ASSUMPTIONS, labelled as such in the footnote: the 4-minute
 *   detour, and 10 minutes a day for home espresso with grinding and cleanup.
 */
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
