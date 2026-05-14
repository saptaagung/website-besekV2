-- Besek Artisanal — Supabase schema
-- Run in Supabase SQL Editor after creating a project.

create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  collection_name text,
  description text,
  price_starting_from numeric,
  main_image_url text,
  main_image_fit text default 'cover',
  main_image_position text default 'center center',
  main_image_sizes text,
  image_gallery_urls text[] default '{}',
  is_signature boolean default false,
  labels text[] default '{}',
  material text,
  dimensions text,
  technique text,
  color text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  page_name text not null,
  section_name text not null,
  headline_text text,
  description_text text,
  image_url text,
  image_fit text default 'cover',
  image_position text default 'center center',
  image_sizes text default '100vw',
  created_at timestamptz not null default now(),
  unique (page_name, section_name)
);

create table if not exists public.contact_info (
  id uuid primary key default gen_random_uuid(),
  address text,
  phone_whatsapp text,
  email text,
  operational_hours text,
  map_location_data jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  alt_text text,
  section_name text not null,
  image_fit text default 'cover',
  image_position text default 'center center',
  image_sizes text,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create or replace function public.touch_products_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_products_updated on public.products;
create trigger trg_products_updated
before update on public.products
for each row execute function public.touch_products_updated_at();

alter table public.products enable row level security;
alter table public.site_content enable row level security;
alter table public.contact_info enable row level security;
alter table public.gallery enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "products_select_public" on public.products;
drop policy if exists "products_admin_all" on public.products;
drop policy if exists "site_content_select_public" on public.site_content;
drop policy if exists "site_content_admin_all" on public.site_content;
drop policy if exists "contact_info_select_public" on public.contact_info;
drop policy if exists "contact_info_admin_all" on public.contact_info;
drop policy if exists "gallery_select_public" on public.gallery;
drop policy if exists "gallery_admin_all" on public.gallery;
drop policy if exists "contact_messages_insert_public" on public.contact_messages;
drop policy if exists "contact_messages_select_admin" on public.contact_messages;

-- Public read for storefront
create policy "products_select_public" on public.products for select using (true);
create policy "site_content_select_public" on public.site_content for select using (true);
create policy "contact_info_select_public" on public.contact_info for select using (true);
create policy "gallery_select_public" on public.gallery for select using (true);

-- Authenticated users (admin) full access
create policy "products_admin_all" on public.products for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "site_content_admin_all" on public.site_content for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "contact_info_admin_all" on public.contact_info for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "gallery_admin_all" on public.gallery for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Contact form: anyone can insert; only admins read
create policy "contact_messages_insert_public" on public.contact_messages for insert
  with check (true);

create policy "contact_messages_select_admin" on public.contact_messages for select
  using (auth.role() = 'authenticated');

-- Optional starter row for contact (run once)
do $$
begin
  if not exists (select 1 from public.contact_info limit 1) then
    insert into public.contact_info (address, phone_whatsapp, email, operational_hours, map_location_data)
    values (
      'Jl. Pengrajin Bambu No. 12, Desa Sentra Kerajinan, Sleman, Daerah Istimewa Yogyakarta 55581',
      '+62 812 3456 7890',
      'hello@besekartisanal.id',
      E'Senin - Jumat: 09:00 - 17:00 WIB\nSabtu: 10:00 - 15:00 WIB',
      jsonb_build_object('label', 'Workshop Besek Artisanal', 'lat', -7.75, 'lng', 110.36)
    );
  end if;
end $$;

-- Note: create an admin user in Supabase Auth (Email), then sign in at /admin/login.
