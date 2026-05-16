<!DOCTYPE html>

<html lang="id"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Edit Produk - Besek Artisanal</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Playfair+Display:wght@500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "secondary-fixed": "#ffddb7",
                      "primary-fixed": "#d2eca2",
                      "surface-container-lowest": "#ffffff",
                      "surface-container": "#f0eded",
                      "on-tertiary-container": "#e2e1de",
                      "on-surface": "#1b1c1c",
                      "on-primary-fixed": "#131f00",
                      "surface": "#fbf9f8",
                      "on-tertiary-fixed-variant": "#464745",
                      "on-primary-container": "#d0eba1",
                      "secondary-container": "#fed39f",
                      "tertiary": "#4b4c4a",
                      "surface-bright": "#fbf9f8",
                      "tertiary-container": "#636462",
                      "surface-container-high": "#eae8e7",
                      "inverse-primary": "#b6d088",
                      "on-surface-variant": "#45483c",
                      "inverse-surface": "#303030",
                      "outline-variant": "#c5c8b8",
                      "surface-container-low": "#f6f3f2",
                      "tertiary-fixed": "#e3e2e0",
                      "inverse-on-surface": "#f3f0f0",
                      "on-error-container": "#93000a",
                      "on-secondary": "#ffffff",
                      "on-primary": "#ffffff",
                      "on-secondary-fixed": "#2a1700",
                      "on-secondary-container": "#795930",
                      "primary": "#3e5219",
                      "on-secondary-fixed-variant": "#5e411a",
                      "secondary": "#78582f",
                      "primary-container": "#556b2f",
                      "on-tertiary-fixed": "#1a1c1a",
                      "tertiary-fixed-dim": "#c7c6c4",
                      "on-primary-fixed-variant": "#394d14",
                      "secondary-fixed-dim": "#eabf8d",
                      "primary-fixed-dim": "#b6d088",
                      "on-tertiary": "#ffffff",
                      "error-container": "#ffdad6",
                      "surface-container-highest": "#e4e2e1",
                      "surface-dim": "#dcd9d9",
                      "surface-variant": "#e4e2e1",
                      "on-error": "#ffffff",
                      "surface-tint": "#50652a",
                      "outline": "#75796b",
                      "background": "#fbf9f8",
                      "on-background": "#1b1c1c",
                      "error": "#ba1a1a"
              },
              "borderRadius": {
                      "DEFAULT": "0.125rem",
                      "lg": "0.25rem",
                      "xl": "0.5rem",
                      "full": "0.75rem"
              },
              "spacing": {
                      "margin-desktop": "64px",
                      "gutter": "24px",
                      "md": "24px",
                      "sm": "12px",
                      "margin-mobile": "16px",
                      "base": "8px",
                      "xs": "4px",
                      "xl": "80px",
                      "lg": "48px"
              },
              "fontFamily": {
                      "headline-md": [
                              "Playfair Display"
                      ],
                      "headline-xl": [
                              "Playfair Display"
                      ],
                      "body-lg": [
                              "Inter"
                      ],
                      "label-md": [
                              "Inter"
                      ],
                      "headline-lg": [
                              "Playfair Display"
                      ],
                      "headline-lg-mobile": [
                              "Playfair Display"
                      ],
                      "label-sm": [
                              "Inter"
                      ],
                      "body-md": [
                              "Inter"
                      ]
              },
              "fontSize": {
                      "headline-md": [
                              "24px",
                              {
                                      "lineHeight": "1.4",
                                      "fontWeight": "500"
                              }
                      ],
                      "headline-xl": [
                              "48px",
                              {
                                      "lineHeight": "1.2",
                                      "letterSpacing": "-0.02em",
                                      "fontWeight": "700"
                              }
                      ],
                      "body-lg": [
                              "18px",
                              {
                                      "lineHeight": "1.6",
                                      "fontWeight": "400"
                              }
                      ],
                      "label-md": [
                              "14px",
                              {
                                      "lineHeight": "1.2",
                                      "letterSpacing": "0.05em",
                                      "fontWeight": "600"
                              }
                      ],
                      "headline-lg": [
                              "36px",
                              {
                                      "lineHeight": "1.25",
                                      "fontWeight": "600"
                              }
                      ],
                      "headline-lg-mobile": [
                              "28px",
                              {
                                      "lineHeight": "1.3",
                                      "fontWeight": "600"
                              }
                      ],
                      "label-sm": [
                              "12px",
                              {
                                      "lineHeight": "1.2",
                                      "fontWeight": "500"
                              }
                      ],
                      "body-md": [
                              "16px",
                              {
                                      "lineHeight": "1.6",
                                      "fontWeight": "400"
                              }
                      ]
              }
      },
          },
        }
      </script>
