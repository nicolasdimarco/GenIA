import { useT } from '../i18n/LanguageContext'
import './HowItWorks.css'

const COLORS = ['blue', 'green', 'blue', 'green', 'blue', 'green', 'blue']

export default function HowItWorks() {
  const { t } = useT()
  const layers = t.howItWorks.layers.map((l, i) => ({ ...l, num: i + 1, color: COLORS[i] }))
  const transversal = t.howItWorks.transversal
  return (
    <section id="como-funciona" className="howit" aria-labelledby="howit-heading">
      <div className="container">
        <div className="section-header">
          <span className="badge badge--blue">{t.howItWorks.badge}</span>
          <h2 id="howit-heading">{t.howItWorks.title}</h2>
          <p>{t.howItWorks.lead}</p>
        </div>

        <div className="howit__diagram">
          <div className="howit__stack-label howit__stack-label--top">{t.howItWorks.topLabel}</div>
          <div className="howit__diagram-main">
            <div className="howit__stack" role="list" aria-label={t.howItWorks.badge}>
              {[...layers].reverse().map((item) => (
                <article
                  key={item.num}
                  className={`howit__layer howit__layer--${item.color}`}
                  role="listitem"
                  aria-label={`${t.howItWorks.layerWord} ${item.num} ${item.name}`}
                >
                  <div className="howit__num" aria-hidden="true">
                    <span className="howit__num-label">{t.howItWorks.layerWord}</span>
                    <span className="howit__num-value">{item.num}</span>
                  </div>
                  <div className="howit__body">
                    <h3 className="howit__layer-name">{item.name}</h3>
                    <ul className="howit__tools">
                      {item.tools.map((tool) => (
                        <li key={tool} className="howit__tool">{tool}</li>
                      ))}
                    </ul>
                    <p className="howit__desc">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <aside className="howit__transversal" aria-label={transversal.name}>
              <div className="howit__transversal-ribbon" aria-hidden="true">
                <span className="howit__transversal-arrow">↕</span>
                <span className="howit__transversal-ribbon-text">{t.howItWorks.transversalLabel}</span>
                <span className="howit__transversal-arrow">↕</span>
              </div>
              <div className="howit__transversal-content">
                <div className="howit__transversal-inner">
                  <h3 className="howit__layer-name">{transversal.name}</h3>
                  <ul className="howit__tools">
                    {transversal.tools.map((tool) => (
                      <li key={tool} className="howit__tool">{tool}</li>
                    ))}
                  </ul>
                  <p className="howit__desc">{transversal.description}</p>
                </div>
              </div>
            </aside>
          </div>
          <div className="howit__stack-label howit__stack-label--bottom">{t.howItWorks.bottomLabel}</div>
        </div>
      </div>
    </section>
  )
}

