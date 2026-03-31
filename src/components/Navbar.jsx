import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { href: '#problema', label: 'El Problema' },
  { href: '#que-es', label: 'Qué es BestIA' },
  { href: '#como-funciona', label: 'Cómo Funciona' },
  { href: '#beneficios', label: 'Beneficios' },
  { href: '#soberania', label: 'Soberanía' },
  { href: '#patio', label: 'Patio' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <nav className="container navbar__inner" aria-label="Navegación principal">
        <a href="#top" className="navbar__logo" aria-label="BestIA — inicio">
          <span className="navbar__logo-text">Best<span className="navbar__logo-accent">IA</span></span>
        </a>

        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <ul
          id="nav-menu"
          className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}
          role="list"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="navbar__link" onClick={handleLinkClick}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contacto" className="btn btn--primary navbar__cta" onClick={handleLinkClick}>
              Contactar
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

