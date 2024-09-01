import Link from 'next/link'
import { Dumbbell, Calculator } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-purple-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">FitSpark ⚡</Link>
        <div className="space-x-4">
          <Link href="/workout-planner" className="hover:text-purple-300 transition-colors">
            <span className="flex items-center"><Dumbbell className="mr-1" /> Workout Planner</span>
          </Link>
          <Link href="/tdee-calculator" className="hover:text-purple-300 transition-colors">
            <span className="flex items-center"><Calculator className="mr-1" /> TDEE Calculator</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}