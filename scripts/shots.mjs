// Frames along the evening at phone and desktop width, plus a personal-link
// gate, the Urdu page and the host tool.
//   npm run build && npx vite preview --port 4173   (in another terminal)
//   npm run screenshots [url]
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const url = (process.argv[2] || 'http://localhost:4173/').replace(/\/$/, '') + '/'
const out = '.snapshots'
await mkdir(out, { recursive: true })

// [label, element id, fraction of that element's height to scroll into]
const STOPS = [
  ['1-hero', 'top', 0],
  ['2-countdown', 'countdown', 0.1],
  ['3-couples', 'couples', 0.35],
  ['4-golden', 'evening', 0.12],
  ['5-maghrib', 'evening', 0.4],
  ['6-verse', 'evening', 0.75],
  ['7-events', 'events', 0.2],
  ['8-venue', 'venue', 0.1],
  ['9-rsvp', 'rsvp', 0.15],
  ['10-card', 'invitation', 0.1],
  ['11-footer', 'footer', 0.3]
]

async function tour(page, name, h) {
  for (const [label, id, f] of STOPS) {
    await page.evaluate(([id, f]) => {
      const el = id === 'footer' ? document.querySelector('footer') : document.getElementById(id)
      const top = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo(0, top + el.offsetHeight * f)
    }, [id, f])
    await page.waitForTimeout(1300)
    await page.screenshot({ path: `${out}/${name}-${label}.png` })
  }
}

const browser = await chromium.launch()
for (const [name, viewport, scale] of [
  ['phone', { width: 390, height: 844 }, 2],
  ['desktop', { width: 1440, height: 900 }, 1]
]) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: scale })
  await page.goto(url + '?to=Mohammed%20Ali%20%26%20family&lang=en', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2600)
  await page.screenshot({ path: `${out}/${name}-0-gate.png` })
  await page.getByRole('button', { name: 'Open the invitation' }).click()
  await page.waitForTimeout(3200)
  await tour(page, name, viewport.height)
  await page.close()
  console.log(`✓ ${name}`)
}

// Urdu, phone
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })
  await page.goto(url + '?lang=ur', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2600)
  await page.screenshot({ path: `${out}/ur-0-gate.png` })
  await page.getByRole('button', { name: 'Open the invitation' }).click()
  await page.waitForTimeout(3400)
  await page.screenshot({ path: `${out}/ur-1-hero.png` })
  await page.evaluate(() => document.getElementById('couples').scrollIntoView())
  await page.waitForTimeout(1500)
  await page.screenshot({ path: `${out}/ur-2-couples.png` })
  await page.close()
  console.log('✓ urdu')
}

// Host tool
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  await page.goto(url + '?host', { waitUntil: 'networkidle' })
  await page.fill('textarea', 'Mohammed Ali & family, 98200 12345\nAyesha Khan, 9876543210\nShaikh family')
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${out}/host.png`, fullPage: true })
  await page.close()
  console.log('✓ host')
}
await browser.close()
