'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [character, setCharacter] = useState('');
  const router = useRouter();

  const startGame = () => {
    if (character) router.push(`/question?character=${character}`);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-4xl font-bold">🍭 Sweet Treatinator</h1>
      <p>Choose your dessert avatar to begin the journey.</p>

      <select
        value={character}
        onChange={(e) => setCharacter(e.target.value)}
        className="border p-2"
      >
        <option value="">-- Select --</option>
        <option value="Candy Witch">Candy Witch</option>
        <option value="Gingerbread Goblin">Gingerbread Goblin</option>
        <option value="Sprinkle Sorcerer">Sprinkle Sorcerer</option>
      </select>

      <button
        onClick={startGame}
        className="bg-pink-500 text-white px-4 py-2 rounded"
      >
        Start
      </button>
    </div>
  );
}
