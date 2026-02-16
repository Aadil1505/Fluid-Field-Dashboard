# MotionDesk Dashboard

MotionDesk Dashboard is a Next.js app for:
- Better Auth email/password authentication
- Polar checkout + customer portal integration
- Customer dashboard access state (active subscription/lifetime)
- Download tracking and feedback collection
- Admin analytics for feedback and downloads

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Better Auth
- Polar Better Auth plugin (`@polar-sh/better-auth`)
- Drizzle ORM + PostgreSQL
- Tailwind CSS

## App Routes

- `/` marketing site + pricing
- `/auth/sign-up` sign up
- `/auth/sign-in` sign in
- `/dashboard` authenticated customer dashboard
- `/admin` admin console (email allowlist protected)
- `/success` post-checkout success page

## Environment Variables

Create a `.env` file.

```bash
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?sslmode=require"

# Better Auth
BETTER_AUTH_SECRET="REPLACE_WITH_32+_CHAR_RANDOM_SECRET"
BETTER_AUTH_URL="http://localhost:3000"

# Polar
POLAR_ENVIRONMENT="sandbox" # use "production" in production
POLAR_ACCESS_TOKEN="polar_oat_..."
POLAR_WEBHOOK_SECRET="whsec_..."
POLAR_PRODUCT_ID_MONTHLY="6fd998c2-d456-442d-b2a6-0b9c29c0ca7b"
POLAR_PRODUCT_ID_LIFETIME="a9ae9cbc-cf34-4119-bdce-439dec938363"
POLAR_SUCCESS_URL="http://localhost:3000/success?checkout_id={CHECKOUT_ID}"

# Admin access (set one)
ADMIN_EMAILS="you@example.com,ops@example.com"
# or
ADMIN_EMAIL="you@example.com"

# Download redirect
NEXT_PUBLIC_DOWNLOAD_URL="https://cdn.example.com/MotionDesk.dmg"
# optional fallback when NEXT_PUBLIC_DOWNLOAD_URL is unset
# DOWNLOAD_PATH="/downloads/MotionDesk.dmg"
```

## Polar Integration Notes

Polar plugin setup in `lib/auth.ts` includes:
- `createCustomerOnSignUp: true`
- `checkout(...)`
- `portal()`
- `webhooks(...)`

Checkout slugs are centralized in `lib/polar.ts`:
- `motion-desk-monthly`
- `motion-desk-lifetime`

Configure your Polar webhook endpoint as:

```text
https://YOUR_DOMAIN/api/auth/polar/webhooks
```

Use the webhook secret from Polar in `POLAR_WEBHOOK_SECRET`.

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Set `.env` values.

3. Start dev server:
```bash
npm run dev
```

4. Open:
```text
http://localhost:3000
```

## Production Checklist

1. Set `POLAR_ENVIRONMENT="production"`.
2. Use production Polar token/product IDs/webhook secret.
3. Set `BETTER_AUTH_URL` to your public app URL.
4. Set `POLAR_SUCCESS_URL` to `https://YOUR_DOMAIN/success?checkout_id={CHECKOUT_ID}`.
5. Set at least one admin email via `ADMIN_EMAILS` or `ADMIN_EMAIL`.
6. Configure Polar webhook URL to `https://YOUR_DOMAIN/api/auth/polar/webhooks`.

## Admin Console

The admin page is at `/admin`.

Access control behavior:
- If not signed in, user is redirected to `/auth/sign-in`.
- If signed in but not in admin allowlist, user is redirected to `/dashboard`.
- If email is allowlisted, admin console is shown.

Admin allowlist configuration:
- `ADMIN_EMAILS` supports comma/semicolon/space-separated emails.
- `ADMIN_EMAIL` supports a single email.
- Matching is case-insensitive.

Admin data shown:
- Total feedback submissions
- Total download events
- Latest 100 feedback rows
- Latest 100 download events

Data sources:
- Feedback is written by `POST /api/feedback`.
- Downloads are tracked by `GET /api/download` before redirecting to the app binary.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Key Implementation Files

- Auth server config: `lib/auth.ts`
- Auth client config: `lib/auth-client.ts`
- Polar product/slug constants: `lib/polar.ts`
- Dashboard page: `app/dashboard/page.tsx`
- Dashboard client view: `components/global/dashboard.tsx`
- Admin page: `app/admin/page.tsx`
- Admin guard: `lib/require-admin.ts`
- DB schema: `db/schema.ts`
