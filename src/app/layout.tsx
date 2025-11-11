// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FoodWagen - Find Your Next Meal',
  description: 'Discover and manage delicious meals near you',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              fontWeight: 500,
            },
            success: {
              icon: 'Success',
              style: { background: '#10b981' },
            },
            error: {
              icon: 'Error',
              style: { background: '#ef4444' },
            },
          }}
        />
      </body>
    </html>
  )
}