import './HowItWorks.css'

const STACK = [
  {
    layer: 'Interfaz',
    color: 'blue',
    tools: ['OpenWebUI (RAG + Tools)', 'Page Assist (plugin)', 'M.A.I.D (mobile)'],
    description: 'Interfaces de chat multimodal con soporte para documentos, herramientas y uso móvil.',
  },
  {
    layer: 'Agentes',
    color: 'green',
    tools: ['OpenCode', 'Langflow', 'MCP'],
    description: 'Agentes autónomos para automatización de tareas, código y flujos de trabajo complejos.',
  },
  {
    layer: 'Modelos',
    color: 'blue',
    tools: ['Qwen', 'DeepSeek', 'Phi-3', 'Mistral', 'Gemma', 'LLaMA'],
    description: 'Modelos de lenguaje abiertos y auditables. Sin cajas negras, sin dependencia de APIs externas.',
  },
  {
    layer: 'Inferencia',
    color: 'green',
    tools: ['Llama.cpp (CPU + GPU)', 'Ollama'],
    description: 'Motor de inferencia optimizado que corre en hardware propio, con gestión de modelos local.',
  },
  {
    layer: 'Observabilidad',
    color: 'blue',
    tools: ['LangFuse'],
    description: 'Trazabilidad completa de cada interacción. Auditá, medí y optimizá el uso de IA.',
  },
  {
    layer: 'Hardware',
    color: 'green',
    tools: ['2× GPU RTX 3090 24GB'],
    description: 'Infraestructura propia escalable. Más capacidad cuando la necesitás, sin costos variables.',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="howit" aria-labelledby="howit-heading">
      <div className="container">
        <div className="section-header">
          <span className="badge badge--blue">Cómo Funciona</span>
          <h2 id="howit-heading">El stack abierto de BestIA</h2>
          <p>
            Cada capa usa herramientas open-source probadas en producción.
            Sin vendor lock-in. Sin cajas negras.
          </p>
        </div>

        <div className="howit__grid" role="list">
          {STACK.map((item) => (
            <article key={item.layer} className={`howit__card howit__card--${item.color}`} role="listitem">
              <div className="howit__layer-badge">{item.layer}</div>
              <ul className="howit__tools" aria-label={`Herramientas de ${item.layer}`}>
                {item.tools.map((tool) => (
                  <li key={tool} className="howit__tool">{tool}</li>
                ))}
              </ul>
              <p className="howit__desc">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

