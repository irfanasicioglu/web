'use client'

import { useEffect, useRef, useState } from 'react'
import { HoverButton } from '@/components/ui/hover-button'
import { useT } from '@/contexts/LanguageContext'

const TYPE_SPEED = 55
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

const DAI_DAI_SRC = encodeURI('/Shakira, Burna Boy - Dai Dai (Official Video).mp4')
const DAI_DAI_START = 94 // 1:34

let daiDaiAudio: HTMLAudioElement | null = null

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
    gain.gain.value = 0.125
    source.connect(gain)
    gain.connect(ctx.destination)
    source.start()
    source.onended = () => ctx.close()
  } catch {}
}

export default function TypewriterHero() {
  const { t, lang }                   = useT()
  const [displayed, setDisplayed]     = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const [done, setDone]               = useState(false)
  const [mouse, setMouse]             = useState<{ x: number; y: number } | null>(null)
  const [processedSrcs, setProcessedSrcs] = useState<string[]>([])
  const [imgIdx, setImgIdx]           = useState(0)
  const [imgVisible, setImgVisible]   = useState(true)
  const [activeBtn, setActiveBtn]     = useState<'main' | 'cv' | null>(null)
  const activeBtnRef                  = useRef<'main' | 'cv' | null>(null)
  const indexRef                      = useRef(0)
  const caricatureRef                 = useRef<HTMLDivElement>(null)

  // activeBtnRef her zaman state ile senkron
  const setActive = (val: 'main' | 'cv' | null) => {
    activeBtnRef.current = val
    setActiveBtn(val)
  }

  // Audio helpers
  const getAudio = () => {
    if (!daiDaiAudio) daiDaiAudio = new Audio(DAI_DAI_SRC)
    return daiDaiAudio
  }

  const hoverEnter = () => {
    if (activeBtnRef.current !== null) return
    const a = getAudio()
    const seekAndPlay = () => { a.currentTime = 11; a.play().catch(() => {}) }
    if (a.readyState >= 1) seekAndPlay()
    else a.addEventListener('loadedmetadata', seekAndPlay, { once: true })
  }

  const hoverLeave = () => {
    if (activeBtnRef.current !== null) return  // tıklanmış çalıyor, kesme
    daiDaiAudio?.pause()
  }

  const clickToggle = (btn: 'main' | 'cv') => {
    if (activeBtnRef.current === btn) {
      daiDaiAudio?.pause()
      setActive(null)
      return
    }
    const a = getAudio()
    setActive(btn)
    a.onended = () => setActive(null)

    // iOS Safari: currentTime ayarlamadan önce metadata hazır olmalı
    const seekAndPlay = () => {
      a.currentTime = DAI_DAI_START
      a.play().catch(() => {})
    }
    if (a.readyState >= 1) {
      seekAndPlay()
    } else {
      a.addEventListener('loadedmetadata', seekAndPlay, { once: true })
    }
  }

  useEffect(() => {
    Promise.all([
      removeWhiteBg('/caricature.png'),
      removeWhiteBg('/caricature2.png'),
      removeWhiteBg('/caricature3.png'),
    ]).then(setProcessedSrcs)
  }, [])

  const handleImageClick = () => {
    if (processedSrcs.length < 3) return
    setImgVisible(false)
    setTimeout(() => {
      setImgIdx(prev => (prev + 1) % 3)
      setImgVisible(true)
    }, 320)
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // About bölümünü geçince müziği durdur
  useEffect(() => {
    const onScroll = () => {
      const about = document.getElementById('about')
      if (!about) return
      if (window.scrollY > about.offsetTop + about.offsetHeight - 80) {
        daiDaiAudio?.pause()
        setActive(null)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tiltX = mouse ? ((mouse.y / window.innerHeight) - 0.5) * -12 : 0
  const tiltY = mouse ? ((mouse.x / window.innerWidth) - 0.5) * 12 : 0

  useEffect(() => {
    // Dil değişince animasyonu sıfırla
    indexRef.current = 0
    setDisplayed('')
    setDone(false)

    const start = setTimeout(() => {
      const text = t.hero
      const interval = setInterval(() => {
        indexRef.current++
        setDisplayed(text.slice(0, indexRef.current))
        playKeyClick()
        if (indexRef.current === text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, TYPE_SPEED)
      return () => clearInterval(interval)
    }, START_DELAY)
    return () => clearTimeout(start)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  useEffect(() => {
    if (done) return
    const blink = setInterval(() => setCursorVisible(v => !v), 530)
    return () => clearInterval(blink)
  }, [done])

  const btnStyle = { fontFamily: 'var(--font-roboto)', fontSize: 'clamp(16px, 2vw, 22px)' }
  const spanCls  = 'text-white font-bold tracking-[0.15em] uppercase'

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-6">

      {/* Karikatür — 3D tilt + tıklama geçişi */}
      <div style={{ perspective: '700px', flexShrink: 0 }}>
        <div style={{ display: 'inline-block', transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`, transition: 'transform 0.1s ease-out' }}>
          <div
            ref={caricatureRef}
            onClick={handleImageClick}
            style={{ position: 'relative', display: 'inline-block', cursor: processedSrcs.length === 3 ? 'pointer' : 'default' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={processedSrcs[imgIdx] ?? '/caricature.png'}
              alt="İrfan Aşıcıoğlu"
              width={IMG_W}
              style={{
                display: 'block',
                height: 'auto',
                opacity: imgVisible ? 1 : 0,
                transition: 'opacity 0.32s ease',
              }}
            />
          </div>
        </div>
      </div>

      {/* Pagination noktaları */}
      {processedSrcs.length === 3 && (
        <div style={{ display: 'flex', gap: '7px', marginTop: '-16px' }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              onClick={() => {
                if (i === imgIdx) return
                setImgVisible(false)
                setTimeout(() => { setImgIdx(i); setImgVisible(true) }, 320)
              }}
              style={{
                width: i === imgIdx ? '18px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === imgIdx ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.25)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      )}

      <h1
        className="max-w-[820px] text-center text-white"
        style={{ fontFamily: 'var(--font-roboto)', fontSize: 'clamp(32px, 5.5vw, 68px)', fontWeight: 700, lineHeight: 1.45, letterSpacing: '-0.01em' }}
      >
        {displayed}
        <span style={{ display: 'inline-block', width: '4px', height: '0.85em', background: 'white', marginLeft: '5px', verticalAlign: 'middle', opacity: done ? 0 : cursorVisible ? 1 : 0, transition: 'opacity 0.1s' }} />
      </h1>

      <div
        className="flex flex-row items-center gap-6"
        style={{ opacity: done ? 1 : 0, transform: done ? 'translateY(0)' : 'translateY(12px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
      >
        {/* ŞİMDİ TIKLA */}
        <div onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
          <HoverButton className="py-4 px-12" onClick={() => clickToggle('main')}>
            <span className={spanCls} style={btnStyle}>
              {activeBtn === 'main' ? t.heroBtnStop : t.heroBtn1}
            </span>
          </HoverButton>
        </div>

        {/* CV GÖR */}
        <div onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
          <HoverButton
            className="py-4 px-12"
            onClick={() => {
              if (activeBtn !== 'cv') window.open('/cv.pdf', '_blank')
              clickToggle('cv')
            }}
          >
            <span className={spanCls} style={btnStyle}>
              {activeBtn === 'cv' ? t.heroBtnStop : t.heroBtn2}
            </span>
          </HoverButton>
        </div>
      </div>
    </div>
  )
}
