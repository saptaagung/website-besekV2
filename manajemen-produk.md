<!DOCTYPE html>

<html lang="id"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Manajemen Produk - Besek Artisanal</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Playfair+Display:wght@500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
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
</head>
<body class="bg-surface text-on-surface font-body-md text-body-md antialiased min-h-screen flex flex-col">
<!-- TopNavBar (Shared Component) -->
<nav class="hidden md:flex flex-col docked full-width top-0 bg-surface shadow-sm transition-all duration-300 ease-in-out z-40">
<div class="flex justify-between items-center w-full px-margin-desktop py-4 max-w-[1280px] mx-auto">
<div class="font-headline-md text-headline-md font-bold text-primary tracking-tight">
                Besek Artisanal
            </div>
<div class="flex items-center gap-gutter">
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Beranda</a>
<a class="font-label-md text-label-md text-primary border-b-2 border-primary pb-1" href="#">Produk</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Cerita Kami</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Kontak</a>
</div>
<div class="flex items-center gap-sm text-primary">
<button aria-label="shopping_bag" class="hover:opacity-80 transition-opacity p-2">
<span class="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
</button>
<button aria-label="search" class="hover:opacity-80 transition-opacity p-2">
<span class="material-symbols-outlined" data-icon="search">search</span>
</button>
</div>
</div>
</nav>
<!-- Main Content -->
<main class="flex-grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl">
<!-- Page Header -->
<header class="flex flex-col md:flex-row md:items-end justify-between gap-md mb-xl">
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant mb-base uppercase tracking-wider">Admin Dashboard</p>
<h1 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Manajemen Produk</h1>
</div>
<button class="flex items-center justify-center gap-xs bg-primary text-on-primary font-label-md text-label-md px-md py-sm rounded-lg hover:opacity-90 transition-opacity shadow-sm">
<span class="material-symbols-outlined" data-icon="add" style="font-size: 20px;">add</span>
                Tambah Produk Baru
            </button>
</header>
<!-- Product List -->
<section class="flex flex-col gap-sm">
<!-- List Header (Desktop only) -->
<div class="hidden md:grid grid-cols-12 gap-gutter px-md py-sm border-b border-surface-variant text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<div class="col-span-6">Detail Produk</div>
<div class="col-span-3">Status</div>
<div class="col-span-3 text-right">Aksi</div>
</div>
<!-- Product Item 1 -->
<div class="group grid grid-cols-1 md:grid-cols-12 gap-md md:gap-gutter items-center bg-surface-container-lowest p-md rounded-xl shadow-[0_2px_10px_rgba(85,107,47,0.03)] hover:shadow-[0_4px_16px_rgba(85,107,47,0.06)] transition-shadow border border-transparent hover:border-surface-variant">
<div class="col-span-1 md:col-span-6 flex items-center gap-md">
<div class="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-surface-container rounded-lg overflow-hidden relative">
<img alt="Besek Natural" class="w-full h-full object-cover" data-alt="A close-up, high-quality photograph of a finely woven natural bamboo basket (besek) sitting on a clean, light-colored wooden table. The lighting is soft and natural, casting delicate, warm ambient shadows that highlight the intricate, tactile texture of the organic material. The overall aesthetic is minimalist, grounded, and premium, evoking a sense of sustainable craftsmanship in a bright, modern setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJsZXZ22YMyFvyGLFHbdH5vkd6p60Zb3Mmzdvyc3GGeJj1rL08dQTo1lrYtzZkP6AL1lrv_wyUjSVRJW1FQuRL_eATlJ7_b-59tD_5a-TwPzOYpV8gHOVl2dVYfNfK8F7OnVQDELPo8jVgH_Ecu70-HuDuBs_dWIAIbzTE2jweGHbD9w-vTWndLSrI_pnbA4S6OvOedFiGqSJK8v9umj2Y4LPZZhbJStyPzniX4PGuCRVMCFLjQBu1bfiLX0olfqFKkOFcAkGFYc4"/>
</div>
<div>
<h3 class="font-headline-md text-headline-md text-primary mb-xs">Besek Natural Klasik</h3>
<p class="font-body-md text-body-md text-on-surface-variant text-sm">SKU: BSK-NAT-001</p>
<p class="font-label-sm text-label-sm text-secondary mt-base hidden md:block">Bambu Murni • Buatan Tangan</p>
</div>
</div>
<div class="col-span-1 md:col-span-3 flex items-center md:justify-start">
<span class="inline-flex items-center gap-xs px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">
<span class="w-2 h-2 rounded-full bg-primary"></span>
                        Aktif
                    </span>
