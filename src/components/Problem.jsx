import { LuScale, LuTrendingUp, LuShieldOff, LuLock, LuCompass } from 'react-icons/lu'
import './Problem.css'

const PROBLEMS = [
  {
    Icon: LuScale,
    title: 'Riesgo Legal',
    description:
      'Utilizando herramientas mainstream de proveedores externos, tus datos están sujetos a la legislación local de donde se encuentren los servidores físicos que contratas, que permite a autoridades extranjeras acceder a tu información confidencial sin notificarte.',
  },
  {
    Icon: LuTrendingUp,
    title: 'Riesgo presupuestario',
    description:
      'Los modelos de pago por token conllevan un costo impredecible porque escalan exponencialmente con el uso. A mayor adopción, mayor dependencia y mayor costo, sin que puedas controlarlo.',
  },
  {
    Icon: LuShieldOff,
    title: 'Exfiltración de datos',
    description:
      'El 93% de los empleados suele pegar información sensible de la empresa en herramientas de IA externas. Estrategias, datos de clientes, código propietario: todo sale de tu organización sin dejar rastro.',
  },
  {
    Icon: LuLock,
    title: 'Dependencia total del proveedor',
    description:
      'Si tu proveedor cambia los términos, aumenta los precios o discontinúa el servicio, tu operación queda rehén. Una decisión ajena puede paralizar procesos críticos de tu organización de un día para el otro.',
  },
]

export default function Problem() {
  return (
    <section id="problema" className="problem" aria-labelledby="problem-heading">
      <div className="container">
        <div className="section-header">
          <span className="badge badge--blue">El Problema que Resolvemos</span>
          <h2 id="problem-heading">
            ¿Tu organización navega sin brújula la adopción de IA?
          </h2>
          <p>
            Incorporar IA sin una estrategia clara expone a tu organización a riesgos legales,
            presupuestarios y operativos que pocas veces se evalúan antes de que sea demasiado tarde.
          </p>
        </div>

        <div className="problem__grid" role="list">
          {PROBLEMS.map((item) => (
            <article
              key={item.title}
              className="problem__card"
              role="listitem"
            >
              <div className="problem__icon" aria-hidden="true"><item.Icon size={32} /></div>
              <h3 className="problem__title">{item.title}</h3>
              <p className="problem__desc">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="problem__callout" role="note">
          <p>
            <strong>Sin estrategia propia, sin competitividad</strong> No contar con una estrategia de IA organizada es en sí mismo un riesgo. Diseñemos tu estrategia.
          </p>
        </div>
      </div>
    </section>
  )
}

