'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function QuestionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [treat, setTreat] = useState('');

  const character = searchParams.get('character');

  const goToRecipe = () => {
    if (treat) router.push(`/recipe?treat=${treat}&character=${character}`);
  };

  return (
    <main className="p-8">
      <h2 className="text-2xl mb-4">Hi {character}! What kind of sweet treat do you want?</h2>
      <input
        value={treat}
        onChange={(e) => setTreat(e.target.value)}
        placeholder="e.g., chocolate cake, strawberry pie..."
        className="border p-2 mb-4 w-full"
      />
      <button onClick={goToRecipe} className="bg-purple-500 text-white px-4 py-2 rounded">
        Get My Recipe!
      </button>
    </main>
  );
}
