'use client'

import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type MobileNavProps = {
  nav: {
    name: string
    items: { label: string; href: string }[]
  }[]
}

export function MobileNav({ nav }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          'flex size-8 touch-manipulation items-center justify-center rounded-md hover:bg-transparent focus-visible:outline-none md:hidden'
        )}
      >
        <div className="relative size-4">
          <span className={cn('absolute left-0 block h-0.5 w-4 bg-[#bdbdbd] transition-all duration-100', open ? 'top-[0.4rem] -rotate-45' : 'top-1')} />
          <span className={cn('absolute left-0 block h-0.5 w-4 bg-[#bdbdbd] transition-all duration-100', open ? 'top-[0.4rem] rotate-45' : 'top-2.5')} />
        </div>
        <span className="sr-only">Toggle Menu</span>
      </PopoverTrigger>
      <PopoverContent
        className="w-screen overflow-y-auto rounded-none border-none bg-[rgba(8,8,8,0.92)] p-0 shadow-none backdrop-blur"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={4}
      >
        <div className="flex flex-col gap-10 px-6 py-8">
          {nav.map((category, index) => (
            <div className="flex flex-col gap-4" key={index}>
              <p className="text-xs text-[#888] uppercase tracking-widest font-medium">{category.name}</p>
              <div className="flex flex-col gap-3">
                {category.items.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="text-2xl font-medium text-white hover:text-[#bdbdbd] transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
