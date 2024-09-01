"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Zap, Activity, Clock, Target, User, Dumbbell, Calendar, Droplet, Flame, Heart, Camera } from 'lucide-react'
import { toast } from 'react-hot-toast'
import * as htmlToImage from 'html-to-image'

const fitnessLevels = ['Beginner', 'Intermediate', 'Advanced']
const fitnessGoals = ['Build Muscle', 'Lose Weight', 'Improve Endurance', 'Increase Strength', 'Enhance Flexibility']
const workoutTypes = ['Full Body', 'Upper Body', 'Lower Body', 'Push', 'Pull', 'Legs', 'Core', 'HIIT', 'Cardio']
const equipmentTypes = {
  'Gym': ['Machines', 'Free Weights', 'Cables', 'Bodyweight', 'Kettlebells', 'Medicine Balls', 'TRX'],
  'Home': ['Dumbbells', 'Resistance Bands', 'Bodyweight', 'Yoga Mat', 'Jump Rope', 'Stability Ball']
}
const workoutPreferences = ['Morning', 'Afternoon', 'Evening', 'Night']
const workoutIntensity = ['Low', 'Moderate', 'High', 'Very High']
const restPreferences = ['Minimal', 'Standard', 'Extended']

const focusAreasByWorkoutType = {
  'Full Body': ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Glutes'],
  'Upper Body': ['Chest', 'Back', 'Shoulders', 'Arms'],
  'Lower Body': ['Legs', 'Glutes', 'Core'],
  'Push': ['Chest', 'Shoulders', 'Triceps'],
  'Pull': ['Back', 'Biceps', 'Forearms'],
  'Legs': ['Quads', 'Hamstrings', 'Calves', 'Glutes'],
  'Core': ['Abs', 'Obliques', 'Lower Back'],
  'HIIT': ['Full Body', 'Cardio'],
  'Cardio': ['Cardiovascular Endurance']
}

