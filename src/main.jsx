import React from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowLeft, ArrowRight, Clock3, Heart, Leaf, Sparkles, Sun, Users } from 'lucide-react'
import logoHorizontal from './assets/logo/logo-horizontal.svg'
import logoArch from './assets/logo/logo-arch.svg'
import logoScene from './assets/logo/logo-scene.svg'
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

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const categoryInfo = {
  'Kehidupan praktis': { intro: 'Kegiatan sehari-hari yang melatih kemandirian: memindahkan, menuang, mencuci, melipat. Gerakannya sederhana, tetapi melatih koordinasi tangan, fokus, dan rasa percaya diri.', tips: ['Tunjukkan gerakannya pelan-pelan, tanpa banyak bicara.', 'Siapkan alat berukuran kecil yang pas untuk tangan anak.', 'Tumpah atau berantakan itu bagian dari belajar. Sediakan lap kecil agar anak bisa membereskannya sendiri.'] },
  'Sensorial': { intro: 'Mengasah pancaindra lewat warna, tekstur, ukuran, dan bentuk. Dari sini anak belajar membandingkan, mengelompokkan, dan memperhatikan hal-hal kecil di sekitarnya.', tips: ['Mulai dari dua pilihan saja, lalu tambah saat anak siap.', 'Beri nama sifat bendanya: halus, kasar, besar, kecil.', 'Biarkan anak menyentuh dan mengamati selama yang ia mau.'] },
  'Matematika': { intro: 'Mengenal pola, urutan, dan jumlah lewat benda nyata yang bisa disentuh dan digeser. Konsep angka terasa lebih mudah saat anak bisa memegangnya langsung.', tips: ['Pakai benda konkret seperti kancing atau potongan buah.', 'Mulai dari pola sederhana dengan dua unsur.', 'Ajukan pertanyaan terbuka: "Menurutmu, selanjutnya apa?"'] },
  'Bahasa': { intro: 'Memperkaya kosakata lewat cerita, gambar, dan percakapan sehari-hari. Anak belajar mendengarkan, menamai, dan menceritakan dunianya dengan kata-kata sendiri.', tips: ['Ikuti kata-kata anak, jangan buru-buru mengoreksi.', 'Beri jeda agar anak sempat menjawab.', 'Pilih buku bergambar yang jelas dan tidak terlalu ramai.'] },
}

const values = {
  'ikuti-ritme-anak': { icon: Heart, title: 'Ikuti ritme anak', intro: 'Setiap anak punya waktunya sendiri. Ada yang langsung tertarik, ada yang mengamati dulu dari jauh. Dua-duanya sedang belajar.', points: ['Perhatikan apa yang sedang menarik minatnya hari ini, lalu mulai dari situ.', 'Berhenti saat anak sudah selesai, meski kegiatan belum "rampung".', 'Ulangi kegiatan yang sama selama anak masih menikmatinya. Pengulangan membangun penguasaan.'], related: ['Menceritakan gambar', 'Mengurutkan benda alam', 'Menuang air', 'Memindahkan kacang'] },
  'pakai-yang-ada-di-rumah': { icon: Leaf, title: 'Pakai yang ada di rumah', intro: 'Belajar tidak butuh alat mahal. Sendok, mangkuk, kaus kaki, dan daun dari halaman sudah cukup untuk memulai.', points: ['Lihat dulu isi dapur, lemari, dan halaman sebelum membeli apa pun.', 'Pilih benda nyata yang aman dan menarik, bukan mainan plastik yang serba bisa.', 'Libatkan anak menyiapkan bahannya. Itu sudah bagian dari kegiatannya.'], related: ['Mencari pasangan kaus kaki', 'Mencuci daun', 'Memindahkan kacang', 'Mencocokkan warna'] },
  'proses-lebih-berarti': { icon: Sparkles, title: 'Proses lebih berarti dari hasil', intro: 'Yang tumbuh adalah kemampuan dan rasa percaya diri anak, bukan hasil yang rapi. Hasilnya boleh berantakan.', points: ['Hindari menilai ("bagus" atau "salah"). Cukup ceritakan apa yang kamu lihat.', 'Biarkan anak mencoba lagi sendiri sebelum menawarkan bantuan.', 'Tak harus sempurna. Cukup hadir bersama.'], related: ['Menuang air', 'Mencuci daun', 'Membuat pola sederhana', 'Mengurutkan benda alam'] },
}

function ActivityCard({ activity, index, saved, onToggle }) {
  const isSaved = saved.includes(activity.title)
  return <article className="activity-card" style={{ '--delay': `${index * 45}ms` }}><div className={`card-art ${activity.color}`}><span>{activity.icon}</span><button className={isSaved ? 'save-button saved' : 'save-button'} aria-label={isSaved ? 'Hapus dari favorit' : 'Simpan ke favorit'} onClick={() => onToggle(activity.title)}><Heart size={17} fill={isSaved ? 'currentColor' : 'none'}/></button><span className="card-number">0{activities.indexOf(activity) + 1}</span></div><div className="card-content"><span className="category-label">{activity.category}</span><h3>{activity.title}</h3><p>{activity.description}</p><div className="card-meta"><span>{activity.age}</span><span><Clock3 size={13}/>{activity.time}</span></div><div className="materials"><span>SIAPKAN</span>{activity.materials}</div></div></article>
}

