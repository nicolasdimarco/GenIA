import { LuFileText, LuActivity, LuReceipt, LuServer } from 'react-icons/lu'
import { useT } from '../i18n/LanguageContext'
import './Benefits.css'

const ICONS = [LuFileText, LuActivity, LuReceipt, LuServer]
const COLORS = ['green', 'blue', 'green', 'blue']

export default function Benefits() {
  const { t } = useT()
  return (
    <section id="beneficios" className="benefits" aria-labelledby="benefits-heading">
      <div className="container">
        <div className="section-header">
          <span className="badge badge--green">{t.benefits.badge}</span>
          <h2 id="benefits-heading">{t.benefits.title}</h2>
          <p>{t.benefits.lead}</p>
        </div>

        <div className="benefits__grid" role="list">
          {t.benefits.items.map((b, idx) => {
            const Icon = ICONS[idx]
            return (
              <article key={b.title} className={`benefits__card benefits__card--${COLORS[idx]}`} role="listitem">
                <span className="benefits__icon" aria-hidden="true"><Icon size={32} /></span>
                <div className="benefits__tag">{b.tag}</div>
                <h3 className="benefits__title">{b.title}</h3>
                <p className="benefits__desc">{b.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

