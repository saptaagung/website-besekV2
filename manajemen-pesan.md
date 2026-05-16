<!DOCTYPE html>

<html lang="id"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Manajemen Pesan - Besek Artisanal Admin</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
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
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .icon-fill {
            font-variation-settings: 'FILL' 1;
        }
        .soft-shadow {
            box-shadow: 0 4px 20px rgba(85, 107, 47, 0.05);
        }
    </style>
</head>
<body class="bg-background text-on-background font-body-md min-h-screen flex flex-col">
<!-- TopNavBar (Admin Variant - Suppressed standard nav, custom header) -->
<header class="bg-surface shadow-sm docked full-width top-0 z-50">
<div class="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-[1280px] mx-auto">
<div class="font-headline-md text-headline-md font-bold text-primary">
                Besek Artisanal <span class="text-on-surface-variant font-label-md ml-2">Admin Panel</span>
</div>
<div class="flex items-center gap-4">
<button class="text-on-surface-variant hover:opacity-80 transition-opacity">
<span class="material-symbols-outlined">notifications</span>
</button>
<div class="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-md text-label-md">
                    AD
                </div>
</div>
</div>
</header>
<!-- Main Content -->
<main class="flex-grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-lg grid grid-cols-1 md:grid-cols-12 gap-gutter">
<!-- Sidebar Navigation -->
<aside class="hidden md:block md:col-span-3">
<nav class="flex flex-col gap-2 sticky top-[100px]">
<a class="flex items-center gap-3 px-4 py-3 rounded-DEFAULT text-on-surface-variant hover:bg-surface-container-low transition-colors font-label-md text-label-md" href="#">
<span class="material-symbols-outlined">dashboard</span> Dashboard
                </a>
<a class="flex items-center gap-3 px-4 py-3 rounded-DEFAULT text-on-surface-variant hover:bg-surface-container-low transition-colors font-label-md text-label-md" href="#">
<span class="material-symbols-outlined">inventory_2</span> Produk
                </a>
<a class="flex items-center gap-3 px-4 py-3 rounded-DEFAULT bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold" href="#">
<span class="material-symbols-outlined icon-fill">inbox</span> Kotak Masuk
                    <span class="ml-auto bg-error text-on-error text-[10px] px-2 py-0.5 rounded-full">3</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-DEFAULT text-on-surface-variant hover:bg-surface-container-low transition-colors font-label-md text-label-md" href="#">
<span class="material-symbols-outlined">settings</span> Pengaturan
                </a>
</nav>
</aside>
<!-- Messages Area -->
<div class="col-span-1 md:col-span-9 flex flex-col gap-md">
<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
<h1 class="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary">Manajemen Pesan</h1>
<!-- Filters -->
<div class="flex gap-2">
<select class="bg-surface-container-lowest border border-outline-variant text-on-surface rounded-DEFAULT px-3 py-2 font-label-md text-label-sm focus:outline-none focus:border-primary">
<option value="all">Semua Status</option>
<option value="unread">Belum Dibaca</option>
<option value="replied">Sudah Dibalas</option>
</select>
<select class="bg-surface-container-lowest border border-outline-variant text-on-surface rounded-DEFAULT px-3 py-2 font-label-md text-label-sm focus:outline-none focus:border-primary">
<option value="all">Semua Sumber</option>
<option value="form">Web Form</option>
<option value="wa">WhatsApp</option>
</select>
</div>
</div>
<!-- Messages List (Glassmorphism inspired cards) -->
<div class="flex flex-col gap-sm">
<!-- Unread Message 1 -->
<div class="bg-surface-container-lowest rounded-lg p-6 soft-shadow border-l-4 border-primary flex flex-col md:flex-row gap-6 items-start md:items-center transition-all hover:-translate-y-1">
<div class="flex-grow">
<div class="flex items-center gap-3 mb-2">
<span class="font-label-md text-label-md text-on-surface font-bold">Budi Santoso</span>
<span class="text-on-surface-variant text-label-sm">•</span>
<span class="text-on-surface-variant text-label-sm font-label-sm">budi.s@example.com</span>
<span class="ml-auto md:ml-4 bg-error-container text-on-error-container font-label-sm text-[10px] px-2 py-1 rounded-DEFAULT uppercase tracking-wider">Baru</span>
</div>
<h3 class="font-headline-md text-headline-md text-primary mb-2 text-lg">Pertanyaan Custom Order Besek Bambu</h3>
<p class="text-on-surface-variant font-body-md text-body-md line-clamp-2">
                            Halo admin, saya tertarik untuk memesan besek bambu dengan ukuran custom 20x20 cm untuk acara pernikahan. Apakah memungkinkan untuk order sebanyak 500 pcs dengan waktu pengerjaan 1 bulan?
                        </p>
