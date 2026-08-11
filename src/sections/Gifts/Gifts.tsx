import { Gift } from 'lucide-react'
import { FadeInSection } from '@/components/effects/FadeInSection'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { invitation } from '@/data/invitation'

export function Gifts() {
  return (
    <section className="py-section">
      <Container className="flex flex-col items-center gap-5 text-center">
        <FadeInSection className="flex flex-col items-center gap-3">
          <Gift className="text-accent" size={20} strokeWidth={1.5} />
          <p className="font-display text-xl italic text-primary">
            Tu presencia es nuestro mejor regalo.
          </p>
        </FadeInSection>

        {invitation.giftRegistryUrl && (
          <FadeInSection delay={0.1}>
            <p className="mb-3 max-w-xs text-sm text-foreground/70">
              Si deseas tener un detalle con nosotros, dejamos esto por aquí.
            </p>
            <Button
              variant="secondary"
              onClick={() =>
                window.open(invitation.giftRegistryUrl, '_blank', 'noopener,noreferrer')
              }
            >
              Ver mesa de regalos
            </Button>
          </FadeInSection>
        )}
      </Container>
    </section>
  )
}
