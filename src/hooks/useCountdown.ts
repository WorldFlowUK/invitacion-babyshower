import { useEffect, useState } from 'react'
import { getCountdownParts, getEventTimestamp } from '@/lib/countdown'

export function useCountdown(isoDate: string, time: string, timeZone: string) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const target = getEventTimestamp(isoDate, time, timeZone)
  return getCountdownParts(target, now)
}
