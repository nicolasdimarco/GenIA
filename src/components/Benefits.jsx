import { LuPlane, LuFileText, LuActivity, LuReceipt, LuServer } from 'react-icons/lu'
import './Benefits.css'

const USE_CASES = [
  {
    Icon: LuFileText,
    title: 'Instituciones',
    description: 'Mejorar la atención ciudadana, agilizar trámites y optimizar procesos internos. Alertas tempranas y mejoras de planificación.',
    color: 'green',
    tag: 'Gobierno · Instituciones',
  },
  {
    Icon: LuActivity,
    title: 'Salud y Obras Sociales',
    description: 'Implementación de modelos de visión artificial y NLP para la validación automática de recetas y órdenes médicas electrónicas. Predicción de Demanda y Recursos. Asistentes de profesionales.',
    color: 'blue',
    tag: 'Salud · OOSS',
  },
  {
    Icon: LuReceipt,
    title: 'Jubilación y Pensión',
    description: ' Gestión Inteligente de Expedientes Previsionales y detección de fraude: Agentes de IA que clasifican y priorizan solicitudes y detectan duplicidades o inconsistencias en los aportes de forma automática.',
    color: 'green',
    tag: 'ANSES · Cajas',
  },
  {
    Icon: LuServer,
    title: 'Área administrativa',
    description: 'Procesar facturas, recibos y liquidaciones de gastos consume gran parte del tiempo de los equipos administrativos. Vinculación automática con los sistemas de gestión (ERP) de la organización.',
    color: 'blue',
    tag: 'Banca · Industria',
  },
]

export default function Benefits() {
  return (
    <section id="beneficios" className="benefits" aria-labelledby="benefits-heading">
      <div className="container">
        <div className="section-header">
          <span className="badge badge--green">Casos de Uso</span>
          <h2 id="benefits-heading">Soluciones específicas para necesidades soberanas</h2>
          <p>
            Sectores donde la privacidad, la regulación y la continuidad operativa no admiten compromisos.
          </p>
        </div>

        <div className="benefits__grid" role="list">
          {USE_CASES.map((b) => (
            <article key={b.title} className={`benefits__card benefits__card--${b.color}`} role="listitem">
              <span className="benefits__icon" aria-hidden="true"><b.Icon size={32} /></span>
              <div className="benefits__tag">{b.tag}</div>
              <h3 className="benefits__title">{b.title}</h3>
              <p className="benefits__desc">{b.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

