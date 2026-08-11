import { FadeInSection } from '@/components/effects/FadeInSection'
import { Container } from '@/components/ui/Container'
import { useCountdown } from '@/hooks/useCountdown'
import { invitation } from '@/data/invitation'

const units: Array<{ key: 'days' | 'hours' | 'minutes' | 'seconds'; label: string }> = [
  { key: 'days', label: 'Días' },
  { key: 'hours', label: 'Horas' },
  { key: 'minutes', label: 'Minutos' },
  { key: 'seconds', label: 'Segundos' },
]

export function Countdown() {
  const parts = useCountdown(
    invitation.event.isoDate,
    invitation.event.time,
    invitation.event.timezone,
  )

  return (
    <section className="py-section">
      <Container className="flex flex-col items-center gap-8 text-center">
        <FadeInSection>
          <span className="text-xs uppercase tracking-[0.3em] text-muted">Falta muy poco</span>
        </FadeInSection>

        {parts.isPast ? (
          <FadeInSection>
            <p className="font-display text-2xl italic text-primary">¡Hoy es el gran día! ♡</p>
          </FadeInSection>
        ) : (
          <FadeInSection delay={0.1} className="flex gap-6 sm:gap-10">
            {units.map((unit) => (
              <div key={unit.key} className="flex flex-col items-center gap-1">
                <span className="font-display text-4xl tabular-nums text-primary sm:text-5xl">
                  {String(parts[unit.key]).padStart(2, '0')}
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.25em] text-muted">
                  {unit.label}
                </span>
              </div>
            ))}
          </FadeInSection>
        )}
      </Container>
    </section>
  )
}
