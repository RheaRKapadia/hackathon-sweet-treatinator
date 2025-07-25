'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RecipePage() {
  const searchParams = useSearchParams();
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const treat = searchParams.get('treat');
  const character = searchParams.get('character');

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!treat || !character) return;

      try {
        const res = await fetch('/api/generateRecipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ treatType: treat, character }),
        });

        if (!res.ok) {
          throw new Error('API response not OK');
        }

        const data = await res.json();
        setRecipe(data.recipe);
      } catch (err: any) {
        console.error('Error fetching recipe:', err);
        setError('Failed to generate recipe.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [treat, character]);

  if (loading) return <p>Generating your sweet treat...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <main className="p-8">
      <h2 className="text-2xl mb-4">Here's your treat, {character}!</h2>
      <pre className="bg-black-100 p-4 whitespace-pre-wrap">{recipe}</pre>
    </main>
  );
}
