import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const RouterContext = createContext(null)

function normalizePath(pathname) {
  return pathname.replace(/\/+$/, '') || '/'
}

function getCurrentPath() {
  if (typeof window === 'undefined') return '/'
  return normalizePath(window.location.pathname)
}

function scrollToHash(hash) {
  if (!hash) {
    window.scrollTo({ top: 0 })
    return
  }
  // Wait a couple of frames so the target route has time to mount.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(getCurrentPath)

  useEffect(() => {
    if (window.location.hash) scrollToHash(window.location.hash)

    const onPopState = () => {
      setPath(getCurrentPath())
      scrollToHash(window.location.hash)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (to) => {
    const url = new URL(to, window.location.origin)
    const pathname = normalizePath(url.pathname)
    const isSamePath = pathname === path

    window.history.pushState({}, '', pathname + url.hash)
    if (!isSamePath) setPath(pathname)
    scrollToHash(url.hash)
  }

  const value = useMemo(() => ({ path, navigate }), [path])

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useRouter must be used within a RouterProvider')
  return ctx
}

/**
 * Renders an <a> that performs client-side navigation for internal links
 * (anything starting with "/", e.g. "/genbase" or "/#contacto"), while
 * falling back to native behavior for external links.
 */
export function Link({ href, onClick, children, ...rest }) {
  const { navigate } = useRouter()
  const isInternal = href.startsWith('/')

  const handleClick = (e) => {
    if (isInternal) {
      e.preventDefault()
      navigate(href)
    }
    onClick?.(e)
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
