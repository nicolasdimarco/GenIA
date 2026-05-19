import { useT } from '../i18n/LanguageContext'
import './Footer.css'

export default function Footer() {
  const { t } = useT()
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">
            Gen<span className="footer__logo-accent">IA</span>
          </span>
          <p className="footer__tagline">{t.footer.tagline}</p>
          <p className="footer__copy">
            CC {year} <a href="https://genia.coop" target="_blank" rel="noopener noreferrer">Genia</a>.
            {' '}{t.footer.copy}
          </p>
        </div>

        <nav className="footer__nav" aria-label={t.footer.sitemapAria}>
          <div className="footer__nav-group">
            <h3 className="footer__nav-title">{t.footer.productTitle}</h3>
            <ul role="list">
              {t.footer.productLinks.map((l) => (
                <li key={l.href}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer__nav-group">
            <h3 className="footer__nav-title">{t.footer.stackTitle}</h3>
            <ul role="list">
              <li><a href="https://openwebui.com" target="_blank" rel="noopener noreferrer">OpenWebUI</a></li>
              <li><a href="https://ollama.com" target="_blank" rel="noopener noreferrer">Ollama</a></li>
              <li><a href="https://langfuse.com" target="_blank" rel="noopener noreferrer">LangFuse</a></li>
              <li><a href="https://langflow.org" target="_blank" rel="noopener noreferrer">Langflow</a></li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="footer__bottom container">
        <p>{t.footer.bottom}</p>
      </div>
    </footer>
  )
}

