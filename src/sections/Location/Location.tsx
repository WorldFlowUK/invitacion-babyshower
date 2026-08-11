import { MapPin } from 'lucide-react'
import { FadeInSection } from '@/components/effects/FadeInSection'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { invitation } from '@/data/invitation'

export function Location() {
  return (
    <section className="py-section">
      <Container>
        <FadeInSection className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-surface/40 px-8 py-12 text-center">
          <MapPin className="text-accent" size={22} strokeWidth={1.5} />
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-2xl text-primary">{invitation.venue.name}</h3>
            <p className="max-w-xs text-sm leading-relaxed text-foreground/70">
              {invitation.venue.address}
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => window.open(invitation.venue.mapsUrl, '_blank', 'noopener,noreferrer')}
          >
            Ver en Google Maps
          </Button>
        </FadeInSection>
      </Container>
    </section>
  )
}
