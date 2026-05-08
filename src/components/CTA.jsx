import { useState } from 'react'
import { LuCircleCheck } from 'react-icons/lu'
import './CTA.css'

export default function CTA() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', org: '', message: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'El nombre es requerido'
    if (!form.email.trim()) e.email = 'El email es requerido'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido'
    if (!form.message.trim()) e.message = 'El mensaje es requerido'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    // En producción: enviar a un backend o servicio de formulario open-source (e.g. Formbricks, Postal)
    setSubmitted(true)
  }

  return (
    <section id="contacto" className="cta" aria-labelledby="cta-heading">
      <div className="cta__bg" aria-hidden="true">
        <div className="cta__orb cta__orb--green" />
        <div className="cta__orb cta__orb--blue" />
      </div>

      <div className="container">
        <div className="cta__layout">
          <div className="cta__pitch">
            <span className="badge badge--green">Diseñá tu Estrategia</span>
            <h2 id="cta-heading">
              Es el momento de pasar de la dependencia tecnológica a la elección estratégica.
            </h2>
            <p>
              Evaluamos juntos tus procesos, infraestructura y necesidades. Construimos
              el roadmap de madurez de IA adaptado a tu realidad — sin dependencias externas
              y con retorno de inversión medible.
            </p>

            <ul className="cta__perks" aria-label="Qué incluye el primer contacto">
              {[
                'Diagnóstico de AI Readiness',
                'Propuesta de stack personalizado para tu infraestructura',
                'Estimación real de ROI y tiempo de break-even',
                'Arquitectos de IA de frontera como socios estratégicos',
                'Sin compromiso. Sin letra chica.',
              ].map((item) => (
                <li key={item}>
                  <span className="cta__perk-check" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="cta__contact-links">
              <p>También podés escribirnos directamente:</p>
              <a href="mailto:welcome@patio.coop" className="cta__email">
                welcome@patio.coop
              </a>
            </div>
          </div>

          <div className="cta__form-wrap">
            {submitted ? (
              <div className="cta__success" role="alert" aria-live="polite">
                <span className="cta__success-icon" aria-hidden="true"><LuCircleCheck size={48} /></span>
                <h3>¡Mensaje enviado!</h3>
                <p>Nos pondremos en contacto en las próximas 48 horas hábiles.</p>
              </div>
            ) : (
              <form
                className="cta__form"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Formulario de contacto"
              >
                <div className="cta__field">
                  <label htmlFor="name">Nombre completo <span aria-hidden="true">*</span></label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={!!errors.name}
                    placeholder="Tu nombre"
                    autoComplete="name"
                  />
                  {errors.name && <span id="name-error" className="cta__error" role="alert">{errors.name}</span>}
                </div>

                <div className="cta__field">
                  <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                    placeholder="tu@organización.com"
                    autoComplete="email"
                  />
                  {errors.email && <span id="email-error" className="cta__error" role="alert">{errors.email}</span>}
                </div>

                <div className="cta__field">
                  <label htmlFor="org">Organización</label>
                  <input
                    id="org"
                    name="org"
                    type="text"
                    value={form.org}
                    onChange={handleChange}
                    placeholder="Nombre de tu empresa o cooperativa"
                    autoComplete="organization"
                  />
                </div>

                <div className="cta__field">
                  <label htmlFor="message">¿Qué necesitás? <span aria-hidden="true">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    aria-invalid={!!errors.message}
                    placeholder="Contanos brevemente tu situación actual y qué querés lograr con IA..."
                  />
                  {errors.message && <span id="message-error" className="cta__error" role="alert">{errors.message}</span>}
                </div>

                <button type="submit" className="btn btn--primary cta__submit">
                  Enviar mensaje
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

