'use client'

import { useRef, useEffect } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  baseOpacity: number
  twinkleSpeed: number
  twinklePhase: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars: Star[] = Array.from({ length: 600 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 0.9 + 0.2,
      baseOpacity: Math.random() * 0.45 + 0.1,
      twinkleSpeed: Math.random() * 0.008 + 0.002,
      twinklePhase: Math.random() * Math.PI * 2,
    }))

    let frame = 0
    let animId: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++
      for (const star of stars) {
        const flicker = Math.sin(frame * star.twinkleSpeed + star.twinklePhase) * 0.12
        const opacity = Math.max(0, Math.min(1, star.baseOpacity + flicker))
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(210, 220, 255, ${opacity})`
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ background: '#05060f' }}
    />
  )
}
