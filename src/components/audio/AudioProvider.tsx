import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { invitation } from '@/data/invitation'

type AudioContextValue = {
  isPlaying: boolean
  isMuted: boolean
  isAvailable: boolean
  start: () => void
  toggleMute: () => void
}

const AudioCtx = createContext<AudioContextValue | null>(null)

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isAvailable, setIsAvailable] = useState(true)

  useEffect(() => {
    if (!invitation.audio.enabled) {
      setIsAvailable(false)
      return
    }
    const audio = new Audio(invitation.audio.source)
    audio.loop = true
    audio.volume = 0.35
    audio.preload = 'none'
    audio.onerror = () => setIsAvailable(false)
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  // Requisito de autoplay-safe: nunca se llama a play() sin un gesto
  // explícito del usuario. `start` solo se invoca desde onClick.
  const start = () => {
    const audio = audioRef.current
    if (!audio || !isAvailable) return
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsAvailable(false))
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    const next = !isMuted
    audio.muted = next
    setIsMuted(next)
  }

  return (
    <AudioCtx.Provider value={{ isPlaying, isMuted, isAvailable, start, toggleMute }}>
      {children}
    </AudioCtx.Provider>
  )
}

export function useAudio() {
  const ctx = useContext(AudioCtx)
  if (!ctx) throw new Error('useAudio debe usarse dentro de AudioProvider')
  return ctx
}
