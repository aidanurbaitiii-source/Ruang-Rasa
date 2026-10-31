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
    intro: 'Pada tahap ini, menurut Montessori, cara berpikir anak mulai bergeser dari hal yang konkret ke hal yang abstrak. Imajinasi, rasa ingin tahu intelektual, dan pencarian pemahaman moral berkembang, begitu pula keinginan untuk bekerja bersama teman sebaya.',
    traits: ['Peralihan dari berpikir konkret ke abstrak', 'Imajinasi dan rasa ingin tahu intelektual', 'Pencarian pemahaman moral', 'Semakin ingin bekerja dengan teman sebaya'],
    refs: [4, 17],
  },
  {
    slug: '12-18-tahun', range: [12, 18], age: '12–18 tahun', name: 'Masa remaja',
    note: 'Tahap perubahan besar menuju kedewasaan.',
    intro: 'Tahap ini digambarkan sebagai masa perubahan yang pesat menuju kedewasaan. Untuk remaja, Montessori mengusulkan Erdkinder ("anak-anak tanah"): belajar lewat kerja nyata di lahan dan komunitas, bukan hanya di dalam kelas.',
    traits: ['Masa perubahan yang pesat', 'Belajar lewat kerja nyata dan bermakna', 'Terhubung dengan alam dan komunitas'],
    refs: [4, 13, 16],
  },
  {
    slug: '18-24-tahun', range: [18, 24], age: '18–24 tahun', name: 'Dewasa muda',
    note: 'Tahap konsolidasi sebelum dewasa penuh.',
    intro: 'Tahap ini digambarkan sebagai masa memantapkan identitas dan mencari kontribusi yang bermakna bagi masyarakat. Montessori sendiri menulis relatif sedikit tentang tahap ini, sehingga banyak penjelasannya berasal dari tafsir pendidik Montessori sesudahnya.',
    traits: ['Memantapkan identitas', 'Mencari kontribusi bermakna bagi masyarakat', 'Belajar mandiri dan berpikir kritis'],
    refs: [14, 15],
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
  // Batas dianggap setengah terbuka: aktivitas 12–18 tahun tidak ikut masuk ke tahap 6–12 atau 18–24.
  return Boolean(range) && range[0] < stage.range[1] && range[1] > stage.range[0]
}

export const stageForAge = (ageText) => stages.find((stage) => stageIncludes(stage, ageText))
