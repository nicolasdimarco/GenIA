import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">
            Gen<span className="footer__logo-accent">IA</span>
          </span>
          <p className="footer__tagline">
            IA soberana, construida por cooperativas.
          </p>
          <p className="footer__copy">
            CC {year} <a href="https://genia.coop" target="_blank" rel="noopener noreferrer">Genia</a>.
            Código libre. Datos tuyos.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Mapa del sitio">
          <div className="footer__nav-group">
            <h3 className="footer__nav-title">Producto</h3>
            <ul role="list">
              <li><a href="#que-es">Qué es GenIA</a></li>
              <li><a href="#como-funciona">Cómo funciona</a></li>
              <li><a href="#beneficios">Beneficios</a></li>
              <li><a href="#soberania">Soberanía</a></li>
            </ul>
          </div>
          <div className="footer__nav-group">
            <h3 className="footer__nav-title">Stack Open Source</h3>
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
        <p>
          Construido con tecnología 100% open-source. Sin tracking. Sin cookies de terceros.
        </p>
      </div>
    </footer>
  )
}

