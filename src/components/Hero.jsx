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
          Sin suscripciones mensuales por usuario <br/>  <span className="sovereignty__accent"> ni costos por token</span>.
        </h2>
        <p className="hero__subtitle">
          Implementamos estrategias de Inteligencia Artificial self-hosted con tecnología Open Source.
          Sin dependencia de proveedores, <strong>sin fugas de datos</strong> y con{' '}
          <strong>infraestructura 100% bajo tu control</strong>.
        </p>
        <div className="hero__actions">
          <a href="#contacto" className="btn btn--primary">
            Diseñá tu estrategia
          </a>
          <a href="#que-es" className="btn btn--secondary">
            Ver cómo funciona
          </a>
        </div>
      </div>
    </section>
  )
}

