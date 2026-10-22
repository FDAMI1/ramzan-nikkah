import { LANGS } from '../i18n/strings.js'
import { useLang } from '../i18n/lang.jsx'

export default function LangSwitch({ dark = false, className = '' }) {
  const { lang, setLang } = useLang()
  return (
    <div
      role="group"
      aria-label="Language"
      dir="ltr"
      className={`inline-flex items-center gap-0.5 rounded-full border p-0.5 ${dark ? 'border-gold-light/40 bg-white/5' : 'border-gold/50 bg-white/60'} ${className}`}
    >
      {LANGS.map((l) => (
        <button
          key={l.id}
          type="button"
          onClick={() => setLang(l.id)}
          aria-pressed={lang === l.id}
          title={l.name}
          className={`rounded-full px-2.5 py-1 text-[12px] leading-none transition ${
            lang === l.id
              ? `font-semibold shadow-sm ring-2 ring-gold ${dark ? 'bg-gold-light text-lapis-night' : 'bg-lapis-deep text-paper'}`
              : dark ? 'text-paper/75 hover:text-paper' : 'text-ink-soft hover:text-ink'
          }`}
        >
          <span className="!tracking-normal">{l.label}</span>
        </button>
      ))}
    </div>
  )
}
