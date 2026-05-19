import logoFarox from '../img/logo-farox.png'
import logoCamba from '../img/logo-camba.png'
import './About.css'

const COOPS = [
  {
    name: 'Farox',
    logo: logoFarox,
    url: 'https://farox.coop/',
  },
  {
    name: 'Cambá',
    logo: logoCamba,
    url: 'https://camba.coop/',
  },
]

export default function About() {
  return (
    <section id="about" className="patio" aria-labelledby="patio-heading">
      <div className="container">
        <div className="patio__intro">
          <span className="badge badge--green">Quiénes Somos</span>
          <h2 id="patio-heading">
            Cooperativas de tecnología por una IA{' '}
            <br/> <span className="patio__accent">justa y soberana</span>
          </h2>
          <p className="patio__lead">
            Somos cooperativas de tecnología trabajando de manera colaborativa para crear una
            tecnología más justa y soberana. <strong>GenIA</strong> nace como una iniciativa de
            las cooperativas <strong>Farox</strong> y <strong>Cambá</strong>, con el objetivo de
            acompañar a organizaciones que buscan adoptar IA de manera controlada y segura.
          </p>
        </div>

        <div className="patio__coops" role="list" aria-label="Cooperativas detrás de GenIA">
          {COOPS.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="patio__coop"
              role="listitem"
            >
              <div className="patio__coop-logo-wrap">
                <img src={c.logo} alt={`Logo ${c.name}`} className="patio__coop-logo" />
              </div>
              <span className="patio__coop-link">
                Visitar sitio
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

