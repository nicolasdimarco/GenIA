#!/usr/bin/env node
/**
 * Genera GenIA-Pitch-Deck-v2.pdf en la raíz del proyecto.
 *
 * Pitch deck v2 (formato 16:9), mismo diseño y paleta de colores que el
 * sitio / pitch deck original, pero con narrativa distinta:
 *
 *   "GenWay: Infraestructura Soberana para IA en Gobiernos Locales"
 *   (Farox Coop) — GenIA aparece solo como una app que corre sobre GenWay.
 *
 * No modifica GenIA.pdf ni GenIA-Pitch-Deck.pdf.
 *
 * Requiere Google Chrome / Chromium instalado y accesible en PATH
 * (variable de entorno CHROME_BIN para indicar una ruta distinta).
 *
 * Uso: node scripts/generate-pitch-deck-v2.mjs
 *      npm run pitch:v2
 */
import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_PDF = path.join(ROOT, 'GenIA-Pitch-Deck-v2.pdf')
const TMP_HTML = path.join(ROOT, '.pitch-v2-build.tmp.html')

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
    'LuGlobeLock', 'LuEyeOff', 'LuFileCheck2', 'LuScale',
    'LuGauge', 'LuLockKeyhole', 'LuShuffle', 'LuShieldCheck',
    'LuServer', 'LuBoxes', 'LuNetwork', 'LuChevronRight',
    'LuCircleCheckBig', 'LuCalendarDays', 'LuRocket', 'LuLandmark',
    'LuBuilding2',
  ].map((name) => [name, iconToSvg(name)])
)

const logoFarox = fs.readFileSync(path.join(ROOT, 'src/img/logo-farox.png')).toString('base64')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// ============ CSS — mismo sistema visual que el sitio / pitch deck v1 ============
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
  padding: 2.5rem 3.2rem;
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
  margin-bottom: 1.2rem;
}
.slide__brand { font-size: 0.95rem; font-weight: 800; letter-spacing: -0.02em; color: var(--color-text-muted); }
.slide__brand .accent-blue { color: var(--color-blue); }
.slide__page-num { font-size: 0.72rem; color: var(--color-text-muted); }

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.85rem;
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
.cover__logo { font-size: 2.4rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 1rem; }
.cover__logo .accent-blue { color: var(--color-blue); }
.cover h1 { font-size: 2.35rem; margin-bottom: 0.9rem; max-width: 820px; }
.cover h2 { font-size: 1.1rem; font-weight: 600; color: var(--color-text-muted); margin-bottom: 1.4rem; max-width: 700px; }
.cover p.lead { color: var(--color-text-muted); max-width: 650px; font-size: 0.95rem; line-height: 1.6; }
.cover p.lead strong { color: var(--color-text); }
.cover__footer { margin-top: 2rem; font-size: 0.78rem; color: var(--color-text-muted); }

/* ===== SECTION TITLE ===== */
.slide h2.title { font-size: 1.75rem; margin-bottom: 0.55rem; max-width: 920px; }
.slide p.subtitle { font-size: 0.92rem; color: var(--color-text-muted); max-width: 860px; line-height: 1.55; margin-bottom: 1.3rem; }

/* ===== TWO-COLUMN LAYOUT (problema / propuesta, etc.) ===== */
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1.6rem; align-items: start; flex: 1; }
.col-block h3 {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}
.col-block--blue h3 { color: var(--color-blue); }
.col-block--green h3 { color: var(--color-green); }
.check-list { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; }
.check-list li { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.84rem; color: var(--color-text-muted); line-height: 1.5; }
.check-list--x li::before { content: '✕'; color: #ff8a8a; font-weight: 700; flex-shrink: 0; }
.check-list--ok li::before { content: '✓'; color: var(--color-green); font-weight: 700; flex-shrink: 0; }

.callout {
  margin-top: 1.1rem;
  background: linear-gradient(135deg, rgba(150, 216, 253, 0.08), rgba(91, 241, 117, 0.06));
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-green);
  border-radius: var(--border-radius);
  padding: 0.9rem 1.2rem;
}
.callout p { font-size: 0.86rem; color: var(--color-text); line-height: 1.55; font-style: italic; }

