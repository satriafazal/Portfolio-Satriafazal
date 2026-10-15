# Portfolio Web — Satria Faza Lutfian

Website portofolio personal (Creative Technologist) dengan hero interaktif
(blob cursor reveal + wave lines) dan galeri proyek horizontal yang ter-pin
saat scroll. Konten bilingual Indonesia/English.

**Stack:** React 18 + Vite + GSAP (ScrollTrigger) · Tanpa backend · Siap deploy gratis.

## Menjalankan

```bash
npm install       # sekali saja
npm run dev       # http://localhost:5173
npm run build     # hasil ke folder dist/
npm run preview   # cek hasil build di http://localhost:4173
```

## Struktur

```
PORTFOLIO WEB/
├── index.html               # font Google (Playfair Display + Inter), meta
├── src/
│   ├── main.jsx
│   ├── App.jsx              # layout, nav, toggle bahasa ID/EN
│   ├── styles.css           # semua styling (design tokens di :root)
│   ├── data/content.js      # ← SEMUA KONTEN WEBSITE ADA DI SINI
│   └── components/
│       ├── Hero.jsx         # hero: nama, Portfolio, sosial, scroll hint
│       ├── BlobCursor.jsx   # blob gooey + reveal mask + invert teks + parallax
│       ├── WaveLines.jsx    # garis wave background responsif mouse
│       ├ About.jsx          # tentang + strengths
│       ├── HowIWork.jsx     # Discover → Design → Build → Refine
│       ├── Skills.jsx       # 4 kelompok keahlian + teknologi
│       ├── ProjectsGallery.jsx  # galeri PIN horizontal + heading dinamis
│       ├── Experience.jsx   # timeline pengalaman
│       ├── Education.jsx    # pendidikan + sertifikasi
│       └── Contact.jsx      # kontak
└── dist/                    # hasil build (folder yang di-deploy)
```

## Cara Update Konten

1. **Teks & proyek** → edit `src/data/content.js`. Setiap teks punya versi
   `id` dan `en`; tambah proyek = tambah objek di array `projects`.
2. **Warna & tipografi** → edit CSS custom properties di `:root` dalam
   `src/styles.css` (`--paper`, `--ink`, `--accent`, `--serif`, ...).
3. **Ganti gambar placeholder**:
   - Foto hero: `heroImages.primary` / `heroImages.alternate` di
     `content.js` — taruh file asli di folder `public/` lalu arahkan ke
     `/images/nama-file.jpg`.
   - Gambar proyek: field `img` di setiap objek `projects`.
   - Saat ini memakai URL Unsplash (placeholder internet) dengan fallback
     SVG otomatis jika gagal dimuat.
4. **Link sosial & kontak** → `socials` dan `contact` di `content.js`
   (saat ini masih placeholder `#`).

## Deploy Gratis

Build dulu: `npm run build` → folder `dist/` siap di-upload.

| Platform | Cara |
|---|---|
| **Vercel** | `npm i -g vercel` → `vercel` di folder ini, atau hubungkan repo GitHub di vercel.com (auto-deploy tiap push) |
| **Netlify** | Drag & drop folder `dist/` ke app.netlify.com/drop, atau `netlify deploy --prod --dir=dist` |
| **GitHub Pages** | Push repo ke GitHub, `npm run build`, deploy folder `dist/` via Actions atau branch `gh-pages` |

Karena `base: "./"` di `vite.config.js`, situs juga bisa dibuka langsung dari
subpath apa pun.

## Yang Sudah Diuji (dev server + browser nyata)

- Hero: nama 2 baris, link Portfolio, 4 ikon sosial (SVG solid), blob
  mengikuti cursor dengan lag, trail blob saat gerak cepat, teks invert
  putih (300ms) saat blob menyentuh, parallax berlawanan arah cursor.
- Wave lines beranimasi dan bereaksi gerakan mouse.
- Galeri proyek: section ter-pin (position: fixed), track geser horizontal,
  heading kiri update per proyek (01→04) + dot indikator, pin lepas dengan
  benar setelah zona selesai.
- Toggle bahasa ID/EN untuk seluruh section.
- Layout mobile (<900px): galeri jadi grid, tanpa pin; nav menyederhana.
- `npm run build` sukses (48 modul), tanpa error JS.

## Catatan Teknis

- Blob reveal memakai SVG `<mask>`: gambar utama di atas (lubang blob),
  gambar alternatif di bawah — efek "goo" via `feGaussianBlur` +
  `feColorMatrix`.
- GSAP diinisialisasi dengan jeda 300ms + menunggu `document.fonts.ready`
  agar lebar kartu akurat; guard berbasis `useRef` mencegah ScrollTrigger
  ganda saat React StrictMode memanggil effect dua kali.
- Jangan tambahkan `overflow-x: hidden` di `body` — membuat GSAP tidak bisa
  pin dengan `position: fixed` (hero & track-viewport sudah clip sendiri).
