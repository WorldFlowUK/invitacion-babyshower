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
          <FadeInSection delay={0.1} y={16} className="w-full max-w-[18rem] sm:max-w-xs">
            <div className="p-[10px] sm:p-3 rounded-xl bg-white border border-sky-100/60 shadow-2xl">
              <div className="overflow-hidden rounded-lg ring-1 ring-black/[0.04]">
                <img
                  src={invitation.photos.hero}
                  alt={`${invitation.parents.mother} y ${invitation.parents.father} esperando a ${invitation.babyName}`}
                  width={1000}
                  height={1500}
                  className="block aspect-[2/3] h-auto w-full object-cover object-center"
                  loading="eager"
                  decoding="async"
                  sizes="(min-width: 640px) 320px, 288px"
                />
              </div>
            </div>
          </FadeInSection>
        )}

        <FadeInSection delay={0.2}>
          <div className="flex flex-col items-center gap-2.5">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full chip-boy-editorial text-sm shadow-xs">
              <span className="h-px w-6 bg-sky-300/50" />
              ¡Es un niño!
              <span className="h-px w-6 bg-sky-300/50" />
            </div>
            
            <span className="text-xs uppercase tracking-[0.35em] text-muted font-medium mt-1">Celebramos a</span>
            
            <h2 className="font-display text-4xl text-primary sm:text-5xl font-normal tracking-wide">
              {invitation.babyName}
            </h2>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <p className="max-w-sm text-sm leading-relaxed text-foreground/80 font-light">
            La familia VW crece. Únete a nosotros para celebrar el Baby Shower de {invitation.babyName}.
          </p>
          <div className="mt-4 flex flex-col items-center gap-2 bg-surface/30 rounded-2xl px-6 py-4 border border-border/50">
            <div className="h-px w-12 bg-border" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted">Costo del evento</span>
            <span className="font-display text-lg text-primary">{"$375 pesos"}</span>
          </div>
        </FadeInSection>
      </Container>
    </section>
  )
}