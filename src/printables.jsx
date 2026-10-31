import React from 'react'

// Semua halaman digambar sebagai SVG berukuran A4 (210 x 297 mm), jadi hasil cetak presisi di ukuran berapa pun.
const OLIVE = '#6B694B'
const SAGE = '#A0A185'
const SAND = '#EADECA'
const TERRA = '#9A7C5B'
const INK = '#43392f'
const LINE = '#b9b49c'
const PALETTE = ['#d9544d', '#f2a33a', '#f2c230', '#6fa86b', '#3b7dd8', '#8e6bb8']

const chunk = (list, size) => Array.from({ length: Math.ceil(list.length / size) }, (_, i) => list.slice(i * size, i * size + size))
const num = (n) => Number(n.toFixed(2))

// Foto asli: taruh file di src/foto/<kata>.jpg (huruf kecil, spasi jadi "-", mis. "es-krim.jpg", "kura-kura.jpg").
// Jika fotonya ada, kartu memakainya; jika belum, kartu tetap memakai emoji.
const FOTO = import.meta.glob('./foto/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' })
const fotoUrl = (word) => {
  const slug = word.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const key = Object.keys(FOTO).find((k) => k.replace(/^\.\/foto\//, '').replace(/\.[a-z]+$/, '') === slug)
  return key ? FOTO[key] : null
}
// Gambar kartu: foto bila ada (dipotong rapi di dalam kotak), emoji bila tidak.
function Pic({ word, emoji, x, y, w, h, className = 's-emoji-l' }) {
  const url = fotoUrl(word)
  if (url) return <svg x={x} y={y} width={w} height={h}><image href={url} x="0" y="0" width={w} height={h} preserveAspectRatio="xMidYMid slice" /></svg>
  return <text x={x + w / 2} y={y + h / 2} className={className} textAnchor="middle" dominantBaseline="central">{emoji}</text>
}

const wrap = (line, max = 92) => line.split(' ').reduce((rows, word) => { const last = rows[rows.length - 1]; if (last !== undefined && (last + ' ' + word).length <= max) rows[rows.length - 1] = last + ' ' + word; else rows.push(word); return rows }, [])

function Lines({ x, y, lh = 5.2, lines, className = 's-text', anchor }) {
  return <>{lines.flatMap((line) => wrap(line)).map((line, i) => <text key={i} x={x} y={y + i * lh} className={className} textAnchor={anchor}>{line}</text>)}</>
}

function Page({ title, lines = [], name = true, children }) {
  return <svg className="sheet" viewBox="0 0 210 297" role="img" aria-label={title}>
    <rect width="210" height="297" fill="#fff" />
    <text x="12" y="13" className="s-brand">ruang rasa</text>
    <text x="198" y="13" className="s-brand" textAnchor="end">lembar kegiatan</text>
    <line x1="12" y1="17" x2="198" y2="17" stroke="#e1dacd" strokeWidth=".4" />
    <text x="12" y="29" className="s-title">{title}</text>
    {name && <text x="198" y="29" className="s-text" textAnchor="end">Nama: ____________________</text>}
    <Lines x={12} y={36} lines={lines} />
    {children}
    <text x="105" y="291" className="s-foot" textAnchor="middle">Ruang Rasa · untuk dicetak dan dipakai bersama di rumah</text>
  </svg>
}

const CutCard = ({ x, y, w, h, children }) => <g>
  <rect x={x} y={y} width={w} height={h} rx="3" fill="#fff" stroke={LINE} strokeWidth=".5" strokeDasharray="2 1.6" />
  {children}
</g>

// ---------- bentuk ----------
const polygon = (cx, cy, r, n, rot = -90) => Array.from({ length: n }, (_, i) => { const a = (rot + (360 / n) * i) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)] })
const starPoints = (cx, cy, ro, ri) => Array.from({ length: 10 }, (_, i) => { const a = (-90 + 36 * i) * Math.PI / 180; const r = i % 2 ? ri : ro; return [cx + r * Math.cos(a), cy + r * Math.sin(a)] })
const heartPoints = (cx, cy, s, n = 120) => Array.from({ length: n }, (_, i) => { const t = (i / n) * Math.PI * 2; return [cx + s * 16 * Math.sin(t) ** 3, cy - s * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) + s * 2] })
const pts = (list) => list.map(([x, y]) => `${num(x)},${num(y)}`).join(' ')

function Shape({ name, cx, cy, r = 10, fill = SAGE, stroke = OLIVE }) {
  const common = { fill, stroke, strokeWidth: .6, strokeLinejoin: 'round' }
  switch (name) {
    case 'lingkaran': return <circle cx={cx} cy={cy} r={r} {...common} />
    case 'persegi': return <rect x={cx - r * .85} y={cy - r * .85} width={r * 1.7} height={r * 1.7} {...common} />
    case 'persegi panjang': return <rect x={cx - r * 1.2} y={cy - r * .65} width={r * 2.4} height={r * 1.3} {...common} />
    case 'oval': return <ellipse cx={cx} cy={cy} rx={r * 1.25} ry={r * .8} {...common} />
    case 'segitiga': return <polygon points={pts(polygon(cx, cy + r * .12, r * 1.1, 3))} {...common} />
    case 'belah ketupat': return <polygon points={pts([[cx, cy - r * 1.15], [cx + r * .8, cy], [cx, cy + r * 1.15], [cx - r * .8, cy]])} {...common} />
    case 'segi lima': return <polygon points={pts(polygon(cx, cy, r * 1.05, 5))} {...common} />
    case 'segi enam': return <polygon points={pts(polygon(cx, cy, r * 1.05, 6, 0))} {...common} />
    case 'bintang': return <polygon points={pts(starPoints(cx, cy + r * .08, r * 1.15, r * .5))} {...common} />
    case 'hati': return <polygon points={pts(heartPoints(cx, cy - r * .1, r / 17))} {...common} />
    default: return null
  }
}

// kolom kiri dan kanan yang dihubungkan dengan garis; `order[i]` = indeks kanan yang cocok dengan kiri i
function MatchSheet({ title, lines, rows, step, top, order, answer, drawLeft, drawRight, labelLeft, labelRight }) {
  const y = (i) => top + i * step
  return <Page title={title} lines={lines} name={!answer}>
    {rows.map((_, i) => <g key={i}>
      {drawLeft(i, 38, y(i))}
      <circle cx="66" cy={y(i)} r="1.6" fill={OLIVE} />
      {drawRight(order[i], 172, y(i), i)}
      <circle cx="144" cy={y(i)} r="1.6" fill={OLIVE} />
      {labelLeft && <text x="38" y={y(i) + 15} className="s-label" textAnchor="middle">{labelLeft(i)}</text>}
      {labelRight && <text x="172" y={y(i) + 15} className="s-label" textAnchor="middle">{labelRight(order[i])}</text>}
      {answer && <line x1="66" y1={y(i)} x2="144" y2={y(order.indexOf(i))} stroke="#d9544d" strokeWidth=".9" strokeLinecap="round" />}
    </g>)}
  </Page>
}

// ---------- 1. Matematika ----------
const KATA = ['nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas', 'dua belas', 'tiga belas', 'empat belas', 'lima belas', 'enam belas', 'tujuh belas', 'delapan belas', 'sembilan belas', 'dua puluh']

