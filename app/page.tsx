import { HorizonHero } from '@/components/ui/horizon-hero-section'
import TypewriterHero from '@/components/TypewriterHero'
import { MagneticDock } from '@/components/ui/magnetic-dock'

export default function Home() {
  const tags = ['Sports Business', 'Product Thinking', 'Football', 'Media', 'Writing', 'Event Operations']

  return (
    <main className="relative z-10 text-[#f4f4f4] font-[family-name:var(--font-roboto)] leading-relaxed">

      {/* 3D Space Hero */}
      <section id="home">
        <HorizonHero />
      </section>

      {/* About — karikatür + typewriter + içerik */}
      <section id="about">
        <TypewriterHero />
        <div className="max-w-[1100px] mx-auto px-6 py-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-[60px] border-t border-white/10 pt-10">
          <h2 className="text-[clamp(30px,4vw,52px)] leading-[1.1] tracking-[-0.04em] font-medium">
            Kişisel bir hub. CV değil, dijital bir merkez.
          </h2>
          <div className="text-[#c7c7c7] text-[17px]">
            <p className="mb-5">
              Ben İrfan Aşıcıoğlu. Haziran 2024'te Marmara Üniversitesi İngilizce İktisat bölümünden mezun oldum.
              Bu süreç bana her anlamda büyük katkılar sağladı; aldığım sağlam akademik temel ile iş hayatına
              ilk adımımı attım.
            </p>
            <p className="mb-5">
              Mezuniyetin ardından, spora olan derin ilgim beni yeni bir yola yöneltti. Şubat 2025'te
              Barcelona'daki{' '}
              <a
                href="https://www.eseibusinessschool.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-3 decoration-white/40 hover:decoration-white transition-colors"
              >
                ESEI Business School
              </a>
              'un Sports Management yüksek lisans programına kabul aldım ve İspanya'ya yerleştim. Yalnızca bir yıl
              süren bu program, kariyerimde bir dönüm noktası oldu. Barcelona'da geçirdiğim her an — edindiğim
              deneyimler, kurduğum bağlar ve kazandığım bakış açısı — hayatım boyunca yanımda taşıyacağım değerler
              arasında yer alıyor.
            </p>
            <p>
              Bitirme tezimi{' '}
              <a
                href="/business-plan.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-3 decoration-white/40 hover:decoration-white transition-colors italic"
              >
                Developing a Fan-Centric Football Mobile Application: A Business Plan
              </a>{' '}
              konusu üzerine yazdım. Bu araştırma süreci bana futbol endüstrisini, taraftar psikolojisini ve dijital
              ürün geliştirmeyi tek bir mercekten görme fırsatı sundu.
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
        </div>
      </section>

      {/* Kariyer */}
      <section id="kariyer" className="max-w-[1100px] mx-auto px-6 py-[110px]">
        <div className="text-sm text-[#888] uppercase tracking-[0.14em] mb-7">Kariyer</div>
        <div className="border-t border-white/10 pt-10">
          <h2 className="text-[clamp(30px,4vw,52px)] leading-[1.1] tracking-[-0.04em] font-medium mb-16">
            Kariyer Yolculuğu
          </h2>

          {/* Timeline */}
          <div className="relative pl-8 md:pl-0">

            {/* Sol dikey çizgi — sadece desktop */}
            <div
              className="hidden md:block absolute left-[180px] top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(255,255,255,0.06) 80%, transparent)' }}
            />

            {/* Mobil dikey çizgi */}
            <div
              className="md:hidden absolute left-2 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(255,255,255,0.06) 80%, transparent)' }}
            />

            {/* Entry 1 — DEIMOS */}
            <div className="relative flex flex-col md:flex-row gap-6 md:gap-0 pb-14 last:pb-0">
              {/* Tarih — sol kolon */}
              <div className="hidden md:flex flex-col items-end pr-10 pt-1 min-w-[180px]">
                <span className="text-[15px] text-[#777] tabular-nums">Oct 2024 – Dec 2024</span>
                <span className="text-[13px] text-[#666] mt-1">Sarıyer, İstanbul</span>
              </div>

              {/* Nokta */}
              <div
                className="hidden md:flex absolute left-[180px] top-[6px] -translate-x-1/2 w-3 h-3 rounded-full items-center justify-center"
                style={{ background: '#0a0a14', border: '1px solid rgba(255,255,255,0.35)', boxShadow: '0 0 8px rgba(255,255,255,0.2)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
              </div>
              <div
                className="md:hidden absolute left-2 top-[6px] -translate-x-1/2 w-3 h-3 rounded-full flex items-center justify-center"
                style={{ background: '#0a0a14', border: '1px solid rgba(255,255,255,0.35)', boxShadow: '0 0 8px rgba(255,255,255,0.2)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
              </div>

              {/* Kart */}
              <div
                className="md:ml-10 flex-1 rounded-2xl p-6"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.09)' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-[18px] leading-tight">DEIMOS Brand Group</h3>
                    <p className="text-[#888] text-[14px] mt-0.5 tracking-wider">ACCOUNTING INTERN</p>
                  </div>
                  <span className="md:hidden text-[14px] text-[#666]">Oct 2024 – Dec 2024 · Sarıyer, İstanbul</span>
                </div>
                <ul className="space-y-2 text-[#aaa] text-[16px] leading-relaxed">
                  <li className="flex gap-2"><span className="text-white/20 shrink-0 mt-1">▸</span>Aylık kapanış operasyonlarını fiş işleme, vergi hesaplamaları ve veri organizasyonu yürüterek destekledim.</li>
                </ul>
              </div>
            </div>

            {/* Entry 2 — Maçkolik */}
            <div className="relative flex flex-col md:flex-row gap-6 md:gap-0 pb-14 last:pb-0">
              {/* Tarih */}
              <div className="hidden md:flex flex-col items-end pr-10 pt-1 min-w-[180px]">
                <span className="text-[15px] text-[#777] tabular-nums">Oct 2022 – Oct 2023</span>
                <span className="text-[13px] text-[#666] mt-1">Kadıköy, İstanbul</span>
              </div>

              {/* Nokta */}
              <div
                className="hidden md:flex absolute left-[180px] top-[6px] -translate-x-1/2 w-3 h-3 rounded-full items-center justify-center"
                style={{ background: '#0a0a14', border: '1px solid rgba(255,255,255,0.35)', boxShadow: '0 0 8px rgba(255,255,255,0.2)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
              </div>
              <div
                className="md:hidden absolute left-2 top-[6px] -translate-x-1/2 w-3 h-3 rounded-full flex items-center justify-center"
                style={{ background: '#0a0a14', border: '1px solid rgba(255,255,255,0.35)', boxShadow: '0 0 8px rgba(255,255,255,0.2)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
              </div>

              {/* Kart */}
              <div
                className="md:ml-10 flex-1 rounded-2xl p-6"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.09)' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-[18px] leading-tight">Maçkolik</h3>
                    <p className="text-[#888] text-[14px] mt-0.5 tracking-wider">PRODUCT INTERN</p>
                  </div>
                  <span className="md:hidden text-[14px] text-[#666]">Oct 2022 – Oct 2023 · Kadıköy, İstanbul</span>
                </div>
                <ul className="space-y-2 text-[#aaa] text-[16px] leading-relaxed">
                  <li className="flex gap-2"><span className="text-white/20 shrink-0 mt-1">▸</span>Yayın öncesi yeni özellikleri test ederek son kullanıcılara ulaşmadan önce kritik kullanılabilirlik sorunlarını tespit ettim.</li>
                  <li className="flex gap-2"><span className="text-white/20 shrink-0 mt-1">▸</span>Önerdiğim özellik geliştirme fikirleri canlı ürüne yansıtıldı.</li>
                  <li className="flex gap-2"><span className="text-white/20 shrink-0 mt-1">▸</span>Agile döngülerinde ürün ve mühendislik ekipleriyle birlikte çalıştım; nitel ve analitik katkılar sağladım.</li>
                  <li className="flex gap-2"><span className="text-white/20 shrink-0 mt-1">▸</span>Yol haritası kararlarını ve UX iyileştirmelerini yönlendiren ürün performans analizleri hazırlayıp sundum.</li>
                </ul>
              </div>
            </div>

          </div>
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


      {/* Contact */}
      <section id="contact" className="max-w-[1100px] mx-auto px-6 py-[110px]">
        <div className="text-sm text-[#888] uppercase tracking-[0.14em] mb-7">Contact</div>
        <div className="border-t border-white/10 pt-10 flex flex-col items-center text-center gap-10">
          <div>
            <h2 className="text-[clamp(30px,4vw,52px)] leading-[1.1] tracking-[-0.04em] font-medium mb-4">
              Bana ulaş
            </h2>
            <p className="text-[#888] text-[17px] max-w-[480px] mx-auto">
              Bir fikrin mi var, iş birliği mi yapmak istiyorsun, yoksa sadece merhaba mı demek istiyorsun? Her mesaj açık kapım.
            </p>
          </div>
          <MagneticDock />
        </div>
      </section>

      <footer className="py-[50px] text-center text-[#777] border-t border-white/[0.08] text-sm">
        © 2026 asicioglu.io
      </footer>

    </main>
  )
}
