import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FadeInSection } from '@/components/effects/FadeInSection'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

const responses: Record<'niño' | 'niña', string> = {
  niño: 'Anotado tu voto ♡ lo sabremos juntos muy pronto.',
  niña: 'Anotado tu voto ♡ lo sabremos juntos muy pronto.',
}

export function Interactive() {
  const [guess, setGuess] = useState<'niño' | 'niña' | null>(null)

  return (
    <section className="py-section">
      <Container className="flex flex-col items-center gap-6 text-center">
        <FadeInSection className="flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-[0.3em] text-muted">Un juego rápido</span>
          <h3 className="font-display text-2xl text-primary">¿Qué crees que será?</h3>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <AnimatePresence mode="wait">
            {guess ? (
              <motion.p
                key="answer"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xs text-sm text-foreground/80"
              >
                {responses[guess]}
              </motion.p>
            ) : (
              <motion.div
                key="options"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-4"
              >
                <Button variant="secondary" onClick={() => setGuess('niño')}>
                  Niño
                </Button>
                <Button variant="secondary" onClick={() => setGuess('niña')}>
                  Niña
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </FadeInSection>
      </Container>
    </section>
  )
}