</head>
<body class="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
<!-- TopNavBar -->
<header class="bg-surface dark:bg-surface shadow-sm dark:shadow-none w-full sticky top-0 z-50">
<div class="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-[1280px] mx-auto transition-all duration-300 ease-in-out">
<div class="font-headline-md text-headline-md font-bold text-primary dark:text-inverse-primary">
                Besek Artisanal
            </div>
<nav class="hidden md:flex gap-gutter">
<a class="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors hover:opacity-80 transition-opacity" href="#">Beranda</a>
<a class="font-label-md text-label-md text-primary dark:text-inverse-primary border-b-2 border-primary dark:border-inverse-primary pb-1 hover:opacity-80 transition-opacity" href="#">Produk</a>
<a class="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors hover:opacity-80 transition-opacity" href="#">Cerita Kami</a>
<a class="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors hover:opacity-80 transition-opacity" href="#">Kontak</a>
</nav>
<div class="flex gap-sm">
<button class="text-primary dark:text-inverse-primary hover:opacity-80 transition-opacity">
<span class="material-symbols-outlined">search</span>
</button>
<button class="text-primary dark:text-inverse-primary hover:opacity-80 transition-opacity">
<span class="material-symbols-outlined">shopping_bag</span>
</button>
</div>
</div>
</header>
<!-- Main Content -->
<main class="flex-grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-lg">
<div class="mb-lg flex items-center gap-sm">
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined">arrow_back</span>
</button>
<h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Edit Produk</h1>
</div>
<form class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
<!-- Left Column: Details -->
<div class="md:col-span-8 space-y-md">
<!-- Basic Info Card -->
<div class="bg-surface-container-lowest rounded-xl p-md shadow-sm border border-outline-variant/30">
<h2 class="font-headline-md text-headline-md text-primary mb-md">Informasi Dasar</h2>
<div class="space-y-sm">
<div>
<label class="font-label-sm text-label-sm text-on-surface-variant mb-xs block">Nama Produk</label>
<input class="w-full bg-transparent border-b border-outline-variant focus:border-primary text-on-surface font-body-md py-base focus:outline-none transition-colors" type="text" value="Besek Anyam Tiga Lapis"/>
</div>
<div>
<label class="font-label-sm text-label-sm text-on-surface-variant mb-xs block mt-sm">Deskripsi</label>
<textarea class="w-full bg-transparent border border-outline-variant rounded-lg focus:border-primary text-on-surface font-body-md p-sm focus:outline-none transition-colors" rows="4">Dianyam secara manual dengan teknik tiga lapis untuk kekuatan maksimal. Cocok untuk penyimpanan ramah lingkungan dan hantaran premium.</textarea>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-sm mt-sm">
<div>
<label class="font-label-sm text-label-sm text-on-surface-variant mb-xs block">Harga (IDR)</label>
<input class="w-full bg-transparent border-b border-outline-variant focus:border-primary text-on-surface font-body-md py-base focus:outline-none transition-colors" type="number" value="150000"/>
</div>
<div>
<label class="font-label-sm text-label-sm text-on-surface-variant mb-xs block">Stok Tersedia</label>
<input class="w-full bg-transparent border-b border-outline-variant focus:border-primary text-on-surface font-body-md py-base focus:outline-none transition-colors" type="number" value="24"/>
</div>
</div>
</div>
</div>
<!-- Specifications Card -->
<div class="bg-surface-container-lowest rounded-xl p-md shadow-sm border border-outline-variant/30">
<h2 class="font-headline-md text-headline-md text-primary mb-md">Spesifikasi</h2>
<div class="space-y-sm">
<div>
<label class="font-label-sm text-label-sm text-on-surface-variant mb-xs block">Material</label>
<input class="w-full bg-transparent border-b border-outline-variant focus:border-primary text-on-surface font-body-md py-base focus:outline-none transition-colors" type="text" value="Bambu Apus Pilihan"/>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-sm mt-sm">
<div>
<label class="font-label-sm text-label-sm text-on-surface-variant mb-xs block">Panjang (cm)</label>
<input class="w-full bg-transparent border-b border-outline-variant focus:border-primary text-on-surface font-body-md py-base focus:outline-none transition-colors" type="number" value="20"/>
</div>
<div>
<label class="font-label-sm text-label-sm text-on-surface-variant mb-xs block">Lebar (cm)</label>
<input class="w-full bg-transparent border-b border-outline-variant focus:border-primary text-on-surface font-body-md py-base focus:outline-none transition-colors" type="number" value="20"/>
</div>
<div>
<label class="font-label-sm text-label-sm text-on-surface-variant mb-xs block">Tinggi (cm)</label>
<input class="w-full bg-transparent border-b border-outline-variant focus:border-primary text-on-surface font-body-md py-base focus:outline-none transition-colors" type="number" value="10"/>
</div>
</div>
<div class="mt-sm">
<label class="font-label-sm text-label-sm text-on-surface-variant mb-xs block">Teknik Anyaman</label>
<input class="w-full bg-transparent border-b border-outline-variant focus:border-primary text-on-surface font-body-md py-base focus:outline-none transition-colors" type="text" value="Anyaman Silang Ganda"/>
</div>
</div>
</div>
</div>
<!-- Right Column: Media & Actions -->
<div class="md:col-span-4 space-y-md">
<!-- Gallery Card -->
<div class="bg-surface-container-lowest rounded-xl p-md shadow-sm border border-outline-variant/30">
<div class="flex justify-between items-center mb-md">
<h2 class="font-headline-md text-headline-md text-primary">Galeri Gambar</h2>
<span class="font-label-sm text-label-sm text-on-surface-variant">3/5</span>
</div>
<div class="grid grid-cols-2 gap-sm">
<!-- Main Image -->
<div class="col-span-2 relative aspect-square rounded-lg overflow-hidden group">
<img class="w-full h-full object-cover" data-alt="A beautifully crafted woven bamboo box, sitting on a clean white table. The texture of the natural material is highlighted by soft, diffused natural light from a nearby window. The background is slightly out of focus, showcasing a minimalist, earthy aesthetic with warm olive green accents. The image evokes a sense of high-end traditional craftsmanship and sustainable design." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBa_5JT5AG0hq8dDWQbpY6cvojKRkGgysFX6SJBA-Ho36DyOrKli6hsQjk31RcIavkd9HnG2OU7bDckkHmSt3n02EQoytp0G9PP8fyVYOq1M8fTjdEGRpRL6hxoEr6NyGR-RpobA0A9g0itAxFfHyRfq258jNtfDMQGLIgrUx1PkPjmX_rQovCjk21fbzjCbdBnMZpyRu95_c9oa78he-uid7CeBqpW-sxiRdprFzUwGRH8zO9UOw_OOCWOpwcbSF0Fumi7onfucQ"/>
<button class="absolute top-2 right-2 bg-surface/80 p-1 rounded-full text-error opacity-0 group-hover:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-[18px]">delete</span>
</button>
<div class="absolute bottom-2 left-2 bg-surface/80 px-2 py-1 rounded text-[10px] font-label-sm">Utama</div>
</div>
<!-- Thumbnail 1 -->
<div class="relative aspect-square rounded-lg overflow-hidden group">
<img class="w-full h-full object-cover" data-alt="Close up detail shot of intricate bamboo weaving patterns on a small artisanal basket. The tight, precise interlacing of the natural fibers is illuminated by soft daylight, emphasizing the artisanal quality and texture. A subtle, blurred background maintains the focus on the craftsmanship. The overall mood is grounded, organic, and premium." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO7rFgvGR3oGkxyyewYthjVR4mGmjTppN6Nm4YcVtSVF-hv8wRS7mCRsJkGKd0oshRAHH8g-nBZG8B2DB2uF7sV4RjN--fLsEzgmGASjf-H1yPLo22WGwb_e8H3oulMuA1bgJQTaMlxXmnE5Z37QkaAmAX4S2pa9p-I9VHM-7VM-T594H5abCLgeeIXvLstogcXmBKtflQ8290ggHNeRifJGaM3PvUAIWgCjR2-FZ8KeBMgLJb3jVzW22C2xS9n7F5UKDmndoZCqE"/>
<button class="absolute top-1 right-1 bg-surface/80 p-1 rounded-full text-error opacity-0 group-hover:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-[14px]">delete</span>
</button>
</div>
<!-- Thumbnail 2 -->
<div class="relative aspect-square rounded-lg overflow-hidden group">
<img class="w-full h-full object-cover" data-alt="A top-down view of an open woven bamboo box, revealing a clean, simple interior. The box rests on a lightly textured beige linen cloth. The lighting is bright and soft, creating minimal shadows and highlighting the sustainable, natural materials. The visual style aligns with modern, slow-made luxury." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHyISDKM6hlDmVN5rNXTMSJ84Gm62wqkkhzQ_53iwi7I5naudiO6gIk7o12KOBTxFfMPaRpYqvReTdffQsia5NGFhxgal9qiOX47QnuUS1ifUDOvPmfwPsNAsLT5AMq73bZNk_tCwQ8IjMA6okrms-yNxiZ-YFwaEsts-PTiVJJq22W_VBlVSvzYNIRYMhZ3zwjadIfelQE7_S4CEXsmnEa4B38_OojCAVMbNO0emevqRjPB1hvql_gWXfFo6qhJtWlQR2ES2SVGo"/>
<button class="absolute top-1 right-1 bg-surface/80 p-1 rounded-full text-error opacity-0 group-hover:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-[14px]">delete</span>
</button>
</div>
<!-- Upload Placeholder -->
<button class="aspect-square rounded-lg border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-colors hover:bg-surface-container-low" type="button">
<span class="material-symbols-outlined mb-xs">add_photo_alternate</span>
<span class="font-label-sm text-label-sm">Unggah</span>
</button>
</div>
</div>
<!-- Status & Action Card -->
<div class="bg-surface-container-lowest rounded-xl p-md shadow-sm border border-outline-variant/30 flex flex-col gap-md">
<div>
<label class="font-label-sm text-label-sm text-on-surface-variant mb-xs block">Status Produk</label>
<select class="w-full bg-transparent border border-outline-variant rounded-lg focus:border-primary text-on-surface font-body-md p-sm focus:outline-none transition-colors">
<option value="active">Aktif (Tampil di Toko)</option>
<option value="draft">Draf (Disembunyikan)</option>
</select>
</div>
<div class="flex flex-col gap-sm mt-sm">
<button class="w-full bg-primary text-on-primary font-label-md text-label-md py-sm rounded-lg hover:opacity-90 transition-opacity shadow-sm" type="button">
                            Simpan Perubahan
                        </button>
