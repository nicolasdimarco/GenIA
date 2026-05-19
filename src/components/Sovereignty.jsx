// import CostCalculator from './CostCalculator'
import { useT } from '../i18n/LanguageContext'
import './Sovereignty.css'

const COLORS = ['blue', 'green', 'blue']

export default function Sovereignty() {
  const { t } = useT()
  return (
    <section id="soberania" className="sovereignty" aria-labelledby="sovereignty-heading">
      <div className="sovereignty__bg" aria-hidden="true">
        <div className="sovereignty__orb sovereignty__orb--blue" />
        <div className="sovereignty__orb sovereignty__orb--green" />
      </div>

      <div className="container">
        <div className="section-header">
          <span className="badge badge--blue">{t.sovereignty.badge}</span>
          <h2 id="sovereignty-heading">
            {t.sovereignty.titleStart}{' '} <br />
            <span className="sovereignty__accent">{t.sovereignty.titleAccent}</span>
          </h2>
          <p>{t.sovereignty.lead}</p>
        </div>

        <div className="sovereignty__pillars" role="list">
          {t.sovereignty.items.map((p, idx) => (
            <article key={p.number} className={`sovereignty__pillar sovereignty__pillar--${COLORS[idx]}`} role="listitem">
              <div className="sovereignty__roi-metric">
                <span className="sovereignty__roi-number">{p.metric}</span>
                <span className="sovereignty__roi-label">{p.metricLabel}</span>
              </div>
              <h3 className="sovereignty__pillar-title">{p.title}</h3>
              <p className="sovereignty__pillar-body">{p.body}</p>
            </article>
          ))}
        </div>

        {/* <CostCalculator /> */}
      </div>
    </section>
  )
}

