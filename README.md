# Portfolio Mei Maulidta

Portofolio pribadi Mei Maulidta Tri Ambarwati. Dibangun ulang dengan React, TypeScript, dan Vite.

## Stack

- React 19 + TypeScript
- Vite 6
- CSS murni (`src/styles.css`)
- Animasi native: IntersectionObserver + Web Animations API

## Menjalankan

```bash
npm install
npm run dev
```

Build produksi:

```bash
npm run build
npm run preview
```

## Struktur

```
public/assets/          gambar & favicon
src/
  components/
    sections/           Hero, About, Experience, Tools, Work,
                        Certificates, Services, Testimonials, Contact, Footer
    ui/                 komponen kecil yang dipakai ulang
    Header.tsx
    MobileMenu.tsx
    Preloader.tsx
    Cursor.tsx
    ScrollProgress.tsx
    ImagePreview.tsx
  data/content.ts       seluruh konten (nav, proyek, tools, layanan, testimoni)
  hooks/                logika reusable (theme, clock, scroll, cursor, reveal, dll)
  types.ts
  App.tsx
  main.tsx
```

## Hooks

| Hook | Fungsi |
| --- | --- |
| `useTheme` | mode gelap/terang + localStorage |
| `useClock` | jam Surabaya (Asia/Jakarta) |
| `usePreloader` | progress preloader + kelas body |
| `useHeaderScroll` | status header & progress scroll |
| `useActiveNav` | menu aktif berdasarkan posisi scroll |
| `useMobileMenu` | state menu, focus trap, Escape |
| `useImagePreview` | state dialog preview gambar |
| `useReveal` | animasi masuk elemen `data-reveal` |
| `useSectionMotion` | kelas `is-in-view` per section |
| `useScrollEffects` | parallax & burst background |
| `useMagnetic` | efek magnetik tombol |
| `useTilt` | tilt kartu proyek |
| `useCursor` | kursor kustom |
| `useHeroGlow` | glow hero mengikuti pointer |
| `useCounter` | angka statistik berjalan |

## Deploy

Deploy ke branch `gh-pages`:

```bash
npm run deploy
```

`predeploy` otomatis menjalankan build, lalu `gh-pages` mempublikasikan isi `dist/` ke branch `gh-pages`.

Aktifkan di GitHub: **Settings → Pages → Source: Deploy from a branch → `gh-pages` / root**.

> Catatan: untuk repo `<user>.github.io`, GitHub terkadang mewajibkan source dari default branch. Jika opsi `gh-pages` tidak muncul, gunakan repo project (mis. `portfolio`) agar branch `gh-pages` bisa dipakai.

## Catatan

`base` Vite diatur ke `./` agar aset tetap bekerja di GitHub Pages.
