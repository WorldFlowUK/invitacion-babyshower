import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { invitation } from '@/data/invitation'
import { submitRSVP } from '@/lib/rsvp'
import type { RSVPAnswer } from '@/types'

type Step = 'attending' | 'name' | 'plusOne' | 'plusOneName' | 'message'
type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

const stepVariants = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
}

const fieldBaseClass =
  'border border-border bg-background px-5 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30'
const inputClass = `rounded-full ${fieldBaseClass}`
const textareaClass = `rounded-2xl ${fieldBaseClass}`

export function RSVPForm() {
  const [step, setStep] = useState<Step>('attending')
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle')
  const [attending, setAttending] = useState<boolean | null>(null)
  const [guestName, setGuestName] = useState('')
  const [bringingPlusOne, setBringingPlusOne] = useState(false)
  const [plusOneName, setPlusOneName] = useState('')
  const [message, setMessage] = useState('')
  const [lastAnswer, setLastAnswer] = useState<RSVPAnswer | null>(null)

  const isSubmitting = submissionStatus === 'submitting'
  const isSuccess = submissionStatus === 'success'
  const isError = submissionStatus === 'error'
  const submittedAttending = lastAnswer?.attending ?? attending

  const buildAnswer = (attendingValue: boolean): RSVPAnswer => ({
    guestName: guestName.trim() || 'Invitado',
    attending: attendingValue,
    bringingPlusOne: attendingValue ? bringingPlusOne : false,
    plusOneName: attendingValue && bringingPlusOne ? plusOneName.trim() || null : null,
    message: message.trim() || null,
    createdAt: new Date().toISOString(),
  })

  const submitAnswer = async (answer: RSVPAnswer) => {
    setLastAnswer(answer)
    setSubmissionStatus('submitting')

    try {
      await submitRSVP(answer)
      setSubmissionStatus('success')
    } catch (error) {
      console.error('No se pudo enviar el RSVP.', error)
      setSubmissionStatus('error')
    }
  }

  const finish = (attendingValue: boolean) => {
    void submitAnswer(buildAnswer(attendingValue))
  }

  const handleAttending = (value: boolean) => {
    setAttending(value)
    setStep('name')
  }

  const handleNameSubmit = () => {
    if (attending === false) {
      finish(false)
      return
    }

    setStep(invitation.guests.plusOneAllowed ? 'plusOne' : 'message')
  }

  const handleRetry = () => {
    if (!lastAnswer) return
    void submitAnswer(lastAnswer)
  }

  return (
    <div
      className="mx-auto flex min-h-[240px] w-full max-w-sm flex-col items-center justify-center gap-6 text-center"
      aria-busy={isSubmitting}
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {isSubmitting && (
          <motion.div key="sending" {...stepVariants} role="status">
            <p className="text-sm text-muted">Enviando tu respuesta...</p>
          </motion.div>
        )}

        {isSuccess && (
          <motion.div key="done" {...stepVariants} className="flex flex-col gap-3" role="status">
            <span className="text-2xl">✨</span>
            <p className="font-display text-2xl text-primary">
              {submittedAttending ? '¡Gracias por confirmar! ♡' : 'Gracias por avisarnos ♡'}
            </p>
            <p className="text-sm text-foreground/70">
              {submittedAttending
                ? 'Será un placer compartir este momento contigo.'
                : 'Te extrañaremos, pero agradecemos muchísimo que nos avisaras.'}
            </p>
          </motion.div>
        )}

        {isError && (
          <motion.div
            key="error"
            {...stepVariants}
            className="flex flex-col items-center gap-4"
            role="alert"
          >
            <p className="font-display text-2xl text-primary">No pudimos registrar tu respuesta.</p>
            <p className="text-sm leading-relaxed text-foreground/70">
              Revisa tu conexión e inténtalo otra vez. Si el problema continúa, avísanos por
              mensaje directo.
            </p>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <Button onClick={handleRetry}>Intentar de nuevo</Button>
              <Button variant="secondary" onClick={() => setSubmissionStatus('idle')}>
                Editar respuesta
              </Button>
            </div>
          </motion.div>
        )}

        {submissionStatus === 'idle' && step === 'attending' && (
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

        {submissionStatus === 'idle' && step === 'name' && (
          <motion.form
            key="name"
            {...stepVariants}
            className="flex w-full flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              handleNameSubmit()
            }}
          >
            <label className="flex flex-col gap-2 text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-muted">
                Tu nombre completo
              </span>
              <input
                required
                autoFocus
                autoComplete="name"
                value={guestName}
                onChange={(event) => setGuestName(event.target.value)}
                className={inputClass}
                placeholder="Nombre y apellido"
              />
            </label>
            <Button type="submit">Continuar</Button>
          </motion.form>
        )}

        {submissionStatus === 'idle' && step === 'plusOne' && (
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
                  setPlusOneName('')
                  setStep('message')
                }}
              >
                No
              </Button>
            </div>
          </motion.div>
        )}

        {submissionStatus === 'idle' && step === 'plusOneName' && (
          <motion.form
            key="plusOneName"
            {...stepVariants}
            className="flex w-full flex-col gap-4"
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
                autoComplete="name"
                value={plusOneName}
                onChange={(event) => setPlusOneName(event.target.value)}
                className={inputClass}
                placeholder="Nombre y apellido"
              />
            </label>
            <Button type="submit">Continuar</Button>
          </motion.form>
        )}

        {submissionStatus === 'idle' && step === 'message' && (
          <motion.form
            key="message"
            {...stepVariants}
            className="flex w-full flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              finish(true)
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
                className={textareaClass}
                placeholder="Escribe aquí..."
              />
            </label>
            <Button type="submit">Confirmar asistencia</Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
