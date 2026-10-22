import { MessageCircle, Phone } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { Bismillah, Rule } from '../components/Ornaments.jsx'
import { wedding } from '../data/wedding.js'
import { areas, telUrl, whatsappTo } from '../lib/invite.js'
import { invited } from '../lib/guest.js'
import { fill } from '../i18n/strings.js'
import { useLang } from '../i18n/lang.jsx'

export default function Footer() {
  const { t } = useLang()
  const { contact } = wedding
  return (
    <footer data-time="22:30" className="relative overflow-hidden pb-[max(5rem,env(safe-area-inset-bottom))] pt-24 text-center text-paper">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/40 to-transparent" aria-hidden="true" />
      <div className="container-x relative max-w-3xl">
        <Reveal>
          <p className="eyebrow !text-gold-light/80">{t.footer.eyebrow}</p>
          <p lang="ar" dir="rtl" className="gold-text mt-8 font-arabic text-[clamp(1.7rem,4.4vw,2.8rem)] leading-[1.8]">{wedding.dua}</p>
          <p className="mx-auto mt-5 max-w-xl font-display text-[1.25rem] italic leading-relaxed text-paper/80">{t.footer.dua}</p>
          <Rule dark className="my-12" />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-gold-light/80">{t.footer.blessings}</p>
          <div className="mt-4 font-display text-[clamp(2rem,5vw,3rem)] leading-tight">
            {wedding.couples.map((c) => (
              <p key={c.id}>
                {t.names[c.first.key]}{' '}<span className="amp mx-1 !text-gold-light">{t.amp}</span>{' '}{t.names[c.second.key]}
              </p>
            ))}
          </div>
          <p className="mt-4 font-display text-lg italic text-paper/70">{fill(t.footer.hosted, { host: t.host })}</p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={telUrl} className="btn-line-dark" dir="ltr">
              <Phone className="h-4 w-4" strokeWidth={1.8} /> {contact.display}
            </a>
            <a href={whatsappTo('Assalamu Alaikum! ')} target="_blank" rel="noreferrer" className="btn-line-dark">
              <MessageCircle className="h-4 w-4" strokeWidth={1.8} /> WhatsApp
            </a>
          </div>

          <Bismillah tone="#D9BF8C" className="mx-auto mt-16 w-28 opacity-50" />
          <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.3em] text-paper/40" dir="ltr">{invited.join(' · ')} · 11 · 2026 · {areas}, Mumbai</p>
        </Reveal>
      </div>
    </footer>
  )
}
