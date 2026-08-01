#!/usr/bin/env node
/**
 * Genera GenIA-Pitch-Deck.pdf en la raíz del proyecto.
 *
 * Pitch deck corto (formato 16:9, tipo slides), con el mismo diseño y
 * paleta de colores del sitio, enfocado en:
 *   - Infraestructura libre y propia (self-hosted, open source)
 *   - Resguardo de la privacidad de los datos
 *   - Seguridad y cumplimiento
 *   - Genway (gateway de gobierno de IA)
 *
 * Requiere Google Chrome / Chromium instalado y accesible en PATH
 * (variable de entorno CHROME_BIN para indicar una ruta distinta).
 *
 * Uso: node scripts/generate-pitch-deck.mjs
 *      npm run pitch
 */
import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_PDF = path.join(ROOT, 'GenIA-Pitch-Deck.pdf')
const TMP_HTML = path.join(ROOT, '.pitch-build.tmp.html')

// --- Traducciones (español), reutilizadas como fuente de verdad de copy ---
const { es: t } = await import(path.join(ROOT, 'src/i18n/translations.es.js'))

// --- Extraer íconos SVG (lucide/react-icons) sin depender de React ---
const luSource = fs.readFileSync(
  path.join(ROOT, 'node_modules/react-icons/lu/index.mjs'),
  'utf8'
)

function extractIcon(name) {
  const re = new RegExp(
    `export function ${name} \\(props\\) \\{\\n  return GenIcon\\((\\{.*\\})\\)\\(props\\);`
  )
  const m = luSource.match(re)
  if (!m) throw new Error(`Icon not found: ${name}`)
  return JSON.parse(m[1])
}

function iconToSvg(name, size = 24) {
  const node = extractIcon(name)
  const renderChild = (c) => {
    const attrs = Object.entries(c.attr)
      .map(([k, v]) => `${k}="${v}"`)
      .join(' ')
    const children = (c.child || []).map(renderChild).join('')
    return `<${c.tag} ${attrs}>${children}</${c.tag}>`
  }
  const attrs = Object.entries(node.attr)
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ')
  const children = (node.child || []).map(renderChild).join('')
  return `<svg width="${size}" height="${size}" ${attrs}>${children}</svg>`
}

const icons = Object.fromEntries(
  [
    'LuServer', 'LuBoxes', 'LuShuffle', 'LuActivity',
    'LuShieldOff', 'LuLock', 'LuLockKeyhole', 'LuShieldCheck',
    'LuGauge', 'LuChevronRight', 'LuGlobeLock', 'LuEyeOff', 'LuFileCheck2',
    'LuDatabase',
  ].map((name) => [name, iconToSvg(name)])
)

