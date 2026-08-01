#!/usr/bin/env node
/**
 * Genera GenIA.pdf en la raíz del proyecto, replicando el diseño y el orden
 * de secciones del sitio (versión en español).
 *
 * Requiere Google Chrome / Chromium instalado y accesible en PATH
 * (variable de entorno CHROME_BIN para indicar una ruta distinta).
 *
 * Uso: node scripts/generate-pdf.mjs
 *      npm run pdf
 */
import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_PDF = path.join(ROOT, 'GenIA.pdf')
const TMP_HTML = path.join(ROOT, '.pdf-build.tmp.html')

// --- Traducciones (español) ---
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
    'LuScale', 'LuTrendingUp', 'LuShieldOff', 'LuLock',
    'LuMap',
    'LuGauge', 'LuLockKeyhole', 'LuShuffle', 'LuShieldCheck', 'LuChevronRight',
    'LuFileText', 'LuActivity', 'LuReceipt', 'LuServer',
  ].map((name) => [name, iconToSvg(name)])
)

// --- Logos como base64 ---
const logoFarox = fs.readFileSync(path.join(ROOT, 'src/img/logo-farox.png')).toString('base64')
const logoCamba = fs.readFileSync(path.join(ROOT, 'src/img/logo-camba.png')).toString('base64')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const problemIcons = [icons.LuScale, icons.LuTrendingUp, icons.LuShieldOff, icons.LuLock]
const genwayIcons = [icons.LuGauge, icons.LuLockKeyhole, icons.LuShuffle, icons.LuShieldCheck]
const genwayColors = ['blue', 'green', 'blue', 'green']
const benefitsIcons = [icons.LuFileText, icons.LuActivity, icons.LuReceipt, icons.LuServer]
const benefitsColors = ['green', 'blue', 'green', 'blue']
const sovereigntyColors = ['blue', 'green', 'blue']
const layerColors = ['blue', 'green', 'blue', 'green', 'blue', 'green', 'blue']

