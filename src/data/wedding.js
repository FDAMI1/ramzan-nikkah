// The facts printed on the invitation card. Wording in each language lives
// in src/i18n/strings.js; `key` links a person to their translated name.

const iso = (day, hm) => `2026-11-${day}T${hm}:00+05:30`

export const wedding = {
  couples: [
    {
      id: 'ramzan-taiyaba',
      first: { key: 'ramzan', role: 'Groom' },
      second: { key: 'taiyaba', role: 'Bride' },
      nikah: 16,
      walima: 22
    },
    {
      id: 'suhana-faizan',
      first: { key: 'suhana', role: 'Bride' },
      second: { key: 'faizan', role: 'Groom' },
      nikah: 22,
      walima: 24
    }
  ],

  // Every function runs 7 PM – 10:30 PM IST. The weekday of each date.
  days: { 16: 'monday', 22: 'sunday', 24: 'tuesday' },
  time: { start: '19:00', end: '22:30' },
  iso,

  date: { year: '2026' },

  venues: {
    trombay: {
      name: 'Mother Velankanni Church',
      area: 'Trombay',
      lines: ['Johnson Marg, Datta Nagar, Trombay', 'Mumbai, Maharashtra 400088'],
      maps: 'Mother Velankanni Church, Johnson Marg, Datta Nagar, Trombay, Mumbai, Maharashtra 400088'
    },
    zakariya: {
      name: 'Zakariya Masjid',
      area: 'Bhandup (West)',
      lines: ['Sonapur, Bhandup (West)', 'Mumbai, Maharashtra 400078'],
      maps: 'Zakariya Masjid, Sonapur, Bhandup West, Mumbai, Maharashtra 400078'
    },
    marhaba: {
      name: 'Marhaba Hall',
      area: 'Jogeshwari (West)',
      lines: ['S.V. Road, Opp. Memon Colony, Suraswati Baug', 'Jogeshwari (West), Mumbai 400102'],
      maps: 'Marhaba Hall, S.V. Road, Opp. Memon Colony, Jogeshwari West, Mumbai, Maharashtra 400102'
    }
  },
  venueOn: { 16: 'zakariya', 22: 'trombay', 24: 'marhaba' },

  contact: {
    phone: '9619655424',
    display: '+91 96196 55424',
    intl: '919619655424'
  },

  verse: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
  dua: 'بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ'
}

export const DAYS = [16, 22, 24]

// The four functions in date order, or only those on the given days.
export const scheduleFor = (days = DAYS) =>
  wedding.couples
    .flatMap((couple) => [
      { couple, kind: 'nikah', day: couple.nikah },
      { couple, kind: 'walima', day: couple.walima }
    ])
    .filter((e) => days.includes(e.day))
    .sort((a, b) => a.day - b.day)

export const venueFor = (day) => wedding.venues[wedding.venueOn[day]]

// Each venue used on the given days, with the days held there.
export const venuesFor = (days) =>
  Object.entries(wedding.venues)
    .map(([id, v]) => ({ id, ...v, days: days.filter((d) => wedding.venueOn[d] === id) }))
    .filter((v) => v.days.length)

export const couplesFor = (days) => wedding.couples.filter((c) => days.includes(c.nikah) || days.includes(c.walima))

export const coupleLine = 'Ramzan & Taiyaba · Suhana & Faizan'
export const host = 'Mr. Subhan Azizul Rehman Shaikh'
