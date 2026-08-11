import { useState } from 'react'
import { AudioProvider } from '@/components/audio/AudioProvider'
import { MusicPlayer } from '@/components/audio/MusicPlayer'
import { GrowthRail } from '@/components/effects/GrowthRail'
import { Welcome } from '@/sections/Welcome/Welcome'
import { Hero } from '@/sections/Hero/Hero'
import { EventDetails } from '@/sections/EventDetails/EventDetails'
import { Countdown } from '@/sections/Countdown/Countdown'
import { Interactive } from '@/sections/Interactive/Interactive'
import { Location } from '@/sections/Location/Location'
import { RSVP } from '@/sections/RSVP/RSVP'
import { Gifts } from '@/sections/Gifts/Gifts'
import { Closing } from '@/sections/Closing/Closing'

function Invitation() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return <Welcome onOpen={() => setIsOpen(true)} />
  }

  return (
    <>
      <GrowthRail />
      <MusicPlayer />
      <main>
        <Hero />
        <EventDetails />
        <Countdown />
        <Interactive />
        <Location />
        <RSVP />
        <Gifts />
        <Closing />
      </main>
    </>
  )
}

export default function App() {
  return (
    <AudioProvider>
      <Invitation />
    </AudioProvider>
  )
}
