import { LuMap } from 'react-icons/lu'
import { useT } from '../i18n/LanguageContext'
import './WhatIsGenIA.css'

export default function WhatIsGenIA() {
  const { t } = useT()
  return (
    <section id="que-es" className="whatis" aria-labelledby="whatis-heading">
      <div className="container">
        <div className="whatis__layout">
          <div className="whatis__text">
            <span className="badge badge--green">{t.whatIs.badge}</span>
            <h2 id="whatis-heading">{t.whatIs.title}</h2>
            <p className="whatis__lead">{t.whatIs.lead}</p>
            <p className="whatis__body">{t.whatIs.body}</p>
          </div>

          <div className="whatis__card">
            <h3 className="whatis__card-title">
              <LuMap size={20} aria-hidden="true" /> {t.whatIs.cardTitle}
            </h3>
            <ul className="whatis__list" role="list">
              {t.whatIs.steps.map((s) => (
                <li key={s.number} className="whatis__list-item whatis__list-item--step" role="listitem">
                  <span className="whatis__step-num" aria-hidden="true">{s.number}</span>
                  <div>
                    <strong className="whatis__step-title">{s.title}</strong>
                    <span className="whatis__step-text"> {s.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