function penjumlahan() {
  const make = (answer) => <Page key={answer ? 'k' : 's'} title={answer ? 'Lembar koreksi: menambah satu' : 'Ayo menambah satu!'} lines={answer ? ['Cocokkan jawaban anak dengan lembar ini.'] : ['Hitung bulatan di kiri, tambahkan satu bulatan, lalu tulis jawabannya.']} name={!answer}>
    {Array.from({ length: 9 }, (_, i) => {
      const n = i + 1, y = 50 + i * 26
      return <g key={n}>
        {Array.from({ length: n }, (_, k) => <circle key={k} cx={16 + k * 6} cy={y} r="2.3" fill={SAGE} stroke={OLIVE} strokeWidth=".4" />)}
        <text x="76" y={y + 2.5} className="s-math" textAnchor="middle">+</text>
        <circle cx="88" cy={y} r="2.3" fill="#f2a33a" stroke={OLIVE} strokeWidth=".4" />
        <text x="130" y={y + 3.5} className="s-math" textAnchor="end">{n} + 1 =</text>
        {answer ? <text x="140" y={y + 3.5} className="s-math s-key">{n + 1}<tspan className="s-label" dx="3">{KATA[n + 1]}</tspan></text> : <line x1="136" y1={y + 4} x2="168" y2={y + 4} stroke={INK} strokeWidth=".5" />}
      </g>
    })}
  </Page>
  return [make(false), make(true)]
}

function kartuAngka() {
  const cards = [...Array.from({ length: 20 }, (_, i) => ({ t: String(i + 1), w: KATA[i + 1] })), { t: '+', w: 'tambah' }, { t: '−', w: 'kurang' }, { t: '=', w: 'sama dengan' }]
  return chunk(cards, 6).map((group, p) => <Page key={p} name={false} title="Kartu angka" lines={['Gunting mengikuti garis putus-putus. Tunjukkan sekilas, lalu minta anak menyebutkannya.']}>
    {group.map((c, i) => {
      const x = 12 + (i % 2) * 98, y = 46 + Math.floor(i / 2) * 78
      return <CutCard key={c.t} x={x} y={y} w={88} h={72}>
        <text x={x + 44} y={y + 46} className="s-big" textAnchor="middle" fill={PALETTE[(cards.indexOf(c)) % 6]}>{c.t}</text>
        <text x={x + 44} y={y + 62} className="s-label" textAnchor="middle">{c.w}</text>
      </CutCard>
    })}
  </Page>)
}

function jepitAngka() {
  const dotsAt = (n, x, y) => {
    const big = n <= 10, gap = big ? 9 : 6.4, r = big ? 3.2 : 2.3, x0 = x + 44 - (4 * gap) / 2, y0 = y + (big ? 11 : 8)
    return Array.from({ length: n }, (_, k) => <circle key={k} cx={x0 + (k % 5) * gap} cy={y0 + Math.floor(k / 5) * gap} r={r} fill={PALETTE[(n - 1) % 6]} stroke={OLIVE} strokeWidth=".4" />)
  }
  return chunk(Array.from({ length: 20 }, (_, i) => i + 1), 8).map((group, p) => <Page key={p} name={false} title={`Jepit jemuran: angka ${group[0]}–${group[group.length - 1]}`} lines={['Gunting kartunya. Anak menghitung bulatan, lalu menjepit jepit jemuran di angka yang tepat.', 'Tulis jawabannya di belakang kartu supaya anak bisa mengecek sendiri.']}>
    {group.map((n, i) => {
      const x = 12 + (i % 2) * 98, y = 48 + Math.floor(i / 2) * 58, base = n > 10 ? 11 : 1
      return <CutCard key={n} x={x} y={y} w={88} h={52}>
        {dotsAt(n, x, y)}
        {Array.from({ length: 10 }, (_, k) => <text key={k} x={x + 8 + k * 8.0} y={y + 47} className="s-label" textAnchor="middle">{base + k}</text>)}
      </CutCard>
    })}
  </Page>)
}

function hariBulan() {
  const hari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
  const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  const pastel = ['#f4c7c3', '#f8d9b0', '#f7e7a6', '#cfe6c6', '#c4dbf3', '#dccdee']
  const strips = (list, h, gap, key, title, line) => <Page key={key} name={false} title={title} lines={[line]}>
    {list.map((t, i) => <g key={t}><rect x="20" y={46 + i * (h + gap)} width="170" height={h} rx="3" fill={pastel[i % 6]} stroke={LINE} strokeWidth=".5" strokeDasharray="2 1.6" /><text x="105" y={46 + i * (h + gap) + h / 2 + 3} className="s-strip" textAnchor="middle">{t}</text></g>)}
  </Page>
  return [strips(hari, 24, 7, 'h', 'Hari dalam seminggu', 'Gunting 7 pita. Anak menyusunnya berurutan dari Senin sampai Minggu.'), strips(bulan, 15, 4, 'b', 'Bulan dalam setahun', 'Gunting 12 pita. Anak menyusunnya berurutan dari Januari sampai Desember.')]
}

// ---------- 2. Sensorial ----------
function cocokkanBentuk() {
  const sets = [
    { names: ['lingkaran', 'persegi', 'segitiga', 'bintang', 'hati', 'segi enam'], order: [3, 5, 1, 0, 4, 2], step: 36, top: 62 },
    { names: ['persegi panjang', 'oval', 'belah ketupat', 'segi lima', 'bintang', 'lingkaran', 'segitiga', 'hati'], order: [4, 2, 6, 0, 7, 3, 1, 5], step: 27, top: 56 },
    { names: ['segitiga', 'lingkaran', 'hati', 'persegi panjang', 'bintang', 'belah ketupat'], order: [2, 4, 0, 5, 1, 3], step: 36, top: 62 },
    { names: ['segi enam', 'oval', 'persegi', 'segi lima', 'segitiga', 'hati', 'bintang', 'belah ketupat'], order: [5, 3, 7, 1, 0, 6, 2, 4], step: 27, top: 56 },
  ]
  return sets.flatMap((s, si) => [false, true].map((answer) => <MatchSheet key={`${si}${answer}`} answer={answer} rows={s.names} step={s.step} top={s.top} order={s.order}
    title={answer ? `Lembar koreksi ${si + 1}` : `Cocokkan bentuk ${si + 1}`} lines={answer ? ['Garis merah menunjukkan pasangan yang benar.'] : ['Tarik garis dari bentuk di kiri ke bentuk yang sama di kanan.']}
    drawLeft={(i, x, y) => <Shape name={s.names[i]} cx={x} cy={y} r={s.step > 30 ? 11 : 8.5} fill={PALETTE[(i + si * 2) % 6] + '55'} />}
    drawRight={(j, x, y) => <Shape name={s.names[j]} cx={x} cy={y} r={s.step > 30 ? 11 : 8.5} fill={PALETTE[(j + si * 2) % 6] + '55'} />} />))
}

