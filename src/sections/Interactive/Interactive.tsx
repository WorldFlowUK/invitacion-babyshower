import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FadeInSection } from '@/components/effects/FadeInSection'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { invitation } from '@/data/invitation'
import type { BabyPredictionOptionId } from '@/types'

export function Interactive() {
  const [selectedPredictionId, setSelectedPredictionId] =
    useState<BabyPredictionOptionId | null>(null)

  const selectedPrediction =
    invitation.interactiveGame.options.find((option) => option.id === selectedPredictionId) ?? null

  return (
    <section className="py-section">
      <Container className="flex flex-col items-center gap-6 text-center">
        <FadeInSection className="flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            {invitation.interactiveGame.eyebrow}
          </span>
          <h3 className="font-display text-2xl text-primary">
            {invitation.interactiveGame.question}
          </h3>
        </FadeInSection>

        <FadeInSection delay={0.1} className="w-full">
          <AnimatePresence mode="wait">
            {selectedPrediction ? (
              <motion.div
                key="answer"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto flex max-w-xs flex-col items-center gap-3 text-sm text-foreground/80"
              >
                <p>{selectedPrediction.response}</p>
                <Button variant="ghost" onClick={() => setSelectedPredictionId(null)}>
                  Cambiar respuesta
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="options"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mx-auto grid w-full max-w-sm grid-cols-1 gap-3 sm:grid-cols-3"
              >
                {invitation.interactiveGame.options.map((option) => (
                  <Button
                    key={option.id}
                    variant="secondary"
                    className="min-h-11 px-5"
                    onClick={() => setSelectedPredictionId(option.id)}
                  >
                    {option.label}
                  </Button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </FadeInSection>
      </Container>
    </section>
  )
}
