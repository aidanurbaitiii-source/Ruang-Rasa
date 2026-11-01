import React from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowLeft, ArrowRight, Menu, Printer, X, Clock3, Heart, Leaf, Sparkles, Sun, Users } from 'lucide-react'
import logoHorizontal from './assets/logo/logo-horizontal.svg'
import logoArch from './assets/logo/logo-arch.svg'
import logoScene from './assets/logo/logo-scene.svg'
import { printables, printableById, pageCount, PrintSheets, printablesForAge } from './printables.jsx'
import { activities, activityBySlug } from './activities.js'
import MontessoriPage, { Ref, SourceList } from './MontessoriPage.jsx'
import { references } from './references.js'
import { stages, stageBySlug, stageIncludes, stageForAge } from './stages.js'
import ArticlePage from './ArticlePage.jsx'
import { articleBySlug } from './articles.js'
import ShopPage from './ShopPage.jsx'
import PlaydatePage from './PlaydatePage.jsx'
import './styles.css'

const categories = ['Semua', ...new Set(activities.map((item) => item.category))]

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const categoryInfo = {
  'Kehidupan praktis': { intro: 'Kegiatan sehari-hari yang melatih kemandirian: memindahkan, menuang, mencuci, melipat. Gerakannya sederhana, tetapi melatih koordinasi tangan, fokus, dan rasa percaya diri.', tips: ['Tunjukkan gerakannya pelan-pelan, tanpa banyak bicara.', 'Siapkan alat berukuran kecil yang pas untuk tangan anak.', 'Tumpah atau berantakan itu bagian dari belajar. Sediakan lap kecil agar anak bisa membereskannya sendiri.'] },
  'Sensorial': { intro: 'Mengasah pancaindra lewat warna, tekstur, ukuran, dan bentuk. Dari sini anak belajar membandingkan, mengelompokkan, dan memperhatikan hal-hal kecil di sekitarnya.', tips: ['Mulai dari dua pilihan saja, lalu tambah saat anak siap.', 'Beri nama sifat bendanya: halus, kasar, besar, kecil.', 'Biarkan anak menyentuh dan mengamati selama yang ia mau.'] },
  'Matematika': { intro: 'Mengenal pola, urutan, dan jumlah lewat benda nyata yang bisa disentuh dan digeser. Konsep angka terasa lebih mudah saat anak bisa memegangnya langsung.', tips: ['Pakai benda konkret seperti kancing atau potongan buah.', 'Mulai dari pola sederhana dengan dua unsur.', 'Ajukan pertanyaan terbuka: "Menurutmu, selanjutnya apa?"'] },
  'Budaya': { intro: 'Mengenal dunia di sekitar anak: alam, hewan dan tumbuhan, bumi dan tempat tinggal, serta seni dan musik. Dari yang paling dekat dulu, lalu meluas.', tips: ['Mulai dari hal yang dekat dan nyata: halaman rumah, hewan peliharaan, cuaca hari ini.', 'Ajak anak menebak sebelum mencoba, lalu cocokkan dengan hasilnya.', 'Tidak perlu menghafal nama. Rasa ingin tahu lebih penting.'] },
  'Bahasa': { intro: 'Memperkaya kosakata lewat cerita, gambar, dan percakapan sehari-hari. Anak belajar mendengarkan, menamai, dan menceritakan dunianya dengan kata-kata sendiri.', tips: ['Ikuti kata-kata anak, jangan buru-buru mengoreksi.', 'Beri jeda agar anak sempat menjawab.', 'Pilih buku bergambar yang jelas dan tidak terlalu ramai.'] },
}


const Spark = () => <svg className="spark" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none"/></svg>

function ActivityCard({ activity, index, saved, onToggle }) {
  const isSaved = saved.includes(activity.title)
  const materials = activity.materials.slice(0, 3).map((item) => item.replace(/\s*\(.*\)/, '')).join(', ')
  return <article className="activity-card" style={{ '--delay': `${index * 45}ms` }}><div className={`card-art ${activity.color}`}><span>{activity.icon}</span><button className={isSaved ? 'save-button saved' : 'save-button'} aria-label={isSaved ? 'Hapus dari favorit' : 'Simpan ke favorit'} onClick={() => onToggle(activity.title)}><Heart size={17} fill={isSaved ? 'currentColor' : 'none'}/></button><span className="card-number">{String(activities.indexOf(activity) + 1).padStart(2, '0')}</span></div><div className="card-content"><span className="category-label">{activity.category}</span><h3><a className="card-link" href={`#/aktivitas/${activity.slug}`}>{activity.title}</a></h3><p>{activity.description}</p><div className="card-meta"><span>{activity.age}</span><span><Clock3 size={13}/>{activity.time}</span></div><div className="materials"><span>SIAPKAN</span>{materials}</div><span className="card-more">Lihat caranya <ArrowRight size={12}/></span></div></article>
}

