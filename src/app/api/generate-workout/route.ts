import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { auth, storage, db } from '@/lib/firebase'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
  }

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
      screenshotData, // New field for the screenshot data
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

    Please provide a structured workout plan including warm-up, main workout with exercises, sets, reps, and rest times, cool-down, hydration tips, and recommendations. Return the response as a JSON object with the following structure:
    {
      "type": string,
      "level": string,
      "goal": string,
      "duration": number,
      "intensity": string,
      "preference": string,
      "focusAreas": string[],
      "warmup": {
        "duration": number,
        "exercises": string[]
      },
      "mainWorkout": [
        {
          "name": string,
          "sets": number,
          "reps": number,
          "rest": string
        }
      ],
      "cooldown": {
        "duration": number,
        "exercises": string[]
      },
      "hydrationTips": string[],
      "recommendations": string[]
    }`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    })

    const content = completion.choices[0].message.content
    console.log("OpenAI API Response:", content)

    if (!content) {
      throw new Error('No content received from OpenAI')
    }

    let workoutPlan
    try {
      workoutPlan = JSON.parse(content)
    } catch (error) {
      console.error('Error parsing OpenAI response:', content)
      throw new Error('Invalid response format from OpenAI')
    }

    console.log("Parsed Workout Plan:", workoutPlan)

    // Save the workout plan and screenshot to Firebase if user is authenticated
    const user = auth.currentUser;
    let imageUrl = null;

    if (user && screenshotData) {
      try {
        // Upload screenshot to Firebase Storage
        const storageRef = ref(storage, `screenshots/${user.uid}/${Date.now()}.png`);
        await uploadString(storageRef, screenshotData, 'data_url');
        imageUrl = await getDownloadURL(storageRef);

        // Save metadata to Firestore
        await addDoc(collection(db, 'plans'), {
          userId: user.uid,
          type: 'workout',
          plan: workoutPlan,
          imageUrl: imageUrl,
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
          createdAt: new Date()
        });

        console.log("Workout plan and screenshot saved successfully");
      } catch (e) {
        console.error("Error saving workout plan and screenshot: ", e);
      }
    } else {
      console.log("No user authenticated or no screenshot data, skipping save to Firebase");
    }

    return NextResponse.json({ workoutPlan, imageUrl })
  } catch (error: unknown) {
    console.error('Error generating workout plan:', error)
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Error generating workout plan', error: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 })
    }
  }
}