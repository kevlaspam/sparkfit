"use client"

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Utensils, Apple, Beef, Fish, Carrot, Coffee, Info, Zap, Scale, Ban, Camera } from 'lucide-react'
import { toast } from 'react-hot-toast'
import * as htmlToImage from 'html-to-image'

const dietGoals = ['Bulking', 'Maintain', 'Cutting']
const dietTypes = ['Balanced', 'Low-carb', 'High-protein', 'Vegetarian', 'Vegan', 'Carnivore', 'Keto', 'Mediterranean']
const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack']
const cuisines = ['Italian', 'Mexican', 'Asian', 'Mediterranean', 'American', 'Indian', 'French', 'Greek']
const commonAllergies = ['Dairy', 'Eggs', 'Nuts', 'Soy', 'Wheat', 'Fish', 'Shellfish']

interface MealItem {
  Name: string;
  Description: string;
  Calories: number;
}

type MealPlan = {
  [key: string]: MealItem[];
}

export default function MealPlanner() {
  const [name, setName] = useState<string>('')
  const [calories, setCalories] = useState<number>(2000)
  const [dietGoal, setDietGoal] = useState<string>('Maintain')
  const [dietType, setDietType] = useState<string>('Balanced')
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([])
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [likedFoods, setLikedFoods] = useState<string>('')
  const [dislikedFoods, setDislikedFoods] = useState<string>('')
  const [allergies, setAllergies] = useState<string[]>([])
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const mealPlanRef = useRef<HTMLDivElement>(null)

  const toggleSelection = (item: string, currentSelection: string[], setSelection: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (currentSelection.includes(item)) {
      setSelection(currentSelection.filter(i => i !== item))
    } else {
      setSelection([...currentSelection, item])
    }
  }

  const generateMealPlan = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-meal-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          calories,
          dietGoal,
          dietType,
          mealTypes: selectedMealTypes,
          cuisines: selectedCuisines,
          likedFoods,
          dislikedFoods,
          allergies,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate meal plan')
      }

      console.log('Received meal plan:', data.mealPlan)
      
      const parsedMealPlan: MealPlan = JSON.parse(data.mealPlan)
      
      setMealPlan(parsedMealPlan)
      toast.success('Meal plan generated successfully!')
    } catch (error) {
      console.error('Error generating meal plan:', error)
      toast.error('Failed to generate meal plan. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const takeScreenshot = async () => {
    if (mealPlanRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(mealPlanRef.current, { quality: 1 })
        const link = document.createElement('a')
        link.download = `${name.trim() || 'meal'}-plan.png`
        link.href = dataUrl
        link.click()
        toast.success('Meal plan saved as image successfully!')
      } catch (error) {
        console.error('Error taking screenshot:', error)
        toast.error('Failed to save meal plan as image')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.5,
              animation: `twinkle ${Math.random() * 4 + 2}s infinite`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl z-10"
      >
        <Card className="bg-white/90 backdrop-blur-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              FitSpark Meal Planner <Utensils className="inline-block ml-2" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-lg font-semibold mb-2 flex items-center">
                  <Coffee className="mr-2" /> Your Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="calories" className="text-lg font-semibold mb-2 flex items-center">
                  <Coffee className="mr-2" /> Daily Calorie Target
                </Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    id="calories"
                    value={[calories]}
                    onValueChange={(value) => setCalories(value[0])}
                    max={5000}
                    min={1000}
                    step={50}
                    className="flex-grow"
                  />
                  <span className="font-semibold">{calories} kcal</span>
                </div>
              </div>
              <div>
                <Label className="text-lg font-semibold mb-2 flex items-center">
                  <Zap className="mr-2" /> Diet Goal
                </Label>
                <Select onValueChange={setDietGoal} defaultValue="Maintain">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your diet goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {dietGoals.map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        {goal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-lg font-semibold mb-2 flex items-center">
                  <Apple className="mr-2" /> Diet Type
                </Label>
                <Select onValueChange={setDietType} defaultValue="Balanced">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your diet type" />
                  </SelectTrigger>
                  <SelectContent>
                    {dietTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-lg font-semibold mb-2 flex items-center">
                  <Utensils className="mr-2" /> Meal Types
                </Label>
                <div className="flex flex-wrap gap-2">
                  {mealTypes.map(type => (
                    <Button
                      key={type}
                      variant={selectedMealTypes.includes(type) ? "default" : "outline"}
                      onClick={() => toggleSelection(type, selectedMealTypes, setSelectedMealTypes)}
                      className="transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-lg font-semibold mb-2 flex items-center">
                  <Beef className="mr-2" /> Preferred Cuisines
                </Label>
                <div className="flex flex-wrap gap-2">
                  {cuisines.map(cuisine => (
                    <Button
                      key={cuisine}
                      variant={selectedCuisines.includes(cuisine) ? "default" : "outline"}
                      onClick={() => toggleSelection(cuisine, selectedCuisines, setSelectedCuisines)}
                      className="transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                      {cuisine}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="liked-foods" className="text-lg font-semibold mb-2 flex items-center">
                  <Carrot className="mr-2" /> Liked Foods
                </Label>
                <Input
                  id="liked-foods"
                  placeholder="Enter foods you like (comma-separated)"
                  value={likedFoods}
                  onChange={(e) => setLikedFoods(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="disliked-foods" className="text-lg font-semibold mb-2 flex items-center">
                  <Ban className="mr-2" /> Disliked Foods
                </Label>
                <Input
                  id="disliked-foods"
                  placeholder="Enter foods you dislike (comma-separated)"
                  value={dislikedFoods}
                  onChange={(e) => setDislikedFoods(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-lg font-semibold mb-2 flex items-center">
                  <Scale className="mr-2" /> Allergies & Intolerances
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {commonAllergies.map((allergy) => (
                    <div key={allergy} className="flex items-center space-x-2">
                      <Checkbox
                        id={`allergy-${allergy}`}
                        checked={allergies.includes(allergy)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setAllergies([...allergies, allergy])
                          } else {
                            setAllergies(allergies.filter(a => a !== allergy))
                          }
                        }}
                      />
                      <label
                        htmlFor={`allergy-${allergy}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {allergy}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={generateMealPlan}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Meal Plan'} <Utensils className="ml-2" />
              </Button>
            </div>
            <AnimatePresence>
              {mealPlan && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 p-6 bg-white/80 rounded-lg shadow-lg"
                  ref={mealPlanRef}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-purple-600">
                      {name ? `${name}'s` : 'Your'} Personalized Meal Plan <Utensils className="inline-block ml-2" />
                    </h3>
                    <Button onClick={takeScreenshot} className="bg-green-500 hover:bg-green-600 text-white">
                      <Camera className="mr-2 h-4 w-4" /> Save as Image
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-purple-100 p-4 rounded-lg">
                      <p className="font-semibold text-indigo-600">Calorie Target: <span className="font-normal text-gray-700">{calories} kcal</span></p>
                      <p className="font-semibold text-indigo-600">Diet Goal: <span className="font-normal text-gray-700">{dietGoal}</span></p>
                      <p className="font-semibold text-indigo-600">Diet Type: <span className="font-normal text-gray-700">{dietType}</span></p>
                    </div>
                    <Separator />
                    <div className="space-y-6">
                      {Object.entries(mealPlan).map(([mealType, meals]) => (
                        <div key={mealType} className="bg-gray-100 p-4 rounded-lg">
                          <h4 className="text-xl font-semibold text-purple-600 mb-3 flex items-center">
                            {mealType === 'Breakfast' && <Coffee className="mr-2" />}
                            {mealType === 'Lunch' && <Utensils className="mr-2" />}
                            {mealType === 'Dinner' && <Utensils className="mr-2" />}
                            {mealType === 'Snack' && <Apple className="mr-2" />}
                            {mealType}
                          </h4>
                          <div className="space-y-3">
                            {meals.map((meal, index) => (
                              <div key={index} className="bg-white p-3 rounded-md shadow-sm">
                                <h5 className="font-semibold text-indigo-600">{meal.Name} <span className="text-gray-500 font-normal">({meal.Calories} kcal)</span></h5>
                                <p className="text-gray-700 text-sm mt-1">{meal.Description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="flex items-center text-lg font-semibold mb-2 text-purple-600">
                        <Info className="mr-2" /> Nutrition Tips
                      </h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Stay hydrated by drinking at least 8 glasses of water daily.</li>
                        <li>Include a variety of colorful fruits and vegetables in your meals.</li>
                        <li>Balance your macronutrients (proteins, carbs, and fats) for optimal health.</li>
                        <li>Consider meal prepping to ensure you stick to your meal plan throughout the week.</li>
                      </ul>
                    </div>
                    <div className="bg-purple-100 p-4 rounded-lg">
                      <h4 className="flex items-center text-lg font-semibold mb-2 text-purple-600">
                        <Info className="mr-2" /> Important Note
                      </h4>
                      <p className="text-sm text-gray-600">
                        This meal plan is a general suggestion based on your inputs. For personalized nutritional advice, please consult with a registered dietitian or nutritionist.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}