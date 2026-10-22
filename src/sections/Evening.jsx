import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Skyline from '../components/Skyline.jsx'
import Moon from '../components/Moon.jsx'
import { Rule } from '../components/Ornaments.jsx'
import { wedding } from '../data/wedding.js'
import { MAGHRIB, MOON, SUNSET } from '../lib/sky.js'
import { fill } from '../i18n/strings.js'
import { useLang } from '../i18n/lang.jsx'

const hm = (m) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`

// The turn of the evening. The section is three screens tall and its content
// is pinned: the sun goes down behind the masjid as you scroll (the sky
// itself is drawn by <Sky/>), then the verse rises in the dusk.
export default function Evening() {
  const ref = useRef(null)
  const { t } = useLang()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const introOpacity = useTransform(p, [0, 0.08, 0.42, 0.52], [0, 1, 1, 0])
  const introY = useTransform(p, [0, 0.52], ['4vh', '-6vh'])
  const verseOpacity = useTransform(p, [0.5, 0.62, 0.95, 1], [0, 1, 1, 1])
  const verseY = useTransform(p, [0.5, 0.7], ['6vh', '0vh'])
  const lightUp = useTransform(p, [0.3, 0.6], [0, 1])
  const skylineY = useTransform(p, [0, 0.3], ['18%', '0%'])

  return (
    <section id="evening" ref={ref} className="relative h-[300svh]">
      {/* Clock anchors along the scroll: golden hour → Maghrib → dusk */}
      <span data-time="17:35" className="absolute top-0" />
      <span data-time={hm(Math.round(SUNSET))} className="absolute top-[42%]" />
      <span data-time="18:25" className="absolute top-[92%]" />

      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: introOpacity, y: introY }} className="container-x relative z-10 max-w-3xl pb-[18vh] text-center text-paper">
          <div className="absolute inset-x-0 -inset-y-10 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(17_29_71/.38),transparent_68%)]" aria-hidden="true" />
          <p className="font-sans text-[11px] uppercase tracking-[0.36em] text-gold-pale [text-shadow:0_1px_12px_rgb(0_0_0/.25)]">
            {fill(t.evening.eyebrow, { time: MAGHRIB })}
          </p>
          <h2 className="h-sec mt-5 [text-shadow:0_2px_30px_rgb(17_29_71/.45)]">{t.evening.title}</h2>
          <p className="mx-auto mt-6 max-w-xl font-display text-[1.25rem] italic leading-relaxed text-paper/90 sm:text-[1.45rem] [text-shadow:0_1px_18px_rgb(17_29_71/.5)]">
            {t.evening.text}
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-paper/25 bg-lapis-night/25 px-4 py-2 backdrop-blur">
            <Moon className="h-6 w-6" />
            <span className="font-sans text-[12px] tracking-wide text-paper/90">{fill(t.evening.moon, { pct: Math.round(MOON.lit * 100) })}</span>
          </div>
        </motion.div>

        <motion.div style={{ opacity: verseOpacity, y: verseY }} className="container-x absolute z-10 max-w-4xl pb-[16vh] text-center">
          <Rule dark />
          <p lang="ar" dir="rtl" className="gold-text mt-8 font-arabic text-[clamp(1.75rem,4.4vw,3rem)] leading-[1.9]">{wedding.verse}</p>
          <p className="mx-auto mt-6 max-w-2xl font-display text-[1.25rem] italic leading-relaxed text-paper/85 sm:text-[1.5rem]">&ldquo;{t.evening.verse}&rdquo;</p>
          <p className="mt-5 font-sans text-[11px] uppercase tracking-[0.34em] text-gold-light/80">{t.evening.ref}</p>
        </motion.div>

        <motion.div style={{ y: skylineY }} className="absolute inset-x-0 bottom-0">
          <Skyline className="block h-[26vh] min-h-[150px] w-full" />
          {/* Windows begin to glow once the sun is down */}
          <motion.div style={{ opacity: lightUp }} className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_50%_100%,rgb(240_200_138/.28),transparent_60%)]" />
        </motion.div>
      </div>
    </section>
  )
}
