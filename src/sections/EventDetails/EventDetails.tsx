import { CalendarPlus } from 'lucide-react'
import { FadeInSection } from '@/components/effects/FadeInSection'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { invitation } from '@/data/invitation'
import { downloadInvitationIcs } from '@/lib/calendar'

const dateLabel = new Intl.DateTimeFormat('es-MX', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: invitation.event.timezone,
}).format(new Date(`${invitation.event.isoDate}T${invitation.event.time}:00`))

const timeLabel = new Intl.DateTimeFormat('es-MX', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
  timeZone: invitation.event.timezone,
}).format(new Date(`${invitation.event.isoDate}T${invitation.event.time}:00`))

export function EventDetails() {
  return (
    <section className="py-section">
      <Container className="flex flex-col gap-10">
        <FadeInSection className="grid grid-cols-2 gap-8 text-center">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-[0.3em] text-muted">Cuándo</span>
            <span className="font-display text-lg text-primary">{dateLabel}</span>
            <span className="text-sm text-foreground/70">{timeLabel}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-[0.3em] text-muted">Dónde</span>
            <span className="font-display text-lg text-primary">{invitation.venue.name}</span>
            <span className="text-sm text-foreground/70">Puebla, México</span>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.15} className="flex justify-center">
          <Button variant="secondary" onClick={() => downloadInvitationIcs(invitation)}>
            <CalendarPlus size={16} />
            Agregar al calendario
          </Button>
        </FadeInSection>
      </Container>
    </section>
  )
}
