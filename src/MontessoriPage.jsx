import React from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { activities } from './activities.js'
import { stages, stageIncludes } from './stages.js'

// Isi halaman "Apa itu Montessori?". Setiap klaim faktual harus punya rujukan di daftar `sources`.

const timeline = [
  { year: '1870', text: 'Maria Montessori lahir di Chiaravalle, Italia.', ref: [2, 3] },
  { year: '1896', text: 'Ia lulus dari fakultas kedokteran Universitas Roma dan tercatat sebagai salah satu dokter perempuan pertama di Italia.', ref: [2, 3] },
  { year: '1907', text: 'Ia membuka Casa dei Bambini ("Rumah Anak-Anak"), sekolah untuk anak prasekolah di kawasan San Lorenzo, Roma. Dari sinilah metodenya berkembang.', ref: [1] },
  { year: '1909', text: 'Buku metodenya terbit dalam bahasa Italia. Terjemahan bahasa Inggrisnya terbit pada 1912, dan gagasannya menyebar ke berbagai negara.', ref: [1] },
  { year: '1929', text: 'Ia mendirikan Association Montessori Internationale (AMI) untuk menjaga mutu penerapan metodenya.', ref: [2] },
  { year: '1952', text: 'Maria Montessori wafat di Noordwijk, Belanda.', ref: [2, 3] },
]

const ideas = [
  { title: 'Pikiran yang menyerap', text: 'Menurut Montessori, pada tahun-tahun awal (sekitar 0–6 tahun) anak menyerap bahasa, kebiasaan, dan suasana di sekitarnya hampir tanpa disadari. Karena itu, apa yang ada di lingkungan anak sangat berarti.', ref: [4, 5] },
  { title: 'Masa peka', text: 'Ada masa-masa ketika anak sangat tertarik dan mudah menyerap kemampuan tertentu, misalnya bahasa, keteraturan, atau gerak. Masa ini bersifat sementara dan berbeda pada tiap anak, sehingga orang dewasa perlu mengamati.', ref: [5] },
  { title: 'Lingkungan yang disiapkan', text: 'Ruang belajar ditata supaya anak bisa mengambil, memakai, dan mengembalikan bahan sendiri. Bahannya nyata, teratur, dan mudah dijangkau.', ref: [5, 8] },
  { title: 'Belajar dengan kegiatan sendiri', text: 'Anak memilih kegiatan dan bekerja dengan bahan yang bisa dipegang. Pekerjaan yang dipilih sendiri, dengan waktu yang cukup tanpa diganggu, membantu anak berkonsentrasi.', ref: [6] },
  { title: 'Kebebasan dalam batas', text: 'Anak bebas memilih dan bergerak, tetapi dalam aturan yang jelas dan konsisten, misalnya merawat bahan dan menghormati teman.', ref: [8] },
  { title: 'Orang dewasa sebagai pemandu', text: 'Tugas utama pemandu (guru atau orang tua) adalah mengamati, menyiapkan lingkungan, dan memperkenalkan kegiatan baru ketika anak sudah siap dan tertarik, bukan mengajar semuanya lewat ceramah.', ref: [8] },
]

const areas = [
  { name: 'Kehidupan praktis', text: 'Kegiatan sehari-hari seperti menuang, memindahkan, dan merawat diri serta lingkungan. Melatih koordinasi, konsentrasi, dan kemandirian.', link: '#/kategori/kehidupan-praktis' },
  { name: 'Sensorial', text: 'Mengasah indra lewat warna, tekstur, ukuran, dan bentuk. Menyiapkan anak untuk matematika dan bahasa.', link: '#/kategori/sensorial' },
  { name: 'Bahasa', text: 'Kemampuan berbicara menjadi dasar untuk menulis dan membaca, antara lain lewat huruf amplas dan abjad bergerak.', link: '#/kategori/bahasa' },
  { name: 'Matematika', text: 'Konsep angka dikenalkan dengan benda konkret yang bisa dipegang, mulai dari berhitung sampai operasi dasar.', link: '#/kategori/matematika' },
  { name: 'Budaya', text: 'Geografi, sejarah, sains, alam, serta seni dan musik. Anak mengenal dunia di sekitarnya, dari yang paling dekat.', link: '#/kategori/budaya' },
]

