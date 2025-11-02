import React, { useCallback, useEffect, useState } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'

function ParticlesBackground() {
  const [isLight, setIsLight] = useState(() => {
    return document.body.classList.contains('light-mode')
  })

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

  // Theme-aware colors
  const particleColor = isLight ? '#FFC107' : '#6EC1E4'
  const linkColor = isLight ? '#FFA000' : '#6EC1E4'

  // Configuration for subtle, professional particle network
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
          mode: 'grab', // Creates connections when hovering
        },
        onClick: {
          enable: false,
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.5,
          },
        },
      },
    },
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: particleColor, // Theme-aware: blue for dark, yellow for light
      },
      links: {
        enable: true,
        distance: 150,
        color: linkColor, // Theme-aware link colors
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        straight: false,
        outModes: {
          default: 'out',
        },
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: 0.3,
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  }

  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1,
        pointerEvents: 'none' // Allow clicks to pass through
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={options}
      />
    </div>
  )
}

export default ParticlesBackground