function rodaWarna() {
  const cx = 105, cy = 142, R = 62
  const wedge = (i) => { const a0 = (-90 + i * 60 - 30) * Math.PI / 180, a1 = a0 + Math.PI / 3; return `M${cx} ${cy}L${num(cx + R * Math.cos(a0))} ${num(cy + R * Math.sin(a0))}A${R} ${R} 0 0 1 ${num(cx + R * Math.cos(a1))} ${num(cy + R * Math.sin(a1))}Z` }
  const names = ['merah', 'jingga', 'kuning', 'hijau', 'biru', 'ungu']
  const prim = [true, false, true, false, true, false]
  const mix = [['#d9544d', '#f2c230', '#f2a33a', 'merah + kuning', 'jingga'], ['#f2c230', '#3b7dd8', '#6fa86b', 'kuning + biru', 'hijau'], ['#3b7dd8', '#d9544d', '#8e6bb8', 'biru + merah', 'ungu']]
  return [
    <Page key="w" title="Roda warna" lines={['Warnai setiap bagian sesuai namanya. Warna primer (merah, kuning, biru) tidak bisa dibuat dari campuran lain.', 'Warna sekunder (jingga, hijau, ungu) lahir dari campuran dua warna primer.']}>
      {names.map((n, i) => {
        const a = (-90 + i * 60) * Math.PI / 180
        return <g key={n}><path d={wedge(i)} fill="#fff" stroke={OLIVE} strokeWidth=".8" strokeLinejoin="round" />
          <text x={cx + R * .62 * Math.cos(a)} y={cy + R * .62 * Math.sin(a) + 1.6} className="s-label" textAnchor="middle">{n}</text>
          <text x={cx + (R + 9) * Math.cos(a)} y={cy + (R + 9) * Math.sin(a) + 1.4} className="s-label" textAnchor="middle" fill={TERRA}>{prim[i] ? 'primer' : 'sekunder'}</text></g>
      })}
      <circle cx={cx} cy={cy} r="9" fill="#fff" stroke={OLIVE} strokeWidth=".8" />
      <Lines x={12} y={236} lines={['Setelah selesai, coba tebak:', 'Apa yang terjadi kalau semua warna dicampur jadi satu?']} />
    </Page>,
    <Page key="m" title="Campur warna" lines={['Warnai lingkaran kosong dengan hasil campurannya. Jawabannya ada di bagian bawah halaman.']}>
      {mix.map(([a, b, , text, result], i) => {
        const y = 66 + i * 52
        return <g key={result}>
          <circle cx="40" cy={y} r="14" fill={a} /><text x="64" y={y + 3} className="s-math" textAnchor="middle">+</text>
          <circle cx="88" cy={y} r="14" fill={b} /><text x="112" y={y + 3} className="s-math" textAnchor="middle">=</text>
          <circle cx="140" cy={y} r="14" fill="#fff" stroke={OLIVE} strokeWidth=".8" strokeDasharray="2 1.4" />
          <text x="40" y={y + 24} className="s-label">{text}</text>
          <text x="140" y={y + 24} className="s-label" textAnchor="middle">?</text>
        </g>
      })}
      <text x="12" y="250" className="s-label">Kunci jawaban</text>
      {mix.map(([, , c, , result], i) => <g key={result}><circle cx={24 + i * 50} cy="262" r="6" fill={c} /><text x={33 + i * 50} y="264.5" className="s-label">{result}</text></g>)}
    </Page>,
    <Page key="t" title="Roda warna: tulis namanya" lines={['Warnai setiap bagian dengan warna yang kamu suka, lalu tulis nama warnanya di garis.', 'Minta orang dewasa membantu menuliskan nama warna kalau anak belum bisa menulis.']}>
      {names.map((n, i) => {
        const a = (-90 + i * 60) * Math.PI / 180
        const lx = cx + (R + 6) * Math.cos(a), ly = cy + (R + 6) * Math.sin(a)
        const left = Math.cos(a) < -0.2, right = Math.cos(a) > 0.2
        return <g key={n}><path d={wedge(i)} fill="#fff" stroke={OLIVE} strokeWidth=".8" strokeLinejoin="round" />
          <line x1={left ? lx - 30 : right ? lx : lx - 15} y1={ly + (Math.sin(a) > 0.3 ? 4 : -2)} x2={left ? lx : right ? lx + 30 : lx + 15} y2={ly + (Math.sin(a) > 0.3 ? 4 : -2)} stroke={INK} strokeWidth=".4" /></g>
      })}
      <circle cx={cx} cy={cy} r="9" fill="#fff" stroke={OLIVE} strokeWidth=".8" />
    </Page>,
    <Page key="v" title="Tiga lingkaran ajaib" lines={['Warnai ketiga lingkaran dengan warna primer: merah, kuning, dan biru.', 'Lalu warnai bagian yang saling bertumpuk dengan warna campurannya. Cocokkan dengan kunci di bawah.']}>
      {[[88, 112, 'merah'], [128, 112, 'kuning'], [108, 148, 'biru']].map(([x, y, n]) => <g key={n}><circle cx={x} cy={y} r="32" fill="#fff" fillOpacity="0" stroke={OLIVE} strokeWidth=".8" strokeDasharray="2.5 1.5" /></g>)}
      <text x="62" y="82" className="s-label" textAnchor="middle">merah</text><text x="154" y="82" className="s-label" textAnchor="middle">kuning</text><text x="108" y="196" className="s-label" textAnchor="middle">biru</text>
      <text x="12" y="226" className="s-label">Kunci jawaban</text>
      {[['#f2a33a', 'merah + kuning = jingga'], ['#6fa86b', 'kuning + biru = hijau'], ['#8e6bb8', 'biru + merah = ungu'], ['#8a6a45', 'ketiganya = cokelat']].map(([c, t], i) => <g key={t}><circle cx={18 + (i % 2) * 90} cy={238 + Math.floor(i / 2) * 16} r="5" fill={c} /><text x={26 + (i % 2) * 90} y={240 + Math.floor(i / 2) * 16} className="s-label">{t}</text></g>)}
    </Page>,
    <Page key="h" title="Berburu warna" lines={['Cari satu benda untuk setiap warna di sekitarmu. Gambar atau tuliskan namanya di kotak.']}>
      {[['#d9544d', 'merah'], ['#f2a33a', 'jingga'], ['#f2c230', 'kuning'], ['#6fa86b', 'hijau'], ['#3b7dd8', 'biru'], ['#8e6bb8', 'ungu']].map(([c, n], i) => {
        const y = 52 + i * 38
        return <g key={n}><circle cx="24" cy={y + 12} r="9" fill={c} /><text x="38" y={y + 14} className="s-math">{n}</text><rect x="86" y={y} width="112" height="26" rx="2.5" fill="#fff" stroke={LINE} strokeWidth=".5" strokeDasharray="2 1.6" /></g>
      })}
    </Page>,
  ]
}

function berburu() {
  const items = ['Sesuatu yang kasar', 'Sesuatu yang halus', 'Sesuatu berwarna merah', 'Sesuatu berwarna hijau', 'Sesuatu yang bulat', 'Sesuatu yang berbau harum', 'Sesuatu yang dingin', 'Sesuatu yang berbunyi', 'Sesuatu yang lebih kecil dari jarimu', 'Sesuatu yang lebih besar dari tubuhmu', 'Sesuatu yang berasal dari alam', 'Sesuatu yang berkilau', 'Sesuatu yang lembut', 'Sesuatu yang berat', 'Sesuatu yang berbentuk segitiga', 'Sesuatu yang kamu sukai']
  return [<Page key="b" title="Berburu benda di sekitar" lines={['Jalan-jalan di rumah atau halaman. Temukan benda untuk setiap petunjuk, lalu centang kotaknya.', 'Boleh menyentuh, mendengar, dan mencium (dengan hati-hati). Ceritakan temuanmu pada orang dewasa.']}>
    {items.map((t, i) => {
      const y = 58 + i * 14.5
      return <g key={t}><rect x="14" y={y - 5} width="7" height="7" rx="1.4" fill="#fff" stroke={OLIVE} strokeWidth=".6" /><text x="26" y={y} className="s-text">{t}</text><line x1="26" y1={y + 3.4} x2="196" y2={y + 3.4} stroke="#e1dacd" strokeWidth=".4" /></g>
    })}
  </Page>]
}

