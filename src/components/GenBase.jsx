import { useEffect } from 'react'
import {
  LuBrainCircuit,
  LuUsers,
  LuDatabase,
  LuTrendingUp,
  LuLightbulb,
  LuCheck,
} from 'react-icons/lu'
import { useT } from '../i18n/LanguageContext'
import { Link } from '../router/Router'
import './GenBase.css'

export default function GenBase() {
  const { t } = useT()
  const g = t.genbase

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
    <main id="main-content" className="genbase-page">
      {/* ---------------- HERO ---------------- */}
      <section className="genbase-hero" aria-labelledby="genbase-hero-heading">
        <div className="genbase-hero__bg" aria-hidden="true">
          <div className="genbase-hero__orb genbase-hero__orb--blue" />
          <div className="genbase-hero__orb genbase-hero__orb--green" />
          <div className="genbase-hero__grid" />
        </div>

        <div className="container genbase-hero__content">
          <div className="genbase-hero__badge-wrap">
            <span className="badge badge--blue">{g.hero.badge}</span>
          </div>

          <h1 id="genbase-hero-heading" className="genbase-hero__title">
            {g.hero.title}
          </h1>
          <p className="genbase-hero__subtitle">{g.hero.subtitle}</p>

          <p className="genbase-hero__lead">{g.hero.leadStart}</p>
          <p className="genbase-hero__lead genbase-hero__lead--muted">{g.hero.leadMuted}</p>
          <p className="genbase-hero__lead genbase-hero__lead--strong">{g.hero.leadStrong}</p>

          <div className="genbase-hero__actions">
            <Link href="/#contacto" className="btn btn--primary">
              {g.hero.ctaPrimary}
            </Link>
            <a href="#genbase-hub" className="btn btn--secondary">
              {g.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- KNOWLEDGE HUB ---------------- */}
      <section id="genbase-hub" className="genbase-section" aria-labelledby="genbase-hub-heading">
        <div className="container">
          <div className="genbase-layout">
            <div className="genbase-layout__text">
              <span className="badge badge--green">{g.hub.badge}</span>
              <h2 id="genbase-hub-heading">{g.hub.title}</h2>
              <p className="genbase-layout__lead">
                <strong>{g.hub.leadStrong}</strong>{g.hub.leadRest}
              </p>
              <p className="genbase-layout__body">{g.hub.body}</p>
              <p className="genbase-layout__footer">{g.hub.footer}</p>
            </div>

            <div className="genbase-card">
              <h3 className="genbase-card__title">
                <LuBrainCircuit size={20} aria-hidden="true" /> {g.hub.cardTitle}
              </h3>
              <ul className="genbase-card__list" role="list">
                {g.hub.items.map((item) => (
                  <li key={item} className="genbase-card__item">
                    <span className="genbase-card__check" aria-hidden="true"><LuCheck size={12} /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- ENTERPRISE RAG ---------------- */}
      <section className="genbase-section genbase-section--alt" aria-labelledby="genbase-rag-heading">
        <div className="container">
          <div className="section-header">
            <span className="badge badge--blue">{g.rag.badge}</span>
            <h2 id="genbase-rag-heading">{g.rag.title}</h2>
            <p>{g.rag.lead}</p>
          </div>

          <p className="genbase-subtitle">{g.rag.subtitle}</p>

          <div className="genbase-chips" role="list">
            {g.rag.items.map((item) => (
              <span key={item} className="genbase-chip" role="listitem">{item}</span>
            ))}
          </div>

          <p className="genbase-footnote">{g.rag.footer}</p>
        </div>
      </section>

      {/* ---------------- COLLABORATIVE ---------------- */}
      <section className="genbase-section genbase-collab" aria-labelledby="genbase-collab-heading">
        <div className="genbase-collab__bg" aria-hidden="true">
          <div className="genbase-collab__orb" />
        </div>
        <div className="container">
          <div className="genbase-collab__inner">
            <span className="genbase-collab__icon" aria-hidden="true"><LuUsers size={32} /></span>
            <span className="badge badge--green">{g.collaborative.badge}</span>
            <h2 id="genbase-collab-heading">{g.collaborative.title}</h2>
            <p className="genbase-collab__lead">{g.collaborative.lead}</p>
            <p className="genbase-collab__body">{g.collaborative.body}</p>
            <p className="genbase-collab__footer">{g.collaborative.footer}</p>
          </div>
        </div>
      </section>

      {/* ---------------- DATA LAKE ---------------- */}
      <section className="genbase-section genbase-section--alt" aria-labelledby="genbase-datalake-heading">
        <div className="container">
          <div className="genbase-layout genbase-layout--reverse">
            <div className="genbase-layout__text">
              <span className="badge badge--blue">{g.datalake.badge}</span>
              <h2 id="genbase-datalake-heading">{g.datalake.title}</h2>
              <p className="genbase-layout__lead">{g.datalake.lead}</p>
              <p className="genbase-layout__body">{g.datalake.body}</p>
              <p className="genbase-layout__footer">{g.datalake.footer}</p>
            </div>

            <div className="genbase-card genbase-card--blue">
              <h3 className="genbase-card__title">
                <LuDatabase size={20} aria-hidden="true" /> {g.datalake.subtitle}
              </h3>
              <ul className="genbase-card__list" role="list">
                {g.datalake.items.map((item) => (
                  <li key={item} className="genbase-card__item">
                    <span className="genbase-card__check genbase-card__check--blue" aria-hidden="true"><LuCheck size={12} /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PREDICTIVE AI ---------------- */}
      <section className="genbase-section" aria-labelledby="genbase-predictive-heading">
        <div className="container">
          <div className="section-header">
            <span className="badge badge--green">{g.predictive.badge}</span>
            <h2 id="genbase-predictive-heading">{g.predictive.title}</h2>
            <p>{g.predictive.lead}</p>
          </div>

          <p className="genbase-subtitle">{g.predictive.subtitle}</p>

          <div className="genbase-grid" role="list">
            {g.predictive.items.map((item, idx) => (
              <article key={item} className={`genbase-grid__card genbase-grid__card--${idx % 2 === 0 ? 'blue' : 'green'}`} role="listitem">
                <span className="genbase-grid__icon" aria-hidden="true"><LuTrendingUp size={20} /></span>
                <span>{item}</span>
              </article>
            ))}
          </div>

          <p className="genbase-footnote">{g.predictive.footer}</p>
        </div>
      </section>

      {/* ---------------- WHY THIS MATTERS ---------------- */}
      <section className="genbase-section genbase-why" aria-labelledby="genbase-why-heading">
        <div className="genbase-why__bg" aria-hidden="true">
          <div className="genbase-why__orb genbase-why__orb--blue" />
          <div className="genbase-why__orb genbase-why__orb--green" />
        </div>
        <div className="container">
          <div className="genbase-why__inner">
            <span className="genbase-why__icon" aria-hidden="true"><LuLightbulb size={32} /></span>
            <span className="badge badge--blue">{g.why.badge}</span>
            <h2 id="genbase-why-heading">{g.why.title}</h2>

            <div className="genbase-why__items">
              {g.why.items.map((item) => (
                <p key={item} className="genbase-why__item">{item}</p>
              ))}
            </div>

            <p className="genbase-why__body">{g.why.body}</p>

            <p className="genbase-why__notool">{g.why.notATool}</p>
            <p className="genbase-why__accent">{g.why.accent}</p>
          </div>
        </div>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <section id="contacto-genbase" className="genbase-cta" aria-labelledby="genbase-cta-heading">
        <div className="genbase-cta__bg" aria-hidden="true">
          <div className="genbase-cta__orb genbase-cta__orb--green" />
          <div className="genbase-cta__orb genbase-cta__orb--blue" />
        </div>
        <div className="container">
          <div className="genbase-cta__inner">
            <span className="badge badge--green">{g.hero.badge}</span>
            <h2 id="genbase-cta-heading">{g.cta.title}</h2>
            <p className="genbase-cta__lead">{g.cta.lead}</p>
            <p className="genbase-cta__strong">{g.cta.strong}</p>
            <Link href="/#contacto" className="btn btn--primary">
              {g.cta.button}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
