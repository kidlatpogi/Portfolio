import React, { useEffect, useState } from 'react'
import MoonImg from '../assets/Moon.png'
import SunImg from '../assets/Sun.png'

export default function ModeSwitcher() {
  const [isLight, setIsLight] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'light'
    } catch {
      return false
    }
  })

  useEffect(() => {
    // Ensure body has the correct class on theme change
    const cls = 'light-mode'
    if (isLight) {
      document.body.classList.add(cls)
      if (typeof localStorage !== 'undefined') localStorage.setItem('theme', 'light')
      // Change favicon to yellow thunder
      const favicon = document.querySelector('link[rel="icon"]')
      if (favicon) {
        favicon.href = './src/assets/thunder-yellow.png'
      }
    } else {
      document.body.classList.remove(cls)
      if (typeof localStorage !== 'undefined') localStorage.setItem('theme', 'dark')
      // Change favicon to blue thunder
      const favicon = document.querySelector('link[rel="icon"]')
      if (favicon) {
        favicon.href = './src/assets/thunder-blue.png'
      }
    }
  }, [isLight])  // toggle with an expanding circular animation from the button position
  function toggle(e) {
    // prevent toggle if an animation is already running
    if (document.body.dataset.themeAnimating === '1') return

    const nextIsLight = !isLight

    // compute click / button center coords
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    // compute radius to farthest corner
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const distX = Math.max(cx, vw - cx)
    const distY = Math.max(cy, vh - cy)
    const radius = Math.hypot(distX, distY)

    // create overlay element
    const overlay = document.createElement('div')
    overlay.className = 'theme-anim'
    overlay.style.setProperty('--x', `${cx}px`)
    overlay.style.setProperty('--y', `${cy}px`)
    overlay.style.setProperty('--r', `${radius}px`)
    // set the overlay color to the target theme's background
    const targetBg = nextIsLight ? getComputedStyle(document.documentElement).getPropertyValue('--light-mode') || '#ffffff' : getComputedStyle(document.documentElement).getPropertyValue('--dark-mode') || '#111111'
    overlay.style.setProperty('--anim-bg', targetBg.trim())

    // mark animating
    document.body.dataset.themeAnimating = '1'
    document.body.appendChild(overlay)

    // trigger the transition on the next frame
    requestAnimationFrame(() => {
      overlay.classList.add('active')
    })

    const cleanup = () => {
      // actually toggle the body class now that the animation covered the screen
      if (nextIsLight) document.body.classList.add('light-mode')
      else document.body.classList.remove('light-mode')

      // persist
      try { localStorage.setItem('theme', nextIsLight ? 'light' : 'dark') } catch { /* ignore */ }

      // remove overlay and unset animating
      overlay.remove()
      delete document.body.dataset.themeAnimating
      setIsLight(nextIsLight)
    }

    // prefer animationend but also set a timeout as a fallback
    const onEnd = () => {
      // accept both transitionend/animationend
      cleanup()
      overlay.removeEventListener('transitionend', onEnd)
      overlay.removeEventListener('animationend', onEnd)
      clearTimeout(timer)
    }

    overlay.addEventListener('transitionend', onEnd)
    overlay.addEventListener('animationend', onEnd)

    const timer = setTimeout(() => {
      // fallback
      if (document.body.dataset.themeAnimating === '1') onEnd()
    }, 1000)
  }

  return (
    <div className="ModeSwitcher">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={isLight}
        aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
        title={isLight ? 'Dark mode' : 'Light mode'}
        className={`mode-btn ${isLight ? 'light' : 'dark'}`}
      >
        {isLight ? (
          <img src={MoonImg} alt="Moon" />
        ) : (
          <img src={SunImg} alt="Sun" />
        )}
      </button>
    </div>
  )
}
