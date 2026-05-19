import { useMemo, useState } from 'react'
import './CostCalculator.css'

const ADOPTION_PRESETS = {
  basic_assistive: {
    label: 'Asistencia básica',
    description: 'Redacción, resúmenes, emails, respuestas internas',
    requestsPerUserPerDay: 10,
    avgInputTokensPerRequest: 1500,
    avgOutputTokensPerRequest: 500,
  },
  departmental_workflows: {
    label: 'Workflows departamentales',
    description: 'Automatización parcial en ventas, soporte, operaciones',
    requestsPerUserPerDay: 25,
    avgInputTokensPerRequest: 3500,
    avgOutputTokensPerRequest: 1500,
  },
  customer_support: {
    label: 'Soporte al cliente',
    description: 'Atención automatizada, chatbot, FAQ, tickets',
    requestsPerUserPerDay: 60,
    avgInputTokensPerRequest: 2200,
    avgOutputTokensPerRequest: 800,
  },
  document_heavy: {
    label: 'Documentación intensiva',
    description: 'Análisis de PDFs, contratos, reportes, documentación',
    requestsPerUserPerDay: 20,
    avgInputTokensPerRequest: 17000,
    avgOutputTokensPerRequest: 3000,
  },
  agentic_automation: {
    label: 'Automatización agéntica',
    description: 'Agentes que consultan herramientas, RAG, CRM, ERP',
    requestsPerUserPerDay: 40,
    avgInputTokensPerRequest: 40000,
    avgOutputTokensPerRequest: 10000,
  },
  custom: {
    label: 'Personalizado',
    description: 'Definí los valores manualmente',
    requestsPerUserPerDay: 20,
    avgInputTokensPerRequest: 3000,
    avgOutputTokensPerRequest: 1000,
  },
}

const MODEL_PRESETS = {
  low: {
    label: 'Modelo económico',
    description: 'Clasificación, FAQs, resúmenes simples',
    inputPricePerMillion: 0.25,
    outputPricePerMillion: 1.5,
  },
  medium: {
    label: 'Modelo medio',
    description: 'Soporte, análisis, generación cuidada',
    inputPricePerMillion: 2,
    outputPricePerMillion: 8,
  },
  high: {
    label: 'Modelo premium',
    description: 'Reasoning, código, decisiones complejas',
    inputPricePerMillion: 5,
    outputPricePerMillion: 25,
  },
  custom: {
    label: 'Personalizado',
    description: 'Definí los precios por millón de tokens',
    inputPricePerMillion: 1,
    outputPricePerMillion: 5,
  },
}

const DEFAULT_INPUTS = {
  organizationUsers: 100,
  activeUserRatio: 0.6,
  adoptionLevel: 'departmental_workflows',
  complexityLevel: 'medium',
  customRequestsPerUserPerDay: 20,
  customAvgInputTokensPerRequest: 3000,
  customAvgOutputTokensPerRequest: 1000,
  customInputPricePerMillion: 1,
  customOutputPricePerMillion: 5,
  businessDaysPerMonth: 22,
  gpuServerPurchaseCost: 45000,
  serverUsefulLifeMonths: 36,
  monthlyElectricityCost: 300,
  monthlyHostingCost: 500,
  monthlyMaintenanceCost: 500,
  monthlyOpsCost: 3000,
}

