import React from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowRight, Clock3, Heart, Leaf, Sparkles, Sun, Users } from 'lucide-react'
import './styles.css'

const activities = [
  { title: 'Memindahkan kacang', category: 'Kehidupan praktis', age: '2–4 tahun', time: '10 menit', materials: '2 mangkuk kecil, kacang besar', description: 'Pindahkan kacang dari satu mangkuk ke mangkuk lain menggunakan sendok. Latihan kecil untuk tangan yang makin terampil.', icon: '🥄', color: 'peach' },
  { title: 'Mencuci daun', category: 'Kehidupan praktis', age: '2–5 tahun', time: '15 menit', materials: 'Daun besar, baskom, air', description: 'Ajak si kecil mencuci daun satu per satu. Rasakan tekstur dan lihat air berubah bersama-sama.', icon: '🌿', color: 'sage' },
  { title: 'Mencocokkan warna', category: 'Sensorial', age: '2–4 tahun', time: '10 menit', materials: 'Kancing besar atau kain warna-warni', description: 'Kelompokkan benda berdasarkan warna. Mulai dengan dua warna, lalu tambah saat anak siap.', icon: '🎨', color: 'lavender' },
  { title: 'Menuang air', category: 'Kehidupan praktis', age: '2–4 tahun', time: '10 menit', materials: 'Gelas kecil, teko, alas lap', description: 'Belajar menuang dengan perlahan. Tumpah sedikit? Itu bagian dari proses mencoba.', icon: '💧', color: 'blue' },
  { title: 'Mencari pasangan kaus kaki', category: 'Kehidupan praktis', age: '2–5 tahun', time: '10 menit', materials: 'Beberapa pasang kaus kaki', description: 'Temukan dua kaus kaki yang sama, lalu gulung menjadi bola. Kegiatan sederhana yang terasa berarti.', icon: '🧦', color: 'peach' },
  { title: 'Mengurutkan benda alam', category: 'Sensorial', age: '3–5 tahun', time: '15 menit', materials: 'Daun, batu halus, ranting', description: 'Susun harta kecil dari halaman berdasarkan ukuran, bentuk, atau tekstur.', icon: '🍂', color: 'sage' },
  { title: 'Membuat pola sederhana', category: 'Matematika', age: '3–5 tahun', time: '15 menit', materials: 'Kancing besar atau potongan buah', description: 'Buat pola bergantian seperti merah-biru-merah-biru. Biarkan anak menebak kelanjutannya.', icon: '🔴', color: 'lavender' },
  { title: 'Menceritakan gambar', category: 'Bahasa', age: '2–5 tahun', time: '10 menit', materials: 'Buku bergambar favorit', description: 'Lihat gambar bersama. Ikuti kata-kata anak dan biarkan ceritanya tumbuh ke mana saja.', icon: '📖', color: 'blue' },
]

const categories = ['Semua', ...new Set(activities.map((item) => item.category))]

function DeerLogo() {
  return <svg className="deer-logo" viewBox="0 0 190 160" role="img" aria-label="Ilustrasi rusa dan anak kecil yang memberi makan">
    <ellipse cx="97" cy="145" rx="67" ry="7" fill="#d8cdb9" opacity=".45" />
    <path d="M128 85c15-14 31-7 31 7 0 9-9 15-20 13l-10-4-9 14-9-7 11-23Z" fill="#9b6749" />
    <path d="M143 74c-2-14-9-22-8-33 1-8 5-12 8-13-2 9 2 16 7 20 3-12 9-18 17-19-8 9-8 18-5 28l-7 18Z" fill="#9b6749" />
    <path d="M150 84c4 11 1 24-8 32l-3 24h-8l-1-24-10-1-7 25h-8l3-34-6-20c14-10 34-12 48-2Z" fill="#a97855" />
    <path d="M119 83c-11 5-18 13-18 24 0 10 7 15 18 11 9-3 11-11 10-19l-10-16Z" fill="#c58e68" />
    <path d="M122 94c7 3 11 2 13 0" fill="none" stroke="#684736" strokeWidth="2" strokeLinecap="round" />
    <circle cx="126" cy="89" r="2" fill="#382e29" />
    <path d="M48 116c0-14 7-23 18-23 10 0 16 8 16 20v23h-9l-3-17-7 1-2 16h-9l1-22-5 2Z" fill="#d88e68" />
    <circle cx="66" cy="82" r="10" fill="#d99875" />
    <path d="M57 82c0-9 8-14 15-9 3 2 4 5 4 8-6-2-11-2-19 1Z" fill="#49372e" />
    <path d="M55 108c-8 6-14 5-20 0" fill="none" stroke="#d88e68" strokeWidth="7" strokeLinecap="round" />
    <path d="M39 108c11-4 17-12 22-22" fill="none" stroke="#d99875" strokeWidth="5" strokeLinecap="round" />
    <path d="M57 84c8-2 16 1 24 5 10 5 22 6 31 1" fill="none" stroke="#d7a160" strokeWidth="3" strokeLinecap="round" />
    <circle cx="112" cy="90" r="3" fill="#d7a160" />
    <path d="M55 136h18M105 136h9" stroke="#755541" strokeWidth="3" strokeLinecap="round" />
  </svg>
}

