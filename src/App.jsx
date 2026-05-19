import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import WhatIsGenIA from './components/WhatIsGenIA'
import HowItWorks from './components/HowItWorks'
import Benefits from './components/Benefits'
import Sovereignty from './components/Sovereignty'
import About from './components/About'
import CTA from './components/CTA'
import Footer from './components/Footer'
import { useT } from './i18n/LanguageContext'

export default function App() {
  const { t } = useT()
  return (
    <>
      <a href="#main-content" className="sr-only">
        {t.a11y.skip}
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Problem />
        <WhatIsGenIA />
        <Sovereignty />
        <HowItWorks />
        <Benefits />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

