import React from 'react'
import { ArrowLeft, ArrowRight, Printer } from 'lucide-react'
import { printables, printablesForAge, printableById, pageCount } from './printables.jsx'
import { SHOP } from './shop.js'

const Thumb = ({ item }) => <div className="shop-thumb" aria-hidden="true">{React.cloneElement(item.pages()[0], { key: 'thumb' })}</div>
const rupiah = (value) => `Rp${Number(value).toLocaleString('id-ID')}`
const totalPages = (list) => list.reduce((sum, item) => sum + pageCount(item), 0)

function OrderButton({ slug, label, url = SHOP.orderUrl }) {
  const price = SHOP.prices[slug]
  if (!url) return <span className="shop-soon">Segera dibuka</span>
  return <a className="button-primary" href={url} target="_blank" rel="noopener noreferrer">{label}{price ? ` · ${rupiah(price)}` : ''} <ArrowRight size={16}/></a>
}

function SheetGrid({ list }) {
  return <div className="shop-grid">{list.map((item) => <a key={item.id} className="shop-card" href={`#/cetak/${item.id}`}>
    <Thumb item={item} />
    <h3>{item.title}</h3>
    <span className="printable-meta"><Printer size={13}/> {pageCount(item)} halaman · usia {item.ages[0]}–{item.ages[1]} tahun{item.free ? ' · gratis' : ''}</span>
  </a>)}</div>
}

export default function ShopPage() {
  const sellable = printables.filter((item) => item.sellable)
  const free = printables.filter((item) => item.free)
  const donation = SHOP.donationIds.map((id) => printableById[id]).filter(Boolean)
  const bundles = [
    { id: 'gratis', title: 'Paket gratis', tag: 'Gratis', text: 'Cetak langsung di rumah, tanpa daftar dan tanpa bayar.', list: free },
    { id: 'seikhlasnya', title: 'Paket seikhlasnya', tag: 'Bayar sesuai kemampuan', text: 'Angka, huruf, dan mewarnai. Bayar berapa pun yang terasa pantas, atau ambil gratis dulu kalau sedang tidak memungkinkan.', list: donation },
    { id: 'lengkap', title: 'Paket lengkap', tag: 'Gabungan semua usia', text: 'Semua lembar vektor Ruang Rasa dalam satu paket, dari usia 2 sampai 7 tahun.', list: sellable },
  ]
  return <main className="subpage montessori-page section-wrap shop-page">
    <a className="back-link" href="#aktivitas"><ArrowLeft size={15}/> Beranda</a>
    <div className="eyebrow">WORKSHEET RUANG RASA</div>
    <h1>Worksheet Montessori siap cetak</h1>
    <p className="subpage-intro">Lembar kerja berbahasa Indonesia yang dirancang sendiri oleh Ruang Rasa, siap cetak di kertas A4. Pilih paket gratis, bayar seikhlasnya, atau paket gabungan.</p>

    <section className="bundle-row" aria-label="Pilihan paket">
      {bundles.map((bundle) => <article key={bundle.id} className="bundle-card">
        <span className="bundle-tag">{bundle.tag}</span>
        <h2>{bundle.title}</h2>
        <p>{bundle.text}</p>
        <div className="bundle-meta">{bundle.list.length} lembar · {totalPages(bundle.list)} halaman A4</div>
        <div className="bundle-actions">
          {bundle.id === 'gratis' && <a className="button-primary" href="#gratis">Lihat dan cetak <ArrowRight size={16}/></a>}
          {bundle.id === 'seikhlasnya' && <><OrderButton slug="seikhlasnya" label="Bayar seikhlasnya" url={SHOP.donateUrl} />{SHOP.donateUrl && <small>Contoh: {SHOP.suggestedDonations.map(rupiah).join(' · ')} atau berapa pun.</small>}</>}
          {bundle.id === 'lengkap' && <OrderButton slug="lengkap" label="Pesan paket lengkap" />}
        </div>
      </article>)}
    </section>
    {!SHOP.orderUrl && !SHOP.donateUrl && <p className="source-note">Pemesanan dan donasi belum dibuka. Paket gratis sudah bisa dipakai, dan tiap lembar berbayar bisa dilihat contohnya.</p>}

    <section id="gratis" className="shop-band">
      <div className="section-heading"><div><h2>Paket gratis</h2><p>Boleh dicetak sebanyak yang kamu mau untuk dipakai di rumah. Gambar dengan emoji di sini gratis karena emoji bawaan perangkat tidak boleh dijual.</p></div><span className="activity-count">{free.length} lembar</span></div>
      <SheetGrid list={free} />
    </section>

    <section id="seikhlasnya" className="shop-band">
      <div className="section-heading"><div><h2>Paket seikhlasnya</h2><p>Isi paket ini boleh diambil berapa pun nilai yang kamu beri. Hasil donasi membantu Ruang Rasa membuat lembar baru.</p></div><span className="activity-count">{donation.length} paket lembar</span></div>
      <SheetGrid list={donation} />
    </section>

    <section id="per-usia" className="shop-band">
      <div className="section-heading"><div><h2>Pilih per usia</h2><p>Semua lembar vektor, dikelompokkan menurut rentang usia anak.</p></div></div>
      {SHOP.bands.map((band) => {
        const sheets = printablesForAge(band.min, band.max).filter((item) => item.sellable)
        return <div key={band.slug} id={band.slug} className="shop-age">
          <div className="section-heading"><div><h3 className="shop-age-title">Usia {band.label}</h3><p>{band.blurb}</p></div><span className="activity-count">{sheets.length} lembar · {totalPages(sheets)} halaman A4</span></div>
          <SheetGrid list={sheets} />
        </div>
      })}
    </section>
  </main>
}
