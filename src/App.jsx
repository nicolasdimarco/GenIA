import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import WhatIsGenIA from './components/WhatIsGenIA'
import Benefits from './components/Benefits'
import About from './components/About'
import CTA from './components/CTA'
import Footer from './components/Footer'
import GenBase from './components/GenBase'
import GenwayPage from './components/GenwayPage'
import InferenciaPage from './components/InferenciaPage'
import { useT } from './i18n/LanguageContext'
import { useRouter } from './router/Router'

function Landing() {
  return (
    <main id="main-content">
      <Hero />
      <Problem />
      <WhatIsGenIA />
      <Benefits />
      <About />
      <CTA />
    </main>
  )
}

const PAGES = {
  '/genbase': GenBase,
  '/genway': GenwayPage,
  '/inferencia': InferenciaPage,
}

export default function App() {
  const { t } = useT()
  const { path } = useRouter()
  const Page = PAGES[path]

  return (
    <>
      <a href="#main-content" className="sr-only">
        {t.a11y.skip}
      </a>
      <Navbar />
      {Page ? <Page /> : <Landing />}
      <Footer />
    </>
  )
}