// ---------- 3. Kehidupan praktis ----------
function FoodWhole({ cx, cy, kind }) {
  const f = FOODS[kind]
  return <g><circle cx={cx} cy={cy} r="11" fill={f.rim} stroke={OLIVE} strokeWidth=".5" /><ellipse cx={cx - 3.5} cy={cy - 4} rx="3" ry="1.8" fill="#fff" opacity=".35" transform={`rotate(-30 ${cx - 3.5} ${cy - 4})`} />
    {f.stem && <path d={`M${cx} ${cy - 10.5}q1-5 4-6`} stroke="#5b7f3d" strokeWidth="1" fill="none" strokeLinecap="round" />}</g>
}
function FoodCut({ cx, cy, kind }) {
  const f = FOODS[kind]
  const seeds = (n, r, color) => Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return <ellipse key={i} cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} rx=".9" ry="1.5" fill={color} transform={`rotate(${(a * 180) / Math.PI + 90} ${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)})`} /> })
  const segs = (n) => Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return <line key={i} x1={cx} y1={cy} x2={cx + 8.4 * Math.cos(a)} y2={cy + 8.4 * Math.sin(a)} stroke={f.rim} strokeWidth=".5" /> })
  return <g><circle cx={cx} cy={cy} r="11" fill={f.rim} stroke={OLIVE} strokeWidth=".5" /><circle cx={cx} cy={cy} r="9" fill={f.flesh} />
    {f.pattern === 'apel' && <><circle cx={cx} cy={cy} r="3" fill="#f4e7c5" />{seeds(4, 1.6, '#6b4a2b')}</>}
    {f.pattern === 'jeruk' && segs(9)}
    {f.pattern === 'semangka' && seeds(7, 4.6, '#2b2b2b')}
    {f.pattern === 'tomat' && <>{segs(3)}{seeds(6, 3.4, '#f2d35b')}</>}
    {f.pattern === 'kiwi' && <><circle cx={cx} cy={cy} r="2.6" fill="#f3f1d0" />{seeds(10, 5.2, '#2b2b2b')}</>}
    {f.pattern === 'persik' && <ellipse cx={cx} cy={cy} rx="3.4" ry="4.4" fill="#8a5a3a" />}
    {f.pattern === 'bawang' && [2, 4.2, 6.4, 8.4].map((r) => <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="#c9a46a" strokeWidth=".45" />)}
    {f.pattern === 'delima' && <>{seeds(12, 6.2, '#8f1620')}{seeds(8, 3.4, '#8f1620')}</>}
    {f.pattern === 'kelapa' && <circle cx={cx} cy={cy} r="3.6" fill="#efe4d0" />}
  </g>
}
const FOODS = {
  apel: { rim: '#d9544d', flesh: '#f6ebcf', pattern: 'apel', stem: true },
  jeruk: { rim: '#f2a33a', flesh: '#f8c978', pattern: 'jeruk' },
  semangka: { rim: '#3f8a4d', flesh: '#e9626c', pattern: 'semangka' },
  tomat: { rim: '#d9433a', flesh: '#ef7a6b', pattern: 'tomat' },
  kiwi: { rim: '#8a6a45', flesh: '#9ccb59', pattern: 'kiwi' },
  'jeruk nipis': { rim: '#6fa86b', flesh: '#d8eaa4', pattern: 'jeruk' },
  lemon: { rim: '#f2c230', flesh: '#fbec9c', pattern: 'jeruk' },
  persik: { rim: '#f4a58a', flesh: '#fbd6a5', pattern: 'persik', stem: true },
  'bawang bombay': { rim: '#b98a4a', flesh: '#f7ecd9', pattern: 'bawang' },
  delima: { rim: '#b3202a', flesh: '#e0525c', pattern: 'delima' },
  kelapa: { rim: '#6b4a2b', flesh: '#fffaf0', pattern: 'kelapa' },
  'jeruk bali': { rim: '#e8836a', flesh: '#f7b3a0', pattern: 'jeruk' },
}

function utuhPotong() {
  const sets = [
    { names: ['apel', 'jeruk', 'semangka', 'tomat', 'kiwi', 'jeruk nipis'], order: [4, 2, 5, 0, 3, 1] },
    { names: ['lemon', 'persik', 'bawang bombay', 'delima', 'kelapa', 'jeruk bali'], order: [3, 5, 1, 0, 4, 2] },
    { names: ['apel', 'bawang bombay', 'jeruk nipis', 'kelapa', 'tomat', 'delima'], order: [2, 4, 0, 5, 1, 3] },
    { names: ['semangka', 'lemon', 'kiwi', 'persik', 'jeruk bali', 'jeruk'], order: [5, 3, 1, 4, 0, 2] },
  ]
  return sets.flatMap((set, si) => [false, true].map((answer) => <MatchSheet key={`${si}${answer}`} answer={answer} rows={set.names} step={36} top={62} order={set.order}
    title={answer ? `Lembar koreksi: utuh dan potong ${si + 1}` : `Utuh dan potong ${si + 1}`} lines={answer ? ['Garis merah menunjukkan pasangan yang benar.'] : ['Di kiri ada buah atau sayur yang masih utuh, di kanan yang sudah dipotong. Tarik garis untuk memasangkannya.']}
    drawLeft={(i, x, y) => <FoodWhole cx={x} cy={y} kind={set.names[i]} />} drawRight={(j, x, y) => <FoodCut cx={x} cy={y} kind={set.names[j]} />}
    labelLeft={(i) => set.names[i]} />))
}

function asalUsul() {
  const sets = [
    { left: [['🥚', 'telur'], ['🥛', 'susu'], ['🍯', 'madu'], ['🧶', 'benang wol'], ['📄', 'kertas'], ['🍞', 'roti']], right: [['🐔', 'ayam'], ['🐄', 'sapi'], ['🐝', 'lebah'], ['🐑', 'domba'], ['🌳', 'pohon'], ['🌾', 'gandum']], order: [3, 5, 0, 4, 1, 2] },
    { left: [['🧀', 'keju'], ['🧃', 'jus'], ['🍟', 'kentang goreng'], ['🍿', 'popcorn'], ['🪑', 'kursi'], ['🧣', 'syal']], right: [['🥛', 'susu'], ['🍊', 'jeruk'], ['🥔', 'kentang'], ['🌽', 'jagung'], ['🌲', 'pohon'], ['🐑', 'domba']], order: [4, 2, 5, 0, 3, 1] },
  ]
  return sets.flatMap(({ left, right, order }, si) => [false, true].map((answer) => <MatchSheet key={`${si}${answer}`} answer={answer} rows={left} step={36} top={62} order={order}
    title={answer ? `Lembar koreksi: dari mana asalnya? ${si + 1}` : `Dari mana asalnya? ${si + 1}`} lines={answer ? ['Garis merah menunjukkan pasangan yang benar.'] : ['Tarik garis dari benda di kiri ke asalnya di kanan.']}
    drawLeft={(i, x, y) => <text x={x} y={y} className="s-emoji" textAnchor="middle" dominantBaseline="central">{left[i][0]}</text>}
    drawRight={(j, x, y) => <text x={x} y={y} className="s-emoji" textAnchor="middle" dominantBaseline="central">{right[j][0]}</text>}
    labelLeft={(i) => left[i][1]} labelRight={(j) => right[j][1]} />))
}