export default function GymRoutineGenerator() {
  const [name, setName] = useState<string>('')
  const [fitnessLevel, setFitnessLevel] = useState<string>('')
  const [fitnessGoal, setFitnessGoal] = useState<string>('')
  const [workoutType, setWorkoutType] = useState<string>('')
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([])
  const [workoutLocation, setWorkoutLocation] = useState<'Gym' | 'Home'>('Gym')
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])
  const [workoutDuration, setWorkoutDuration] = useState(45)
  const [workoutPreference, setWorkoutPreference] = useState<string>('')
  const [intensity, setIntensity] = useState<string>('')
  const [restPreference, setRestPreference] = useState<string>('')
  const [workoutPlan, setWorkoutPlan] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const workoutPlanRef = useRef<HTMLDivElement>(null)

  const resetSelections = () => {
    setSelectedEquipment([])
    setSelectedFocusAreas([])
  }

  useEffect(() => {
    resetSelections()
  }, [workoutLocation, workoutType])

  const generateWorkoutPlan = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fitnessLevel,
          fitnessGoal,
          workoutType,
          selectedFocusAreas,
          workoutLocation,
          selectedEquipment,
          workoutDuration,
          workoutPreference,
          intensity,
          restPreference,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate workout plan');
      }
  
      const data = await response.json();
      setWorkoutPlan(data);
      toast.success('Workout plan generated successfully!');
    } catch (error: unknown) {
      console.error('Error generating workout plan:', error);
      if (error instanceof Error) {
        toast.error(`Failed to generate workout plan: ${error.message}`);
      } else {
        toast.error('An unknown error occurred while generating the workout plan');
      }
    } finally {
      setIsGenerating(false);
    }
  };
  
  const takeScreenshot = async () => {
    if (workoutPlanRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(workoutPlanRef.current, { quality: 1 })
        const link = document.createElement('a')
        link.download = `${name.trim() || 'workout'}-plan.png`
        link.href = dataUrl
        link.click()
        toast.success('Screenshot saved successfully!')
      } catch (error) {
        console.error('Error taking screenshot:', error)
        toast.error('Failed to take screenshot')
      }
    }
  }

  const getWorkoutEmoji = (type: string) => {
    const emojiMap: { [key: string]: string } = {
      'Full Body': '💪',
      'Upper Body': '🏋️',
      'Lower Body': '🦵',
      'Push': '🏋️‍♂️',
      'Pull': '🏋️‍♀️',
      'Legs': '🦿',
      'Core': '🧘',
      'HIIT': '🏃‍♂️',
      'Cardio': '🏃‍♀️'
    }
    return emojiMap[type] || '🏋️'
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
              FitSpark ⚡
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <User className="mr-2" /> Your Name
                </h3>
                <Input
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <User className="mr-2" /> Fitness Level
                </h3>
                <div className="flex flex-wrap gap-2">
                  {fitnessLevels.map(level => (
                    <Button
                      key={level}
                      variant={fitnessLevel === level ? "default" : "outline"}
                      onClick={() => setFitnessLevel(level)}
                      className="transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Target className="mr-2" /> Fitness Goal
                </h3>
                <div className="flex flex-wrap gap-2">
                  {fitnessGoals.map(goal => (
                    <Button
                      key={goal}
                      variant={fitnessGoal === goal ? "default" : "outline"}
                      onClick={() => setFitnessGoal(goal)}
                      className="transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                      {goal}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Activity className="mr-2" /> Workout Type
                </h3>
                <div className="flex flex-wrap gap-2">
                  {workoutTypes.map(type => (
                    <Button
                      key={type}
                      variant={workoutType === type ? "default" : "outline"}
                      onClick={() => setWorkoutType(type)}
                      className="transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
              {workoutType && (
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <Target className="mr-2" /> Focus Areas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {focusAreasByWorkoutType[workoutType as keyof typeof focusAreasByWorkoutType].map(area => (
                      <Button
                        key={area}
                        variant={selectedFocusAreas.includes(area) ? "default" : "outline"}
                        onClick={() => setSelectedFocusAreas(prev => 
                          prev.includes(area) ? prev.filter(i => i !== area) : [...prev, area]
                        )}
                        className="transition-all duration-300 ease-in-out transform hover:scale-105"
                      >
                        {area}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Dumbbell className="mr-2" /> Workout Location
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Gym', 'Home'].map(location => (
                    <Button
                      key={location}
                      variant={workoutLocation === location ? "default" : "outline"}
                      onClick={() => setWorkoutLocation(location as 'Gym' | 'Home')}
                      className="transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                      {location}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Dumbbell className="mr-2" /> Available Equipment
                </h3>
                <div className="flex flex-wrap gap-2">
                  {equipmentTypes[workoutLocation].map(item => (
                    <Button
                      key={item}
                      variant={selectedEquipment.includes(item) ? "default" : "outline"}
                      onClick={() => setSelectedEquipment(prev => 
                        prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
                      )}
                      className="transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Zap className="mr-2" /> Workout Intensity
                </h3>
                <div className="flex flex-wrap gap-2">
                  {workoutIntensity.map(intens => (
                    <Button
                      key={intens}
                      variant={intensity === intens ? "default" : "outline"}
                      onClick={() => setIntensity(intens)}
                      className="transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                      {intens}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Clock className="mr-2" /> Workout Duration
                </h3>
                <div className="flex items-center space-x-4">
                  <Slider
                    value={[workoutDuration]}
                    onValueChange={(value) => setWorkoutDuration(value[0])}
                    max={120}
                    min={15}
                    step={5}
                    className="flex-grow"
                  />
                  <span className="font-semibold">{workoutDuration} min</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Calendar className="mr-2" /> Workout Time Preference
                </h3>
                <div className="flex flex-wrap gap-2">
                  {workoutPreferences.map(pref => (
                    <Button
                      key={pref}
                      variant={workoutPreference === pref ? "default" : "outline"}
                      onClick={() => setWorkoutPreference(pref)}
                      className="transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                      {pref}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Heart className="mr-2" /> Rest Preference
                </h3>
                <div className="flex flex-wrap gap-2">
                  {restPreferences.map(pref => (
                    <Button
                      key={pref}
                      variant={restPreference === pref ? "default"  : "outline"}
                      onClick={() => setRestPreference(pref)}
                      className="transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                      {pref}
                    </Button>
                  ))}
                </div>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={generateWorkoutPlan}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Workout Plan'} <Zap className="ml-2" />
              </Button>
            </div>
            {workoutPlan && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 p-6 bg-white/80 rounded-lg shadow-lg"
                ref={workoutPlanRef}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-purple-600">
                    {name ? `${name}'s` : 'Your'} Personalized {workoutType} {getWorkoutEmoji(workoutType)}
                  </h3>
                  <Button onClick={takeScreenshot} className="bg-green-500 hover:bg-green-600 text-white">
                    <Camera className="mr-2 h-4 w-4" /> Save as Image
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-indigo-600">Type: <span className="font-normal text-gray-700">{workoutPlan.type || 'Not specified'}</span></p>
                    <p className="font-semibold text-indigo-600">Level: <span className="font-normal text-gray-700">{workoutPlan.level || 'Not specified'}</span></p>
                    <p className="font-semibold text-indigo-600">Goal: <span className="font-normal text-gray-700">{workoutPlan.goal || 'Not specified'}</span></p>
                    <p className="font-semibold text-indigo-600">Duration: <span className="font-normal text-gray-700">{workoutPlan.duration ? `${workoutPlan.duration} minutes` : 'Not specified'}</span></p>
                    <p className="font-semibold text-indigo-600">Intensity: <span className="font-normal text-gray-700">{workoutPlan.intensity || 'Not specified'}</span></p>
                    <p className="font-semibold text-indigo-600">Time: <span className="font-normal text-gray-700">{workoutPlan.preference || 'Not specified'}</span></p>
                    <p className="font-semibold text-indigo-600">Focus Areas: <span className="font-normal text-gray-700">{workoutPlan.focusAreas?.join(', ') || 'Not specified'}</span></p>
                  </div>
                  <Separator />
                  {workoutPlan.warmup && (
                    <div>
                      <h4 className="text-lg font-semibold text-purple-600 mb-2">Warm-up <Flame className="inline-block ml-1" /></h4>
                      <p className="text-gray-700">Duration: {workoutPlan.warmup.duration} minutes</p>
                      <ul className="list-disc list-inside text-gray-700">
                        {workoutPlan.warmup.exercises.map((exercise: string, index: number) => (
                          <li key={index}>{exercise}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Separator />
                  {workoutPlan.mainWorkout && workoutPlan.mainWorkout.length > 0 ? (
                    <div>
                      <h4 className="text-lg font-semibold text-purple-600 mb-2">Main Workout <Dumbbell className="inline-block ml-1" /></h4>
                      <ul className="space-y-2">
                        {workoutPlan.mainWorkout.map((exercise: any, index: number) => (
                          <li key={index} className="bg-gray-100 p-2 rounded">
                            <p className="font-semibold text-indigo-600">{exercise.name}</p>
                            <p className="text-gray-700">Sets: {exercise.sets} | Reps: {exercise.reps} | Rest: {exercise.rest}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-gray-700">No specific exercises generated.</p>
                  )}
                  <Separator />
                  {workoutPlan.cooldown && (
                    <div>
                      <h4 className="text-lg font-semibold text-purple-600 mb-2">Cool-down <Droplet className="inline-block ml-1" /></h4>
                      <p className="text-gray-700">Duration: {workoutPlan.cooldown.duration} minutes</p>
                      <ul className="list-disc list-inside text-gray-700">
                        {workoutPlan.cooldown.exercises.map((exercise: string, index: number) => (
                          <li key={index}>{exercise}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Separator />
                  {workoutPlan.hydrationTips && workoutPlan.hydrationTips.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-purple-600 mb-2">Hydration Tips <Droplet className="inline-block ml-1" /></h4>
                      <ul className="list-disc list-inside text-gray-700">
                        {workoutPlan.hydrationTips.map((tip: string, index: number) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Separator />
                  {workoutPlan.recommendations && workoutPlan.recommendations.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-purple-600 mb-2">Recommendations <Zap className="inline-block ml-1" /></h4>
                      <ul className="list-disc list-inside text-gray-700">
                        {workoutPlan.recommendations.map((rec: string, index: number) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}