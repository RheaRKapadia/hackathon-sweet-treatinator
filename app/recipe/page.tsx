'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Typewriter from './typewriter';

import { jsPDF } from "jspdf";


const punMap = {
    Brownie: [
      "I’m here to pawsitively ruin your diet.",

      "This brownie is so fudgy, it should be arrested.",

      "You’re bearly gonna believe how good this is.",

      "Let’s get bakin’, honey!",

      "I knead dessert like you knead dough.",

      "Warning: These cookies are un-bear-ably addictive.",

      "Is it just me, or is this pie berry suspicious?",

      "This recipe is un-beAR-ably delicious.",

      "This cake is un-beAR-able!"
    ],
    Mochi: [
      "I’ve got purr-fection right here.",

      "Don’t paw-nder—just eat the mochi!",
      
      "This dessert is claw-some. No regrets.",
      
      "You’re feline lucky I shared this recipe.",
      
      "Life’s short. Lick the spoon.",
      
      "I’m not kitten—this is the best donut ever.",
      
      "Macarons? More like meow-carons.",
      
      "Fur real, stop kneading compliments."
    ],
    Puddie: [
      "I scoop you’re gonna love this!",

      "Ice cream? More like nice cream!",
      
      "Let’s puddi-cate your sweet tooth.",
      
      "This mousse is panda-monium in your mouth.",
      
      "Chill out—dessert is sundae best.",
      
      "Oops… did I whisk all the cream?",
      
      "Custard? I cust-ard you to try it!",
      
       "You are sundaes away from crazy."
    ],

  };

