import { useState } from 'react'
import { motion, useMotionValueEvent, useTransform } from 'framer-motion'
import { MoonStar, Sun } from 'lucide-react'
import { useEvening, useIsNight } from '../lib/evening.jsx'
import { fmtTime, SUNSET } from '../lib/sky.js'
import { useLang } from '../i18n/lang.jsx'

const FROM = 16 * 60
const TO = 22 * 60 + 30
const set = Math.round(SUNSET)

function phase(m, c) {
  if (m < set - 8) return c.afternoon
  if (m < set + 12) return c.maghrib
  if (m < 19 * 60) return c.nikah
  if (m < 22 * 60 + 30) return c.walima
  return c.night
}

// The evening as a timeline: a rail on the right on desktop, a small pill on
// phones. Shows the clock time the page has scrolled to.
export default function EveningClock({ show }) {
  const m = useEvening()
  const { t, rtl } = useLang()
  const night = useIsNight()
  const [now, setNow] = useState(FROM)
  useMotionValueEvent(m, 'change', (v) => setNow(v))
  const pos = useTransform(m, [FROM, TO], ['0%', '100%'])

  const ticks = [
    [FROM, '4 PM'],
    [set, t.clock.maghrib],
    [19 * 60, t.clock.walima],
    [TO, '10:30 PM']
  ]
  const ink = night ? 'text-paper/85' : 'text-ink/70'
  const line = night ? 'bg-paper/25' : 'bg-ink/20'
  const Icon = now < set + 5 ? Sun : MoonStar
  const visible = show && now > FROM + 20

  return (
    <>
      {/* Desktop rail */}
      <motion.aside
        initial={false}
        animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 20 }}
        transition={{ duration: 0.6 }}
        className={`pointer-events-none fixed top-1/2 z-40 hidden h-[52vh] -translate-y-1/2 lg:block ${rtl ? 'left-6' : 'right-6'}`}
        aria-hidden="true"
      >
        <div className={`relative h-full w-px ${line}`}>
          {ticks.map(([tm, label], i) => (
            <div key={label} className="absolute left-0 flex -translate-y-1/2 items-center" style={{ top: `${((tm - FROM) / (TO - FROM)) * 100}%` }}>
              <span className={`h-px w-2.5 -translate-x-1/2 ${line}`} />
              {/* The end labels sit above / below the rail so the clock knob
                  resting at either end never covers them. */}
              <span className={`absolute whitespace-nowrap font-sans text-[10px] uppercase tracking-[0.2em] ${ink} ${rtl ? 'left-4' : 'right-4'} ${i === 0 ? '-translate-y-7' : i === ticks.length - 1 ? 'translate-y-7' : ''}`}>{label}</span>
            </div>
          ))}
          <motion.div style={{ top: pos }} className="absolute left-0 -translate-x-1/2 -translate-y-1/2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-lapis-night shadow-[0_0_24px_rgb(217_191_140/.7)]">
              <Icon className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <span className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1 font-display text-lg font-semibold tabular-nums backdrop-blur ${rtl ? 'left-11' : 'right-11'} ${night ? 'bg-lapis-night/60 text-gold-light' : 'bg-white/60 text-ink'}`}>
              {fmtTime(now)}
            </span>
          </motion.div>
        </div>
      </motion.aside>

      {/* Phone pill */}
      <motion.div
        initial={false}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
        transition={{ duration: 0.5 }}
        className={`pointer-events-none fixed bottom-[max(0.9rem,env(safe-area-inset-bottom))] z-40 lg:hidden ${rtl ? 'right-3' : 'left-3'}`}
        aria-hidden="true"
      >
        <div className={`flex items-center gap-2 rounded-full border px-3 py-1.5 shadow-lg backdrop-blur-md ${night ? 'border-gold-light/25 bg-lapis-night/70 text-paper' : 'border-ink/10 bg-white/75 text-ink'}`}>
          <Icon className="h-3.5 w-3.5 text-gold" strokeWidth={2} />
          <span className="font-display text-[15px] font-semibold tabular-nums" dir="ltr">{fmtTime(now)}</span>
          <span className="font-sans text-[10px] uppercase tracking-[0.18em] opacity-70">{phase(now, t.clock)}</span>
        </div>
      </motion.div>
    </>
  )
}