const logoFarox = fs.readFileSync(path.join(ROOT, 'src/img/logo-farox.png')).toString('base64')
const logoCamba = fs.readFileSync(path.join(ROOT, 'src/img/logo-camba.png')).toString('base64')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// ============ CSS — formato 16:9, mismo sistema visual del sitio ============
const css = `
@page { size: 297mm 167mm; margin: 0; }
:root {
  --color-blue: #96D8FD;
  --color-green: #5BF175;
  --color-bg: #0a0f1e;
  --color-bg-alt: #111827;
  --color-bg-card: #1a2235;
  --color-text: #e8edf5;
  --color-text-muted: #8fa3bf;
  --color-border: rgba(150, 216, 253, 0.15);
  --font-family: 'Inter', system-ui, -apple-system, sans-serif;
  --border-radius: 0.75rem;
  --border-radius-lg: 1.25rem;
}
* , *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
html, body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-family);
  line-height: 1.5;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
h1,h2,h3,h4 { line-height: 1.15; font-weight: 700; }

.slide {
  width: 297mm;
  height: 167mm;
  padding: 2.6rem 3.2rem;
  page-break-after: always;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.slide:last-child { page-break-after: auto; }

.slide__kicker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.4rem;
}
.slide__brand { font-size: 1rem; font-weight: 800; letter-spacing: -0.02em; color: var(--color-text-muted); }
.slide__brand .accent-blue { color: var(--color-blue); }
.slide__page-num { font-size: 0.75rem; color: var(--color-text-muted); }

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.9rem;
}
.badge--blue { background: rgba(150, 216, 253, 0.12); color: var(--color-blue); border: 1px solid rgba(150, 216, 253, 0.3); }
.badge--green { background: rgba(91, 241, 117, 0.12); color: var(--color-green); border: 1px solid rgba(91, 241, 117, 0.3); }

.accent {
  background: linear-gradient(135deg, var(--color-blue) 30%, var(--color-green));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.slide__body { flex: 1; display: flex; flex-direction: column; justify-content: center; }

/* ===== COVER ===== */
.cover {
  align-items: center;
  justify-content: center;
  text-align: center;
  background: radial-gradient(circle at 18% 20%, rgba(150,216,253,0.16), transparent 45%),
              radial-gradient(circle at 85% 85%, rgba(91,241,117,0.14), transparent 45%),
              var(--color-bg);
}
.cover .slide__body { align-items: center; }
.cover__logo { font-size: 3.2rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 1.1rem; }
.cover__logo .accent-blue { color: var(--color-blue); }
.cover h1 { font-size: 2.6rem; margin-bottom: 0.9rem; max-width: 780px; }
.cover h2 { font-size: 1.25rem; font-weight: 600; color: var(--color-text-muted); margin-bottom: 1.5rem; max-width: 680px; }
.cover p.lead { color: var(--color-text-muted); max-width: 640px; font-size: 0.98rem; line-height: 1.6; }
.cover p.lead strong { color: var(--color-text); }
.cover__footer { margin-top: 2.2rem; font-size: 0.8rem; color: var(--color-text-muted); }

/* ===== SECTION TITLE ===== */
.slide h2.title { font-size: 1.9rem; margin-bottom: 0.6rem; max-width: 900px; }
.slide p.subtitle { font-size: 1rem; color: var(--color-text-muted); max-width: 820px; line-height: 1.6; margin-bottom: 1.6rem; }

/* ===== 2x2 / grid cards ===== */
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.1rem; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.1rem; }
.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: 1.35rem 1.5rem;
}
.card--blue { border-left: 3px solid var(--color-blue); }
.card--green { border-left: 3px solid var(--color-green); }
.card__icon { margin-bottom: 0.6rem; }
.card--blue .card__icon { color: var(--color-blue); }
.card--green .card__icon { color: var(--color-green); }
.card h3 { font-size: 1.05rem; margin-bottom: 0.45rem; }
.card--blue h3 { color: var(--color-blue); }
.card--green h3 { color: var(--color-green); }
.card p { font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.55; }

/* ===== STACK (infra libre) ===== */
.stack-wrap { display: flex; flex-direction: column; gap: 0.5rem; }
.stack-label { text-align: center; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-text-muted); }
.stack { display: flex; flex-direction: column; gap: 5px; }
.layer {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 0.55rem 1rem;
  display: grid;
  grid-template-columns: 90px 1fr;
  align-items: center;
  gap: 1rem;
}
.layer--blue { border-left: 4px solid var(--color-blue); }
.layer--green { border-left: 4px solid var(--color-green); }
.layer-name { font-size: 0.88rem; font-weight: 700; }
.layer-tools { list-style:none; display:flex; flex-wrap:wrap; gap:0.35rem; }
.layer-tools li { font-size: 0.68rem; font-weight:600; background: rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-radius:6px; padding: 0.12rem 0.4rem; }
.layer-body-row { display: grid; grid-template-columns: 150px 1fr; gap: 1rem; align-items: center; }

/* ===== GENWAY FLOW ===== */
.genway-flow { display:flex; align-items:center; justify-content:center; gap: 1.2rem; padding: 1.4rem 1rem; background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--border-radius-lg); margin-bottom: 1.4rem; }
.flow-circle { display:flex; flex-direction:column; align-items:center; justify-content:center; border-radius:50%; text-align:center; flex-shrink:0; }
.flow-circle--org { width:118px; height:118px; border: 1.5px solid rgba(150,216,253,0.35); }
.flow-circle--hub { width:138px; height:138px; border: 1.5px solid var(--color-blue); background: radial-gradient(circle at 30% 25%, rgba(150,216,253,0.18), rgba(91,241,117,0.1) 60%, transparent 100%); }
.flow-circle--models { width:128px; height:128px; border: 1.5px solid rgba(91,241,117,0.35); padding: 0.5rem; }
.flow-label { font-size: 0.78rem; font-weight:700; }
.flow-label--org { color: var(--color-blue); text-transform:uppercase; }
.flow-label--hub { font-size:0.98rem; font-weight:800; }
.flow-sub { font-size: 0.6rem; color: var(--color-text-muted); margin-top:0.4rem; }
.flow-chips { display:flex; flex-wrap:wrap; justify-content:center; gap:0.2rem; margin-top:0.4rem; }
.flow-chip { font-size: 0.55rem; font-weight:600; color: var(--color-text-muted); background: rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-radius:9999px; padding: 0.12rem 0.4rem; }
.flow-arrow { color: var(--color-blue); flex-shrink:0; }

.genway-items { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.genway-item { text-align: center; }
.genway-item__icon { width: 2.2rem; height: 2.2rem; margin: 0 auto 0.5rem; display:flex; align-items:center; justify-content:center; border-radius:50%; background: var(--color-bg-card); }
.genway-item--blue .genway-item__icon { color: var(--color-blue); border: 1.5px solid var(--color-blue); }
.genway-item--green .genway-item__icon { color: var(--color-green); border: 1.5px solid var(--color-green); }
.genway-item__tag { display:block; font-size:0.64rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:0.3rem; }
.genway-item--blue .genway-item__tag { color: var(--color-blue); }
.genway-item--green .genway-item__tag { color: var(--color-green); }
.genway-item h3 { font-size: 0.88rem; margin-bottom: 0.3rem; }
.genway-item p { font-size: 0.74rem; color: var(--color-text-muted); line-height: 1.5; }

/* ===== METRIC ROW (ROI resumido) ===== */
.metrics-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem; }
.metric-card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--border-radius-lg); padding: 1.4rem; text-align: center; }
.metric-number { font-size: 2.1rem; font-weight: 800; line-height: 1; margin-bottom: 0.3rem; }
.metric-card--blue .metric-number { color: var(--color-blue); }
.metric-card--green .metric-number { color: var(--color-green); }
.metric-label { font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-muted); display:block; margin-bottom: 0.6rem; }
.metric-card h3 { font-size: 0.92rem; }

/* ===== CLOSING / CTA ===== */
.closing { align-items: center; justify-content: center; text-align: center; }
.closing .slide__body { align-items: center; }
.closing h2 { font-size: 2rem; max-width: 780px; margin-bottom: 1rem; }
.closing p { color: var(--color-text-muted); font-size: 1rem; max-width: 640px; margin-bottom: 1.6rem; line-height: 1.6; }
.closing .contact { font-size: 1.15rem; font-weight: 700; color: var(--color-blue); }
.closing .coops { display: flex; gap: 2.5rem; align-items: center; justify-content: center; margin-top: 1.8rem; }
.closing .coops img { height: 46px; object-fit: contain; }

/* Avoid awkward breaks (single page per slide anyway, kept for safety) */
.card, .layer, .genway-item, .metric-card { break-inside: avoid; page-break-inside: avoid; }
`

