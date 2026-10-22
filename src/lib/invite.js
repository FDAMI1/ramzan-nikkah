import { wedding, scheduleFor, coupleLine, host, DAYS, venueFor, venuesFor } from '../data/wedding.js'
import { invited } from './guest.js'
import { STRINGS, dayList } from '../i18n/strings.js'

const schedule = scheduleFor(invited)
export const dateLong = dayList(STRINGS.en, invited)

const { contact, time, iso } = wedding
const stamp = (d) => new Date(d).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
const cap = (s) => s[0].toUpperCase() + s.slice(1)

// One calendar entry per date; the 22nd carries both functions.
const NAMES = { suhana: 'Suhana', faizan: 'Faizan', ramzan: 'Ramzan', taiyaba: 'Taiyaba' }
const dayTitle = (day) =>
  schedule
    .filter((e) => e.day === day)
    .map((e) => `${cap(e.kind)} · ${NAMES[e.couple.first.key]} & ${NAMES[e.couple.second.key]}`)
    .join(' · ')
const details = `7:00 PM – 10:30 PM.\nHosted by ${host}.\nContact: ${contact.display}`
const where = (day) => {
  const v = venueFor(day)
  return `${v.name}, ${v.lines.join(', ')}`
}
export const areas = venuesFor(invited).map((v) => v.area).join(' & ')

export const googleCalendarUrl = (day) =>
  'https://calendar.google.com/calendar/render?' +
  new URLSearchParams({
    action: 'TEMPLATE',
    text: dayTitle(day),
    dates: `${stamp(iso(day, time.start))}/${stamp(iso(day, time.end))}`,
    details,
    location: where(day),
    ctz: 'Asia/Kolkata'
  })

// Apple Calendar / Outlook: hand over one .ics file holding every date.
export function downloadIcs() {
  const esc = (s) => s.replace(/[,;\\]/g, (m) => '\\' + m).replace(/\n/g, '\\n')
  const now = stamp(new Date().toISOString())
  const events = invited.flatMap((day) => [
    'BEGIN:VEVENT',
    `UID:nikah-walima-202611${day}@shaikh-family`,
    `DTSTAMP:${now}`,
    `DTSTART:${stamp(iso(day, time.start))}`,
    `DTEND:${stamp(iso(day, time.end))}`,
    `SUMMARY:${esc(dayTitle(day))}`,
    `DESCRIPTION:${esc(details)}`,
    `LOCATION:${esc(where(day))}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Nikah & Walima tomorrow',
    'END:VALARM',
    'END:VEVENT'
  ])
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Shaikh Family//Nikah & Walima//EN', ...events, 'END:VCALENDAR'].join('\r\n')
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }))
  const a = Object.assign(document.createElement('a'), { href: url, download: 'nikah-walima-nov-2026.ics' })
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export const mapsUrl = (v) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.maps)}`
export const mapsEmbed = (v) => `https://maps.google.com/maps?q=${encodeURIComponent(v.maps)}&z=16&output=embed`
export const telUrl = `tel:+${contact.intl}`
export const whatsappTo = (text, to = contact.intl) => `https://wa.me/${to}?text=${encodeURIComponent(text)}`

export const shareText = `Assalamu Alaikum! You are invited to the Nikah & Walima of ${coupleLine} — ${dateLong}, ${areas}, Mumbai.`

// Native share sheet on phones; copy the link everywhere else.
export async function shareInvite() {
  const url = window.location.origin + '/' + (invited.length < DAYS.length ? `?d=${invited.join(',')}` : '')
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Nikah & Walima', text: shareText, url })
      return 'shared'
    } catch (e) {
      if (e?.name === 'AbortError') return 'cancelled'
    }
  }
  try {
    await navigator.clipboard.writeText(`${shareText}\n${url}`)
    return 'copied'
  } catch {
    return 'failed'
  }
}
