create table if not exists public.catalog_items (
 id uuid primary key default gen_random_uuid(),
 kind text not null check (kind in ('plans','templates')),
 title text not null, title_ar text not null default '',
 description text not null default '', description_ar text not null default '',
 price numeric not null default 0 check (price >= 0),
 currency text not null default 'EGP', period text not null default 'monthly' check (period in ('monthly','yearly','once')),
 features text[] not null default '{}', features_ar text[] not null default '{}',
 image_url text not null default '', preview_url text not null default '', category text not null default '',
 is_published boolean not null default false, is_featured boolean not null default false,
 display_order integer not null default 0
);
alter table public.catalog_items enable row level security;
create policy "Published catalog is public" on public.catalog_items for select using (is_published or (auth.jwt()->'app_metadata'->>'role') = 'admin');
create policy "Admins manage catalog" on public.catalog_items for all to authenticated using ((auth.jwt()->'app_metadata'->>'role') = 'admin') with check ((auth.jwt()->'app_metadata'->>'role') = 'admin');
