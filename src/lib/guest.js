import { DAYS } from '../data/wedding.js'

// Personal links: …/?to=Mohammed%20Ali%20%26%20family greets that guest by
// name on the opening screen and pre-fills their RSVP.
export function guestName() {
  try {
    const raw = new URLSearchParams(window.location.search).get('to') || ''
    return raw.replace(/[<>{}]/g, '').replace(/\s+/g, ' ').trim().slice(0, 60)
  } catch {
    return ''
  }
}

// Day links: …/?d=16 or …/?d=22,24 show only those dates everywhere on the
// page. No code, or an unknown one, shows the whole celebration.
export function invitedDays() {
  try {
    const raw = new URLSearchParams(window.location.search).get('d') || ''
    const days = [...new Set(raw.split(/[^0-9]+/).map(Number).filter((d) => DAYS.includes(d)))].sort((a, b) => a - b)
    return days.length ? days : DAYS
  } catch {
    return DAYS
  }
}

export const invited = typeof window !== 'undefined' ? invitedDays() : DAYS

export const inviteLink = (base, name, lang, days = DAYS) => {
  const u = new URL(base)
  if (name) u.searchParams.set('to', name)
  if (lang && lang !== 'en') u.searchParams.set('lang', lang)
  if (days.length < DAYS.length) u.searchParams.set('d', days.join(','))
  return u.toString()
}
