import { getEventTimestamp } from './countdown'
import type { InvitationData } from '@/types'

function toIcsUtc(timestamp: number): string {
  return new Date(timestamp).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

export function buildInvitationIcs(data: InvitationData): string {
  const start = getEventTimestamp(data.event.isoDate, data.event.time, data.event.timezone)
  const end = start + 3 * 60 * 60 * 1000 // duración estimada: 3 horas

  const title = `Baby Shower · ${data.babyName}`.replace('[Nombre del bebé]', 'Baby Shower')
  const description = `Nos encantaría contar contigo en este momento tan especial.\\n${data.venue.name}, ${data.venue.address}`

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//WorldFlow//Baby Shower Invitation//ES',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:baby-shower-${data.event.isoDate}@invitation`,
    `DTSTAMP:${toIcsUtc(Date.now())}`,
    `DTSTART:${toIcsUtc(start)}`,
    `DTEND:${toIcsUtc(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${data.venue.name}, ${data.venue.address}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  return lines.join('\r\n')
}

export function downloadInvitationIcs(data: InvitationData) {
  const ics = buildInvitationIcs(data)
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = 'baby-shower.ics'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
