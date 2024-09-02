import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Dumbbell, Calculator, Utensils } from 'lucide-react'
import { Button } from '@/components/ui/button'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FitSpark',
  description: 'Your personal fitness companion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white`}>
        <header className="bg-black/20 backdrop-blur-md sticky top-0 z-50">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-white hover:text-purple-300 transition-colors mb-4 sm:mb-0">
                FitSpark ⚡
              </Link>
              <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
                <Link href="/workout-planner">
                  <Button variant="ghost" className="text-white hover:bg-white/20 hover:text-purple-300">
                    <Dumbbell className="mr-2 h-4 w-4" /> Workout Planner
                  </Button>
                </Link>
                <Link href="/tdee-calculator">
                  <Button variant="ghost" className="text-white hover:bg-white/20 hover:text-purple-300">
                    <Calculator className="mr-2 h-4 w-4" /> TDEE Calculator
                  </Button>
                </Link>
                <Link href="/meal-planner">
                  <Button variant="ghost" className="text-white hover:bg-white/20 hover:text-purple-300">
                    <Utensils className="mr-2 h-4 w-4" /> Meal Planner
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <main className="flex-grow relative">
          <div className="absolute inset-0 z-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  width: Math.random() * 4 + 1,
                  height: Math.random() * 4 + 1,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0.1,
                  animation: `float ${Math.random() * 10 + 10}s infinite alternate`,
                }}
              />
            ))}
          </div>
          <div className="relative z-10">
            {children}
          </div>
        </main>
        <footer className="bg-black/20 backdrop-blur-md py-4 mt-auto">
          <div className="container mx-auto px-4 text-center text-sm">
            © {new Date().getFullYear()} FitSpark. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}