function App() {
  const [activeCategory, setActiveCategory] = React.useState('Semua')
  const [saved, setSaved] = React.useState([])
  const visibleActivities = activeCategory === 'Semua' ? activities : activities.filter((item) => item.category === activeCategory)

  function toggleSaved(title) {
    setSaved((current) => current.includes(title) ? current.filter((item) => item !== title) : [...current, title])
  }

  return <>
    <header className="site-header"><a className="brand" href="#beranda"><span className="brand-mark"><DeerLogo /></span><span>ruang<span className="brand-light">rasa</span><small>bertumbuh bersama</small></span></a>
      <nav><a href="#aktivitas">Aktivitas</a><a href="#filosofi">Tentang Montessori</a><a href="#printable">Printable</a></nav><a className="header-cta" href="#aktivitas">Temukan ide <ArrowRight size={15}/></a>
    </header>

    <main>
      <section className="hero" id="beranda"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot"/> RUANG KECIL UNTUK BERTUMBUH</div><h1>Belajar paling baik,<br/>dimulai dari <em>rumah.</em></h1><p className="hero-text">Ide aktivitas sederhana yang membantu si kecil mengenal dunia—satu kegiatan kecil, satu hari yang penuh rasa.</p><div className="hero-actions"><a className="button-primary" href="#aktivitas">Jelajahi aktivitas <ArrowRight size={17}/></a><a className="text-link" href="#filosofi">Apa itu Montessori? <ArrowDown size={15}/></a></div><div className="hero-note"><span className="avatars"><i>🌼</i><i>🍊</i><i>🌱</i></span><span>Dibuat untuk tumbuh bersama,<br/><strong>tanpa harus sempurna.</strong></span></div></div>
        <div className="hero-art"><div className="sun-stamp"><Sun size={20}/><span>PELAN-PELAN<br/>JUGA BERTUMBUH</span></div><div className="art-frame"><div className="art-blob"/><div className="plant plant-a">🌿</div><DeerLogo/><div className="art-caption">sederhana · bermakna · bersama</div></div><span className="sparkle sparkle-one">✳</span><span className="sparkle sparkle-two">✳</span><span className="art-flower">✿</span></div>
      </section>

      <section className="values-strip"><div><span className="value-icon"><Heart size={17}/></span><span>Ikuti ritme anak</span></div><span className="value-separator">✳</span><div><span className="value-icon"><Leaf size={17}/></span><span>Pakai yang ada di rumah</span></div><span className="value-separator">✳</span><div><span className="value-icon"><Sparkles size={17}/></span><span>Proses lebih berarti dari hasil</span></div></section>

      <section className="activities section-wrap" id="aktivitas"><div className="section-heading"><div><div className="eyebrow">IDE KECIL, MAKNA BESAR</div><h2>Mulai dari yang <em>sederhana.</em></h2><p>Pilih satu kegiatan, siapkan bersama, lalu nikmati prosesnya.</p></div><span className="activity-count">{visibleActivities.length} ide untuk dicoba <span>↘</span></span></div>
        <div className="filters" aria-label="Filter kategori aktivitas">{categories.map((category) => <button key={category} className={activeCategory === category ? 'filter active' : 'filter'} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
        <div className="activity-grid">{visibleActivities.map((activity, index) => <article className="activity-card" key={activity.title} style={{ '--delay': `${index * 45}ms` }}><div className={`card-art ${activity.color}`}><span>{activity.icon}</span><button className={saved.includes(activity.title) ? 'save-button saved' : 'save-button'} aria-label={saved.includes(activity.title) ? 'Hapus dari favorit' : 'Simpan ke favorit'} onClick={() => toggleSaved(activity.title)}><Heart size={17} fill={saved.includes(activity.title) ? 'currentColor' : 'none'}/></button><span className="card-number">0{activities.indexOf(activity) + 1}</span></div><div className="card-content"><span className="category-label">{activity.category}</span><h3>{activity.title}</h3><p>{activity.description}</p><div className="card-meta"><span>{activity.age}</span><span><Clock3 size={13}/>{activity.time}</span></div><div className="materials"><span>SIAPKAN</span>{activity.materials}</div></div></article>)}</div>
      </section>

      <section className="philosophy" id="filosofi"><div className="philosophy-inner"><div className="philosophy-art"><div className="quote-mark">“</div><DeerLogo/><div className="leaf-doodle">✿</div><span className="philosophy-sticker">belajar<br/>dengan hati</span></div><div className="philosophy-copy"><div className="eyebrow">SEBUAH CARA PANDANG</div><h2>Anak bukan wadah kosong.<br/>Mereka <em>penjelajah kecil.</em></h2><p>Montessori adalah pendekatan belajar yang menghormati rasa ingin tahu dan kemandirian anak. Kita menyiapkan lingkungan, memberi ruang untuk mencoba, lalu hadir untuk menemani.</p><p className="philosophy-note">Tak perlu alat khusus atau jadwal yang kaku. Benda sehari-hari dan waktu bersama sudah cukup untuk memulai.</p><a className="text-link" href="#aktivitas">Temukan kegiatan pertama <ArrowRight size={15}/></a></div></div></section>

      <section className="printable section-wrap" id="printable"><div className="printable-copy"><div className="eyebrow">UNTUK DICETAK, UNTUK DICOBA</div><h2>Rencana kecil untuk<br/><em>hari yang penuh rasa.</em></h2><p>Pratinjau lembar ide aktivitas sederhana. Simpan halaman ini sebagai PDF dari browser, atau cetak langsung.</p><button className="button-primary print-button" onClick={() => window.print()}>Cetak pratinjau <ArrowRight size={17}/></button></div><div className="paper-wrap"><div className="paper"><div className="paper-top"><div className="paper-logo"><DeerLogo/></div><span>RUANG RASA <i>·</i> LEMBAR KEGIATAN</span></div><div className="paper-title">Hari ini, kita mencoba…</div><div className="paper-activity"><div className="paper-num">01</div><div><strong>Memindahkan kacang</strong><small>Pindahkan dengan sendok, pelan-pelan.</small></div><span className="check-box"/></div><div className="paper-activity"><div className="paper-num">02</div><div><strong>Mencuci daun</strong><small>Rasakan tekstur dan percikan air.</small></div><span className="check-box"/></div><div className="paper-activity"><div className="paper-num">03</div><div><strong>Waktu membaca bersama</strong><small>Ikuti cerita ke mana pun arahnya.</small></div><span className="check-box"/></div><div className="paper-reflect"><span>Setelah mencoba, aku merasa…</span><div className="writing-line"/><div className="writing-line"/></div><div className="paper-footer"><span>Tak harus sempurna. Cukup hadir bersama.</span><span>ruang rasa <i>✿</i></span></div></div><div className="paper-deco">✳</div></div></section>

      <section className="closing"><div className="closing-flower">✿</div><div className="eyebrow">TIDAK TERBURU-BURU</div><h2>Tumbuh itu bukan lomba.<br/><em>Hari ini, hadir saja.</em></h2><p>Satu momen kecil bersama sudah berarti banyak.</p><a className="button-light" href="#aktivitas">Pilih aktivitas hari ini <ArrowRight size={16}/></a></section>
    </main>
    <footer><a className="footer-brand" href="#beranda">ruang<span>rasa</span></a><span>Merawat rasa ingin tahu, satu hari kecil pada satu waktu.</span><span className="privacy-note"><Users size={14}/> Tanpa akun. Tanpa pengumpulan data.</span><span className="copyright">© 2026 Ruang Rasa</span></footer>
  </>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)
