// The real sky over Trombay on the evening of 22 November 2026: when the sun
// sets (Maghrib) and how much of the moon is lit. Computed, not guessed.

const LAT = 19.0
const LON = 72.93
const IST = 330 // minutes east of UTC
const RAD = Math.PI / 180

// NOAA solar position approximation; good to about a minute.
export function sunsetMinutes(isoDate = '2026-11-22') {
  const d = new Date(isoDate + 'T00:00:00Z')
  const start = Date.UTC(d.getUTCFullYear(), 0, 1)
  const n = Math.floor((d - start) / 86400000) + 1
  const g = ((2 * Math.PI) / 365) * (n - 1 + 0.5)
  const eq = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g))
  const decl =
    0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) +
    0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g)
  const ha = Math.acos(Math.cos(90.833 * RAD) / (Math.cos(LAT * RAD) * Math.cos(decl)) - Math.tan(LAT * RAD) * Math.tan(decl)) / RAD
  return 720 - 4 * (LON - ha) - eq + IST
}

// Fraction of the moon's face lit, from its age since a known new moon.
export function moonIllumination(iso = '2026-11-22T18:30:00+05:30') {
  const SYNODIC = 29.530588853
  const ref = Date.UTC(2000, 0, 6, 18, 14)
  const age = (((new Date(iso) - ref) / 86400000) % SYNODIC + SYNODIC) % SYNODIC
  return { age, lit: (1 - Math.cos((2 * Math.PI * age) / SYNODIC)) / 2, waxing: age < SYNODIC / 2 }
}

export const SUNSET = sunsetMinutes()
export const MOON = moonIllumination()

export const fmtTime = (m) => {
  const h = Math.floor(m / 60) % 24
  const mm = Math.floor(m % 60)
  return `${((h + 11) % 12) + 1}:${String(mm).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
}
export const MAGHRIB = fmtTime(Math.round(SUNSET))

// Sky colours (top, middle, horizon) through the evening, minutes after midnight.
export const SKY_TIMES = [960, 1020, 1055, Math.round(SUNSET), Math.round(SUNSET) + 22, 1140, 1230, 1380]
export const SKY = {
  top: ['#A9C1E2', '#9DB6DC', '#7F97CC', '#3E4F8E', '#222F66', '#121B47', '#0A1233', '#060B24'],
  mid: ['#CFDDEB', '#D6DCE3', '#E2C3B5', '#B77B8F', '#6B4F86', '#26306A', '#121C47', '#0C1438'],
  low: ['#F4EAD8', '#F5E2C6', '#F6CB98', '#F0A06E', '#C4727A', '#4A3E78', '#1F2A5E', '#152050']
}

export const parseHM = (s) => {
  const [h, m] = s.split(':').map(Number)
  return h * 60 + m
}
