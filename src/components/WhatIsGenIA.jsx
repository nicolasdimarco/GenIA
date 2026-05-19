import { LuMap } from 'react-icons/lu'
import './WhatIsGenIA.css'

const STEPS = [
  {
    number: '01',
    title: 'Diagnóstico:',
    text: 'Evaluación de procesos, infraestructura y calidad de datos.',
  },
  {
    number: '02',
    title: 'Implementación:',
    text: 'Stack personalizado con bases de conocimiento propio.',
  },
  {
    number: '03',
    title: 'Piloto Controlado:',
    text: 'Implementación de "Quick Wins" para generar confianza interna y demostrar valor antes de escalar la solución.',
  },
  {
    number: '04',
    title: 'Desarrollo y Automatización:',
    text: 'Creación de agentes autónomos y aplicativos a medida.',
  },
  {
    number: '05',
    title: 'Acompañamiento Continuo:',
    text: 'Actualización y optimización continua por arquitectos de IA que están en la frontera del conocimiento.',
  },
]

export default function WhatIsGenIA() {
  return (
    <section id="que-es" className="whatis" aria-labelledby="whatis-heading">
      <div className="container">
        <div className="whatis__layout">
          <div className="whatis__text">
            <span className="badge badge--green">¿Cómo lo hacemos?</span>
            <h2 id="whatis-heading">
              Desarrollamos una alternativa segura, flexible y escalable de adopción de IA. 
            </h2>
            <p className="whatis__lead">
              Nos convertimos en tu socio estratégico con un enfoque que abarca el ciclo completo:
              desde el diagnóstico hasta el acompañamiento en producción.
            </p>
            <p className="whatis__body">
              El conocimiento y la experiencia que construimos quedan en tus organización.
            </p>
          </div>

          <div className="whatis__card">
            <h3 className="whatis__card-title">
              <LuMap size={20} aria-hidden="true" /> Nuestro roadmap
            </h3>
            <ul className="whatis__list" role="list">
              {STEPS.map((s) => (
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

