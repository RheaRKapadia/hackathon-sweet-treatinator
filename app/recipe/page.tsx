'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RecipePage() {
  const searchParams = useSearchParams();
  const [recipe, setRecipe] = useState('');
  const treat = searchParams.get('treat');
  const character = searchParams.get('character');

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch('/api/generateRecipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ treatType: treat, character }),
      });

      const data = await res.json();
      setRecipe(data.recipe);
    };

    if (treat && character) fetchRecipe();
  }, [treat, character]);

  return (
    <main className="p-8">
      <h2 className="text-2xl mb-4">Here’s your magical treat, {character}!</h2>
      <pre className="bg-yellow-100 p-4 whitespace-pre-wrap">{recipe || "Generating..."}</pre>
    </main>
  );
}
