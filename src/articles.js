// Artikel untuk tiga nilai di strip beranda. Setiap klaim memakai `cite` (kunci di src/references.js).
// Nomor rujukan mengikuti urutan `sourceKeys` pada masing-masing artikel.

export const articles = [
  {
    slug: 'ikuti-ritme-anak', title: 'Ikuti ritme anak', minutes: 6,
    lead: 'Mengikuti ritme anak berarti memperhatikan apa yang menarik baginya dan memberi waktu serta kegiatan yang sesuai dengan kesiapannya. Ini bukan berarti membiarkannya melakukan apa saja.',
    takeaways: ['Mulailah dengan mengamati: apa yang ia pilih, apa yang sedang ia latih, dan apa yang ia hindari.', 'Mengikuti anak tetap disertai batas dan arahan dari orang dewasa.', 'Pengulangan dan waktu tanpa gangguan membantu anak berkonsentrasi.', 'Bermain yang dipimpin anak dan didampingi orang tua mendukung perkembangan sekaligus mempererat hubungan.'],
    sections: [
      { id: 'arti', heading: 'Apa artinya "mengikuti anak"?', blocks: [
        { type: 'p', text: 'Dalam pendidikan Montessori, pengamatan adalah cara utama memahami kebutuhan, minat, dan tahap perkembangan setiap anak. Pengamatan menjadi dasar dari gagasan "mengikuti anak".', cite: ['bluffview'] },
        { type: 'p', text: 'Pengamatan menunjukkan apa yang sering dipilih anak, keterampilan apa yang sedang ia latih, dan apa yang cenderung ia hindari. Informasi ini membantu orang tua menyiapkan kegiatan berikutnya, misalnya menambah bahan bacaan bila anak gemar membaca.', cite: ['bluffview', 'westmont'] },
        { type: 'callout', title: 'Bukan kebebasan tanpa batas', text: 'Sumber-sumber Montessori menegaskan bahwa mengikuti anak tidak berarti membiarkan anak melakukan apa saja. Orang dewasa tetap memimpin dengan menyiapkan lingkungan dan menjaga batas yang jelas.', cite: ['westmont', 'bluffview'] },
      ] },
      { id: 'mengapa', heading: 'Mengapa ritme anak penting?', blocks: [
        { type: 'p', text: 'Laporan klinis American Academy of Pediatrics (2018) menyebut bermain sebagai bagian sentral dari perkembangan anak yang sehat. Laporan itu juga menganjurkan pembelajaran yang menyenangkan, tempat anak memimpin dan mengikuti rasa ingin tahunya.', cite: ['aapPlay'] },
        { type: 'p', text: 'Pesan sederhananya untuk orang tua: ketika anak mengajak bermain, katakan "ya". Momen bermain bersama mempererat hubungan.', cite: ['aapPlay'] },
        { type: 'p', text: 'Dalam pengamatan Montessori, konsentrasi yang dalam muncul ketika anak memilih sendiri bahan yang menarik baginya dan dapat mengerjakannya tanpa diinterupsi. Perlu dicatat, pengamatan ini berasal dari catatan Montessori dan sekolah Montessori, bukan penelitian terkontrol.', cite: ['amiWorkCycle', 'greenspring', 'montessoriInsights'] },
      ] },
      { id: 'cara', heading: 'Cara melakukannya di rumah', blocks: [
        { type: 'steps', items: ['Amati dulu. Duduklah beberapa menit tanpa ikut campur dan perhatikan apa yang ia pilih.', 'Catat tiga hal: yang menarik minatnya, yang sedang ia latih, dan yang ia hindari.', 'Tawarkan kegiatan yang sesuai dengan minat itu. Dua atau tiga pilihan sudah cukup.', 'Beri waktu tanpa gangguan. Hindari menyela saat anak sedang asyik.', 'Biarkan anak mengulang kegiatan yang sama selama ia masih menikmatinya.', 'Berhenti saat anak selesai, dan jangan memaksa menuntaskan.'], cite: ['bluffview', 'westmont'] },
        { type: 'p', text: 'Di kelas Montessori, waktu kerja tanpa gangguan biasanya berlangsung sekitar 2–3 jam. Di rumah, sesuaikan dengan usia dan kondisi anak. Mulai dari blok singkat sudah cukup baik.', cite: ['amiWorkCycle'] },
      ] },
      { id: 'kesalahan', heading: 'Kesalahan yang sering terjadi', blocks: [
        { type: 'list', items: ['Menganggap "mengikuti anak" berarti tanpa batas.', 'Menyela atau mengoreksi saat anak sedang berkonsentrasi.', 'Membandingkan anak dengan anak lain atau dengan jadwal yang kita bayangkan.', 'Memaksa anak menuntaskan kegiatan yang sudah tidak diminatinya.'] },
      ] },
    ],
    faq: [
      { q: 'Bagaimana kalau anak hanya mau mengulang satu kegiatan?', a: 'Pengulangan lazim dalam pengamatan Montessori. Salah satu catatan terkenal menceritakan seorang anak yang mengulang satu latihan puluhan kali dengan penuh konsentrasi. Tetap perhatikan anak: kalau ia tampak bosan atau terjebak, tawarkan variasi kecil, bukan mengganti seluruh kegiatan.', cite: ['amiWorkCycle', 'greenspring'] },
      { q: 'Apakah harus tiga jam tanpa gangguan?', a: 'Angka tiga jam adalah acuan untuk kelas Montessori dan masih diperdebatkan. Di rumah, tidak ada angka yang pasti. Sesuaikan dengan usia dan suasana hati anak.', cite: ['amiWorkCycle'] },
      { q: 'Bagaimana kalau anak tidak tertarik pada kegiatan yang saya siapkan?', a: 'Tidak apa-apa. Amati lagi apa yang ia pilih, lalu coba kegiatan lain atau hubungkan dengan benda favoritnya. Setiap anak punya minat yang berbeda.' },
    ],
    related: ['memindahkan-kacang', 'menyusun-gelas-berurutan', 'kantong-misteri', 'menceritakan-gambar'],
    sourceKeys: ['bluffview', 'westmont', 'aapPlay', 'amiWorkCycle', 'greenspring', 'montessoriInsights'],
    evidence: 'Gagasan "mengikuti anak" berasal dari pengamatan Montessori dan praktik sekolah Montessori, bukan penelitian terkontrol. Dukungan penelitian yang lebih kuat ada untuk manfaat bermain yang dipimpin anak secara umum (laporan AAP).',
  },
  {
    slug: 'pakai-yang-ada-di-rumah', title: 'Pakai yang ada di rumah', minutes: 5,
    lead: 'Montessori di rumah tidak butuh perabot atau alat mahal. Yang terpenting adalah benda nyata yang aman, berukuran pas untuk anak, dan tertata sehingga mudah ia jangkau.',
    takeaways: ['Benda sehari-hari seperti mangkuk, sendok, beras, dan kain sudah cukup untuk banyak kegiatan.', 'Pilih benda nyata yang berukuran pas untuk anak, bukan mainan tiruan.', 'Ukuran yang sesuai disebut sebagai faktor terpenting agar anak berhasil.', 'Keselamatan tetap utama: awasi anak, dan hindari benda kecil untuk anak di bawah 3 tahun.'],
    sections: [
      { id: 'cukup', heading: 'Mengapa benda sehari-hari cukup?', blocks: [
        { type: 'p', text: 'Sumber-sumber Montessori menyebut benda rumah tangga bekerja dengan baik. Yang penting adalah memberi anak tanggung jawab nyata dalam suasana yang aman.', cite: ['montessoriHome'] },
        { type: 'p', text: 'Untuk kegiatan kehidupan praktis, bahannya bisa berupa mangkuk, sendok, sendok sayur, kacang, beras, dan pasta berbentuk. Bahan seperti ini mudah ditemukan di lemari dapur atau toko barang bekas.', cite: ['practicalLifeMT', 'manjPL'] },
      ] },
      { id: 'nyata', heading: 'Benda nyata, ukuran pas', blocks: [
        { type: 'p', text: 'Sumber Montessori menganjurkan alat nyata berukuran anak daripada versi mainan, misalnya sapu kecil, cangkir keramik, dan teko ringan. Ukuran yang sesuai disebut sebagai bagian terpenting dalam kegiatan kehidupan praktis.', cite: ['montessoriHome', 'practicalLifeMT'] },
        { type: 'p', text: 'Alat berukuran anak memang membantu, tetapi bukan syarat mutlak. Cukup pilih benda yang pas di tangan anak dan tidak terlalu berat.', cite: ['montessoriHome'] },
      ] },
      { id: 'langkah', heading: 'Langkah menyiapkan', blocks: [
        { type: 'steps', items: ['Berkeliling dapur dan lemari. Kumpulkan wadah, sendok, teko kecil, kain, dan spons yang sudah ada.', 'Pilih yang aman, tidak mudah pecah, dan pas di tangan anak.', 'Letakkan satu kegiatan di atas nampan dengan semua bahan yang dibutuhkan.', 'Taruh nampan di rak rendah supaya anak bisa mengambilnya sendiri.', 'Tunjukkan cara memakainya pelan-pelan, lalu biarkan anak mencoba.', 'Bereskan bersama dan kembalikan ke tempatnya.'], cite: ['montessoriHome'] },
      ] },
      { id: 'contoh', heading: 'Contoh benda rumah dan kegiatannya', blocks: [
        { type: 'links', items: [['Mangkuk, sendok, dan kacang besar', 'memindahkan-kacang'], ['Teko kecil, gelas, dan nampan', 'menuang-air'], ['Daun, baskom, dan spons', 'mencuci-daun'], ['Kaus kaki dan keranjang', 'mencari-pasangan-kaus-kaki'], ['Gelas plastik berbagai ukuran', 'menyusun-gelas-berurutan'], ['Kain lap dan serbet', 'melipat-kain-lap']] },
      ] },
      { id: 'kesalahan', heading: 'Kesalahan yang sering terjadi', blocks: [
        { type: 'list', items: ['Membeli seperangkat alat mahal sebelum tahu apa yang diminati anak.', 'Memakai mainan plastik tiruan sebagai pengganti benda nyata.', 'Menyiapkan terlalu banyak benda sekaligus.', 'Lupa memeriksa keamanan benda, terutama ukuran dan bagian yang tajam atau mudah pecah.'] },
        { type: 'callout', title: 'Keselamatan lebih dulu', text: 'Untuk anak di bawah 3 tahun, hindari benda kecil yang mudah tertelan dan awasi selalu. Untuk anak yang lebih besar, mulai dari bahan yang tidak mudah pecah sebelum mencoba benda nyata seperti keramik.' },
      ] },
    ],
    faq: [
      { q: 'Apakah saya perlu membeli perabot atau alat Montessori?', a: 'Tidak harus. Menyiapkan rumah sesuai cara anak belajar lebih penting daripada membeli perabot khusus.', cite: ['montessoriHome'] },
      { q: 'Bolehkah memakai benda nyata yang bisa pecah?', a: 'Kegiatan kehidupan praktis Montessori memang melibatkan benda nyata, termasuk keramik. Namun, sesuaikan dengan usia dan kesiapan anak serta awasi. Untuk pemula, pilih bahan yang tidak mudah pecah.', cite: ['montessoriHome', 'practicalLifeMT'] },
    ],
    related: ['menuang-air', 'memindahkan-kacang', 'mencuci-daun', 'mencari-pasangan-kaus-kaki'],
    sourceKeys: ['montessoriHome', 'practicalLifeMT', 'manjPL'],
    evidence: 'Sumber berupa organisasi dan sekolah Montessori serta situs pendidikan, bukan penelitian. Anjuran alat berukuran anak adalah praktik umum Montessori, bukan hasil studi.',
  },
  {
    slug: 'proses-lebih-berarti', title: 'Proses lebih berarti dari hasil', minutes: 6,
    lead: 'Saat anak bereksplorasi, yang tumbuh adalah kemampuan dan rasa percaya dirinya. Karena itu, perhatian sebaiknya tertuju pada prosesnya: apa yang ia coba, bagaimana ia berpikir, dan bagaimana ia bertahan, bukan sekadar seberapa rapi hasilnya.',
    takeaways: ['Seni proses memberi anak kebebasan memilih dan mengeksplorasi bahan tanpa target tertentu.', 'Memuji strategi dan usaha lebih membantu motivasi anak daripada memuji kepintaran.', 'Komentar yang spesifik lebih berguna daripada "bagus sekali".', 'Bukti penelitian tentang pujian umumnya berasal dari studi eksperimen, jadi jadikan pedoman, bukan aturan kaku.'],
    sections: [
      { id: 'proses-produk', heading: 'Seni proses dan seni produk', blocks: [
        { type: 'p', text: 'NAEYC menggambarkan seni proses sebagai kegiatan ketika anak menjelajahi dan merasakan bahan tanpa mengejar tujuan tertentu. NAEYC mengaitkannya dengan pengaturan diri, karena anak membuat pilihan sendiri dan merasa berhasil.', cite: ['naeycProcess'] },
        { type: 'p', text: 'Seni produk meminta anak mengikuti contoh atau langkah tertentu, dan orang dewasa sudah tahu hasil akhirnya. NAEYC menilai pendekatan ini memberi sedikit manfaat selain mengikuti arahan dan melatih motorik halus.', cite: ['naeycProcess'] },
        { type: 'p', text: 'Salah satu tanda yang disebut NAEYC: pada seni proses anak bertanya "Boleh minta waktu lagi?", sedangkan pada seni produk anak bertanya "Ini sudah benar belum?"', cite: ['naeycProcess'] },
        { type: 'p', text: 'Keduanya tidak harus dipisahkan sama sekali. Kamu bisa mulai dari eksplorasi bebas, lalu memakai hasilnya untuk karya bersama.' },
      ] },
      { id: 'pujian', heading: 'Memuji proses, bukan kepintaran', blocks: [
        { type: 'p', text: 'Studi Mueller dan Dweck (1998) pada siswa kelas lima menemukan bahwa pujian atas kepintaran berdampak lebih negatif pada motivasi berprestasi dibandingkan pujian atas usaha. Setelah mengalami kegagalan, anak yang dipuji kepintarannya cenderung kurang gigih dan kurang menikmati tugas.', cite: ['muellerDweck'] },
        { type: 'p', text: 'Panduan lanjutan Dweck menyarankan memuji proses belajar yang menghasilkan keberhasilan dan mengaitkannya dengan hasil. Usaha hanyalah sebagian dari proses, jadi strategi yang dipakai anak juga perlu diakui. Memuji usaha saat anak sebenarnya kesulitan tidak bermakna.', cite: ['ptPraise'] },
        { type: 'callout', title: 'Pegang sebagai pedoman, bukan aturan mutlak', text: 'Studi pujian dilakukan dalam situasi eksperimen dengan sampel yang relatif kecil. Gunakan hasilnya sebagai arah yang masuk akal dalam keseharian, bukan sebagai aturan kaku.', cite: ['muellerDweck', 'ptPraise'] },
      ] },
      { id: 'cara', heading: 'Cara melakukannya', blocks: [
        { type: 'steps', items: ['Ganti "Bagus sekali!" dengan pengamatan: "Aku lihat kamu mencoba dua cara."', 'Akui strateginya: "Kamu menaruh balok besar di bawah supaya kuat."', 'Akui ketekunannya secara nyata: "Tadi tumpah, lalu kamu mengambil lap dan mencoba lagi."', 'Undang anak bercerita: "Ceritakan tentang yang kamu buat."', 'Jangan memperbaiki atau menyelesaikan karya anak.', 'Pajang prosesnya, bukan hanya hasil yang tampak paling rapi: simpan coretan dan foto tahap pengerjaan.'] },
      ] },
      { id: 'kesalahan', heading: 'Kesalahan yang sering terjadi', blocks: [
        { type: 'list', items: ['Memuji berlebihan pada semua hal sehingga pujian kehilangan makna.', 'Memuji sifat seperti "pintar" atau "berbakat".', 'Memperbaiki karya anak agar tampak lebih rapi.', 'Memajang hanya karya yang tampak sempurna.'] },
      ] },
    ],
    faq: [
      { q: 'Apakah tidak boleh memuji sama sekali?', a: 'Boleh. Yang disarankan adalah memuji hal yang spesifik, yaitu proses, strategi, dan ketekunan, bukan sifat bawaan seperti kepintaran.', cite: ['ptPraise'] },
      { q: 'Bagaimana kalau anak ingin hasilnya rapi?', a: 'Itu wajar. Bantu anak menetapkan tujuannya sendiri, misalnya "Kamu ingin garisnya lurus? Mau coba pakai penggaris?" Tujuan datang dari anak, bukan dari orang dewasa.' },
    ],
    related: ['cat-jari-yoghurt', 'melukis-dengan-benda-alam', 'adonan-maizena', 'lukis-kertas-krep'],
    sourceKeys: ['naeycProcess', 'muellerDweck', 'ptPraise'],
    evidence: 'Dukungan untuk seni proses berasal dari panduan organisasi profesi (NAEYC), bukan studi hasil jangka panjang. Studi pujian dilakukan pada siswa kelas lima dalam situasi eksperimen.',
  },
]

export const articleBySlug = Object.fromEntries(articles.map((article) => [article.slug, article]))
