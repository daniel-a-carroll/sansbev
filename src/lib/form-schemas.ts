/**
 * Form schemas, shared by the Worker (authoritative) and the client (UX only).
 *
 * The Worker revalidates everything on every request. Client-side checks exist
 * purely so a person is not made to wait for a round trip to learn they typed
 * their ZIP wrong — they are never trusted.
 *
 * Uses standalone `zod` rather than `astro/zod` because this module is bundled
 * into the Cloudflare Worker, which has no Astro runtime.
 */

import { z } from 'zod';

/** Bots fill every field they find. Humans never see this one. */
export const HONEYPOT_FIELD = 'company_website';

const honeypot = z
  .string()
  .max(0, 'Rejected.')
  .optional()
  .or(z.literal(''));

const email = z
  .string()
  .min(1, 'Enter your email address.')
  .email('Enter a valid email address, like name@example.com.')
  .max(254);

const zip = z
  .string()
  .min(1, 'Enter your ZIP code.')
  .regex(/^\d{5}$/, 'Enter a 5-digit ZIP code.');

const shortText = (label: string, max = 120) =>
  z.string().min(1, `Enter ${label}.`).max(max);

/**
 * Consumer email capture.
 * ZIP is required by design: geographic demand is the point of the list, not
 * a nice-to-have. A signup without a ZIP is worth far less in a buyer meeting.
 */
export const subscribeSchema = z.object({
  email,
  zip,
  [HONEYPOT_FIELD]: honeypot,
});

/** "Request SansBev at your store." */
export const requestStoreSchema = z.object({
  storeName: shortText('the store name'),
  city: shortText('the city'),
  state: z.string().length(2, 'Use a 2-letter state code.').default('CO'),
  zip,
  email: email.optional().or(z.literal('')),
  [HONEYPOT_FIELD]: honeypot,
});

export const CHANNELS = [
  'Natural grocery',
  'Independent market',
  'Convenience',
  'Specialty retail',
  'Foodservice',
  'Distributor',
  'Broker',
  'Other',
] as const;

/** Wholesale inquiry. */
export const wholesaleSchema = z.object({
  businessName: shortText('your business name'),
  contactName: shortText('your name'),
  email,
  role: shortText('your role', 80),
  channel: z.enum(CHANNELS, {
    errorMap: () => ({ message: 'Choose a channel.' }),
  }),
  storeCount: z
    .string()
    .regex(/^\d{0,6}$/, 'Enter a number.')
    .optional()
    .or(z.literal('')),
  region: z.string().max(120).optional().or(z.literal('')),
  message: z.string().max(4000).optional().or(z.literal('')),
  [HONEYPOT_FIELD]: honeypot,
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
export type RequestStoreInput = z.infer<typeof requestStoreSchema>;
export type WholesaleInput = z.infer<typeof wholesaleSchema>;

export const FORMS = {
  subscribe: { schema: subscribeSchema, endpoint: '/api/subscribe', label: 'Email signup' },
  'request-store': {
    schema: requestStoreSchema,
    endpoint: '/api/request-store',
    label: 'Store request',
  },
  wholesale: { schema: wholesaleSchema, endpoint: '/api/wholesale', label: 'Wholesale inquiry' },
} as const;

export type FormKey = keyof typeof FORMS;
