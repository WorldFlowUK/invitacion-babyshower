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

        {invitation.photos.hero && (
          <FadeInSection delay={0.1} y={16} className="w-full max-w-[280px]">
            <div className="overflow-hidden rounded-[2rem] border border-border shadow-[0_18px_40px_-20px_rgba(91,61,46,0.35)]">
              <img
                src={invitation.photos.hero}
                alt={`${invitation.parents.mother} y ${invitation.parents.father} esperando a ${invitation.babyName}`}
                className="aspect-[2/3] w-full object-cover"
                loading="eager"
              />
            </div>
          </FadeInSection>
        )}

        <FadeInSection delay={0.2}>
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
