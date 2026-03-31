import './Sovereignty.css'

const PILLARS = [
  {
    number: '01',
    title: 'Soberanía de datos',
    body: 'Tus datos nunca abandonan tu infraestructura. No hay transferencias a servidores de terceros, no hay uso de tu información para entrenar otros modelos. Control absoluto sobre lo que entra, lo que se procesa y lo que se almacena.',
    color: 'blue',
  },
  {
    number: '02',
    title: 'Soberanía de infraestructura',
    body: 'Vos elegís dónde corre la IA: en tu hardware, en un servidor privado o en una nube que controlás. Sin dependencia de plataformas cloud de terceros. Sin interrupciones por decisiones ajenas.',
    color: 'green',
  },
  {
    number: '03',
    title: 'Soberanía tecnológica',
    body: 'Todo el stack es open-source y auditable. Podés inspeccionar, modificar y extender cada componente. La tecnología trabaja para vos, no para los intereses de una corporación.',
    color: 'blue',
  },
  {
    number: '04',
    title: 'Independencia estratégica',
    body: 'Cuando no dependés de Big Tech para tu IA, tampoco dependés de sus cambios de precio, sus términos de servicio o sus decisiones de producto. Tu hoja de ruta la definís vos.',
    color: 'green',
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
          <span className="badge badge--blue">Por Qué la Soberanía Importa</span>
          <h2 id="sovereignty-heading">
            Tu infraestructura de IA es{' '}
            <span className="sovereignty__accent">infraestructura crítica</span>
          </h2>
          <p>
            La soberanía tecnológica no es una preferencia ideológica. Es una decisión estratégica
            con impacto real en tu seguridad, tus costos y tu independencia.
          </p>
        </div>

        <div className="sovereignty__pillars" role="list">
          {PILLARS.map((p) => (
            <article key={p.number} className={`sovereignty__pillar sovereignty__pillar--${p.color}`} role="listitem">
              <div className="sovereignty__number" aria-hidden="true">{p.number}</div>
              <h3 className="sovereignty__pillar-title">{p.title}</h3>
              <p className="sovereignty__pillar-body">{p.body}</p>
            </article>
          ))}
        </div>

        <blockquote className="sovereignty__quote">
          <p>
            "La tecnología debería ser privada, centrada en las personas y lista para lanzar.
            Los datos deben ser de quien los genera."
          </p>
          <cite>— Principios de Patio Community</cite>
        </blockquote>
      </div>
    </section>
  )
}

