import { Suspense } from 'react';
import RecipeClient from './RecipeClient';

export default function RecipePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecipeClient />
    </Suspense>
  );
}