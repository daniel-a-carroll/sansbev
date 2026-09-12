# Getting the list out for a buyer meeting

## How submissions work right now

**Email only. Nothing is stored on a server.**

Every form submission is forwarded to `NOTIFY_TO` by Resend and then it is gone
from our side. Your inbox is the record. There is no database, no dashboard, and
no admin login to forget the password to.

This was a deliberate choice — it is the simplest thing that works and it keeps
customer data off any server we run. It has a real cost, described below.

## Pulling the list before a meeting

Each submission arrives with a subject line carrying the useful field:

```
Email signup — juice
Store request — Corner Market
Wholesale inquiry — Alfalfa Market
```

For signups that word is the **section of the landing page whose form they
used**: `hero`, `label`, `juice`, `sweetener`, `constraint`, `pairing`,
`reactions` or `ask`. Sorting your inbox by it answers the only question worth
asking about the page, which is which proof actually converts. If `label` and
`juice` dominate, the compositional argument is doing the work; if only `hero`
converts, nobody is reading past the fold.

Note the signup form no longer collects a ZIP. It was dropped to a single field
because every extra field costs conversions, and conversion is the whole job of
the page right now. The schema still accepts a ZIP, so it can come back on a
page where the trade case outweighs the conversion cost.

The body is plain text, one `field: value` per line, deliberately easy to paste.

**In Gmail**, filter by subject and export:

```
subject:"Email signup"                  → every consumer signup
subject:"Email signup - label"          → converted by the ingredient comparison
subject:"Email signup - juice"          → converted by the 0% juice proof
subject:"Store request"                 → requested stores
subject:"Wholesale inquiry"             → trade leads
```

For a buyer meeting, the number that matters is total signups and how fast they
are arriving. Search the subject, read the count off the top of the search, and
screenshot it. That is your demand slide.

The ZIP-level version of that slide is gone for now, since the form stopped
asking. If a buyer conversation turns on local demand, that is the moment to put
the ZIP field back on one page and accept the conversion cost there.

## The honest limitation

An inbox is not a database. Specifically:

- **No deduplication.** One person signing up three times counts as three.
- **Counting is manual.** "How many signups in 80301?" is a search and a
  hand-count, not a number you can pull instantly.
- **No aggregation.** You cannot ask "top ten ZIPs" without exporting and
  sorting by hand.
- **Deleting an email deletes the record.** There is no backup.
- **It does not scale.** Under a few hundred signups this is fine. Past that,
  counting by hand before every meeting gets old fast.

You collect ZIP codes specifically because geographic demand is a sales asset.
The moment counting them by hand is annoying, the email-only setup is costing
you more than it saves.

## Switching to a real store

When that happens, this is the change:

1. Create a D1 database: `npx wrangler d1 create sansbev-submissions`
2. Add the binding to `wrangler.jsonc`.
3. Write a `D1Provider` class in `worker/submissions.ts` implementing the
   `SubmissionProvider` interface — one method, `submit`.
4. Return it from `getProvider()` when the binding is present.

**That is the whole change.** No component, no route, no form, and no schema is
touched, because every submission already goes through that one interface. You
can keep the email notification alongside it by having the new provider call
both.

After that, the buyer-meeting number becomes a query:

```sql
SELECT zip, COUNT(*) AS signups
FROM submissions
WHERE form = 'subscribe'
GROUP BY zip
ORDER BY signups DESC
LIMIT 20;
```

Run it with `npx wrangler d1 execute sansbev-submissions --command "..."`.

The same applies to Klaviyo or Mailchimp — write a provider that posts to their
API, return it from `getProvider()`, done.

## If submissions stop arriving

The Worker falls back to a console provider when `RESEND_API_KEY`,
`NOTIFY_FROM`, or `NOTIFY_TO` are missing. In that state, forms still return
success to the visitor while submissions go only to the Worker logs — leads are
silently lost.

Check `npx wrangler secret list` first. If a provider call fails at runtime the
visitor is told plainly that their details were not sent and to email instead,
and the error is logged — a submission is never silently swallowed once the
provider is configured.
