'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function QuestionClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const character = searchParams.get('character');

  //Array of preferences
  const moodOptions = ['Soft & Chewy', 'Crunchy & Crispy', 'Cold & Refreshing'];
  const flavorOptions = ['Chocolatey', 'Fruity', 'Creamy'];
  const adventureOptions = [
    'ooh, Show me something unique',
    "hmm, Something I don't usually eat",
    'Classic sweets please!!',
  ];
  const timeOptions = ['Fun project', 'Quick & simple'];

//  set constants
  const [mood, setMood] = useState('');
  const [flavor, setFlavor] = useState('');
  const [adventure, setAdventure] = useState('');
  const [region, setRegion] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      mood,
      flavor,
      adventure,
      region,
      time,
    });

    router.push(`/recipe?${params.toString()}`);
  };

//   making sure all questions are answered before submitting
  const goToRecipe = () => {
    if (mood && flavor && adventure && region && time){
    router.push(`/recipe?character=${character}&mood=${encodeURIComponent(mood)}&flavor=${encodeURIComponent(flavor)}&adventure=${encodeURIComponent(adventure)}&region=${encodeURIComponent(region)}&time=${encodeURIComponent(time)}`);
      } else {
  alert('Please answer all questions!');
  }
  };


  return (
    <main className=" flex flex-wrap justify-between gap-15 p-4 max-w-[65%] mx-auto">
    {/* title */}
    <h2 className="text-7xl font-normal text-center w-full text-[#691d39] mt-4 [text-shadow:0px_4px_4px_#00000040]
    [-webkit-text-stroke:4px_#9db6d8]
    [font-family:'SoftMarshmallow',Helvetica]">
      Hi {character}! Answer the questions to get your sweet treat recipe!
    </h2>

    <div className='w-[65%] bg-white/10  backdrop-blur-md border border-[#C2B5CF] rounded-lg p-[40px]  mt-1 whitespace-pre-wrap'>
      {/*Mood */}
      <div className="mb-6">
        <p className="text-xl font-medium text-[#691d39] mb-2">What are you in the mood for?</p>
        <div className="flex flex-col gap-2">
          {moodOptions.map((option)=> (
            <button
            key={option}
            onClick={() => setMood(option)}
            className={`p-2 rounded bg-pink-300 text-white text-left ${mood === option ? 'ring-2 ring-white' :''}`}
          >
            {option}
          </button>
          ))}
        </div>
      </div>

      {/*Flavor */}
      <div className="mb-6">
        <p className="text-xl font-medium text-[#691d39] mb-2"> What flavor are you craving the most?</p>
        <div className="flex flex-col gap-2">
          {flavorOptions.map((option)=> (
            <button
            key={option}
            onClick={()=> setFlavor(option)}
            className={`p-2 rounded bg-pink-300 text-white text-left ${flavor === option ? 'ring-2 ring-white' :''}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/*Adventure*/}
      <div className="mb-6">
        <p className="text-xl font-medium text-[#691d39] mb-2">How adventurous do you feel?</p>
        <div className="flex flex-col gap-2">
          {adventureOptions.map((option) => (
            <button
            key={option}
            onClick={() => setAdventure(option)}
            className={`p-2 rounded bg-pink-300 text-white text-left ${adventure === option ? 'ring-2 ring-white' :''}`}
          >
            {option}
            </button>
          ))}
        </div>
      </div>

      {/* Region */}
      <div className="mb-6">
        <p className="text-xl font-medium text-[#691d39] mb-2">Which region are you most curious about today??</p>
        <input
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          placeholder="e.g., India, Peru, Japan, Surprise me!"
          className="p-2 rounded bg-pink-300 text-white placeholder-white/70 w-full"
        />
      </div>

      {/*Time*/}
      <div className="mb-6">
        <p className="text-xl font-medium text-[#691d39] mb-2">Want something quick and easy or something fun to make?</p>
        <div className="flex flex-col gap-2">
          {timeOptions.map((option) => (
            <button
            key={option}
            onClick={() => setTime(option)}
            className={`p-2 rounded bg-pink-300 text-white text-left ${time === option ? 'ring-2 ring-white': ''}`}
            >
              {option}
              </button>
          ))}
        </div>
      </div>
      
      {/*Submit*/}
      <button
        onClick={goToRecipe}
        disabled={!character}
        className="flex items-center justify-center gap-2 px-6 py-4 mx-auto mt-4 bg-[#691d39] rounded-lg border-4 border-solid border-[#9db6d8] shadow-[0px_4px_4px_#00000040] hover:bg-[#8a254f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <span className="[font-family:'SoftMarshmallow',Helvetica] font-normal text-white text-[32px] leading-[40px] whitespace-nowrap">
            Get My Recipe!
          </span>
      </button>
    </div>
    {/* fixed character on the right */}
    <div>
    <div className="fixed right-[15%] z-10 ">
      <Image
        src={`/${character}.png`}
        alt={`${character} mascot`}
        width={300}
        height={300}
        priority
      />
    </div>
    </div>
    </main>
  );
}
