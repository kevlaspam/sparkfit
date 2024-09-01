"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Scale, Ruler, Calendar, Activity, TrendingDown, TrendingUp, Minus } from 'lucide-react'

const activityLevels = [
  { value: '1.2', label: 'Sedentary (little to no exercise)' },
  { value: '1.375', label: 'Lightly active (light exercise 1-3 days/week)' },
  { value: '1.55', label: 'Moderately active (moderate exercise 3-5 days/week)' },
  { value: '1.725', label: 'Very active (hard exercise 6-7 days/week)' },
  { value: '1.9', label: 'Extra active (very hard exercise & physical job or 2x training)' },
]

export default function TDEECalculator() {
  const [gender, setGender] = useState<string>('male')
  const [age, setAge] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [activityLevel, setActivityLevel] = useState<string>('1.2')
  const [tdee, setTDEE] = useState<number | null>(null)

  const calculateTDEE = () => {
    const weightKg = parseFloat(weight)
    const heightCm = parseFloat(height)
    const ageYears = parseInt(age)

    if (isNaN(weightKg) || isNaN(heightCm) || isNaN(ageYears)) {
      alert('Please enter valid numbers for weight, height, and age.')
      return
    }

    let bmr
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * ageYears)
    } else {
      bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * ageYears)
    }

    const calculatedTDEE = bmr * parseFloat(activityLevel)
    setTDEE(Math.round(calculatedTDEE))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl z-10"
      >
        <Card className="bg-white/90 backdrop-blur-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              TDEE Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-lg font-semibold mb-2 flex items-center">
                <Scale className="mr-2" /> Gender
              </Label>
              <RadioGroup defaultValue="male" onValueChange={setGender} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="age" className="text-lg font-semibold mb-2 flex items-center">
                <Calendar className="mr-2" /> Age
              </Label>
              <Input
                id="age"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
              />
            </div>
            <div>
              <Label htmlFor="weight" className="text-lg font-semibold mb-2 flex items-center">
                <Scale className="mr-2" /> Weight (kg)
              </Label>
              <Input
                id="weight"
                placeholder="Enter your weight in kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                type="number"
              />
            </div>
            <div>
              <Label htmlFor="height" className="text-lg font-semibold mb-2 flex items-center">
                <Ruler className="mr-2" /> Height (cm)
              </Label>
              <Input
                id="height"
                placeholder="Enter your height in cm"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                type="number"
              />
            </div>
            <div>
              <Label htmlFor="activity-level" className="text-lg font-semibold mb-2 flex items-center">
                <Activity className="mr-2" /> Activity Level
              </Label>
              <Select onValueChange={setActivityLevel} defaultValue="1.2">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your activity level" />
                </SelectTrigger>
                <SelectContent>
                  {activityLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={calculateTDEE}
            >
              Calculate TDEE
            </Button>
            {tdee !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 p-4 bg-white/80 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-bold text-center text-purple-600 mb-4">Your TDEE Results</h3>
                <Separator className="my-4" />
                <p className="text-center text-gray-700">
                  Your Total Daily Energy Expenditure (TDEE) is approximately:
                </p>
                <p className="text-4xl font-bold text-center text-indigo-600 my-4">
                  {tdee} calories/day
                </p>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-gray-700">
                      <Minus className="mr-2" /> Maintenance
                    </span>
                    <span className="font-semibold">{tdee} calories/day</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-gray-700">
                      <TrendingDown className="mr-2" /> Weight Loss
                    </span>
                    <span className="font-semibold">{tdee - 500} calories/day</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-gray-700">
                      <TrendingUp className="mr-2" /> Weight Gain
                    </span>
                    <span className="font-semibold">{tdee + 500} calories/day</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <p className="text-sm text-center text-gray-600">
                  These are estimates based on the information you provided. Your actual calorie needs may vary. For weight loss or gain, a 500 calorie deficit or surplus is suggested, which typically results in about 1 pound (0.45 kg) change per week.
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}