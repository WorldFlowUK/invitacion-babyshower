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
            <div className="p-2 rounded-[2.2rem] bg-white/80 backdrop-blur-sm border border-sky-200/60 shadow-[0_20px_50px_-15px_rgba(2,132,199,0.15)]">
              <div className="overflow-hidden rounded-[1.8rem]">
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full chip-boy-editorial text-[10px] font-semibold uppercase shadow-xs">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              ¡Es un niño!
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            </div>
            
            <span className="text-xs uppercase tracking-[0.35em] text-muted font-medium mt-1">Celebramos a</span>
            
            <h2 className="font-display text-4xl text-primary sm:text-5xl font-normal tracking-wide">
              {invitation.babyName}
            </h2>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <p className="max-w-sm text-sm leading-relaxed text-foreground/80 font-light">
            La familia VW crece. Únete a nosotros para celebrar el Baby Shower de {invitation.babyName}.<br />
            <span className="font-medium text-primary/90 mt-1 inline-block">Costo del evento: $375 pesos.</span>
          </p>
        </FadeInSection>
      </Container>
    </section>
  )
}