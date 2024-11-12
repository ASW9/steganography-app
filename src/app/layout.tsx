import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Header from '@/components/Header'
import Bubbles from '@/components/Bubbles'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat'
})

export const metadata: Metadata = {
  title: 'Image Steganography',
  description: 'Hide and reveal secret messages in images using LSB steganography',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${montserrat.variable} font-sans min-h-screen relative m-0 overflow-x-hidden`}>
        <div className="fixed inset-0 bg-gradient" />
        <Bubbles />
        <div className="relative z-10 min-h-screen">
          <Header />
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}