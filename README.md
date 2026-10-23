# Nikah & Walima — Suhana & Faizan · Ramzan & Taiyaba

Wedding invitation website for Sunday, 22 November 2026, Trombay, Mumbai.
Vite + React + Tailwind + Framer Motion, same layout as `farhan-portfolio`.

```bash
npm install
npm run dev          # http://localhost:5175
npm run build        # → dist/
```

## The idea: the evening, as it will happen

Scrolling the page walks through 22 November 2026 in Mumbai, from 4 PM to 11 PM:
afternoon → golden hour → the sun sets behind a masjid at the **real Maghrib time
(6:00 PM, computed for Trombay)** → stars come out → the **real moon of that night
(waxing gibbous, ~95% lit)** climbs the sky. A clock on the side (a pill on phones)
shows the time the page has scrolled to.

- `src/lib/sky.js` — sunset (NOAA formula) and moon illumination for the date
- `src/lib/evening.jsx` — maps scroll position to clock time via `data-time="HH:MM"` on sections
- `src/components/Sky.jsx` — the fixed sky: gradient, sun, moon, twinkling stars, shooting star
- `src/sections/Evening.jsx` — the pinned Maghrib scene and Surah Ar-Rum 30:21

## Personal invitations

- `/?to=Mohammed%20Ali%20%26%20family` — the opening doors greet that guest by name and the RSVP is pre-filled.
- `/?invite` — **for the family**: paste the guest list (`Name, phone` per line), pick English / Urdu / Hindi,
  and send each guest their personal link on WhatsApp in one tap. Ticks off who has been sent. The list never leaves the phone/computer.

## Languages

English, Urdu (Nastaliq, right-to-left) and Hindi — switch in the top bar, or link with `?lang=ur` / `?lang=hi`.
All wording is in `src/i18n/strings.js`; facts (dates, venue, phone) in `src/data/wedding.js`.

## Sections

Gate → Hero (the printed card) → Countdown → Couples → The Evening (Maghrib + verse) →
Nikah & Walima (+ Google / Apple calendar) → Venue map → RSVP via WhatsApp →
Invitation card (download PDF, share) → Dua for the newlyweds.

## Scripts

- `npm run assets` — extracts the watercolour, florals, couple illustration and vector Bismillah from the invitation PDF (Python + PyMuPDF + Pillow)
- `npm run og` — rebuilds `public/og.jpg`, the WhatsApp link preview
- `npm run screenshots` — frames along the evening, Urdu, and the host tool into `.snapshots/` (needs `npx vite preview --port 4173`)

## Deploy (Vercel)

Import the folder (settings in `vercel.json`) and set `VITE_SITE_URL` to the final address (default `https://shaikh-family-nikah.vercel.app`) so the
WhatsApp preview image resolves. The site is `noindex` — shared by link, kept out of Google.