// ============ SLIDES ============

// --- Slide 1: Cover ---
const slideCover = `
<div class="slide cover">
  <div class="slide__body">
    <div class="cover__logo">Gen<span class="accent-blue">IA</span></div>
    <span class="badge badge--blue">${esc(t.hero.badge)}</span>
    <h1>${esc(t.hero.title)}</h1>
    <h2>Infraestructura propia, privacidad garantizada y control total sobre tu adopción de IA</h2>
    <p class="lead">Implementamos estrategias de Inteligencia Artificial <strong>self-hosted</strong> con tecnología <strong>100% Open Source</strong>. Sin dependencia de proveedores externos, sin fugas de datos y con infraestructura bajo tu control absoluto.</p>
    <div class="cover__footer">Pitch Deck · IA soberana, construida por cooperativas · genia.coop</div>
  </div>
</div>
`

// --- Slide 2: El problema (enfocado en privacidad/seguridad, resumido) ---
const problemFocus = t.problem.items.filter((i) =>
  ['Riesgo Legal', 'Exfiltración de datos'].includes(i.title)
)
const slideProblem = `
<div class="slide">
  <div class="slide__kicker">
    <span class="slide__brand">Gen<span class="accent-blue">IA</span></span>
    <span class="slide__page-num">02</span>
  </div>
  <div class="slide__body">
    <span class="badge badge--blue">${esc(t.problem.badge)}</span>
    <h2 class="title">${esc(t.problem.title)}</h2>
    <p class="subtitle">${esc(t.problem.lead)}</p>
    <div class="grid-2">
      <div class="card card--blue">
        <div class="card__icon">${icons.LuGlobeLock}</div>
        <h3>Riesgo Legal</h3>
        <p>${esc(t.problem.items[0].description)}</p>
      </div>
      <div class="card card--blue">
        <div class="card__icon">${icons.LuEyeOff}</div>
        <h3>Exfiltración de datos</h3>
        <p>${esc(t.problem.items[2].description)}</p>
      </div>
    </div>
  </div>
</div>
`

