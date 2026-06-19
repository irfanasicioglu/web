'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring, MotionValue } from 'framer-motion'

const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const LinkedinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

const XIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const CvIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)

interface DockItem {
  icon: React.ReactNode
  label: string
  href: string
}

function DockIcon({ icon, label, href, mouseX }: DockItem & { mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null)

  // clientX'e göre bu ikona mesafe — her frame'de canlı hesap
  const distance = useTransform(mouseX, (val: number) => {
    const el = ref.current
    if (!el) return Infinity
    const rect = el.getBoundingClientRect()
    return Math.abs(val - (rect.left + rect.width / 2))
  })

  // 0px mesafe → 70px, 80px mesafe → 52px, 140px+ → 46px
  const size = useTransform(distance, [0, 80, 140], [70, 52, 46])
  const springSize = useSpring(size, { mass: 0.08, stiffness: 200, damping: 14 })

  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2"
    >
      <motion.div
        ref={ref}
        style={{
          width: springSize,
          height: springSize,
          borderRadius: '14px',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'grid',
          placeItems: 'center',
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.7)',
        }}
        whileHover={{ background: 'rgba(255,255,255,0.14)', color: 'rgba(255,255,255,1)' }}
      >
        {icon}
      </motion.div>
      <span className="text-[11px] text-[#555] tracking-wide select-none">{label}</span>
    </a>
  )
}

export function MagneticDock() {
  // Absolute clientX — Infinity = dock dışı (küçük boyut)
  const mouseX = useMotionValue(Infinity)

  const items: DockItem[] = [
    { icon: <MailIcon />,      label: 'E-Posta',   href: 'mailto:irfan@asicioglu.io' },
    { icon: <LinkedinIcon />,  label: 'LinkedIn',  href: 'https://www.linkedin.com/in/irfanasicioglu/' },
    { icon: <InstagramIcon />, label: 'Instagram', href: 'https://www.instagram.com/irfanasicioglu/' },
    { icon: <XIcon />,         label: 'X',         href: 'https://x.com/asicioglu1881' },
    { icon: <CvIcon />,        label: 'CV',        href: '/cv.pdf' },
  ]

  return (
    <div
      onMouseMove={e => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex items-end gap-4 px-6 pb-4 rounded-2xl"
      style={{
        height: '96px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {items.map(item => (
        <DockIcon key={item.label} {...item} mouseX={mouseX} />
      ))}
    </div>
  )
}
