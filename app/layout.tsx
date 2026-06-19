import type { Metadata } from 'next'
import { Roboto, Pixelify_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import StarField from '@/components/StarField'
import { Navbar } from '@/components/ui/mini-navbar'

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const pixelifySans = Pixelify_Sans({
  variable: '--font-pixel',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Asicioglu',
  description: 'Spor, medya ve iş dünyasının kesişiminde.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" suppressHydrationWarning className={`${roboto.variable} ${pixelifySans.variable}`}>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <StarField />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
