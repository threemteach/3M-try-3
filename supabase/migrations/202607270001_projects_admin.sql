begin;

create extension if not exists pgcrypto;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 2 and 120),
  category text not null check (char_length(category) between 2 and 120),
  description text not null check (char_length(description) between 10 and 500),
  long_description text not null check (char_length(long_description) between 20 and 5000),
  cover_image_path text not null,
  gallery_paths text[] not null default '{}',
  tags text[] not null default '{}',
  features jsonb not null default '[]'::jsonb
    check (jsonb_typeof(features) = 'array'),
  live_url text not null check (live_url ~ '^https?://'),
  completion_date text,
  client text,
  display_order integer not null default 0 check (display_order >= 0),
  is_published boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_published_order_idx
  on public.projects (is_published, display_order, created_at desc);

create or replace function public.set_project_audit_fields()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  new.updated_by = auth.uid();
  if tg_op = 'INSERT' then
    new.created_by = auth.uid();
  end if;
  return new;
end;
$$;

drop trigger if exists set_project_audit_fields on public.projects;
create trigger set_project_audit_fields
before insert or update on public.projects
for each row execute function public.set_project_audit_fields();

alter table public.projects enable row level security;
alter table public.projects force row level security;

revoke all on public.projects from anon, authenticated;
grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;

drop policy if exists "Published projects are public" on public.projects;
create policy "Published projects are public"
on public.projects for select
to anon
using (is_published = true);

drop policy if exists "Admins can read all projects" on public.projects;
create policy "Admins can read all projects"
on public.projects for select
to authenticated
using ((select public.is_admin()));

drop policy if exists "Admins can create projects" on public.projects;
create policy "Admins can create projects"
on public.projects for insert
to authenticated
with check ((select public.is_admin()));

drop policy if exists "Admins can update projects" on public.projects;
create policy "Admins can update projects"
on public.projects for update
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

drop policy if exists "Admins can delete projects" on public.projects;
create policy "Admins can delete projects"
on public.projects for delete
to authenticated
using ((select public.is_admin()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-images',
  'project-images',
  true,
  6291456,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins can view project image objects" on storage.objects;
create policy "Admins can view project image objects"
on storage.objects for select
to authenticated
using (bucket_id = 'project-images' and (select public.is_admin()));

drop policy if exists "Admins can upload project images" on storage.objects;
create policy "Admins can upload project images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'project-images' and (select public.is_admin()));

drop policy if exists "Admins can update project images" on storage.objects;
create policy "Admins can update project images"
on storage.objects for update
to authenticated
using (bucket_id = 'project-images' and (select public.is_admin()))
with check (bucket_id = 'project-images' and (select public.is_admin()));

drop policy if exists "Admins can delete project images" on storage.objects;
create policy "Admins can delete project images"
on storage.objects for delete
to authenticated
using (bucket_id = 'project-images' and (select public.is_admin()));

commit;
