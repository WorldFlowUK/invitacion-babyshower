import type { InvitationData } from '@/types'

/**
 * Toda la información editable de la invitación vive aquí.
 * Ningún componente debe tener textos de evento hardcodeados: siempre
 * se importa desde este archivo.
 *
 * babyName, parents.mother y parents.father son editables: ajustalos
 * aquí y se propagarán a toda la invitación automáticamente.
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
    plusOneAllowed: false,
    maxPlusOnes: 0,
  },

  audio: {
    enabled: true,
    source: '/audio/background.mp3',
  },

  photos: {
    hero: '/images/couple-hero.jpg',
    detail: '/images/couple-detail.jpg',
  },

  interactiveGame: {
    eyebrow: 'Un juego rápido',
    question: '¿A quién crees que se parecerá más?',
    options: [
      {
        id: 'mother',
        label: 'A mamá',
        response: 'Voto anotado: quizá herede la sonrisa de mamá.',
      },
      {
        id: 'father',
        label: 'A papá',
        response: 'Voto anotado: quizá tenga los gestos de papá.',
      },
      {
        id: 'both',
        label: 'A los dos',
        response: 'Voto anotado: la mejor apuesta, un poquito de ambos.',
      },
    ],
  },

  // Vacío intencionalmente: la sección de regalos no se muestra
  // hasta que exista una mesa de regalos real.
  giftRegistryUrl: '',
}
