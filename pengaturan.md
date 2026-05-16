<!DOCTYPE html>

<html lang="id"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Admin - Pengaturan Beranda | Besek Artisanal</title>
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Playfair+Display:wght@500;600;700&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Tailwind Configuration -->
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "surface-dim": "#dcd9d9",
                        "secondary-fixed-dim": "#eabf8d",
                        "on-primary-fixed-variant": "#394d14",
                        "secondary": "#78582f",
                        "secondary-fixed": "#ffddb7",
                        "surface-tint": "#50652a",
                        "surface-container-high": "#eae8e7",
                        "inverse-surface": "#303030",
                        "tertiary-fixed-dim": "#c7c6c4",
                        "primary-fixed": "#d2eca2",
                        "surface-container": "#f0eded",
                        "on-tertiary-fixed": "#1a1c1a",
                        "primary": "#3e5219",
                        "on-background": "#1b1c1c",
                        "surface-variant": "#e4e2e1",
                        "inverse-primary": "#b6d088",
                        "inverse-on-surface": "#f3f0f0",
                        "surface-bright": "#fbf9f8",
                        "surface": "#fbf9f8",
                        "on-error-container": "#93000a",
                        "error-container": "#ffdad6",
                        "outline-variant": "#c5c8b8",
                        "tertiary-container": "#636462",
                        "on-secondary-container": "#795930",
                        "tertiary-fixed": "#e3e2e0",
                        "outline": "#75796b",
                        "on-error": "#ffffff",
                        "primary-container": "#556b2f",
                        "on-tertiary": "#ffffff",
                        "on-primary-container": "#d0eba1",
                        "on-surface-variant": "#45483c",
                        "on-tertiary-container": "#e2e1de",
                        "on-secondary-fixed": "#2a1700",
                        "on-secondary": "#ffffff",
                        "error": "#ba1a1a",
                        "surface-container-lowest": "#ffffff",
                        "on-primary-fixed": "#131f00",
                        "on-primary": "#ffffff",
                        "primary-fixed-dim": "#b6d088",
                        "tertiary": "#4b4c4a",
                        "surface-container-low": "#f6f3f2",
                        "secondary-container": "#fed39f",
                        "on-secondary-fixed-variant": "#5e411a",
                        "background": "#fbf9f8",
                        "on-surface": "#1b1c1c",
                        "surface-container-highest": "#e4e2e1",
                        "on-tertiary-fixed-variant": "#464745"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "base": "8px",
                        "margin-mobile": "16px",
                        "sm": "12px",
                        "xs": "4px",
                        "xl": "80px",
                        "margin-desktop": "64px",
                        "md": "24px",
                        "lg": "48px",
                        "gutter": "24px"
                    },
                    "fontFamily": {
                        "headline-lg-mobile": ["Playfair Display"],
                        "body-md": ["Inter"],
                        "label-md": ["Inter"],
                        "headline-xl": ["Playfair Display"],
                        "body-lg": ["Inter"],
                        "label-sm": ["Inter"],
                        "headline-lg": ["Playfair Display"],
                        "headline-md": ["Playfair Display"]
                    },
                    "fontSize": {
                        "headline-lg-mobile": ["28px", { "lineHeight": "1.3", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
                        "label-md": ["14px", { "lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "600" }],
                        "headline-xl": ["48px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
                        "label-sm": ["12px", { "lineHeight": "1.2", "fontWeight": "500" }],
                        "headline-lg": ["36px", { "lineHeight": "1.25", "fontWeight": "600" }],
                        "headline-md": ["24px", { "lineHeight": "1.4", "fontWeight": "500" }]
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-background text-on-background font-body-md text-body-md flex min-h-screen selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden">
<!-- SideNavBar (Shared Component) -->
<nav class="bg-surface-container h-screen w-64 fixed left-0 top-0 shadow-sm flex flex-col py-md px-sm z-50 border-r border-surface-container-high hidden md:flex overflow-y-auto">
<!-- Header -->
<div class="mb-lg px-sm shrink-0">
<h1 class="font-headline-md text-headline-md font-bold text-primary mb-xs">Besek Artisanal</h1>
<p class="font-label-sm text-label-sm text-on-surface-variant">Admin Panel</p>
</div>
<!-- Navigation Links -->
<div class="flex-1 space-y-sm">
<a class="flex items-center gap-sm px-sm py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-colors font-body-md text-body-md" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
                Dashboard
            </a>
<a class="flex items-center gap-sm px-sm py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-colors font-body-md text-body-md" href="#">
<span class="material-symbols-outlined" data-icon="shopping_basket">shopping_basket</span>
                Produk
            </a>
<a class="flex items-center gap-sm px-sm py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-colors font-body-md text-body-md" href="#">
<span class="material-symbols-outlined" data-icon="mail">mail</span>
                Pesan Masuk
            </a>
<a class="flex items-center gap-sm px-sm py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-colors font-body-md text-body-md" href="#">
<span class="material-symbols-outlined" data-icon="auto_stories">auto_stories</span>
                Cerita Kami
            </a>
<!-- Active Tab: Pengaturan -->
<div class="flex flex-col">
<a class="flex items-center gap-sm px-sm py-sm rounded-lg text-primary font-bold bg-primary-container/10 font-body-md text-body-md transition-all duration-200" href="#">
<span class="material-symbols-outlined" data-icon="settings" style="font-variation-settings: 'FILL' 1;">settings</span>
                Pengaturan
            </a>
<div class="pl-12 pr-sm py-sm space-y-sm flex flex-col">
<a class="text-primary font-label-md text-label-md" href="#">Beranda</a>
<a class="text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors" href="#">Cerita Kami</a>
<a class="text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors" href="#">Kontak</a>
<a class="text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors" href="#">Produk</a>
</div>
</div>
</div>
<!-- User Profile Minimal -->
<div class="mt-auto pt-md border-t border-outline-variant flex items-center gap-sm px-sm shrink-0">
<div class="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-label-md">A</div>
<span class="font-label-sm text-label-sm text-on-surface">Admin Profile</span>
</div>
</nav>
<!-- Main Content Wrapper -->
<div class="flex-1 flex flex-col md:ml-64 min-h-screen">
<!-- TopNavBar (Shared Component) -->
<header class="bg-surface border-b border-outline-variant sticky top-0 z-40">
<div class="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-base h-16">
<!-- Mobile Menu Button (Hidden on Desktop) -->
<button class="md:hidden text-on-surface-variant p-2">
<span class="material-symbols-outlined">menu</span>
</button>
<div class="flex items-center gap-4 ml-auto">
<button class="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-highest">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button class="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-highest">
<span class="material-symbols-outlined" data-icon="account_circle">account_circle</span>
</button>
</div>
</div>
</header>
<!-- Canvas Area -->
<main class="flex-1 p-margin-mobile md:p-margin-desktop bg-surface-bright overflow-y-auto">
<div class="max-w-[1024px] mx-auto space-y-lg">
<!-- Page Title -->
<div>
<h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-xs">Pengaturan Beranda</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Kelola konten dan tampilan halaman utama Besek Artisanal.</p>
</div>
<!-- Form Section -->
<form class="space-y-xl">
<!-- 1. Hero Section Management -->
<section class="bg-surface rounded-xl p-md md:p-lg border border-surface-container-high" style="box-shadow: 0 4px 24px rgba(85, 107, 47, 0.03);">
<div class="mb-md border-b border-surface-container-highest pb-sm flex items-center gap-sm">
<span class="material-symbols-outlined text-primary">view_carousel</span>
<h3 class="font-headline-md text-headline-md text-on-background">Hero Section</h3>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
<div class="space-y-md">
<div>
<label class="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Headline Utama</label>
<input class="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none py-sm font-body-md text-body-md text-on-surface transition-colors" placeholder="Masukkan headline..." type="text" value="Tradisi dalam Anyaman Modern"/>
</div>
<div>
<label class="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Sub-headline</label>
<textarea class="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none py-sm font-body-md text-body-md text-on-surface transition-colors resize-none" placeholder="Tuliskan deskripsi singkat..." rows="3">Koleksi besek bambu premium yang dibuat dengan perlahan oleh tangan terampil, membawa kehangatan alam ke dalam ruang modern Anda.</textarea>
</div>
<div>
<label class="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Teks Tombol CTA</label>
<input class="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none py-sm font-body-md text-body-md text-on-surface transition-colors" type="text" value="Jelajahi Koleksi"/>
</div>
</div>
<!-- Hero Image Uploader -->
<div class="space-y-xs">
<label class="block font-label-sm text-label-sm text-on-surface-variant">Gambar Latar Hero</label>
<div class="h-64 border-2 border-dashed border-outline-variant rounded-lg bg-surface-container-lowest flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container-low transition-colors group relative overflow-hidden">
<img alt="Preview" class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-20 transition-opacity" data-alt="A close-up shot of an intricate woven bamboo basket bathed in warm, soft morning sunlight. The natural textures of the thin bamboo strips are highlighted against a minimalist, creamy white background. The image evokes a sense of calm, sustainable luxury, and slow-made craftsmanship, fitting perfectly within an Artisanal Earth design system." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmQQ_T2scVCYRPis7_M6LOY8jEWM1Um4xWeOWKdfyzduQbsUd7dFh9oCTWfyyGPgQobu9w-HVuUYWgFnki6nCv_6ugNxNEnVRFgAJOcUFtknE8gQGL-S5wmZpmFG8YcB6jV1vYDfAOSK_HT3TKcE45aqqAJ3dLoH95OQHvlbfaUASsAqrSNN7L-irekyW78ftsWvLBEJFFlqVEkVKuGHBxPo5Ur0N5q8Bk0KbXamrTkb7mC2ddjsq_OaMjCvw69CSIlQkK4gCIuJ0"/>
<div class="relative z-10 flex flex-col items-center text-on-surface-variant group-hover:text-primary transition-colors">
<span class="material-symbols-outlined text-4xl mb-sm">cloud_upload</span>
<span class="font-label-md text-label-md">Klik untuk mengganti gambar</span>
<span class="font-label-sm text-label-sm mt-xs opacity-70">PNG, JPG (Max. 5MB)</span>
</div>
</div>
</div>
</div>
</section>
<!-- 2. Value Proposition Management -->
<section class="bg-surface rounded-xl p-md md:p-lg border border-surface-container-high" style="box-shadow: 0 4px 24px rgba(85, 107, 47, 0.03);">
<div class="mb-md border-b border-surface-container-highest pb-sm flex items-center gap-sm">
<span class="material-symbols-outlined text-primary">diamond</span>
<h3 class="font-headline-md text-headline-md text-on-background">Nilai Jual Utama</h3>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-md">
<!-- Value 1 -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-lg p-sm space-y-sm hover:border-outline transition-colors">
<div class="flex items-center justify-between">
<div class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span class="material-symbols-outlined" data-icon="eco">eco</span>
</div>
<button class="text-outline hover:text-primary" type="button"><span class="material-symbols-outlined text-sm">edit</span></button>
</div>
<div>
<label class="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Judul Nilai 1</label>
<input class="w-full bg-transparent border-b border-surface-container-high focus:border-primary focus:outline-none py-xs font-label-md text-label-md text-on-surface" type="text" value="100% Organik"/>
</div>
<div>
<label class="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Deskripsi Singkat</label>
<textarea class="w-full bg-transparent border-b border-surface-container-high focus:border-primary focus:outline-none py-xs font-body-md text-body-md text-on-surface resize-none text-sm" rows="2">Bambu pilihan dari hutan lestari tanpa perlakuan kimia.</textarea>
</div>
</div>
<!-- Value 2 -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-lg p-sm space-y-sm hover:border-outline transition-colors">
<div class="flex items-center justify-between">
<div class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span class="material-symbols-outlined" data-icon="hardware">hardware</span>
</div>
<button class="text-outline hover:text-primary" type="button"><span class="material-symbols-outlined text-sm">edit</span></button>
</div>
<div>
<label class="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Judul Nilai 2</label>
<input class="w-full bg-transparent border-b border-surface-container-high focus:border-primary focus:outline-none py-xs font-label-md text-label-md text-on-surface" type="text" value="Anyaman Kokoh"/>
</div>
<div>
<label class="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Deskripsi Singkat</label>
<textarea class="w-full bg-transparent border-b border-surface-container-high focus:border-primary focus:outline-none py-xs font-body-md text-body-md text-on-surface resize-none text-sm" rows="2">Teknik anyaman ganda memastikan daya tahan bertahun-tahun.</textarea>
</div>
</div>
<!-- Value 3 -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-lg p-sm space-y-sm hover:border-outline transition-colors">
<div class="flex items-center justify-between">
<div class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span class="material-symbols-outlined" data-icon="group">group</span>
</div>
<button class="text-outline hover:text-primary" type="button"><span class="material-symbols-outlined text-sm">edit</span></button>
</div>
<div>
<label class="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Judul Nilai 3</label>
<input class="w-full bg-transparent border-b border-surface-container-high focus:border-primary focus:outline-none py-xs font-label-md text-label-md text-on-surface" type="text" value="Pemberdayaan Perajin Lokal"/>
</div>
<div>
<label class="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Deskripsi Singkat</label>
<textarea class="w-full bg-transparent border-b border-surface-container-high focus:border-primary focus:outline-none py-xs font-body-md text-body-md text-on-surface resize-none text-sm" rows="2">Mendukung ekonomi desa pengrajin bambu tradisional.</textarea>
</div>
</div>
</div>
</section>
<!-- 3. Featured Collection -->
<section class="bg-surface rounded-xl p-md md:p-lg border border-surface-container-high" style="box-shadow: 0 4px 24px rgba(85, 107, 47, 0.03);">
<div class="mb-md border-b border-surface-container-highest pb-sm flex justify-between items-center">
<div class="flex items-center gap-sm">
<span class="material-symbols-outlined text-primary">featured_play_list</span>
<h3 class="font-headline-md text-headline-md text-on-background">Koleksi Unggulan</h3>
</div>
<button class="text-primary font-label-sm text-label-sm hover:underline" type="button">Pilih Produk</button>
</div>
<p class="font-body-md text-body-md text-on-surface-variant mb-md text-sm">Pilih hingga 4 produk untuk ditampilkan di halaman utama.</p>
<div class="space-y-sm">
<!-- Product Row 1 -->
<label class="flex items-center gap-md p-sm rounded-lg border border-surface-container-high hover:bg-surface-container-low transition-colors cursor-pointer">
<input checked="" class="form-checkbox h-5 w-5 text-primary rounded border-outline-variant focus:ring-primary focus:ring-offset-surface-container-lowest" type="checkbox"/>
<img alt="Besek Kotak" class="w-16 h-16 object-cover rounded" data-alt="A small, perfectly square woven bamboo box sitting on a polished wooden surface. The lighting is bright and even, highlighting the geometric pattern of the weave. The overall aesthetic is clean, minimalist, and focuses on the organic material." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz7CeCeFgmvWIseGkr1OP87Jese4AaCNwXBlljh8WnrdqCYlA-ixX_KNyFzdBYVNzxF0IwS5Dp4nMpFzdyv3w8LoMk_x-SLZJrwtacHr-LWeSxjWMXeF56rN2n0rJHEVFv8JrbFAW-cczJH0_DmLgrmCQe0S0JkwysLX_K0811dfhGqPQhE_BnjBLvgR2r0Wptb_KjV_IluNAftTzrWEoAHkYLmIiAn1TUYj0LWSz-BxnKIMiRpNuMl1UzfDdPxqiic9HMOwsfMJE"/>
<div class="flex-1">
<h4 class="font-label-md text-label-md text-on-surface">Besek Hantaran Klasik</h4>
<p class="font-body-md text-body-md text-on-surface-variant text-sm">Stok: 45</p>
</div>
<span class="px-xs py-1 bg-primary-container/20 text-primary-container font-label-sm text-label-sm rounded text-xs">Ditampilkan</span>
</label>
<!-- Product Row 2 -->
<label class="flex items-center gap-md p-sm rounded-lg border border-surface-container-high hover:bg-surface-container-low transition-colors cursor-pointer">
<input checked="" class="form-checkbox h-5 w-5 text-primary rounded border-outline-variant focus:ring-primary focus:ring-offset-surface-container-lowest" type="checkbox"/>
<img alt="Rantang Bambu" class="w-16 h-16 object-cover rounded" data-alt="A tiered woven bamboo food container (rantang) styled against a soft cream backdrop. The warm tones of the bamboo stand out against the minimalist setting. The mood is traditional yet elevated to a premium lifestyle standard." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq_jHz4lW2pa4mndgigLaCW5guWmthjyCJgWgvvWJ7-PqecVzRpAIBJgWyJkKc4zICfoOxIK8KPVIRsJEf-ATJqkkGU_ySyGdB0dMkRwmD3fGL4qBPYY6ucXn-0Js2ZJZ5850fR7XL_VnR0IDViIDvsflFhe9R6g6PMZj6mYQV2NcSxA7e5Rs6xQJArQb1m6FbYmqdiSOE8ET9kXNls05eT0f-gRq6bt4GT3JPINZuKnKemJUz0ggZsrdHhyhuNdWMwocd2M48kkk"/>
<div class="flex-1">
<h4 class="font-label-md text-label-md text-on-surface">Rantang Bambu Tiga Susun</h4>
<p class="font-body-md text-body-md text-on-surface-variant text-sm">Stok: 12</p>
</div>
<span class="px-xs py-1 bg-primary-container/20 text-primary-container font-label-sm text-label-sm rounded text-xs">Ditampilkan</span>
</label>
<!-- Product Row 3 -->
<label class="flex items-center gap-md p-sm rounded-lg border border-surface-container-high hover:bg-surface-container-low transition-colors cursor-pointer">
<input class="form-checkbox h-5 w-5 text-primary rounded border-outline-variant focus:ring-primary focus:ring-offset-surface-container-lowest" type="checkbox"/>
<div class="w-16 h-16 bg-surface-container-highest rounded flex items-center justify-center text-outline">
<span class="material-symbols-outlined">image</span>
</div>
<div class="flex-1">
<h4 class="font-label-md text-label-md text-on-surface">Kotak Teh Premium</h4>
<p class="font-body-md text-body-md text-on-surface-variant text-sm">Stok: 8</p>
</div>
</label>
</div>
</section>
<!-- 4. Pengaturan Cerita Kami -->
<section class="bg-surface rounded-xl p-md md:p-lg border border-surface-container-high" style="box-shadow: 0 4px 24px rgba(85, 107, 47, 0.03);">
<div class="mb-md border-b border-surface-container-highest pb-sm flex items-center gap-sm">
<span class="material-symbols-outlined text-primary">auto_stories</span>
<h3 class="font-headline-md text-headline-md text-on-background">Pengaturan Cerita Kami</h3>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
<div class="space-y-md">
<div>
<label class="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Headline Cerita</label>
<input class="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none py-sm font-body-md text-body-md text-on-surface transition-colors" type="text" value="Kisah di Balik Setiap Anyaman"/>
</div>
<div>
<label class="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Konten Utama</label>
<textarea class="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none py-sm font-body-md text-body-md text-on-surface transition-colors resize-none" rows="4">Mendukung karya tangan pengrajin lokal melalui setiap desain bambu kami.</textarea>
</div>
</div>
<div class="space-y-xs">
<label class="block font-label-sm text-label-sm text-on-surface-variant">Gambar Cerita Kami</label>
<div class="h-64 border-2 border-dashed border-outline-variant rounded-lg bg-surface-container-lowest flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container-low transition-colors group relative overflow-hidden">
<div class="relative z-10 flex flex-col items-center text-on-surface-variant group-hover:text-primary transition-colors">
<span class="material-symbols-outlined text-4xl mb-sm">cloud_upload</span>
<span class="font-label-md text-label-md">Klik untuk mengunggah gambar</span>
<span class="font-label-sm text-label-sm mt-xs opacity-70">PNG, JPG (Max. 5MB)</span>
</div>
</div>
</div>
</div>
</section>
<!-- 5. Pengaturan Kontak -->
<section class="bg-surface rounded-xl p-md md:p-lg border border-surface-container-high" style="box-shadow: 0 4px 24px rgba(85, 107, 47, 0.03);">
<div class="mb-md border-b border-surface-container-highest pb-sm flex items-center gap-sm">
<span class="material-symbols-outlined text-primary">contacts</span>
<h3 class="font-headline-md text-headline-md text-on-background">Pengaturan Kontak</h3>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
<div class="space-y-md">
<div>
<label class="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Email</label>
<input class="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none py-sm font-body-md text-body-md text-on-surface transition-colors" type="email" value="halo@besekartisanal.com"/>
</div>
<div>
<label class="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Telepon</label>
<input class="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none py-sm font-body-md text-body-md text-on-surface transition-colors" type="text" value="+62 812 3456 7890"/>
</div>
</div>
<div class="space-y-md">
<div>
<label class="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Alamat Lengkap</label>
<textarea class="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none py-sm font-body-md text-body-md text-on-surface transition-colors resize-none" rows="4">Jl. Anyaman Bambu No. 1, Desa Kerajinan, Jawa Barat 40111</textarea>
</div>
</div>
</div>
</section>
<!-- Save/Cancel Actions -->
<div class="flex justify-end gap-md pt-lg border-t border-outline-variant">
<button class="font-label-md text-label-md text-secondary border border-secondary px-lg py-sm rounded-full hover:bg-secondary/5 transition-colors" type="button">
                            Batal
                        </button>
<button class="font-label-md text-label-md bg-primary text-on-primary px-lg py-sm rounded-full shadow-sm hover:bg-surface-tint transition-colors flex items-center gap-xs" type="submit">
<span class="material-symbols-outlined text-sm">save</span>
                            Simpan Perubahan
                        </button>
</div>
</form>
</div>
</main>
</div>
</body></html>