function parseRoute(hash) {
  if (hash === '#/memasak') return { page: 'memasak' }
  if (hash === '#/playdate') return { page: 'playdate' }
  if (hash === '#/montessori') return { page: 'montessori' }
  if (hash === '#/semua') return { page: 'semua' }
  if (hash === '#/rencana') return { page: 'rencana' }
  if (hash === '#/worksheet') return { page: 'worksheet' }
  const m = hash.match(/^#\/(kategori|nilai|cetak|aktivitas|usia)\/([a-z0-9-]+)$/)
  if (!m) return { page: 'home' }
  if (m[1] === 'usia') return stageBySlug[m[2]] ? { page: 'usia', slug: m[2] } : { page: 'home' }
  if (m[1] === 'aktivitas') return activityBySlug[m[2]] ? { page: 'aktivitas', slug: m[2] } : { page: 'home' }
  if (m[1] === 'cetak') return printableById[m[2]] ? { page: 'cetak', id: m[2] } : { page: 'home' }
  if (m[1] === 'kategori') { const name = categories.find((c) => c !== 'Semua' && slugify(c) === m[2]); return name ? { page: 'kategori', name } : { page: 'home' } }
  return articleBySlug[m[2]] ? { page: 'nilai', slug: m[2] } : { page: 'home' }
}

function useRoute() {
  const [hash, setHash] = React.useState(window.location.hash)
  React.useEffect(() => { const onChange = () => setHash(window.location.hash); window.addEventListener('hashchange', onChange); return () => window.removeEventListener('hashchange', onChange) }, [])
  return { route: parseRoute(hash), hash }
}

function ActivityPage({ activity, saved, onToggle, plan, onTogglePlan }) {
  const sheets = activity.printables.map((id) => printableById[id]).filter(Boolean)
  const stage = stageForAge(activity.age)
  const sameCategory = activities.filter((item) => item.category === activity.category && item.slug !== activity.slug)
  // Utamakan ide pada rentang usia yang sama (kategori yang sama lebih dulu), baru kategori yang sama di rentang usia lain.
  const sameStage = stage ? activities.filter((item) => item.slug !== activity.slug && stageIncludes(stage, item.age)).sort((a, b) => Number(b.category === activity.category) - Number(a.category === activity.category)) : sameCategory
  const others = (sameStage.length > 0 ? sameStage : sameCategory).slice(0, 3)
  const isSaved = saved.includes(activity.title)
  const inPlan = plan.slugs.includes(activity.slug)
  const planFull = !inPlan && plan.slugs.length >= MAX_PLAN
  const { photo } = activity
  return <main className="subpage activity-page section-wrap">
    <a className="back-link" href={`#/kategori/${slugify(activity.category)}`}><ArrowLeft size={15}/> {activity.category}</a>
    <div className="activity-head">
      <div><div className="eyebrow">{activity.category.toUpperCase()}</div><h1>{activity.title}</h1><p className="subpage-intro">{activity.intro}</p>
        <div className="activity-chips">{stageForAge(activity.age) ? <a className="chip-link" href={`#/usia/${stageForAge(activity.age).slug}`}>{activity.age} <ArrowRight size={12}/></a> : <span>{activity.age}</span>}<span><Clock3 size={14}/> {activity.time}</span>{activity.mess && <span>Berantakan: {activity.mess}</span>}<button className={isSaved ? 'chip-button saved' : 'chip-button'} onClick={() => onToggle(activity.title)}><Heart size={14} fill={isSaved ? 'currentColor' : 'none'}/> {isSaved ? 'Tersimpan' : 'Simpan'}</button><button className={inPlan ? 'chip-button saved' : 'chip-button'} disabled={planFull} title={planFull ? `Rencana penuh (maksimal ${MAX_PLAN})` : undefined} onClick={() => onTogglePlan(activity.slug)}><Printer size={14}/> {inPlan ? 'Ada di rencana cetak' : 'Tambah ke rencana cetak'}</button></div></div>
      <div className={`card-art activity-hero ${activity.color}`}><span>{activity.icon}</span></div>
    </div>
    <div className="activity-layout">
      <div className="activity-main">
        <section><h2>Alat dan bahan</h2><ul className="check-list">{activity.materials.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><h2>Persiapan</h2><ol className="step-list">{activity.prep.map((item) => <li key={item}>{item}</li>)}</ol></section>
        <section><h2>Langkah-langkah</h2><ol className="step-list numbered">{activity.steps.map((item) => <li key={item}>{item}</li>)}</ol></section>
      </div>
      <aside className="activity-side">
        {photo && <figure className="activity-photo"><img src={photo.src} alt={photo.alt} loading="lazy" /><figcaption>Foto: {photo.credit} · <a href={photo.sourceUrl} target="_blank" rel="noreferrer">{photo.license}</a></figcaption></figure>}
        <div className="side-card"><h3>Durasi dan usia</h3><p>Sekitar <strong>{activity.time}</strong>, cocok untuk anak <strong>{activity.age}</strong>. Berhenti kapan pun anak sudah selesai.</p></div>
        <div className="side-card"><h3>Yang dipelajari anak</h3><ul>{activity.benefits.map((item) => <li key={item}>{item}</li>)}</ul></div>
        <div className="side-card"><h3>Tips dan keselamatan</h3><ul>{activity.tips.map((item) => <li key={item}>{item}</li>)}</ul></div>
        {sheets.length > 0 && <div className="side-card"><h3>Lembar pendukung</h3><ul className="side-links">{sheets.map((sheet) => <li key={sheet.id}><a href={`#/cetak/${sheet.id}`}><Printer size={13}/> {sheet.title}</a></li>)}</ul></div>}
      </aside>
    </div>
    {activity.refs && <section className="activity-refs"><h2>Referensi</h2>
      <ol className="mt-sources">{activity.refs.map((key) => { const item = references[key]; return item ? <li key={key}><div className="src-body"><span className="src-cite">{item.org}{item.year ? ` (${item.year})` : ''}. <a href={item.url} target="_blank" rel="noreferrer noopener"><em>{item.title}</em></a>{item.venue ? <>. {item.venue}</> : null}.</span><span className="src-meta">{item.type} · {new URL(item.url).hostname.replace(/^www\./, '')} · Diakses Oktober 2026</span></div></li> : null })}</ol>
      {activity.evidence && <p className="evidence-note"><strong>Catatan bukti.</strong> {activity.evidence}</p>}
    </section>}
    <p className="source-note">{activity.source ? <>Ide ini terinspirasi dari buku <em>{activity.source.title}</em> oleh {activity.source.authors}, penerbit {activity.source.publisher}. Langkah dan penjelasan ditulis ulang oleh tim Ruang Rasa dan disesuaikan untuk anak usia 2–5 tahun.</> : <>{activity.refs ? 'Ide ini disusun tim Ruang Rasa berdasarkan referensi di atas. Sesuaikan dengan kesiapan, minat, dan kondisi anakmu.' : 'Ide ini disusun tim Ruang Rasa sebagai ringkasan praktik Montessori yang umum dipakai di rumah. Sesuaikan dengan kesiapan dan minat anakmu.'}</>}</p>
    {others.length > 0 && <><div className="section-heading section-gap"><div><h2>{others.every((item) => item.category === activity.category) ? `Ide lain di ${activity.category}` : `Ide lain untuk usia ${stage ? stage.age : 'ini'}`}</h2></div></div><div className="activity-grid">{others.map((item, index) => <ActivityCard key={item.slug} activity={item} index={index} saved={saved} onToggle={onToggle} />)}</div></>}
  </main>
}

function AllPage({ saved, onToggle }) {
  return <main className="subpage section-wrap">
    <a className="back-link" href="#aktivitas"><ArrowLeft size={15}/> Beranda</a>
    <div className="eyebrow">KUMPULAN IDE</div><h1>Semua ide aktivitas</h1>
    <p className="subpage-intro">{activities.length} ide kegiatan sederhana dengan bahan sehari-hari, dikelompokkan menurut kategori. Pilih satu, siapkan bersama, lalu nikmati prosesnya.</p>
    <div className="filter-groups">
      <div className="filters collections"><span className="filters-label">Koleksi</span><a className="filter" href="#/memasak">Memasak bersama anak ({activities.filter((item) => item.collections?.includes('memasak')).length})</a><a className="filter" href="#/playdate">Panduan playdate</a></div>
      <div className="filters"><span className="filters-label">Kategori</span>{categories.filter((category) => category !== 'Semua').map((category) => <a key={category} className="filter" href={`#/kategori/${slugify(category)}`}>{category} ({activities.filter((item) => item.category === category).length})</a>)}</div>
      <div className="filters collections"><span className="filters-label">Usia</span>{stages.map((stage) => <a key={stage.slug} className="filter" href={`#/usia/${stage.slug}`}>{stage.age} ({activities.filter((item) => stageIncludes(stage, item.age)).length})</a>)}</div>
    </div>
    {categories.filter((category) => category !== 'Semua').map((category) => <section key={category}>
      <div className="section-heading section-gap"><div><h2>{category}</h2></div><a className="text-link" href={`#/kategori/${slugify(category)}`}>Halaman kategori <ArrowRight size={14}/></a></div>
      <div className="activity-grid">{activities.filter((item) => item.category === category).map((activity, index) => <ActivityCard key={activity.slug} activity={activity} index={index} saved={saved} onToggle={onToggle} />)}</div>
    </section>)}
  </main>
}

function AgePage({ stage, saved, onToggle }) {
  const items = activities.filter((item) => stageIncludes(stage, item.age))
  const groups = categories.filter((category) => category !== 'Semua').map((category) => [category, items.filter((item) => item.category === category)]).filter(([, list]) => list.length > 0)
  return <main className="subpage montessori-page section-wrap">
    <a className="back-link" href="#/montessori"><ArrowLeft size={15}/> Apa itu Montessori?</a>
    <div className="eyebrow">TAHAP PERKEMBANGAN</div>
    <h1>Usia {stage.age}</h1>
    <span className="mt-plane-name big">{stage.name}</span>
    <p className="subpage-intro">{stage.intro}<Ref ids={stage.refs} /></p>
    <div className="filters age-filters" aria-label="Pilih rentang usia">{stages.map((item) => <a key={item.slug} className={item.slug === stage.slug ? 'filter active' : 'filter'} href={`#/usia/${item.slug}`}>{item.age} ({activities.filter((activity) => stageIncludes(item, activity.age)).length})</a>)}</div>
    <div className="mt-traits">{stage.traits.map((trait) => <span key={trait}>{trait}</span>)}</div>
    {items.length === 0
      ? <div className="empty-state"><strong>Aktivitas untuk usia ini sedang disiapkan.</strong><p>Saat ini Ruang Rasa berfokus pada anak usia 2–5 tahun, yang berada di tahap 0–6 tahun.</p><a className="button-primary" href="#/usia/0-6-tahun">Lihat aktivitas usia 0–6 tahun <ArrowRight size={16}/></a></div>
      : groups.map(([category, list]) => <section key={category}>
          <div className="section-heading section-gap"><div><h2>{category}</h2></div><a className="text-link" href={`#/kategori/${slugify(category)}`}>Halaman kategori <ArrowRight size={14}/></a></div>
          <div className="activity-grid">{list.map((activity, index) => <ActivityCard key={activity.slug} activity={activity} index={index} saved={saved} onToggle={onToggle} />)}</div>
        </section>)}
    {stage.range[0] < 7 && <section><div className="section-heading section-gap"><div><h2>Lembar worksheet untuk usia ini</h2><p>Siap cetak di kertas A4. Paket per usia ada di halaman worksheet.</p></div><a className="text-link" href="#/worksheet">Lihat paket worksheet <ArrowRight size={14}/></a></div><div className="printable-grid">{printablesForAge(0, 7).map((sheet) => <PrintableCard key={sheet.id} item={sheet} />)}</div></section>}
    <section><h2>Sumber</h2><SourceList ids={stage.refs} /></section>
  </main>
}

function PrintableCard({ item }) {
  return <a className="printable-card" href={`#/cetak/${item.id}`}><span className="printable-icon">{item.icon}</span><div><h3>{item.title}</h3><p>{item.summary}</p><span className="printable-meta"><Printer size={13}/> {pageCount(item)} halaman A4 · Lihat &amp; cetak <ArrowRight size={13}/></span></div></a>
}

const isIOS = () => typeof navigator !== 'undefined' && (/iP(ad|hone|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))

function PrintButton({ label }) {
  const [tried, setTried] = React.useState(false)
  const ios = isIOS()
  const press = () => { setTried(true); try { window.print() } catch (error) { /* ditangani oleh petunjuk di bawah */ } }
  return <>
    <button type="button" className="button-primary" onClick={press}><Printer size={16}/> {label}</button>
    {(ios || tried) && <div className="print-help" role="note">
      {ios ? <><strong>Di iPad atau iPhone:</strong> jika jendela cetak tidak muncul, ketuk ikon <b>Bagikan</b> (kotak dengan panah ke atas) di Safari, lalu pilih <b>Cetak</b>. Untuk menyimpan sebagai PDF, pilih <b>Cetak</b> lalu cubit layar pratinjau ke luar (zoom), atau pilih <b>Simpan ke Berkas</b>.</> : <><strong>Jendela cetak tidak muncul?</strong> Coba tekan Ctrl+P (atau Cmd+P di Mac), atau buka menu peramban lalu pilih Cetak.</>}
    </div>}
  </>
}

const baseName = (text) => text.replace(/\s*\(.*?\)/g, '').replace(/^\d+\s+/, '').trim().toLowerCase()

function sharedMaterials(chosen) {
  const map = new Map()
  chosen.forEach((item) => {
    new Set(item.materials.map(baseName)).forEach((key) => { const row = map.get(key) || []; row.push(item.title); map.set(key, row) })
  })
  return [...map].filter(([, titles]) => titles.length > 1).map(([key, titles]) => ({ name: key.charAt(0).toUpperCase() + key.slice(1), count: titles.length }))
}

function PlanSheet({ plan, chosen, dateLabel }) {
  const shared = sharedMaterials(chosen)
  return <div className="plan-sheet">
    <div className="paper-top"><div className="paper-logo"><img className="deer-logo" src={logoScene} alt="" /></div><span>RUANG RASA <i>·</i> CHECKLIST KEGIATAN</span></div>
    <div className="paper-meta"><span>Nama: <b>{plan.name || '____________'}</b></span><span>Tanggal: <b>{dateLabel || '____________'}</b></span></div>
    <div className="paper-title">Hari ini, kita mencoba…</div>
    <h3 className="sheet-h">Checklist kegiatan</h3>
    {chosen.map((item, index) => <div className="paper-activity" key={item.slug}><div className="paper-num">{String(index + 1).padStart(2, '0')}</div><div><strong>{item.title}</strong><small>{item.age} · {item.time} · Berantakan: {item.mess.toLowerCase()}</small></div><span className="check-box" /></div>)}
    <h3 className="sheet-h">Alat dan bahan yang disiapkan</h3>
    <p className="sheet-note">Centang setelah barangnya terkumpul di nampan.</p>
    {shared.length > 0 && <div className="sheet-block"><h4>Dipakai di lebih dari satu kegiatan</h4><ul className="sheet-list">{shared.map((row) => <li key={row.name}><span className="check-box"/>{row.name} <em>({row.count} kegiatan)</em></li>)}</ul></div>}
    {chosen.map((item, index) => <div className="sheet-block" key={item.slug}>
      <h4>{String(index + 1).padStart(2, '0')} · {item.title}</h4>
      <ul className="sheet-list">{item.materials.map((material) => <li key={material}><span className="check-box"/>{material}</li>)}</ul>
      {item.prep?.length > 0 && <p className="sheet-prep"><b>Persiapan:</b> {item.prep.join(' ')}</p>}
    </div>)}
    <div className="paper-reflect"><span>Setelah mencoba, aku merasa…</span><div className="writing-line"/><div className="writing-line"/></div>
    <div className="paper-footer"><span>Tak harus sempurna. Cukup hadir bersama.</span><span>ruang rasa <i>✿</i></span></div>
  </div>
}

function PlanPrintPage({ plan }) {
  const chosen = plan.slugs.map((slug) => activityBySlug[slug]).filter(Boolean)
  const dateLabel = plan.date ? new Date(`${plan.date}T00:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''
  return <main className="printpage planpage section-wrap">
    <style>{'@page{size:A4;margin:12mm}'}</style>
    <div className="print-toolbar">
      <a className="back-link" href="#printable"><ArrowLeft size={15}/> Ubah kegiatan</a>
      <div className="eyebrow">PRATINJAU CETAK</div><h1>Checklist kegiatan hari ini</h1>
      <p className="subpage-intro">Berisi daftar kegiatan dan semua alat serta bahan yang perlu disiapkan. Periksa dulu, lalu cetak.</p>
      <div className="print-actions"><PrintButton label="Cetak checklist" /></div>
    </div>
    {chosen.length === 0 ? <div className="empty-state"><strong>Belum ada kegiatan terpilih.</strong><a className="button-primary" href="#printable">Pilih kegiatan <ArrowRight size={16}/></a></div> : <div className="paper plan-paper-full"><PlanSheet plan={plan} chosen={chosen} dateLabel={dateLabel} /></div>}
  </main>
}

function PrintPage({ item }) {
  const back = `#/kategori/${slugify(item.category)}`
  return <main className="printpage section-wrap">
    <style>{'@page{size:A4;margin:0}'}</style>
    <div className="print-toolbar">
      <a className="back-link" href={back}><ArrowLeft size={15}/> {item.category}</a>
      <div className="eyebrow">LEMBAR PRINTABLE · {item.category.toUpperCase()}</div><h1>{item.title}</h1><p className="subpage-intro">{item.summary}</p>
      <p className="print-how"><strong>Cara memakai:</strong> {item.how}</p>
      <div className="print-actions"><PrintButton label={`Cetak ${pageCount(item)} halaman`} /><span>Ukuran kertas A4. Di jendela cetak, atur skala ke 100% (jangan "fit to page") agar ukurannya pas.</span></div>
    </div>
    <PrintSheets item={item} />
  </main>
}

function SubPage({ eyebrow, title, intro, points, pointsTitle, items, saved, onToggle, sheets = [] }) {
  return <main className="subpage section-wrap">
    <a className="back-link" href="#aktivitas"><ArrowLeft size={15}/> Semua aktivitas</a>
    <div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p className="subpage-intro">{intro}</p>
    <div className="subpage-points"><div className="eyebrow">{pointsTitle}</div><ul>{points.map((point) => <li key={point}>{point}</li>)}</ul></div>
    {sheets.length > 0 && <><div className="section-heading"><div><h2>Lembar printable</h2><p>Siap dicetak di kertas A4, lengkap dengan cara memakainya.</p></div><span className="activity-count">{sheets.length} lembar</span></div>
    <div className="printable-grid">{sheets.map((sheet) => <PrintableCard key={sheet.id} item={sheet} />)}</div></>}
    <div className="section-heading section-gap"><div><h2>Aktivitas yang cocok</h2></div><span className="activity-count">{items.length} ide untuk dicoba</span></div>
    <div className="activity-grid">{items.map((activity, index) => <ActivityCard key={activity.title} activity={activity} index={index} saved={saved} onToggle={onToggle} />)}</div>
  </main>
}

const MAX_PLAN = 8
const PLAN_KEY = 'rr-plan-v1'
const DEFAULT_PLAN = { slugs: ['memindahkan-kacang', 'mencuci-daun', 'menceritakan-gambar'], name: '', date: '' }

function loadPlan() {
  try {
    const raw = JSON.parse(window.localStorage.getItem(PLAN_KEY))
    if (raw && Array.isArray(raw.slugs)) return { slugs: raw.slugs.filter((slug) => activityBySlug[slug]).slice(0, MAX_PLAN), name: String(raw.name || '').slice(0, 30), date: String(raw.date || '') }
  } catch (error) { /* penyimpanan tidak tersedia: pakai bawaan */ }
  return DEFAULT_PLAN
}

const shortMaterials = (activity) => activity.materials.slice(0, 2).map((item) => item.replace(/\s*\(.*\)/, '')).join(', ')

function PlanPaper({ plan, chosen, dateLabel }) {
  return (
    <div className="paper-wrap"><div className="paper"><div className="paper-top"><div className="paper-logo"><img className="deer-logo" src={logoScene} alt="" /></div><span>RUANG RASA <i>·</i> CHECKLIST KEGIATAN</span></div>
      <div className="paper-meta"><span>Nama: <b>{plan.name || '____________'}</b></span><span>Tanggal: <b>{dateLabel || '____________'}</b></span></div>
      <div className="paper-title">Hari ini, kita mencoba…</div>
      {chosen.length === 0 ? <div className="paper-empty">Pilih kegiatan di samping, dan lembar ini akan terisi.</div> : chosen.map((item, index) => <div className="paper-activity" key={item.slug}><div className="paper-num">{String(index + 1).padStart(2, '0')}</div><div><strong>{item.title}</strong><small>{item.age} · {item.time}<br/>Siapkan: {shortMaterials(item)}</small></div><span className="check-box"/></div>)}
      <div className="paper-reflect"><span>Setelah mencoba, aku merasa…</span><div className="writing-line"/><div className="writing-line"/></div>
      <div className="paper-footer"><span>Tak harus sempurna. Cukup hadir bersama.</span><span>ruang rasa <i>✿</i></span></div></div><div className="paper-deco"><Spark/></div></div>
  )
}

function Planner({ plan, setPlan, saved }) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [category, setCategory] = React.useState('Semua')
  const chosen = plan.slugs.map((slug) => activityBySlug[slug]).filter(Boolean)
  const favourites = activities.filter((item) => saved.includes(item.title))
  const needle = query.trim().toLowerCase()
  const list = activities.filter((item) => (category === 'Semua' || item.category === category) && (!needle || item.title.toLowerCase().includes(needle)))
  const dateLabel = plan.date ? new Date(`${plan.date}T00:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''
  const toggle = (slug) => setPlan((current) => current.slugs.includes(slug) ? { ...current, slugs: current.slugs.filter((item) => item !== slug) } : current.slugs.length >= MAX_PLAN ? current : { ...current, slugs: [...current.slugs, slug] })
  const move = (index, step) => setPlan((current) => { const slugs = [...current.slugs]; const target = index + step; if (target < 0 || target >= slugs.length) return current; [slugs[index], slugs[target]] = [slugs[target], slugs[index]]; return { ...current, slugs } })
  return <section className="printable section-wrap" id="printable">
    <div className="printable-copy">
      <div className="eyebrow">CHECKLIST KEGIATAN</div>
      <h2>Pilih kegiatan,<br/><em>bawa pulang daftarnya.</em></h2>
      <p>Pilih kegiatan yang ingin dicoba hari ini. Checklist yang dicetak memuat daftar kegiatan beserta alat dan bahan lengkap untuk disiapkan. Pilihanmu tersimpan di peramban ini.</p>
      <div className="plan-fields">
        <label>Nama si kecil<input type="text" value={plan.name} maxLength={30} placeholder="Contoh: Aira" onChange={(event) => setPlan((current) => ({ ...current, name: event.target.value }))} /></label>
        <label>Tanggal<input type="date" value={plan.date} onChange={(event) => setPlan((current) => ({ ...current, date: event.target.value }))} /></label>
      </div>
      <div className="plan-chosen">
        <strong>Kegiatan terpilih ({chosen.length}/{MAX_PLAN})</strong>
        {chosen.length === 0 ? <p className="plan-empty">Belum ada kegiatan. Klik "Pilih kegiatan" untuk menambahkan.</p> : <ol>{chosen.map((item, index) => <li key={item.slug}><span className="plan-title"><span aria-hidden="true">{item.icon}</span> {item.title}</span><span className="plan-btns"><button type="button" aria-label={`Naikkan ${item.title}`} disabled={index === 0} onClick={() => move(index, -1)}>↑</button><button type="button" aria-label={`Turunkan ${item.title}`} disabled={index === chosen.length - 1} onClick={() => move(index, 1)}>↓</button><button type="button" aria-label={`Hapus ${item.title}`} onClick={() => toggle(item.slug)}><X size={14}/></button></span></li>)}</ol>}
      </div>
      <div className="plan-actions">
        <button type="button" className="button-primary" aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? 'Tutup pilihan' : 'Pilih kegiatan'}</button>
        <a className={chosen.length === 0 ? 'button-primary print-button is-disabled' : 'button-primary print-button'} href="#/rencana" aria-disabled={chosen.length === 0} onClick={(event) => { if (chosen.length === 0) event.preventDefault() }}><Printer size={16}/> Lihat checklist</a>
        {favourites.length > 0 && <button type="button" className="text-link as-button" onClick={() => setPlan((current) => ({ ...current, slugs: favourites.map((item) => item.slug).slice(0, MAX_PLAN) }))}>Pakai favorit ({favourites.length})</button>}
        {chosen.length > 0 && <button type="button" className="text-link as-button" onClick={() => setPlan((current) => ({ ...current, slugs: [] }))}>Kosongkan</button>}
      </div>
      {open && <div className="plan-picker">
        <input type="search" className="plan-search" value={query} placeholder="Cari kegiatan…" aria-label="Cari kegiatan" onChange={(event) => setQuery(event.target.value)} />
        <div className="plan-cats">{categories.map((name) => <button key={name} type="button" className={name === category ? 'filter active' : 'filter'} onClick={() => setCategory(name)}>{name}</button>)}</div>
        <p className="plan-note">Pilih sampai {MAX_PLAN} kegiatan agar muat satu halaman. {chosen.length >= MAX_PLAN ? 'Batas tercapai.' : ''}</p>
        <ul className="plan-list">{list.length === 0 ? <li className="plan-empty">Tidak ada kegiatan yang cocok.</li> : list.map((item) => { const checked = plan.slugs.includes(item.slug); return <li key={item.slug}><label className={checked ? 'checked' : ''}><input type="checkbox" checked={checked} disabled={!checked && chosen.length >= MAX_PLAN} onChange={() => toggle(item.slug)} /><span className="plan-item-title"><span aria-hidden="true">{item.icon}</span> {item.title}</span><span className="plan-item-meta">{item.age} · {item.time}</span></label></li> })}</ul>
      </div>}
    </div>
    <PlanPaper plan={plan} chosen={chosen} dateLabel={dateLabel} />
  </section>
}

function Home({ saved, toggleSaved, plan, setPlan }) {
  return <main>
      <section className="hero" id="beranda"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot"/> RUANG KECIL UNTUK BERTUMBUH</div><h1>Belajar paling baik,<br/>dimulai dari <em>rumah.</em></h1><p className="hero-text">Ide aktivitas sederhana yang membantu si kecil mengenal dunia—satu kegiatan kecil, satu hari yang penuh rasa.</p><div className="hero-actions"><a className="button-primary" href="#aktivitas">Jelajahi aktivitas <ArrowRight size={17}/></a><a className="text-link" href="#/montessori">Apa itu Montessori? <ArrowRight size={15}/></a></div><div className="hero-note"><span className="avatars"><i>🌼</i><i>🍊</i><i>🌱</i></span><span>Dibuat untuk tumbuh bersama,<br/><strong>tanpa harus sempurna.</strong></span></div></div>
        <div className="hero-art"><div className="art-frame"><div className="art-blob"/><img className="hero-mark" src={logoArch} alt="Anak kecil dan rusa di bawah lengkung daun" width="230" height="210" /><div className="art-caption">sederhana · bermakna · bersama</div></div><span className="sparkle sparkle-one"><Spark/></span><span className="sparkle sparkle-two"><Spark/></span><span className="art-flower">✿</span></div>
      </section>

      <section className="values-strip"><a className="value-link" href="#/nilai/ikuti-ritme-anak"><span className="value-icon"><Heart size={17}/></span><span>Ikuti ritme anak</span></a><span className="value-separator"><Spark/></span><a className="value-link" href="#/nilai/pakai-yang-ada-di-rumah"><span className="value-icon"><Leaf size={17}/></span><span>Pakai yang ada di rumah</span></a><span className="value-separator"><Spark/></span><a className="value-link" href="#/nilai/proses-lebih-berarti"><span className="value-icon"><Sparkles size={17}/></span><span>Proses lebih berarti dari hasil</span></a></section>

      <section className="activities section-wrap" id="aktivitas"><div className="section-heading"><div><div className="eyebrow">IDE KECIL, MAKNA BESAR</div><h2>Mulai dari yang <em>sederhana.</em></h2><p>Pilih satu kegiatan, siapkan bersama, lalu nikmati prosesnya.</p></div><span className="activity-count">{activities.length} ide untuk dicoba <span>↘</span></span></div>
        <div className="filter-groups">
          <div className="filters collections" aria-label="Koleksi"><span className="filters-label">Koleksi</span><a className="filter" href="#/memasak">Memasak bersama anak ({activities.filter((item) => item.collections?.includes('memasak')).length})</a><a className="filter" href="#/playdate">Panduan playdate</a></div>
          <div className="filters" aria-label="Kategori aktivitas"><span className="filters-label">Kategori</span><a className="filter active" href="#/semua">Semua ({activities.length})</a>{categories.filter((category) => category !== 'Semua').map((category) => <a key={category} className="filter" href={`#/kategori/${slugify(category)}`}>{category}</a>)}</div>
        </div>
        <div className="activity-grid">{activities.slice(0, 8).map((activity, index) => <ActivityCard key={activity.title} activity={activity} index={index} saved={saved} onToggle={toggleSaved} />)}</div>
        <div className="see-all"><a className="button-primary" href="#/semua">Lihat semua {activities.length} ide <ArrowRight size={16}/></a></div>
      </section>

      <section className="philosophy" id="filosofi"><div className="philosophy-inner"><div className="philosophy-art"><div className="quote-mark">“</div><img className="deer-logo" src={logoScene} alt="Anak kecil memberi daun kepada seekor rusa" /><div className="leaf-doodle">✿</div><span className="philosophy-sticker">belajar<br/>dengan hati</span></div><div className="philosophy-copy"><div className="eyebrow">SEBUAH CARA PANDANG</div><h2>Anak bukan wadah kosong.<br/>Mereka <em>penjelajah kecil.</em></h2><p>Montessori adalah pendekatan belajar yang menghormati rasa ingin tahu dan kemandirian anak. Kita menyiapkan lingkungan, memberi ruang untuk mencoba, lalu hadir untuk menemani.</p><p className="philosophy-note">Tak perlu alat khusus atau jadwal yang kaku. Benda sehari-hari dan waktu bersama sudah cukup untuk memulai.</p><div className="philosophy-links"><a className="text-link" href="#/montessori">Pelajari tentang Montessori <ArrowRight size={15}/></a><a className="text-link" href="#aktivitas">Temukan kegiatan pertama <ArrowRight size={15}/></a></div></div></div></section>

      <Planner plan={plan} setPlan={setPlan} saved={saved} />

      <section className="closing"><div className="closing-flower">✿</div><div className="eyebrow">TIDAK TERBURU-BURU</div><h2>Tumbuh itu bukan lomba.<br/><em>Hari ini, hadir saja.</em></h2><p>Satu momen kecil bersama sudah berarti banyak.</p><a className="button-light" href="#aktivitas">Pilih aktivitas hari ini <ArrowRight size={16}/></a></section>
    </main>
}

function App() {
  const [saved, setSaved] = React.useState([])
  const [plan, setPlan] = React.useState(loadPlan)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const { route, hash } = useRoute()
  const previousPage = React.useRef(route.page)

  React.useEffect(() => { try { window.localStorage.setItem(PLAN_KEY, JSON.stringify(plan)) } catch (error) { /* penyimpanan tidak tersedia */ } }, [plan])
  React.useEffect(() => { setMenuOpen(false) }, [hash])

  function togglePlan(slug) {
    setPlan((current) => current.slugs.includes(slug) ? { ...current, slugs: current.slugs.filter((item) => item !== slug) } : current.slugs.length >= MAX_PLAN ? current : { ...current, slugs: [...current.slugs, slug] })
  }

  function toggleSaved(title) {
    setSaved((current) => current.includes(title) ? current.filter((item) => item !== title) : [...current, title])
  }

  React.useEffect(() => {
    const id = hash.startsWith('#/') ? '' : hash.slice(1)
    if (route.page !== 'home') window.scrollTo({ top: 0, behavior: 'instant' })
    else if (id) document.getElementById(id)?.scrollIntoView()
    else if (previousPage.current !== 'home') window.scrollTo({ top: 0, behavior: 'instant' })
    previousPage.current = route.page
  }, [route.page, route.name, route.slug, route.id, hash])

  let page = <Home saved={saved} toggleSaved={toggleSaved} plan={plan} setPlan={setPlan} />
  if (route.page === 'kategori') page = <SubPage eyebrow="KATEGORI" title={route.name} intro={categoryInfo[route.name].intro} pointsTitle="CATATAN KECIL" points={categoryInfo[route.name].tips} items={activities.filter((item) => item.category === route.name)} sheets={printables.filter((item) => item.category === route.name)} saved={saved} onToggle={toggleSaved} />
  if (route.page === 'montessori') page = <MontessoriPage />
  if (route.page === 'usia') page = <AgePage stage={stageBySlug[route.slug]} saved={saved} onToggle={toggleSaved} />
  if (route.page === 'playdate') page = <PlaydatePage />
  if (route.page === 'memasak') page = <SubPage eyebrow="KOLEKSI" title="Memasak bersama anak" intro="Dapur adalah ruang belajar yang nyata: anak berhitung, menakar, mengikuti langkah, dan mencoba rasa baru. Pilih satu resep sederhana dan bagi tugas sesuai kemampuan anak." pointsTitle="SEBELUM MULAI" points={['Cuci tangan dengan sabun sebelum dan sesudah memasak, dan kenakan celemek.', 'Bagi tugas sesuai kemampuan: anak mencuci, mengaduk, menuang, dan menata. Kompor, oven, pisau tajam, dan blender hanya untuk orang dewasa.', 'Tanyakan lebih dulu soal alergi (telur, susu, gluten, kacang) pada anak yang ikut makan.', 'Madu tidak untuk anak di bawah 1 tahun.', 'Biarkan berantakan sedikit. Prosesnya lebih penting daripada hasilnya.']} items={activities.filter((item) => item.collections?.includes('memasak'))} sheets={['kartu-makanan', 'utuh-dan-potong'].map((id) => printableById[id])} saved={saved} onToggle={toggleSaved} />
  if (route.page === 'semua') page = <AllPage saved={saved} onToggle={toggleSaved} />
  if (route.page === 'aktivitas') page = <ActivityPage activity={activityBySlug[route.slug]} saved={saved} onToggle={toggleSaved} plan={plan} onTogglePlan={togglePlan} />
  if (route.page === 'worksheet') page = <ShopPage />
  if (route.page === 'rencana') page = <PlanPrintPage plan={plan} />
  if (route.page === 'cetak') page = <PrintPage item={printableById[route.id]} />
  if (route.page === 'nilai') { const article = articleBySlug[route.slug]; page = <ArticlePage article={article}><section className="art-section"><div className="section-heading"><div><h2>Aktivitas untuk dicoba</h2><p>Ide yang sejalan dengan artikel ini.</p></div></div><div className="activity-grid">{article.related.map((slug, index) => <ActivityCard key={slug} activity={activityBySlug[slug]} index={index} saved={saved} onToggle={toggleSaved} />)}</div></section></ArticlePage> }

  return <>
    <header className="site-header"><a className="brand" href="#beranda"><img className="brand-logo" src={logoHorizontal} alt="Ruang Rasa" width="150" height="47" /></a>
      <nav id="menu-utama" className={menuOpen ? 'open' : ''} aria-label="Menu utama"><a href="#aktivitas">Aktivitas</a><a href="#/semua" className="nav-extra">Semua ide</a><a href="#/montessori">Tentang Montessori</a><a href="#/playdate" className="nav-extra">Panduan playdate</a><a href="#printable">Checklist</a><a href="#/worksheet">Worksheet</a></nav>
      <div className="header-right"><a className="header-cta" href="#aktivitas">Temukan ide <ArrowRight size={15}/></a><button type="button" className="menu-toggle" aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'} aria-expanded={menuOpen} aria-controls="menu-utama" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button></div>
    </header>

    {page}

    <footer><a className="footer-brand" href="#beranda"><img className="footer-logo" src={logoHorizontal} alt="Ruang Rasa" width="108" height="34" /></a><span>Merawat rasa ingin tahu, satu hari kecil pada satu waktu.</span><span className="privacy-note"><Users size={14}/> Tanpa akun. Tanpa pengumpulan data.</span><span className="copyright">© 2026 Ruang Rasa</span></footer>
  </>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)
