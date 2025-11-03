import React, { useCallback, useEffect, useState } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'

function ParticlesBackground() {
  const [isLight, setIsLight] = useState(() => {
    return document.body.classList.contains('light-mode')
  })
  
  const [isEnabled, setIsEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('particlesEnabled')
      return saved !== null ? JSON.parse(saved) : false // Default to OFF
    } catch {
      return false // Default to OFF
    }
  })
  
  const [showTooltip, setShowTooltip] = useState(false)

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.body.classList.contains('light-mode'))
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  // Theme-aware colors - yellow for light mode, blue for dark mode
  const particleColor = isLight ? '#FFA000' : '#6EC1E4'
  const linkColor = isLight ? '#FF8F00' : '#4FC3F7'

  // Configuration for lightning/electrical network effect
  const options = {
    background: {
      color: {
        value: 'transparent', // Let the body background show through
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'grab', // Connect particles to cursor like electricity
        },
        onClick: {
          enable: true,
          mode: 'push', // Add burst of particles on click
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 200,
          links: {
            opacity: 0.8,
            color: linkColor,
          },
        },
        push: {
          quantity: 4,
        },
      },
    },
    particles: {
      number: {
        value: 120, // Moderate amount for lightning network
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: particleColor, // Electric blue
      },
      links: {
        enable: true, // Enable lightning-like connections
        distance: 150,
        color: linkColor,
        opacity: isLight ? 0.4 : 0.5, // More visible in light mode
        width: 1.5, // Thicker lines for lightning effect
        triangles: {
          enable: false,
        },
      },
      move: {
        enable: true,
        speed: 2, // Faster movement for electric feel
        direction: 'none',
        random: true,
        straight: false,
        outModes: {
          default: 'bounce',
        },
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200,
        },
        bounce: true,
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: isLight ? 0.6 : 0.7, // More visible opacity
        random: true,
        animation: {
          enable: true,
          speed: 1.5,
          minimumValue: 0.3,
          sync: false,
        },
      },
      size: {
        value: { min: 1, max: 3 }, // Slightly larger particles
        random: true,
        animation: {
          enable: true,
          speed: 3,
          minimumValue: 0.5,
          sync: false,
        },
      },
    },
    detectRetina: true,
  }

  const toggleParticles = () => {
    const newState = !isEnabled
    setIsEnabled(newState)
    localStorage.setItem('particlesEnabled', JSON.stringify(newState))
  }

  const handleToggleClick = () => {
    toggleParticles()
    setShowTooltip(false) // Hide tooltip after click
  }

  if (!isEnabled) {
    return (
      <div 
        className="particles-toggle-wrapper"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onTouchStart={() => setShowTooltip(false)}
      >
        <button 
          className="particles-toggle" 
          onClick={handleToggleClick}
          aria-label="Enable particles"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
        {showTooltip && (
          <div className="particles-tooltip">
            Click to enable particle effects
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: -1,
          pointerEvents: 'none'
        }}
      >
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={options}
        />
      </div>
      <div 
        className="particles-toggle-wrapper"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <button 
          className="particles-toggle active" 
          onClick={toggleParticles}
          aria-label="Disable particles"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        {showTooltip && (
          <div className="particles-tooltip">
            Click to disable particle effects
          </div>
        )}
      </div>
    </>
  )
}

export default ParticlesBackground