const homeTips = [
  'Tata sudut bermain dengan rak rendah dan wadah kecil agar anak bisa mengambil dan mengembalikan mainan sendiri.',
  'Beri pilihan terbatas, misalnya "mau yang ini atau yang itu?", supaya anak bebas memilih dalam batas yang jelas.',
  'Libatkan anak dalam pekerjaan rumah yang nyata dan aman, seperti menuang, mengelap, atau melipat.',
  'Amati dulu apa yang sedang menarik minatnya, lalu siapkan kegiatan yang sesuai.',
  'Tidak perlu perabot atau alat mahal. Yang terpenting adalah menyiapkan rumah agar sesuai dengan cara anak belajar.',
]

export const sources = [
  { n: 1, type: 'Ensiklopedia', org: 'Encyclopaedia Britannica', title: 'Maria Montessori', url: 'https://www.britannica.com/biography/Maria-Montessori' },
  { n: 2, type: 'Ensiklopedia daring', org: 'Wikipedia', title: 'Maria Montessori', url: 'https://en.wikipedia.org/wiki/Maria_Montessori' },
  { n: 3, type: 'Organisasi Montessori', org: 'Montessori Australia', title: 'Biography of Dr. Maria Montessori', url: 'https://montessori.org.au/node/4604' },
  { n: 4, type: 'Organisasi Montessori', org: 'Association Montessori Internationale (AMI)', title: 'Four Planes of Development', url: 'https://archives.montessori-ami.org/help/glossary/four-planes-development' },
  { n: 5, type: 'Lembaga pendidikan', org: 'Montessori Academy Australia', title: 'Montessori principles in education', url: 'https://montessoriacademy.com.au/montessori-education/montessori-principles-education/' },
  { n: 6, type: 'Organisasi Montessori', org: 'American Montessori Society (AMS)', title: '5 Core Components of Montessori Education', url: 'https://amshq.org/corecomponents' },
  { n: 7, type: 'Ensiklopedia daring', org: 'Wikipedia', title: 'Montessori in the United States', url: 'https://en.wikipedia.org/wiki/Montessori_in_the_United_States' },
  { n: 8, type: 'Lembaga pendidikan', org: 'Montessori Academy Australia', title: 'Montessori Guides: Parents\u2019 Role in Fostering Independence', url: 'https://montessoriacademy.com.au/montessori-at-home/getting-started/parent-as-montessori-guide/' },
  { n: 9, type: 'Jurnal ilmiah', org: 'Lillard, A. S., & Else-Quest, N.', year: 2006, title: 'Evaluating Montessori Education', venue: 'Science', url: 'https://pcl.sitehost.iu.edu/rgoldsto/courses/cogscilearning/montessorieval.pdf' },
  { n: 10, type: 'Jurnal ilmiah', org: 'Marshall, C.', year: 2017, title: 'Montessori education: a review of the evidence base', venue: 'npj Science of Learning', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6161506/' },
  { n: 11, type: 'Universitas', org: 'Cornell University', title: 'What the Evidence Says About Montessori Education', url: 'https://evidencebasedliving.human.cornell.edu/uncategorized/what-the-evidence-says-about-montessori-education' },
  { n: 13, type: 'Organisasi pendidikan', org: 'Montessori Public', year: 2022, title: 'Erdkinder in public Montessori schools', url: 'https://www.montessoripublic.org/2022/05/erdkinder-in-public-montessori-schools/' },
  { n: 14, type: 'Organisasi Montessori', org: 'Association Montessori Internationale (AMI)', title: 'Four Planes of Development: Fourth Plane', url: 'https://archives.montessori-ami.org/help/glossary/four-planes-development-fourth-plane' },
  { n: 15, type: 'Artikel esai', org: 'Wolff, P., & Seldin, T.', year: 2019, title: 'The needs of the fourth plane of development', venue: 'Montessori Post', url: 'https://www.montessoripost.com/2019/12/01/the-needs-of-the-fourth-plane-of-development/' },
  { n: 16, type: 'Ensiklopedia daring', org: 'Wikipedia', title: 'Erdkinder', url: 'https://en.wikipedia.org/wiki/Erdkinder' },
  { n: 17, type: 'Organisasi Montessori', org: 'Association Montessori Internationale (AMI)', title: 'Four Planes of Development: Second Plane', url: 'https://archives.montessori-ami.org/help/glossary/four-planes-development-second-plane' },
  { n: 12, type: 'Jurnal ilmiah', org: 'Jurnal Agapedia (Universitas Pendidikan Indonesia)', title: 'Penerapan Pendekatan Montessori dalam Pendidikan Anak Usia Dini di Indonesia: Tantangan dan Peluang', url: 'https://ejournal.upi.edu/index.php/agapedia/article/view/85925' },
]

sources.sort((a, b) => a.n - b.n)

const domainOf = (url) => new URL(url).hostname.replace(/^www\./, '')
const sourceLabel = (id) => { const item = sources.find((entry) => entry.n === id); return item ? `${item.org}, ${item.title}` : '' }

// Hash URL dipakai untuk routing, jadi rujukan menggulir ke sumber lewat JavaScript (tanpa mengubah hash).
export function goToSource(event, id) {
  event.preventDefault()
  const el = document.getElementById(`sumber-${id}`)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  el.classList.add('mt-flash')
  setTimeout(() => el.classList.remove('mt-flash'), 1800)
}

export function backToText(n) {
  const el = document.querySelector(`[data-cite="${n}"]`)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  el.classList.add('mt-flash-cite')
  setTimeout(() => el.classList.remove('mt-flash-cite'), 1800)
}

export const Ref = ({ ids }) => <sup className="mt-ref">[{ids.map((id, i) => <React.Fragment key={id}>{i > 0 && ', '}<a href={`#sumber-${id}`} data-cite={id} data-tip={sourceLabel(id)} onClick={(event) => goToSource(event, id)} aria-label={`Sumber ${id}: ${sourceLabel(id)}`}>{id}</a></React.Fragment>)}]</sup>

export function SourceList({ ids }) {
  const list = ids ? sources.filter((item) => ids.includes(item.n)) : sources
  const [cited, setCited] = React.useState(null)
  React.useEffect(() => { setCited(new Set([...document.querySelectorAll('[data-cite]')].map((el) => Number(el.getAttribute('data-cite'))))) }, [])
  return <ol className="mt-sources">{list.map((item) => <li key={item.n} id={`sumber-${item.n}`}>
    <div className="src-body">
      <span className="src-cite">{item.org}{item.year ? ` (${item.year})` : ''}. <a href={item.url} target="_blank" rel="noreferrer noopener"><em>{item.title}</em></a>{item.venue ? <>. {item.venue}</> : null}.</span>
      <span className="src-meta">{item.type} · {domainOf(item.url)} · Diakses Oktober 2026{cited && cited.has(item.n) ? <> · <button type="button" className="src-back" onClick={() => backToText(item.n)}>↑ Kembali ke teks</button></> : null}</span>
    </div>
  </li>)}</ol>
}

export default function MontessoriPage() {
  return <main className="subpage montessori-page section-wrap">
    <a className="back-link" href="#filosofi"><ArrowLeft size={15}/> Beranda</a>
    <div className="eyebrow">TENTANG MONTESSORI</div>
    <h1>Apa itu Montessori?</h1>
    <p className="subpage-intro">Montessori adalah pendekatan pendidikan yang berpusat pada anak. Pendekatan ini dikembangkan oleh Maria Montessori, dokter dan pendidik asal Italia, sejak awal abad ke-20.<Ref ids={[1]} /></p>

    <div className="mt-summary">
      <div><strong>Intinya</strong><span>Anak belajar paling baik lewat kegiatan yang ia pilih sendiri, dengan bahan nyata, di lingkungan yang ditata dan didampingi pemandu yang mengamati.</span></div>
      <div><strong>Untuk siapa</strong><span>Dirancang untuk anak sejak usia dini sampai remaja. Ruang Rasa berfokus pada anak 2–5 tahun di rumah.</span></div>
      <div><strong>Ruang Rasa dan Montessori</strong><span>Situs ini terinspirasi dari gagasan Montessori. Ia bukan sekolah atau lembaga resmi Montessori.</span></div>
    </div>

    <section>
      <h2>Siapa Maria Montessori?</h2>
      <ol className="mt-timeline">{timeline.map((item) => <li key={item.year}><span className="mt-year">{item.year}</span><p>{item.text}<Ref ids={item.ref} /></p></li>)}</ol>
    </section>

    <section>
      <h2>Gagasan utama</h2>
      <div className="mt-grid">{ideas.map((item) => <article key={item.title} className="side-card"><h3>{item.title}</h3><p>{item.text}<Ref ids={item.ref} /></p></article>)}</div>
    </section>

    <section>
      <h2>Empat tahap perkembangan</h2>
      <p className="mt-lead">Montessori membagi perkembangan manusia menjadi empat tahap yang masing-masing berlangsung sekitar enam tahun.<Ref ids={[4]} /> Ruang Rasa berada di tahap pertama.</p>
      <p className="mt-lead">Pada tahap usia sekolah (6–12 tahun), pendidikan Montessori menekankan imajinasi, rasa ingin tahu intelektual, dan kemampuan sosial.<Ref ids={[17]} /> Untuk tahap remaja, Montessori mengusulkan Erdkinder ("anak-anak tanah"): belajar lewat kerja nyata di lahan dan komunitas.<Ref ids={[13, 16]} /> Tahap dewasa muda digambarkan sebagai masa memantapkan identitas dan mencari kontribusi yang bermakna bagi masyarakat.<Ref ids={[14]} /> Montessori sendiri menulis relatif sedikit tentang tahap ini, sehingga banyak penjelasannya berasal dari tafsir pendidik sesudahnya.<Ref ids={[15]} /></p>
      <div className="mt-planes">{stages.map((item) => { const count = activities.filter((activity) => stageIncludes(item, activity.age)).length; return <a key={item.slug} href={`#/usia/${item.slug}`} className="mt-plane"><strong>{item.age}</strong><span className="mt-plane-name">{item.name}</span><p>{item.note}</p><span className="mt-plane-link">{count > 0 ? `${count} aktivitas` : 'Segera hadir'} <ArrowRight size={13}/></span></a> })}</div>
    </section>

    <section>
      <h2>Area belajar untuk anak usia 3–6 tahun</h2>
      <p className="mt-lead">Banyak sekolah Montessori mengelompokkan kegiatan anak prasekolah ke dalam lima area. Kategori di Ruang Rasa mengikuti pembagian ini. Sumber berbeda kadang memakai jumlah dan nama area yang sedikit berbeda.</p>
      <div className="mt-areas">{areas.map((item) => <div key={item.name} className="mt-area"><h3>{item.name}</h3><p>{item.text}</p>{item.link ? <a className="text-link" href={item.link}>Lihat aktivitas <ArrowRight size={14}/></a> : <span className="mt-soon">Belum tersedia</span>}</div>)}</div>
    </section>

    <section>
      <h2>Menerapkannya di rumah</h2>
      <p className="mt-lead">Montessori di rumah bukan soal membeli perabot khusus, melainkan menyiapkan rumah sesuai cara anak belajar.<Ref ids={[8]} /></p>
      <ul className="check-list">{homeTips.map((item) => <li key={item}>{item}</li>)}</ul>
      <div className="print-actions"><a className="button-primary" href="#/semua">Jelajahi aktivitas <ArrowRight size={16}/></a><a className="text-link" href="#printable">Lihat lembar printable <ArrowRight size={14}/></a></div>
    </section>

    <section>
      <h2>Hal yang perlu diketahui</h2>
      <div className="mt-grid two">
        <article className="side-card"><h3>Nama "Montessori" tidak dilindungi</h3><p>Nama ini tidak dimiliki siapa pun sehingga sekolah mana pun boleh memakainya, tanpa harus mengikuti metodenya.<Ref ids={[7]} /> Kalau memilih sekolah, tanyakan kualifikasi guru dan akreditasinya (misalnya dari AMI atau AMS), dan lihat langsung kegiatan belajarnya.<Ref ids={[6]} /></p></article>
        <article className="side-card"><h3>Bagaimana buktinya?</h3><p>Sejumlah penelitian melaporkan hasil yang baik. Salah satunya studi 2006 di Science yang memakai undian penerimaan sekolah, meski sampelnya kecil.<Ref ids={[9]} /> Tinjauan 2017 menyimpulkan bahwa evaluasi yang sudah melalui telaah sejawat jumlahnya sedikit dan punya keterbatasan metode.<Ref ids={[10, 11]} /> Jadi hasilnya menjanjikan, tetapi belum bisa dianggap pasti.</p></article>
        <article className="side-card"><h3>Penerapannya beragam</h3><p>Karena nama Montessori tidak dilindungi, mutu dan cara penerapannya berbeda antar sekolah, sehingga hasil penelitian pun bisa berbeda.<Ref ids={[10]} /> Di Indonesia, pendekatan ini banyak dipakai di lembaga PAUD, terutama di kota besar.<Ref ids={[12]} /></p></article>
        <article className="side-card"><h3>Bukan satu-satunya cara</h3><p>Tidak ada satu pendekatan yang cocok untuk semua anak. Ambil gagasan yang terasa pas untuk keluargamu, dan sesuaikan dengan kesiapan serta minat anak.</p></article>
      </div>
    </section>

    <section>
      <h2>Sumber</h2>
      <SourceList />
      <p className="source-note">Ringkasan ini disusun tim Ruang Rasa dari sumber-sumber di atas dan terakhir ditinjau pada Oktober 2026. Untuk istilah atau kebijakan resmi, rujuklah langsung situs organisasi Montessori terkait.</p>
    </section>
  </main>
}
