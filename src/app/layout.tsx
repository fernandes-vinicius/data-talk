import type { Metadata } from 'next'

import { Navbar } from '@/components/navbar'
import { Providers } from '@/components/providers'
import { fontSans } from '@/config/fonts'

import './globals.css'

export const metadata: Metadata = {
  title: 'DataTalk - Chat with your documents in seconds',
  description: 'Chat with your documents in seconds',
}

interface RootLayoutProps extends Readonly<{ children: React.ReactNode }> {}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={fontSans.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
