<!DOCTYPE html>

<html lang="id"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Dashboard Admin - Besek Artisanal</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Playfair+Display:wght@500;600;700&amp;display=swap" rel="stylesheet"/>
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
                        "headline-md": ["Playfair Display"],
                        "headline-xl": ["Playfair Display"],
                        "body-lg": ["Inter"],
                        "label-md": ["Inter"],
                        "headline-lg": ["Playfair Display"],
                        "headline-lg-mobile": ["Playfair Display"],
                        "label-sm": ["Inter"],
                        "body-md": ["Inter"]
                    },
                    "fontSize": {
                        "headline-md": ["24px", { "lineHeight": "1.4", "fontWeight": "500" }],
                        "headline-xl": ["48px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
                        "label-md": ["14px", { "lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "600" }],
                        "headline-lg": ["36px", { "lineHeight": "1.25", "fontWeight": "600" }],
                        "headline-lg-mobile": ["28px", { "lineHeight": "1.3", "fontWeight": "600" }],
                        "label-sm": ["12px", { "lineHeight": "1.2", "fontWeight": "500" }],
                        "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }]
                    }
                }
            }
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
</head>
<body class="bg-surface text-on-surface font-body-md antialiased flex h-screen overflow-hidden">
<!-- Sidebar Navigation -->
<aside class="w-64 bg-surface-container-lowest border-r border-outline-variant flex-shrink-0 flex flex-col hidden md:flex">
<div class="p-margin-mobile md:p-gutter border-b border-outline-variant">
<h1 class="font-headline-md text-headline-md font-bold text-primary">Besek Artisanal</h1>
<p class="font-label-sm text-label-sm text-on-surface-variant mt-xs">Admin Workspace</p>
</div>
<nav class="flex-1 overflow-y-auto py-sm">
<ul class="space-y-xs px-sm">
<li>
<a class="flex items-center gap-sm px-sm py-base bg-primary-container text-on-primary-container rounded-lg font-label-md text-label-md" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">dashboard</span>
                        Dashboard
                    </a>
</li>
<li>
<a class="flex items-center gap-sm px-sm py-base text-on-surface-variant hover:bg-surface-container-low hover:text-primary rounded-lg font-label-md text-label-md transition-colors" href="#">
<span class="material-symbols-outlined">inventory_2</span>
                        Produk
                    </a>
</li>
<li>
<a class="flex items-center gap-sm px-sm py-base text-on-surface-variant hover:bg-surface-container-low hover:text-primary rounded-lg font-label-md text-label-md transition-colors" href="#">
<span class="material-symbols-outlined">forum</span>
                        Pesan Masuk
                    </a>
</li>
<li>
<a class="flex items-center gap-sm px-sm py-base text-on-surface-variant hover:bg-surface-container-low hover:text-primary rounded-lg font-label-md text-label-md transition-colors" href="#">
<span class="material-symbols-outlined">auto_stories</span>
                        Cerita Kami
                    </a>
</li>
</ul>
</nav>
<div class="p-gutter border-t border-outline-variant">
<a class="flex items-center gap-sm text-on-surface-variant hover:text-error transition-colors font-label-md text-label-md" href="#">
<span class="material-symbols-outlined">logout</span>
                Keluar
            </a>
</div>
</aside>
<!-- Main Content Area -->
<main class="flex-1 flex flex-col overflow-hidden bg-background">
<!-- Top App Bar for Mobile (Hidden on Desktop) -->
<header class="bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between p-margin-mobile md:hidden">
<div class="flex items-center gap-sm">
<button class="text-on-surface-variant">
<span class="material-symbols-outlined">menu</span>
</button>
<h1 class="font-headline-md text-headline-md font-bold text-primary">Besek Artisanal</h1>
</div>
<button class="text-on-surface-variant">
<span class="material-symbols-outlined">account_circle</span>
</button>
</header>
<!-- Dashboard Canvas -->
<div class="flex-1 overflow-y-auto p-margin-mobile md:p-margin-desktop">
<!-- Page Header -->
<div class="flex justify-between items-end mb-lg">
<div>
<h2 class="font-headline-xl text-headline-xl text-primary mb-xs">Ringkasan</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Pantau aktivitas terbaru dan performa toko Anda.</p>
</div>
<div class="hidden md:block">
<button class="bg-primary text-on-primary px-gutter py-sm rounded-full font-label-md text-label-md flex items-center gap-xs hover:bg-surface-tint transition-colors">
<span class="material-symbols-outlined text-[18px]">add</span>
                        Tambah Produk
                    </button>
</div>
</div>
<!-- Stats Grid -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-xl">
<!-- Stat Card 1 -->
<div class="bg-surface-container-lowest p-gutter rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
<div class="absolute -right-6 -top-6 bg-surface-container-low w-24 h-24 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
<div class="flex items-start justify-between relative z-10 mb-md">
<div>
<p class="font-label-md text-label-md text-on-surface-variant mb-xs">Total Produk Aktif</p>
<h3 class="font-headline-lg text-headline-lg text-on-surface">142</h3>
</div>
<div class="w-10 h-10 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center">
<span class="material-symbols-outlined">inventory_2</span>
</div>
</div>
<div class="flex items-center gap-xs text-primary relative z-10">
<span class="material-symbols-outlined text-[16px]">trending_up</span>
<span class="font-label-sm text-label-sm">+12 bulan ini</span>
</div>
</div>
<!-- Stat Card 2 -->
<div class="bg-surface-container-lowest p-gutter rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
<div class="absolute -right-6 -top-6 bg-surface-container-low w-24 h-24 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
<div class="flex items-start justify-between relative z-10 mb-md">
<div>
<p class="font-label-md text-label-md text-on-surface-variant mb-xs">Pesan Masuk (Bulan Ini)</p>
<h3 class="font-headline-lg text-headline-lg text-on-surface">84</h3>
</div>
<div class="w-10 h-10 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center">
<span class="material-symbols-outlined">forum</span>
</div>
</div>
<div class="flex items-center gap-xs text-primary relative z-10">
<span class="material-symbols-outlined text-[16px]">trending_up</span>
<span class="font-label-sm text-label-sm">+5% dari bulan lalu</span>
</div>
</div>
<!-- Stat Card 3 -->
<div class="bg-surface-container-lowest p-gutter rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
<div class="absolute -right-6 -top-6 bg-surface-container-low w-24 h-24 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
<div class="flex items-start justify-between relative z-10 mb-md">
<div>
<p class="font-label-md text-label-md text-on-surface-variant mb-xs">Total Dilihat (Minggu Ini)</p>
<h3 class="font-headline-lg text-headline-lg text-on-surface">1,204</h3>
</div>
<div class="w-10 h-10 bg-tertiary-container text-on-tertiary-container rounded-full flex items-center justify-center">
<span class="material-symbols-outlined">visibility</span>
</div>
</div>
<div class="flex items-center gap-xs text-error relative z-10">
<span class="material-symbols-outlined text-[16px]">trending_down</span>
<span class="font-label-sm text-label-sm">-2% dari minggu lalu</span>
</div>
</div>
</div>
<!-- Recent Activity Section -->
<div class="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
<div class="p-gutter border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
<h3 class="font-headline-md text-headline-md text-primary">Aktivitas Terbaru</h3>
<button class="font-label-md text-label-md text-secondary hover:text-primary transition-colors flex items-center gap-xs">
                        Lihat Semua
                        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="border-b border-outline-variant">
<th class="py-sm px-gutter font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Tipe</th>
<th class="py-sm px-gutter font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Klien</th>
<th class="py-sm px-gutter font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Produk Terkait</th>
<th class="py-sm px-gutter font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Waktu</th>
<th class="py-sm px-gutter font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Aksi</th>
</tr>
</thead>
<tbody class="font-body-md text-body-md">
<!-- Row 1 -->
<tr class="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
<td class="py-md px-gutter">
<div class="flex items-center gap-xs">
<div class="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-[16px]">chat</span>
</div>
<span class="font-label-md text-label-md">Tanya Harga</span>
</div>
</td>
<td class="py-md px-gutter">
<p class="font-label-md text-label-md text-on-surface">Budi Santoso</p>
<p class="font-label-sm text-label-sm text-on-surface-variant">+62 812-3456-7890</p>
</td>
<td class="py-md px-gutter text-on-surface-variant">Besek Bambu Kotak Besar</td>
<td class="py-md px-gutter text-on-surface-variant">10 Menit lalu</td>
<td class="py-md px-gutter text-right">
<button class="text-primary hover:text-surface-tint p-xs rounded-full hover:bg-primary-container/20 transition-colors">
<span class="material-symbols-outlined">reply</span>
</button>
</td>
</tr>
<!-- Row 2 -->
<tr class="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
<td class="py-md px-gutter">
<div class="flex items-center gap-xs">
<div class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-[16px]">shopping_cart</span>
</div>
<span class="font-label-md text-label-md">Pesanan Baru</span>
</div>
</td>
<td class="py-md px-gutter">
<p class="font-label-md text-label-md text-on-surface">Siti Aminah</p>
<p class="font-label-sm text-label-sm text-on-surface-variant">siti.a@email.com</p>
</td>
<td class="py-md px-gutter text-on-surface-variant">Rantang Bambu Susun 3 (x2)</td>
<td class="py-md px-gutter text-on-surface-variant">2 Jam lalu</td>
<td class="py-md px-gutter text-right">
<button class="text-primary hover:text-surface-tint p-xs rounded-full hover:bg-primary-container/20 transition-colors">
<span class="material-symbols-outlined">visibility</span>
</button>
</td>
</tr>
<!-- Row 3 -->
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-md px-gutter">
<div class="flex items-center gap-xs">
<div class="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-[16px]">chat</span>
</div>
<span class="font-label-md text-label-md">Pertanyaan</span>
</div>
</td>
<td class="py-md px-gutter">
<p class="font-label-md text-label-md text-on-surface">Andi Wijaya</p>
<p class="font-label-sm text-label-sm text-on-surface-variant">+62 877-6543-2109</p>
</td>
<td class="py-md px-gutter text-on-surface-variant">Custom Ukuran Besek</td>
<td class="py-md px-gutter text-on-surface-variant">Kemarin, 15:30</td>
<td class="py-md px-gutter text-right">
<button class="text-primary hover:text-surface-tint p-xs rounded-full hover:bg-primary-container/20 transition-colors">
<span class="material-symbols-outlined">reply</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</main>
</body></html>