// ---------- empat musim ----------
function empatMusim() {
  const names = ['Musim semi', 'Musim panas', 'Musim gugur', 'Musim dingin']
  const sets = [{ scenes: ['🌸🐝', '☀️🏖️', '🍂🍄', '❄️⛄'], order: [2, 0, 3, 1] }, { scenes: ['🌷🦋', '🍉🌻', '🍁🎃', '⛄🧤'], order: [1, 3, 0, 2] }]
  return sets.flatMap((set, si) => [false, true].map((answer) => <MatchSheet key={`${si}${answer}`} answer={answer} rows={names} step={52} top={82} order={set.order}
    title={answer ? `Lembar koreksi: empat musim ${si + 1}` : `Empat musim ${si + 1}`} lines={answer ? ['Garis merah menunjukkan pasangan yang benar.'] : ['Tarik garis dari gambar di kiri ke nama musimnya. Di Indonesia kita punya musim hujan dan kemarau, tetapi di negara lain ada empat musim.']}
    drawLeft={(i, x, y) => <text x={x} y={y} className="s-emoji-l" textAnchor="middle" dominantBaseline="central">{set.scenes[i]}</text>}
    drawRight={(j, x, y) => <text x={x} y={y + 2} className="s-word-l" textAnchor="middle">{names[j]}</text>} />))
}

function menjahit() {
  const edge = (verts, per) => verts.flatMap((v, i) => { const w = verts[(i + 1) % verts.length]; return Array.from({ length: per }, (_, k) => [v[0] + ((w[0] - v[0]) * k) / per, v[1] + ((w[1] - v[1]) * k) / per]) })
  const poly = (name, verts, per) => ({ name, outline: (cx, cy) => <polygon points={pts(verts(cx, cy))} />, holes: (cx, cy) => edge(verts(cx, cy), per) })
  const shapes = [
    { name: 'Lingkaran', outline: (cx, cy) => <circle cx={cx} cy={cy} r="34" />, holes: (cx, cy) => polygon(cx, cy, 34, 20) },
    poly('Persegi', (cx, cy) => [[cx - 30, cy - 30], [cx + 30, cy - 30], [cx + 30, cy + 30], [cx - 30, cy + 30]], 5),
    poly('Segitiga', (cx, cy) => polygon(cx, cy + 6, 38, 3), 6),
    poly('Bintang', (cx, cy) => starPoints(cx, cy + 3, 38, 16), 2),
    { name: 'Hati', outline: (cx, cy) => <polygon points={pts(heartPoints(cx, cy - 4, 2.1))} />, holes: (cx, cy) => heartPoints(cx, cy - 4, 2.1, 24) },
    poly('Segi enam', (cx, cy) => polygon(cx, cy, 34, 6, 0), 3),
    poly('Persegi panjang', (cx, cy) => [[cx - 36, cy - 22], [cx + 36, cy - 22], [cx + 36, cy + 22], [cx - 36, cy + 22]], 6),
    poly('Belah ketupat', (cx, cy) => [[cx, cy - 38], [cx + 27, cy], [cx, cy + 38], [cx - 27, cy]], 5),
    poly('Segi lima', (cx, cy) => polygon(cx, cy + 2, 37, 5), 4),
    { name: 'Oval', outline: (cx, cy) => <ellipse cx={cx} cy={cy} rx="37" ry="25" />, holes: (cx, cy) => Array.from({ length: 24 }, (_, i) => { const a = (i / 24) * Math.PI * 2 - Math.PI / 2; return [cx + 37 * Math.cos(a), cy + 25 * Math.sin(a)] }) },
    poly('Rumah', (cx, cy) => [[cx - 30, cy + 28], [cx - 30, cy - 4], [cx, cy - 32], [cx + 30, cy - 4], [cx + 30, cy + 28]], 4),
    poly('Jajar genjang', (cx, cy) => [[cx - 36, cy + 22], [cx - 16, cy - 22], [cx + 36, cy - 22], [cx + 16, cy + 22]], 5),
  ]
  return chunk(shapes, 4).map((group, p) => <Page key={p} name={false} title="Menjahit bentuk" lines={['Cetak di kertas tebal, gunting mengikuti garis putus-putus, lalu lubangi titik-titiknya dengan pelubang kertas atau jarum tumpul.', 'Anak menjahit mengikuti bentuk memakai benang wol atau tali sepatu yang ujungnya dilem.']}>
    {group.map((s, i) => {
      const x = 12 + (i % 2) * 98, y = 52 + Math.floor(i / 2) * 118, cx = x + 44, cy = y + 52
      return <CutCard key={s.name} x={x} y={y} w={88} h={108}>
        <g fill="none" stroke={SAGE} strokeWidth=".8" strokeLinejoin="round">{s.outline(cx, cy)}</g>
        {s.holes(cx, cy).map(([hx, hy], k) => <circle key={k} cx={hx} cy={hy} r="1.5" fill="#fff" stroke={OLIVE} strokeWidth=".5" />)}
        <circle cx={s.holes(cx, cy)[0][0]} cy={s.holes(cx, cy)[0][1]} r="2.6" fill="none" stroke={TERRA} strokeWidth=".7" />
        <text x={x + 44} y={y + 103} className="s-label" textAnchor="middle">{s.name} · mulai dari titik berlingkar</text>
      </CutCard>
    })}
  </Page>)
}

// ---------- 4. Bahasa ----------
function jiplakHuruf() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  return chunk(letters, 7).map((group, p) => <Page key={p} title={`Menjiplak huruf ${group[0]}–${group[group.length - 1]}`} lines={['Ikuti huruf putus-putus dengan pensil atau krayon, mulai dari huruf contoh di paling kiri.']}>
    {group.map((l, i) => {
      const y = 62 + i * 32
      return <g key={l}>
        <line x1="12" y1={y} x2="198" y2={y} stroke="#cfc9b5" strokeWidth=".4" />
        <line x1="12" y1={y - 16} x2="198" y2={y - 16} stroke="#e8e3d3" strokeWidth=".4" strokeDasharray="1.5 1.5" />
        {[0, 1, 2, 3, 4].map((k) => <text key={k} x={14 + k * 37} y={y - 1.5} className={k === 0 ? 's-trace-solid' : 's-trace'}>{l}{l.toLowerCase()}</text>)}
      </g>
    })}
  </Page>)
}

// gambar xilofon sederhana (tidak ada emoji xilofon): bilah warna-warni dengan dua pemukul
const xilofon = (cx, cy) => <g>
  {[24, 21, 18, 15, 12].map((len, i) => <rect key={i} x={cx - 13 + i * 5.4} y={cy - len / 2} width="4.2" height={len} rx="1" fill={PALETTE[i]} stroke={OLIVE} strokeWidth=".35" />)}
  <line x1={cx - 13} y1={cy - 6} x2={cx + 13} y2={cy - 3} stroke={TERRA} strokeWidth=".7" strokeLinecap="round" />
  <line x1={cx - 13} y1={cy + 6} x2={cx + 13} y2={cy + 3} stroke={TERRA} strokeWidth=".7" strokeLinecap="round" />
  <line x1={cx + 3} y1={cy - 17} x2={cx + 12} y2={cy - 8} stroke={TERRA} strokeWidth=".7" strokeLinecap="round" /><circle cx={cx + 2.4} cy={cy - 17.6} r="1.6" fill={TERRA} />
  <line x1={cx + 16} y1={cy - 15} x2={cx + 9} y2={cy - 7} stroke={TERRA} strokeWidth=".7" strokeLinecap="round" /><circle cx={cx + 16.6} cy={cy - 15.6} r="1.6" fill={TERRA} />
</g>