// ============ CSS ============
const css = `
@page { size: A4; margin: 0; }
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
  line-height: 1.6;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
h1,h2,h3,h4 { line-height: 1.2; font-weight: 700; }
h1 { font-size: 2.4rem; }
h2 { font-size: 1.9rem; }
h3 { font-size: 1.3rem; }

.page {
  width: 100%;
  padding: 3.2rem 3rem;
  page-break-after: always;
  position: relative;
  overflow: hidden;
  min-height: 297mm;
}
.page:last-child { page-break-after: auto; }

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
.badge--blue { background: rgba(150, 216, 253, 0.12); color: var(--color-blue); border: 1px solid rgba(150, 216, 253, 0.3); }
.badge--green { background: rgba(91, 241, 117, 0.12); color: var(--color-green); border: 1px solid rgba(91, 241, 117, 0.3); }

.section-header { text-align: center; margin-bottom: 2.2rem; }
.section-header h2 { margin-bottom: 0.75rem; }
.section-header p { font-size: 1.05rem; color: var(--color-text-muted); max-width: 600px; margin: 0 auto; }

.accent {
  background: linear-gradient(135deg, var(--color-blue) 30%, var(--color-green));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ===== COVER ===== */
.cover {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 297mm;
  background: radial-gradient(circle at 20% 15%, rgba(150,216,253,0.15), transparent 45%),
              radial-gradient(circle at 80% 85%, rgba(91,241,117,0.12), transparent 45%),
              var(--color-bg);
}
.cover__logo { font-size: 3.5rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 1.5rem; }
.cover__logo .accent-blue { color: var(--color-blue); }
.cover__badge { margin-bottom: 1.5rem; }
.cover h1 { font-size: 3rem; margin-bottom: 1rem; max-width: 700px; }
.cover h2 { font-size: 1.5rem; font-weight: 600; color: var(--color-text-muted); margin-bottom: 2rem; max-width: 650px; }
.cover h2 .accent { font-weight: 700; }
.cover p.lead { color: var(--color-text-muted); max-width: 620px; font-size: 1.05rem; line-height: 1.7; }
.cover p.lead strong { color: var(--color-text); }
.cover__footer { margin-top: 3rem; font-size: 0.85rem; color: var(--color-text-muted); }

/* ===== PROBLEM ===== */
.problem-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
.problem-card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--border-radius-lg); padding: 1.5rem; }
.problem-icon { color: var(--color-blue); margin-bottom: 0.75rem; }
.problem-card h3 { font-size: 1.05rem; margin-bottom: 0.5rem; }
.problem-card p { font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.6; }

/* ===== WHATIS ===== */
.whatis-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: start; }
.whatis-lead { font-size: 1.05rem; color: var(--color-text-muted); margin-bottom: 1rem; line-height: 1.7; }
.whatis-body { color: var(--color-text-muted); line-height: 1.7; }
.whatis-card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--border-radius-lg); padding: 1.75rem; }
.whatis-card h3 { font-size: 1.15rem; margin-bottom: 1.25rem; display:flex; align-items:center; gap:0.5rem; }
.whatis-list { list-style: none; display: flex; flex-direction: column; gap: 0.9rem; }
.whatis-list li { display: flex; gap: 0.75rem; font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.5; }
.step-num { flex-shrink: 0; font-size: 0.72rem; font-weight: 800; color: var(--color-green); background: rgba(91,241,117,0.1); border: 1px solid rgba(91,241,117,0.25); border-radius: 6px; padding: 0.15rem 0.45rem; height: fit-content; }
.step-title { color: var(--color-text); }

/* ===== SOVEREIGNTY ===== */
.sov-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
.sov-pillar { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--border-radius-lg); padding: 1.5rem; }
.sov-metric { font-size: 1.9rem; font-weight: 800; line-height: 1; margin-bottom: 0.2rem; }
.sov-pillar--blue .sov-metric { color: var(--color-blue); }
.sov-pillar--green .sov-metric { color: var(--color-green); }
.sov-metric-label { font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-muted); display:block; margin-bottom: 0.9rem; }
.sov-pillar h3 { font-size: 1.05rem; margin-bottom: 0.5rem; }
.sov-pillar--blue h3 { color: var(--color-blue); }
.sov-pillar--green h3 { color: var(--color-green); }
.sov-pillar p { font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.6; }

/* ===== HOWIT (stack) ===== */
.stack-label { text-align: center; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-text-muted); padding: 0.4rem 0; }
.stack { display: flex; flex-direction: column; gap: 4px; margin: 0.5rem 0; }
.layer { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 4px; padding: 0.75rem 1rem; display: grid; grid-template-columns: 56px 1fr; align-items: center; gap: 1rem; break-inside: avoid; page-break-inside: avoid; }
.layer--blue { border-left: 4px solid var(--color-blue); }
.layer--green { border-left: 4px solid var(--color-green); }
.layer-num { display:flex; flex-direction:column; align-items:center; justify-content:center; padding: 0.4rem 0.3rem; border-radius: 8px; background: rgba(0,0,0,0.25); }
.layer-num-label { font-size: 0.55rem; font-weight: 700; letter-spacing: 0.1em; color: var(--color-text-muted); }
.layer-num-value { font-size: 1.25rem; font-weight: 800; line-height:1; }
.layer--blue .layer-num-value { color: var(--color-blue); }
.layer--green .layer-num-value { color: var(--color-green); }
.layer-body { display: grid; grid-template-columns: 140px 1fr; gap: 0.9rem; align-items: center; }
.layer-name { font-size: 0.92rem; font-weight: 700; }
.layer-tools { list-style:none; display:flex; flex-wrap:wrap; gap:0.35rem; }
.layer-tools li { font-size: 0.68rem; font-weight:600; background: rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-radius:6px; padding: 0.15rem 0.4rem; }
.layer-desc { font-size: 0.75rem; color: var(--color-text-muted); line-height: 1.5; grid-column: 1 / -1; margin-top:0.3rem; }
.transversal { margin-top: 0.75rem; border: 1px dashed var(--color-green); border-radius: 4px; padding: 1rem 1.25rem; background: var(--color-bg-card); text-align:center; break-inside: avoid; page-break-inside: avoid; }
.transversal-label { font-size: 0.68rem; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; color: var(--color-green); margin-bottom:0.5rem; }
.transversal h3 { font-size: 0.95rem; margin-bottom:0.4rem; }
.transversal .layer-tools { justify-content:center; margin-bottom:0.4rem; }
.transversal p { font-size:0.75rem; color: var(--color-text-muted); }

/* ===== GENWAY ===== */
.genway-flow { display:flex; align-items:center; justify-content:center; gap: 1rem; margin-bottom: 2rem; padding: 1.5rem 1rem; background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--border-radius-lg); }
.flow-circle { display:flex; flex-direction:column; align-items:center; justify-content:center; border-radius:50%; text-align:center; flex-shrink:0; }
.flow-circle--org { width:120px; height:120px; border: 1.5px solid rgba(150,216,253,0.35); }
.flow-circle--hub { width:140px; height:140px; border: 1.5px solid var(--color-blue); background: radial-gradient(circle at 30% 25%, rgba(150,216,253,0.18), rgba(91,241,117,0.1) 60%, transparent 100%); }
.flow-circle--models { width:130px; height:130px; border: 1.5px solid rgba(91,241,117,0.35); padding: 0.5rem; }
.flow-label { font-size: 0.8rem; font-weight:700; }
.flow-label--org { color: var(--color-blue); text-transform:uppercase; }
.flow-label--hub { font-size:1rem; font-weight:800; }
.flow-sub { font-size: 0.62rem; color: var(--color-text-muted); margin-top:0.4rem; }
.flow-chips { display:flex; flex-wrap:wrap; justify-content:center; gap:0.2rem; margin-top:0.4rem; }
.flow-chip { font-size: 0.55rem; font-weight:600; color: var(--color-text-muted); background: rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-radius:9999px; padding: 0.12rem 0.4rem; }
.flow-arrow { color: var(--color-blue); flex-shrink:0; }
.genway-timeline { display:flex; flex-direction:column; gap: 1.25rem; margin-bottom: 1.5rem; }
.timeline-item { display:flex; gap: 1rem; }
.timeline-marker { width: 2rem; height:2rem; flex-shrink:0; display:flex; align-items:center; justify-content:center; border-radius:50%; background: var(--color-bg-card); }
.timeline-item--blue .timeline-marker { color: var(--color-blue); border: 1.5px solid var(--color-blue); }
.timeline-item--green .timeline-marker { color: var(--color-green); border: 1.5px solid var(--color-green); }
.timeline-tag { display:block; font-size:0.68rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:0.3rem; }
.timeline-item--blue .timeline-tag { color: var(--color-blue); }
.timeline-item--green .timeline-tag { color: var(--color-green); }
.timeline-content h3 { font-size: 1rem; margin-bottom:0.35rem; }
.timeline-content p { font-size: 0.8rem; color: var(--color-text-muted); line-height: 1.6; }
.genway-cta { text-align:center; padding: 1.5rem; background: linear-gradient(135deg, rgba(150,216,253,0.06), rgba(91,241,117,0.05)); border: 1px solid var(--color-border); border-radius: var(--border-radius-lg); }
.genway-cta h3 { font-size: 1.2rem; margin-bottom: 0.5rem; }
.genway-cta p { color: var(--color-text-muted); font-size:0.85rem; }

/* ===== BENEFITS ===== */
.benefits-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
.benefit-card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--border-radius-lg); padding: 1.5rem; }
.benefit-icon { margin-bottom: 0.6rem; }
.benefit-card--blue .benefit-icon { color: var(--color-blue); }
.benefit-card--green .benefit-icon { color: var(--color-green); }
.benefit-tag { font-size: 0.68rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color: var(--color-text-muted); opacity:0.7; margin-bottom:0.4rem; }
.benefit-card h3 { font-size: 1.05rem; margin-bottom: 0.5rem; }
.benefit-card--blue h3 { color: var(--color-blue); }
.benefit-card--green h3 { color: var(--color-green); }
.benefit-card p { font-size: 0.8rem; color: var(--color-text-muted); line-height: 1.6; }

/* ===== ABOUT ===== */
.about-intro { text-align:center; max-width: 640px; margin: 0 auto 2rem; }
.about-intro p { font-size: 1.05rem; color: var(--color-text-muted); line-height: 1.7; }
.about-intro p strong { color: var(--color-text); }
.coops { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; max-width: 700px; margin: 0 auto; }
.coop { display:flex; flex-direction:column; align-items:center; gap: 1rem; background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--border-radius-lg); padding: 1.5rem; }
.coop img { width: 100%; max-width: 220px; object-fit: contain; }
.coop-link { font-size: 0.8rem; font-weight:600; color: var(--color-green); }

/* ===== CTA ===== */
.cta-box { text-align:center; max-width: 700px; margin: 0 auto 2rem; }
.cta-box p { color: var(--color-text-muted); line-height: 1.7; margin-bottom: 1.5rem; }
.perks { list-style:none; display:flex; flex-direction:column; gap: 0.6rem; max-width: 560px; margin: 0 auto; text-align:left; }
.perks li { display:flex; align-items:center; gap: 0.6rem; font-size: 0.85rem; color: var(--color-text-muted); }
.perk-check { flex-shrink:0; width:20px; height:20px; background: rgba(91,241,117,0.12); color: var(--color-green); border:1px solid rgba(91,241,117,0.3); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.65rem; font-weight:700; }
.contact-info { text-align:center; margin-top: 2rem; }
.contact-info a { color: var(--color-blue); font-weight:600; text-decoration:none; font-size: 1.1rem; }

/* ===== FOOTER ===== */
.footer-page { display:flex; flex-direction:column; justify-content:flex-end; }
.footer-logo { font-size: 1.6rem; font-weight:800; margin-bottom:0.5rem; }
.footer-logo .accent-blue { color: var(--color-blue); }
.footer-tagline { color: var(--color-text-muted); font-size:0.9rem; margin-bottom:0.4rem; }
.footer-copy { font-size:0.75rem; color: var(--color-text-muted); }
.footer-copy a { color: var(--color-blue); text-decoration:none; }
.footer-bottom { border-top: 1px solid var(--color-border); margin-top: 1.5rem; padding-top:1rem; font-size:0.72rem; color: var(--color-text-muted); text-align:center; }

/* ===== AVOID AWKWARD PAGE BREAKS ===== */
.problem-card, .sov-pillar, .benefit-card, .coop, .timeline-item,
.whatis-card, .genway-cta, .layer, .transversal, .genway-flow,
.section-header, .cover {
  break-inside: avoid;
  page-break-inside: avoid;
}
`

