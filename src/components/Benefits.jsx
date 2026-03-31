import './Benefits.css'

const BENEFITS = [
  {
    icon: '🎨',
    title: 'Multimodalidad real',
    description: 'Texto, código, imágenes y audio en un mismo stack. IA que resuelve tareas complejas sin saltar entre herramientas.',
    color: 'blue',
  },
  {
    icon: '💰',
    title: 'Reducción de costos',
    description: 'Modelos abiertos en hardware propio. El costo marginal de cada consulta se acerca a cero una vez instalado.',
    color: 'green',
  },
  {
    icon: '🔐',
    title: 'Control total',
    description: 'Tus datos nunca salen de tu infraestructura. Seguridad robusta y control de acceso granular en todo el stack.',
    color: 'blue',
  },
  {
    icon: '📈',
    title: 'Arquitectura escalable',
    description: 'Empezá chico y escalá. GPU y memoria on-demand. Adaptado a tu crecimiento, no al de los planes del proveedor.',
    color: 'green',
  },
  {
    icon: '🤖',
    title: 'Agentes autónomos',
    description: 'Automatizá tareas internas con agentes que integran tus sistemas, documentos y flujos de trabajo existentes.',
    color: 'blue',
  },
  {
    icon: '🔗',
    title: 'Interoperabilidad',
    description: 'APIs estándar que se integran con tu stack actual. Compatible con los principales frameworks y herramientas open-source.',
    color: 'green',
  },
  {
    icon: '📚',
    title: 'RAG con datos propios',
    description: 'Consultá documentos internos, wikis y bases de conocimiento. IA que sabe lo que sabe tu organización.',
    color: 'blue',
  },
  {
    icon: '👁️',
    title: 'Observabilidad total',
    description: 'Trazabilidad completa de cada interacción. Auditá, medí el impacto y optimizá el uso de IA con datos reales.',
    color: 'green',
  },
]

export default function Benefits() {
  return (
    <section id="beneficios" className="benefits" aria-labelledby="benefits-heading">
      <div className="container">
        <div className="section-header">
          <span className="badge badge--green">Beneficios Clave</span>
          <h2 id="benefits-heading">Todo lo que ganás al adoptar BestIA</h2>
          <p>
            Valor concreto, probado en dos años de uso real dentro de una red de más de 117 cooperativas.
          </p>
        </div>

        <div className="benefits__grid" role="list">
          {BENEFITS.map((b) => (
            <article key={b.title} className={`benefits__card benefits__card--${b.color}`} role="listitem">
              <span className="benefits__icon" aria-hidden="true">{b.icon}</span>
              <h3 className="benefits__title">{b.title}</h3>
              <p className="benefits__desc">{b.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