/* ===== CARDS / GRID ===== */
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.1rem; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: 1.2rem 1.4rem;
}
.card--blue { border-left: 3px solid var(--color-blue); }
.card--green { border-left: 3px solid var(--color-green); }
.card__icon { margin-bottom: 0.55rem; }
.card--blue .card__icon { color: var(--color-blue); }
.card--green .card__icon { color: var(--color-green); }
.card h3 { font-size: 1rem; margin-bottom: 0.4rem; }
.card--blue h3 { color: var(--color-blue); }
.card--green h3 { color: var(--color-green); }
.card p { font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.5; }

/* ===== TAG PILLS (compatibilidad de modelos, tech stack) ===== */
.pill-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.pill { font-size: 0.75rem; font-weight: 600; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 0.3rem 0.7rem; color: var(--color-text); }
.pill--blue { color: var(--color-blue); border-color: rgba(150,216,253,0.3); background: rgba(150,216,253,0.08); }
.pill--green { color: var(--color-green); border-color: rgba(91,241,117,0.3); background: rgba(91,241,117,0.08); }

/* ===== TIMELINE (piloto 5 meses) ===== */
.timeline { display: flex; flex-direction: column; gap: 0.9rem; }
.timeline-row { display: grid; grid-template-columns: 130px 1fr; gap: 1.1rem; align-items: center; background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--border-radius); padding: 0.85rem 1.2rem; }
.timeline-phase { font-size: 0.82rem; font-weight: 700; color: var(--color-blue); }
.timeline-desc { font-size: 0.84rem; color: var(--color-text-muted); line-height: 1.5; }

/* ===== METRIC / CLOSING ===== */
.closing { align-items: center; justify-content: center; text-align: center; }
.closing .slide__body { align-items: center; }
.closing h2 { font-size: 1.9rem; max-width: 820px; margin-bottom: 1rem; }
.closing p { color: var(--color-text-muted); font-size: 0.96rem; max-width: 700px; margin-bottom: 1.4rem; line-height: 1.6; }
.closing .quote {
  max-width: 720px;
  font-style: italic;
  color: var(--color-text);
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 1.4rem;
  background: rgba(150, 216, 253, 0.05);
  border: 1px solid rgba(150, 216, 253, 0.2);
  border-radius: var(--border-radius-lg);
  padding: 1.2rem 1.6rem;
}
.closing .footline { font-size: 1.05rem; font-weight: 700; color: var(--color-blue); max-width: 780px; }
.closing .coop-logo { margin-top: 1.6rem; height: 52px; object-fit: contain; }

/* Avoid awkward breaks */
.card, .timeline-row { break-inside: avoid; page-break-inside: avoid; }
`

// ============ SLIDES ============

// --- Slide 1: La infraestructura pública que falta ---
const slide1 = `
<div class="slide cover">
  <div class="slide__body">
    <div class="cover__logo">Farox<span class="accent-blue">.coop</span></div>
    <span class="badge badge--blue">Pitch Deck · GenWay</span>
    <h1>La IA llegó a los municipios antes que la infraestructura para gobernarla.</h1>
    <h2>GenWay: Infraestructura Soberana para IA en Gobiernos Locales</h2>
    <p class="lead">Los gobiernos locales ya utilizan modelos de IA para atención ciudadana, asistencia administrativa y análisis documental. Sin embargo, la mayoría accede directamente a servicios de terceros <strong>sin mecanismos de control sobre privacidad, costos o trazabilidad</strong>.</p>
    <div class="cover__footer">Pitch Deck · Farox Coop · farox.coop</div>
  </div>
