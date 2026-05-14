-- Run once in Supabase SQL Editor (existing projects). New installs already have these in schema.sql.

alter table public.site_content
  add column if not exists image_fit text default 'cover',
  add column if not exists image_position text default 'center center',
  add column if not exists image_sizes text default '100vw';

alter table public.products
  add column if not exists main_image_fit text default 'cover',
  add column if not exists main_image_position text default 'center center',
  add column if not exists main_image_sizes text;

alter table public.gallery
  add column if not exists image_fit text default 'cover',
  add column if not exists image_position text default 'center center',
  add column if not exists image_sizes text;

comment on column public.site_content.image_fit is 'cover | contain';
comment on column public.site_content.image_position is 'CSS object-position, e.g. center center or 50% 25%';
comment on column public.site_content.image_sizes is 'Next.js Image sizes attribute, e.g. 100vw or (max-width:768px) 100vw, 1200px';
