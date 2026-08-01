import { useEffect } from 'react'
import { useT } from '../i18n/LanguageContext'
import Genway from './Genway'
import './GenwayPage.css'

export default function GenwayPage() {
  const { t } = useT()
  const g = t.genway

  useEffect(() => {
    const prevTitle = document.title
    document.title = g.meta.title

    const metaDesc = document.querySelector('meta[name="description"]')
    const prevDesc = metaDesc?.getAttribute('content')
    metaDesc?.setAttribute('content', g.meta.description)

    return () => {
      document.title = prevTitle
      if (metaDesc && prevDesc) metaDesc.setAttribute('content', prevDesc)
    }
  }, [g.meta.title, g.meta.description])

  return (
    <main id="main-content" className="genway-page">
      <Genway />
    </main>
  )
}
