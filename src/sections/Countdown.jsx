import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import { Rule } from '../components/Ornaments.jsx'
import useCountdown from '../lib/useCountdown.js'
import { wedding } from '../data/wedding.js'
import { invited } from '../lib/guest.js'
import { dayList } from '../i18n/strings.js'
import { useLang } from '../i18n/lang.jsx'

// From the first invited function to the end of the last one.
const { iso, time } = wedding
const START = iso(invited[0], time.start)
const END = iso(invited[invited.length - 1], time.end)

function Tile({ value, label }) {
  const text = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center">
      <div className="arch-clip girih relative flex h-[96px] w-[70px] items-end justify-center overflow-hidden bg-lapis-deep pb-4 shadow-xl sm:h-[150px] sm:w-[118px] sm:pb-6">
        <div className="absolute inset-0 bg-gradient-to-t from-lapis/70 to-transparent" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: '-60%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '60%', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="gold-text relative font-display text-[2.1rem] font-semibold tabular-nums leading-none sm:text-[3.4rem]"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-3 font-sans text-[10px] uppercase tracking-[0.3em] text-ink-soft sm:text-[11px]">{label}</span>
    </div>
  )
}

export default function Countdown() {
  const { t } = useLang()
  const c = useCountdown(START)
  const over = Date.now() > new Date(END).getTime()

  return (
    <section id="countdown" data-time="16:40" className="relative py-24 sm:py-32">
      <div className="container-x text-center">
        <Reveal>
          <p className="eyebrow">{t.countdown.eyebrow}</p>
          <h2 className="h-sec mt-4 text-ink">{over ? t.countdown.over : c.done ? t.countdown.today : t.countdown.title}</h2>
          <Rule className="mt-6" />
        </Reveal>

        {over ? (
          <Reveal delay={0.1}>
            <p className="lede mx-auto mt-8 max-w-xl">{t.countdown.overText}</p>
          </Reveal>
        ) : (
          <Reveal delay={0.15} className="mt-12 flex items-start justify-center gap-3 sm:gap-6" dir="ltr">
            {[c.days, c.hours, c.minutes, c.seconds].map((v, i) => (
              <Tile key={i} value={v} label={t.countdown.units[i]} />
            ))}
          </Reveal>
        )}

        <Reveal delay={0.25}>
          <p className="mt-10 font-display text-xl italic text-ink-soft sm:text-2xl">{dayList(t, invited)} · {t.date.city}</p>
        </Reveal>
      </div>
    </section>
  )
}
