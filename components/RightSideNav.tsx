'use client'

import { useState } from 'react'
import { Home, User, FileText, StickyNote, BookOpen, Mail, Menu, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

const navLinks = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#about', label: 'About', icon: User },
  { href: '#writing', label: 'Writing', icon: FileText },
  { href: '#notes', label: 'Notes', icon: StickyNote },
  { href: '#reading', label: 'Reading', icon: BookOpen },
  { href: '#contact', label: 'Contact', icon: Mail },
]

export default function RightSideNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <aside
      className={`fixed left-0 top-0 z-50 h-screen flex flex-col border-r border-white/10 bg-[rgba(8,8,8,0.85)] backdrop-blur-xl transition-all duration-300 ease-in-out ${
        isOpen ? 'w-52' : 'w-14'
      }`}
    >
      <div className="flex h-14 items-center border-b border-white/10 px-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex size-8 items-center justify-center rounded-md text-[#888] transition-colors hover:text-white"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        {isOpen && (
          <span className="ml-3 text-sm font-medium text-[#f4f4f4]">asicioglu.io</span>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-hidden p-2">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-md px-2 py-2.5 text-sm text-[#bdbdbd] transition-all hover:bg-white/[0.08] hover:text-white ${
              !isOpen ? 'justify-center' : ''
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {isOpen && <span className="whitespace-nowrap">{label}</span>}
          </a>
        ))}
      </nav>

      <div className="border-t border-white/10 p-2">
        <button
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          className={`flex w-full items-center gap-3 rounded-md px-2 py-2.5 text-sm text-[#888] transition-all hover:bg-white/[0.08] hover:text-white ${
            !isOpen ? 'justify-center' : ''
          }`}
          aria-label="Toggle theme"
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="h-4 w-4 shrink-0" />
          ) : (
            <Moon className="h-4 w-4 shrink-0" />
          )}
          {isOpen && <span>Theme</span>}
        </button>
      </div>
    </aside>
  )
}