function kartuHuruf() {
  const cards = [['A', 'apel', '🍎'], ['B', 'bola', '⚽'], ['C', 'cicak', '🦎'], ['D', 'domba', '🐑'], ['E', 'es krim', '🍦'], ['F', 'foto', '📷'], ['G', 'gajah', '🐘'], ['H', 'harimau', '🐯'], ['I', 'ikan', '🐟'], ['J', 'jeruk', '🍊'], ['K', 'kucing', '🐱'], ['L', 'lebah', '🐝'], ['M', 'mangga', '🥭'], ['N', 'nanas', '🍍'], ['O', 'orang utan', '🦧'], ['P', 'pisang', '🍌'], ['Q', "Al-Qur'an", '📖'], ['Q', 'queen (ratu)', '👑'], ['R', 'rumah', '🏠'], ['S', 'sapi', '🐄'], ['T', 'topi', '🎩'], ['U', 'ular', '🐍'], ['V', 'vas bunga', '🏺'], ['W', 'wajan', '🍳'], ['X', 'xilofon', xilofon], ['Y', 'yoyo', '🪀'], ['Z', 'zebra', '🦓']]
  return chunk(cards, 8).map((group, p) => <Page key={p} name={false} title="Kartu huruf: A untuk apel…" lines={['Gunting kartunya. Sebutkan bunyi huruf, lihat gambarnya, lalu baca katanya bersama.']}>
    {group.map(([l, w, e], i) => {
      const x = 12 + (i % 2) * 98, y = 50 + Math.floor(i / 2) * 58
      return <CutCard key={w} x={x} y={y} w={88} h={52}>
        <text x={x + 8} y={y + 33} className="s-letter" fill={OLIVE}>{l}<tspan fill={TERRA}>{l.toLowerCase()}</tspan></text>
        {typeof e === 'function' && !fotoUrl(w) ? e(x + 65, y + 28) : <Pic word={w} emoji={e} x={x + 49} y={y + 8} w={34} h={34} className="s-emoji" />}
        <text x={x + 44} y={y + 47} className="s-word" textAnchor="middle">{w}</text>
      </CutCard>
    })}
  </Page>)
}

function PictureSet({ items, name }) {
  const grid = (i) => ({ x: 12 + (i % 3) * 64, y: 48 + Math.floor(i / 3) * 56 })
  const groups = chunk(items, 12)
  const kinds = [
    { key: 'k', title: `Kartu kontrol: ${name}`, line: 'Kartu gambar + kata. Simpan satu set ini sebagai kunci; anak mencocokkan kartu gambar dan kartu kata dengannya.', draw: ([e, w], x, y) => <><Pic word={w} emoji={e} x={x + 14} y={y + 3} w={30} h={30} /><text x={x + 29} y={y + 45} className="s-word" textAnchor="middle">{w}</text></> },
    { key: 'g', title: `Kartu gambar: ${name}`, line: 'Gunting kartunya. Anak menyebutkan nama gambar, lalu mencari kartu kata yang cocok.', draw: ([e, w], x, y) => <Pic word={w} emoji={e} x={x + 7} y={y + 6} w={44} h={40} /> },
    { key: 'w', title: `Kartu kata: ${name}`, line: 'Gunting kartunya. Letakkan kartu kata di bawah kartu gambar yang cocok.', draw: ([, w], x, y) => <text x={x + 29} y={y + 31} className="s-word-l" textAnchor="middle">{w}</text> },
  ]
  return kinds.flatMap((kind) => groups.map((group, gi) => <Page key={`${kind.key}${gi}`} name={false} title={groups.length > 1 ? `${kind.title} (${gi + 1}/${groups.length})` : kind.title} lines={[kind.line]}>
    {group.map((it, i) => { const { x, y } = grid(i); return <CutCard key={it[1]} x={x} y={y} w={58} h={51}>{kind.draw(it, x, y)}</CutCard> })}
  </Page>))
}
const FOOD_SET = [['🍓', 'stroberi'], ['🍌', 'pisang'], ['🥑', 'alpukat'], ['🍎', 'apel'], ['🍇', 'anggur'], ['🥦', 'brokoli'], ['🍊', 'jeruk'], ['🍍', 'nanas'], ['🍉', 'semangka'], ['🍅', 'tomat'], ['🥕', 'wortel'], ['🥚', 'telur'], ['🍒', 'ceri'], ['🥝', 'kiwi'], ['🥭', 'mangga'], ['🍐', 'pir'], ['🍑', 'persik'], ['🍋', 'lemon'], ['🍈', 'melon'], ['🥥', 'kelapa'], ['🌽', 'jagung'], ['🥔', 'kentang'], ['🧄', 'bawang putih'], ['🧅', 'bawang bombay'], ['🥒', 'mentimun'], ['🌶️', 'cabai'], ['🍆', 'terong'], ['🍞', 'roti'], ['🧀', 'keju'], ['🍔', 'burger'], ['🍿', 'popcorn'], ['🍫', 'cokelat'], ['🥜', 'kacang'], ['🍯', 'madu'], ['🍚', 'nasi'], ['🥛', 'susu']]
const ANIMAL_SET = [['🐱', 'kucing'], ['🐶', 'anjing'], ['🐄', 'sapi'], ['🐔', 'ayam'], ['🐴', 'kuda'], ['🐘', 'gajah'], ['🦁', 'singa'], ['🐢', 'kura-kura'], ['🐟', 'ikan'], ['🦆', 'bebek'], ['🐰', 'kelinci'], ['🦋', 'kupu-kupu'], ['🐯', 'harimau'], ['🐻', 'beruang'], ['🦉', 'burung hantu'], ['🦅', 'elang'], ['🐬', 'lumba-lumba'], ['🦊', 'rubah'], ['🐺', 'serigala'], ['🐀', 'tikus'], ['🐿️', 'tupai'], ['🐍', 'ular'], ['🐌', 'siput'], ['🐑', 'domba'], ['🐐', 'kambing'], ['🦢', 'angsa'], ['🦜', 'burung beo'], ['🦏', 'badak'], ['🦒', 'jerapah'], ['🦓', 'zebra'], ['🐒', 'monyet'], ['🐼', 'panda'], ['🐝', 'lebah'], ['🐜', 'semut'], ['🦀', 'kepiting'], ['🐳', 'paus']]
const HOME_SET = [['🛏️', 'tempat tidur'], ['🪑', 'kursi'], ['🚪', 'pintu'], ['🪟', 'jendela'], ['🛁', 'bak mandi'], ['🧺', 'keranjang'], ['🔑', 'kunci'], ['💡', 'lampu'], ['⏰', 'jam'], ['📺', 'televisi'], ['🧹', 'sapu'], ['🪥', 'sikat gigi'], ['💻', 'laptop'], ['🖨️', 'printer'], ['☎️', 'telepon'], ['📱', 'ponsel'], ['📷', 'kamera'], ['📻', 'radio'], ['☂️', 'payung'], ['✂️', 'gunting'], ['🥄', 'sendok'], ['🍴', 'garpu'], ['🍽️', 'piring'], ['☕', 'cangkir'], ['🧼', 'sabun'], ['🪣', 'ember'], ['🪞', 'cermin'], ['🛋️', 'sofa'], ['🚽', 'toilet'], ['🚿', 'pancuran'], ['🕯️', 'lilin'], ['📖', 'buku'], ['📦', 'kotak']]

function kartuPerasaan() {
  const items = [['😄', 'senang'], ['😢', 'sedih'], ['😠', 'marah'], ['🥱', 'bosan'], ['😴', 'lelah'], ['😲', 'kaget'], ['😕', 'bingung'], ['😟', 'khawatir'], ['😞', 'kecewa'], ['🤩', 'bersemangat'], ['😌', 'lega'], ['🤪', 'jahil']]
  return [<Page key="f" name={false} title="Kartu perasaan" lines={['Gunting kartunya. Tanyakan, "Kapan kamu merasa seperti ini?" Semua perasaan boleh dirasakan.']}>
    {items.map(([e, w], i) => { const x = 12 + (i % 3) * 64, y = 48 + Math.floor(i / 3) * 56; return <CutCard key={w} x={x} y={y} w={58} h={51}><text x={x + 29} y={y + 21} className="s-emoji-l" textAnchor="middle" dominantBaseline="central">{e}</text><text x={x + 29} y={y + 45} className="s-word" textAnchor="middle">{w}</text></CutCard> })}
  </Page>]
}