</div>
`

// --- Slide 2: GenWay - el Gateway Soberano de IA ---
const slide2 = `
<div class="slide">
  <div class="slide__kicker">
    <span class="slide__brand">Farox<span class="accent-blue">.coop</span></span>
    <span class="slide__page-num">02</span>
  </div>
  <div class="slide__body">
    <span class="badge badge--blue">GenWay</span>
    <h2 class="title">El Gateway Soberano de IA</h2>
    <p class="subtitle">Una capa de gobernanza entre el municipio y cualquier modelo de IA. GenWay funciona como un <strong>AI Gateway</strong>, administrando todo el tráfico entre los usuarios municipales y los modelos de lenguaje.</p>
    <div class="two-col">
      <div class="col-block col-block--blue">
        <h3>Controla</h3>
        <ul class="check-list check-list--ok">
          <li>Qué modelo utilizar</li>
          <li>Qué información puede salir del municipio</li>
          <li>Anonimización automática de datos sensibles</li>
          <li>Auditoría completa de consultas</li>
          <li>Administración de costos y consumo</li>
          <li>Políticas diferenciadas por área de gobierno</li>
        </ul>
      </div>
      <div class="col-block col-block--green">
        <h3>Compatible con</h3>
        <div class="pill-row">
          <span class="pill pill--green">Llama</span>
          <span class="pill pill--green">Mistral</span>
          <span class="pill pill--green">Qwen</span>
          <span class="pill pill--blue">OpenAI</span>
          <span class="pill pill--blue">Anthropic</span>
          <span class="pill pill--blue">Google Gemini</span>
          <span class="pill">Cualquier proveedor compatible con OpenAI API</span>
        </div>
        <div class="callout">
          <p>GenWay convierte la IA en un servicio gobernable y auditable.</p>
        </div>
      </div>
    </div>
  </div>
</div>
`

// --- Slide 3: Infraestructura abierta, propia y segura ---
const slide3 = `
<div class="slide">
  <div class="slide__kicker">
    <span class="slide__brand">Farox<span class="accent-blue">.coop</span></span>
    <span class="slide__page-num">03</span>
  </div>
  <div class="slide__body">
    <span class="badge badge--blue">Infraestructura</span>
    <h2 class="title">Todo el stack bajo control del municipio</h2>
    <p class="subtitle">La solución se instala como un <strong>Edge Box</strong> dentro de la infraestructura municipal, basada completamente en tecnologías abiertas.</p>
    <div class="two-col">
      <div class="col-block col-block--blue">
        <h3>Stack tecnológico</h3>
        <div class="pill-row">
          <span class="pill pill--blue">GenWay (Gateway)</span>
          <span class="pill">LiteLLM</span>
          <span class="pill">OpenWebUI</span>
          <span class="pill">Ollama</span>
          <span class="pill">Docker</span>
          <span class="pill">PostgreSQL</span>
          <span class="pill">Redis</span>
          <span class="pill">RAG documental</span>
          <span class="pill pill--green">Microsoft Presidio (PII)</span>
        </div>
      </div>
      <div class="col-block col-block--green">
        <h3>Beneficios</h3>
        <ul class="check-list check-list--ok">
          <li>Datos protegidos antes de salir del datacenter</li>
          <li>Integración con documentación municipal</li>
          <li>Registro completo de actividad</li>
          <li>Baja latencia</li>
          <li>Posibilidad de operar con modelos locales</li>
          <li>Independencia tecnológica</li>
        </ul>
      </div>
    </div>
    <div class="callout">
      <p>La IA deja de ser una caja negra y pasa a formar parte de la infraestructura pública municipal.</p>
    </div>
  </div>
</div>
`

// --- Slide 4: Piloto Escobar - infraestructura replicable ---
const slide4 = `
<div class="slide">
  <div class="slide__kicker">
    <span class="slide__brand">Farox<span class="accent-blue">.coop</span></span>
    <span class="slide__page-num">04</span>
  </div>
  <div class="slide__body">
    <span class="badge badge--green">Piloto Escobar</span>
    <h2 class="title">Primer nodo de una red cooperativa de IA pública</h2>
    <p class="subtitle">El piloto propone instalar el primer <strong>GenIA Edge Box</strong> en el Municipio de Escobar. Ese nodo permitirá validar:</p>
    <div class="grid-4">
      <div class="card card--green">
        <div class="card__icon">${icons.LuShieldCheck}</div>
        <h3>Gobernanza de IA</h3>
      </div>
      <div class="card card--green">
        <div class="card__icon">${icons.LuLockKeyhole}</div>
        <h3>Privacidad y protección de datos</h3>
      </div>
      <div class="card card--green">
        <div class="card__icon">${icons.LuFileCheck2}</div>
        <h3>Operación sobre documentación municipal</h3>
      </div>
      <div class="card card--green">
        <div class="card__icon">${icons.LuGauge}</div>
        <h3>Métricas de uso y administración centralizada</h3>
      </div>
    </div>
    <div class="callout" style="margin-top: 1.4rem;">
      <p>La arquitectura fue diseñada para ser <strong>federada</strong>. Una vez validado el nodo inicial, otros municipios podrán incorporarse reutilizando la misma infraestructura, reduciendo costos y acelerando la adopción.</p>
    </div>
    <p style="text-align:center; margin-top: 1.1rem; font-size: 1.05rem; font-weight: 700; color: var(--color-blue);">Un piloto. Una infraestructura. Múltiples municipios.</p>
  </div>
