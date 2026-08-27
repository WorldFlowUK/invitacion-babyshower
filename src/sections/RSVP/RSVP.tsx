import { FadeInSection } from '@/components/effects/FadeInSection'
import { Container } from '@/components/ui/Container'
import { RSVPForm } from '@/components/rsvp/RSVPForm'

export function RSVP() {
  return (
    <section id="rsvp" className="py-section">
      <Container>
        <FadeInSection className="mb-10 flex flex-col items-center gap-2 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-muted">Confirma tu lugar</span>
          <p className="max-w-xs text-sm text-foreground/70">
            Cuéntanos si podrás estar con nosotros.
          </p>
        </FadeInSection>
        <FadeInSection delay={0.15}>
          <RSVPForm />
        </FadeInSection>
      </Container>
    </section>
  )
}
