import HeroCard from '@/components/HeroCard'

export default function Home() {
  const tags = ['Sports Business', 'Product Thinking', 'Football', 'Media', 'Writing', 'Event Operations']

  const cards = [
    {
      label: 'Essay · Coming soon',
      title: 'Türk futbolu nasıl sürdürülebilir değer yaratabilir?',
      desc: 'Spor kulüpleri, medya gelirleri, taraftar kültürü ve finansal yapı üzerine uzun form bir yazı.',
    },
    {
      label: 'Essay · Coming soon',
      title: 'Spor medyasının değişen dili',
      desc: 'Kısa video, canlı veri, taraftar davranışı ve yeni medya formatları üzerine gözlemler.',
    },
  ]

  return (
    <main className="relative z-10 text-[#f4f4f4] min-h-screen font-[family-name:var(--font-roboto)] leading-relaxed">

      {/* Hero */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-24">
        <HeroCard />
      </section>

      {/* About */}
      <section id="about" className="max-w-[1100px] mx-auto px-6 py-[110px]">
        <div className="text-sm text-[#888] uppercase tracking-[0.14em] mb-7">About</div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-[60px] border-t border-white/10 pt-10">
          <h2 className="text-[clamp(30px,4vw,52px)] leading-[1.1] tracking-[-0.04em] font-medium">
            Kişisel bir hub. CV değil, dijital bir merkez.
          </h2>
          <div className="text-[#c7c7c7] text-[17px]">
            <p>
              Ben İrfan Aşıcıoğlu. Ekonomi, spor yönetimi, ürün düşüncesi ve spor organizasyonları alanlarında
              deneyim kazandım. Bu alanı sporun sadece sahadaki kısmı üzerinden değil; medya, iş modeli, ürün,
              kültür ve insan hikâyeleri üzerinden düşünmek için kullanıyorum.
            </p>
            <div className="flex flex-wrap gap-2.5 mt-7">
              {tags.map((tag) => (
                <span key={tag} className="border border-white/12 px-3 py-2 rounded-full text-[#aaa] text-[13px]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Writing */}
      <section id="writing" className="max-w-[1100px] mx-auto px-6 py-[110px]">
        <div className="text-sm text-[#888] uppercase tracking-[0.14em] mb-7">Writing</div>
        <div className="flex flex-col gap-[18px]">
          {cards.map((card) => (
            <div key={card.title} className="p-[26px] border border-white/10 rounded-[22px] bg-gradient-to-b from-white/[0.045] to-white/[0.015]">
              <small className="text-[#888] block mb-2.5">{card.label}</small>
              <h3 className="text-[22px] font-medium mb-2.5">{card.title}</h3>
              <p className="text-[#aaa]">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Notes */}
      <section id="notes" className="max-w-[1100px] mx-auto px-6 py-[110px]">
        <div className="text-sm text-[#888] uppercase tracking-[0.14em] mb-7">Notes</div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-[60px] border-t border-white/10 pt-10">
          <h2 className="text-[clamp(30px,4vw,52px)] leading-[1.1] tracking-[-0.04em] font-medium">
            Kısa düşünceler, gözlemler ve fikir parçaları.
          </h2>
          <p className="text-[#c7c7c7] text-[17px]">
            Notes bölümü; maçlar, kulüpler, spor ekonomisi, medya trendleri ve profesyonel deneyimler
            üzerine daha kısa ve serbest yazılar için olacak.
          </p>
        </div>
      </section>

      {/* Reading */}
      <section id="reading" className="max-w-[1100px] mx-auto px-6 py-[110px]">
        <div className="text-sm text-[#888] uppercase tracking-[0.14em] mb-7">Reading</div>
        <div className="p-[26px] border border-white/10 rounded-[22px] bg-gradient-to-b from-white/[0.045] to-white/[0.015]">
          <small className="text-[#888] block mb-2.5">Book list</small>
          <h3 className="text-[22px] font-medium mb-2.5">Sports, business and media reading list</h3>
          <p className="text-[#aaa]">
            Spor ekonomisi, futbol kültürü, medya, ürün ve iş dünyası üzerine kitaplar, raporlar ve makaleler.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-[1100px] mx-auto px-6 py-[110px]">
        <div className="text-sm text-[#888] uppercase tracking-[0.14em] mb-7">Contact</div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-[60px] border-t border-white/10 pt-10">
          <h2 className="text-[clamp(30px,4vw,52px)] leading-[1.1] tracking-[-0.04em] font-medium">
            Bağlantıda kalalım.
          </h2>
          <div className="text-[#c7c7c7] text-[17px] flex flex-col gap-2">
            <p>Email: <a href="mailto:irfan@asicioglu.io" className="hover:text-white transition-colors">irfan@asicioglu.io</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/irfanasicioglu/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">linkedin.com/in/irfanasicioglu</a></p>
          </div>
        </div>
      </section>

      <footer className="py-[50px] text-center text-[#777] border-t border-white/[0.08] text-sm">
        © 2026 asicioglu.io
      </footer>

    </main>
  )
}
