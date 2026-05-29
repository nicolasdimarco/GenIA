import { useState } from 'react'
import { LuCircleCheck } from 'react-icons/lu'
import { useT } from '../i18n/LanguageContext'
import './CTA.css'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

export default function CTA() {
  const { t, lang } = useT()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', org: '', message: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = t.cta.form.nameRequired
    if (!form.email.trim()) e.email = t.cta.form.emailRequired
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.cta.form.emailInvalid
    if (!form.message.trim()) e.message = t.cta.form.messageRequired
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    if (!WEB3FORMS_KEY) {
      setSubmitError(t.cta.form.submitError)
      return
    }
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          from_name: 'GenIA · genia.coop',
          subject: `Nuevo contacto desde genia.coop — ${form.name}`,
          name: form.name,
          email: form.email,
          organization: form.org,
          message: form.message,
          lang,
        }),
      })
      const data = await res.json()
      if (data.success) setSubmitted(true)
      else setSubmitError(t.cta.form.submitError)
    } catch {
      setSubmitError(t.cta.form.submitError)
    } finally {
      setSubmitting(false)
    }
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
            <span className="badge badge--green">{t.cta.badge}</span>
            <h2 id="cta-heading">{t.cta.title}</h2>
            <p>{t.cta.lead}</p>

            <ul className="cta__perks" aria-label={t.cta.perksAria}>
              {t.cta.perks.map((item) => (
                <li key={item}>
                  <span className="cta__perk-check" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>

{/*             <div className="cta__contact-links">
              <p>{t.cta.directContact}</p>
              <a href="mailto:hola@genia.coop" className="cta__email">
                hola@genia.coop
              </a>
            </div> */}
          </div>

          <div className="cta__form-wrap">
            {submitted ? (
              <div className="cta__success" role="alert" aria-live="polite">
                <span className="cta__success-icon" aria-hidden="true"><LuCircleCheck size={48} /></span>
                <h3>{t.cta.successTitle}</h3>
                <p>{t.cta.successBody}</p>
              </div>
            ) : (
              <form
                className="cta__form"
                onSubmit={handleSubmit}
                noValidate
                aria-label={t.cta.form.aria}
              >
                <div className="cta__field">
                  <label htmlFor="name">{t.cta.form.name} <span aria-hidden="true">*</span></label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={!!errors.name}
                    placeholder={t.cta.form.namePlaceholder}
                    autoComplete="name"
                  />
                  {errors.name && <span id="name-error" className="cta__error" role="alert">{errors.name}</span>}
                </div>

                <div className="cta__field">
                  <label htmlFor="email">{t.cta.form.email} <span aria-hidden="true">*</span></label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                    placeholder={t.cta.form.emailPlaceholder}
                    autoComplete="email"
                  />
                  {errors.email && <span id="email-error" className="cta__error" role="alert">{errors.email}</span>}
                </div>

                <div className="cta__field">
                  <label htmlFor="org">{t.cta.form.org}</label>
                  <input
                    id="org"
                    name="org"
                    type="text"
                    value={form.org}
                    onChange={handleChange}
                    placeholder={t.cta.form.orgPlaceholder}
                    autoComplete="organization"
                  />
                </div>

                <div className="cta__field">
                  <label htmlFor="message">{t.cta.form.message} <span aria-hidden="true">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    aria-invalid={!!errors.message}
                    placeholder={t.cta.form.messagePlaceholder}
                  />
                  {errors.message && <span id="message-error" className="cta__error" role="alert">{errors.message}</span>}
                </div>

                {submitError && (
                  <div className="cta__submit-error" role="alert" aria-live="polite">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn--primary cta__submit"
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? t.cta.form.submitting : t.cta.form.submit}
                  {!submitting && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

