// Pengaturan toko worksheet. Isi `orderUrl` dengan tautan toko (misalnya WhatsApp, Lynk.id, atau Tokopedia)
// dan `prices` dengan harga per paket (kunci = slug paket) saat siap berjualan.
// Selama kosong, tombol pesan tampil sebagai "Segera dijual" dan harga tidak ditampilkan.
export const SHOP = {
  orderUrl: '',
  prices: {},
  bands: [
    { slug: 'usia-2-3', label: '2–3 tahun', min: 2, max: 3, blurb: 'Mencocokkan, memilih, dan memegang pensil untuk pertama kali.' },
    { slug: 'usia-3-4', label: '3–4 tahun', min: 3, max: 4, blurb: 'Mengenal angka, bentuk, dan warna lewat jiplak dan hitung.' },
    { slug: 'usia-4-5', label: '4–5 tahun', min: 4, max: 5, blurb: 'Berhitung lebih jauh, huruf, dan urutan.' },
    { slug: 'usia-5-7', label: '5–7 tahun', min: 5, max: 7, blurb: 'Penjumlahan, hari dan bulan, serta angka sampai 20.' },
  ],
}
