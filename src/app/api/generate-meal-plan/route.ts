import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      name,
      calories,
      dietGoal,
      dietType,
      mealTypes,
      cuisines,
      likedFoods,
      dislikedFoods,
      allergies,
    } = body

    const prompt = `Generate a detailed meal plan for ${name} with the following requirements:
    - Total daily calories: ${calories}
    - Diet goal: ${dietGoal}
    - Diet type: ${dietType}
    - Meal types: ${mealTypes.join(', ')}
    - Preferred cuisines: ${cuisines.join(', ')}
    - Liked foods: ${likedFoods}
    - Disliked foods: ${dislikedFoods}
    - Allergies: ${allergies.join(', ')}

    Please provide a meal plan for one day, including ${mealTypes.length} meals. For each meal, include:
    1. A main dish with detailed ingredients and brief cooking instructions
    2. A side dish or complementary item
    3. A beverage suggestion
    4. Optionally, a small dessert or additional item where appropriate

    Ensure the total calories for the day match the specified calorie target of ${calories}. Provide accurate calorie counts for each component of the meal.

    Format the response as a JSON object with meal types as keys and an array of meal components as values. Each component should be an object with "Name", "Description", and "Calories" properties.

    Example format:
    {
      "Breakfast": [
        {
          "Name": "Spinach and Feta Omelette",
          "Description": "3 eggs whisked with 1/4 cup milk, filled with 1 cup fresh spinach and 30g crumbled feta. Cook in a non-stick pan with 1 tsp olive oil. Serve with 1 slice whole grain toast.",
          "Calories": 400
        },
        {
          "Name": "Side of Fresh Berries",
          "Description": "1/2 cup mixed berries (strawberries, blueberries, raspberries)",
          "Calories": 40
        },
        {
          "Name": "Green Tea",
          "Description": "1 cup of unsweetened green tea",
          "Calories": 0
        }
      ],
      ...
    }

    Ensure that the sum of calories for all meals equals ${calories}.`

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
    })

    const mealPlan = response.choices[0].message.content

    return NextResponse.json({ mealPlan })
  } catch (error) {
    console.error('Error in generate-meal-plan:', error)
    return NextResponse.json({ error: 'Failed to generate meal plan' }, { status: 500 })
  }
}