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
    const cls = 'light-mode'
    if (isLight) {
      document.body.classList.add(cls)
      if (typeof localStorage !== 'undefined') localStorage.setItem('theme', 'light')
    } else {
      document.body.classList.remove(cls)
      if (typeof localStorage !== 'undefined') localStorage.setItem('theme', 'dark')
    }
  }, [isLight])

  function toggle() {
    setIsLight(v => !v)
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
