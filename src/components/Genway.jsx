import { LuGauge, LuLockKeyhole, LuShuffle, LuShieldCheck, LuChevronRight } from 'react-icons/lu'
import { useT } from '../i18n/LanguageContext'
import './Genway.css'

const ICONS = [LuGauge, LuLockKeyhole, LuShuffle, LuShieldCheck]
const COLORS = ['blue', 'green', 'blue', 'green']

export default function Genway() {
  const { t } = useT()
  const d = t.genway.diagram

  return (
    <section id="genway" className="genway" aria-labelledby="genway-heading">
      <div className="genway__bg" aria-hidden="true">
        <div className="genway__orb genway__orb--blue" />
        <div className="genway__orb genway__orb--green" />
      </div>

      <div className="container">
        <div className="section-header">
          <span className="badge badge--blue">{t.genway.badge}</span>
          <h2 id="genway-heading">{t.genway.title}</h2>
          <p>{t.genway.lead}</p>
        </div>

        {/* --- Flow diagram: Org -> Genway -> Models --- */}
        <div className="genway__flow" role="img" aria-label={`${d.orgLabel} → ${d.hubLabel} → ${d.modelsLabel}`}>
          <div className="genway__flow-node genway__flow-node--org">
            <div className="genway__flow-circle genway__flow-circle--org">
              <span className="genway__flow-node-label genway__flow-node-label--org">{d.orgLabel}</span>
              <span className="genway__flow-node-sub">{d.orgSub}</span>
            </div>
          </div>

          <div className="genway__flow-arrow" aria-hidden="true">
            <LuChevronRight className="genway__flow-arrow-icon genway__flow-arrow-icon--1" size={22} />
            <LuChevronRight className="genway__flow-arrow-icon genway__flow-arrow-icon--2" size={22} />
            <LuChevronRight className="genway__flow-arrow-icon genway__flow-arrow-icon--3" size={22} />
          </div>

          <div className="genway__flow-node genway__flow-node--hub">
            <div className="genway__flow-circle genway__flow-circle--hub">
              <span className="genway__flow-hub-ring" aria-hidden="true" />
              <span className="genway__flow-node-label genway__flow-node-label--hub">{d.hubLabel}</span>
              <span className="genway__flow-node-sub">{d.hubSub}</span>
            </div>
          </div>

          <div className="genway__flow-arrow" aria-hidden="true">
            <LuChevronRight className="genway__flow-arrow-icon genway__flow-arrow-icon--1" size={22} />
            <LuChevronRight className="genway__flow-arrow-icon genway__flow-arrow-icon--2" size={22} />
            <LuChevronRight className="genway__flow-arrow-icon genway__flow-arrow-icon--3" size={22} />
          </div>

          <div className="genway__flow-node genway__flow-node--models">
            <div className="genway__flow-circle genway__flow-circle--models">
              <span className="genway__flow-node-label">{d.modelsLabel}</span>
              <div className="genway__flow-chips">
                {d.models.map((m) => (
                  <span key={m} className="genway__flow-chip">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- Timeline of capabilities --- */}
        <div className="genway__timeline" role="list">
          {t.genway.items.map((item, idx) => {
            const Icon = ICONS[idx]
            return (
              <article
                key={item.title}
                className={`genway__timeline-item genway__timeline-item--${COLORS[idx]}`}
                role="listitem"
              >
                <div className="genway__timeline-marker" aria-hidden="true">
                  <Icon size={20} />
                </div>
                <div className="genway__timeline-content">
                  <span className="genway__timeline-tag">{item.tag}</span>
                  <h3 className="genway__timeline-title">{item.title}</h3>
                  <p className="genway__timeline-desc">{item.description}</p>
                </div>
              </article>
            )
          })}
        </div>

        <div className="genway__cta">
          <h3 className="genway__cta-title">{t.genway.cta.title}</h3>
          <p className="genway__cta-lead">{t.genway.cta.lead}</p>
          <a href="#contacto" className="btn btn--primary">
            {t.genway.cta.button}
          </a>
        </div>
      </div>
    </section>
  )
}
