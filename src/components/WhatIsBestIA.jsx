import './WhatIsBestIA.css'

const MOTIVATIONS = [
  { text: 'Construir capacidades internas de IA sin depender de terceros' },
  { text: 'Reemplazar ChatGPT, Poe y Copilot con herramientas propias' },
  { text: 'Priorizar software open-source y modelos abiertos' },
  { text: 'Reflexionar sobre tecnología alineada con nuestros valores' },
  { text: 'Aumentar la autonomía respecto a las grandes tecnológicas' },
]

export default function WhatIsBestIA() {
  return (
    <section id="que-es" className="whatis" aria-labelledby="whatis-heading">
      <div className="container">
        <div className="whatis__layout">
          <div className="whatis__text">
            <span className="badge badge--green">Qué es BestIA</span>
            <h2 id="whatis-heading">
              Dos años construyendo IA soberana en producción
            </h2>
            <p className="whatis__lead">
              BestIA es el resultado de un proceso real de <strong>Patio Community</strong> —
              la red internacional de cooperativas tecnológicas — para dejar de depender de
              la IA de Big Tech y construir su propia alternativa open-source.
            </p>
            <p className="whatis__body">
              No es un prototipo ni una promesa. Es un stack probado, con casos de uso reales,
              corriendo en hardware propio, con control total de datos e infraestructura.
              Hoy ofrecemos esa experiencia y conocimiento a organizaciones que quieren
              dar el mismo paso.
            </p>
          </div>

          <div className="whatis__card">
            <h3 className="whatis__card-title">
              <span aria-hidden="true">🎯</span> Motivaciones que nos impulsaron
            </h3>
            <ul className="whatis__list" role="list">
              {MOTIVATIONS.map((m) => (
                <li key={m.text} className="whatis__list-item" role="listitem">
                  <span className="whatis__check" aria-hidden="true">✓</span>
                  <span>{m.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

