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
          <span className="badge badge--blue">Self-hosted · Open Source</span>
        </div>

        <h1 id="hero-heading" className="hero__title">
          IA Soberana
        </h1>
        <h2>
          Sin suscripciones mensuales por usuario <br/> ni costos por token.
        </h2>
        <p className="hero__subtitle">
          Implementamos estrategias de Inteligencia Artificial self-hosted con tecnología Open Source.
          Sin dependencia de proveedores, <strong>sin fugas de datos</strong> y con{' '}
          <strong>infraestructura 100% propia</strong>.
        </p>

{/*         <div className="hero__stats" role="list" aria-label="Estadísticas de Patio">
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
        </div> */}

        <div className="hero__actions">
          <a href="#contacto" className="btn btn--primary">
            Diseñá tu estrategia
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

