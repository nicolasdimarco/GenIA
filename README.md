# GenIA — IA Soberana para Tu Organización

> Implementamos estrategias de Inteligencia Artificial self-hosted con tecnología Open Source.
> Sin dependencia de proveedores, sin fugas de datos y con infraestructura 100% propia.

🌐 **[Ver sitio en vivo](https://nicolasdimarco.github.io/GenIA/)**

---

## ¿Qué es GenIA?

**GenIA** es una propuesta de servicio de [Farox](https://farox.coop) y [Cambá](https://camba.coop)  para implementar estrategias de **IA soberana** en organizaciones que necesitan:

- Control total de sus datos e infraestructura
- Reducir la dependencia de proveedores externos (ChatGPT, Copilot, etc.)
- Cumplir con regulaciones de privacidad (GDPR, LGPD, legislación local)
- Reducir costos impredecibles por tokens y suscripciones

---

## 🏗️ AI Open Stack

| Capa | Tecnología | Función |
|------|-----------|---------|
| 7 · Interfaz | OpenWebUI | Chat, RAG y herramientas |
| 6 · Orquestación | Langflow, MCP | Agentes y flujos de trabajo |
| 5 · Aplicativos | Page Assist, M.A.I.D, OpenCode | Browser, mobile y dev |
| 4 · Modelos | Llama 3.1, DeepSeek, Mistral, Phi-3 | LLMs open-source |
| 3 · Gestión | Ollama | Administración de modelos |
| 2 · Motor | Llama.cpp | Inferencia CPU/GPU |
| 1 · Hardware | A medida | Físico o cloud privado |
| ↔ Transversal | LangFuse | Observabilidad total |

---

## 🛠️ Stack del Sitio

Este repositorio contiene la **landing page comercial** de GenIA, desarrollada con:

| Tecnología | Versión | Rol |
|-----------|---------|-----|
| [React](https://react.dev/) | 18 | UI framework |
| [Vite](https://vitejs.dev/) | 5 | Build tool |
| [react-icons](https://react-icons.github.io/react-icons/) | 5 | Iconografía (Lucide) |
| CSS Variables | — | Design system |

> 100% software libre. Sin dependencias privativas.

---

## 🚀 Desarrollo local

```bash
# Clonar el repositorio
git clone https://github.com/nicolasdimarco/GenIA.git
cd GenIA

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:5173/`

---

## 📦 Build y despliegue

```bash
# Generar build de producción
npm run build

# Previsualizar el build localmente
npm run preview
```

El despliegue a **GitHub Pages** es automático vía GitHub Actions en cada push a `master`.

---

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── Navbar          # Navegación principal
│   ├── Hero            # Hero section
│   ├── Problem         # Problemas que resolvemos
│   ├── WhatIsGenIA     # Metodología (5 pasos)
│   ├── Sovereignty     # Retorno de inversión
│   ├── HowItWorks      # AI Open Stack (7 capas)
│   ├── Benefits        # Casos de uso por industria
│   ├── About           # Sobre Farox y Cambá
│   ├── CTA             # Formulario de contacto
│   └── Footer          # Footer
├── App.jsx             # Composición de secciones
├── main.jsx            # Entry point
└── index.css           # Design system (tokens CSS)
```

---

## 🎨 Design System

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-blue` | `#96D8FD` | Primario |
| `--color-green` | `#5BF175` | Acento / CTA |
| `--color-bg` | `#0a0f1e` | Fondo principal |
| `--font-family` | Inter | Tipografía |

---

## 🤝 Sobre Farox y Cambá

Las cooperativas de tecnología trabajamos de manera colaborativa para crear una tecnología más justa y soberana. GenIA nace como una iniciativa de las cooperativas **Farox** y **Cambá**, con el objetivo de acompañar a organizaciones que buscan adoptar IA de manera controlada y segura.

📧 [hola@genia.coop](mailto:hola@genia.coop) · 🌐 [genia.coop](https://genia.coop)

---

## 📄 Licencia

Código libre. Datos tuyos.
