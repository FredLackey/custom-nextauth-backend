import './globals.css'
import { Inter } from 'next/font/google'
import SessionContextProvider from '@/app/contexts/session-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionContextProvider>
        <body className={inter.className}>{children}</body>
      </SessionContextProvider>
    </html>
  )
}
