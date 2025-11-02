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

export function Nav({ brand = 'Zeus Bautista', children, className = '' }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Close menu when clicking outside on mobile and lock body scroll
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && window.innerWidth <= 991) {
        const navbar = document.querySelector('.glass-navbar')
        const navCollapse = document.getElementById('navbarNav')
        if (navbar && navCollapse && !navbar.contains(e.target) && !navCollapse.contains(e.target)) {
          closeMenu()
        }
      }
    }

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      // Lock body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      // Unlock body scroll when menu is closed
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
      // Clean up - ensure scroll is unlocked
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // use navbar-dark for white text and add a custom glass-navbar class
  const classes = `navbar navbar-expand-lg navbar-dark glass-navbar ${className}`.trim()
  return (
    <>
      <nav className={classes}>
        <div className="container-fluid">
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={toggleMenu}
            aria-controls="navbarNav" 
            aria-expanded={isMenuOpen} 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <a className="navbar-brand" href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img 
              src="./src/assets/thunder-blue.png" 
              alt="Thunder Icon" 
              className="navbar-thunder-icon dark-mode-thunder"
              style={{ width: '28px', height: '28px', display: 'block' }}
            />
            <img 
              src="./src/assets/thunder-yellow.png" 
              alt="Thunder Icon" 
              className="navbar-thunder-icon light-mode-thunder"
              style={{ width: '28px', height: '28px', display: 'none' }}
            />
            {brand}
          </a>
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {React.Children.map(children, (child, i) => (
                <li className="nav-item" key={i}>
                  {React.cloneElement(child, {
                    onClick: (e) => {
                      if (child.props.onClick) child.props.onClick(e)
                      closeMenu()
                    }
                  })}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      {/* Backdrop overlay for closing menu */}
      {isMenuOpen && <div className="navbar-backdrop-overlay" onClick={closeMenu}></div>}
    </>
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