// ---------- 5. Budaya ----------
function hewanDanRumahnya() {
  const sets = [
    { left: [['🐠', 'ikan'], ['🐒', 'monyet'], ['🐄', 'sapi'], ['🐱', 'kucing'], ['🦆', 'bebek'], ['🐪', 'unta']], right: [['🌊', 'laut'], ['🌳', 'hutan'], ['🌾', 'padang rumput'], ['🏠', 'rumah'], ['💧', 'kolam'], ['🏜️', 'gurun']], order: [3, 5, 1, 0, 4, 2] },
    { left: [['🐧', 'penguin'], ['🦅', 'elang'], ['🐟', 'ikan'], ['🐿️', 'tupai'], ['🐸', 'kodok'], ['🐛', 'ulat']], right: [['🧊', 'es dan kutub'], ['⛰️', 'gunung'], ['🏞️', 'sungai'], ['🌲', 'pohon'], ['💧', 'kolam'], ['🍃', 'daun']], order: [4, 2, 5, 0, 3, 1] },
  ]
  return sets.flatMap(({ left, right, order }, si) => [false, true].map((answer) => <MatchSheet key={`${si}${answer}`} answer={answer} rows={left} step={36} top={62} order={order}
    title={answer ? `Lembar koreksi: hewan dan rumahnya ${si + 1}` : `Hewan dan rumahnya ${si + 1}`} lines={answer ? ['Garis merah menunjukkan pasangan yang benar.'] : ['Tarik garis dari hewan di kiri ke tempat tinggalnya di kanan.']}
    drawLeft={(i, x, y) => <text x={x} y={y} className="s-emoji" textAnchor="middle" dominantBaseline="central">{left[i][0]}</text>}
    drawRight={(j, x, y) => <text x={x} y={y} className="s-emoji" textAnchor="middle" dominantBaseline="central">{right[j][0]}</text>}
    labelLeft={(i) => left[i][1]} labelRight={(j) => right[j][1]} />))
}

function terapungTenggelam() {
  const items = [['🍃', 'daun'], ['🪨', 'batu'], ['🥄', 'sendok logam'], ['🪵', 'ranting kayu'], ['🍎', 'apel'], ['🥕', 'wortel'], ['🔑', 'kunci'], ['🪶', 'bulu']]
  const box = (x, y) => <rect x={x} y={y - 3.6} width="5" height="5" rx="1" fill="#fff" stroke={OLIVE} strokeWidth=".5" />
  return [
    <Page key="t" title="Tenggelam atau terapung?" lines={['Tebak lebih dulu: apakah benda ini terapung atau tenggelam? Centang tebakanmu, lalu coba di baskom air dan centang hasilnya.']}>
      <text x="76" y="52" className="s-label">Tebakanku</text><text x="136" y="52" className="s-label">Hasilnya</text>
      {items.map(([e, n], i) => {
        const y = 66 + i * 26
        return <g key={n}>
          <line x1="12" y1={y + 9} x2="198" y2={y + 9} stroke="#e1dacd" strokeWidth=".4" />
          <text x="22" y={y} className="s-emoji" textAnchor="middle" dominantBaseline="central">{e}</text>
          <text x="34" y={y + 1.2} className="s-text">{n}</text>
          {box(76, y + 1)}<text x="83" y={y + 1.4} className="s-label">terapung</text>{box(100, y + 1)}<text x="107" y={y + 1.4} className="s-label">tenggelam</text>
          {box(136, y + 1)}<text x="143" y={y + 1.4} className="s-label">terapung</text>{box(160, y + 1)}<text x="167" y={y + 1.4} className="s-label">tenggelam</text>
        </g>
      })}
      <Lines x={12} y={282} lines={['Apa yang sama pada benda-benda yang terapung? Ceritakan pada orang dewasa.']} />
    </Page>,
    <Page key="k" name={false} title="Catatan untuk orang dewasa" lines={['Hasil bisa berbeda tergantung bendanya, jadi selalu dicoba langsung. Biasanya:']}>
      {[['🍃', 'daun', 'terapung'], ['🪨', 'batu', 'tenggelam'], ['🥄', 'sendok logam', 'tenggelam'], ['🪵', 'ranting kayu', 'terapung'], ['🍎', 'apel', 'terapung'], ['🥕', 'wortel', 'tenggelam'], ['🔑', 'kunci', 'tenggelam'], ['🪶', 'bulu', 'terapung']].map(([e, n, r], i) => <g key={n}>
        <text x="20" y={60 + i * 16} className="s-emoji" textAnchor="middle" dominantBaseline="central">{e}</text>
        <text x="38" y={61 + i * 16} className="s-text">{n}: <tspan className="s-key">{r}</tspan></text>
      </g>)}
      <Lines x={12} y={206} lines={['Ajukan pertanyaan terbuka: "Menurutmu kenapa?" Tidak ada jawaban yang salah. Anak sedang belajar mengamati dan membandingkan.']} />
    </Page>,
  ]
}

function tumbuhDariBiji() {
  const stages = [['🌰', 'biji'], ['💧', 'diberi air'], ['🌱', 'tunas muncul'], ['🌿', 'daun tumbuh'], ['🌻', 'berbunga']]
  return [
    <Page key="c" name={false} title="Tumbuh dari biji" lines={['Gunting kartunya dan acak. Anak menyusun urutannya dari biji sampai berbunga, lalu menceritakan apa yang terjadi di setiap tahap.']}>
      {stages.map(([e, n], i) => {
        const x = 12 + (i % 2) * 98, y = 52 + Math.floor(i / 2) * 78
        return <CutCard key={n} x={x} y={y} w={88} h={72}><text x={x + 44} y={y + 33} className="s-emoji-xl" textAnchor="middle" dominantBaseline="central">{e}</text><text x={x + 44} y={y + 62} className="s-word" textAnchor="middle">{n}</text></CutCard>
      })}
    </Page>,
    <Page key="u" name={false} title="Urutan yang benar" lines={['Tumbuhan melewati beberapa tahap sebelum berbunga. Cocokkan susunan anak dengan urutan ini.']}>
      {stages.map(([e, n], i) => <g key={n}>
        <circle cx="30" cy={70 + i * 36} r="9" fill="#e5e9dc" stroke={OLIVE} strokeWidth=".5" /><text x="30" y={73 + i * 36} className="s-math" textAnchor="middle">{i + 1}</text>
        <text x="56" y={70 + i * 36} className="s-emoji" textAnchor="middle" dominantBaseline="central">{e}</text>
        <text x="72" y={72 + i * 36} className="s-word-l">{n}</text>
        {i < stages.length - 1 && <path d={`M30 ${81 + i * 36}v8`} stroke={OLIVE} strokeWidth=".6" markerEnd="none" />}
      </g>)}
    </Page>,
  ]
}