<button class="w-full border border-secondary text-secondary font-label-md text-label-md py-sm rounded-lg hover:bg-secondary/5 transition-colors" type="button">
                            Batal
                        </button>
</div>
</div>
</div>
</form>
</main>
<!-- Footer -->
<footer class="bg-surface-container dark:bg-surface-container mt-auto">
<div class="w-full px-margin-mobile md:px-margin-desktop py-lg flex flex-col md:flex-row justify-between items-center gap-gutter border-t border-surface-container-high dark:border-surface-container-high opacity-90 hover:opacity-100 transition-opacity">
<div class="font-headline-sm text-headline-md text-primary dark:text-inverse-primary">
                Besek Artisanal
            </div>
<div class="font-body-md text-body-md text-primary dark:text-inverse-primary text-center md:text-left">
                © 2024 Besek Artisanal. Sustainable Indonesian Craftsmanship.
            </div>
<div class="flex gap-md">
<a class="font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors" href="#">Kebijakan Privasi</a>
<a class="font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors" href="#">Syarat &amp; Ketentuan</a>
<a class="font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors" href="#">FAQ</a>
</div>
</div>
</footer>
<!-- BottomNavBar (Mobile Only) -->
<nav class="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-surface px-2 pb-safe border-t border-outline-variant dark:border-outline shadow-lg">
<a class="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant py-sm px-4 active:bg-surface-container-low transition-transform active:scale-95" href="#">
<span class="material-symbols-outlined mb-1">home</span>
<span class="font-label-sm text-label-sm-mobile">Beranda</span>
</a>
<a class="flex flex-col items-center justify-center text-primary dark:text-inverse-primary py-sm px-4 active:bg-surface-container-low transition-transform active:scale-95" href="#">
<span class="material-symbols-outlined mb-1" style="font-variation-settings: 'FILL' 1;">grid_view</span>
<span class="font-label-sm text-label-sm-mobile">Produk</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant py-sm px-4 active:bg-surface-container-low transition-transform active:scale-95" href="#">
<span class="material-symbols-outlined mb-1">auto_stories</span>
<span class="font-label-sm text-label-sm-mobile">Kisah</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant py-sm px-4 active:bg-surface-container-low transition-transform active:scale-95" href="#">
<span class="material-symbols-outlined mb-1">chat</span>
<span class="font-label-sm text-label-sm-mobile">Kontak</span>
</a>
</nav>
</body></html