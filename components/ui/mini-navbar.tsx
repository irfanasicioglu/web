"use client";

import { useState, useEffect, useRef } from 'react';
import { Home, User, FileText, StickyNote, Mail, MessagesSquare, type LucideIcon } from 'lucide-react';
import { useT } from '@/contexts/LanguageContext';
import type { Lang } from '@/lib/translations';

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: 'tr', flag: '🇹🇷', label: 'TR' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'es', flag: '🇪🇸', label: 'ES' },
  { code: 'it', flag: '🇮🇹', label: 'IT' },
]

type NavLink = { label: string; href: string; icon: LucideIcon; modal?: string }

const AnimatedNavLink = ({ href, label, icon: Icon, modal }: NavLink) => {
  const handleClick = (e: React.MouseEvent) => {
    if (modal) {
      e.preventDefault()
      window.dispatchEvent(new CustomEvent(modal))
    }
  }
  return (
    <a href={href} onClick={handleClick} className="group block overflow-hidden h-[27px]">
      <div className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
        <span className="flex h-[27px] items-center justify-center">
          <Icon className="h-[21px] w-[21px] text-gray-400" strokeWidth={1.4} />
        </span>
        <span className="flex h-[27px] items-center text-[20px] leading-none text-white whitespace-nowrap font-[family-name:var(--font-roboto)]">
          {label}
        </span>
      </div>
    </a>
  )
};

export function Navbar() {
  const { t, lang, setLang } = useT()
  const [isOpen, setIsOpen] = useState(false);
  const [shapeClass, setShapeClass] = useState('rounded-full');
  const shapeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const navLinksData: NavLink[] = [
    { label: t.nav.home,    href: '#home',    icon: Home },
    { label: t.nav.about,   href: '#about',   icon: User },
    { label: t.nav.kariyer, href: '#kariyer', icon: FileText },
    { label: t.nav.notes,   href: '#notes',   icon: StickyNote },
    { label: t.nav.contact, href: '#contact', icon: Mail },
    { label: t.nav.forum,   href: '#',        icon: MessagesSquare, modal: 'open-forum' },
  ]

  useEffect(() => {
    if (shapeTimerRef.current) clearTimeout(shapeTimerRef.current);
    if (isOpen) {
      setShapeClass('rounded-2xl');
    } else {
      shapeTimerRef.current = setTimeout(() => setShapeClass('rounded-full'), 300);
    }
    return () => { if (shapeTimerRef.current) clearTimeout(shapeTimerRef.current); };
  }, [isOpen]);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    };
    const onUp = () => setIsDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const onDblClick = (e: MouseEvent) => {
      if (headerRef.current?.contains(e.target as Node)) return;
      setPosition(null);
    };
    window.addEventListener('dblclick', onDblClick);
    return () => window.removeEventListener('dblclick', onDblClick);
  }, []);

  const handleLogoMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = headerRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setPosition({ x: rect.left, y: rect.top });
    setIsDragging(true);
  };

  const isFloating = position !== null;

  return (
    <header
      ref={headerRef}
      className={[
        'fixed z-50 flex flex-col items-center',
        'border border-white/[0.12] bg-[rgba(10,10,20,0.65)] backdrop-blur-md',
        'px-9 py-[18px]',
        'w-[calc(100%-2rem)] sm:w-auto',
        shapeClass,
        !isFloating ? 'top-6 left-1/2 -translate-x-1/2' : '',
        !isDragging && !isFloating ? 'transition-all duration-500 ease-out' : '',
      ].join(' ')}
      style={isFloating ? { left: position.x, top: position.y, transform: 'none' } : {}}
    >
      <div className="flex w-full items-center justify-between gap-x-9">
        <div
          onMouseDown={handleLogoMouseDown}
          className={`relative flex h-[30px] w-[30px] shrink-0 items-center justify-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          title="Sürükle"
        >
          <span className="absolute left-1/2 top-0 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-gray-200 opacity-80" />
          <span className="absolute left-0 top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-gray-200 opacity-80" />
          <span className="absolute right-0 top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-gray-200 opacity-80" />
          <span className="absolute bottom-0 left-1/2 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-gray-200 opacity-80" />
        </div>

        <nav className="hidden items-center gap-[42px] sm:flex">
          {navLinksData.map(link => (
            <AnimatedNavLink key={link.href + link.label} href={link.href} label={link.label} icon={link.icon} modal={link.modal} />
          ))}
        </nav>

        <button
          className="flex h-[30px] w-[30px] items-center justify-center text-gray-400 sm:hidden"
          onClick={() => setIsOpen(v => !v)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? (
            <svg className="h-[22px] w-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-[22px] w-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`flex w-full flex-col items-center overflow-hidden transition-all duration-300 ease-in-out sm:hidden ${
          isOpen ? 'max-h-[300px] pt-[18px] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <nav className="flex w-full flex-col items-center gap-[18px]">
          {navLinksData.map(link => (
            <a
              key={link.href + link.label}
              href={link.href}
              className="flex items-center gap-2 text-[14px] text-gray-400 transition-colors hover:text-white font-[family-name:var(--font-roboto)]"
              onClick={e => {
                setIsOpen(false)
                if (link.modal) { e.preventDefault(); window.dispatchEvent(new CustomEvent(link.modal)) }
              }}
            >
              <link.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
              {link.label}
            </a>
          ))}
        </nav>

        {/* Dil seçimi — sadece mobil menüde */}
        <div className="flex items-center gap-2 pt-2 pb-1">
          {LANGS.map(({ code, flag, label }) => (
            <button
              key={code}
              onClick={() => { setLang(code); setIsOpen(false) }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 font-[family-name:var(--font-roboto)]"
              style={{
                background: lang === code ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                border: lang === code ? '1px solid rgba(255,255,255,0.35)' : '1px solid rgba(255,255,255,0.1)',
                color: lang === code ? '#fff' : 'rgba(255,255,255,0.45)',
                letterSpacing: '0.06em',
              }}
            >
              <span style={{ fontSize: '14px', lineHeight: 1 }}>{flag}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
