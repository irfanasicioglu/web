'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function HeroCard() {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="cursor-pointer select-none"
      style={{ perspective: '1400px' }}
      onClick={() => setFlipped(v => !v)}
    >
      <div
        style={{
          width: 'min(460px, 88vw)',
          height: 'min(560px, 72vh)',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1.000)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          filter: 'drop-shadow(0 0 40px rgba(120,140,255,0.12))',
        }}
      >
        {/* ── ÖN YÜZ ── */}
        <div
          className="absolute inset-0 flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-sm"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* pixel glow halkası */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5 transition-all duration-500 group-hover:ring-white/20" />

          <h1
            className="text-white"
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: 'clamp(26px, 4.5vw, 52px)',
              lineHeight: 1.9,
              textShadow: '0 0 30px rgba(160,180,255,0.35)',
            }}
          >
            selam sana<br />dünyalı
          </h1>

          {/* hint */}
          <p
            className="mt-10 text-white/25 tracking-[0.2em] uppercase"
            style={{ fontSize: '11px', fontFamily: 'var(--font-pixel)' }}
          >
            tıkla
          </p>
        </div>

        {/* ── ARKA YÜZ ── */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <Image
            src="/profile.png"
            alt="Irfan Asicioglu"
            fill
            className="object-cover object-top"
            priority
          />
          {/* subtle overlay so card edges blend */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
        </div>
      </div>

      {/* flip-back hint (sadece arka yüzdeyken görünür) */}
      <p
        className="mt-5 text-center text-white/20 tracking-widest uppercase transition-opacity duration-500"
        style={{
          fontSize: '10px',
          fontFamily: 'var(--font-pixel)',
          opacity: flipped ? 1 : 0,
        }}
      >
        tekrar tıkla
      </p>
    </div>
  )
}
