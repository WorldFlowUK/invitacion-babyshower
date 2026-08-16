export type Guest = {
  id: string
  name: string
  plusOneAllowed: boolean
}

export type RSVPAnswer = {
  guestName: string
  attending: boolean
  bringingPlusOne: boolean
  plusOneName: string | null
  message: string | null
  createdAt: string
}

export type InvitationData = {
  babyName: string
  parents: {
    mother: string
    father: string
  }
  event: {
    isoDate: string // e.g. '2026-09-26'
    time: string // e.g. '10:00'
    timezone: string // IANA, e.g. 'America/Mexico_City'
  }
  venue: {
    name: string
    address: string
    mapsUrl: string
  }
  guests: {
    total: number
    plusOneAllowed: boolean
    maxPlusOnes: 1
  }
  audio: {
    enabled: boolean
    source: string
  }
  photos: {
    hero: string | null
    detail: string | null
  }
  giftRegistryUrl: string
}
