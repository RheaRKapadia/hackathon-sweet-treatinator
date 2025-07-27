'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react' // optional icons (install `lucide-react`)

export default function PersistentAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5 // set a default volume
    }
  }, [])

  const toggleAudio = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      // Start from 0.5s if audio hasn't played yet
      if (audio.currentTime < 5) {
        audio.currentTime = 5
      }
      audio.play().catch((err) => {
        console.log('Playback failed:', err)
      })
    }

    setIsPlaying(!isPlaying)
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '3rem',
      right: '5rem',
      zIndex: 50,
    }}>
      <audio ref={audioRef} src="/elevator-music-5805.mp3" loop />
      <button
        onClick={toggleAudio}
        style={{
          background: 'white',
          borderRadius: '9999px',
          padding: '0.5rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {isPlaying ? <Volume2 size={40} /> : <VolumeX size={40} />}
      </button>
    </div>
  )
}
