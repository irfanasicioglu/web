'use client'

import { useT } from '@/contexts/LanguageContext'
import type { Lang } from '@/lib/translations'

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: 'tr', flag: '🇹🇷', label: 'TR' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'es', flag: '🇪🇸', label: 'ES' },
  { code: 'it', flag: '🇮🇹', label: 'IT' },
]

export function LanguageSwitcher() {
  const { lang, setLang } = useT()

  return (
    <div
      className="fixed top-6 right-6 z-50 hidden sm:flex items-center gap-1.5"
      style={{ fontFamily: 'var(--font-roboto)' }}
    >
      {LANGS.map(({ code, flag, label }) => {
        const active = lang === code
        return (
          <button
            key={code}
            onClick={() => setLang(code)}
            title={label}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200"
            style={{
              background: active
                ? 'rgba(255,255,255,0.15)'
                : 'rgba(255,255,255,0.05)',
              border: active
                ? '1px solid rgba(255,255,255,0.35)'
                : '1px solid rgba(255,255,255,0.1)',
              color: active ? '#fff' : 'rgba(255,255,255,0.45)',
              backdropFilter: 'blur(12px)',
              boxShadow: active ? '0 2px 12px rgba(0,0,0,0.3)' : 'none',
              letterSpacing: '0.06em',
            }}
          >
            <span style={{ fontSize: '14px', lineHeight: 1 }}>{flag}</span>
            <span>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
