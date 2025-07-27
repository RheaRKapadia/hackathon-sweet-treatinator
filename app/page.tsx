'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Typewriter from './recipe/typewriter';



//incorporating the figma UI for the homepage.
export default function HomePage() {
  const [character, setCharacter] = useState('');
  const router = useRouter();

  const startGame = () => {
    if (character) router.push(`/question?character=${character}`);
  };

  // Character data for mapping
  const bakingBuddies = [
    {
      name: "Puddie",
      value: "Puddie",
      description: "Loves puddings, ice-cream, custards, & mousse! She's chill, sweet and a bit clumsy",
      imageAlt: "Puddie character",
      imageSrc: "Puddie.png", //digital human intelligence drawing for puddie
    },
    {
      name: "Mochi",
      value: "Mochi",
      description: "Loves soft, chewy, squishy & bouncy treats! She's playful sassy, and a little spoiled.",
      imageAlt: "Mochi character",
      imageSrc: "Mochi.png", //digital human intelligence drawing for mochi
    },
    {
      name: "Brownie",
      value: "Brownie",
      description: "Loves warm & gooey brownies, cookies, cakes, & pies! She's a big cuddly baker.",
      imageAlt: "Brownie character",
      imageSrc: "Brownie.png", //digital human intelligence drawing for brownie
    },
  ];

  return (
    <div className="bg-transparent flex flex-row justify-center w-full">
      <div className="w-[1400px] h-[916px] relative">
        {/* Title */}
        <div className="inline-flex gap-2 absolute top-[47px] left-[227px] flex-col items-start">
          <h1 className="relative w-full h-[126px] mt-[-5.00px] ml-[-4.00px] [text-shadow:0px_4px_4px_#00000040] [-webkit-text-stroke:4px_#9db6d8] [font-family:'SoftMarshmallow',Helvetica] font-normal text-[#691d39] text-9xl tracking-[-2.56px] leading-[140.8px] whitespace-nowrap">
            Sweet Treatinator
            {/* 🍭 */}
          </h1>
        </div>

        {/* Main Card */}
        <div className="absolute w-[950px] h-[641px] top-[180px] left-[245px]  backdrop-blur-md rounded-lg border border-solid border-[#dfdfdf] bg-[#ffffff1a] overflow-hidden">
           <div className="p-0 relative h-full">
            {/* Header Text */}
            <div className="absolute w-[931px] h-[31px] top-[15px] left-[9px] text-center">
              <p className="[font-family:'Inter',Helvetica] font-light text-[#444444] text-[32px]">
                Tell us your cravings. Get an AI-generated recipe. Easy as pie!
              </p>
            </div>

            <div className="absolute w-[411px] h-[31px] top-[87px] left-[269px] text-center">
              <p className="[font-family:'Inter',Helvetica] font-medium text-[#444444] text-[28px] mb-4">
                Choose your baking buddy:
              </p>
            </div>

            
            {/* Character Images */}
            {/* absolute top-[136px] left-[204px] */}
            <div className="rounded mx-auto flex justify-center gap-30 pt-[15%] ">
              {bakingBuddies.map((buddy) => (
                <div 
                  key={buddy.value}
                  onClick={() => setCharacter(buddy.value)}
                  className={`cursor-pointer transition-all ${
                    character === buddy.value ? 'scale-110' : 'hover:scale-105'
                  }`}
                  style={{ width: 'fit-content' }} // Ensures container fits image
                >
                  <img
                    className={`max-w-[200px] h-auto object-contain ${
                      character === buddy.value ? 'ring-2 ring-[#691d39] rounded-md' : ''
                    }`}
                    alt={buddy.imageAlt}
                    src={buddy.imageSrc}
                    style={{
                      width: buddy.name === 'Brownie' ? '118px' : 
                        buddy.name === 'Mochi' ? '114px' : '109px',
                      height: 'auto'
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Character Descriptions */}
            <div className="flex justify-between absolute top-[342px] left-[207px] w-[594px]">
              {bakingBuddies.map((buddy, index) => (
                <div
                  key={buddy.name}
                  className={`flex flex-col items-start ${
                    index === 0
                      ? "w-[195px]"
                      : index === 1
                        ? "w-[162px]"
                        : "w-[170px]"
                  }`}
                >
                  <h2 className="w-fit [font-family:'SoftMarshmallow',Helvetica] font-normal text-black text-[40px] tracking-[-0.80px] leading-[44.0px] whitespace-nowrap">
                    {buddy.name}
                  </h2>
                  <p
                    className={`[font-family:'Inter-Medium',Helvetica] font-medium text-[#444444] text-xl tracking-[0] leading-[30px] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:${index === 1 ? "6" : "5"}] [-webkit-box-orient:vertical]`}
                  >
                    {buddy.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Text */}
            <div className="[font-family:'Inter',Helvetica] absolute h-[37px] top-[592px] left-[163px] [font-family:'Inter-Light',Helvetica] font-light text-[#444444] text-[34px] tracking-[-0.68px] leading-[37.4px] whitespace-nowrap">
              <Typewriter text="Ready to bake happiness? Start the quiz!"
              speed={30} // Faster than default 50
              className="italic animate-pulse"
              />
            </div>
            
          </div>
        </div>

        {/* Start Button */}
      <button
      onClick={startGame}
      disabled={!character}
      className="flex w-[292px] h-[87px] items-center justify-center gap-2 px-4 py-0 absolute top-[830px] left-[553px] bg-[#691d39] rounded-lg border-4 border-solid border-[#9db6d8] shadow-[0px_4px_4px_#00000040] hover:bg-[#8a254f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <span className="[font-family:'SoftMarshmallow',Helvetica] font-normal text-white text-[40px] tracking-[0] leading-[60px] whitespace-nowrap">
          Start &lt;3
        </span>
      </button>
      </div>
    </div>
  );
}