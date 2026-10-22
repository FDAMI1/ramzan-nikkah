import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { LANGS, STRINGS } from './strings.js'

const Ctx = createContext(null)

// ?lang=ur in the link wins, then the last choice on this device, then the
// phone's own language.
function initial() {
  try {
    const q = new URLSearchParams(window.location.search).get('lang')
    if (STRINGS[q]) return q
    const saved = localStorage.getItem('lang')
    if (STRINGS[saved]) return saved
  } catch {}
  const nav = (navigator.language || '').slice(0, 2)
  return STRINGS[nav] ? nav : 'en'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initial)

  useEffect(() => {
    const meta = LANGS.find((l) => l.id === lang)
    document.documentElement.lang = lang === 'en' ? 'en-IN' : lang
    document.documentElement.dir = meta.dir
    try { localStorage.setItem('lang', lang) } catch {}
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: STRINGS[lang], rtl: lang === 'ur' }), [lang])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useLang = () => useContext(Ctx)
