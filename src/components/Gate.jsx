import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Bismillah, Star, ArchOutline } from './Ornaments.jsx'
import LangSwitch from './LangSwitch.jsx'
import { couplesFor, scheduleFor } from '../data/wedding.js'
import { invited } from '../lib/guest.js'
import { dayList } from '../i18n/strings.js'
import { useLang } from '../i18n/lang.jsx'

const KINDS = [...new Set(scheduleFor(invited).map((e) => e.kind))]
const COUPLES = couplesFor(invited)

const EASE = [0.76, 0, 0.24, 1]

// The opening screen: two lapis doors with a gold arch drawn across the seam
// and a seal in the middle. A personal link greets the guest by name.
export default function Gate({ guest, onOpen, onDone }) {
  const [opening, setOpening] = useState(false)
  const { t } = useLang()

  useEffect(() => {
    const html = document.documentElement
    html.style.overflow = 'hidden'
    return () => { html.style.overflow = '' }
  }, [])

  const open = () => {
    if (opening) return
    setOpening(true)
    onOpen()
  }

  const door = (side) => (
    <motion.div
      initial={false}
      animate={{ x: opening ? (side === 'l' ? '-100%' : '100%') : 0 }}
      transition={{ duration: 1.6, ease: EASE, delay: 0.45 }}
      onAnimationComplete={() => opening && side === 'r' && onDone()}
      className={`girih absolute inset-y-0 w-1/2 overflow-hidden bg-lapis-deep ${side === 'l' ? 'left-0' : 'right-0'}`}
    >
      {/* Same full-width layer in both doors, so the arch splits down the seam. */}
      <div className={`absolute inset-y-0 w-screen ${side === 'l' ? 'left-0' : 'right-0'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(27_50_121/.85),transparent_70%)]" />
        <div className="absolute left-1/2 top-1/2 h-[min(88vh,760px)] w-[min(86vw,500px)] -translate-x-1/2 -translate-y-1/2 text-gold-light/50">
          <ArchOutline />
        </div>
      </div>
      <div className={`absolute inset-y-0 w-px bg-gold-light/40 ${side === 'l' ? 'right-0' : 'left-0'}`} />
    </motion.div>
  )

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Wedding invitation">
      {door('l')}
      {door('r')}

      <motion.div
        animate={{ opacity: opening ? 0 : 1, scale: opening ? 1.04 : 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative flex h-full flex-col items-center justify-center px-8 text-center text-paper"
        style={{ pointerEvents: opening ? 'none' : 'auto' }}
      >
        <div className="absolute top-[max(1rem,env(safe-area-inset-top))]">
          <LangSwitch dark />
        </div>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2 }}>
          <Bismillah tone="linear-gradient(100deg,#B08A4F,#EEDFC0 45%,#C9A867)" className="mx-auto w-[min(58vw,240px)]" />
        </motion.div>

        {guest && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.55 }} className="mt-7">
            <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-gold-light/80">{t.gate.greet}</p>
            <p className="mt-2 font-display text-[clamp(1.5rem,5.5vw,2.2rem)] italic text-paper">{guest}</p>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}
          className={`${guest ? 'mt-5' : 'mt-8'} font-sans text-[10px] uppercase tracking-[0.42em] text-gold-light/90 sm:text-[11px]`}
        >
          {t.gate.kicker}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.9 }}
          className="mt-3 font-display text-[clamp(2.6rem,9vw,4.4rem)] font-medium leading-none"
        >
          {KINDS.map((k, i) => (
            <span key={k}>{i > 0 && <span className="amp !text-gold-light"> {t.amp} </span>}{t.hero[k]}</span>
          ))}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}
          className="mt-5 space-y-1 font-display text-[1.15rem] italic text-paper/85 sm:text-xl"
        >
          {COUPLES.map((c) => (
            <p key={c.id}>{t.names[c.first.key]} {t.amp} {t.names[c.second.key]}</p>
          ))}
        </motion.div>

        <motion.button
          type="button"
          onClick={open}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="group relative mt-10 grid h-[104px] w-[104px] place-items-center rounded-full animate-breathe focus:outline-none focus-visible:ring-4 focus-visible:ring-gold-light/50"
          style={{ background: 'radial-gradient(circle at 35% 30%, #F2E3BF, #C9A867 45%, #8E6C38 100%)' }}
          aria-label="Open the invitation"
        >
          <span className="absolute inset-[6px] rounded-full border border-lapis-night/25" />
          <Star className="h-11 w-11 text-lapis-night/75 transition duration-700 group-hover:rotate-45" />
          <span className="absolute -bottom-8 whitespace-nowrap font-sans text-[10px] uppercase tracking-[0.36em] text-gold-light/80">
            {t.gate.tap}
          </span>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.9 }}
          className="absolute bottom-[max(2rem,env(safe-area-inset-bottom))] font-sans text-[11px] uppercase tracking-[0.3em] text-paper/55"
        >
          {dayList(t, invited)}
        </motion.p>
      </motion.div>
    </div>
  )
}