</div>
<div class="col-span-1 md:col-span-3 flex items-center justify-start md:justify-end gap-sm border-t border-surface-variant md:border-t-0 pt-sm md:pt-0">
<button class="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm p-2 rounded-lg hover:bg-surface-container">
<span class="material-symbols-outlined" data-icon="edit" style="font-size: 20px;">edit</span>
<span class="md:hidden">Edit</span>
</button>
<button class="flex items-center gap-xs text-on-surface-variant hover:text-error transition-colors font-label-sm text-label-sm p-2 rounded-lg hover:bg-error-container hover:text-on-error-container">
<span class="material-symbols-outlined" data-icon="delete" style="font-size: 20px;">delete</span>
<span class="md:hidden">Hapus</span>
</button>
</div>
</div>
<!-- Product Item 2 -->
<div class="group grid grid-cols-1 md:grid-cols-12 gap-md md:gap-gutter items-center bg-surface-container-lowest p-md rounded-xl shadow-[0_2px_10px_rgba(85,107,47,0.03)] hover:shadow-[0_4px_16px_rgba(85,107,47,0.06)] transition-shadow border border-transparent hover:border-surface-variant">
<div class="col-span-1 md:col-span-6 flex items-center gap-md">
<div class="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-surface-container rounded-lg overflow-hidden relative">
<img alt="Besek Warna Merah Bata" class="w-full h-full object-cover" data-alt="A beautifully crafted woven bamboo basket featuring natural dyes in a deep, earthy brick-red tone, displayed against a pristine, soft white background. The studio lighting is diffused, producing subtle, warm shadows that emphasize the skeuomorphic depth of the weave. The composition is clean, centered, and minimal, reflecting a high-end, eco-conscious artisanal brand identity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB57sIfAq1CMOlN4XR-lZbnIkU3ooamJHsPDyrprQ9mKP7KfeGAOY9CfC2Ik_4STnhsWQxU5y5GTaB4tWOTVWx5-anzRHGJJxq1plpIINUk5sld8iUmnRbUSsrCp-L45wAdvE7n5avGGtUhnV5otbEWBjRerJFphGls-mcpuDta9k2VPxoYwW7NNO9EZ_qkk_UeJ67aXTWSs5aa3IyC4xPVQuFEDliGJCKErYTaDhUHtT4PEwXFLGvFfytaKDAKu3K1nvdYrV7wqpU"/>
</div>
<div>
<h3 class="font-headline-md text-headline-md text-primary mb-xs">Besek Warna - Merah Bata</h3>
<p class="font-body-md text-body-md text-on-surface-variant text-sm">SKU: BSK-WRN-002</p>
<p class="font-label-sm text-label-sm text-secondary mt-base hidden md:block">Pewarna Alami • Edisi Terbatas</p>
</div>
</div>
<div class="col-span-1 md:col-span-3 flex items-center md:justify-start">
<span class="inline-flex items-center gap-xs px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">
<span class="w-2 h-2 rounded-full bg-primary"></span>
                        Aktif
                    </span>
