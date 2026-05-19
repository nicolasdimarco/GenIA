import { LuScale, LuTrendingUp, LuShieldOff, LuLock } from 'react-icons/lu'
import { useT } from '../i18n/LanguageContext'
import './Problem.css'

const ICONS = [LuScale, LuTrendingUp, LuShieldOff, LuLock]

export default function Problem() {
  const { t } = useT()
  return (
    <section id="problema" className="problem" aria-labelledby="problem-heading">
      <div className="container">
        <div className="section-header">
          <span className="badge badge--blue">{t.problem.badge}</span>
          <h2 id="problem-heading">{t.problem.title}</h2>
          <p>{t.problem.lead}</p>
        </div>

        <div className="problem__grid" role="list">
          {t.problem.items.map((item, idx) => {
            const Icon = ICONS[idx]
            return (
              <article key={item.title} className="problem__card" role="listitem">
                <div className="problem__icon" aria-hidden="true"><Icon size={32} /></div>
                <h3 className="problem__title">{item.title}</h3>
                <p className="problem__desc">{item.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

