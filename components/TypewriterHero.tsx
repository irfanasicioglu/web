'use client'

import { useEffect, useRef, useState } from 'react'
import { HoverButton } from '@/components/ui/hover-button'

const TEXT = 'İrfan Aşıcıoğlu\'nu yakından tanımak ister misin?'
const TYPE_SPEED = 110
const START_DELAY = 800
const IMG_W = 240

// Köşelerden flood-fill ile beyaz arka planı sil → data URL döndür
function removeWhiteBg(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new window.Image()
    img.onload = () => {
      const w = img.naturalWidth
      const h = img.naturalHeight
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, w, h)
      const d = imageData.data
      const visited = new Uint8Array(w * h)
      const queue: number[] = []

      const enqueue = (idx: number) => {
        if (idx >= 0 && idx < w * h && !visited[idx]) {
          visited[idx] = 1
          queue.push(idx)
        }
      }
      // 4 köşeden başla
      enqueue(0); enqueue(w - 1); enqueue(w * (h - 1)); enqueue(w * h - 1)

      const THRESH = 230

      while (queue.length > 0) {
        const idx = queue.pop()!
        const i = idx * 4
        const brightness = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114
        if (brightness < THRESH) continue
        d[i + 3] = 0
        const x = idx % w, y = Math.floor(idx / w)
        if (x > 0) enqueue(idx - 1)
        if (x < w - 1) enqueue(idx + 1)
        if (y > 0) enqueue(idx - w)
        if (y < h - 1) enqueue(idx + w)
      }

      ctx.putImageData(imageData, 0, 0)
      resolve(canvas.toDataURL('image/png'))
    }
    img.src = src
  })
}

function playNetSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const now = ctx.currentTime
    const impactBuf = ctx.createBuffer(1, ctx.sampleRate * 0.12, ctx.sampleRate)
    const impactData = impactBuf.getChannelData(0)
    for (let i = 0; i < impactData.length; i++)
      impactData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / impactData.length, 2)
    const impact = ctx.createBufferSource()
    impact.buffer = impactBuf
    const impactF = ctx.createBiquadFilter()
    impactF.type = 'lowpass'; impactF.frequency.value = 180
    const impactG = ctx.createGain()
    impactG.gain.setValueAtTime(0.9, now)
    impactG.gain.exponentialRampToValueAtTime(0.001, now + 0.12)
    impact.connect(impactF); impactF.connect(impactG); impactG.connect(ctx.destination)
    impact.start(now)
    const noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
    const noiseData = noiseBuf.getChannelData(0)
    for (let i = 0; i < noiseData.length; i++) noiseData[i] = Math.random() * 2 - 1
    const swish1 = ctx.createBufferSource()
    swish1.buffer = noiseBuf
    const sf1 = ctx.createBiquadFilter()
    sf1.type = 'bandpass'; sf1.Q.value = 3
    sf1.frequency.setValueAtTime(4500, now + 0.02)
    sf1.frequency.exponentialRampToValueAtTime(900, now + 0.5)
    const sg1 = ctx.createGain()
    sg1.gain.setValueAtTime(0.55, now + 0.02)
    sg1.gain.exponentialRampToValueAtTime(0.001, now + 0.55)
    swish1.connect(sf1); sf1.connect(sg1); sg1.connect(ctx.destination)
    swish1.start(now + 0.02)
    const swish2 = ctx.createBufferSource()
    swish2.buffer = noiseBuf
    const sf2 = ctx.createBiquadFilter()
    sf2.type = 'bandpass'; sf2.Q.value = 1.5
    sf2.frequency.setValueAtTime(1200, now + 0.18)
    sf2.frequency.exponentialRampToValueAtTime(350, now + 0.75)
    const sg2 = ctx.createGain()
    sg2.gain.setValueAtTime(0, now + 0.18)
    sg2.gain.linearRampToValueAtTime(0.3, now + 0.25)
    sg2.gain.exponentialRampToValueAtTime(0.001, now + 0.9)
    swish2.connect(sf2); sf2.connect(sg2); sg2.connect(ctx.destination)
    swish2.start(now + 0.18)
    setTimeout(() => ctx.close(), 1200)
  } catch {}
}

function playKeyClick() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++)
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 4)
    const source = ctx.createBufferSource()
    source.buffer = buffer
    const gain = ctx.createGain()
    gain.gain.value = 0.25
    source.connect(gain)
    gain.connect(ctx.destination)
    source.start()
    source.onended = () => ctx.close()
  } catch {}
}

function startCrowd() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const size = ctx.sampleRate * 2
    const buf = ctx.createBuffer(1, size, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1
    const noise = ctx.createBufferSource()
    noise.buffer = buf
    noise.loop = true
    const f1 = ctx.createBiquadFilter()
    f1.type = 'bandpass'
    f1.frequency.setValueAtTime(250, ctx.currentTime)
    f1.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 2.5)
    f1.Q.value = 0.8
    const f2 = ctx.createBiquadFilter()
    f2.type = 'bandpass'
    f2.frequency.setValueAtTime(500, ctx.currentTime)
    f2.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 2.5)
    f2.Q.value = 0.4
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 1.8)
    noise.connect(f1); f1.connect(f2); f2.connect(gain); gain.connect(ctx.destination)
    noise.start()
    return { ctx, gain }
  } catch { return null }
}