</div>
<div class="col-span-1 md:col-span-3 flex items-center justify-start md:justify-end gap-sm border-t border-surface-variant md:border-t-0 pt-sm md:pt-0">
<button class="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm p-2 rounded-lg hover:bg-surface-container">
<span class="material-symbols-outlined" data-icon="edit" style="font-size: 20px;">edit</span>
<span class="md:hidden">Edit</span>
</button>
<button class="flex items-center gap-xs text-on-surface-variant hover:text-error transition-colors font-label-sm text-label-sm p-2 rounded-lg hover:bg-error-container hover:text-on-error-container">
<span class="material-symbols-outlined" data-icon="delete" style="font-size: 20px;">delete</span>
<span class="md:hidden">Hapus</span>
</button>
</div>
</div>
<!-- Product Item 3 -->
<div class="group grid grid-cols-1 md:grid-cols-12 gap-md md:gap-gutter items-center bg-surface-container-lowest p-md rounded-xl shadow-[0_2px_10px_rgba(85,107,47,0.03)] hover:shadow-[0_4px_16px_rgba(85,107,47,0.06)] transition-shadow border border-transparent hover:border-surface-variant opacity-80">
<div class="col-span-1 md:col-span-6 flex items-center gap-md">
<div class="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-surface-container rounded-lg overflow-hidden relative flex justify-center items-center">
<span class="material-symbols-outlined text-outline" data-icon="inventory_2" style="font-size: 32px;">inventory_2</span>
</div>
<div>
<h3 class="font-headline-md text-headline-md text-on-surface mb-xs">Rantang Bambu Susun Tiga</h3>
<p class="font-body-md text-body-md text-on-surface-variant text-sm">SKU: BSK-RNT-003</p>
<p class="font-label-sm text-label-sm text-outline mt-base hidden md:block">Menunggu Foto Produk</p>
</div>
</div>
<div class="col-span-1 md:col-span-3 flex items-center md:justify-start">
<span class="inline-flex items-center gap-xs px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-label-sm">
<span class="w-2 h-2 rounded-full bg-outline"></span>
                        Draft
                    </span>
</div>
<div class="col-span-1 md:col-span-3 flex items-center justify-start md:justify-end gap-sm border-t border-surface-variant md:border-t-0 pt-sm md:pt-0">
<button class="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm p-2 rounded-lg hover:bg-surface-container">
<span class="material-symbols-outlined" data-icon="edit" style="font-size: 20px;">edit</span>
<span class="md:hidden">Edit</span>
</button>
<button class="flex items-center gap-xs text-on-surface-variant hover:text-error transition-colors font-label-sm text-label-sm p-2 rounded-lg hover:bg-error-container hover:text-on-error-container">
<span class="material-symbols-outlined" data-icon="delete" style="font-size: 20px;">delete</span>
<span class="md:hidden">Hapus</span>
</button>
</div>
</div>
</section>
</main>
<!-- Footer (Shared Component) -->
<footer class="bg-surface-container full-width">
<div class="w-full px-margin-mobile md:px-margin-desktop py-lg flex flex-col md:flex-row justify-between items-center gap-gutter bg-surface-container-high">
<div class="font-headline-sm text-headline-sm text-primary">
                Besek Artisanal
            </div>
<div class="flex flex-wrap justify-center gap-md">
<a class="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors opacity-90 hover:opacity-100" href="#">Kebijakan Privasi</a>
<a class="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors opacity-90 hover:opacity-100" href="#">Syarat &amp; Ketentuan</a>
<a class="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors opacity-90 hover:opacity-100" href="#">FAQ</a>
</div>
<div class="font-body-md text-body-md text-on-surface-variant text-center md:text-right text-sm">
                © 2024 Besek Artisanal. Sustainable Indonesian Craftsmanship.
            </div>
</div>
</footer>
<!-- BottomNavBar (Shared Component for Mobile) -->
<nav class="md:hidden docked full-width bottom-0 bg-surface shadow-lg border-t border-outline-variant fixed left-0 w-full z-50 flex justify-around items-center px-2 pb-safe py-2">
<a class="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-low transition-transform active:scale-95 p-2 rounded-lg" href="#">
<span class="material-symbols-outlined mb-1" data-icon="home">home</span>
<span class="font-label-sm text-label-sm">Beranda</span>
</a>
<a class="flex flex-col items-center justify-center text-primary active:bg-surface-container-low transition-transform active:scale-95 p-2 rounded-lg" href="#">
<span class="material-symbols-outlined mb-1" data-icon="grid_view" data-weight="fill" style="font-variation-settings: 'FILL' 1;">grid_view</span>
<span class="font-label-sm text-label-sm">Produk</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-low transition-transform active:scale-95 p-2 rounded-lg" href="#">
<span class="material-symbols-outlined mb-1" data-icon="auto_stories">auto_stories</span>
<span class="font-label-sm text-label-sm">Kisah</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-low transition-transform active:scale-95 p-2 rounded-lg" href="#">
<span class="material-symbols-outlined mb-1" data-icon="chat">chat</span>
<span class="font-label-sm text-label-sm">Kontak</span>
</a>
</nav>
<!-- Spacer for mobile nav -->
<div class="h-20 md:hidden w-full"></div>
</body></html>