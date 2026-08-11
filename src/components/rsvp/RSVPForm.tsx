import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { invitation } from '@/data/invitation'
import { submitRSVP } from '@/lib/rsvp'
import type { RSVPAnswer } from '@/types'

type Step = 'attending' | 'name' | 'plusOne' | 'plusOneName' | 'message' | 'sending' | 'done'

const stepVariants = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
}

export function RSVPForm() {
  const [step, setStep] = useState<Step>('attending')
  const [attending, setAttending] = useState<boolean | null>(null)
  const [guestName, setGuestName] = useState('')
  const [bringingPlusOne, setBringingPlusOne] = useState(false)
  const [plusOneName, setPlusOneName] = useState('')
  const [message, setMessage] = useState('')
  const [persistedRemotely, setPersistedRemotely] = useState(true)

  const handleAttending = (value: boolean) => {
    setAttending(value)
    setStep(value ? 'name' : 'sending')
    if (!value) void finish(value)
  }

  const finish = async (attendingValue: boolean) => {
    setStep('sending')
    const answer: RSVPAnswer = {
      guestName: guestName || 'Invitado',
      attending: attendingValue,
      bringingPlusOne: attendingValue ? bringingPlusOne : false,
      plusOneName: attendingValue && bringingPlusOne ? plusOneName || null : null,
      message: message || null,
      createdAt: new Date().toISOString(),
    }
    const result = await submitRSVP(answer)
    setPersistedRemotely(result.persisted)
    setStep('done')
  }

  return (
    <div className="mx-auto flex min-h-[220px] w-full max-w-sm flex-col items-center justify-center gap-6 text-center">
      <AnimatePresence mode="wait">
        {step === 'attending' && (
          <motion.div key="attending" {...stepVariants} className="flex flex-col gap-5">
            <p className="font-display text-2xl text-primary">¿Podrás acompañarnos?</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => handleAttending(true)}>Sí, ahí estaré ♡</Button>
              <Button variant="secondary" onClick={() => handleAttending(false)}>
                No podré asistir
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'name' && (
          <motion.form
            key="name"
            {...stepVariants}
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              setStep(invitation.guests.plusOneAllowed ? 'plusOne' : 'message')
            }}
          >
            <label className="flex flex-col gap-2 text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-muted">
                Tu nombre completo
              </span>
              <input
                required
                autoFocus
                value={guestName}
                onChange={(event) => setGuestName(event.target.value)}
                className="rounded-full border border-border bg-background px-5 py-3 text-sm text-foreground outline-none focus:border-accent"
                placeholder="Nombre y apellido"
              />
            </label>
            <Button type="submit">Continuar</Button>
          </motion.form>
        )}

        {step === 'plusOne' && (
          <motion.div key="plusOne" {...stepVariants} className="flex flex-col gap-5">
            <p className="font-display text-2xl text-primary">¿Vendrás acompañado?</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => {
                  setBringingPlusOne(true)
                  setStep('plusOneName')
                }}
              >
                Sí
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setBringingPlusOne(false)
                  setStep('message')
                }}
              >
                No
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'plusOneName' && (
          <motion.form
            key="plusOneName"
            {...stepVariants}
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              setStep('message')
            }}
          >
            <label className="flex flex-col gap-2 text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-muted">
                Nombre de tu acompañante
              </span>
              <input
                required
                autoFocus
                value={plusOneName}
                onChange={(event) => setPlusOneName(event.target.value)}
                className="rounded-full border border-border bg-background px-5 py-3 text-sm text-foreground outline-none focus:border-accent"
                placeholder="Nombre y apellido"
              />
            </label>
            <Button type="submit">Continuar</Button>
          </motion.form>
        )}

        {step === 'message' && (
          <motion.form
            key="message"
            {...stepVariants}
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              void finish(true)
            }}
          >
            <label className="flex flex-col gap-2 text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-muted">
                ¿Quieres dejarnos un mensaje? (opcional)
              </span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={3}
                className="rounded-2xl border border-border bg-background px-5 py-3 text-sm text-foreground outline-none focus:border-accent"
                placeholder="Escribe aquí..."
              />
            </label>
            <Button type="submit">Confirmar asistencia</Button>
          </motion.form>
        )}

        {step === 'sending' && (
          <motion.div key="sending" {...stepVariants}>
            <p className="text-sm text-muted">Enviando tu respuesta...</p>
          </motion.div>
        )}

        {step === 'done' && (
          <motion.div key="done" {...stepVariants} className="flex flex-col gap-3">
            <span className="text-2xl">✨</span>
            <p className="font-display text-2xl text-primary">
              {attending ? '¡Gracias por confirmar! ♡' : 'Gracias por avisarnos ♡'}
            </p>
            <p className="text-sm text-foreground/70">
              {attending
                ? 'Será un placer compartir este momento contigo.'
                : 'Te extrañaremos, pero agradecemos muchísimo que nos avisaras.'}
            </p>
            {!persistedRemotely && (
              <p className="text-xs text-muted">
                Tu respuesta quedó guardada en este dispositivo; en breve conectaremos la
                confirmación automática.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
