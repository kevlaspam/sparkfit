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

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    })

    const content = completion.choices[0].message.content

    if (!content) {
      throw new Error('No content received from OpenAI')
    }

    // Instead of parsing JSON, we'll return the raw content
    return NextResponse.json({ workoutPlan: content })

  } catch (error: unknown) {
    console.error('Error generating workout plan:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 })
    }
  }
}