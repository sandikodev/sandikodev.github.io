---
title: "Membangun Portfolio Website dengan Astro dan Tailwind CSS"
description: "Panduan lengkap membuat portfolio website modern dengan Astro framework dan Tailwind CSS untuk developer"
date: 2024-01-15T05:00:00Z
image: "/images/posts/astro-portfolio.jpg"
categories: ["web-development"]
authors: ["Sandikodev"]
tags: ["astro", "tailwind", "portfolio", "web-development"]
draft: false
---

Portfolio website adalah salah satu cara terbaik untuk memamerkan karya dan keahlian sebagai developer. Dalam artikel ini, saya akan membagikan pengalaman membangun portfolio website menggunakan Astro dan Tailwind CSS.

## Mengapa Astro?

Astro adalah framework modern yang menawarkan beberapa keunggulan:

- **Performance yang luar biasa** - Hanya mengirim JavaScript yang diperlukan
- **Multi-framework support** - Bisa menggunakan React, Vue, Svelte dalam satu proyek
- **SEO-friendly** - Server-side rendering by default
- **Developer experience yang baik** - Hot reload dan TypeScript support

## Struktur Proyek

```bash
src/
├── components/     # Komponen reusable
├── layouts/       # Layout templates
├── pages/         # Halaman website
├── content/       # Konten blog dan portfolio
├── styles/        # Global styles
└── config/        # Konfigurasi
```

## Konfigurasi Tailwind CSS

Tailwind CSS memberikan utility classes yang powerful untuk styling:

```css
/* tailwind.config.js */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#1E40AF'
      }
    }
  }
}
```

## Optimasi SEO

Astro memiliki built-in SEO features yang sangat membantu:

```astro
---
export const metadata = {
  title: "Sandikodev Portfolio",
  description: "Full Stack Developer Portfolio",
  canonical: "https://sandikodev.github.io"
}
---

<html lang="id">
  <head>
    <title>{metadata.title}</title>
    <meta name="description" content={metadata.description} />
    <link rel="canonical" href={metadata.canonical} />
  </head>
</html>
```

## Kesimpulan

Membangun portfolio dengan Astro dan Tailwind CSS memberikan kombinasi yang powerful untuk developer yang ingin memiliki website yang cepat, SEO-friendly, dan mudah dikustomisasi. Framework ini sangat cocok untuk static sites dan blog.

Apakah Anda tertarik untuk mencoba Astro? Mari diskusikan di komentar!
