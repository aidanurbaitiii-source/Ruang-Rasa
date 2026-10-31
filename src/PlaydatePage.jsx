import React from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { activityBySlug } from './activities.js'

// Panduan playdate di rumah. Ide dan urutannya terinspirasi dari bagian playdate di buku
// "#BukuMamaBisa: Bikin Playdate Sendiri"; semua kalimat ditulis ulang oleh tim Ruang Rasa.

const types = [
  { name: 'Mommydate', text: 'Orang tua lebih banyak mengobrol, anak ikut menemani. Cocok saat anak masih bayi dan belum banyak bermain dengan teman.' },
  { name: 'Edudate', text: 'Berkunjung ke tempat yang mendukung belajar, seperti taman, perpustakaan, kebun, atau museum. Orang tua perlu fokus mengawasi anak.' },
  { name: 'Housedate', text: 'Bermain di rumah. Suasananya santai dan orang tua punya waktu mengobrol. Ada dua gaya: minim persiapan atau penuh persiapan.' },
  { name: 'Eventdate', text: 'Playdate untuk acara besar, misalnya ulang tahun anak. Persiapannya paling banyak, termasuk dekorasi.' },
]

const before = [
  'Beri tahu anak beberapa hari sebelumnya: ke mana, bertemu siapa, dan bermain apa. Pakai kalimat positif, bukan "Jangan nakal, ya!"',
  'Batasi layar (gawai dan televisi) sehari menjelang playdate.',
  'Atur makan dan tidur supaya anak kenyang dan tidak mengantuk. Hindari terlalu banyak makanan manis 2–3 jam sebelumnya.',
  'Jangan membawa atau menyediakan mainan atau buku kesayangan yang sulit dipinjamkan.',
  'Siapkan aktivitas cadangan kalau anak bosan atau kurang tertarik.',
  'Pastikan anak sehat. Kalau sakit, atur ulang jadwal agar tidak menularkan ke teman.',
  'Bawa baju ganti, minum, dan camilan.',
]

const lessPrep = [
  'Pakai mainan yang sudah ada dan taruh di satu ruangan agar mudah dipantau.',
  'Simpan mainan favorit dan mainan berkomponen kecil di tempat yang tidak terjangkau.',
  'Untuk makanan, pesan antar atau patungan, atau minta tiap orang tua membawa makanan dari rumah (potluck).',
]

const morePrep = [
  'Siapkan satu atau dua aktivitas dari koleksi ide Ruang Rasa, misalnya playdough buatan sendiri atau lukis dengan kertas krep.',
  'Siapkan alas, nampan, dan lap untuk kegiatan yang berantakan.',
  'Siapkan camilan sehat yang bisa dibuat bersama, seperti es loli buah atau mini pancake.',
]

const houseTips = [
  'Hindari bola dan mobil-mobilan yang bisa dinaiki di dalam ruangan, karena anak mudah berebut atau terlindas.',
  'Singkirkan benda tajam dan pecah belah dari ruang bermain.',
  'Tanyakan alergi anak yang datang sebelum memilih makanan.',
  'Tidak perlu malu meminta patungan atau mengusulkan potluck agar tuan rumah tidak kerepotan.',
]

const problems = [
  { title: 'Anak enggan bermain karena suasana baru', text: 'Dampingi saat berkenalan dan jelaskan apa yang akan dilakukan. Beri waktu untuk mengamati dan jangan memaksa anak langsung bergabung.' },
  { title: 'Rebutan mainan atau sulit berbagi', text: 'Atur giliran dan batasi waktu pakai mainan. Kalau perlu, alihkan perhatian anak ke mainan lain lebih dulu.' },
  { title: 'Anak memilih diam atau bermain sendiri', text: 'Bisa jadi anak sedang bermain berdampingan (parallel play), yaitu dekat dengan teman tetapi bermain sendiri-sendiri. Tawarkan kegiatan yang tidak banyak butuh interaksi, seperti melukis, permainan sensori, atau puzzle.' },
  { title: 'Anak terlalu aktif', text: 'Awasi interaksinya. Kalau mulai mengganggu, alihkan ke kegiatan lain atau beri jeda sampai anak tenang.' },
  { title: 'Anak tantrum', text: 'Pisahkan dari teman ke tempat yang tenang, tetap diawasi. Tanyakan penyebabnya (lapar, bosan, lelah) dan beri pilihan, misalnya istirahat, minum, atau berjalan sebentar.' },
  { title: 'Anak memukul atau berbuat kasar', text: 'Segera pisahkan, lalu ajak bicara dengan tenang tanpa memarahi di depan banyak orang. Jelaskan bahwa itu tidak boleh, ajarkan cara lain, dan bantu anak meminta maaf.' },
  { title: 'Anak dipukul teman', text: 'Tidak perlu bereaksi berlebihan kecuali kondisinya serius. Tanyakan apakah anak sakit, jelaskan bahwa tindakan itu tidak baik, dan bila aman, bantu keduanya berbicara.' },
  { title: 'Anak ingin pulang', text: 'Kalau anak sudah tidak mau bermain, tidak perlu dipaksa. Pulang lebih awal tidak apa-apa. Tanyakan dulu apakah ia ingin pulang.' },
]

