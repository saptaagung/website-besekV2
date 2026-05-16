-- Optional: seed `site_content` rows for first deploy (run after schema.sql).
-- Adjust copy as needed.

insert into public.site_content (page_name, section_name, headline_text, description_text, image_url)
values
  (
    'Home',
    'Hero',
    'Tradisi dalam Anyaman Modern',
    'Solusi kemasan ramah lingkungan, estetik, dan berkelanjutan untuk katering dan hampers premium.',
    'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1600&q=80'
  ),
  (
    'Home',
    'WhyUs_1',
    '100% Organik',
    'Bahan bambu terpilih tanpa pewarna kimia berbahaya, aman untuk kontak makanan.',
    NULL
  ),
  (
    'Home',
    'WhyUs_2',
    'Anyaman Kokoh',
    'Teknik anyaman ganda memberi kekuatan struktural untuk beban catering harian.',
    NULL
  ),
  (
    'Home',
    'WhyUs_3',
    'Pemberdayaan Perajin Lokal',
    'Setiap produk mendukung pengrajin di sentra kerajinan Yogyakarta dan sekitarnya.',
    NULL
  ),
  (
    'Home',
    'SignatureIntro',
    'Koleksi Signature',
    'Estetika natural untuk setiap kebutuhan presentasi Anda.',
    NULL
  ),
  (
    'About',
    'Mission',
    'Lebih dari Sekadar Wadah',
    E'Kami memilih kearifan tradisional daripada plastik sekali pakai. Misi kami adalah menggantikan material sintetis dengan kemasan yang lahir dari bumi—bambu yang ditanam, dipanen, dan dianyam dengan penuh hormat terhadap alam dan pengrajin.\n\nDengan setiap anyaman, kami mendekatkan dunia modern pada cara hidup yang lebih selaras dengan ekosistem.',
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=900&q=80'
  ),
  (
    'About',
    'CreationStory',
    'Dibuat dengan Hati',
    'Proses yang sabar: pengrajin lokal mengubah bambu menjadi karya yang fungsional sekaligus indah—setiap lembar direkatkan dengan ketelitian dan kebanggaan akan warisan.',
    NULL
  ),
  (
    'Contact',
    'Intro',
    'Hubungi Kami',
    'Kami selalu senang mendengar dari Anda. Apakah Anda memiliki pertanyaan tentang koleksi kami, pesanan khusus, atau ingin mengunjungi workshop kami.',
    NULL
  )
on conflict (page_name, section_name) do update set
  headline_text = excluded.headline_text,
  description_text = excluded.description_text,
  image_url = excluded.image_url;

insert into public.gallery (image_url, alt_text, section_name)
values
  (
    'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=900&q=80',
    'Tangan pengrajin menganyam strip bambu tipis dengan teliti.',
    'AboutMosaic_Left'
  ),
  (
    'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700&q=80',
    'Tiga besek bundar anyaman bambu ditumpuk rapi di alas putih.',
    'AboutMosaic_RightTop'
  ),
  (
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=700&q=80',
    'Batang bambu mentah sedang diproses di meja kerja bengkel.',
    'AboutMosaic_RightBottom'
  ),
  (
    'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&q=80',
    'Anyaman besek bambu premium',
    'HomeCarousel'
  ),
  (
    'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1200&q=80',
    'Proses anyaman tangan pengrajin',
    'HomeCarousel'
  ),
  (
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&q=80',
    'Bahan bambu alami',
    'HomeCarousel'
  );

-- If you re-run this block, delete previous mosaic rows first to avoid duplicates.
