import { Music, VolumeX } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAudio } from './AudioProvider'

export function MusicPlayer() {
  const { isPlaying, isMuted, isAvailable, toggleMute } = useAudio()

  if (!isAvailable || !isPlaying) return null

  return (
    <AnimatePresence>
      <motion.button
        type="button"
        onClick={toggleMute}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        aria-label={isMuted ? 'Activar música' : 'Silenciar música'}
        className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-primary shadow-sm backdrop-blur-sm transition-transform hover:scale-105"
      >
        <span className={isMuted ? '' : 'animate-breathe'}>
          {isMuted ? <VolumeX size={18} /> : <Music size={18} />}
        </span>
        <span className="sr-only">{isMuted ? 'Música silenciada' : 'Reproduciendo música'}</span>
      </motion.button>
    </AnimatePresence>
  )
}
