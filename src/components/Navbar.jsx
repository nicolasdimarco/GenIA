import { useState, useEffect, useRef } from 'react'
import { LuChevronDown } from 'react-icons/lu'
import { useT } from '../i18n/LanguageContext'
import { Link } from '../router/Router'
import './Navbar.css'

export default function Navbar() {
  const { t, lang, toggle } = useT()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const productsRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClickOutside = (e) => {
      if (productsRef.current && !productsRef.current.contains(e.target)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const handleLinkClick = () => {
    setMenuOpen(false)
    setProductsOpen(false)
  }
  const nextLabel = lang === 'es' ? 'EN' : 'ES'

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <nav className="container navbar__inner" aria-label={t.a11y.navLabel}>
        <Link href="/" className="navbar__logo" aria-label={t.a11y.logoAria} onClick={handleLinkClick}>
          <span className="navbar__logo-text">Gen<span className="navbar__logo-accent">IA</span></span>
        </Link>

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
              <Link href={href} className="navbar__link" onClick={handleLinkClick}>
                {label}
              </Link>
            </li>
          ))}
          <li className="navbar__products" ref={productsRef}>
            <button
              type="button"
              className={`navbar__link navbar__products-trigger ${productsOpen ? 'navbar__products-trigger--open' : ''}`}
              aria-expanded={productsOpen}
              aria-haspopup="true"
              onClick={() => setProductsOpen(o => !o)}
            >
              {t.nav.products.label}
              <LuChevronDown size={14} aria-hidden="true" className="navbar__products-chevron" />
            </button>
            <ul className={`navbar__dropdown ${productsOpen ? 'navbar__dropdown--open' : ''}`} role="list">
              {t.nav.products.items.map(({ href, label, description }) => (
                <li key={href}>
                  <Link href={href} className="navbar__dropdown-link" onClick={handleLinkClick}>
                    <span className="navbar__dropdown-label">{label}</span>
                    <span className="navbar__dropdown-desc">{description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
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
            <Link href="/#contacto" className="btn btn--primary navbar__cta" onClick={handleLinkClick}>
              {t.nav.cta}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

