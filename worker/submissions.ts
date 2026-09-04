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
 * Default implementation is EMAIL-ONLY (Resend): each submission is forwarded
 * to the trade inbox and nothing is persisted server-side. That is a deliberate
 * decision, not a limitation — see docs/EXPORT.md for what it costs you and
 * when to switch.
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

/**
 * Email-only provider. Nothing is stored; your inbox is the record.
 */
class ResendProvider implements SubmissionProvider {
  readonly name = 'resend';

  constructor(
    private readonly apiKey: string,
    private readonly from: string,
    private readonly to: string
  ) {}

  async submit(s: Submission): Promise<void> {
    const subjectDetail =
      s.data.zip ?? s.data.businessName ?? s.data.storeName ?? '';

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: this.from,
        to: [this.to],
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
}

/**
 * Fallback used in local development and any deployment without a Resend key.
 * Logs and succeeds, so form UX can be worked on without credentials.
 *
 * If this ever runs in production it means NOTIFY_* secrets are missing and
 * submissions are being dropped — the route handler warns loudly on boot.
 */
class ConsoleProvider implements SubmissionProvider {
  readonly name = 'console';

  async submit(s: Submission): Promise<void> {
    console.log(`[submission:${s.form}]\n${formatBody(s)}`);
  }
}

export function getProvider(env: Env): SubmissionProvider {
  if (env.RESEND_API_KEY && env.NOTIFY_FROM && env.NOTIFY_TO) {
    return new ResendProvider(env.RESEND_API_KEY, env.NOTIFY_FROM, env.NOTIFY_TO);
  }
  return new ConsoleProvider();
}
