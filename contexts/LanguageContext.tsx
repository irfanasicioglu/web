'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { translations, type Lang, type Translations } from '@/lib/translations'

type LanguageCtx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}

const LanguageContext = createContext<LanguageCtx>({
  lang: 'tr',
  setLang: () => {},
  t: translations.tr,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('tr')
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useT = () => useContext(LanguageContext)
