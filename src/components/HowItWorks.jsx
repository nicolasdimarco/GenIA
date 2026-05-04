import './HowItWorks.css'

const STACK = [
  {
    layer: 'Capa 1 · Hardware',
    color: 'blue',
    tools: ['Diagnóstico y recomendación a medida'],
    description: 'GPUs NVIDIA (H100/A100) o setups optimizados. Físico o cloud privado según tu caso.',
  },
  {
    layer: 'Capa 2 · Motor de Inferencia',
    color: 'green',
    tools: ['Llama.cpp'],
    description: 'Inferencia optimizada para máximo rendimiento en CPU y GPU propias.',
  },
  {
    layer: 'Capa 3 · Gestión',
    color: 'blue',
    tools: ['Ollama'],
    description: 'Administración eficiente de los pesos de los modelos. Actualización y control local.',
  },
  {
    layer: 'Capa 4 · Modelos',
    color: 'green',
    tools: ['Llama 3.1', 'DeepSeek', 'Mistral', 'Phi-3', 'Qwen', 'Gemma'],
    description: 'El "motor" de razonamiento: LLMs de clase mundial, abiertos y auditables. Sin cajas negras.',
  },
  {
    layer: 'Capa 5 · Aplicativos',
    color: 'blue',
    tools: ['Page Assist', 'M.A.I.D (mobile)', 'OpenCode'],
    description: 'IA integrada en el navegador, dispositivos móviles y entornos de desarrollo.',
  },
  {
    layer: 'Capa 6 · Orquestación',
    color: 'green',
    tools: ['Langflow', 'MCP'],
    description: 'Gestión de agentes y flujos de trabajo complejos. Automatización sin código.',
  },
  {
    layer: 'Capa 7 · Interfaz',
    color: 'blue',
    tools: ['OpenWebUI'],
    description: 'Acceso amigable, chat y herramientas RAG para toda la organización.',
  },
  {
    layer: 'Transversal · Observabilidad',
    color: 'green',
    tools: ['LangFuse'],
    description: 'Trazabilidad total de cada respuesta. Auditá, medí y optimizá el uso de IA con datos reales.',
  },
]

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

