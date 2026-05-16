-- Optional: seed Beranda carousel slides (run once in Supabase SQL Editor).
-- Uses existing `gallery` table with section_name = 'HomeCarousel'.

insert into public.gallery (image_url, alt_text, section_name)
select v.url, v.alt, 'HomeCarousel'
from (
  values
    (
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&q=80',
      'Anyaman besek bambu premium'
    ),
    (
      'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1200&q=80',
      'Proses anyaman tangan pengrajin'
    ),
    (
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&q=80',
      'Bahan bambu alami'
    )
) as v(url, alt)
where not exists (
  select 1 from public.gallery g where g.section_name = 'HomeCarousel' limit 1
);
