"use client";

import { useState, useEffect, useRef } from 'react';
import { Home, User, FileText, StickyNote, BookOpen, Mail, type LucideIcon } from 'lucide-react';

const navLinksData: { label: string; href: string; icon: LucideIcon }[] = [
  { label: 'Home',    href: '#home',    icon: Home },
  { label: 'About',   href: '#about',   icon: User },
  { label: 'Writing', href: '#writing', icon: FileText },
  { label: 'Notes',   href: '#notes',   icon: StickyNote },
  { label: 'Reading', href: '#reading', icon: BookOpen },
  { label: 'Contact', href: '#contact', icon: Mail },
];

const AnimatedNavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: LucideIcon }) => (
  <a href={href} className="group block overflow-hidden h-[27px]">
    <div className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
      <span className="flex h-[27px] items-center justify-center">
        <Icon className="h-[21px] w-[21px] text-gray-400" strokeWidth={1.4} />
      </span>
      <span className="flex h-[27px] items-center text-[20px] leading-none text-white whitespace-nowrap font-[family-name:var(--font-roboto)]">
        {label}
      </span>
    </div>
  </a>
);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [shapeClass, setShapeClass] = useState('rounded-full');
  const shapeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // drag state
  const headerRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // border-radius animation when mobile menu opens/closes
  useEffect(() => {
    if (shapeTimerRef.current) clearTimeout(shapeTimerRef.current);
    if (isOpen) {
      setShapeClass('rounded-2xl');
    } else {
      shapeTimerRef.current = setTimeout(() => setShapeClass('rounded-full'), 300);
    }
    return () => { if (shapeTimerRef.current) clearTimeout(shapeTimerRef.current); };
  }, [isOpen]);

  // drag — mouse move & up
  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    };

    const onUp = () => setIsDragging(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isDragging]);

  // double-click anywhere outside navbar → snap back to default
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
    // capture current pixel position before switching away from CSS centering
    setPosition({ x: rect.left, y: rect.top });
    setIsDragging(true);
  };

  // when position is set, override centering classes with inline pixel coords
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
        // only apply CSS centering when not floating
        !isFloating ? 'top-6 left-1/2 -translate-x-1/2' : '',
        // smooth snap-back transition (only when not dragging)
        !isDragging && !isFloating ? 'transition-all duration-500 ease-out' : '',
      ].join(' ')}
      style={
        isFloating
          ? { left: position.x, top: position.y, transform: 'none' }
          : {}
      }
    >
      <div className="flex w-full items-center justify-between gap-x-9">
        {/* drag handle */}
        <div
          onMouseDown={handleLogoMouseDown}
          className={`relative flex h-[30px] w-[30px] shrink-0 items-center justify-center ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          title="Sürükle"
        >
          <span className="absolute left-1/2 top-0 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-gray-200 opacity-80" />
          <span className="absolute left-0 top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-gray-200 opacity-80" />
          <span className="absolute right-0 top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-gray-200 opacity-80" />
          <span className="absolute bottom-0 left-1/2 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-gray-200 opacity-80" />
        </div>

        <nav className="hidden items-center gap-[42px] sm:flex">
          {navLinksData.map(link => (
            <AnimatedNavLink key={link.href} href={link.href} label={link.label} icon={link.icon} />
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
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 text-[14px] text-gray-400 transition-colors hover:text-white font-[family-name:var(--font-roboto)]"
              onClick={() => setIsOpen(false)}
            >
              <link.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