function parseRoute(hash) {
  const m = hash.match(/^#\/(kategori|nilai)\/([a-z0-9-]+)$/)
  if (!m) return { page: 'home' }
  if (m[1] === 'kategori') { const name = categories.find((c) => c !== 'Semua' && slugify(c) === m[2]); return name ? { page: 'kategori', name } : { page: 'home' } }
  return values[m[2]] ? { page: 'nilai', slug: m[2] } : { page: 'home' }
}

function useRoute() {
  const [hash, setHash] = React.useState(window.location.hash)
  React.useEffect(() => { const onChange = () => setHash(window.location.hash); window.addEventListener('hashchange', onChange); return () => window.removeEventListener('hashchange', onChange) }, [])
  return { route: parseRoute(hash), hash }
}

function SubPage({ eyebrow, title, intro, points, pointsTitle, items, saved, onToggle }) {
  return <main className="subpage section-wrap">
    <a className="back-link" href="#aktivitas"><ArrowLeft size={15}/> Semua aktivitas</a>
    <div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p className="subpage-intro">{intro}</p>
    <div className="subpage-points"><div className="eyebrow">{pointsTitle}</div><ul>{points.map((point) => <li key={point}>{point}</li>)}</ul></div>
    <div className="section-heading"><div><h2>Aktivitas yang cocok</h2></div><span className="activity-count">{items.length} ide untuk dicoba</span></div>
    <div className="activity-grid">{items.map((activity, index) => <ActivityCard key={activity.title} activity={activity} index={index} saved={saved} onToggle={onToggle} />)}</div>
  </main>
}

function Home({ saved, toggleSaved }) {
  return <main>
      <section className="hero" id="beranda"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot"/> RUANG KECIL UNTUK BERTUMBUH</div><h1>Belajar paling baik,<br/>dimulai dari <em>rumah.</em></h1><p className="hero-text">Ide aktivitas sederhana yang membantu si kecil mengenal dunia—satu kegiatan kecil, satu hari yang penuh rasa.</p><div className="hero-actions"><a className="button-primary" href="#aktivitas">Jelajahi aktivitas <ArrowRight size={17}/></a><a className="text-link" href="#filosofi">Apa itu Montessori? <ArrowDown size={15}/></a></div><div className="hero-note"><span className="avatars"><i>🌼</i><i>🍊</i><i>🌱</i></span><span>Dibuat untuk tumbuh bersama,<br/><strong>tanpa harus sempurna.</strong></span></div></div>
        <div className="hero-art"><div className="art-frame"><div className="art-blob"/><img className="hero-mark" src={logoArch} alt="Anak kecil dan rusa di bawah lengkung daun" width="230" height="210" /><div className="art-caption">sederhana · bermakna · bersama</div></div><span className="sparkle sparkle-one">✳</span><span className="sparkle sparkle-two">✳</span><span className="art-flower">✿</span></div>
      </section>

      <section className="values-strip"><a className="value-link" href="#/nilai/ikuti-ritme-anak"><span className="value-icon"><Heart size={17}/></span><span>Ikuti ritme anak</span></a><span className="value-separator">✳</span><a className="value-link" href="#/nilai/pakai-yang-ada-di-rumah"><span className="value-icon"><Leaf size={17}/></span><span>Pakai yang ada di rumah</span></a><span className="value-separator">✳</span><a className="value-link" href="#/nilai/proses-lebih-berarti"><span className="value-icon"><Sparkles size={17}/></span><span>Proses lebih berarti dari hasil</span></a></section>

      <section className="activities section-wrap" id="aktivitas"><div className="section-heading"><div><div className="eyebrow">IDE KECIL, MAKNA BESAR</div><h2>Mulai dari yang <em>sederhana.</em></h2><p>Pilih satu kegiatan, siapkan bersama, lalu nikmati prosesnya.</p></div><span className="activity-count">{activities.length} ide untuk dicoba <span>↘</span></span></div>
        <div className="filters" aria-label="Kategori aktivitas"><a className="filter active" href="#aktivitas">Semua</a>{categories.map((category) => <a key={category} className="filter" href={`#/kategori/${slugify(category)}`}>{category}</a>)}</div>
        <div className="activity-grid">{activities.map((activity, index) => <ActivityCard key={activity.title} activity={activity} index={index} saved={saved} onToggle={toggleSaved} />)}</div>
      </section>

      <section className="philosophy" id="filosofi"><div className="philosophy-inner"><div className="philosophy-art"><div className="quote-mark">“</div><img className="deer-logo" src={logoScene} alt="Anak kecil memberi daun kepada seekor rusa" /><div className="leaf-doodle">✿</div><span className="philosophy-sticker">belajar<br/>dengan hati</span></div><div className="philosophy-copy"><div className="eyebrow">SEBUAH CARA PANDANG</div><h2>Anak bukan wadah kosong.<br/>Mereka <em>penjelajah kecil.</em></h2><p>Montessori adalah pendekatan belajar yang menghormati rasa ingin tahu dan kemandirian anak. Kita menyiapkan lingkungan, memberi ruang untuk mencoba, lalu hadir untuk menemani.</p><p className="philosophy-note">Tak perlu alat khusus atau jadwal yang kaku. Benda sehari-hari dan waktu bersama sudah cukup untuk memulai.</p><a className="text-link" href="#aktivitas">Temukan kegiatan pertama <ArrowRight size={15}/></a></div></div></section>

      <section className="printable section-wrap" id="printable"><div className="printable-copy"><div className="eyebrow">UNTUK DICETAK, UNTUK DICOBA</div><h2>Rencana kecil untuk<br/><em>hari yang penuh rasa.</em></h2><p>Pratinjau lembar ide aktivitas sederhana. Simpan halaman ini sebagai PDF dari browser, atau cetak langsung.</p><button className="button-primary print-button" onClick={() => window.print()}>Cetak pratinjau <ArrowRight size={17}/></button></div><div className="paper-wrap"><div className="paper"><div className="paper-top"><div className="paper-logo"><img className="deer-logo" src={logoScene} alt="" /></div><span>RUANG RASA <i>·</i> LEMBAR KEGIATAN</span></div><div className="paper-title">Hari ini, kita mencoba…</div><div className="paper-activity"><div className="paper-num">01</div><div><strong>Memindahkan kacang</strong><small>Pindahkan dengan sendok, pelan-pelan.</small></div><span className="check-box"/></div><div className="paper-activity"><div className="paper-num">02</div><div><strong>Mencuci daun</strong><small>Rasakan tekstur dan percikan air.</small></div><span className="check-box"/></div><div className="paper-activity"><div className="paper-num">03</div><div><strong>Waktu membaca bersama</strong><small>Ikuti cerita ke mana pun arahnya.</small></div><span className="check-box"/></div><div className="paper-reflect"><span>Setelah mencoba, aku merasa…</span><div className="writing-line"/><div className="writing-line"/></div><div className="paper-footer"><span>Tak harus sempurna. Cukup hadir bersama.</span><span>ruang rasa <i>✿</i></span></div></div><div className="paper-deco">✳</div></div></section>

      <section className="closing"><div className="closing-flower">✿</div><div className="eyebrow">TIDAK TERBURU-BURU</div><h2>Tumbuh itu bukan lomba.<br/><em>Hari ini, hadir saja.</em></h2><p>Satu momen kecil bersama sudah berarti banyak.</p><a className="button-light" href="#aktivitas">Pilih aktivitas hari ini <ArrowRight size={16}/></a></section>
    </main>
}

function App() {
  const [saved, setSaved] = React.useState([])
  const { route, hash } = useRoute()
  const previousPage = React.useRef(route.page)

  function toggleSaved(title) {
    setSaved((current) => current.includes(title) ? current.filter((item) => item !== title) : [...current, title])
  }

  React.useEffect(() => {
    const id = hash.startsWith('#/') ? '' : hash.slice(1)
    if (route.page !== 'home') window.scrollTo({ top: 0, behavior: 'instant' })
    else if (id) document.getElementById(id)?.scrollIntoView()
    else if (previousPage.current !== 'home') window.scrollTo({ top: 0, behavior: 'instant' })
    previousPage.current = route.page
  }, [route.page, route.name, route.slug, hash])

  let page = <Home saved={saved} toggleSaved={toggleSaved} />
  if (route.page === 'kategori') page = <SubPage eyebrow="KATEGORI" title={route.name} intro={categoryInfo[route.name].intro} pointsTitle="CATATAN KECIL" points={categoryInfo[route.name].tips} items={activities.filter((item) => item.category === route.name)} saved={saved} onToggle={toggleSaved} />
  if (route.page === 'nilai') { const value = values[route.slug]; page = <SubPage eyebrow="PRINSIP KAMI" title={value.title} intro={value.intro} pointsTitle="CARA MEMULAINYA" points={value.points} items={value.related.map((title) => activities.find((item) => item.title === title))} saved={saved} onToggle={toggleSaved} /> }

  return <>
    <header className="site-header"><a className="brand" href="#beranda"><img className="brand-logo" src={logoHorizontal} alt="Ruang Rasa" width="150" height="47" /></a>
      <nav><a href="#aktivitas">Aktivitas</a><a href="#filosofi">Tentang Montessori</a><a href="#printable">Printable</a></nav><a className="header-cta" href="#aktivitas">Temukan ide <ArrowRight size={15}/></a>
    </header>

    {page}

    <footer><a className="footer-brand" href="#beranda"><img className="footer-logo" src={logoHorizontal} alt="Ruang Rasa" width="108" height="34" /></a><span>Merawat rasa ingin tahu, satu hari kecil pada satu waktu.</span><span className="privacy-note"><Users size={14}/> Tanpa akun. Tanpa pengumpulan data.</span><span className="copyright">© 2026 Ruang Rasa</span></footer>
  </>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)