export default function TypewriterHero() {
  const [displayed, setDisplayed] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const [done, setDone] = useState(false)
  const [hoveredMain, setHoveredMain] = useState(false)
  const [hoveredCv, setHoveredCv] = useState(false)
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null)
  const [processedSrc, setProcessedSrc] = useState('/caricature.png')
  const indexRef = useRef(0)
  const caricatureRef = useRef<HTMLDivElement>(null)
  const crowdMainRef = useRef<{ ctx: AudioContext; gain: GainNode } | null>(null)
  const crowdCvRef = useRef<{ ctx: AudioContext; gain: GainNode } | null>(null)

  useEffect(() => {
    removeWhiteBg('/caricature.png').then(setProcessedSrc)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const tiltX = mouse ? ((mouse.y / window.innerHeight) - 0.5) * -12 : 0
  const tiltY = mouse ? ((mouse.x / window.innerWidth) - 0.5) * 12 : 0

  function stopCrowd(ref: { current: { ctx: AudioContext; gain: GainNode } | null }, instant = false) {
    if (ref.current) {
      const { ctx, gain } = ref.current
      ref.current = null
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + (instant ? 0.05 : 0.2))
      setTimeout(() => ctx.close(), instant ? 150 : 300)
    }
  }

  useEffect(() => {
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        indexRef.current++
        setDisplayed(TEXT.slice(0, indexRef.current))
        playKeyClick()
        if (indexRef.current === TEXT.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, TYPE_SPEED)
      return () => clearInterval(interval)
    }, START_DELAY)
    return () => clearTimeout(start)
  }, [])

  useEffect(() => {
    if (done) return
    const blink = setInterval(() => setCursorVisible(v => !v), 530)
    return () => clearInterval(blink)
  }, [done])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-6">

      {/* Karikatür — 3D tilt */}
      <div style={{ perspective: '700px', flexShrink: 0 }}>
        <div
          style={{
            display: 'inline-block',
            transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <div ref={caricatureRef} style={{ position: 'relative', display: 'inline-block' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={processedSrc}
              alt="İrfan Aşıcıoğlu"
              width={IMG_W}
              style={{ display: 'block', height: 'auto' }}
            />
          </div>
        </div>
      </div>

      <h1
        className="max-w-[820px] text-center text-white"
        style={{
          fontFamily: 'var(--font-roboto)',
          fontSize: 'clamp(32px, 5.5vw, 68px)',
          fontWeight: 700,
          lineHeight: 1.45,
          letterSpacing: '-0.01em',
        }}
      >
        {displayed}
        <span
          style={{
            display: 'inline-block',
            width: '4px',
            height: '0.85em',
            background: 'white',
            marginLeft: '5px',
            verticalAlign: 'middle',
            opacity: done ? 0 : cursorVisible ? 1 : 0,
            transition: 'opacity 0.1s',
          }}
        />
      </h1>

      <div
        className="flex flex-row items-center gap-6"
        style={{
          opacity: done ? 1 : 0,
          transform: done ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {/* ŞİMDİ TIKLA */}
        <div
          onMouseEnter={() => { setHoveredMain(true); crowdMainRef.current = startCrowd() }}
          onMouseLeave={() => { setHoveredMain(false); stopCrowd(crowdMainRef) }}
          className={hoveredMain ? 'animate-heartbeat' : ''}
        >
          <HoverButton
            className="py-4 px-12"
            onClick={() => { stopCrowd(crowdMainRef, true); playNetSound() }}
          >
            <span className="text-white font-bold tracking-[0.15em] uppercase" style={{ fontFamily: 'var(--font-roboto)', fontSize: 'clamp(16px, 2vw, 22px)' }}>
              Şimdi tıkla
            </span>
          </HoverButton>
        </div>

        {/* CV GÖR */}
        <div
          onMouseEnter={() => { setHoveredCv(true); crowdCvRef.current = startCrowd() }}
          onMouseLeave={() => { setHoveredCv(false); stopCrowd(crowdCvRef) }}
          className={hoveredCv ? 'animate-heartbeat' : ''}
        >
          <HoverButton
            className="py-4 px-12"
            onClick={() => { stopCrowd(crowdCvRef, true); playNetSound(); window.open('/cv.pdf', '_blank') }}
          >
            <span className="text-white font-bold tracking-[0.15em] uppercase" style={{ fontFamily: 'var(--font-roboto)', fontSize: 'clamp(16px, 2vw, 22px)' }}>
              CV Gör
            </span>
          </HoverButton>
        </div>
      </div>
    </div>
  )
}
