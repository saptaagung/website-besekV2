import type { ContactInfoRow, GalleryRow, ProductRow, SiteContentRow } from "@/lib/database.types";

/** Fallbacks when Supabase env is not configured or tables are empty */
export const defaultProducts: ProductRow[] = [
  {
    id: "demo-1",
    name: "Besek Natural Classic",
    collection_name: "Classic",
    description:
      "Anyaman bambu natural dengan teknik ganda untuk kemasan catering dan hampers premium.",
    price_starting_from: 15000,
    main_image_url:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
    image_gallery_urls: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
      "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&q=80",
      "https://images.unsplash.com/photo-1610557892470-55d9e80c0ce1?w=400&q=80",
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&q=80",
    ],
    is_signature: true,
    labels: ["Handmade", "Sustainable"],
    material: "Bambu Organik",
    dimensions: "Tersedia 15×15 cm hingga 25×25 cm",
    technique: "Anyaman Ganda Kokoh",
    color: "Natural / Tanpa Pewarna Kimia",
  },
  {
    id: "demo-2",
    name: "Tampah Mini",
    collection_name: "Praktis",
    description: "Tampah anyaman compact untuk sajian snack dan display meja.",
    price_starting_from: 12000,
    main_image_url: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&q=80",
    image_gallery_urls: [
      "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&q=80",
    ],
    is_signature: true,
    labels: ["Handmade", "Sustainable"],
    material: "Bambu",
    dimensions: "Ø 20 cm",
    technique: "Anyaman spiral",
    color: "Natural",
  },
  {
    id: "demo-3",
    name: "Tabung Premium",
    collection_name: "Artisan",
    description: "Wadah silinder dengan tutup rapat untuk oleh-oleh kering.",
    price_starting_from: 22000,
    main_image_url: "https://images.unsplash.com/photo-1610557892470-55d9e80c0ce1?w=800&q=80",
    image_gallery_urls: [],
    is_signature: true,
    labels: ["Handmade"],
    material: "Bambu",
    dimensions: "Ø 8 × tinggi 18 cm",
    technique: "Anyaman ganda",
    color: "Natural",
  },
  {
    id: "demo-4",
    name: "Jinjing Carrier",
    collection_name: "Souvenir",
    description: "Tas anyaman dengan gagang bambu untuk hantaran istimewa.",
    price_starting_from: 35000,
    main_image_url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&q=80",
    image_gallery_urls: [],
    is_signature: true,
    labels: ["Sustainable"],
    material: "Bambu",
    dimensions: "25 × 15 × 20 cm",
    technique: "Anyaman struktural",
    color: "Natural",
  },
];

export const defaultSiteContent: SiteContentRow[] = [
  {
    id: "d-home-hero",
    page_name: "Home",
    section_name: "Hero",
    headline_text: "Tradisi dalam Anyaman Modern",
    description_text:
      "Solusi kemasan ramah lingkungan, estetik, dan berkelanjutan untuk katering dan hampers premium.",
    image_url:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1600&q=80",
  },
  {
    id: "d-home-why1",
    page_name: "Home",
    section_name: "WhyUs_1",
    headline_text: "100% Organik",
    description_text:
      "Bahan bambu terpilih tanpa pewarna kimia berbahaya, aman untuk kontak makanan.",
    image_url: null,
  },
  {
    id: "d-home-why2",
    page_name: "Home",
    section_name: "WhyUs_2",
    headline_text: "Anyaman Kokoh",
    description_text:
      "Teknik anyaman ganda memberi kekuatan struktural untuk beban catering harian.",
    image_url: null,
  },
  {
    id: "d-home-why3",
    page_name: "Home",
    section_name: "WhyUs_3",
    headline_text: "Pemberdayaan Perajin Lokal",
    description_text:
      "Setiap produk mendukung pengrajin di sentra kerajinan Yogyakarta dan sekitarnya.",
    image_url: null,
  },
  {
    id: "d-home-signature",
    page_name: "Home",
    section_name: "SignatureIntro",
    headline_text: "Koleksi Signature",
    description_text: "Estetika natural untuk setiap kebutuhan presentasi Anda.",
    image_url: null,
  },
  {
    id: "d-about-mission",
    page_name: "About",
    section_name: "Mission",
    headline_text: "Lebih dari Sekadar Wadah",
    description_text:
      "Kami memilih kearifan tradisional daripada plastik sekali pakai. Misi kami adalah menggantikan material sintetis dengan kemasan yang lahir dari bumi—bambu yang ditanam, dipanen, dan dianyam dengan penuh hormat terhadap alam dan pengrajin.\n\nDengan setiap anyaman, kami mendekatkan dunia modern pada cara hidup yang lebih selaras dengan ekosistem.",
    image_url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=900&q=80",
  },
  {
    id: "d-about-story",
    page_name: "About",
    section_name: "CreationStory",
    headline_text: "Dibuat dengan Hati",
    description_text:
      "Proses yang sabar: pengrajin lokal mengubah bambu menjadi karya yang fungsional sekaligus indah—setiap lembar direkatkan dengan ketelitian dan kebanggaan akan warisan.",
    image_url: null,
  },
  {
    id: "d-contact-intro",
    page_name: "Contact",
    section_name: "Intro",
    headline_text: "Hubungi Kami",
    description_text:
      "Kami selalu senang mendengar dari Anda. Apakah Anda memiliki pertanyaan tentang koleksi kami, pesanan khusus, atau ingin mengunjungi workshop kami.",
    image_url: null,
  },
];

export const defaultContact: ContactInfoRow = {
  id: "demo",
  address: "Jl. Pengrajin Bambu No. 12, Desa Sentra Kerajinan, Sleman, Daerah Istimewa Yogyakarta 55581",
  phone_whatsapp: "+62 812 3456 7890",
  email: "hello@besekartisanal.id",
  operational_hours:
    "Senin - Jumat: 09:00 - 17:00 WIB\nSabtu: 10:00 - 15:00 WIB",
  map_location_data: {
    label: "Workshop Besek Artisanal",
    lat: -7.75,
    lng: 110.36,
  },
};

export const defaultGallery: GalleryRow[] = [
  {
    id: "g1",
    image_url: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=900&q=80",
    alt_text: "Tangan pengrajin menganyam strip bambu tipis dengan teliti.",
    section_name: "AboutMosaic_Left",
  },
  {
    id: "g2",
    image_url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700&q=80",
    alt_text: "Tiga besek bundar anyaman bambu ditumpuk rapi di alas putih.",
    section_name: "AboutMosaic_RightTop",
  },
  {
    id: "g3",
    image_url: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=700&q=80",
    alt_text: "Batang bambu mentah sedang diproses di meja kerja bengkel.",
    section_name: "AboutMosaic_RightBottom",
  },
];
