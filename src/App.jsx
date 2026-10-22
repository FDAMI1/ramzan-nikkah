import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Gate from './components/Gate.jsx'
import Nav from './components/Nav.jsx'
import Sky from './components/Sky.jsx'
import EveningClock from './components/EveningClock.jsx'
import { ArchDefs } from './components/Ornaments.jsx'
import Hero from './sections/Hero.jsx'
import Countdown from './sections/Countdown.jsx'
import Couples from './sections/Couples.jsx'
import Evening from './sections/Evening.jsx'
import Events from './sections/Events.jsx'
import Venue from './sections/Venue.jsx'
import Rsvp from './sections/Rsvp.jsx'
import Invitation from './sections/Invitation.jsx'
import Footer from './sections/Footer.jsx'
import { EveningProvider } from './lib/evening.jsx'
import { guestName } from './lib/guest.js'

// A link that points at a section (…/#rsvp) skips the opening doors.
const skipGate = typeof window !== 'undefined' && window.location.hash.length > 1
const guest = typeof window !== 'undefined' ? guestName() : ''

export default function App() {
  // closed → opening (doors moving, hero starts) → gone (gate unmounted)
  const [gate, setGate] = useState(skipGate ? 'gone' : 'closed')
  const ready = gate !== 'closed'

  return (
    <MotionConfig reducedMotion="user">
      <EveningProvider>
        <ArchDefs />
        <Sky />
        {gate !== 'gone' && <Gate guest={guest} onOpen={() => setGate('opening')} onDone={() => setGate('gone')} />}
        <div className="relative min-h-screen text-ink">
          <Nav show={ready} />
          <EveningClock show={ready} />
          <main>
            <Hero ready={ready} />
            <Countdown />
            <Couples />
            <Evening />
            <Events />
            <Venue />
            <Rsvp guest={guest} />
            <Invitation />
          </main>
          <Footer />
        </div>
      </EveningProvider>
    </MotionConfig>
  )
}