const ideaSlugs = ['playdough-buatan-sendiri', 'lukis-kertas-krep', 'bentuk-lakban-di-lantai', 'boneka-tangan-binatang', 'beri-makan-monster-huruf', 'es-loli-buah']

export default function PlaydatePage() {
  return <main className="subpage montessori-page section-wrap">
    <a className="back-link" href="#aktivitas"><ArrowLeft size={15}/> Beranda</a>
    <div className="eyebrow">PANDUAN ORANG TUA</div>
    <h1>Panduan playdate di rumah</h1>
    <p className="subpage-intro">Playdate adalah janji bermain anak bersama teman sebaya, biasanya didampingi orang tua. Di rumah, playdate bisa sederhana, murah, dan tetap menyenangkan untuk semua.</p>

    <section>
      <h2>Pilih tipe playdate</h2>
      <p className="mt-lead">Tidak ada tipe yang paling benar. Pilih sesuai kebutuhan, usia anak, dan tenaga yang kamu punya. Nama-nama tipe ini adalah istilah dari penulis buku acuan, bukan istilah baku.</p>
      <div className="mt-grid two">{types.map((item) => <article key={item.name} className="side-card"><h3>{item.name}</h3><p>{item.text}</p></article>)}</div>
    </section>

    <section>
      <h2>Persiapan sebelum playdate</h2>
      <ul className="check-list">{before.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>

    <section>
      <h2>Housedate: minim atau penuh persiapan</h2>
      <div className="mt-grid two">
        <article className="side-card"><h3>Minim persiapan</h3><ul>{lessPrep.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article className="side-card"><h3>Penuh persiapan</h3><ul>{morePrep.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </div>
      <h3 className="pd-sub">Tips menyiapkan ruangan dan makanan</h3>
      <ul className="check-list">{houseTips.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>

    <section>
      <h2>Saat masalah muncul</h2>
      <p className="mt-lead">Konflik kecil antar anak adalah hal biasa dan bagian dari belajar bersosialisasi. Tiap anak punya cara dan kecepatannya sendiri, jadi tidak perlu dibandingkan.</p>
      <div className="mt-grid">{problems.map((item) => <article key={item.title} className="side-card"><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </section>

    <section>
      <h2>Rencana playdate dalam empat langkah</h2>
      <ol className="step-list numbered"><li><strong>Pilih tipe playdate.</strong> Misalnya housedate dengan persiapan minim.</li><li><strong>Pilih tempat.</strong> Rumahmu, rumah teman, atau taman terdekat.</li><li><strong>Pilih aktivitas.</strong> Satu atau dua ide dari daftar di bawah sudah cukup.</li><li><strong>Pilih makanan.</strong> Camilan sehat yang bisa dibuat bersama, atau potluck.</li></ol>
      <h3 className="pd-sub">Ide aktivitas yang cocok untuk bermain bersama teman</h3>
      <ul className="pd-ideas">{ideaSlugs.map((slug) => { const item = activityBySlug[slug]; return item ? <li key={slug}><a href={`#/aktivitas/${slug}`}><span>{item.icon}</span>{item.title}<ArrowRight size={14}/></a></li> : null })}</ul>
      <div className="print-actions"><a className="button-primary" href="#/memasak">Memasak bersama anak <ArrowRight size={16}/></a><a className="text-link" href="#/semua">Lihat semua ide <ArrowRight size={14}/></a></div>
    </section>

    <section>
      <p className="source-note">Panduan ini terinspirasi dari bagian playdate di buku <em>#BukuMamaBisa: Bikin Playdate Sendiri</em> oleh Danesya Mayra Juzar, Dyah Ayu Amallia, dan Irna Nurul Fatimah (@productivemamas), penerbit VisiMedia. Kalimatnya ditulis ulang oleh tim Ruang Rasa. Isinya adalah saran umum dan bukan pengganti nasihat profesional. Kalau anak sering kesulitan berinteraksi atau berperilaku agresif, bicarakan dengan dokter anak atau psikolog anak.</p>
    </section>
  </main>
}
