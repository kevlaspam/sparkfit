import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      selectedBodyParts,
      selectedExerciseTypes,
      selectedEquipment,
      workoutDuration,
      fitnessGoal,
    } = body

    const prompt = `Generate a detailed workout plan based on the following parameters:
    Target Body Parts: ${selectedBodyParts.join(', ')}
    Exercise Types: ${selectedExerciseTypes.join(', ')}
    Available Equipment: ${selectedEquipment.join(', ')}
    Workout Duration: ${workoutDuration} minutes
    Fitness Goal: ${fitnessGoal}

    Please provide a structured workout plan including warm-up, main workout with exercises, sets, reps, and rest times, cool-down, and any relevant tips or recommendations.`

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