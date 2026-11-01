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
        {typeof e === 'function' ? e(x + 65, y + 28) : <text x={x + 65} y={y + 28} className="s-emoji" textAnchor="middle" dominantBaseline="central">{e}</text>}
        <text x={x + 44} y={y + 47} className="s-word" textAnchor="middle">{w}</text>
      </CutCard>
    })}
  </Page>)
}

function PictureSet({ items, name }) {
  const grid = (i) => ({ x: 12 + (i % 3) * 64, y: 48 + Math.floor(i / 3) * 56 })
  const groups = chunk(items, 12)
  const kinds = [
    { key: 'k', title: `Kartu kontrol: ${name}`, line: 'Kartu gambar + kata. Simpan satu set ini sebagai kunci; anak mencocokkan kartu gambar dan kartu kata dengannya.', draw: ([e, w], x, y) => <><text x={x + 29} y={y + 21} className="s-emoji-l" textAnchor="middle" dominantBaseline="central">{e}</text><text x={x + 29} y={y + 45} className="s-word" textAnchor="middle">{w}</text></> },
    { key: 'g', title: `Kartu gambar: ${name}`, line: 'Gunting kartunya. Anak menyebutkan nama gambar, lalu mencari kartu kata yang cocok.', draw: ([e], x, y) => <text x={x + 29} y={y + 27} className="s-emoji-l" textAnchor="middle" dominantBaseline="central">{e}</text> },
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

// ---------- Paket angka (dijual): satu lembar untuk tiap angka ----------
const COUNT_SHAPES = ['bintang', 'hati', 'lingkaran', 'segitiga', 'persegi', 'segi enam']

function angkaPages(from, to) {
  return Array.from({ length: to - from + 1 }, (_, k) => {
    const n = from + k, color = PALETTE[(n - 1) % 6], shape = COUNT_SHAPES[(n - 1) % 6], ten = n > 10
    // satu kelompok bulatan: dipakai pada pilihan "lingkari"
    const options = [n > 1 ? n - 1 : n + 2, n, n + 1]
    const shift = n % 3
    const ordered = options.map((_, i) => options[(i + shift) % 3])
    const frame = (x, y, count) => <g>
      <rect x={x} y={y} width="65" height="26" rx="2" fill="#fff" stroke={OLIVE} strokeWidth=".4" />
      {Array.from({ length: 10 }, (_, i) => <rect key={i} x={x + (i % 5) * 13} y={y + Math.floor(i / 5) * 13} width="13" height="13" fill="none" stroke={LINE} strokeWidth=".3" />)}
      {Array.from({ length: count }, (_, i) => <circle key={i} cx={x + (i % 5) * 13 + 6.5} cy={y + Math.floor(i / 5) * 13 + 6.5} r="4.4" fill={color} stroke={OLIVE} strokeWidth=".4" />)}
    </g>
    return <Page key={n} title={`Angka ${n}`} lines={[`Ini angka ${n}, dibaca "${KATA[n]}". Jiplak, hitung, warnai, lalu tulis sendiri.`]}>
      <rect x="12" y="44" width="186" height="68" rx="4" fill="#faf6ec" stroke="#e1dacd" strokeWidth=".4" />
      <text x={ten ? 40 : 40} y="86" textAnchor="middle" fontSize={ten ? 40 : 54} fontWeight="700" style={{ fontFamily: "'Nunito','Trebuchet MS',sans-serif", fill: color }}>{n}</text>
      <text x="40" y="104" className="s-label" textAnchor="middle">{KATA[n]}</text>
      {ten ? <>{frame(82, 50, 10)}{frame(82, 82, n - 10)}<text x="152" y="66" className="s-label">10</text><text x="152" y="98" className="s-label">+ {n - 10} = {n}</text></>
        : Array.from({ length: n }, (_, i) => <Shape key={i} name={shape} cx={90 + (i % 5) * 21} cy={62 + Math.floor(i / 5) * 24} r={7} fill={color} stroke={OLIVE} />)}
      <text x="12" y="123" className="s-label">1. Jiplak angkanya</text>
      {[0, 1].map((row) => { const y = 145 + row * 26; return <g key={row}>
        <line x1="12" y1={y} x2="198" y2={y} stroke="#cfc9b5" strokeWidth=".4" />
        <line x1="12" y1={y - 15} x2="198" y2={y - 15} stroke="#e8e3d3" strokeWidth=".4" strokeDasharray="1.5 1.5" />
        {[0, 1, 2, 3, 4].map((i) => <text key={i} x={14 + i * 37} y={y - 1.5} className={row === 0 && i === 0 ? 's-trace-solid' : 's-trace'}>{n}</text>)}
      </g> })}
      <text x="12" y="186" className="s-label">2. Hitung dan warnai bentuknya</text>
      {Array.from({ length: n }, (_, i) => <Shape key={i} name={shape} cx={20 + (i % 10) * 17.5} cy={199 + Math.floor(i / 10) * 17} r={6} fill="#fff" stroke={OLIVE} />)}
      <text x="12" y="238" className="s-label">3. Lingkari kelompok yang berisi {n}</text>
      {ordered.map((count, g) => <g key={g}>
        <rect x={12 + g * 63} y="242" width="60" height="24" rx="3" fill="#fff" stroke={LINE} strokeWidth=".4" strokeDasharray="2 1.6" />
        {Array.from({ length: count }, (_, i) => <circle key={i} cx={18 + g * 63 + (i % 9) * 6.2} cy={248 + Math.floor(i / 9) * 6.2} r="2.2" fill={color} stroke={OLIVE} strokeWidth=".3" />)}
      </g>)}
      <text x="12" y="278" className="s-label">4. Tulis angkanya</text>
      {Array.from({ length: 6 }, (_, i) => <rect key={i} x={50 + i * 17} y="271" width="13" height="10" fill="#fff" stroke={OLIVE} strokeWidth=".4" />)}
    </Page>
  })
}

// ---------- Paket huruf (dijual): satu lembar untuk tiap huruf ----------
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function hurufPages() {
  return ALPHABET.map((L, idx) => {
    const l = L.toLowerCase(), color = PALETTE[idx % 6]
    let seed = (idx + 1) * 7919
    const rand = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648 }
    const others = ALPHABET.filter((x) => x !== L)
    const target = new Set(); while (target.size < 8) target.add(Math.floor(rand() * 36))
    const grid = Array.from({ length: 36 }, (_, i) => { const t = target.has(i); const ch = t ? L : others[Math.floor(rand() * 25)]; return { ch: rand() < .5 ? ch : ch.toLowerCase(), t } })
    // pastikan huruf target tampil dalam dua bentuk (besar dan kecil)
    const marks = grid.filter((g) => g.t); marks.forEach((g, i) => { g.ch = i % 2 ? l : L })
    const font = { fontFamily: "'Nunito','Trebuchet MS',sans-serif", fontWeight: 700 }
    return <Page key={L} title={`Huruf ${L}${l}`} lines={[`Ini huruf ${L} besar dan ${l} kecil. Jiplak, cari, lalu tulis sendiri.`]}>
      <rect x="12" y="44" width="186" height="62" rx="4" fill="#faf6ec" stroke="#e1dacd" strokeWidth=".4" />
      <text x="60" y="94" textAnchor="middle" fontSize="58" style={{ ...font, fill: color }}>{L}</text>
      <text x="120" y="94" textAnchor="middle" fontSize="58" style={{ ...font, fill: color }}>{l}</text>
      <text x="12" y="117" className="s-label">1. Jiplak hurufnya</text>
      {[[L, 140], [l, 166]].map(([ch, y], row) => <g key={row}>
        <line x1="12" y1={y} x2="198" y2={y} stroke="#cfc9b5" strokeWidth=".4" />
        <line x1="12" y1={y - 15} x2="198" y2={y - 15} stroke="#e8e3d3" strokeWidth=".4" strokeDasharray="1.5 1.5" />
        {[0, 1, 2, 3, 4].map((i) => <text key={i} x={14 + i * 37} y={y - 1.5} className={i === 0 ? 's-trace-solid' : 's-trace'}>{ch}</text>)}
      </g>)}
      <text x="12" y="182" className="s-label">2. Cari dan lingkari huruf {L} atau {l}</text>
      {grid.map((g, i) => <text key={i} x={22 + (i % 9) * 20.5} y={197 + Math.floor(i / 9) * 14} textAnchor="middle" fontSize="8.5" style={font}>{g.ch}</text>)}
      <text x="12" y="260" className="s-label">3. Tulis sendiri</text>
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x={12 + i * 23.2} y="264" width="19" height="19" fill="#fff" stroke={OLIVE} strokeWidth=".4" />)}
    </Page>
  })
}

