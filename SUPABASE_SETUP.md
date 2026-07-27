# Supabase setup

The website and dashboard use Supabase Auth, Postgres, and Storage. Project content is never read from a frontend constant.

## 1. Rotate the exposed secret

The original secret key was shared in chat. Delete it in Supabase and create a new backend-only secret key. Never prefix it with `NEXT_PUBLIC_`.

## 2. Configure local environment

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY` only while running the one-time migration

The deployed app needs only the first two variables. Normal dashboard CRUD uses the signed-in admin session and RLS; it does not use the secret key.

## 3. Create database and Storage policies

Open the Supabase SQL Editor and run:

`supabase/migrations/202607270001_projects_admin.sql`

This creates the projects table, validation constraints, audit fields, indexes, public read policy, admin-only write policies, and a restricted public image bucket.

## 4. Create and authorize the admin

Create the admin in Authentication > Users. Then run this once in the SQL Editor, replacing the email:

```sql
update auth.users
set raw_app_meta_data =
  coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'your-admin@example.com';
```

Sign out and back in after changing app metadata so the new role is included in the session token.

## 5. Migrate existing projects and images

With the rotated secret available only in the terminal environment:

```powershell
$env:NEXT_PUBLIC_SUPABASE_URL="https://usryiclmtasvhydvafsa.supabase.co"
$env:SUPABASE_SECRET_KEY="your-rotated-secret"
npm.cmd run migrate:projects
Remove-Item Env:SUPABASE_SECRET_KEY
```

The script uploads the current images and inserts the current project records into Supabase. It is safe to rerun because projects are upserted by slug.

## Security model

- Anonymous visitors can select published projects only.
- Authenticated non-admin users cannot create, update, delete, or read drafts.
- Admin status comes from immutable `app_metadata`, not editable user metadata.
- Every admin page is protected by middleware and a server-layout check.
- Every mutation route validates the authenticated user again.
- Mutation routes reject cross-origin requests.
- Inputs are validated in the app with Zod and constrained again in Postgres.
- Uploads are restricted to JPG, PNG, WebP, and AVIF, at most 6 MB each.
- Uploaded file names are random UUIDs, preventing path injection and collisions.
- The runtime website never uses the Supabase secret key.
