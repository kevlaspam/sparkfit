import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
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
    } = body

    const prompt = `Generate a detailed workout plan based on the following parameters:
    Fitness Level: ${fitnessLevel}
    Fitness Goal: ${fitnessGoal}
    Workout Type: ${workoutType}
    Focus Areas: ${selectedFocusAreas.join(', ')}
    Location: ${workoutLocation}
    Available Equipment: ${selectedEquipment.join(', ')}
    Duration: ${workoutDuration} minutes
    Time Preference: ${workoutPreference}
    Intensity: ${intensity}
    Rest Preference: ${restPreference}

    Please provide a structured workout plan including warm-up, main workout with exercises, sets, reps, and rest times, cool-down, hydration tips, and recommendations.`

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.7,
    })

    const workoutPlan = response.choices[0].message.content
    return NextResponse.json({ workoutPlan })
  } catch (error) {
    console.error('Error generating workout plan:', error)
    return NextResponse.json({ message: 'Error generating workout plan' }, { status: 500 })
  }
}