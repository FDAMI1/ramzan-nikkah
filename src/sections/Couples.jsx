import Reveal from '../components/Reveal.jsx'
import Floral from '../components/Floral.jsx'
import { ArchOutline, Rule, Star } from '../components/Ornaments.jsx'
import { couplesFor } from '../data/wedding.js'
import { invited } from '../lib/guest.js'
import { useLang } from '../i18n/lang.jsx'

const COUPLES = couplesFor(invited)
const ONE = COUPLES.length === 1

function Person({ p, t }) {
  return (
    <div>
      <p className="eyebrow !text-[10px]">{t.role[p.role]}</p>
      <p className="h-card mt-2 text-ink">{t.full[p.key]}</p>
      <p className="mt-1 font-display text-[1.08rem] italic text-ink-mute">( {t.parent[p.key]} )</p>
    </div>
  )
}

function CoupleCard({ couple, i, t, single }) {
  const { first, second } = couple
  return (
    <Reveal delay={i * 0.15} className="relative">
      <div className={`relative mx-auto px-8 pb-12 pt-20 text-center sm:px-12 sm:pt-24 ${single ? 'max-w-[520px] sm:pb-16' : 'max-w-[460px]'}`}>
        <div className="arch-clip absolute inset-0 bg-gradient-to-b from-mist via-paper to-paper-warm shadow-2xl" aria-hidden="true">
          <img src="/img/watercolor.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-multiply" />
        </div>
        <ArchOutline className="text-gold/70" />
        {single ? (
          <>
            {/* A lone card gets a mirrored pair: sprays at both top corners and
                both feet, so it reads as the centrepiece, not half a pair. */}
            <Floral corner="tl" sway={false} drift={20} className="-left-8 -top-10 w-[40%]" />
            <Floral corner="tr" sway={false} drift={20} className="-right-8 -top-10 w-[40%]" />
            <Floral corner="bl" sway={false} drift={20} className="-bottom-8 -left-6 w-[30%]" />
            <Floral corner="br" sway={false} drift={20} className="-bottom-8 -right-6 w-[30%]" />
          </>
        ) : (
          <Floral corner={i ? 'tr' : 'tl'} sway={false} drift={20} className={`-top-10 w-[46%] ${i ? '-right-8' : '-left-8'}`} />
        )}

        <div className="relative">
          {/* ZWNJ keeps an Urdu initial in its isolated form instead of
              joining to the next letter across the span boundary. */}
          <p className="font-display text-[4.4rem] font-medium italic leading-none sm:text-[5.2rem]" aria-hidden="true">
            <span className="gold-text px-1">{t.names[first.key][0]}{'‌'}</span>{' '}
            <span className="mx-2 text-[0.5em] text-ink-mute">{'‌'}{t.amp}{'‌'}</span>{' '}
            <span className="gold-text px-1">{t.names[second.key][0]}{'‌'}</span>
          </p>
          <Rule className="my-7" />
          <Person p={first} t={t} />
          <p className="amp my-3 text-4xl">{t.amp}</p>
          <Person p={second} t={t} />
        </div>
      </div>
    </Reveal>
  )
}

export default function Couples() {
  const { t } = useLang()
  return (
    <section id="couples" data-time="17:05" className="relative pb-24 pt-8 sm:pb-32">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t.couples.eyebrow}</p>
          <h2 className="h-sec mt-4 text-ink">
            {(ONE ? t.couples.titleOne : t.couples.title)[0]} <span className="italic text-lapis">{(ONE ? t.couples.titleOne : t.couples.title)[1]}</span>
          </h2>
          <p className="lede mt-5">{ONE ? t.couples.ledeOne : t.couples.lede}</p>
        </Reveal>

        <div className={`relative mt-16 grid gap-14 md:gap-8 lg:gap-14 ${ONE ? '' : 'md:grid-cols-2'}`}>
          {COUPLES.map((c, i) => (
            <CoupleCard key={c.id} couple={c} i={i} t={t} single={ONE} />
          ))}
          {!ONE && (
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block" aria-hidden="true">
              <Star className="h-8 w-8 text-gold" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
