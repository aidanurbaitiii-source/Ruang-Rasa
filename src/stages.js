// Empat tahap perkembangan menurut Montessori (rentang usia dan penamaan tahap 1–2 merujuk glosarium AMI).
// Aktivitas dikelompokkan ke halaman usia berdasarkan rentang `age` di src/activities.js, misalnya '2–4 tahun'.

export const stages = [
  {
    slug: '0-6-tahun', range: [0, 6], age: '0–6 tahun', name: 'Pikiran yang menyerap',
    note: 'Anak belajar lewat indra dan gerak, serta berkembang pesat dalam bahasa dan kemandirian.',
    intro: 'Menurut Montessori, pada tahap ini anak menyerap bahasa, kebiasaan, dan suasana di sekitarnya hampir tanpa disadari. Karena itu, lingkungan yang aman, teratur, dan mudah dijangkau sangat berarti.',
    traits: ['Belajar lewat indra dan gerak', 'Menyerap bahasa dan kebiasaan dari lingkungan', 'Ada masa peka untuk bahasa, keteraturan, dan gerak', 'Berkembang pesat dalam kemandirian'],
    refs: [4, 5],
  },
  {
    slug: '6-12-tahun', range: [6, 12], age: '6–12 tahun', name: 'Pikiran yang bernalar',
    note: 'Anak mulai beralih dari hal konkret ke hal abstrak, dan semakin ingin tahu tentang dunia.',
    intro: 'Pada tahap ini, menurut Montessori, cara berpikir anak mulai bergeser dari hal yang konkret ke hal yang abstrak, dan rasa ingin tahunya tentang dunia semakin luas.',
    traits: ['Peralihan dari berpikir konkret ke abstrak', 'Rasa ingin tahu yang semakin luas'],
    refs: [4],
  },
  {
    slug: '12-18-tahun', range: [12, 18], age: '12–18 tahun', name: 'Masa remaja',
    note: 'Tahap perubahan besar menuju kedewasaan.',
    intro: 'Tahap ini digambarkan sebagai masa perubahan yang pesat menuju kedewasaan.',
    traits: ['Masa perubahan yang pesat'],
    refs: [4],
  },
  {
    slug: '18-24-tahun', range: [18, 24], age: '18–24 tahun', name: 'Dewasa muda',
    note: 'Tahap konsolidasi sebelum dewasa penuh.',
    intro: 'Tahap ini digambarkan lebih stabil, sebagai masa memantapkan apa yang sudah dipelajari sebelum dewasa penuh.',
    traits: ['Masa memantapkan apa yang sudah dipelajari'],
    refs: [4],
  },
]

export const stageBySlug = Object.fromEntries(stages.map((stage) => [stage.slug, stage]))

// '2–4 tahun' -> [2, 4]
export function parseAgeRange(text) {
  const match = String(text).match(/(\d+)\s*[–-]\s*(\d+)/)
  return match ? [Number(match[1]), Number(match[2])] : null
}

export function stageIncludes(stage, ageText) {
  const range = parseAgeRange(ageText)
  return Boolean(range) && range[0] <= stage.range[1] && range[1] >= stage.range[0]
}

export const stageForAge = (ageText) => stages.find((stage) => stageIncludes(stage, ageText))