// ---------- Mewarnai (dijual): gambar garis sederhana ----------
const OUT = { fill: 'none', stroke: INK, strokeWidth: 1.1, strokeLinejoin: 'round', strokeLinecap: 'round' }
const ring = (cx, cy, r, n, draw) => Array.from({ length: n }, (_, i) => <g key={i} transform={`rotate(${(360 / n) * i} ${cx} ${cy})`}>{draw(i)}</g>)

const COLORING = {
  bunga: () => <g {...OUT}>
    {ring(105, 120, 0, 8, (i) => <ellipse key={i} cx="105" cy="82" rx="14" ry="26" />)}
    <circle cx="105" cy="120" r="17" /><circle cx="105" cy="120" r="8" />
    <path d="M105 140 C100 190 110 230 105 268" /><path d="M105 205 C80 190 62 196 54 212 C78 222 96 216 105 205 Z" /><path d="M105 232 C130 214 150 220 158 236 C134 246 114 242 105 232 Z" />
    <path d="M30 270 H180" />{[40, 70, 140, 165].map((x) => <path key={x} d={`M${x} 270 l-3 -9 M${x} 270 l3 -10`} />)}
  </g>,
  rumah: () => <g {...OUT}>
    <rect x="50" y="140" width="110" height="100" /><path d="M40 142 L105 80 L170 142 Z" /><rect x="132" y="88" width="14" height="30" />
    <rect x="92" y="180" width="26" height="60" /><circle cx="112" cy="212" r="1.8" />
    <rect x="62" y="158" width="24" height="24" /><path d="M74 158 V182 M62 170 H86" /><rect x="124" y="158" width="24" height="24" /><path d="M136 158 V182 M124 170 H148" />
    <circle cx="176" cy="62" r="16" />{ring(176, 62, 0, 10, () => <path d="M176 38 v-8" />)}
    <path d="M24 100 q8 -14 22 -8 q8 -12 22 -2 q12 0 10 12 H24 Z" />
    <path d="M20 240 H190" />{[30, 60, 150, 178].map((x) => <path key={x} d={`M${x} 240 l-3 -10 M${x} 240 l3 -9`} />)}
  </g>,
  pohon: () => <g {...OUT}>
    <path d="M92 270 L96 170 H114 L118 270" /><path d="M96 200 L72 176 M112 190 L134 166" />
    <path d="M62 178 C30 176 28 138 54 128 C44 98 78 72 100 84 C116 66 150 74 154 100 C182 104 186 150 156 160 C150 182 118 188 106 176 C94 186 70 188 62 178 Z" />
    {[[86, 118], [126, 108], [104, 150], [66, 148], [146, 136]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6" />)}
    <path d="M20 270 H190" />
    <path d="M160 52 q6 -8 12 0 q6 -8 12 0" /><path d="M36 60 q5 -7 10 0 q5 -7 10 0" />
  </g>,
  ikan: () => <g {...OUT} transform="translate(-12 12)">
    <path d="M40 140 C70 80 140 80 164 140 C140 200 70 200 40 140 Z" /><path d="M164 140 L204 104 V176 Z" />
    <circle cx="76" cy="128" r="7" /><circle cx="76" cy="128" r="2.4" /><path d="M52 150 q8 6 16 2" />
    <path d="M100 92 C106 66 130 66 134 92" /><path d="M104 188 C108 206 126 206 130 188" />
    {[[96, 140], [114, 124], [132, 140], [114, 156]].map(([x, y], i) => <path key={i} d={`M${x - 8} ${y} q8 -10 16 0 q-8 10 -16 0`} />)}
    {[[40, 70, 6], [58, 56, 9], [32, 50, 4]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}
    <path d="M30 270 C50 230 60 240 56 214 M56 270 C74 240 84 252 80 226" /><path d="M20 38 q10 -8 20 0 q10 8 20 0 q10 -8 20 0 q10 8 20 0 q10 -8 20 0 q10 8 20 0 q10 -8 20 0" />
  </g>,
  kupu: () => <g {...OUT}>
    <path d="M105 140 C70 50 20 70 30 130 C36 168 80 160 105 140 Z" /><path d="M105 140 C140 50 190 70 180 130 C174 168 130 160 105 140 Z" />
    <path d="M105 150 C70 160 40 200 62 232 C86 250 100 196 105 150 Z" /><path d="M105 150 C140 160 170 200 148 232 C124 250 110 196 105 150 Z" />
    <ellipse cx="105" cy="170" rx="7" ry="52" /><circle cx="105" cy="108" r="9" /><path d="M101 100 C96 80 86 72 78 72 M109 100 C114 80 124 72 132 72" />
    {[[62, 100, 12], [150, 100, 12], [60, 205, 8], [150, 205, 8]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}
    {[[52, 128, 5], [158, 128, 5]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}
  </g>,
  mobil: () => <g {...OUT}>
    <path d="M20 190 V160 Q20 148 34 146 L62 140 L82 106 Q86 100 94 100 H138 Q146 100 150 106 L170 140 L190 146 Q202 150 202 160 V190 Z" />
    <path d="M70 140 L88 112 H108 V140 Z" /><path d="M118 112 H136 L152 140 H118 Z" />
    <circle cx="64" cy="192" r="22" /><circle cx="64" cy="192" r="9" /><circle cx="160" cy="192" r="22" /><circle cx="160" cy="192" r="9" />
    <circle cx="30" cy="166" r="5" /><circle cx="194" cy="166" r="5" />
    <path d="M10 222 H210" /><path d="M20 250 H50 M80 250 H110 M140 250 H170" />
    <path d="M30 60 q8 -14 22 -8 q8 -12 22 -2 q12 0 10 12 Z" /><path d="M140 50 q8 -14 22 -8 q8 -12 22 -2 q12 0 10 12 Z" />
  </g>,
  balon: () => <g {...OUT}>
    {[[60, 100, 30, 38], [105, 78, 32, 40], [150, 104, 30, 38], [82, 168, 28, 36], [130, 170, 28, 36]].map(([x, y, rx, ry], i) => <g key={i}>
      <ellipse cx={x} cy={y} rx={rx} ry={ry} /><path d={`M${x - 5} ${y + ry + 8} L${x} ${y + ry} L${x + 5} ${y + ry + 8} Z`} /><path d={`M${x} ${y + ry + 8} q-8 20 4 36 q8 14 -2 30`} /><path d={`M${x - rx * .5} ${y - ry * .3} q4 -14 14 -16`} />
    </g>)}
    <polygon points={pts(starPoints(36, 50, 9, 4))} /><polygon points={pts(starPoints(176, 56, 10, 4.5))} />
  </g>,
  pelangi: () => <g {...OUT}>
    {[104, 88, 72, 56, 40, 24].map((r) => <path key={r} d={`M${105 - r} 200 A${r} ${r} 0 0 1 ${105 + r} 200`} />)}
    <path d="M1 200 H105" transform="translate(0 0)" />
    <path d="M30 206 q-14 0 -14 14 q0 12 14 12 H80 q14 0 14 -12 q0 -12 -14 -14 q-4 -12 -20 -8 q-14 -4 -30 8 Z" /><path d="M130 206 q-14 0 -14 14 q0 12 14 12 H180 q14 0 14 -12 q0 -12 -14 -14 q-4 -12 -20 -8 q-14 -4 -30 8 Z" />
    <circle cx="176" cy="68" r="20" />{ring(176, 68, 0, 12, () => <path d="M176 40 v-10" />)}
    <path d="M30 262 q6 -12 12 0 q6 -12 12 0 M150 258 q5 -10 10 0 q5 -10 10 0" />
  </g>,
}
const COLORING_TITLES = { bunga: 'Bunga', rumah: 'Rumah', pohon: 'Pohon apel', ikan: 'Ikan di laut', kupu: 'Kupu-kupu', mobil: 'Mobil', balon: 'Balon udara', pelangi: 'Pelangi' }

const mandala = (n, variant) => <g {...OUT} strokeWidth="0.9">
  {[96, 84, 64, 40, 18].map((r) => <circle key={r} cx="105" cy="160" r={r} />)}
  {ring(105, 160, 0, n, (i) => variant === 0 ? <ellipse cx="105" cy="94" rx="9" ry="16" /> : variant === 1 ? <path d="M105 64 L116 90 L105 106 L94 90 Z" /> : <circle cx="105" cy="92" r="9" />)}
  {ring(105, 160, 0, n, () => <path d="M105 140 V122" />)}
  {ring(105, 160, 0, n * 2, () => <circle cx="105" cy="80" r="3.2" />)}
  <polygon points={pts(polygon(105, 160, 28, n, -90))} />
</g>

function mewarnaiPages() {
  return [...Object.keys(COLORING).map((key) => <Page key={key} title={`Mewarnai: ${COLORING_TITLES[key]}`} lines={['Warnai sesuka hati. Tidak ada warna yang salah.']}>{COLORING[key]()}</Page>),
    ...[[8, 0, 'Mandala bunga'], [10, 1, 'Mandala berlian'], [12, 2, 'Mandala bulatan']].map(([n, v, t]) => <Page key={t} title={`Mewarnai: ${t}`} lines={['Mulai dari tengah, lalu warnai ke luar. Pakai warna favorit anak.']}>{mandala(n, v)}</Page>)]
}

// ---------- Gunting dan kolase (dijual) ----------
const spiral = (cx, cy, turns, gap) => { const out = []; for (let t = 0; t <= turns * 2 * Math.PI; t += .15) { const r = gap * t / (2 * Math.PI); out.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]) } return pts(out) }
const waveD = (x0, x1, y, amp, len) => { let d = `M${x0} ${y}`; for (let x = x0; x < x1; x += len) d += ` q${len / 4} ${-amp} ${len / 2} 0 q${len / 4} ${amp} ${len / 2} 0`; return d }
const zigzag = (x0, x1, y, amp, step) => { const out = []; let up = true; for (let x = x0; x <= x1; x += step) { out.push([x, y + (up ? -amp : amp)]); up = !up } return pts(out) }
const CUT = { fill: 'none', stroke: '#6b694b', strokeWidth: .7, strokeDasharray: '2.2 1.6', strokeLinecap: 'round', strokeLinejoin: 'round' }
const Marks = ({ x1, x2, y }) => <g><circle cx={x1} cy={y} r="2.2" fill="#6fa86b" /><polygon points={pts(starPoints(x2, y, 3.4, 1.5))} fill="#f2a33a" /></g>

function guntingPages() {
  const head = (text) => [`${text} Mulai dari titik hijau, selesai di bintang oranye.`]
  return [
    <Page key="lurus" title="Gunting: garis lurus" lines={head('Gunting mengikuti garis putus-putus.')}>{Array.from({ length: 8 }, (_, i) => { const y = 56 + i * 30; return <g key={i}><line x1="22" y1={y} x2="188" y2={y} {...CUT} /><Marks x1={16} x2={194} y={y} /></g> })}</Page>,
    <Page key="zigzag" title="Gunting: zigzag" lines={head('Gunting dengan gerakan naik turun.')}>{Array.from({ length: 6 }, (_, i) => { const y = 66 + i * 38, amp = 5 + (i % 3) * 3; return <g key={i}><polyline points={zigzag(22, 188, y, amp, 166 / (8 + i * 2))} {...CUT} /><Marks x1={16} x2={194} y={y} /></g> })}</Page>,
    <Page key="gelombang" title="Gunting: gelombang" lines={head('Gunting garis melengkung perlahan.')}>{Array.from({ length: 6 }, (_, i) => { const y = 66 + i * 38; return <g key={i}><path d={waveD(22, 188, y, 6 + (i % 3) * 3, 166 / (4 + i))} {...CUT} /><Marks x1={16} x2={194} y={y} /></g> })}</Page>,
    <Page key="bulat" title="Gunting: lingkaran dan spiral" lines={['Gunting mengikuti garis. Untuk spiral, mulai dari tepi luar dan gunting sampai ke tengah.']}>
      <circle cx="58" cy="84" r="30" {...CUT} /><circle cx="152" cy="84" r="30" {...CUT} />
      <polygon points={pts(polygon(58, 168, 30, 3))} {...CUT} /><rect x="122" y="140" width="60" height="56" {...CUT} />
      <polyline points={spiral(105, 244, 4.5, 6.5)} {...CUT} /><text x="150" y="222" className="s-label">spiral: gunting sampai ke tengah</text>
    </Page>,
  ]
}

const PIECE = (x, y, w, h, fill, label, round = 0) => <g key={`${x}-${y}`}><rect x={x} y={y} width={w} height={h} rx={round} fill={fill} stroke="#6b694b" strokeWidth=".6" strokeDasharray="2 1.6" />{label && <text x={x + w / 2} y={y + h + 4.5} className="s-label" textAnchor="middle">{label}</text>}</g>
const GHOST = { fill: 'none', stroke: '#b9b49c', strokeWidth: .7, strokeDasharray: '1.6 1.6' }

function kolasePages() {
  return [
    <Page key="rumah-1" title="Kolase: rumah (tempel di sini)" lines={['Gunting bentuk di lembar berikutnya, lalu tempel pada bayangan yang sama.']}>
      <rect x="55" y="140" width="100" height="100" {...GHOST} /><polygon points="45,142 105,84 165,142" {...GHOST} /><rect x="95" y="190" width="24" height="50" {...GHOST} /><rect x="66" y="156" width="22" height="22" {...GHOST} /><rect x="126" y="156" width="22" height="22" {...GHOST} /><circle cx="170" cy="70" r="16" {...GHOST} />
      <path d="M20 240 H190" stroke="#b9b49c" strokeWidth=".7" />
    </Page>,
    <Page key="rumah-2" name={false} title="Kolase: rumah (potongan)" lines={['Gunting di sepanjang garis putus-putus. Warnai dulu kalau mau.']}>
      {PIECE(20, 50, 100, 100, '#f2c230', 'dinding')}
      <polygon points="140,50 200,50 170,100" fill="#d9544d" stroke="#6b694b" strokeWidth=".6" strokeDasharray="2 1.6" /><text x="170" y="108" className="s-label" textAnchor="middle">atap (gunting segitiganya)</text>
      {PIECE(20, 172, 24, 50, '#8e6bb8', 'pintu')}{PIECE(60, 172, 22, 22, '#3b7dd8', 'jendela')}{PIECE(96, 172, 22, 22, '#3b7dd8', 'jendela')}
      <circle cx="160" cy="190" r="16" fill="#f2a33a" stroke="#6b694b" strokeWidth=".6" strokeDasharray="2 1.6" /><text x="160" y="212" className="s-label" textAnchor="middle">matahari</text>
    </Page>,
    <Page key="robot-1" title="Kolase: robot (tempel di sini)" lines={['Gunting potongan robot di lembar berikutnya, lalu tempel pada bayangan yang sama.']}>
      <rect x="80" y="62" width="50" height="44" {...GHOST} /><rect x="70" y="112" width="70" height="70" {...GHOST} /><rect x="40" y="116" width="26" height="12" {...GHOST} /><rect x="144" y="116" width="26" height="12" {...GHOST} /><rect x="78" y="186" width="20" height="46" {...GHOST} /><rect x="112" y="186" width="20" height="46" {...GHOST} />
      <circle cx="94" cy="80" r="6" {...GHOST} /><circle cx="116" cy="80" r="6" {...GHOST} /><rect x="94" y="94" width="22" height="6" {...GHOST} /><line x1="105" y1="62" x2="105" y2="48" {...GHOST} /><circle cx="105" cy="44" r="4" {...GHOST} />
    </Page>,
    <Page key="robot-2" name={false} title="Kolase: robot (potongan)" lines={['Gunting di sepanjang garis putus-putus. Warnai dulu kalau mau.']}>
      {PIECE(20, 50, 50, 44, '#3b7dd8', 'kepala')}{PIECE(84, 50, 70, 70, '#d9544d', 'badan')}{PIECE(20, 112, 26, 12, '#f2a33a', 'tangan')}{PIECE(54, 112, 26, 12, '#f2a33a', 'tangan')}{PIECE(20, 150, 20, 46, '#6fa86b', 'kaki')}{PIECE(50, 150, 20, 46, '#6fa86b', 'kaki')}
      <circle cx="100" cy="160" r="6" fill="#f2c230" stroke="#6b694b" strokeWidth=".6" strokeDasharray="2 1.6" /><circle cx="120" cy="160" r="6" fill="#f2c230" stroke="#6b694b" strokeWidth=".6" strokeDasharray="2 1.6" /><text x="110" y="174" className="s-label" textAnchor="middle">mata</text>
      {PIECE(136, 154, 22, 6, '#8e6bb8', 'mulut')}{PIECE(170, 150, 4, 14, '#6b694b', 'antena')}<circle cx="186" cy="157" r="4" fill="#d9544d" stroke="#6b694b" strokeWidth=".6" strokeDasharray="2 1.6" />
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
  { id: 'angka-1-10', category: 'Matematika', icon: '🔟', title: 'Angka 1–10 (Indonesia)', summary: 'Sepuluh lembar, satu angka per lembar: jiplak, hitung, warnai, lingkari, dan tulis sendiri.', how: 'Satu lembar sehari sudah cukup. Mulai dari angka 1, dan lanjut kalau anak masih bersemangat. Dampingi saat menghitung: sentuh tiap benda sambil menyebut angkanya.', pages: () => angkaPages(1, 10) },
  { id: 'angka-11-20', category: 'Matematika', icon: '🔢', title: 'Angka 11–20 (Indonesia)', summary: 'Sepuluh lembar dengan kotak sepuluh (ten frame): anak melihat bahwa 11 itu sepuluh ditambah satu.', how: 'Pakai setelah anak lancar angka 1–10. Tunjuk kotak sepuluh yang penuh, lalu hitung sisanya satu per satu.', pages: () => angkaPages(11, 20) },
  { id: 'huruf-a-z', category: 'Bahasa', icon: '🔠', title: 'Huruf A–Z (satu huruf per lembar)', summary: 'Dua puluh enam lembar: jiplak huruf besar dan kecil, cari dan lingkari huruf di antara huruf lain, lalu tulis sendiri.', how: 'Mulai dari huruf di nama anak. Satu lembar sehari, dan ucapkan bunyi hurufnya sambil menjiplak, bukan hanya namanya.', pages: () => hurufPages() },
  { id: 'mewarnai', category: 'Sensorial', icon: '🖍️', title: 'Mewarnai: gambar dan mandala', summary: 'Delapan gambar garis sederhana (bunga, rumah, pohon, ikan, kupu-kupu, mobil, balon, pelangi) dan tiga mandala.', how: 'Sediakan krayon atau pensil warna dan biarkan anak memilih warnanya. Mandala cocok untuk anak yang sudah lebih tenang memegang krayon.', pages: () => mewarnaiPages() },
  { id: 'gunting-latihan', category: 'Kehidupan praktis', icon: '✂️', title: 'Latihan menggunting', summary: 'Empat lembar: garis lurus, zigzag, gelombang, serta lingkaran dan spiral, dari mudah ke sulit.', how: 'Pakai gunting anak yang ujungnya tumpul dan dampingi anak. Mulai dari garis lurus dan naik tingkat kalau anak sudah lancar.', pages: () => guntingPages() },
  { id: 'kolase-bentuk', category: 'Kehidupan praktis', icon: '🏠', title: 'Kolase bentuk: rumah dan robot', summary: 'Dua kolase: gunting potongan bentuk lalu tempel pada bayangannya untuk menyusun rumah dan robot (4 halaman).', how: 'Warnai potongan lebih dulu kalau mau. Beri anak lem stik dan biarkan ia menebak letak tiap potongan sebelum menempel.', pages: () => kolasePages() },
]

export const printableById = Object.fromEntries(printables.map((item) => [item.id, item]))
export const pageCount = (item) => item.pages().length

export function PrintSheets({ item, limit }) {
  return <div className="sheets">{item.pages().slice(0, limit).map((page, i) => React.cloneElement(page, { key: i }))}</div>
}

// Rentang usia (tahun) tiap lembar. Dipakai untuk mengelompokkan lembar per usia dan paket di toko.
const AGES = { 'penjumlahan-tambah-satu': [5, 7], 'kartu-angka': [3, 6], 'jepit-jemuran-angka': [3, 5], 'hari-dan-bulan': [4, 7], 'cocokkan-bentuk': [2, 4], 'roda-warna': [3, 6], 'berburu-benda': [3, 6], 'empat-musim': [4, 7], 'hewan-dan-rumahnya': [3, 6], 'terapung-tenggelam': [4, 7], 'tumbuh-dari-biji': [4, 7], 'utuh-dan-potong': [2, 4], 'dari-mana-asalnya': [4, 6], 'menjahit-bentuk': [3, 5], 'menjiplak-huruf': [4, 6], 'kartu-huruf': [3, 6], 'kartu-makanan': [2, 5], 'kartu-hewan': [2, 5], 'kartu-benda-rumah': [2, 5], 'kartu-perasaan': [3, 7], 'angka-1-10': [3, 6], 'angka-11-20': [4, 7], 'huruf-a-z': [4, 6], 'mewarnai': [2, 6], 'gunting-latihan': [3, 5], 'kolase-bentuk': [3, 6] }
// Lembar yang gambarnya memakai emoji bawaan perangkat. Emoji milik vendor (Apple/Google) tidak boleh dijual ulang,
// jadi lembar ini hanya gratis sampai gambarnya diganti foto atau ilustrasi berlisensi.
const EMOJI_BASED = new Set(['dari-mana-asalnya', 'empat-musim', 'kartu-huruf', 'kartu-makanan', 'kartu-hewan', 'kartu-benda-rumah', 'kartu-perasaan', 'hewan-dan-rumahnya', 'terapung-tenggelam', 'tumbuh-dari-biji'])
// Lembar yang boleh dicetak penuh langsung di website. Lembar lain yang dijual hanya menampilkan contoh halaman pertama.
export const FREE_IDS = new Set(['cocokkan-bentuk', 'menjahit-bentuk', 'gunting-latihan'])
printables.forEach((item) => { item.ages = AGES[item.id]; item.sellable = !EMOJI_BASED.has(item.id); item.free = !item.sellable || FREE_IDS.has(item.id) })
export const printablesForAge = (min, max) => printables.filter((item) => item.ages[0] <= max && item.ages[1] >= min)