// ============ SECTIONS (mismo orden que src/App.jsx) ============

const coverHtml = `
<div class="page cover">
  <div class="cover__logo">Gen<span class="accent-blue">IA</span></div>
  <span class="badge badge--blue cover__badge">${esc(t.hero.badge)}</span>
  <h1>${esc(t.hero.title)}</h1>
  <h2>${esc(t.hero.subtitle)} <span class="accent">${esc(t.hero.subtitleAccent)}</span>.</h2>
  <p class="lead">${esc(t.hero.leadStart)} <strong>${esc(t.hero.leadStrong1)}</strong>${esc(t.hero.leadMid)} <strong>${esc(t.hero.leadStrong2)}</strong>.</p>
  <div class="cover__footer">IA soberana, construida por cooperativas · genia.coop</div>
</div>
`

const problemHtml = `
<div class="page">
  <div class="section-header">
    <span class="badge badge--blue">${esc(t.problem.badge)}</span>
    <h2>${esc(t.problem.title)}</h2>
    <p>${esc(t.problem.lead)}</p>
  </div>
  <div class="problem-grid">
    ${t.problem.items.map((item, idx) => `
    <div class="problem-card">
      <div class="problem-icon">${problemIcons[idx]}</div>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.description)}</p>
    </div>`).join('')}
  </div>
</div>
`

