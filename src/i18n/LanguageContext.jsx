import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { es } from './translations.es'
import { en } from './translations.en'

const DICTS = { es, en }
const STORAGE_KEY = 'genia.lang'
const DEFAULT_LANG = 'es'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_LANG
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored && DICTS[stored] ? stored : DEFAULT_LANG
  })

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, lang)
    }
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggle: () => setLang((l) => (l === 'es' ? 'en' : 'es')),
      t: DICTS[lang],
    }),
    [lang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useT() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useT must be used within a LanguageProvider')
  return ctx
}