function calculate(inputs) {
  const adoption = inputs.adoptionLevel === 'custom'
    ? {
        requestsPerUserPerDay: inputs.customRequestsPerUserPerDay,
        avgInputTokensPerRequest: inputs.customAvgInputTokensPerRequest,
        avgOutputTokensPerRequest: inputs.customAvgOutputTokensPerRequest,
      }
    : ADOPTION_PRESETS[inputs.adoptionLevel]

  const model = inputs.complexityLevel === 'custom'
    ? {
        inputPricePerMillion: inputs.customInputPricePerMillion,
        outputPricePerMillion: inputs.customOutputPricePerMillion,
      }
    : MODEL_PRESETS[inputs.complexityLevel]

  const activeUsers = inputs.organizationUsers * inputs.activeUserRatio
  const monthlyRequests = activeUsers * adoption.requestsPerUserPerDay * inputs.businessDaysPerMonth
  const monthlyInputTokens = monthlyRequests * adoption.avgInputTokensPerRequest
  const monthlyOutputTokens = monthlyRequests * adoption.avgOutputTokensPerRequest
  const monthlyTotalTokens = monthlyInputTokens + monthlyOutputTokens

  const apiMonthlyCost =
    (monthlyInputTokens / 1_000_000) * model.inputPricePerMillion +
    (monthlyOutputTokens / 1_000_000) * model.outputPricePerMillion
  const apiAnnualCost = apiMonthlyCost * 12

  const monthlyHardwareAmortization = inputs.gpuServerPurchaseCost / inputs.serverUsefulLifeMonths
  const selfHostedMonthlyCost =
    monthlyHardwareAmortization +
    inputs.monthlyElectricityCost +
    inputs.monthlyHostingCost +
    inputs.monthlyMaintenanceCost +
    inputs.monthlyOpsCost
  const selfHostedAnnualCost = selfHostedMonthlyCost * 12

  const monthlyDifference = apiMonthlyCost - selfHostedMonthlyCost
  const breakEvenMonths =
    monthlyDifference > 0 ? inputs.gpuServerPurchaseCost / monthlyDifference : null

  const costPerActiveUser = activeUsers > 0 ? apiMonthlyCost / activeUsers : 0
  const costPerEmployee = inputs.organizationUsers > 0 ? apiMonthlyCost / inputs.organizationUsers : 0

  let recommendation
  if (apiMonthlyCost < selfHostedMonthlyCost) {
    recommendation = { tone: 'blue', label: 'Conviene API por token', message: 'Para este volumen, conviene pagar por tokens.' }
  } else if (breakEvenMonths != null && breakEvenMonths <= 12) {
    recommendation = { tone: 'green', label: 'Conviene self-hosted', message: 'A este volumen, self-hosted podría ser competitivo en menos de un año.' }
  } else {
    recommendation = { tone: 'neutral', label: 'Depende del horizonte', message: 'Self-hosted podría ahorrar a largo plazo, pero requiere escala y operación técnica.' }
  }

  return { activeUsers, monthlyRequests, monthlyInputTokens, monthlyOutputTokens, monthlyTotalTokens, apiMonthlyCost, apiAnnualCost, selfHostedMonthlyCost, selfHostedAnnualCost, monthlyDifference, breakEvenMonths, costPerActiveUser, costPerEmployee, recommendation }
}


const currencyFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const numberFmt = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 })

function NumberField({ label, value, onChange, min = 0, step = 1, suffix, hint }) {
  return (
    <label className="calc__field">
      <span className="calc__field-label">{label}</span>
      <span className="calc__field-input">
        <input type="number" value={value} min={min} step={step} onChange={onChange} />
        {suffix && <span className="calc__field-suffix">{suffix}</span>}
      </span>
      {hint && <span className="calc__field-hint">{hint}</span>}
    </label>
  )
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="calc__field">
      <span className="calc__field-label">{label}</span>
      <select className="calc__field-select" value={value} onChange={onChange}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  )
}