<div class="mt-3 flex items-center gap-4 text-outline font-label-sm text-label-sm">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">calendar_today</span> 12 Okt 2023, 09:30</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">language</span> Web Form</span>
</div>
</div>
<div class="flex md:flex-col gap-2 w-full md:w-auto">
<button class="flex-1 md:flex-none bg-primary text-on-primary font-label-md text-label-md px-4 py-2 rounded-DEFAULT hover:opacity-90 transition-opacity whitespace-nowrap">Balas Email</button>
<button class="flex-1 md:flex-none border border-outline-variant text-on-surface font-label-md text-label-md px-4 py-2 rounded-DEFAULT hover:bg-surface-container-low transition-colors">Tandai Selesai</button>
</div>
</div>
<!-- Unread Message 2 (WhatsApp) -->
<div class="bg-surface-container-lowest rounded-lg p-6 soft-shadow border-l-4 border-primary flex flex-col md:flex-row gap-6 items-start md:items-center transition-all hover:-translate-y-1">
<div class="flex-grow">
<div class="flex items-center gap-3 mb-2">
<span class="font-label-md text-label-md text-on-surface font-bold">+62 812-3456-7890</span>
<span class="ml-auto md:ml-4 bg-error-container text-on-error-container font-label-sm text-[10px] px-2 py-1 rounded-DEFAULT uppercase tracking-wider">Baru</span>
</div>
<h3 class="font-headline-md text-headline-md text-primary mb-2 text-lg">Inquiry Produk Katalog</h3>
<p class="text-on-surface-variant font-body-md text-body-md line-clamp-2">
                            Halo, saya melihat koleksi "Besek Natural Anyam Rapat" di website. Apakah stoknya tersedia untuk pengiriman minggu ini ke Jakarta?
                        </p>
<div class="mt-3 flex items-center gap-4 text-outline font-label-sm text-label-sm">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">calendar_today</span> 11 Okt 2023, 15:45</span>
<span class="flex items-center gap-1 text-primary-container"><span class="material-symbols-outlined text-[16px]">chat</span> WhatsApp</span>
</div>
</div>
<div class="flex md:flex-col gap-2 w-full md:w-auto">
<button class="flex-1 md:flex-none bg-[#25D366] text-white font-label-md text-label-md px-4 py-2 rounded-DEFAULT hover:opacity-90 transition-opacity whitespace-nowrap flex items-center justify-center gap-2"><span class="material-symbols-outlined text-[18px]">open_in_new</span> Buka WA</button>
<button class="flex-1 md:flex-none border border-outline-variant text-on-surface font-label-md text-label-md px-4 py-2 rounded-DEFAULT hover:bg-surface-container-low transition-colors">Tandai Selesai</button>
</div>
</div>
<!-- Read/Replied Message -->
<div class="bg-surface-container-lowest rounded-lg p-6 soft-shadow flex flex-col md:flex-row gap-6 items-start md:items-center opacity-70 transition-all hover:-translate-y-1 hover:opacity-100">
<div class="flex-grow">
<div class="flex items-center gap-3 mb-2">
<span class="font-label-md text-label-md text-on-surface">Siti Rahmawati</span>
<span class="text-on-surface-variant text-label-sm">•</span>
<span class="text-on-surface-variant text-label-sm font-label-sm">siti.r@example.com</span>
<span class="ml-auto md:ml-4 bg-surface-container-high text-on-surface font-label-sm text-[10px] px-2 py-1 rounded-DEFAULT uppercase tracking-wider">Selesai</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface mb-2 text-lg">Kerja Sama Reseller</h3>
<p class="text-on-surface-variant font-body-md text-body-md line-clamp-2">
                            Selamat siang, saya ingin mengetahui syarat dan ketentuan untuk menjadi reseller produk Besek Artisanal di daerah Bandung.
                        </p>
<div class="mt-3 flex items-center gap-4 text-outline font-label-sm text-label-sm">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">calendar_today</span> 09 Okt 2023, 10:15</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">language</span> Web Form</span>
</div>
</div>
<div class="flex md:flex-col gap-2 w-full md:w-auto">
<button class="flex-1 md:flex-none border border-outline-variant text-on-surface font-label-md text-label-md px-4 py-2 rounded-DEFAULT hover:bg-surface-container-low transition-colors">Lihat Detail</button>
</div>
</div>
</div>
<!-- Pagination -->
<div class="flex justify-center mt-6">
<nav class="flex items-center gap-2">
<button class="w-10 h-10 flex items-center justify-center rounded-DEFAULT border border-outline-variant text-outline hover:text-primary hover:border-primary transition-colors disabled:opacity-50"><span class="material-symbols-outlined">chevron_left</span></button>
<button class="w-10 h-10 flex items-center justify-center rounded-DEFAULT bg-primary text-on-primary font-label-md text-label-md">1</button>
<button class="w-10 h-10 flex items-center justify-center rounded-DEFAULT border border-outline-variant text-on-surface hover:text-primary hover:border-primary transition-colors font-label-md text-label-md">2</button>
<button class="w-10 h-10 flex items-center justify-center rounded-DEFAULT border border-outline-variant text-on-surface hover:text-primary hover:border-primary transition-colors font-label-md text-label-md">3</button>
<button class="w-10 h-10 flex items-center justify-center rounded-DEFAULT border border-outline-variant text-outline hover:text-primary hover:border-primary transition-colors"><span class="material-symbols-outlined">chevron_right</span></button>
</nav>
</div>
</div>
</main>
<!-- BottomNavBar (Mobile Admin - Simplistic) -->
<nav class="bg-surface docked full-width bottom-0 md:hidden border-t border-outline-variant shadow-lg fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-safe py-2">
<a class="flex flex-col items-center justify-center text-on-surface-variant font-label-sm text-label-sm p-2" href="#">
<span class="material-symbols-outlined">dashboard</span>
</a>
<a class="flex flex-col items-center justify-center text-primary font-label-sm text-label-sm p-2 relative" href="#">
<span class="material-symbols-outlined icon-fill">inbox</span>
<span class="absolute top-1 right-1 bg-error w-2 h-2 rounded-full"></span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant font-label-sm text-label-sm p-2" href="#">
<span class="material-symbols-outlined">settings</span>
</a>
</nav>
</body></html>