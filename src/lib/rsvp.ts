import type { RSVPAnswer } from '@/types'

const STORAGE_KEY = 'baby-shower-rsvp-responses'

/**
 * Punto único de envío del RSVP. Hoy soporta dos backends, en este orden:
 *
 * 1. Un webhook (VITE_RSVP_WEBHOOK_URL), pensado para conectarse
 *    directamente a un workflow de n8n existente: puede reenviar la
 *    respuesta a Sheets, Zoho, WhatsApp o correo sin tocar este componente.
 * 2. Supabase (VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY), siguiendo el
 *    modelo de datos documentado en README.md, tabla `rsvps`.
 *
 * Si ninguno está configurado, la respuesta se guarda en localStorage
 * para no romper la experiencia, y se marca `persisted: false` para que
 * la UI pueda avisar con un mensaje amable en vez de un error técnico.
 */
export async function submitRSVP(answer: RSVPAnswer): Promise<{ persisted: boolean }> {
  const webhookUrl = import.meta.env.VITE_RSVP_WEBHOOK_URL as string | undefined
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

  try {
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answer),
      })
      return { persisted: true }
    }

    if (supabaseUrl && supabaseKey) {
      await fetch(`${supabaseUrl}/rest/v1/rsvps`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          guest_name: answer.guestName,
          attending: answer.attending,
          bringing_plus_one: answer.bringingPlusOne,
          plus_one_name: answer.plusOneName,
          message: answer.message,
        }),
      })
      return { persisted: true }
    }
  } catch {
    // Silencioso a propósito: nunca mostramos un error técnico al invitado.
  }

  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as RSVPAnswer[]
  existing.push(answer)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
  return { persisted: false }
}
