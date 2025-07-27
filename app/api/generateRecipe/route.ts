// app/api/generateRecipe/route.ts
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  console.log("Request received");
  const body = await req.json();
  const { character,mood, flavor, adventure, region, time } = body;

  if (!process.env.OPENAI_API_KEY) {
    console.error("Missing API key");
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  try {
    const prompt = `Act cute, use playful yet professional language. Do not use emojis, use keyboard characters such as :) or <3.  Generate a ${time} dessert recipe. ${character} is in the mood for something ${mood}, with ${flavor} flavor profile. ${character} is looking for ${adventure} from this region: ${region}. Find the perfect dessert recipe that fits all of these needs. Please include how much time is required for the recipe.`;
    console.log("Prompt:", prompt);  

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });
    console.log("Completion received");

    const recipe = completion.choices[0].message.content;
    return NextResponse.json({ recipe });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate recipe" }, { status: 500 });
  }
}
