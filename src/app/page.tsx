"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dumbbell, Calculator, Utensils, Zap, Target, Users, Coins, Download, Mail } from 'lucide-react'

const MinimalDivider = () => (
  <div className="w-full my-16">
    <div className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-30"></div>
  </div>
)

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to FitSpark ⚡
          </h1>
          <p className="text-xl text-purple-200 mb-8">
            Your personal fitness companion for meal planning and workout routines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white text-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center justify-center text-2xl text-purple-600">
                  <Dumbbell className="mr-2" /> Workout Planner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center mb-4">
                  Generate personalized workout routines based on your fitness level and goals. 💪
                </p>
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <Link href="/workout-planner">Try Workout Planner</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-white text-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center justify-center text-2xl text-purple-600">
                  <Utensils className="mr-2" /> Meal Planner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center mb-4">
                  Create customized meal plans tailored to your dietary needs and preferences. 🍽️
                </p>
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <Link href="/meal-planner">Try Meal Planner</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="bg-white text-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center justify-center text-2xl text-purple-600">
                  <Calculator className="mr-2" /> TDEE Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center mb-4">
                  Calculate your Total Daily Energy Expenditure to optimize your fitness journey. 🧮
                </p>
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <Link href="/tdee-calculator">Try TDEE Calculator</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <MinimalDivider />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose FitSpark? 🌟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white text-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center justify-center text-xl text-purple-600">
                  <Zap className="mr-2" /> Personalized Plans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  Tailored workout and meal plans designed specifically for your unique goals and preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white text-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center justify-center text-xl text-purple-600">
                  <Target className="mr-2" /> Goal-Oriented Approach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  Whether you're bulking, cutting, or maintaining, FitSpark adapts to your fitness objectives.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white text-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center justify-center text-xl text-purple-600">
                  <Users className="mr-2" /> Community Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  Join a community of like-minded individuals on their fitness journeys, sharing tips and motivation.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <MinimalDivider />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Flexible Pricing with FitSpark Tokens 🪙</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white text-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-center text-2xl text-purple-600">
                  <Coins className="mr-2" /> Token System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>TDEE Calculator: <span className="font-semibold text-green-600">Free & Unlimited</span></li>
                  <li>Workout Planner: <span className="font-semibold">1 token per plan</span></li>
                  <li>Meal Planner: <span className="font-semibold">1 token per plan</span></li>
                  <li>Token Price: <span className="font-semibold">10¢ per token</span></li>
                  <li>Minimum Purchase: <span className="font-semibold">50 tokens for $5</span></li>
                  <li>Save all generated plans for future reference</li>
                  <li>Purchase tokens in larger bundles for better value</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white text-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-center text-2xl text-purple-600">
                  <Download className="mr-2" /> Save & Share
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Save plans as high-quality images</li>
                  <li>Email plans to yourself in a clean, formatted design</li>
                  <li>Easy sharing with trainers or nutrition experts</li>
                  <li>Access your saved plans anytime, anywhere</li>
                  <li>Organize and track your fitness journey progress</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <MinimalDivider />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">See FitSpark in Action 📊</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">Workout Planner Output</h3>
              <Image
                src="/images/workout-result.png"
                alt="Workout Planner Output"
                width={500}
                height={375}
                className="rounded-lg shadow-md mx-auto"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">Meal Planner Output</h3>
              <Image
                src="/images/meal-output.png"
                alt="Meal Planner Output"
                width={500}
                height={375}
                className="rounded-lg shadow-md mx-auto"
              />
            </div>
          </div>
        </motion.div>

        <MinimalDivider />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">
            Ready to Ignite Your Fitness Journey? 🚀
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join FitSpark today and unlock a world of personalized fitness solutions. Your dream body is just a click away!
          </p>
          <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
            <Link href="/signup">Get Started Now</Link>
          </Button>
        </motion.div>
      </main>
    </div>
  )
}