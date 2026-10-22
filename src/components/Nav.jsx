import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from './Ornaments.jsx'
import LangSwitch from './LangSwitch.jsx'
import { useLang } from '../i18n/lang.jsx'
import { useIsNight } from '../lib/evening.jsx'

const LINKS = ['couples', 'evening', 'events', 'venue', 'invitation']

export default function Nav({ show }) {
  const [solid, setSolid] = useState(false)
  const { t } = useLang()
  const night = useIsNight()

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const bar = !solid
    ? 'border-transparent'
    : night
      ? 'border-gold-light/15 bg-lapis-night/70 shadow-[0_10px_40px_-20px_rgb(0_0_0/.6)] backdrop-blur-md'
      : 'border-ink/10 bg-paper/80 shadow-[0_10px_40px_-20px_rgb(17_29_71/.45)] backdrop-blur-md'
  const ink = night && solid ? 'text-paper' : 'text-ink'

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={show ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-[env(safe-area-inset-top)] sm:px-6"
    >
      <div className={`mx-auto mt-3 flex max-w-[1180px] items-center justify-between gap-3 rounded-full border px-3 py-2 transition-all duration-500 sm:px-4 ${bar}`}>
        <a href="#top" className={`flex items-center gap-2.5 transition-colors ${ink}`} aria-label="Back to top">
          <Star className="h-6 w-6 text-gold" />
          <span className="hidden font-display text-lg font-medium tracking-wide sm:inline" dir="ltr">
            22 <span className="text-gold">·</span> 11 <span className="text-gold">·</span> 26
          </span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Sections">
          {LINKS.map((k) => (
            <a key={k} href={`#${k}`} className={`font-sans text-[12px] uppercase tracking-[0.2em] transition hover:text-gold ${night && solid ? 'text-paper/80' : 'text-ink-soft'}`}>
              {t.nav[k]}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch dark={night && solid} />
          <a href="#rsvp" className="btn-gold !px-4 !py-2.5 !text-[11px]">{t.nav.rsvp}</a>
        </div>
      </div>
    </motion.header>
  )
}
