import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json()

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Eksik alan' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY tanımlı değil — mesaj loglandı:', { name, email, subject, message })
    return NextResponse.json({ ok: true })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'asicioglu.io <onboarding@resend.dev>',
      to: ['irfan@asicioglu.io'],
      reply_to: email,
      subject: `[asicioglu.io] ${subject}`,
      text: `Ad Soyad: ${name}\nE-Posta: ${email}\n\n${message}`,
      html: `
        <p><strong>Ad Soyad:</strong> ${name}</p>
        <p><strong>E-Posta:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr/>
        <p><strong>Konu:</strong> ${subject}</p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Resend hatası:', err)
    return NextResponse.json({ error: 'Email gönderilemedi' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
