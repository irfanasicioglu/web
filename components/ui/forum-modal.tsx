'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ForumModal() {
  const [open, setOpen]     = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' })
  const overlayRef          = useRef<HTMLDivElement>(null)

  // Forum nav linkinden custom event dinle
  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-forum', handler)
    return () => window.removeEventListener('open-forum', handler)
  }, [])

  // Escape ile kapat
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Scroll kilidi
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => {
    setOpen(false)
    setStatus('idle')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) close() }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl p-8 font-[family-name:var(--font-roboto)]"
        style={{ background: 'rgba(10,10,20,0.95)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 24px 80px rgba(0,0,0,0.6)' }}
      >
        {/* Kapat */}
        <button
          onClick={close}
          className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-1">Mesaj Gönder</h2>
        <p className="text-[#666] text-[14px] mb-8">Aşağıdaki formu doldur, en kısa sürede döneyim.</p>

        {status === 'sent' ? (
          <div className="text-center py-10">
            <p className="text-white text-[18px] font-medium mb-2">Mesajın ulaştı!</p>
            <p className="text-[#888] text-[14px] mb-6">En kısa sürede geri döneceğim.</p>
            <button onClick={close} className="text-white/50 hover:text-white text-[14px] transition-colors">Kapat</button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-5">
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <Label htmlFor="f-name" className="text-[#aaa] text-[13px]">Ad Soyad</Label>
                <Input
                  id="f-name"
                  value={form.name}
                  onChange={set('name')}
                  required
                  placeholder="İrfan Aşıcıoğlu"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-white/20"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="f-email" className="text-[#aaa] text-[13px]">E-Posta</Label>
              <Input
                id="f-email"
                type="email"
                value={form.email}
                onChange={set('email')}
                required
                placeholder="ornek@mail.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-white/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="f-subject" className="text-[#aaa] text-[13px]">Konu</Label>
              <Input
                id="f-subject"
                value={form.subject}
                onChange={set('subject')}
                required
                placeholder="İş birliği, soru, fikir…"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-white/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="f-message" className="text-[#aaa] text-[13px]">Mesaj</Label>
              <Textarea
                id="f-message"
                value={form.message}
                onChange={set('message')}
                required
                placeholder="Mesajını buraya yaz…"
                rows={5}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-white/20 resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-[13px]">Bir hata oluştu, tekrar dene.</p>
            )}

            <Button
              type="submit"
              disabled={status === 'sending'}
              className="w-full h-11 bg-white text-black font-semibold hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {status === 'sending' ? 'Gönderiliyor…' : 'Gönder'}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
