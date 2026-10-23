import { useEffect, useMemo, useState } from 'react'
import { Check, Copy, Send } from 'lucide-react'
import { Bismillah, Rule } from '../components/Ornaments.jsx'
import { DAYS } from '../data/wedding.js'
import { inviteLink } from '../lib/guest.js'
import { STRINGS, dayList } from '../i18n/strings.js'

// For the family, at /?invite. Paste the guest list, get one personal link per
// guest and a WhatsApp message ready to send. Nothing leaves the browser.

const TEMPLATES = {
  en: "Assalamu Alaikum {name}!\n\nWith Allah's blessings, Mr. Subhan Azizul Rehman Shaikh & family invite you to the Nikah & Walima of Ramzan & Taiyaba and Suhana & Faizan — {dates}, Mumbai.\n\nYour personal invitation:\n{link}",
  ur: 'السلام علیکم {name}!\n\nاللہ کے فضل و کرم سے، جناب سبحان عزیز الرحمٰن شیخ و اہلِ خانہ آپ کو رمضان و طیبہ اور سہانہ و فیضان کے نکاح و ولیمہ میں مدعو کرتے ہیں — {dates}، ممبئی۔\n\nآپ کا دعوت نامہ:\n{link}',
  hi: 'अस्सलामु अलैकुम {name}!\n\nअल्लाह के फ़ज़्ल से, जनाब सुब्हान अज़ीज़ुर रहमान शेख़ व परिवार आपको रमज़ान व तैयबा और सुहाना व फ़ैज़ान के निकाह व वलीमा में आमंत्रित करते हैं — {dates}, मुंबई।\n\nआपका दावतनामा:\n{link}'
}

const SAMPLE = 'Mohammed Ali & family, 98200 12345\nAyesha Khan, 9876543210\nShaikh family'

const load = (k, d) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d }
}
const save = (k, v) => {
  try { localStorage.setItem(k, JSON.stringify(v)) } catch {}
}

function parse(list) {
  return list
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const m = line.match(/^(.*?)[,;\t]\s*([+\d][\d\s-]{8,})\s*$/)
      const name = (m ? m[1] : line).trim()
      let phone = m ? m[2].replace(/\D/g, '') : ''
      if (phone.length === 10) phone = '91' + phone
      return { name, phone }
    })
}

