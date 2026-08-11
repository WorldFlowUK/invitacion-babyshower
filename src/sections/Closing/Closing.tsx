import { FadeInSection } from '@/components/effects/FadeInSection'
import { Container } from '@/components/ui/Container'
import { invitation } from '@/data/invitation'

const dateLabel = new Intl.DateTimeFormat('es-MX', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
}).format(new Date(`${invitation.event.isoDate}T${invitation.event.time}:00`))

export function Closing() {
  return (
    <section className="flex min-h-[60svh] flex-col items-center justify-center py-section text-center">
      <Container className="flex flex-col items-center gap-4">
        <FadeInSection>
          <p className="font-display text-2xl italic leading-relaxed text-primary">
            Gracias por acompañarnos
            <br />
            en este momento tan especial.
          </p>
        </FadeInSection>
        <FadeInSection delay={0.15}>
          <span className="text-lg text-accent">♡</span>
        </FadeInSection>
        <FadeInSection delay={0.25} className="flex flex-col items-center gap-1">
          <span className="text-xs uppercase tracking-[0.3em] text-muted">Baby Shower</span>
          <span className="font-display text-sm text-primary">{dateLabel}</span>
        </FadeInSection>
      </Container>
    </section>
  )
}
