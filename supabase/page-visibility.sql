create table if not exists public.page_visibility (
 page text primary key check (page in ('plans','templates')),
 enabled boolean not null default true
);
insert into public.page_visibility(page,enabled) values ('plans',true),('templates',true) on conflict do nothing;
alter table public.page_visibility enable row level security;
create policy "Public page visibility" on public.page_visibility for select using (true);
create policy "Admins update page visibility" on public.page_visibility for update to authenticated using ((auth.jwt()->'app_metadata'->>'role')='admin') with check ((auth.jwt()->'app_metadata'->>'role')='admin');
