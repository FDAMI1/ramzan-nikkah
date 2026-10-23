import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Share2 } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { shareInvite } from '../lib/invite.js'
import { invited } from '../lib/guest.js'
import { useLang } from '../i18n/lang.jsx'

export default function Invitation() {
  const { t } = useLang()
  const [note, setNote] = useState('')

  const share = async () => {
    const r = await shareInvite()
    setNote(r === 'copied' ? t.invitation.copied : r === 'failed' ? t.invitation.failed : '')
  }

  return (
    <section id="invitation" data-time="22:00" className="relative py-24 text-paper sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="order-2 text-center lg:order-1 lg:text-start">
          <p className="eyebrow !text-gold-light">{t.invitation.eyebrow}</p>
          <h2 className="h-sec mt-4">
            {t.invitation.title[0]} <span className="italic text-gold-light">{t.invitation.title[1]}</span>
          </h2>
          <p className="lede mx-auto mt-5 max-w-lg !text-paper/75 lg:mx-0">{t.invitation.lede}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href="/invitation.pdf" download="Nikah-Walima-Invitation-22-Nov-2026.pdf" className="btn-gold">
              <Download className="h-4 w-4" strokeWidth={1.8} /> {t.invitation.download}
            </a>
            <button type="button" onClick={share} className="btn-line-dark">
              <Share2 className="h-4 w-4" strokeWidth={1.8} /> {t.invitation.share}
            </button>
          </div>
          <p className="mt-4 min-h-[1.5em] font-sans text-sm text-paper/60" aria-live="polite">{note}</p>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <motion.div
            whileHover={{ rotate: 0, scale: 1.02 }}
            initial={{ rotate: 3 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
            className="relative mx-auto w-[min(82vw,400px)]"
          >
            <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgb(255_248_225/.18),transparent_65%)]" aria-hidden="true" />
            <div className="absolute -inset-3 rotate-[-2.5deg] rounded-[20px] border border-gold-light/30" aria-hidden="true" />
            <img
              src={`/img/card-${invited.join('-')}.jpg`}
              alt="The printed Nikah and Walima invitation card"
              loading="lazy"
              className="relative w-full rounded-[14px] shadow-[0_50px_80px_-30px_rgb(0_0_0/.8)]"
            />
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
