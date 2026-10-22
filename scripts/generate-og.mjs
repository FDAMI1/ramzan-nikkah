// Share image, 1200×630: what WhatsApp, Facebook and iMessage show when the
// link is pasted. Built from the same art as the site.
import { chromium } from 'playwright'
import { readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const uri = async (p, mime) => `data:${mime};base64,${(await readFile(join(root, p))).toString('base64')}`
const wash = await uri('img/watercolor.jpg', 'image/jpeg')
const floral = await uri('img/floral.webp', 'image/webp')
const bism = await uri('img/bismillah.svg', 'image/svg+xml')

const html = `<!doctype html><html><head><meta charset="utf-8"/>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@400;500&family=Pinyon+Script&display=swap" rel="stylesheet"/>
<style>
  html,body{margin:0}
  body{width:1200px;height:630px;position:relative;overflow:hidden;color:#1B2A55;font-family:'Cormorant Garamond',Georgia,serif;
    background:url(${wash}) center/cover}
  .veil{position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.15),rgba(248,244,236,.65))}
  .fl{position:absolute;width:420px}
  .tl{left:-40px;top:-30px}
  .br{right:-40px;bottom:-30px;transform:rotate(180deg)}
  .c{position:relative;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
  .b{width:250px}
  .k{font-family:Jost;font-size:15px;letter-spacing:.38em;text-transform:uppercase;color:#B08A4F;margin-top:22px}
  h1{font-weight:500;font-size:78px;line-height:1;margin:14px 0 0}
  .amp{font-style:italic;font-weight:500;color:#B08A4F;font-size:.8em;margin:0 12px}
  .dot{color:#B08A4F;margin:0 18px;font-size:.6em;vertical-align:middle}
  .d{font-family:Jost;font-weight:500;font-size:19px;letter-spacing:.26em;text-transform:uppercase;margin-top:26px;color:#1B3279}
  .s{font-style:italic;font-size:24px;margin-top:8px;color:#3A4A75}
</style></head><body>
<div class="veil"></div>
<img class="fl tl" src="${floral}"/><img class="fl br" src="${floral}"/>
<div class="c">
  <img class="b" src="${bism}"/>
  <div class="k">You are invited to the Nikah &amp; Walima of</div>
  <h1>Suhana<span class="amp">&amp;</span>Faizan<span class="dot">◆</span>Ramzan<span class="amp">&amp;</span>Taiyaba</h1>
  <div class="d">Sunday · 22 November 2026</div>
  <div class="s">Trombay, Mumbai</div>
</div></body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.screenshot({ path: join(root, 'og.jpg'), type: 'jpeg', quality: 90 })
await browser.close()
console.log('✓ wrote public/og.jpg')