export default function CostCalculator() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS)
  const result = useMemo(() => calculate(inputs), [inputs])

  const update = (key) => (e) => setInputs((prev) => ({ ...prev, [key]: Number(e.target.value) }))
  const updateRaw = (key) => (e) => setInputs((prev) => ({ ...prev, [key]: e.target.value }))

  const adoptionIsCustom = inputs.adoptionLevel === 'custom'
  const modelIsCustom = inputs.complexityLevel === 'custom'

  const maxCost = Math.max(result.apiMonthlyCost, result.selfHostedMonthlyCost, 1)
  const apiBarWidth = `${(result.apiMonthlyCost / maxCost) * 100}%`
  const selfBarWidth = `${(result.selfHostedMonthlyCost / maxCost) * 100}%`

  return (
    <div className="calc" id="calculadora">
      <div className="calc__header">
        <span className="badge badge--green">Calculadora interactiva</span>
        <h3 className="calc__title">¿API por token o infraestructura propia?</h3>
        <p className="calc__subtitle">
          Estimá el costo mensual y anual de usar IA vía APIs paga-por-token y compará con una alternativa self-hosted.
        </p>
      </div>

      <div className="calc__layout">
        <form className="calc__form" onSubmit={(e) => e.preventDefault()}>
          <fieldset className="calc__group">
            <legend>Tu organización</legend>
            <NumberField label="Personas que usarían IA" value={inputs.organizationUsers} onChange={update('organizationUsers')} min={1} />
            <label className="calc__field">
              <span className="calc__field-label">Usuarios activos <strong>{Math.round(inputs.activeUserRatio * 100)}%</strong></span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={inputs.activeUserRatio}
                onChange={(e) => setInputs((p) => ({ ...p, activeUserRatio: Number(e.target.value) }))}
              />
            </label>
            <NumberField label="Días hábiles por mes" value={inputs.businessDaysPerMonth} onChange={update('businessDaysPerMonth')} min={1} />
          </fieldset>

          <fieldset className="calc__group">
            <legend>Nivel de adopción</legend>
            <SelectField
              label="Tipo de uso"
              value={inputs.adoptionLevel}
              onChange={updateRaw('adoptionLevel')}
              options={Object.entries(ADOPTION_PRESETS).map(([value, p]) => ({ value, label: p.label }))}
            />
            <p className="calc__hint">{ADOPTION_PRESETS[inputs.adoptionLevel].description}</p>
            {adoptionIsCustom && (
              <>
                <NumberField label="Requests por usuario/día" value={inputs.customRequestsPerUserPerDay} onChange={update('customRequestsPerUserPerDay')} min={1} />
                <NumberField label="Tokens de input por request" value={inputs.customAvgInputTokensPerRequest} onChange={update('customAvgInputTokensPerRequest')} min={1} step={100} />
                <NumberField label="Tokens de output por request" value={inputs.customAvgOutputTokensPerRequest} onChange={update('customAvgOutputTokensPerRequest')} min={1} step={100} />
              </>
            )}
          </fieldset>

          <fieldset className="calc__group">
            <legend>Complejidad / modelo</legend>
            <SelectField
              label="Nivel de complejidad"
              value={inputs.complexityLevel}
              onChange={updateRaw('complexityLevel')}
              options={Object.entries(MODEL_PRESETS).map(([value, p]) => ({ value, label: p.label }))}
            />
            <p className="calc__hint">{MODEL_PRESETS[inputs.complexityLevel].description}</p>
            {modelIsCustom && (
              <>
                <NumberField label="Precio input (USD por 1M tokens)" value={inputs.customInputPricePerMillion} onChange={update('customInputPricePerMillion')} min={0} step={0.05} />
                <NumberField label="Precio output (USD por 1M tokens)" value={inputs.customOutputPricePerMillion} onChange={update('customOutputPricePerMillion')} min={0} step={0.05} />
              </>
            )}
          </fieldset>

          <fieldset className="calc__group">
            <legend>Infraestructura self-hosted</legend>
            <NumberField label="Costo del servidor GPU (USD)" value={inputs.gpuServerPurchaseCost} onChange={update('gpuServerPurchaseCost')} min={0} step={500} />
            <NumberField label="Vida útil del servidor (meses)" value={inputs.serverUsefulLifeMonths} onChange={update('serverUsefulLifeMonths')} min={1} />
            <NumberField label="Electricidad mensual (USD)" value={inputs.monthlyElectricityCost} onChange={update('monthlyElectricityCost')} min={0} step={10} />
            <NumberField label="Hosting / DC mensual (USD)" value={inputs.monthlyHostingCost} onChange={update('monthlyHostingCost')} min={0} step={10} />
            <NumberField label="Mantenimiento mensual (USD)" value={inputs.monthlyMaintenanceCost} onChange={update('monthlyMaintenanceCost')} min={0} step={10} />
            <NumberField label="Operación / equipo mensual (USD)" value={inputs.monthlyOpsCost} onChange={update('monthlyOpsCost')} min={0} step={100} />
          </fieldset>
        </form>

        <div className="calc__results">
          <div className="calc__cards">
            <article className="calc__card calc__card--api">
              <header className="calc__card-header">
                <span className="calc__card-tag">API por token</span>
                <h4 className="calc__card-title">Costo usando APIs</h4>
              </header>
              <div className="calc__card-metric">
                <span className="calc__card-value">{currencyFmt.format(result.apiMonthlyCost)}</span>
                <span className="calc__card-unit">/ mes</span>
              </div>
              <dl className="calc__card-details">
                <div><dt>Anual</dt><dd>{currencyFmt.format(result.apiAnnualCost)}</dd></div>
                <div><dt>Por usuario activo</dt><dd>{currencyFmt.format(result.costPerActiveUser)} / mes</dd></div>
                <div><dt>Por empleado</dt><dd>{currencyFmt.format(result.costPerEmployee)} / mes</dd></div>
                <div><dt>Tokens / mes</dt><dd>{numberFmt.format(result.monthlyTotalTokens)}</dd></div>
              </dl>
            </article>

            <article className="calc__card calc__card--self">
              <header className="calc__card-header">
                <span className="calc__card-tag">Self-hosted</span>
                <h4 className="calc__card-title">Costo infraestructura propia</h4>
              </header>
              <div className="calc__card-metric">
                <span className="calc__card-value">{currencyFmt.format(result.selfHostedMonthlyCost)}</span>
                <span className="calc__card-unit">/ mes</span>
              </div>
              <dl className="calc__card-details">
                <div><dt>Anual</dt><dd>{currencyFmt.format(result.selfHostedAnnualCost)}</dd></div>
                <div><dt>Amortización hardware</dt><dd>{currencyFmt.format(inputs.gpuServerPurchaseCost / inputs.serverUsefulLifeMonths)} / mes</dd></div>
                <div><dt>Diferencia vs API</dt><dd>{result.monthlyDifference >= 0 ? '+' : ''}{currencyFmt.format(result.monthlyDifference)} / mes</dd></div>
                <div><dt>Break-even</dt><dd>{result.breakEvenMonths != null ? `${result.breakEvenMonths.toFixed(1)} meses` : '—'}</dd></div>
              </dl>
            </article>
          </div>

          <div className="calc__chart" role="img" aria-label="Comparación de costo mensual API vs Self-hosted">
            <div className="calc__chart-row">
              <span className="calc__chart-label">API</span>
              <div className="calc__chart-track"><div className="calc__chart-bar calc__chart-bar--api" style={{ width: apiBarWidth }} /></div>
              <span className="calc__chart-value">{currencyFmt.format(result.apiMonthlyCost)}</span>
            </div>
            <div className="calc__chart-row">
              <span className="calc__chart-label">Self-hosted</span>
              <div className="calc__chart-track"><div className="calc__chart-bar calc__chart-bar--self" style={{ width: selfBarWidth }} /></div>
              <span className="calc__chart-value">{currencyFmt.format(result.selfHostedMonthlyCost)}</span>
            </div>
          </div>

          <div className={`calc__recommendation calc__recommendation--${result.recommendation.tone}`} role="status">
            <span className="calc__recommendation-label">{result.recommendation.label}</span>
            <p>{result.recommendation.message}</p>
          </div>
        </div>
      </div>

      <footer className="calc__footer">
        <p className="calc__disclaimer">
          Esta calculadora estima costos de inferencia. No incluye costos de integración, seguridad, monitoreo,
          fine-tuning, almacenamiento vectorial, soporte ni governance.
        </p>
        <details className="calc__refs">
          <summary>Fuentes y referencias de precios</summary>
          <ul>
            <li>
              OpenAI publica precios por 1M de tokens (input / cached input / output) para cada modelo:{' '}
              <a href="https://developers.openai.com/api/docs/pricing" target="_blank" rel="noreferrer">developers.openai.com/api/docs/pricing</a>.
            </li>
            <li>
              Google muestra tarifas Gemini con valores desde ~USD 0.05–0.25 input y USD 0.20–1.50 output por 1M tokens en modelos económicos, escalando a USD 2–3.60 input y USD 12–21.60 output en los más capaces:{' '}
              <a href="https://ai.google.dev/gemini-api/docs/pricing" target="_blank" rel="noreferrer">ai.google.dev/gemini-api/docs/pricing</a>.
            </li>
            <li>
              Reportes de mercado ubican una NVIDIA H100 80GB entre USD 25k y 40k+ para compra, y entre USD 1.25 y USD 14.90 por GPU/hora en cloud:{' '}
              <a href="https://electronics.alibaba.com/question/nvidia-h100-price-guide-buy-vs-rent-in-2026" target="_blank" rel="noreferrer">electronics.alibaba.com — NVIDIA H100 price guide 2026</a>.
            </li>
          </ul>
        </details>
      </footer>
    </div>
  )
}