export const printables = [
  { id: 'penjumlahan-tambah-satu', category: 'Matematika', icon: '➕', title: 'Menambah satu', summary: 'Hitung bulatan, tambah satu, tulis jawabannya. Ada lembar koreksi untuk mengecek sendiri.', how: 'Cetak lembar pertama untuk anak dan simpan lembar koreksi untuk orang dewasa. Mulai dari baris pertama dan berhenti kapan pun anak lelah.', pages: penjumlahan },
  { id: 'kartu-angka', category: 'Matematika', icon: '🔢', title: 'Kartu angka 1–20', summary: 'Kartu angka dengan tulisan namanya, ditambah simbol + − =.', how: 'Gunting kartunya. Tunjukkan satu per satu, atau susun berurutan bersama anak.', pages: kartuAngka },
  { id: 'jepit-jemuran-angka', category: 'Matematika', icon: '📌', title: 'Jepit jemuran: cocokkan angka', summary: 'Hitung bulatan 1–20 lalu jepit jepit jemuran di angka yang tepat. Melatih jari sekaligus berhitung.', how: 'Cetak di kertas agak tebal. Siapkan 10 jepit jemuran kecil. Mulai dari angka 1–10, lanjut ke 11–20.', pages: jepitAngka },
  { id: 'hari-dan-bulan', category: 'Matematika', icon: '📅', title: 'Hari dan bulan', summary: 'Pita warna-warni untuk menyusun urutan hari dalam seminggu dan bulan dalam setahun.', how: 'Gunting pitanya dan acak. Anak menyusun berurutan seperti pelangi.', pages: hariBulan },
  { id: 'cocokkan-bentuk', category: 'Sensorial', icon: '🔷', title: 'Cocokkan bentuk', summary: 'Tarik garis antara bentuk yang sama. Empat lembar (6 dan 8 bentuk) dengan lembar koreksi.', how: 'Mulai dari lembar 1 dan 3 (6 bentuk). Lembar 2 dan 4 lebih menantang (8 bentuk).', pages: cocokkanBentuk },
  { id: 'roda-warna', category: 'Sensorial', icon: '🎨', title: 'Roda warna dan campur warna', summary: 'Roda warna primer dan sekunder, campur warna, tiga lingkaran ajaib, dan berburu warna (5 halaman).', how: 'Siapkan krayon merah, kuning, biru, jingga, hijau, dan ungu.', pages: rodaWarna },
  { id: 'berburu-benda', category: 'Sensorial', icon: '🔎', title: 'Berburu benda di sekitar', summary: 'Daftar petunjuk indra: kasar, halus, harum, dingin, berbunyi, dan lainnya.', how: 'Bawa lembar ini berjalan keliling rumah atau halaman. Centang setiap temuan.', pages: berburu },
  { id: 'empat-musim', category: 'Budaya', icon: '🍂', title: 'Empat musim', summary: 'Pasangkan gambar dengan musim semi, panas, gugur, dan dingin. Dua lembar dengan lembar koreksi.', how: 'Ceritakan bahwa Indonesia punya musim hujan dan kemarau, sedangkan di negara lain ada empat musim.', pages: empatMusim },
  { id: 'hewan-dan-rumahnya', category: 'Budaya', icon: '🦒', title: 'Hewan dan rumahnya', summary: 'Pasangkan hewan dengan tempat tinggalnya: laut, hutan, kolam, gurun, dan lainnya. Dua lembar dengan lembar koreksi.', how: 'Setelah mengerjakan lembar ini, cari gambar hewan lain dan tebak di mana ia tinggal.', pages: hewanDanRumahnya },
  { id: 'terapung-tenggelam', category: 'Budaya', icon: '🛁', title: 'Tenggelam atau terapung?', summary: 'Tebak lalu buktikan: benda mana yang terapung dan mana yang tenggelam. Lembar percobaan beserta catatan untuk orang dewasa.', how: 'Siapkan baskom air dan benda-benda aman dari rumah. Centang tebakan, lalu hasilnya.', pages: terapungTenggelam },
  { id: 'tumbuh-dari-biji', category: 'Budaya', icon: '🌻', title: 'Tumbuh dari biji', summary: 'Kartu urutan tahap tumbuh tanaman dari biji sampai berbunga, ditambah lembar urutan yang benar.', how: 'Gunting kartu dan susun bersama anak. Cocok dipasangkan dengan aktivitas menanam biji kacang.', pages: tumbuhDariBiji },
  { id: 'utuh-dan-potong', category: 'Kehidupan praktis', icon: '🍎', title: 'Utuh dan potong', summary: 'Pasangkan buah dan sayur yang masih utuh dengan yang sudah dipotong. Empat lembar dengan lembar koreksi.', how: 'Setelah mengerjakan lembar ini, ajak anak menyiapkan buah sungguhan dengan pisau anak.', pages: utuhPotong },
  { id: 'dari-mana-asalnya', category: 'Budaya', icon: '🐑', title: 'Dari mana asalnya?', summary: 'Telur dari ayam, susu dari sapi, kertas dari pohon. Dua lembar dengan lembar koreksi.', how: 'Obrolkan juga benda lain di rumah: dari mana asalnya?', pages: asalUsul },
  { id: 'menjahit-bentuk', category: 'Kehidupan praktis', icon: '🧵', title: 'Menjahit bentuk', summary: 'Dua belas kartu jahit: lingkaran, persegi, segitiga, bintang, hati, segi enam, oval, rumah, dan lainnya.', how: 'Cetak di kertas tebal, lubangi titiknya, lalu jahit memakai benang wol atau tali sepatu.', pages: menjahit },
  { id: 'menjiplak-huruf', category: 'Bahasa', icon: '✏️', title: 'Menjiplak huruf A–Z', summary: 'Jiplak huruf besar dan kecil putus-putus untuk melatih pegangan pensil.', how: 'Mulai dari huruf di nama anak. Satu baris sudah cukup untuk satu hari.', pages: jiplakHuruf },
  { id: 'kartu-huruf', category: 'Bahasa', icon: '🔤', title: 'Kartu huruf: A untuk apel', summary: 'Kartu huruf bergambar dengan kata bahasa Indonesia untuk setiap huruf (huruf Q punya dua kartu: Al-Qur\'an dan queen).', how: 'Gunting dan cetak berkali-kali sesuai kebutuhan. Mainkan sebagai tebak bunyi awal.', pages: kartuHuruf },
  { id: 'kartu-makanan', category: 'Bahasa', icon: '🍓', title: 'Kartu gambar: buah dan makanan', summary: 'Set tiga bagian (kartu kontrol, kartu gambar, kartu kata) dengan 36 buah dan makanan.', how: 'Mulai dengan kartu gambar saja, lalu tambahkan kartu kata setelah anak hafal.', pages: () => PictureSet({ items: FOOD_SET, name: 'buah dan makanan' }) },
  { id: 'kartu-hewan', category: 'Bahasa', icon: '🐘', title: 'Kartu gambar: hewan', summary: 'Set tiga bagian dengan 36 hewan, dari hewan peliharaan sampai hewan liar.', how: 'Tiru suara hewannya sambil menyebut nama pada kartu.', pages: () => PictureSet({ items: ANIMAL_SET, name: 'hewan' }) },
  { id: 'kartu-benda-rumah', category: 'Bahasa', icon: '🏠', title: 'Kartu gambar: benda di rumah', summary: 'Set tiga bagian dengan 33 benda dan peralatan sehari-hari di rumah.', how: 'Setelah mencocokkan kartu, ajak anak mencari benda aslinya di rumah.', pages: () => PictureSet({ items: HOME_SET, name: 'benda di rumah' }) },
  { id: 'kartu-perasaan', category: 'Bahasa', icon: '😊', title: 'Kartu perasaan', summary: 'Dua belas kartu perasaan untuk membantu anak menamai apa yang ia rasakan.', how: 'Pakai saat ngobrol sebelum tidur: "Hari ini kamu merasa yang mana?"', pages: kartuPerasaan },
]

export const printableById = Object.fromEntries(printables.map((item) => [item.id, item]))
export const pageCount = (item) => item.pages().length

export function PrintSheets({ item }) {
  return <div className="sheets">{item.pages().map((page, i) => React.cloneElement(page, { key: i }))}</div>
}
