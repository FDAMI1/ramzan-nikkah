import { Fragment } from 'react'
import { motion } from 'framer-motion'
import Floral from '../components/Floral.jsx'
import Petals from '../components/Petals.jsx'
import { ArchOutline, Bismillah, Rule, Star } from '../components/Ornaments.jsx'
import { couplesFor, wedding } from '../data/wedding.js'
import { invited } from '../lib/guest.js'
import { hijriList } from '../i18n/strings.js'
import { useLang } from '../i18n/lang.jsx'

const COUPLES = couplesFor(invited)

const EASE = [0.22, 1, 0.36, 1]
const up = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  show: (i = 0) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.1, delay: 0.5 + i * 0.16, ease: EASE } })
}

const tag = 'border-y border-ink/30 px-2 py-1 font-display text-base font-semibold italic text-ink sm:text-lg'
const day = 'font-display text-[2.2rem] font-semibold leading-none text-lapis sm:text-[2.6rem]'

function Pair({ couple, i, t }) {
  const fns = [['nikah', couple.nikah], ['walima', couple.walima]].filter(([, d]) => invited.includes(d))
  return (
    <motion.div variants={up} custom={i}>
      <p className="font-display text-[clamp(2.5rem,7.4vw,4.4rem)] font-medium leading-[1.05] text-ink">
        {t.names[couple.first.key]}{' '}
        <span className="amp mx-1 text-[0.8em] sm:mx-2">{t.amp}</span>{' '}
        {t.names[couple.second.key]}
      </p>
      <p className="mt-3 flex items-center justify-center gap-2 sm:gap-3">
        {fns.map(([k, d], j) => (
          <Fragment key={k}>
            {j > 0 && <Star className="mx-1 h-3 w-3 text-gold" />}
            <span className={tag}>{t.hero[k]}</span>
            <span className={day}>{d}</span>
          </Fragment>
        ))}
      </p>
    </motion.div>
  )
}

// The printed card, brought to life: same wash, same florals, same order of
// words, framed in a mihrab arch. Its lower edge melts into the evening sky.
export default function Hero({ ready }) {
  const { t } = useLang()
  const { date } = wedding

  return (
    <section id="top" data-time="16:00" className="relative min-h-[100svh] overflow-hidden">
      <div className="hero-fade absolute inset-0" aria-hidden="true">
        <img src="/img/watercolor.jpg" alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/20 to-transparent" />
      </div>
      <Petals />

      <Floral corner="tl" className="-left-10 -top-6 w-[min(62vw,470px)] sm:-left-6" />
      <Floral corner="br" className="-bottom-8 -right-10 w-[min(56vw,430px)] sm:-right-6" drift={40} />

      <motion.div
        initial="hidden"
        animate={ready ? 'show' : 'hidden'}
        className="container-x relative flex flex-col items-center pb-24 pt-28 text-center sm:pt-32"
      >
        <div className="relative w-full max-w-[640px] px-5 pb-14 pt-24 sm:px-14 sm:pt-28">
          <motion.div
            variants={{ hidden: { opacity: 0, scaleY: 0.92 }, show: { opacity: 1, scaleY: 1, transition: { duration: 1.6, delay: 0.3, ease: EASE } } }}
            className="absolute inset-0 origin-bottom"
            aria-hidden="true"
          >
            <div className="arch-clip absolute inset-0 bg-gradient-to-b from-white/55 via-white/40 to-white/25 backdrop-blur-[3px]" />
            <ArchOutline className="text-gold/70" />
          </motion.div>

          <div className="relative">
            <motion.div variants={up} custom={0}>
              <Bismillah className="mx-auto w-[min(56vw,300px)] drop-shadow-[0_6px_14px_rgb(27_50_121/.18)]" />
            </motion.div>
            <motion.p variants={up} custom={1} className="mt-4 font-display text-[1.05rem] italic leading-snug text-ink-soft sm:text-lg">
              {t.hero.bismillah[0]}
              <br />
              {t.hero.bismillah[1]}
            </motion.p>

            <motion.div variants={up} custom={2}><Rule className="my-7" /></motion.div>

            <motion.p variants={up} custom={2} className="font-display text-[1.35rem] font-semibold text-ink sm:text-2xl">{t.host}</motion.p>
            <motion.p variants={up} custom={3} className="mx-auto mt-2 max-w-[440px] font-display text-[1.08rem] leading-relaxed text-ink-soft sm:text-[1.2rem]">
              {t.hero.invite}
            </motion.p>

            <div className="mt-9 space-y-3">
              {COUPLES.map((c, i) => (
                <Fragment key={c.id}>
                  {i > 0 && <motion.div variants={up} custom={4.5} className="flex justify-center"><Star className="h-5 w-5 text-gold" /></motion.div>}
                  <Pair couple={c} i={4 + i} t={t} />
                </Fragment>
              ))}
            </div>

            <motion.div variants={up} custom={6.5} className="mt-10">
              <p className="font-display text-[1.6rem] font-semibold uppercase tracking-[0.34em] text-lapis sm:text-[1.9rem]">{t.date.month}</p>
              <p className="mt-1 font-script text-[2.6rem] leading-none text-gold sm:text-5xl">{date.year}</p>
            </motion.div>

            <motion.p variants={up} custom={7.5} className="mt-6 font-sans text-[12px] uppercase tracking-[0.26em] text-ink">
              {t.hero.afterMaghrib}<span className="block sm:inline"><span className="hidden sm:inline"> · </span>{t.date.time}</span>
            </motion.p>
            <motion.p variants={up} custom={8} className="mt-2 font-display text-[1.05rem] italic text-ink-mute">{hijriList(t, invited)}</motion.p>
          </div>
        </div>

        <motion.a
          href="#countdown"
          variants={up}
          custom={9}
          className="mt-6 flex flex-col items-center gap-3 font-sans text-[10px] uppercase tracking-[0.36em] text-ink-soft"
        >
          {t.hero.scroll}
          <span className="relative h-10 w-px overflow-hidden bg-ink/15">
            <span className="absolute inset-x-0 top-0 h-1/3 animate-cue bg-gold" />
          </span>
        </motion.a>
      </motion.div>
    </section>
  )
}
