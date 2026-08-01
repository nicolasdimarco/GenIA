import { useEffect } from 'react'
import { useT } from '../i18n/LanguageContext'
import HowItWorks from './HowItWorks'
import './InferenciaPage.css'

export default function InferenciaPage() {
  const { t } = useT()
  const h = t.howItWorks

  useEffect(() => {
    const prevTitle = document.title
    document.title = h.meta.title

    const metaDesc = document.querySelector('meta[name="description"]')
    const prevDesc = metaDesc?.getAttribute('content')
    metaDesc?.setAttribute('content', h.meta.description)

    return () => {
      document.title = prevTitle
      if (metaDesc && prevDesc) metaDesc.setAttribute('content', prevDesc)
    }
  }, [h.meta.title, h.meta.description])

  return (
    <main id="main-content" className="inferencia-page">
      <HowItWorks />
    </main>
  )
}
