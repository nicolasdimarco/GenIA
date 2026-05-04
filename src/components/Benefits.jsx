import { LuPlane, LuFileText, LuActivity, LuReceipt, LuServer } from 'react-icons/lu'
import './Benefits.css'

const USE_CASES = [
  {
    Icon: LuPlane,
    title: 'Navegación Aeronáutica',
    description: 'Gestión de tráfico aéreo con IA explicable (XAI) y copilotos de mantenimiento predictivo. Manuales técnicos y procedimientos consultables sin que el dato salga de la red.',
    color: 'blue',
    tag: 'EANA · Aerolíneas',
  },
  {
    Icon: LuFileText,
    title: 'Registros Cívicos',
    description: 'Automatización de trámites ciudadanos con OCR avanzado y validación de identidad biométrica local. Procesamiento de documentos sin exposición a servicios externos.',
    color: 'green',
    tag: 'Estado · Municipios',
  },
  {
    Icon: LuActivity,
    title: 'Salud y Obras Sociales',
    description: 'Auditoría médica inteligente y control de sobreprestación para blindar los recursos. Historial clínico consultable bajo jurisdicción local y cumplimiento normativo total.',
    color: 'blue',
    tag: 'Hospitales · OOSS',
  },
  {
    Icon: LuReceipt,
    title: 'Jubilaciones y Pensiones',
    description: 'Cálculos actuariales dinámicos y combate al fraude de "pensionistas fantasma". IA que procesa datos sensibles sin que ningún byte cruce fronteras.',
    color: 'green',
    tag: 'ANSES · Cajas',
  },
  {
    Icon: LuServer,
    title: 'Sistemas Legado',
    description: 'Modernización de lógica en COBOL/DB2 sin que el código salga de tu red. Documentación automática, refactorización asistida y migración controlada.',
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