// --- Slide 3: Infraestructura libre y propia (AI Open Stack, resumido) ---
const keyLayers = [
  t.howItWorks.layers[0], // Hardware
  t.howItWorks.layers[1], // Motor de Inferencia
  t.howItWorks.layers[2], // Gestión
  t.howItWorks.layers[3], // Modelos
].map((l, i) => ({ ...l, color: ['blue', 'green', 'blue', 'green'][i] }))

const slideStack = `
<div class="slide">
  <div class="slide__kicker">
    <span class="slide__brand">Gen<span class="accent-blue">IA</span></span>
    <span class="slide__page-num">03</span>
  </div>
  <div class="slide__body">
    <span class="badge badge--blue">${esc(t.howItWorks.badge)}</span>
    <h2 class="title">${esc(t.howItWorks.title)}: infraestructura 100% propia</h2>
    <p class="subtitle">${esc(t.howItWorks.lead)}</p>
    <div class="stack-wrap">
      <div class="stack-label">${esc(t.howItWorks.topLabel)}</div>
      <div class="stack">
        ${keyLayers.map((item) => `
        <div class="layer layer--${item.color}">
          <span class="layer-name">${esc(item.name)}</span>
          <div class="layer-body-row">
            <ul class="layer-tools">${item.tools.map((tool) => `<li>${esc(tool)}</li>`).join('')}</ul>
            <span style="font-size:0.78rem; color: var(--color-text-muted); line-height:1.5;">${esc(item.description)}</span>
          </div>
        </div>`).join('')}
      </div>
      <div class="stack-label">${esc(t.howItWorks.bottomLabel)}</div>
    </div>
  </div>
</div>
`

// --- Slide 4: Privacidad y seguridad ---
const slidePrivacy = `
<div class="slide">
  <div class="slide__kicker">
    <span class="slide__brand">Gen<span class="accent-blue">IA</span></span>
    <span class="slide__page-num">04</span>
  </div>
  <div class="slide__body">
    <span class="badge badge--green">Privacidad &amp; Seguridad</span>
    <h2 class="title">Tus datos nunca salen de tu perímetro de confianza</h2>
    <p class="subtitle">Al alojar el stack completo de IA en tu propia infraestructura, eliminamos por diseño los riesgos de fuga, retención indebida y acceso no autorizado a información sensible.</p>
    <div class="grid-4">
      <div class="card card--green">
        <div class="card__icon">${icons.LuDatabase}</div>
        <h3>Datos propios</h3>
        <p>Sin retención de datos en manos de terceros. La información nunca abandona tu infraestructura.</p>
      </div>
      <div class="card card--green">
        <div class="card__icon">${icons.LuEyeOff}</div>
        <h3>Enmascarado</h3>
        <p>Protección de información sensible en cada interacción con los modelos.</p>
      </div>
      <div class="card card--green">
        <div class="card__icon">${icons.LuFileCheck2}</div>
        <h3>Trazabilidad</h3>
        <p>Auditoría completa de cada solicitud y respuesta, con observabilidad vía LangFuse.</p>
      </div>
      <div class="card card--green">
        <div class="card__icon">${icons.LuShieldCheck}</div>
        <h3>Cumplimiento</h3>
        <p>Reglas de acceso, auditoría y retención pensadas para normativas de protección de datos.</p>
      </div>
    </div>
  </div>
</div>
`

