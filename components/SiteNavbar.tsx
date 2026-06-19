'use client'

import React from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import { MobileNav } from '@/components/ui/navbar'
import { useTheme } from 'next-themes'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#writing', label: 'Writing' },
  { href: '#notes', label: 'Notes' },
  { href: '#reading', label: 'Reading' },
  { href: '#contact', label: 'Contact' },
]

const mobileNav = [{ name: 'Menu', items: navLinks }]

const langs = ['TR', 'EN', 'IT', 'ES']

function ModeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()
  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="flex h-7 w-7 items-center justify-center rounded-md text-[#888] hover:text-white transition-colors"
      aria-label="Toggle theme"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    </button>
  )
}

export default function SiteNavbar() {
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[rgba(8,8,8,0.75)] border-b border-white/[0.08]">
      <nav className="max-w-[1100px] mx-auto px-6 py-5 flex justify-between items-center">

        {/* Sol: mobil menü + masaüstü linkler */}
        <div className="flex items-center gap-4">
          <MobileNav nav={mobileNav} />

          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="flex items-center gap-6">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    href={link.href}
                    className="text-sm text-[#bdbdbd] hover:text-white transition-colors bg-transparent hover:bg-transparent focus:bg-transparent p-0"
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Sağ: dil seçici + ayırıcı + tema */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2.5 text-xs text-[#888]">
            {langs.map((lang) => (
              <span key={lang} className="cursor-pointer hover:text-white transition-colors">{lang}</span>
            ))}
          </div>
          <Separator orientation="vertical" className="hidden md:block h-4 bg-white/10" />
          <ModeSwitcher />
        </div>

      </nav>
    </header>
  )
}
