import { useT } from '../i18n/LanguageContext'
import './Hero.css'

export default function Hero() {
  const { t } = useT()
  return (
    <section id="top" className="hero" aria-labelledby="hero-heading">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__orb hero__orb--blue" />
        <div className="hero__orb hero__orb--green" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__content">
        <div className="hero__badge-wrap">
          <span className="badge badge--blue">{t.hero.badge}</span>
        </div>

        <h1 id="hero-heading" className="hero__title">
          {t.hero.title}
        </h1>
        <h2>
          {t.hero.subtitle} <br />  <span className="sovereignty__accent"> {t.hero.subtitleAccent}</span>.
        </h2>
        <p className="hero__subtitle">
          {t.hero.leadStart} <strong>{t.hero.leadStrong1}</strong>{t.hero.leadMid}{' '}
          <strong>{t.hero.leadStrong2}</strong>.
        </p>
        <div className="hero__actions">
          <a href="#contacto" className="btn btn--primary">
            {t.hero.ctaPrimary}
          </a>
          <a href="#que-es" className="btn btn--secondary">
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  )
}

