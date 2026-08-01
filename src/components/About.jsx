import logoFarox from '../img/logo-farox.png'
import logoNayra from '../img/logo-nayra.svg'
import logoCamba from '../img/logo-camba.png'
import { useT } from '../i18n/LanguageContext'
import './About.css'

const COOPS = [
  { name: 'Farox', logo: logoFarox, url: 'https://farox.coop/' },
  { name: 'Cambá', logo: logoCamba, url: 'https://camba.coop/' },
  { name: 'Nayra', logo: logoNayra, url: 'https://nayra.coop/', wide: true },
]

export default function About() {
  const { t } = useT()
  return (
    <section id="about" className="patio" aria-labelledby="patio-heading">
      <div className="container">
        <div className="patio__intro">
          <span className="badge badge--green">{t.about.badge}</span>
          <h2 id="patio-heading">
            {t.about.titleStart}{' '}
            <br /> <span className="patio__accent">{t.about.titleAccent}</span>
          </h2>
          <p className="patio__lead">
            {t.about.leadStart} <strong>{t.about.leadBrand}</strong> {t.about.leadMid}{' '}
            <strong>Farox</strong>, <strong>Nayra</strong> {t.about.leadAnd} <strong>Cambá</strong>{t.about.leadEnd}
          </p>
        </div>

        <div className="patio__coops" role="list" aria-label={t.about.coopsAria}>
          {COOPS.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`patio__coop ${c.wide ? 'patio__coop--wide' : ''}`}
              role="listitem"
            >
              <div className={`patio__coop-logo-wrap ${c.wide ? 'patio__coop-logo-wrap--wide' : ''}`}>
                <img src={c.logo} alt={`Logo ${c.name}`} className="patio__coop-logo" />
              </div>
              <span className="patio__coop-link">
                {t.about.visit}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

