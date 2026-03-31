import './Hero.css'

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-heading">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__orb hero__orb--blue" />
        <div className="hero__orb hero__orb--green" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__content">
        <div className="hero__badge-wrap">
          <span className="badge badge--blue">Open Source · Cooperativo · Soberano</span>
        </div>

        <h1 id="hero-heading" className="hero__title">
          IA que trabaja para vos,{' '}
          <span className="hero__title-accent">no para Big Tech</span>
        </h1>

        <p className="hero__subtitle">
          BestIA es la alternativa open-source a ChatGPT, Copilot y Poe.
          Dos años de experiencia real construyendo IA que <strong>corre en tu infraestructura</strong>,
          protege tus datos y escala con tu organización.
        </p>

        <div className="hero__stats" role="list" aria-label="Estadísticas de Patio">
          <div role="listitem" className="hero__stat">
            <span className="hero__stat-number">117+</span>
            <span className="hero__stat-label">Cooperativas</span>
          </div>
          <div role="listitem" className="hero__stat">
            <span className="hero__stat-number">27+</span>
            <span className="hero__stat-label">Países</span>
          </div>
          <div role="listitem" className="hero__stat">
            <span className="hero__stat-number">2 años</span>
            <span className="hero__stat-label">en producción</span>
          </div>
          <div role="listitem" className="hero__stat">
            <span className="hero__stat-number">100%</span>
            <span className="hero__stat-label">Open Source</span>
          </div>
        </div>

        <div className="hero__actions">
          <a href="#contacto" className="btn btn--primary">
            Empezá tu transición
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#como-funciona" className="btn btn--secondary">
            Ver cómo funciona
          </a>
        </div>
      </div>
    </section>
  )
}

