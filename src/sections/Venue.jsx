import { Navigation, Phone } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { Star } from '../components/Ornaments.jsx'
import { venuesFor, wedding } from '../data/wedding.js'
import { mapsEmbed, mapsUrl, telUrl } from '../lib/invite.js'
import { invited } from '../lib/guest.js'
import { dayList, fill } from '../i18n/strings.js'
import { useLang } from '../i18n/lang.jsx'

// One block per venue the guest is invited to, each with its own dates and map.
const VENUES = venuesFor(invited)

export default function Venue() {
  const { t } = useLang()
  const { contact } = wedding
  return (
    <section id="venue" data-time="19:30" className="relative space-y-24 py-24 text-paper sm:space-y-32 sm:py-32">
      {VENUES.map((venue, i) => (
        <div key={venue.id} className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal className="text-center lg:text-start">
            <p className="eyebrow !text-gold-light">{t.venue.eyebrow}</p>
            <h2 className="h-sec mt-4">{venue.name}</h2>
            <address className="mt-6 not-italic" dir="ltr">
              {venue.lines.map((l) => (
                <p key={l} className="lede !text-paper/75">{l}</p>
              ))}
            </address>

            <div className="mt-8 flex items-center justify-center gap-3 font-sans text-[15px] text-paper/80 lg:justify-start">
              <Star className="h-4 w-4 shrink-0 text-gold-light" />
              {fill(t.venue.times, { dates: dayList(t, venue.days) })}
            </div>
            {i === 0 && (
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-sans text-[15px] text-paper/80 lg:justify-start">
                <Star className="h-4 w-4 shrink-0 text-gold-light" />
                {t.venue.help}{' '}
                <a href={telUrl} dir="ltr" className="font-medium text-paper underline decoration-gold-light/50 underline-offset-4">{contact.display}</a>
              </div>
            )}

            <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a href={mapsUrl(venue)} target="_blank" rel="noreferrer" className="btn-gold">
                <Navigation className="h-4 w-4" strokeWidth={1.8} /> {t.venue.directions}
              </a>
              {i === 0 && (
                <a href={telUrl} className="btn-line-dark">
                  <Phone className="h-4 w-4" strokeWidth={1.8} /> {t.venue.call}
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative rounded-[36px] border border-gold-light/25 bg-white/[0.06] p-2.5 shadow-[0_40px_80px_-40px_rgb(0_0_0/.8)] backdrop-blur">
              <iframe
                title={`Map to ${venue.name}`}
                src={mapsEmbed(venue)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[340px] w-full rounded-[28px] border-0 bg-lapis-deep sm:h-[440px]"
              />
            </div>
          </Reveal>
        </div>
      ))}
    </section>
  )
}
