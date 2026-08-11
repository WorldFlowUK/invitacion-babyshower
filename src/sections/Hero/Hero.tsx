import { FadeInSection } from '@/components/effects/FadeInSection'
import { Container } from '@/components/ui/Container'
import { invitation } from '@/data/invitation'

export function Hero() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center py-section">
      <Container className="flex flex-col items-center gap-7 text-center">
        <FadeInSection>
          <p className="font-display text-xl italic leading-relaxed text-primary sm:text-2xl">
            Con mucha alegría queremos compartir contigo un momento que llevamos esperando con el
            corazón lleno.
          </p>
        </FadeInSection>

        <FadeInSection delay={0.15}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-muted">Celebramos a</span>
            <h2 className="font-display text-3xl text-primary sm:text-4xl">
              {invitation.babyName}
            </h2>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <p className="max-w-sm text-sm leading-relaxed text-foreground/80">
            {invitation.parents.mother} &amp; {invitation.parents.father} te invitan a celebrar la
            llegada de esta nueva vida.
          </p>
        </FadeInSection>
      </Container>
    </section>
  )
}