// --- Slide 5: Genway (gateway de gobierno) ---
const d = t.genway.diagram
const genwayIconsList = [icons.LuGauge, icons.LuLockKeyhole, icons.LuShuffle, icons.LuShieldCheck]
const genwayColorsList = ['blue', 'green', 'blue', 'green']
const slideGenway = `
<div class="slide">
  <div class="slide__kicker">
    <span class="slide__brand">Gen<span class="accent-blue">IA</span></span>
    <span class="slide__page-num">05</span>
  </div>
  <div class="slide__body">
    <span class="badge badge--blue">${esc(t.genway.badge)}</span>
    <h2 class="title">${esc(t.genway.title)}</h2>
    <p class="subtitle">${esc(t.genway.lead)}</p>
    <div class="genway-flow">
      <div class="flow-circle flow-circle--org">
        <span class="flow-label flow-label--org">${esc(d.orgLabel)}</span>
        <span class="flow-sub">${esc(d.orgSub)}</span>
      </div>
      <div class="flow-arrow">${icons.LuChevronRight}</div>
      <div class="flow-circle flow-circle--hub">
        <span class="flow-label flow-label--hub accent">${esc(d.hubLabel)}</span>
        <span class="flow-sub">${esc(d.hubSub)}</span>
      </div>
      <div class="flow-arrow">${icons.LuChevronRight}</div>
      <div class="flow-circle flow-circle--models">
        <span class="flow-label" style="color:var(--color-green); font-size:0.68rem; text-transform:uppercase;">${esc(d.modelsLabel)}</span>
        <div class="flow-chips">${d.models.map((m) => `<span class="flow-chip">${esc(m)}</span>`).join('')}</div>
      </div>
    </div>
    <div class="genway-items">
      ${t.genway.items.map((item, idx) => `
      <div class="genway-item genway-item--${genwayColorsList[idx]}">
        <div class="genway-item__icon">${genwayIconsList[idx]}</div>
        <span class="genway-item__tag">${esc(item.tag)}</span>
        <h3>${esc(item.title)}</h3>
      </div>`).join('')}
    </div>
  </div>
</div>
`

// --- Slide 6: ROI resumido ---
const slideRoi = `
<div class="slide">
  <div class="slide__kicker">
    <span class="slide__brand">Gen<span class="accent-blue">IA</span></span>
    <span class="slide__page-num">06</span>
  </div>
  <div class="slide__body">
    <span class="badge badge--blue">${esc(t.sovereignty.badge)}</span>
    <h2 class="title">${esc(t.sovereignty.titleStart)} <span class="accent">${esc(t.sovereignty.titleAccent)}</span></h2>
    <p class="subtitle">${esc(t.sovereignty.lead)}</p>
    <div class="metrics-row">
      ${t.sovereignty.items.map((p, idx) => `
      <div class="metric-card metric-card--${['blue', 'green', 'blue'][idx]}">
        <span class="metric-number">${esc(p.metric)}</span>
        <span class="metric-label">${esc(p.metricLabel)}</span>
        <h3>${esc(p.title)}</h3>
      </div>`).join('')}
    </div>
  </div>
</div>
`

// --- Slide 7: Closing / CTA ---
const slideClosing = `
<div class="slide closing">
  <div class="slide__body">
    <span class="badge badge--green">${esc(t.cta.badge)}</span>
    <h2>${esc(t.cta.title)}</h2>
    <p>${esc(t.cta.lead)}</p>
    <div class="contact">hola@genia.coop</div>
    <div class="coops">
      <img src="data:image/png;base64,${logoFarox}" alt="Logo Farox" />
      <img src="data:image/png;base64,${logoCamba}" alt="Logo Cambá" />
    </div>
  </div>
</div>
`

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<title>GenIA — Pitch Deck</title>
<style>${css}</style>
</head>
<body>
${slideCover}
${slideProblem}
${slideStack}
${slidePrivacy}
${slideGenway}
${slideRoi}
${slideClosing}
</body>
</html>
`

fs.writeFileSync(TMP_HTML, html)

// --- Print to PDF using headless Chrome/Chromium ---
const chromeBin =
  process.env.CHROME_BIN ||
  ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser'].find((bin) => {
    try {
      execFileSync('which', [bin], { stdio: 'ignore' })
      return true
    } catch {
      return false
    }
  })

if (!chromeBin) {
  console.error(
    'No se encontró Chrome/Chromium instalado. Instalá Google Chrome o definí CHROME_BIN con la ruta al binario.'
  )
  process.exit(1)
}

try {
  execFileSync(chromeBin, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--print-to-pdf=${OUT_PDF}`,
    '--no-pdf-header-footer',
    `file://${TMP_HTML}`,
  ])
  console.log(`Pitch deck generado en: ${OUT_PDF}`)
} finally {
  fs.unlinkSync(TMP_HTML)
}
