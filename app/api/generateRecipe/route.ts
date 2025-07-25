// app/api/generateRecipe/route.ts
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();
  const { treatType, character } = body;

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  try {
    const prompt = `Act like a playful dessert wizard. Generate a fun, simple recipe for a ${treatType}, themed around the character "${character}".`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const recipe = completion.choices[0].message.content;
    return NextResponse.json({ recipe });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate recipe" }, { status: 500 });
  }
}
