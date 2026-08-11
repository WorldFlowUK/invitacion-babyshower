/**
 * Construye la fecha/hora del evento como un instante UTC real,
 * leyendo el offset de la zona horaria indicada en vez de asumir
 * la zona horaria del navegador del invitado. Esto evita el error
 * clásico de countdowns que se desfasan según dónde abre el link
 * la persona (CDMX, Berlín, Santiago, etc.).
 */
export function getEventTimestamp(isoDate: string, time: string, timeZone: string): number {
  const [year, month, day] = isoDate.split('-').map(Number)
  const [hour, minute] = time.split(':').map(Number)

  // Partimos de un instante UTC "naive" con esos mismos números...
  const naiveUtc = Date.UTC(year, month - 1, day, hour, minute)

  // ...y medimos cuánto se desvía ese instante cuando se formatea en
  // la zona horaria objetivo, para restar el offset real (incluye DST).
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  const parts = formatter.formatToParts(new Date(naiveUtc))
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? '0')

  const asUtcInTz = Date.UTC(
    get('year'),
    get('month') - 1,
    get('day'),
    get('hour'),
    get('minute'),
    get('second'),
  )

  const offset = asUtcInTz - naiveUtc
  return naiveUtc - offset
}

export type CountdownParts = {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

export function getCountdownParts(targetTimestamp: number, now: number): CountdownParts {
  const diff = targetTimestamp - now

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }

  const seconds = Math.floor(diff / 1000) % 60
  const minutes = Math.floor(diff / (1000 * 60)) % 60
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  return { days, hours, minutes, seconds, isPast: false }
}
