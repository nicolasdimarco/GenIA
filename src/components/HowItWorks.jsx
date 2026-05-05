import './HowItWorks.css'

const STACK = [
  {
    num: 1,
    name: 'Hardware',
    color: 'blue',
    tools: ['Diagnóstico y recomendación a medida'],
    description: 'GPUs NVIDIA (H100/A100) o setups optimizados. Físico o cloud privado según tu caso.',
  },
  {
    num: 2,
    name: 'Motor de Inferencia',
    color: 'green',
    tools: ['Llama.cpp'],
    description: 'Inferencia optimizada para máximo rendimiento en CPU y GPU propias.',
  },
  {
    num: 3,
    name: 'Gestión',
    color: 'blue',
    tools: ['Ollama'],
    description: 'Administración eficiente de los pesos de los modelos. Actualización y control local.',
  },
  {
    num: 4,
    name: 'Modelos',
    color: 'green',
    tools: ['Llama 3.1', 'DeepSeek', 'Mistral', 'Phi-3', 'Qwen', 'Gemma'],
    description: 'El "motor" de razonamiento: LLMs de clase mundial, abiertos y auditables. Sin cajas negras.',
  },
  {
    num: 5,
    name: 'Aplicativos',
    color: 'blue',
    tools: ['Page Assist', 'M.A.I.D (mobile)', 'OpenCode'],
    description: 'IA integrada en el navegador, dispositivos móviles y entornos de desarrollo.',
  },
  {
    num: 6,
    name: 'Orquestación',
    color: 'green',
    tools: ['Langflow', 'MCP'],
    description: 'Gestión de agentes y flujos de trabajo complejos. Automatización sin código.',
  },
  {
    num: 7,
    name: 'Interfaz',
    color: 'blue',
    tools: ['OpenWebUI'],
    description: 'Acceso amigable, chat y herramientas RAG para toda la organización.',
  },
]

const TRANSVERSAL = {
  name: 'Observabilidad',
  tools: ['LangFuse'],
  description: 'Trazabilidad total de cada respuesta. Auditá, medí y optimizá el uso de IA con datos reales.',
}

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="howit" aria-labelledby="howit-heading">
      <div className="container">
        <div className="section-header">
          <span className="badge badge--blue">AI Open Stack</span>
          <h2 id="howit-heading">Arquitectura libre</h2>
          <p>
            Construimos sobre estándares abiertos. Cada capa es auditable, reemplazable
            y de tu propiedad. Sin vendor lock-in. Sin cajas negras.
          </p>
        </div>

        <div className="howit__diagram">
          <div className="howit__stack-label howit__stack-label--top">Usuario final</div>
          <div className="howit__diagram-main">
            <div className="howit__stack" role="list" aria-label="Stack de infraestructura">
              {[...STACK].reverse().map((item) => (
                <article
                  key={item.num}
                  className={`howit__layer howit__layer--${item.color}`}
                  role="listitem"
                  aria-label={`Capa ${item.num} ${item.name}`}
                >
                  <div className="howit__num" aria-hidden="true">
                    <span className="howit__num-label">CAPA</span>
                    <span className="howit__num-value">{item.num}</span>
                  </div>
                  <div className="howit__body">
                    <h3 className="howit__layer-name">{item.name}</h3>
                    <ul className="howit__tools" aria-label={`Herramientas de capa ${item.num}`}>
                      {item.tools.map((tool) => (
                        <li key={tool} className="howit__tool">{tool}</li>
                      ))}
                    </ul>
                    <p className="howit__desc">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <aside
              className="howit__transversal"
              aria-label={`Capa transversal de ${TRANSVERSAL.name}`}
            >
              <div className="howit__transversal-ribbon" aria-hidden="true">
                <span className="howit__transversal-arrow">↕</span>
                <span className="howit__transversal-ribbon-text">Transversal a todas las capas</span>
                <span className="howit__transversal-arrow">↕</span>
              </div>
              <div className="howit__transversal-content">
                <div className="howit__transversal-inner">
                  <h3 className="howit__layer-name">{TRANSVERSAL.name}</h3>
                  <ul className="howit__tools" aria-label={`Herramientas transversales`}>
                    {TRANSVERSAL.tools.map((tool) => (
                      <li key={tool} className="howit__tool">{tool}</li>
                    ))}
                  </ul>
                  <p className="howit__desc">{TRANSVERSAL.description}</p>
                </div>
              </div>
            </aside>
          </div>
          <div className="howit__stack-label howit__stack-label--bottom">Infraestructura física</div>
        </div>
      </div>
    </section>
  )
}