</div>
`

// --- Slide 5: Implementación y resultados ---
const slide5 = `
<div class="slide">
  <div class="slide__kicker">
    <span class="slide__brand">Farox<span class="accent-blue">.coop</span></span>
    <span class="slide__page-num">05</span>
  </div>
  <div class="slide__body">
    <span class="badge badge--blue">Implementación</span>
    <h2 class="title">Piloto de cinco meses</h2>
    <div class="two-col" style="grid-template-columns: 1.1fr 0.9fr;">
      <div class="col-block col-block--blue">
        <h3>Cronograma</h3>
        <div class="timeline">
          <div class="timeline-row">
            <span class="timeline-phase">Mes 1</span>
            <span class="timeline-desc">Instalación del Edge Box y despliegue de GenWay.</span>
          </div>
          <div class="timeline-row">
            <span class="timeline-phase">Meses 2–3</span>
            <span class="timeline-desc">Configuración del Gateway, integración documental y políticas de seguridad.</span>
          </div>
          <div class="timeline-row">
            <span class="timeline-phase">Meses 4–5</span>
            <span class="timeline-desc">Operación piloto sobre casos reales y generación de métricas.</span>
          </div>
        </div>
      </div>
      <div class="col-block col-block--green">
        <h3>Entregables</h3>
        <ul class="check-list check-list--ok">
          <li>Infraestructura operativa</li>
          <li>Gateway de IA funcionando</li>
          <li>Base documental integrada</li>
          <li>Tablero de métricas</li>
          <li>Auditoría completa</li>
          <li>Modelo replicable para otros municipios</li>
        </ul>
      </div>
    </div>
    <div class="callout" style="margin-top: 1.2rem;">
      <p>El financiamiento solicitado se destina al <strong>despliegue operativo de infraestructura Edge</strong>, configuración e implementación del piloto, bajo un esquema <strong>Edge as a Service</strong>, sin transferencia de activos al municipio.</p>
    </div>
  </div>
</div>
`

// --- Slide 6: ¿Por qué Farox Coop? ---
const slide6 = `
<div class="slide closing">
  <div class="slide__body">
    <span class="badge badge--green">¿Por qué Farox Coop?</span>
    <h2>Tecnología abierta para fortalecer la soberanía digital del Estado</h2>
    <p>Farox Coop es una cooperativa tecnológica argentina especializada en infraestructura abierta para Inteligencia Artificial. Nuestra propuesta combina software libre, infraestructura nacional, despliegues on-premise, interoperabilidad, privacidad por diseño y gobernanza de IA.</p>
    <div class="pill-row" style="justify-content:center; margin-bottom: 1.4rem;">
      <span class="pill pill--blue">Software libre</span>
      <span class="pill pill--blue">Infraestructura nacional</span>
      <span class="pill pill--green">On-premise</span>
      <span class="pill pill--green">Interoperabilidad</span>
      <span class="pill">Privacidad por diseño</span>
      <span class="pill">Gobernanza de IA</span>
    </div>
    <div class="quote">
      "La transformación digital del Estado no requiere depender de plataformas cerradas. Requiere infraestructura abierta, auditable y gestionada localmente."
    </div>
    <p class="footline">Farox Coop construye la infraestructura soberana para la próxima generación de servicios públicos basados en Inteligencia Artificial.</p>
    <img class="coop-logo" src="data:image/png;base64,${logoFarox}" alt="Logo Farox" />
  </div>
</div>
`

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<title>GenWay — Pitch Deck v2 (Farox Coop)</title>
<style>${css}</style>
</head>
<body>
${slide1}
${slide2}
${slide3}
${slide4}
${slide5}
${slide6}
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
  console.log(`Pitch deck v2 generado en: ${OUT_PDF}`)
} finally {
  fs.unlinkSync(TMP_HTML)
}