const whatisHtml = `
<div class="page">
  <div class="section-header">
    <span class="badge badge--green">${esc(t.whatIs.badge)}</span>
    <h2>${esc(t.whatIs.title)}</h2>
  </div>
  <div class="whatis-layout">
    <div>
      <p class="whatis-lead">${esc(t.whatIs.lead)}</p>
      <p class="whatis-body">${esc(t.whatIs.body)}</p>
    </div>
    <div class="whatis-card">
      <h3>${icons.LuMap} ${esc(t.whatIs.cardTitle)}</h3>
      <ul class="whatis-list">
        ${t.whatIs.steps.map(s => `
        <li>
          <span class="step-num">${esc(s.number)}</span>
          <span><span class="step-title"><strong>${esc(s.title)}</strong></span> ${esc(s.text)}</span>
        </li>`).join('')}
      </ul>
    </div>
  </div>
</div>
`

const sovereigntyHtml = `
<div class="page">
  <div class="section-header">
    <span class="badge badge--blue">${esc(t.sovereignty.badge)}</span>
    <h2>${esc(t.sovereignty.titleStart)} <span class="accent">${esc(t.sovereignty.titleAccent)}</span></h2>
    <p>${esc(t.sovereignty.lead)}</p>
  </div>
  <div class="sov-pillars">
    ${t.sovereignty.items.map((p, idx) => `
    <div class="sov-pillar sov-pillar--${sovereigntyColors[idx]}">
      <span class="sov-metric">${esc(p.metric)}</span>
      <span class="sov-metric-label">${esc(p.metricLabel)}</span>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.body)}</p>
    </div>`).join('')}
  </div>
</div>
`

