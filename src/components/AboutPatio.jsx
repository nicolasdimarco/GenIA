import './AboutPatio.css'

const STRENGTHS = [
  {
    title: 'Equipos escalables',
    desc: 'Flexibilidad, crecimiento y adaptabilidad para proyectos de cualquier escala.',
    icon: '🚀',
  },
  {
    title: 'Valores éticos',
    desc: 'Tecnología enfocada en privacidad, comunidad, solidaridad y soberanía.',
    icon: '🤝',
  },
  {
    title: 'Alcance global',
    desc: 'Continuidad y velocidad a través de múltiples zonas horarias y culturas.',
    icon: '🌍',
  },
  {
    title: 'Innovación colaborativa',
    desc: 'Creatividad y eficiencia combinando tecnologías consolidadas con las más recientes.',
    icon: '💡',
  },
]

export default function AboutPatio() {
  return (
    <section id="patio" className="patio" aria-labelledby="patio-heading">
      <div className="container">
        <div className="patio__layout">
          <div className="patio__info">
            <span className="badge badge--green">Quiénes Somos</span>
            <h2 id="patio-heading">
              Patio: tecnología cooperativa con impacto global
            </h2>
            <p className="patio__lead">
              BestIA nació en <strong>Patio Community</strong>, el mayor ecosistema internacional
              de cooperativas tecnológicas. No somos una startup con inversores que responder.
              Somos profesionales tech que se unieron para hacer tecnología con valores.
            </p>
            <p className="patio__body">
              Cuando trabajás con BestIA, trabajás con una red de más de 117 cooperativas
              en 27 países, con más de 2.000 proyectos entregados. Tecnología de interés público,
              construida por quienes entienden que la IA debe servir a las personas, no al revés.
            </p>

            <div className="patio__stats" role="list" aria-label="Estadísticas de Patio">
              {[
                { n: '117+', l: 'Cooperativas' },
                { n: '27+', l: 'Países' },
                { n: '3.500+', l: 'Representantes' },
                { n: '2.000+', l: 'Proyectos' },
              ].map(({ n, l }) => (
                <div key={l} role="listitem" className="patio__stat">
                  <span className="patio__stat-n">{n}</span>
                  <span className="patio__stat-l">{l}</span>
                </div>
              ))}
            </div>

            <div className="patio__contact">
              <a href="https://patio.coop" target="_blank" rel="noopener noreferrer" className="btn btn--secondary">
                Conocé Patio Community
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="patio__strengths" role="list" aria-label="Fortalezas de Patio">
            {STRENGTHS.map((s) => (
              <article key={s.title} className="patio__strength-card" role="listitem">
                <span className="patio__strength-icon" aria-hidden="true">{s.icon}</span>
                <div>
                  <h3 className="patio__strength-title">{s.title}</h3>
                  <p className="patio__strength-desc">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

