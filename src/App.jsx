import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import WhatIsGenIA from './components/WhatIsGenIA'
import HowItWorks from './components/HowItWorks'
import Benefits from './components/Benefits'
import Sovereignty from './components/Sovereignty'
import AboutPatio from './components/AboutPatio'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <a href="#main-content" className="sr-only">
        Saltar al contenido principal
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Problem />
        <WhatIsGenIA />
        <Sovereignty />
        <HowItWorks />
        <Benefits />
        <AboutPatio />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

