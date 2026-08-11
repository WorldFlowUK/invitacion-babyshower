import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useAudio } from '@/components/audio/AudioProvider'
import { invitation } from '@/data/invitation'

const eventDateLabel = new Intl.DateTimeFormat('es-MX', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: invitation.event.timezone,
}).format(new Date(`${invitation.event.isoDate}T${invitation.event.time}:00`))

type WelcomeProps = {
  onOpen: () => void
}

export function Welcome({ onOpen }: WelcomeProps) {
  const { start } = useAudio()

  const handleOpen = () => {
    start()
    onOpen()
  }

  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-8"
      >
        <span className="text-xs uppercase tracking-[0.35em] text-muted">Con todo el cariño</span>

        <h1 className="font-display text-4xl italic leading-tight text-primary sm:text-5xl">
          Una nueva historia
          <br />
          está por comenzar
        </h1>

        <div className="h-px w-10 bg-border" />

        <div className="flex flex-col items-center gap-1">
          <span className="text-xs uppercase tracking-[0.3em] text-muted">Baby Shower</span>
          <span className="font-display text-lg text-primary">{eventDateLabel}</span>
        </div>

        <Button onClick={handleOpen} className="mt-4">
          Abrir invitación
        </Button>
      </motion.div>
    </section>
  )
}
