import { useState, useEffect } from 'react'
import { useT } from '../i18n/LanguageContext'
import './Navbar.css'

export default function Navbar() {
  const { t, lang, toggle } = useT()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)
  const nextLabel = lang === 'es' ? 'EN' : 'ES'

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <nav className="container navbar__inner" aria-label={t.a11y.navLabel}>
        <a href="#top" className="navbar__logo" aria-label={t.a11y.logoAria}>
          <span className="navbar__logo-text">Gen<span className="navbar__logo-accent">IA</span></span>
        </a>

        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
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
          {t.nav.links.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="navbar__link" onClick={handleLinkClick}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="navbar__lang"
              onClick={toggle}
              aria-label={t.a11y.langSwitchAria}
            >
              {nextLabel}
            </button>
          </li>
          <li>
            <a href="#contacto" className="btn btn--primary navbar__cta" onClick={handleLinkClick}>
              {t.nav.cta}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

