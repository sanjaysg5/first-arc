# First Arc

**The first arc of organizational intelligence.** A premium marketing site + lead-capture backend for a startup that connects AI/data buyers with companies willing to license permissioned operational data.

> This MVP **never collects or stores raw company data**. It captures metadata, demand, supply interest, and lead information only. Data ingestion/licensing happens manually after qualification.

---

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS-first tokens) · custom design system ("The Arc")
- **React Hook Form** + **Zod** (typed, server-validated forms)
- **Supabase** (PostgreSQL + Auth) — service role used server-side only
- **Resend** (transactional email; optional in dev)
- Deploy target: **Vercel**

## What's included

**Public site** — homepage with a signature scroll/arc visual, `/for-buyers`, `/for-companies`, `/how-it-works`, `/business-model`, `/about`, `/contact`, `/privacy`, `/terms`.

**Lead capture**
- `/request-data` — 5-step buyer demand form
- `/license-data` — 4-step supplier interest form
- `/contact` — contact form
- All validated with Zod on the server, rate-limited, and honeypot-protected. No file uploads.

**Admin** (`/admin`, auth-gated)
- Overview with stat cards + recent leads
- Buyers / Suppliers / Assets tables with inline status + notes editing
- Match workspace with transparent rules-based scoring (`src/lib/matching.ts`)
- Settings: config status, admin users, contact messages
- All admin changes are written to an `admin_audit_log`.

---

## Getting started

### 1. Install

```bash
npm install
```

### 2. Environment

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | e.g. `http://localhost:3000` in dev |
| `NEXT_PUBLIC_SUPABASE_URL` | yes | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | yes | anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | yes | **server only** — bypasses RLS, never expose |
| `RESEND_API_KEY` | no | emails are skipped if unset |
| `LEAD_NOTIFICATION_EMAIL` | no | internal recipient for new leads |
| `LEAD_FROM_EMAIL` | no | verified Resend sender |
| `ADMIN_EMAILS` | yes | comma-separated admin allowlist |

### 3. Database

Create a Supabase project, then run the migration in **SQL Editor** (or via the Supabase CLI):

```
supabase/migrations/0001_init.sql
```

It creates all tables, indexes, and Row Level Security policies (public can only INSERT leads; everything else is service-role-only).

### 4. Admin access

1. In Supabase → **Authentication → Users**, create a user (email + password) for yourself.
2. Add that email to `ADMIN_EMAILS` in `.env.local` (and/or insert a row into `admin_users`).
3. Sign in at `/admin/login`.

### 5. Seed demo data (optional, local only)

```bash
npm run seed
```

Inserts clearly-marked DEMO buyer/supplier/asset/match/contact records and ensures `admin_users` rows for `ADMIN_EMAILS`.

### 6. Run

```bash
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

---

## Project structure

```
src/
  app/
    (public routes)/         homepage + marketing + legal pages
    request-data|license-data|contact/   forms
    actions/leads.ts         public server actions (validated + rate-limited)
    admin/
      login/                 sign-in (outside the dashboard shell)
      (dashboard)/           auth-gated dashboard: overview, buyers, suppliers,
                             assets, matches, settings
      actions.ts             admin mutations (re-check auth, audit-logged)
    sitemap.ts robots.ts icon.svg opengraph-image.tsx
  components/
    arc/ brand/ home/        the "Arc" visual system + brand mark
    site/                    header, footer, chrome, page hero
    ui/                      button, input, select, checkbox, card, badge, …
    forms/                   multi-step forms + shared bits
    admin/                   shell, tables, stat cards, match workspace
  lib/
    validation.ts            Zod schemas (single source of truth)
    constants.ts             option lists + labels
    matching.ts              rules-based match scoring
    email.ts rate-limit.ts request.ts env.ts format.ts
    supabase/                browser / server / admin clients
    db/                      types + data-access
supabase/migrations/         SQL schema + RLS
scripts/seed.ts              demo data
```

## Design system — "The Arc"

- **Type:** Instrument Serif (display) · Space Grotesk (UI/body) · Space Mono (labels).
- **Palette:** warm bone paper, warm ink, muted graphite, one mineral-blue signal color, deep ink-blue sections. Tokens live in `src/app/globals.css` (`@theme`).
- **Motif:** partial rings, trajectory lines, data nodes on an arc; `prefers-reduced-motion` respected throughout.

## Security

- Server-side Zod validation on every submission; parameterized queries via Supabase.
- RLS: anonymous users can only INSERT leads; reads/updates use the service role behind auth.
- Admin: authentication in middleware, authorization (allowlist / `admin_users`) in the dashboard layout, re-checked in every mutation. Deny by default.
- Rate limiting + honeypot on public forms; generic error messages; no secrets or PII in logs.
- Security headers + CSP in `next.config.ts`.
- **Production hardening:** the rate limiter is in-memory (per-instance). Behind multiple serverless instances, back it with Redis/Upstash. Consider a nonce-based script CSP via middleware.

## Deployment (Vercel)

1. Push to a Git repo and import into Vercel.
2. Add all environment variables (Project → Settings → Environment Variables).
3. Set `NEXT_PUBLIC_SITE_URL` to your production URL.
4. Deploy. Run the SQL migration against your production Supabase project.

## Known limitations

- Matching is intentionally a transparent rules engine, not ML/LLM (see `src/lib/matching.ts`).
- Data assets are created/managed manually by admins (no ingestion pipeline — by design).
- About-page founders and Privacy/Terms are placeholders for real content + legal review.
- OG image uses system fonts (not the brand fonts) to keep the build dependency-free.

## Next steps (future phases)

Secure data intake & connector framework · dataset catalog · buyer/supplier portals · contract & licensing workflows · automated PII/secrets detection · trajectory extraction · evaluation environments. The code is structured so these slot in without reworking the public site or lead layer.

---

_Design + implementation scaffold generated to hand off to the development team._
