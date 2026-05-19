// import CostCalculator from './CostCalculator'
import './Sovereignty.css'

const ROI_ITEMS = [
  {
    number: '01',
    title: 'Menos Costos Operativos',
    body: 'Los proyectos de automatización suelen alcanzar el punto de equilibrio (break-even) en menos de 6 meses. Cada proceso automatizado libera tiempo y reduce costos fijos de forma permanente.',
    color: 'blue',
    metric: '< 6 meses',
    metricLabel: 'hasta el break-even',
  },
  {
    number: '02',
    title: 'Ahorro en Inferencia',
    body: 'Una vez amortizado el hardware, el costo marginal por consulta es efectivamente cero. Sin suscripciones mensuales por usuario ni costos por token que escalen con el uso.',
    color: 'green',
    metric: '≈ $0',
    metricLabel: 'costo marginal por consulta',
  },
  {
    number: '03',
    title: 'Eficiencia y Productividad',
    body: 'Latencia reducida, sin dependencias externas y disponibilidad continua para procesos críticos. Automatizá con mayor velocidad, estabilidad y control sin trasladar eficiencia a terceros.',
    color: 'blue',
    metric: '100%',
    metricLabel: 'control de disponibilidad',
  },
]

export default function Sovereignty() {
  return (
    <section id="soberania" className="sovereignty" aria-labelledby="sovereignty-heading">
      <div className="sovereignty__bg" aria-hidden="true">
        <div className="sovereignty__orb sovereignty__orb--blue" />
        <div className="sovereignty__orb sovereignty__orb--green" />
      </div>

      <div className="container">
        <div className="section-header">
          <span className="badge badge--blue">Retorno de Inversión</span>
          <h2 id="sovereignty-heading">
            Una estrategia propia de IA no es un gasto,{' '} <br />
            <span className="sovereignty__accent">es un activo financiero</span>
          </h2>
          <p>
            La IA soberana genera retornos concretos y medibles desde los primeros meses.
            Calculá el impacto real en tu organización.
          </p>
        </div>

        <div className="sovereignty__pillars" role="list">
          {ROI_ITEMS.map((p) => (
            <article key={p.number} className={`sovereignty__pillar sovereignty__pillar--${p.color}`} role="listitem">
              <div className="sovereignty__roi-metric">
                <span className="sovereignty__roi-number">{p.metric}</span>
                <span className="sovereignty__roi-label">{p.metricLabel}</span>
              </div>
              <h3 className="sovereignty__pillar-title">{p.title}</h3>
              <p className="sovereignty__pillar-body">{p.body}</p>
            </article>
          ))}
        </div>

        {/* <CostCalculator /> */}
      </div>
    </section>
  )
}

