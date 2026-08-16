import type { RSVPAnswer } from '@/types'

const RSVP_TIMEOUT_MS = 15000

/**
 * Punto único de envío del RSVP hacia Supabase.
 * Requiere VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY. Si falta la
 * configuración o Supabase rechaza el insert, la UI muestra error.
 */
export async function submitRSVP(answer: RSVPAnswer): Promise<void> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim().replace(/\/$/, '')
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase RSVP configuration')
  }

  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), RSVP_TIMEOUT_MS)

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rsvps`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        guest_name: answer.guestName,
        attending: answer.attending,
        bringing_plus_one: answer.bringingPlusOne,
        plus_one_name: answer.plusOneName,
        message: answer.message,
        created_at: answer.createdAt,
      }),
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`Supabase RSVP insert failed with ${response.status}`)
    }
  } finally {
    window.clearTimeout(timeoutId)
  }
}