export default function RecipePage() {
  const searchParams = useSearchParams();
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

    const mood = searchParams.get('mood');
    const flavor = searchParams.get('flavor');
    const adventure = searchParams.get('adventure');
    const region = searchParams.get('region');
    const time = searchParams.get('time');


  const character = searchParams.get('character');


  const handlePdfDownload = () => {
    const doc = new jsPDF();

    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const wrapWidth = pageWidth - margin * 2;

    const recipeContent = recipe
    doc.setFontSize(10); 

    const wrappedText = doc.splitTextToSize(recipeContent, wrapWidth);
    doc.text(wrappedText, 10, 10);
    doc.save("recipe.pdf");
  };


  useEffect(() => {
    const fetchRecipe = async () => {
      if (!mood || !character || !flavor || !adventure || !region || !time) return;

      try {
        const res = await fetch('/api/generateRecipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ character, mood, flavor, adventure, region, time }),
        });

        if (!res.ok) {
          throw new Error('API response not OK');
        }

        const data = await res.json();
        setRecipe(data.recipe);
      } catch (err: unknown) {
        console.error('Error fetching recipe:', err);
        setError('Failed to generate recipe.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [character, mood, flavor, adventure, region, time]);

//   if (loading) return <p>Generating your sweet treat...</p>;
if (loading) {

  
    const selectedCharacter = character || 'Mochi'; // fallback character
    const punArray = punMap[selectedCharacter as keyof typeof punMap] || ["Cooking up your recipe..."];

    const pun = punArray[Math.floor(Math.random() * punArray.length)];
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-200 text-center  p-8">
        <Image
          src={`/${selectedCharacter}.png`}
          alt={`${selectedCharacter} mascot`}
          className='animate-bounce'
          width={250}
          height={250}
          priority
        />
        <Typewriter className="mt-6 text-xl italic text-gray-700 animate-pulse" text={pun}
        />
      </div>
    );
  }
  

  if (error) return <p className="text-red-500">{error}</p>;


return (
    // bg-[url('/RecipeBg.png')] bg-cover bg-no-repeat
    <div className="relative min-h-screen  bg-center p-8 flex flex-col justify-between">
      <div>
        <h1 style={{ WebkitTextStroke: '4px #9DB6D8', textShadow: '0px 4px 4px #00000040' }} className=" [font-family:'SoftMarshmallow',Helvetica] font-normal text-[#691d39] text-8xl tracking-[-2.56px] leading-[140.8px]  text-[#691D39] font-bold text-center">
          Your sweet treat recipe is...
        </h1>
        <h2 className="text-[28px] text-center text-[#454545]">
          Tell us your cravings. Get a recipe. Easy as pie!
        </h2>
  
        {/* Only show <pre> when recipe is ready */}
        {recipe && (
          <pre className="bg-white/10  backdrop-blur-md border border-[#C2B5CF] rounded-lg pl-[80px] pr-[80px] pt-[40px] pb-[40px] w-[65%] mx-auto mt-4 whitespace-pre-wrap ">
            <div className='border-image-box'>
            {recipe}
            </div>
            
          </pre>
        )}

      {/* {recipe && (
        <div className="border-image-box w-[65%] mx-auto mt-4 text-white text-lg">
          <pre className="whitespace-pre-wrap">
            {recipe}
          </pre>
        </div>
      )} */}


      </div>
      
  
      {/* Images and button */}
      <img src={'/mochi.png'} className='absolute scale-x-[-1] w-[160px] top-[13%] left-[12%]' />
      <img src={'/brownie.png'} className='absolute w-[180px] bottom-[40%] right-[12%]' />
      <img src={'/puddie.png'} className='absolute  scale-x-[-1] w-[160px] bottom-[3%] left-[12%]' />
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => window.location.href = '/'}
          className="h-[10%] bg-[#691d39] rounded-lg border-4 border-[#9db6d8] shadow-[0px_4px_4px_#00000040] hover:bg-[#8a254f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center px-4 py-0"
        >
          <span className="[font-family:'SoftMarshmallow',Helvetica] font-normal text-white text-[40px] leading-[60px] whitespace-nowrap">
            Restart &lt;3
          </span>
        </button>

        <button
          onClick={handlePdfDownload}
          className="h-[10%] bg-[#691d39] rounded-lg border-4 border-[#9db6d8] shadow-[0px_4px_4px_#00000040] hover:bg-[#8a254f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center px-4 py-0"
        >
          <span className="[font-family:'SoftMarshmallow',Helvetica] font-normal text-white text-[40px] leading-[60px] whitespace-nowrap">
            Download as PDF
          </span>
        </button>
      </div>



    </div>
  );
  
}



//   return (
//     <div className="min-h-screen bg-[url('/RecipeBg.png')] bg-cover p-8 flex flex-col justify-between">
//     <div>
//         <h1 style={{ WebkitTextStroke: '1px #9DB6D8' }} className="[font-family:'SoftMarshmallow',Helvetica] text-[75px] text-[#691D39] font-bold text-center">
//         Your sweet treat recipe is...
//         </h1>
//         <h2 className="text-[28px] text-center text-[#454545]">
//         Tell us your cravings. Get a recipe. Easy as pie!
//         </h2>
//         <pre className="bg-white/10 backdrop-blur-md border border-[#C2B5CF] rounded p-[40px] w-[65%] mx-auto mt-4 whitespace-pre-wrap radius-[16px]">
//         {recipe}
//         </pre>
//     </div>
//     <img src={'/mochi3.png'} className='w-[160px] top-[20px]'></img>
//     <img src={'/brownie3.png'} className='w-[300px]'></img>
//     <img src={'/puddie.png'} className='w-[106px]'></img>

//     <button className="w-[18%] h-[10%] mt-4 bg-[#691d39] rounded-lg border-4 border-[#9db6d8] shadow-[0px_4px_4px_#00000040] hover:bg-[#8a254f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center px-4 py-0 mx-auto">
//         <span className="[font-family:'SoftMarshmallow',Helvetica] font-normal text-white text-[40px] leading-[60px] whitespace-nowrap">
//         Restart &lt;3
//         </span>
//     </button>
//     </div>

//   );