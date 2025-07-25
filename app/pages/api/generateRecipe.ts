// pages/api/generateRecipe.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { treatType, character } = req.body;

  const prompt = `Act like a playful dessert wizard. Generate a fun, simple recipe for a ${treatType}, themed around the character "${character}".`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4"
    });

    const recipe = completion.choices[0].message.content;
    res.status(200).json({ recipe });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate recipe" });
  }
}