const layersRev = [...t.howItWorks.layers]
  .map((l, i) => ({ ...l, num: i + 1, color: layerColors[i] }))
  .reverse()
const howitHtml = `
<div class="page">
  <div class="section-header">
    <span class="badge badge--blue">${esc(t.howItWorks.badge)}</span>
    <h2>${esc(t.howItWorks.title)}</h2>
    <p>${esc(t.howItWorks.lead)}</p>
  </div>
  <div class="stack-label">${esc(t.howItWorks.topLabel)}</div>
  <div class="stack">
    ${layersRev.map(item => `
    <div class="layer layer--${item.color}">
      <div class="layer-num">
        <span class="layer-num-label">${esc(t.howItWorks.layerWord)}</span>
        <span class="layer-num-value">${item.num}</span>
      </div>
      <div class="layer-body">
        <span class="layer-name">${esc(item.name)}</span>
        <ul class="layer-tools">${item.tools.map(tool => `<li>${esc(tool)}</li>`).join('')}</ul>
        <p class="layer-desc">${esc(item.description)}</p>
      </div>
    </div>`).join('')}
  </div>
  <div class="stack-label">${esc(t.howItWorks.bottomLabel)}</div>
  <div class="transversal">
    <div class="transversal-label">${esc(t.howItWorks.transversalLabel)}</div>
    <h3>${esc(t.howItWorks.transversal.name)}</h3>
    <ul class="layer-tools">${t.howItWorks.transversal.tools.map(tool => `<li>${esc(tool)}</li>`).join('')}</ul>
    <p>${esc(t.howItWorks.transversal.description)}</p>
  </div>
</div>
`

