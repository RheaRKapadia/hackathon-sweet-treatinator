// app/dynamic-layout.tsx
'use client';

import { useState, useEffect } from 'react';

export default function DynamicLayout({ children }: { children: React.ReactNode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0 
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getBackgroundStyle = (speed: number) => ({
    transform: `translate(
      ${(mousePosition.x / windowSize.width) * 30 * speed}%,
      ${(mousePosition.y / windowSize.height) * 30 * speed}%
    )`
  });

  return (
    <div className="min-h-screen text-[#454545] relative overflow-x-hidden">
      {/* Background Layers */}
      <div 
        className="fixed -z-20 bg-[url('/bg-1.png')]"
        style={{
        ...getBackgroundStyle(0.02), // Very slow movement
        backgroundSize: 'cover',
        backgroundPosition: 'center 70%',
        width: '110%',
        height: '110%',
        left: '-5%',
        top: '-5%',
        opacity: 1
      }}
      />
      <div 
      className="fixed -z-10 bg-[url('/bg-2.PNG')]"
      style={{
        ...getBackgroundStyle(0.08),
        backgroundSize: 'cover',
        backgroundPosition: 'center 10%',
        width: '110%',
        height: '110%',
        left: '-5%',
        top: '-5%',
        opacity: 1
      }}
    />
      
      {/* Your Content */}
      <main className="max-w-8xl relative z-10">
        {children}
      </main>
    </div>
  );
}