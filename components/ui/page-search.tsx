'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, X, ChevronUp, ChevronDown } from 'lucide-react'

const SKIP_TAGS = new Set(['script', 'style', 'noscript', 'input', 'textarea', 'header', 'nav', 'mark'])

// Tüm eşleşen kelimeleri DOM'da <mark class="ps-mark"> ile sarar, işaretlenmiş elementleri döndürür
function markMatches(query: string): HTMLElement[] {
  if (!query.trim()) return []
  const lowerQuery = query.toLowerCase()
  const allMarks: HTMLElement[] = []

  // Önce tüm text node'ları topla (DOM'u mutate etmeden önce)
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const textNodes: Text[] = []
  while (walker.nextNode()) {
    const node = walker.currentNode as Text
    const parent = node.parentElement
    if (!parent || SKIP_TAGS.has(parent.tagName.toLowerCase())) continue
    if ((node.textContent || '').toLowerCase().includes(lowerQuery)) {
      textNodes.push(node)
    }
  }

  // Her text node'u fragment'e böl: metin + <mark> + metin...
  for (const node of textNodes) {
    const text = node.textContent || ''
    const lowerText = text.toLowerCase()
    const fragment = document.createDocumentFragment()
    let lastIdx = 0
    let idx = lowerText.indexOf(lowerQuery)

    while (idx !== -1) {
      if (idx > lastIdx) fragment.appendChild(document.createTextNode(text.slice(lastIdx, idx)))
      const mark = document.createElement('mark')
      mark.className = 'ps-mark'
      mark.textContent = text.slice(idx, idx + query.length)
      fragment.appendChild(mark)
      allMarks.push(mark)
      lastIdx = idx + query.length
      idx = lowerText.indexOf(lowerQuery, lastIdx)
    }
    if (lastIdx < text.length) fragment.appendChild(document.createTextNode(text.slice(lastIdx)))
    node.parentNode?.replaceChild(fragment, node)
  }

  return allMarks
}

// Tüm <mark class="ps-mark"> elementlerini kaldırıp text node'lara döndür
function clearMarks() {
  document.querySelectorAll('mark.ps-mark').forEach(mark => {
    const parent = mark.parentNode
    if (!parent) return
    parent.replaceChild(document.createTextNode(mark.textContent || ''), mark)
    parent.normalize()
  })
}

export function PageSearch() {
  const [isOpen, setIsOpen]         = useState(false)
  const [query, setQuery]           = useState('')
  const [marks, setMarks]           = useState<HTMLElement[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [visible, setVisible]       = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // About section'dan sonra göster
  useEffect(() => {
    const check = () => {
      const about = document.getElementById('about')
      setVisible(!!about && window.scrollY >= about.offsetTop - 120)
    }
    window.addEventListener('scroll', check)
    check()
    return () => window.removeEventListener('scroll', check)
  }, [])

  const activate = useCallback((list: HTMLElement[], idx: number) => {
    list.forEach(m => m.classList.remove('ps-active'))
    const el = list[idx]
    if (!el) return
    el.classList.add('ps-active')
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  const runSearch = useCallback((q: string) => {
    clearMarks()
    setMarks([])
    setCurrentIdx(0)
    if (!q.trim()) return
    const found = markMatches(q)
    setMarks(found)
    if (found.length > 0) activate(found, 0)
  }, [activate])

  const step = useCallback((dir: 1 | -1) => {
    setCurrentIdx(prev => {
      const next = (prev + dir + marks.length) % marks.length
      activate(marks, next)
      return next
    })
  }, [marks, activate])

  const close = useCallback(() => {
    setIsOpen(false)
    setQuery('')
    clearMarks()
    setMarks([])
    setCurrentIdx(0)
  }, [])

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); marks.length === 0 ? runSearch(query) : step(1) }
    if (e.key === 'Escape') close()
  }

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
    else { clearMarks(); setMarks([]); setCurrentIdx(0) }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  if (!visible) return null

  return (
    <>
      <style>{`
        .ps-mark {
          background: rgba(255,220,50,0.18);
          color: inherit;
          border-radius: 2px;
        }
        .ps-mark.ps-active {
          background: rgba(255,220,50,0.65);
          color: #000;
          border-radius: 2px;
          outline: 2px solid rgba(255,220,50,0.8);
          outline-offset: 1px;
          animation: ps-pulse 1.8s ease-in-out infinite;
        }
        @keyframes ps-pulse {
          0%,100% { outline-color: rgba(255,220,50,0.8); }
          50%      { outline-color: rgba(255,220,50,0.2); }
        }
      `}</style>

      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40">
        <div
          className="flex items-center overflow-hidden"
          style={{
            width: isOpen ? '260px' : '44px',
            height: '44px',
            transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
            background: 'rgba(8,8,18,0.82)',
            border: '1px solid rgba(255,255,255,0.11)',
            borderRadius: '22px',
            backdropFilter: 'blur(14px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          }}
        >
          <button
            onClick={() => isOpen ? close() : setIsOpen(true)}
            className="flex-shrink-0 w-[44px] h-[44px] flex items-center justify-center text-white/50 hover:text-white transition-colors"
            aria-label={isOpen ? 'Kapat' : 'Ara'}
          >
            {isOpen ? <X size={16} /> : <Search size={17} />}
          </button>

          <div
            className="flex items-center flex-1 min-w-0"
            style={{ opacity: isOpen ? 1 : 0, transition: 'opacity 0.2s ease' }}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={e => {
                setQuery(e.target.value)
                if (!e.target.value) { clearMarks(); setMarks([]) }
              }}
              onKeyDown={handleKey}
              placeholder="Sayfada ara..."
              className="flex-1 min-w-0 bg-transparent text-white text-[13px] outline-none placeholder-white/25 font-[family-name:var(--font-roboto)]"
            />

            {isOpen && query && marks.length === 0 && (
              <span className="text-[11px] text-white/25 pr-3 flex-shrink-0 whitespace-nowrap">yok</span>
            )}

            {marks.length > 0 && (
              <div className="flex items-center gap-0.5 pr-2 flex-shrink-0">
                <span className="text-[11px] text-white/35 tabular-nums mr-1">
                  {currentIdx + 1}/{marks.length}
                </span>
                <button onClick={() => step(-1)} className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                  <ChevronUp size={13} />
                </button>
                <button onClick={() => step(1)} className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                  <ChevronDown size={13} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