const d = t.genway.diagram
const genwayHtml = `
<div class="page">
  <div class="section-header">
    <span class="badge badge--blue">${esc(t.genway.badge)}</span>
    <h2>${esc(t.genway.title)}</h2>
    <p>${esc(t.genway.lead)}</p>
  </div>
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
      <span class="flow-label" style="color:var(--color-green); font-size:0.7rem; text-transform:uppercase;">${esc(d.modelsLabel)}</span>
      <div class="flow-chips">${d.models.map(m => `<span class="flow-chip">${esc(m)}</span>`).join('')}</div>
    </div>
  </div>
  <div class="genway-timeline">
    ${t.genway.items.map((item, idx) => `
    <div class="timeline-item timeline-item--${genwayColors[idx]}">
      <div class="timeline-marker">${genwayIcons[idx]}</div>
      <div class="timeline-content">
        <span class="timeline-tag">${esc(item.tag)}</span>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.description)}</p>
      </div>
    </div>`).join('')}
  </div>
  <div class="genway-cta">
    <h3>${esc(t.genway.cta.title)}</h3>
    <p>${esc(t.genway.cta.lead)}</p>
  </div>
</div>
`

const benefitsHtml = `
<div class="page">
  <div class="section-header">
    <span class="badge badge--green">${esc(t.benefits.badge)}</span>
    <h2>${esc(t.benefits.title)}</h2>
    <p>${esc(t.benefits.lead)}</p>
  </div>
  <div class="benefits-grid">
    ${t.benefits.items.map((b, idx) => `
    <div class="benefit-card benefit-card--${benefitsColors[idx]}">
      <div class="benefit-icon">${benefitsIcons[idx]}</div>
      <div class="benefit-tag">${esc(b.tag)}</div>
      <h3>${esc(b.title)}</h3>
      <p>${esc(b.description)}</p>
    </div>`).join('')}
  </div>
</div>
`

const aboutHtml = `
<div class="page">
  <div class="section-header">
    <span class="badge badge--green">${esc(t.about.badge)}</span>
    <h2>${esc(t.about.titleStart)} <span class="accent">${esc(t.about.titleAccent)}</span></h2>
  </div>
  <div class="about-intro">
    <p>${esc(t.about.leadStart)} <strong>${esc(t.about.leadBrand)}</strong> ${esc(t.about.leadMid)} <strong>Farox</strong> ${esc(t.about.leadAnd)} <strong>Cambá</strong>${esc(t.about.leadEnd)}</p>
  </div>
  <div class="coops">
    <div class="coop">
      <img src="data:image/png;base64,${logoFarox}" alt="Logo Farox" />
      <span class="coop-link">farox.coop</span>
    </div>
    <div class="coop">
      <img src="data:image/png;base64,${logoCamba}" alt="Logo Cambá" />
      <span class="coop-link">camba.coop</span>
    </div>
  </div>
</div>
`

const ctaHtml = `
<div class="page">
  <div class="section-header">
    <span class="badge badge--green">${esc(t.cta.badge)}</span>
    <h2>${esc(t.cta.title)}</h2>
  </div>
  <div class="cta-box">
    <p>${esc(t.cta.lead)}</p>
    <ul class="perks">
      ${t.cta.perks.map(item => `<li><span class="perk-check">✓</span>${esc(item)}</li>`).join('')}
    </ul>
  </div>
  <div class="contact-info">
    <p style="color: var(--color-text-muted); font-size:0.9rem; margin-bottom:0.5rem;">${esc(t.cta.directContact)}</p>
    <a href="mailto:hola@genia.coop">hola@genia.coop</a>
  </div>
</div>
`

const year = new Date().getFullYear()
const footerHtml = `
<div class="page footer-page">
  <div>
    <div class="footer-logo">Gen<span class="accent-blue">IA</span></div>
    <p class="footer-tagline">${esc(t.footer.tagline)}</p>
    <p class="footer-copy">CC ${year} <a href="https://genia.coop">Genia</a>. ${esc(t.footer.copy)}</p>
    <div class="footer-bottom">${esc(t.footer.bottom)}</div>
  </div>
</div>
`

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<title>GenIA — IA Soberana</title>
<style>${css}</style>
</head>
<body>
${coverHtml}
${problemHtml}
${whatisHtml}
${sovereigntyHtml}
${howitHtml}
${genwayHtml}
${benefitsHtml}
${aboutHtml}
${ctaHtml}
${footerHtml}
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
  console.log(`PDF generado en: ${OUT_PDF}`)
} finally {
  fs.unlinkSync(TMP_HTML)
}
