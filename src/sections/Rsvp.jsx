import { useRef, useState } from 'react'
import { Minus, Plus, Send } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { Rule } from '../components/Ornaments.jsx'
import { coupleLine, wedding } from '../data/wedding.js'
import { invited } from '../lib/guest.js'
import { dateLong, whatsappTo } from '../lib/invite.js'
import { fill } from '../i18n/strings.js'
import { useLang } from '../i18n/lang.jsx'

// No server: the reply opens WhatsApp with a ready-written message to the
// family's number, which is how most guests would answer anyway.
export default function Rsvp({ guest = '' }) {
  const { t } = useLang()
  const [name, setName] = useState(guest)
  const [going, setGoing] = useState(true)
  const [guests, setGuests] = useState(2)
  const [days, setDays] = useState(invited)
  const [dua, setDua] = useState('')
  const [error, setError] = useState('')
  const nameRef = useRef(null)

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError(t.rsvp.error)
      nameRef.current?.focus()
      nameRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      return
    }
    setError('')
    const lines = [
      'Assalamu Alaikum!',
      `RSVP for the Nikah & Walima of ${coupleLine} (${dateLong})`,
      '',
      `Name: ${name.trim()}`,
      going ? `Insha'Allah attending on ${days.join(', ')} November — ${guests} ${guests === 1 ? 'guest' : 'guests'}` : 'Sorry, unable to attend',
      dua.trim() ? `\nDua: ${dua.trim()}` : ''
    ]
    const url = whatsappTo(lines.join('\n').trim())
    // Popup blockers can swallow window.open on phones; fall back to a plain redirect.
    if (!window.open(url, '_blank')) window.location.assign(url)
  }

  const label = 'mb-2 block font-sans text-[12px] uppercase tracking-[0.2em] text-paper/60'

  return (
    <section id="rsvp" data-time="20:45" className="relative py-24 text-paper sm:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="text-center lg:text-start">
          <p className="eyebrow !text-gold-light">{t.rsvp.eyebrow}</p>
          <h2 className="h-sec mt-4">
            {t.rsvp.title[0]} <span className="italic text-gold-light">{t.rsvp.title[1]}</span>
          </h2>
          <p className="lede mx-auto mt-5 max-w-lg !text-paper/75 lg:mx-0">{t.rsvp.lede}</p>
          <div className="relative mx-auto mt-10 max-w-[420px] lg:mx-0">
            <div className="absolute inset-x-6 bottom-0 top-10 rounded-full bg-[radial-gradient(circle,rgb(255_248_225/.28),transparent_65%)] blur-2xl" aria-hidden="true" />
            <img src="/img/couple.webp" alt="Illustration of a bride and groom seated together" className="relative w-full animate-floaty" loading="lazy" />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={submit}
            className="relative rounded-[36px] border border-gold-light/20 bg-lapis-night/55 p-7 shadow-[0_40px_80px_-40px_rgb(0_0_0/.8)] backdrop-blur-md sm:p-10"
            noValidate
          >
            <Rule dark />
            <p className="mt-4 text-center font-display text-2xl">{t.nav.rsvp}</p>

            <label className="mt-8 block">
              <span className={label}>{t.rsvp.name}</span>
              <input ref={nameRef} className="field-dark" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.rsvp.namePh} autoComplete="name" aria-invalid={!!error} />
            </label>
            {error && <p className="mt-2 font-sans text-sm text-blush" role="alert">{error}</p>}

            <fieldset className="mt-6">
              <legend className={label}>{t.rsvp.attend}</legend>
              <div className="grid grid-cols-2 gap-3">
                {[
                  [true, t.rsvp.yes],
                  [false, t.rsvp.no]
                ].map(([v, text]) => (
                  <button
                    key={String(v)}
                    type="button"
                    onClick={() => setGoing(v)}
                    aria-pressed={going === v}
                    className={`rounded-2xl border px-4 py-3.5 font-sans text-[14px] transition ${
                      going === v ? 'border-gold-light bg-gold-light text-lapis-night' : 'border-paper/15 bg-white/[0.04] text-paper/80 hover:border-gold-light/60'
                    }`}
                  >
                    {text}
                  </button>
                ))}
              </div>
            </fieldset>

            {going && invited.length > 1 && (
              <fieldset className="mt-6">
                <legend className={label}>{t.rsvp.days}</legend>
                <div className="flex flex-wrap gap-3">
                  {invited.map((d) => {
                    const on = days.includes(d)
                    return (
                      <button
                        key={d}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setDays((s) => (on ? (s.length > 1 ? s.filter((x) => x !== d) : s) : [...s, d].sort((a, b) => a - b)))}
                        className={`rounded-2xl border px-4 py-3 font-sans text-[14px] transition ${on ? 'border-gold-light bg-gold-light text-lapis-night' : 'border-paper/15 bg-white/[0.04] text-paper/80 hover:border-gold-light/60'}`}
                      >
                        {d} {t.date.month}
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            )}

            {going && (
              <div className="mt-6">
                <span className={label}>{t.rsvp.guests}</span>
                <div className="flex items-center justify-between rounded-2xl border border-paper/15 bg-white/[0.04] p-2" dir="ltr">
                  <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="grid h-11 w-11 place-items-center rounded-xl transition hover:bg-white/10" aria-label="Fewer guests">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-display text-3xl font-semibold tabular-nums" aria-live="polite">{guests}</span>
                  <button type="button" onClick={() => setGuests((g) => Math.min(20, g + 1))} className="grid h-11 w-11 place-items-center rounded-xl transition hover:bg-white/10" aria-label="More guests">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            <label className="mt-6 block">
              <span className={label}>{t.rsvp.dua}</span>
              <textarea className="field-dark min-h-[96px] resize-y" value={dua} onChange={(e) => setDua(e.target.value)} placeholder={t.rsvp.duaPh} />
            </label>

            <button type="submit" className="btn-gold mt-8 w-full !py-4">
              <Send className="h-4 w-4" strokeWidth={1.8} /> {t.rsvp.send}
            </button>
            <p className="mt-3 text-center font-sans text-xs text-paper/55">{fill(t.rsvp.hint, { phone: wedding.contact.display })}</p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
