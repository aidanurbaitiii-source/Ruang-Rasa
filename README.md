# Ruang Rasa (RUSA)

Situs statis berbahasa Indonesia berisi ide aktivitas Montessori sederhana untuk dicoba bersama anak di rumah. Dibuat dengan React dan Vite, dengan ilustrasi rusa SVG buatan sendiri.

## Menjalankan di komputer

1. Pasang [Node.js versi LTS](https://nodejs.org/) jika belum tersedia.
2. Buka folder project ini di Terminal atau PowerShell.
3. Pasang dependensi:

   ```bash
   npm install
   ```

4. Jalankan server pengembangan:

   ```bash
   npm run dev
   ```

5. Buka alamat yang ditampilkan Vite, biasanya [http://localhost:5173](http://localhost:5173).
6. Tekan `Ctrl+C` di terminal untuk menghentikan server.

## Membuat versi siap tayang

```bash
npm run build
```

Vite menaruh hasil situs statis di folder `dist/`. Untuk melihat build itu secara lokal, jalankan `npm run preview` dan buka alamat yang ditampilkan.

## Deploy ke GitHub Pages

Konfigurasi Vite sudah menggunakan `/Ruang-Rasa/`, sesuai nama repository GitHub `aidanurbaitiii-source/Ruang-Rasa`.

1. Pastikan perubahan sudah masuk ke branch `main` repository.
2. Di GitHub, buka repository **Settings → Pages**.
3. Pada **Build and deployment**, pilih **GitHub Actions**.
4. Workflow GitHub Actions sudah tersedia di `.github/workflows/deploy.yml` dan akan membangun situs setiap ada push ke `main`.
5. Commit dan push file situs ke branch `main`. Buka tab **Actions** dan tunggu workflow **Deploy to GitHub Pages** selesai.
6. Situs akan tersedia di `https://aidanurbaitiii-source.github.io/Ruang-Rasa/`.

## Privasi

Situs ini tidak memiliki akun, formulir, analitik, maupun pengumpulan data pribadi. Tombol hati hanya menyimpan favorit sementara selama halaman masih terbuka. Font menggunakan Google Fonts, sehingga browser akan menghubungi Google untuk mengambil font; hapus baris `@import` di `src/styles.css` jika ingin sepenuhnya mengandalkan font sistem.
