'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function HeroCard() {
  const [flipped, setFlipped] = useState(false)

  return (
    // filter burada — preserve-3d olan elementten ayrı
    <div
      className="cursor-pointer select-none"
      style={{
        perspective: '1400px',
        filter: 'drop-shadow(0 0 40px rgba(120,140,255,0.12))',
      }}
      onClick={() => setFlipped(v => !v)}
    >
      <div
        style={{
          width: 'min(460px, 88vw)',
          height: 'min(560px, 72vh)',
          position: 'relative',
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          transition: 'transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1.000)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ── ÖN YÜZ ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-sm text-center"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <h1
            className="text-white"
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: 'clamp(32px, 6vw, 68px)',
              lineHeight: 2,
              textShadow: '0 0 30px rgba(160,180,255,0.35)',
            }}
          >
            Selam sana<br />dünyalı
          </h1>

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
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            WebkitTransform: 'rotateY(180deg)',
          }}
        >
          <Image
            src="/profile.png"
            alt="Irfan Asicioglu"
            fill
            sizes="(max-width: 768px) 88vw, 460px"
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
        </div>
      </div>

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
