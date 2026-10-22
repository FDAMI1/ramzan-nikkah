import { CalendarDays, CalendarPlus, Clock, MapPin, Moon, UtensilsCrossed } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { Rule } from '../components/Ornaments.jsx'
import { scheduleFor, venueFor, wedding } from '../data/wedding.js'
import { invited } from '../lib/guest.js'
import { downloadIcs, googleCalendarUrl } from '../lib/invite.js'
import { hijriList, longDate } from '../i18n/strings.js'
import { useLang } from '../i18n/lang.jsx'

const ICONS = { nikah: Moon, walima: UtensilsCrossed }
const SCHEDULE = scheduleFor(invited)

function EventCard({ ev, i, t }) {
  const e = t.events[ev.kind]
  const Icon = ICONS[ev.kind]
  const { first, second } = ev.couple
  return (
    <Reveal delay={i * 0.12} className="h-full">
      <article className="group relative h-full overflow-hidden rounded-[32px] border border-gold-light/20 bg-white/[0.06] p-8 shadow-[0_30px_80px_-40px_rgb(0_0_0/.8)] backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:border-gold-light/45 sm:p-10">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky/20 blur-3xl transition duration-700 group-hover:bg-blush/25" aria-hidden="true" />
        <div className="relative">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold-light/40 bg-lapis-night text-gold-light">
              <Icon className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <div>
              <h3 className="h-card text-paper">{e.title}</h3>
              <p className="eyebrow !text-[10px] !text-gold-light/80">{t.names[first.key]} {t.amp} {t.names[second.key]}</p>
            </div>
          </div>

          <dl className="mt-8 space-y-4 font-sans text-[15px] text-paper/80">
            <div className="flex items-start gap-3">
              <dt className="sr-only">Date</dt>
              <CalendarDays className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold-light" strokeWidth={1.6} />
              <dd>{longDate(t, wedding.days, ev.day)}</dd>
            </div>
            <div className="flex items-start gap-3">
              <dt className="sr-only">Time</dt>
              <Clock className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold-light" strokeWidth={1.6} />
              <dd className="font-medium text-paper">{t.date.time}</dd>
            </div>
            <div className="flex items-start gap-3">
              <dt className="sr-only">Place</dt>
              <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold-light" strokeWidth={1.6} />
              <dd>{venueFor(ev.day).name}, {venueFor(ev.day).area}</dd>
            </div>
          </dl>
          <p className="mt-6 border-t border-paper/10 pt-6 font-display text-[1.15rem] italic leading-relaxed text-paper/65">{e.note}</p>
        </div>
      </article>
    </Reveal>
  )
}

export default function Events() {
  const { t } = useLang()
  return (
    <section id="events" data-time="18:40" className="relative py-24 text-paper sm:py-32">
      {/* Ground fog under the masjid silhouette, fading into the night. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38vh] bg-gradient-to-b from-[#0B1233] via-[#0B1233]/60 to-transparent" aria-hidden="true" />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow !text-gold-light">{t.events.eyebrow}</p>
          <h2 className="h-sec mt-4">{t.events.title}</h2>
          <p className="lede mt-5 !text-paper/75">{hijriList(t, invited)}</p>
          <Rule dark className="mt-6" />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8">
          {SCHEDULE.map((ev, i) => (
            <EventCard key={`${ev.couple.id}-${ev.kind}`} ev={ev} i={i} t={t} />
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-paper/60">{t.events.calendar}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {invited.map((day) => (
              <a key={day} href={googleCalendarUrl(day)} target="_blank" rel="noreferrer" className="btn-gold" dir="ltr">
                <CalendarPlus className="h-4 w-4" strokeWidth={1.8} /> Google · {day} Nov
              </a>
            ))}
            <button type="button" onClick={downloadIcs} className="btn-line-dark">
              <CalendarPlus className="h-4 w-4" strokeWidth={1.8} /> Apple / Outlook
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
