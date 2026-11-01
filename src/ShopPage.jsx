import React from 'react'
import { ArrowLeft, ArrowRight, Printer } from 'lucide-react'
import { printables, printablesForAge, pageCount } from './printables.jsx'
import { SHOP } from './shop.js'

const Thumb = ({ item }) => <div className="shop-thumb" aria-hidden="true">{React.cloneElement(item.pages()[0], { key: 'thumb' })}</div>

const rupiah = (value) => `Rp${Number(value).toLocaleString('id-ID')}`

function OrderButton({ band }) {
  const price = SHOP.prices[band.slug]
  if (!SHOP.orderUrl) return <span className="shop-soon">Segera dijual</span>
  return <a className="button-primary" href={SHOP.orderUrl} target="_blank" rel="noopener noreferrer">Pesan paket{price ? ` · ${rupiah(price)}` : ''} <ArrowRight size={16}/></a>
}

export default function ShopPage() {
  const free = printables.filter((item) => !item.sellable)
  return <main className="subpage montessori-page section-wrap shop-page">
    <a className="back-link" href="#aktivitas"><ArrowLeft size={15}/> Beranda</a>
    <div className="eyebrow">WORKSHEET RUANG RASA</div>
    <h1>Paket worksheet per usia</h1>
    <p className="subpage-intro">Lembar kerja Montessori berbahasa Indonesia yang dirancang sendiri oleh Ruang Rasa, siap cetak di kertas A4. Pilih paket sesuai usia anak, cetak berulang kali di rumah.</p>
    <p className="source-note">{SHOP.orderUrl ? 'Klik "Pesan paket" untuk melanjutkan ke halaman pemesanan.' : 'Pemesanan belum dibuka. Sambil menunggu, setiap lembar bisa dilihat dan dicoba gratis dengan menekan kartunya.'}</p>
    {SHOP.bands.map((band) => {
      const sheets = printablesForAge(band.min, band.max).filter((item) => item.sellable)
      const pages = sheets.reduce((sum, item) => sum + pageCount(item), 0)
      return <section key={band.slug} id={band.slug} className="shop-band">
        <div className="section-heading"><div><h2>Usia {band.label}</h2><p>{band.blurb}</p></div><span className="activity-count">{sheets.length} lembar · {pages} halaman A4</span></div>
        <div className="shop-grid">{sheets.map((item) => <a key={item.id} className="shop-card" href={`#/cetak/${item.id}`}>
          <Thumb item={item} />
          <h3>{item.title}</h3>
          <span className="printable-meta"><Printer size={13}/> {pageCount(item)} halaman · usia {item.ages[0]}–{item.ages[1]} tahun</span>
        </a>)}</div>
        <div className="print-actions"><OrderButton band={band} /></div>
      </section>
    })}
    <section className="shop-band">
      <div className="section-heading"><div><h2>Gratis dulu</h2><p>Lembar bergambar ini masih memakai emoji bawaan perangkat, yang tidak boleh dijual ulang. Gambarnya akan diganti foto atau ilustrasi berlisensi sebelum masuk paket.</p></div><span className="activity-count">{free.length} lembar</span></div>
      <ul className="pd-ideas">{free.map((item) => <li key={item.id}><a href={`#/cetak/${item.id}`}><span>{item.icon}</span>{item.title} · usia {item.ages[0]}–{item.ages[1]}<ArrowRight size={14}/></a></li>)}</ul>
    </section>
  </main>
}