export default function HostTool() {
  const [base, setBase] = useState(() => load('host.base', window.location.origin + '/'))
  const [lang, setLang] = useState(() => load('host.lang', 'en'))
  const [list, setList] = useState(() => load('host.list', ''))
  const [tpl, setTpl] = useState(() => load('host.tpl2', TEMPLATES.en))
  const [days, setDays] = useState(() => load('host.days', DAYS))
  const [sent, setSent] = useState(() => load('host.sent', {}))
  const [copied, setCopied] = useState('')

  useEffect(() => save('host.base', base), [base])
  useEffect(() => save('host.lang', lang), [lang])
  useEffect(() => save('host.list', list), [list])
  useEffect(() => save('host.tpl2', tpl), [tpl])
  useEffect(() => save('host.days', days), [days])
  useEffect(() => save('host.sent', sent), [sent])

  const guests = useMemo(() => parse(list), [list])
  const done = guests.filter((g) => sent[g.name]).length

  const dates = dayList(STRINGS[lang], days)
  const message = (g) => tpl.replaceAll('{name}', g.name).replaceAll('{dates}', dates).replaceAll('{link}', inviteLink(base, g.name, lang, days))
  const groupLink = inviteLink(base, '', lang, days)
  const groupMessage = tpl.replaceAll(' {name}', '').replaceAll('{dates}', dates).replaceAll('{link}', groupLink)
  const toggleDay = (d) => setDays((s) => (s.includes(d) ? (s.length > 1 ? s.filter((x) => x !== d) : s) : [...s, d].sort((a, b) => a - b)))
  const copyText = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(''), 1500)
    } catch {}
  }
  const wa = (g) => `https://wa.me/${g.phone}?text=${encodeURIComponent(message(g))}`
  const copy = (g) => copyText(message(g), g.name)
  const pickLang = (l) => {
    setLang(l)
    setTpl(TEMPLATES[l])
  }

  const label = 'mb-2 block font-sans text-[12px] uppercase tracking-[0.2em] text-paper/60'

  return (
    <div className="girih relative min-h-screen bg-lapis-night px-5 py-12 text-paper sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="text-center">
          <Bismillah tone="#D9BF8C" className="mx-auto w-40" />
          <h1 className="h-sec mt-6">Send personal invitations</h1>
          <p className="lede mx-auto mt-3 max-w-2xl !text-paper/70">
            Paste your guest list, one per line, with a phone number after a comma if you have one. Each guest gets their own link that
            greets them by name. Your list stays on this device only.
          </p>
          <Rule dark className="mt-6" />
        </header>

        {/* One link per group of guests: pick the days, forward the link. */}
        <section className="mt-10 rounded-[28px] border border-gold-light/30 bg-gold-light/[0.06] p-6 sm:p-8">
          <span className={label}>Invited days</span>
          <div className="flex flex-wrap gap-2">
            {DAYS.map((d) => (
              <button key={d} type="button" aria-pressed={days.includes(d)} onClick={() => toggleDay(d)} className={`rounded-full border px-4 py-2 text-sm transition ${days.includes(d) ? 'border-gold-light bg-gold-light text-lapis-night' : 'border-paper/20 text-paper/80 hover:border-gold-light/60'}`}>
                {d} November
              </button>
            ))}
          </div>
          <p className="mt-3 font-sans text-sm text-paper/60">Guests who open this link see only these days. Forward it to everyone invited on them, or use the personal links below.</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <input readOnly value={groupLink} dir="ltr" className="field-dark min-w-0 flex-1 !text-[14px]" onFocus={(e) => e.target.select()} />
            <button type="button" onClick={() => copyText(groupLink, 'link')} className="btn-line-dark !px-4 !py-2.5 !text-[11px]">
              {copied === 'link' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy link
            </button>
            <button type="button" onClick={() => copyText(groupMessage, 'msg')} className="btn-line-dark !px-4 !py-2.5 !text-[11px]">
              {copied === 'msg' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy message
            </button>
            <a href={`https://wa.me/?text=${encodeURIComponent(groupMessage)}`} target="_blank" rel="noreferrer" className="btn-gold !px-4 !py-2.5 !text-[11px]">
              <Send className="h-4 w-4" /> Share on WhatsApp
            </a>
          </div>
        </section>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6 rounded-[28px] border border-gold-light/20 bg-white/[0.04] p-6 sm:p-8">
            <label className="block">
              <span className={label}>Guest list</span>
              <textarea className="field-dark min-h-[200px] font-mono !text-[13px]" value={list} onChange={(e) => setList(e.target.value)} placeholder={SAMPLE} />
            </label>
            <div>
              <span className={label}>Invitation language</span>
              <div className="flex gap-2">
                {[['en', 'English'], ['ur', 'اردو'], ['hi', 'हिन्दी']].map(([id, name]) => (
                  <button key={id} type="button" onClick={() => pickLang(id)} className={`rounded-full border px-4 py-2 text-sm transition ${lang === id ? 'border-gold-light bg-gold-light text-lapis-night' : 'border-paper/20 text-paper/80 hover:border-gold-light/60'}`}>
                    {name}
                  </button>
                ))}
              </div>
            </div>
            <label className="block">
              <span className={label}>Message ({'{name}'}, {'{dates}'} and {'{link}'} are filled in)</span>
              <textarea className="field-dark min-h-[180px] !text-[14px]" dir={lang === 'ur' ? 'rtl' : 'ltr'} value={tpl} onChange={(e) => setTpl(e.target.value)} />
            </label>
            <label className="block">
              <span className={label}>Website address</span>
              <input className="field-dark !text-[14px]" value={base} onChange={(e) => setBase(e.target.value)} />
            </label>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="font-display text-2xl">{guests.length} guests</p>
              <p className="font-sans text-sm text-paper/60">{done} sent</p>
            </div>
            <ul className="mt-4 space-y-3">
              {guests.length === 0 && (
                <li className="rounded-2xl border border-dashed border-paper/20 p-8 text-center font-sans text-sm text-paper/50">Guests appear here as you type.</li>
              )}
              {guests.map((g) => (
                <li key={g.name} className={`flex flex-wrap items-center gap-3 rounded-2xl border p-4 transition ${sent[g.name] ? 'border-gold-light/30 bg-gold-light/10' : 'border-paper/10 bg-white/[0.04]'}`}>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-xl">{g.name}</p>
                    <p className="truncate font-sans text-xs text-paper/50">{g.phone ? '+' + g.phone : 'No number — you will pick the chat in WhatsApp'}</p>
                  </div>
                  <button type="button" onClick={() => copy(g)} className="btn-line-dark !px-4 !py-2 !text-[11px]">
                    {copied === g.name ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy
                  </button>
                  <a
                    href={wa(g)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setSent((s) => ({ ...s, [g.name]: true }))}
                    className="btn-gold !px-4 !py-2 !text-[11px]"
                  >
                    {sent[g.name] ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />} WhatsApp
                  </a>
                </li>
              ))}
            </ul>
            {done > 0 && (
              <button type="button" onClick={() => setSent({})} className="mt-4 font-sans text-xs text-paper/50 underline underline-offset-4 hover:text-paper">
                Clear sent marks
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
