import React from 'react'
import { ArrowLeft, ArrowRight, Clock3 } from 'lucide-react'
import { references } from './references.js'
import { articles } from './articles.js'
import { goToSource, backToText } from './MontessoriPage.jsx'

const domainOf = (url) => new URL(url).hostname.replace(/^www\./, '')

function Cite({ article, keys }) {
  const numbers = keys.map((key) => article.sourceKeys.indexOf(key) + 1).filter((n) => n > 0).sort((a, b) => a - b)
  const label = (n) => { const item = references[article.sourceKeys[n - 1]]; return item ? `${item.org}, ${item.title}` : '' }
  return <sup className="mt-ref">[{numbers.map((n, i) => <React.Fragment key={n}>{i > 0 && ', '}<a href={`#sumber-${n}`} data-cite={n} data-tip={label(n)} onClick={(event) => goToSource(event, n)} aria-label={`Sumber ${n}: ${label(n)}`}>{n}</a></React.Fragment>)}]</sup>
}

function Block({ block, article }) {
  const cite = block.cite ? <Cite article={article} keys={block.cite} /> : null
  switch (block.type) {
    case 'p': return <p className="art-p">{block.text}{cite}</p>
    case 'list': return <ul className="art-list">{block.items.map((item) => <li key={item}>{item}</li>)}</ul>
    case 'steps': return <><ol className="step-list numbered">{block.items.map((item) => <li key={item}>{item}</li>)}</ol>{cite && <p className="art-cite-line">Rujukan: {cite}</p>}</>
    case 'callout': return <aside className="art-callout"><strong>{block.title}</strong><p>{block.text}{cite}</p></aside>
    case 'links': return <ul className="pd-ideas">{block.items.map(([label, slug]) => <li key={slug}><a href={`#/aktivitas/${slug}`}><span>{label}</span><ArrowRight size={14}/></a></li>)}</ul>
    default: return null
  }
}

function scrollToSection(id) {
  const el = document.getElementById(`bagian-${id}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function ArticlePage({ article, children }) {
  const others = articles.filter((item) => item.slug !== article.slug)
  return <main className="subpage montessori-page article-page section-wrap">
    <a className="back-link" href="#beranda"><ArrowLeft size={15}/> Beranda</a>
    <div className="eyebrow">ARTIKEL · PRINSIP RUANG RASA</div>
    <h1>{article.title}</h1>
    <p className="subpage-intro">{article.lead}</p>
    <p className="art-meta"><Clock3 size={13}/> {article.minutes} menit baca · Ditinjau Oktober 2026</p>

    <div className="art-summary"><strong>Intinya</strong><ul>{article.takeaways.map((item) => <li key={item}>{item}</li>)}</ul></div>

    <nav className="art-toc" aria-label="Isi artikel"><span>Isi artikel</span>{article.sections.map((section) => <button key={section.id} type="button" onClick={() => scrollToSection(section.id)}>{section.heading}</button>)}<button type="button" onClick={() => scrollToSection('faq')}>Pertanyaan umum</button></nav>

    {article.sections.map((section) => <section key={section.id} id={`bagian-${section.id}`} className="art-section">
      <h2>{section.heading}</h2>
      {section.blocks.map((block, i) => <Block key={i} block={block} article={article} />)}
    </section>)}

    <section id="bagian-faq" className="art-section">
      <h2>Pertanyaan umum</h2>
      <div className="faq">{article.faq.map((item) => <details key={item.q} className="faq-item"><summary>{item.q}</summary><p>{item.a}{item.cite ? <Cite article={article} keys={item.cite} /> : null}</p></details>)}</div>
    </section>

    <section className="art-section">
      <aside className="evidence-note"><strong>Catatan bukti.</strong> {article.evidence}</aside>
    </section>

    {children}

    <section className="art-section">
      <h2>Sumber</h2>
      <ol className="mt-sources">{article.sourceKeys.map((key, index) => { const item = references[key]; return item ? <li key={key} id={`sumber-${index + 1}`}><div className="src-body"><span className="src-cite">{item.org}{item.year ? ` (${item.year})` : ''}. <a href={item.url} target="_blank" rel="noreferrer noopener"><em>{item.title}</em></a>{item.venue ? <>. {item.venue}</> : null}.</span><span className="src-meta">{item.type} · {domainOf(item.url)} · Diakses Oktober 2026 · <button type="button" className="src-back" onClick={() => backToText(index + 1)}>↑ Kembali ke teks</button></span></div></li> : null })}</ol>
    </section>

    <section className="art-section">
      <h2>Baca juga</h2>
      <div className="art-more">{others.map((item) => <a key={item.slug} href={`#/nilai/${item.slug}`} className="side-card"><h3>{item.title}</h3><p>{item.lead.slice(0, 120).replace(/\s+\S*$/, '')}…</p><span className="mt-plane-link">Baca artikel <ArrowRight size={13}/></span></a>)}</div>
    </section>
  </main>
}
