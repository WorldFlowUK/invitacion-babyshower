import type { InvitationData } from '@/types'

/**
 * Toda la información editable de la invitación vive aquí.
 * Ningún componente debe tener textos de evento hardcodeados: siempre
 * se importa desde este archivo.
 *
 * babyName, parents.mother y parents.father quedan como placeholders
 * intencionalmente: reemplázalos aquí cuando estén confirmados y se
 * propagarán a toda la invitación automáticamente.
 */
export const invitation: InvitationData = {
  babyName: 'Leonardo',

  parents: {
    mother: 'Alejandra',
    father: 'Alejandro',
  },

  event: {
    isoDate: '2026-09-26',
    time: '10:00',
    timezone: 'America/Mexico_City',
  },

  venue: {
    name: 'CASAREYNA',
    address: 'Privada 2 Oriente 1007, Centro Histórico, Puebla, Puebla, México, CP 72000',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=CASAREYNA+Privada+2+Oriente+1007+Centro+Historico+Puebla+72000+Mexico',
  },

  guests: {
    total: 24,
    plusOneAllowed: true,
    maxPlusOnes: 1,
  },

  audio: {
    enabled: true,
    source: '/audio/background.mp3',
  },

  photos: {
    hero: '/images/couple-hero.jpg',
    detail: '/images/couple-detail.jpg',
  },

  // Vacío intencionalmente: la sección de regalos no se muestra
  // hasta que exista una mesa de regalos real.
  giftRegistryUrl: '',
}
