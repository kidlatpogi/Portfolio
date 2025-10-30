import React from 'react'

// Smooth scrolling helper: scroll to an element id while accounting for sticky navbar offset
function smoothScrollToId(id, duration = 600) {
  const el = document.getElementById(id.replace('#', ''))
  if (!el) return
  const navbar = document.querySelector('.glass-navbar')
  const offset = (navbar && navbar.offsetHeight) ? navbar.offsetHeight : 72
  const start = window.scrollY || window.pageYOffset
  const end = el.getBoundingClientRect().top + start - offset - 8 // small gap
  const distance = end - start
  let startTime = null

  function easeInOutQuad(t) { return t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t }

  function animate(time) {
    if (!startTime) startTime = time
    const timeElapsed = time - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    const eased = easeInOutQuad(progress)
    window.scrollTo(0, Math.round(start + distance * eased))
    if (timeElapsed < duration) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

export function Nav({ brand = 'Zeus Angelo', children, className = '' }) {
  // use navbar-dark for white text and add a custom glass-navbar class
  const classes = `navbar navbar-expand-lg navbar-dark glass-navbar ${className}`.trim()
  return (
    <nav className={classes}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">{brand}</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {React.Children.map(children, (child, i) => (
              <li className="nav-item" key={i}>{child}</li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export function NavItem({ to = '#', children }) {
  const handleClick = (e) => {
    // if this is an in-page hash link, intercept and run the animated scroll
    if (to && to.startsWith('#')) {
      e.preventDefault()
      smoothScrollToId(to)
      // remove the fragment from the URL (keep pathname + search)
      const cleanUrl = window.location.pathname + window.location.search
      if (history.replaceState) {
        history.replaceState(null, '', cleanUrl)
      } else if (history.pushState) {
        history.pushState(null, '', cleanUrl)
      }
    }
  }

  return (
    <a className="nav-link" href={to} onClick={handleClick}>
      {children}
    </a>
  )
}

export default Nav
