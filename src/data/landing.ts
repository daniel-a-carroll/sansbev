/**
 * HOME PAGE CONTENT
 *
 * THE CENTRAL IDEA. The name and the proof are the same thing. The ingredient
 * list is not a section of this page, it is the identity, and it is the first
 * substantive thing a visitor reads after the headline. Everything else in the
 * category leads with what is NOT in the can. This page leads with six things
 * that are.
 *
 * Six is framed as a RULE ("never more than six"), not a count. A promise
 * survives reformulation; a description of today's recipe does not.
 *
 * VOICE. Premium restraint, dry and deadpan. The humour comes from refusing to
 * market. Where the category would reach for jargon, use the plain word and
 * stop. Short sentences. Full stops. Never:
 *   - an exclamation mark, an em dash, or profanity
 *   - unleash, fuel, crush, elevate, game-changer, clean energy, zero
 *     compromise (the build lint enforces these, see claims.ts)
 *   - full, smooth, creamy or rich as a description of the drink. It is thin
 *     bodied and crisp by design. Say crisp. Say clean.
 *
 * THE ENEMY IS THE LOGISTICS OF COFFEE, NEVER COFFEE. The queue, the detour,
 * the grinder, the cleanup, the descaling, the tip prompt. Attack the overhead.
 * Never the drink, and never a named café.
 *
 * NEVER STATE THE PRICE-NAME COUPLING. No "six ingredients, six dollars", and
 * no line that points at the coincidence. Name it, price it, and let people
 * notice. Stating it locks the price.
 *
 * Figures come from ./numbers.ts and are interpolated, never retyped. Claims
 * about what the product is or does belong in ./claims.ts.
 */

import { BRAND_NAME } from './site';
import { money, price, product, time } from './numbers';

export const landing = {
  hero: {
    headline: 'Upgrade your routine.',
    // "nearly 60 hours" is the founder's rounding of the two time estimates in
    // numbers.ts (about 57 and about 60). It is typed here, not linked, so
    // update it by hand if those figures change.
    sub: [
      'You spend nearly 60 hours a year waiting for coffee. The queue, the detour, the tip prompt. The coffee was never the problem.',
    ],
    ctaLabel: 'Subscribe',
    ctaHref: '#subscribe',
    productLine: `Sparkling. Made with real fruit juice. ${product.caffeineMg} mg caffeine. ${product.lTheanineMg} mg L-Theanine`,
  },

  rule: {
    label: 'The rule',
    heading: 'Never more than six ingredients.',
    body: [] as string[],
  },

  six: {
    label: 'What is in it',
    // Shown as the accessible name of the list and above it on small screens.
    heading: 'The whole list.',
    // One short note per slot, in label order. Notes are composition or plain
    // description only. Never what an ingredient does to a body.
    notes: [
      'The bubbles.',
      'Changes by can.',
      'So does this one.',
      `${product.caffeineMg} mg. From green coffee beans.`,
      `${product.lTheanineMg} mg. From green tea.`,
      'A pinch.',
    ],
    switcherLabel: 'Show the list for',
    facts: [
      {
        value: `${product.juicePercent}% juice`,
        text: 'From concentrate, brought back to single strength.',
      },
      {
        value: 'No added sugar',
        text: 'No sweetener of any kind. Just juice.',
      },
      {
        value: 'Crisp',
        text: 'Every Flavor, Crisp, Refreshing, and Energizing.',
      },
    ],
  },

  math: {
    label: 'The math',
    heading: 'One drink a day, for a year.',
    money: {
      heading: 'Money',
      rows: [
        { item: `A ${money.cafeDrinkPerDay} café drink`, amount: money.cafeDrinkPerYear },
        { item: `${BRAND_NAME}, subscribed, at ${price.subscriberPerCan} a can`, amount: money.subscriberPerYear },
      ],
      total: { item: 'Difference', amount: money.savingPerYear },
    },
    time: {
      heading: 'Time',
      rows: [
        {
          item: `Drive-thru. ${time.driveThruVisit} on average, plus a ${time.detour} detour. ${time.driveThruPerDay} a day.`,
          amount: time.driveThruPerYear,
        },
        {
          item: `Home espresso, with grinding and cleanup. ${time.homeEspressoPerDay.replace(/^about/, 'About')} a day.`,
          amount: time.homeEspressoPerYear,
        },
        { item: `${BRAND_NAME}. Opening a can.`, amount: '365 Moments' },
      ],
      total: { item: 'Either way', amount: time.eitherWay.replace(/ a year$/, '') },
    },
  },

  drinks: {
    label: 'The drinks',
    heading: 'Three cans. Only the fruit changes.',
    // Keyed by flavor id. The lead SKU gets the only kicker.
    kicker: { cranberry: 'Start here.' } as Record<string, string>,
  },

  subscription: {
    id: 'subscribe',
    label: 'Subscription',
    heading: `Every ${price.freeCaseEveryWord} case is free.`,
    body: [
      `${price.perCan} a can. Subscribe and every ${price.freeCaseEveryWord} case costs nothing. For a steady subscriber that comes to ${price.subscriberPerCan} a can, ${price.subscriberDiscount} off, for as long as you stay.`,
      'This is not a promotion. Subscriptions tell us how much to make and when, and that is what makes the economics work. The free case is the difference, handed back.',
      'Shipping is free.',
    ],
    captureLabel: 'Subscriptions are not open yet. Leave an email and you will hear first.',
  },

  capture: {
    fieldLabel: 'Email address',
    submitLabel: 'Notify me',
    successHeading: 'Noted.',
    successBody: 'You will hear from us once, when subscriptions open.',
    note: 'One email when subscriptions open. Nothing else.',
  },

  faq: {
    label: 'Questions',
    // Plain word, full stop. Do not elaborate the answers.
    items: [
      { q: 'What flavour system do you use?', a: 'Juice.' },
      { q: 'What’s in your proprietary energy blend?', a: 'Caffeine.' },
      { q: 'Why only six ingredients?', a: 'We couldn’t justify a seventh.' },
      { q: `Why is it ${price.perCan.replace('.00', '')}?`, a: 'Carbonated water, organic fruit juices, caffeine from green coffee beans, L-theanine from green tea, and salt.' },
      { q: 'Is this an energy drink?', a: 'Absolutely.' },
    ],
  },
};
