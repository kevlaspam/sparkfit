import Link from 'next/link'
import { Dumbbell, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-6xl font-bold mb-8">Welcome to FitSpark ⚡</h1>
      <p className="text-xl mb-8">Your personal fitness companion</p>
      <div className="flex space-x-4">
        <Link href="/workout-planner">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Dumbbell className="mr-2" /> Workout Planner
          </Button>
        </Link>
        <Link href="/tdee-calculator">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Calculator className="mr-2" /> TDEE Calculator
          </Button>
        </Link>
      </div>
    </main>
  )
}