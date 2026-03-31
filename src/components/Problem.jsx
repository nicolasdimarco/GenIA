import './Problem.css'

const PROBLEMS = [
  {
    icon: '🔓',
    title: 'Tus datos financian a otros',
    description:
      'Cada prompt que enviás a ChatGPT o Copilot entrena los modelos de empresas privadas. Tu conocimiento interno, tus estrategias, tus datos confidenciales: todos contribuyen al capital intelectual de Big Tech.',
  },
  {
    icon: '📈',
    title: 'Costos que escalan sin control',
    description:
      'Las APIs de IA propietaria tienen precios que crecen con el uso. A medida que tu equipo adopta más herramientas, la factura crece exponencialmente — y dependés de decisiones de precios que no controlás.',
  },
  {
    icon: '🔒',
    title: 'Sin soberanía sobre tu infraestructura',
    description:
      'Si el proveedor cambia sus términos, sube precios o cierra el servicio, tu operación se detiene. La dependencia tecnológica es un riesgo real que pocas organizaciones evalúan hasta que es demasiado tarde.',
  },
  {
    icon: '⚠️',
    title: 'Riesgos regulatorios y de compliance',
    description:
      'GDPR, LGPD, y regulaciones sectoriales exigen saber dónde están tus datos y quién los procesa. Los servicios cloud de terceros generan zonas grises legales que pueden costarte muy caro.',
  },
]

export default function Problem() {
  return (
    <section id="problema" className="problem" aria-labelledby="problem-heading">
      <div className="container">
        <div className="section-header">
          <span className="badge badge--blue">El Problema</span>
          <h2 id="problem-heading">
            Depender de Big Tech no es neutral
          </h2>
          <p>
            Usar herramientas de IA propietaria tiene costos que van mucho más allá de la factura mensual.
          </p>
        </div>

        <div className="problem__grid" role="list">
          {PROBLEMS.map((item) => (
            <article
              key={item.title}
              className="problem__card"
              role="listitem"
            >
              <div className="problem__icon" aria-hidden="true">{item.icon}</div>
              <h3 className="problem__title">{item.title}</h3>
              <p className="problem__desc">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="problem__callout" role="note">
          <p>
            <strong>La realidad es simple:</strong> si no controlás tu infraestructura de IA, alguien más
            controla tus datos. Y con ellos, una parte de tu estrategia, tu ventaja competitiva y la
            privacidad de tus clientes.
          </p>
        </div>
      </div>
    </section>
  )
}

