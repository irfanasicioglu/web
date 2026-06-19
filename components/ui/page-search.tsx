'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, X, ChevronUp, ChevronDown } from 'lucide-react'

function findMatches(query: string): Element[] {
  if (!query.trim()) return []
  const lowerQuery = query.toLowerCase()
  const results: Element[] = []
  const seen = new Set<Element>()
  const SKIP_TAGS = new Set(['script', 'style', 'noscript', 'input', 'textarea', 'header', 'nav'])

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  while (walker.nextNode()) {
    const node = walker.currentNode as Text
    const parent = node.parentElement
    if (!parent) continue
    if (SKIP_TAGS.has(parent.tagName.toLowerCase())) continue
    if (!(node.textContent || '').toLowerCase().includes(lowerQuery)) continue
    if (!seen.has(parent)) {
      seen.add(parent)
      results.push(parent)
    }
  }
  return results
}

export function PageSearch() {
  const [isOpen, setIsOpen]       = useState(false)
  const [query, setQuery]         = useState('')
  const [matches, setMatches]     = useState<Element[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [visible, setVisible]     = useState(false)
  const inputRef     = useRef<HTMLInputElement>(null)
  const highlightRef = useRef<Element | null>(null)

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

  const clearHighlight = useCallback(() => {
    highlightRef.current?.classList.remove('ps-active')
    highlightRef.current = null
  }, [])

  const goTo = useCallback((idx: number, list: Element[]) => {
    clearHighlight()
    const el = list[idx]
    if (!el) return
    el.classList.add('ps-active')
    highlightRef.current = el
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [clearHighlight])

  const runSearch = useCallback((q: string) => {
    clearHighlight()
    setMatches([])
    setCurrentIdx(0)
    if (!q.trim()) return
    const found = findMatches(q)
    setMatches(found)
    if (found.length > 0) goTo(0, found)
  }, [clearHighlight, goTo])

  const step = useCallback((dir: 1 | -1) => {
    setCurrentIdx(prev => {
      const next = (prev + dir + matches.length) % matches.length
      goTo(next, matches)
      return next
    })
  }, [matches, goTo])

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      matches.length === 0 ? runSearch(query) : step(1)
    }
    if (e.key === 'Escape') close()
  }

  const close = useCallback(() => {
    setIsOpen(false)
    setQuery('')
    clearHighlight()
    setMatches([])
  }, [clearHighlight])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
    else { setQuery(''); clearHighlight(); setMatches([]) }
  }, [isOpen, clearHighlight])

  if (!visible) return null

  return (
    <>
      <style>{`
        .ps-active {
          outline: 2px solid rgba(255,220,50,0.75);
          outline-offset: 4px;
          border-radius: 4px;
          animation: ps-pulse 1.8s ease-in-out infinite;
        }
        @keyframes ps-pulse {
          0%,100% { outline-color: rgba(255,220,50,0.75); }
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
          {/* Büyüteç / Kapat butonu */}
          <button
            onClick={() => isOpen ? close() : setIsOpen(true)}
            className="flex-shrink-0 w-[44px] h-[44px] flex items-center justify-center text-white/50 hover:text-white transition-colors"
            aria-label={isOpen ? 'Kapat' : 'Ara'}
          >
            {isOpen ? <X size={16} /> : <Search size={17} />}
          </button>

          {/* Input + sayaç + ok tuşları */}
          <div
            className="flex items-center flex-1 min-w-0"
            style={{ opacity: isOpen ? 1 : 0, transition: 'opacity 0.2s ease' }}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={e => {
                setQuery(e.target.value)
                if (!e.target.value) { clearHighlight(); setMatches([]) }
              }}
              onKeyDown={handleKey}
              placeholder="Sayfada ara..."
              className="flex-1 min-w-0 bg-transparent text-white text-[13px] outline-none placeholder-white/25 font-[family-name:var(--font-roboto)]"
            />

            {/* Sonuç yok */}
            {isOpen && query && matches.length === 0 && (
              <span className="text-[11px] text-white/25 pr-3 flex-shrink-0 whitespace-nowrap">yok</span>
            )}

            {/* Sayaç + ok tuşları */}
            {matches.length > 0 && (
              <div className="flex items-center gap-0.5 pr-2 flex-shrink-0">
                <span className="text-[11px] text-white/35 tabular-nums mr-1">
                  {currentIdx + 1}/{matches.length}
                </span>
                <button
                  onClick={() => step(-1)}
                  className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                >
                  <ChevronUp size={13} />
                </button>
                <button
                  onClick={() => step(1)}
                  className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                >
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
