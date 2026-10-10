/**
 * Provider-agnostic submission handling.
 *
 * ============================================================================
 * SWAPPING THE PROVIDER
 * ============================================================================
 * Every form submission on the site goes through the SubmissionProvider
 * interface below. Nothing else — no component, no route, no form markup —
 * knows or cares where submissions end up.
 *
 * To move to Klaviyo, Mailchimp, D1, or anything else: write a new object
 * implementing SubmissionProvider (one method, `submit`), and return it from
 * getProvider() based on which environment variables are present. That is the
 * entire change. Do not touch worker/index.ts, the form components, or the
 * schemas. A provider that throws is treated as a 502 by the route handler and
 * the submitter is told to email instead, so a provider outage never silently
 * drops a lead.
 * ============================================================================
 *
 * Default implementation is Resend, doing two different jobs:
 *
 *   EMAIL SIGNUPS are saved as CONTACTS in Resend, so there is a real list to
 *   send to when subscriptions open (Resend Broadcasts), with unsubscribe
 *   handled by Resend. This needs only RESEND_API_KEY. Optionally they go into
 *   a segment (RESEND_SEGMENT_ID), and optionally you also get an email per
 *   signup (NOTIFY_FROM + NOTIFY_TO).
 *
 *   STORE REQUESTS and WHOLESALE INQUIRIES are emailed to NOTIFY_TO. That needs
 *   a verified sending domain in Resend. They are not stored anywhere else.
 *
 * See docs/EXPORT.md.
 */

export interface Submission {
  /** Which form. Used for the subject line and, later, the table name. */
  form: 'subscribe' | 'request-store' | 'wholesale';
  /** Validated, whitelisted fields. Never the raw request body. */
  data: Record<string, string>;
  meta: {
    submittedAt: string;
    /** Coarse location from Cloudflare, useful for spotting bot floods. */
    country?: string;
    /** NOT stored anywhere by the default provider. Used for rate limiting. */
    userAgent?: string;
  };
}

export interface SubmissionProvider {
  readonly name: string;
  submit(submission: Submission): Promise<void>;
}

export interface Env {
  RESEND_API_KEY?: string;
  /** Optional. A Resend segment ID that new signups are added to. */
  RESEND_SEGMENT_ID?: string;
  /** Verified sender on your Resend domain, e.g. "site@sansbev.com". */
  NOTIFY_FROM?: string;
  /** Where submissions are delivered. */
  NOTIFY_TO?: string;
  ASSETS: { fetch(request: Request): Promise<Response> };
  RATE_LIMITER?: { limit(opts: { key: string }): Promise<{ success: boolean }> };
}

const FORM_LABELS: Record<Submission['form'], string> = {
  subscribe: 'Email signup',
  'request-store': 'Store request',
  wholesale: 'Wholesale inquiry',
};

/** Plain-text body. Deliberately greppable and easy to paste into a sheet. */
const formatBody = (s: Submission): string => {
  const lines = Object.entries(s.data).map(([k, v]) => `${k}: ${v}`);
  return [
    `${FORM_LABELS[s.form]} — ${s.meta.submittedAt}`,
    '',
    ...lines,
    '',
    s.meta.country ? `Country: ${s.meta.country}` : '',
  ]
    .filter(Boolean)
    .join('\n');
};

const RESEND_API = 'https://api.resend.com';

/**
 * Resend provider. Signups become contacts; everything else is emailed.
 */
class ResendProvider implements SubmissionProvider {
  readonly name = 'resend';

  constructor(
    private readonly apiKey: string,
    private readonly notify?: { from: string; to: string },
    private readonly segmentId?: string
  ) {}

  private headers() {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  private async contactExists(email: string): Promise<boolean> {
    const response = await fetch(`${RESEND_API}/contacts/${encodeURIComponent(email)}`, {
      headers: this.headers(),
    });
    return response.ok;
  }

  /**
   * Saves the signup as a Resend contact and returns true if it is NEW.
   * Signing up twice is not an error, and is not new: the address is looked
   * up first, so a repeat signup creates nothing and sends no notification.
   */
  private async addContact(email: string): Promise<boolean> {
    if (await this.contactExists(email)) return false;

    const response = await fetch(`${RESEND_API}/contacts`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({
        email,
        unsubscribed: false,
        ...(this.segmentId ? { segments: [{ id: this.segmentId }] } : {}),
      }),
    });
    if (response.ok) return true;

    // Two signups racing each other: the other one created it first.
    const detail = await response.text().catch(() => '');
    if (await this.contactExists(email)) return false;

    throw new Error(`Resend contacts returned ${response.status}: ${detail.slice(0, 300)}`);
  }

  private async sendNotification(s: Submission): Promise<void> {
    if (!this.notify) {
      throw new Error('NOTIFY_FROM and NOTIFY_TO are not set, so this submission cannot be emailed.');
    }
    const subjectDetail =
      s.data.source ?? s.data.zip ?? s.data.businessName ?? s.data.storeName ?? '';

    const response = await fetch(`${RESEND_API}/emails`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({
        from: this.notify.from,
        to: [this.notify.to],
        // Replying to the notification replies to the person who submitted it.
        reply_to: s.data.email || undefined,
        subject: `${FORM_LABELS[s.form]}${subjectDetail ? ` — ${subjectDetail}` : ''}`,
        text: formatBody(s),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      throw new Error(`Resend returned ${response.status}: ${detail.slice(0, 300)}`);
    }
  }

  async submit(s: Submission): Promise<void> {
    if (s.form !== 'subscribe') {
      await this.sendNotification(s);
      return;
    }

    // The contact is the record. If saving it fails, the visitor is told.
    // A repeat signup gets the same "Noted." as a new one, so the form never
    // reveals whether an address is already on the list.
    const isNew = await this.addContact(s.data.email!);

    // The per-signup email is a convenience, sent only for NEW contacts.
    // Once the contact is saved, a failed notification is logged, not shown
    // to the visitor as a failure.
    if (isNew && this.notify) {
      await this.sendNotification(s).catch((error) =>
        console.error('[submission:subscribe] contact saved, notification failed', error)
      );
    }
  }
}

/**
 * Fallback used in local development and any deployment without a Resend key.
 * Logs and succeeds, so form UX can be worked on without credentials.
 *
 * If this ever runs in production it means RESEND_API_KEY is missing and every
 * submission is being dropped while the visitor is told it worked.
 */
class ConsoleProvider implements SubmissionProvider {
  readonly name = 'console';

  async submit(s: Submission): Promise<void> {
    console.log(`[submission:${s.form}]\n${formatBody(s)}`);
  }
}

export function getProvider(env: Env): SubmissionProvider {
  if (env.RESEND_API_KEY) {
    const notify =
      env.NOTIFY_FROM && env.NOTIFY_TO ? { from: env.NOTIFY_FROM, to: env.NOTIFY_TO } : undefined;
    return new ResendProvider(env.RESEND_API_KEY, notify, env.RESEND_SEGMENT_ID);
  }
  return new ConsoleProvider();
}
