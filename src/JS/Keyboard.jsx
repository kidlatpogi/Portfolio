import React, { useEffect, useRef, useState } from 'react'
import '../CSS/Keyboard.css'

import sound1 from '../assets/Keycaps/sound1.mp3'
import sound2 from '../assets/Keycaps/sound2.mp3'

const keycapData = [
    { id: 'one', name: 'HTML5', icon: 'html5', keycap: 'one.png', layer: 1 },
    { id: 'two', name: 'CSS3', icon: 'css3', keycap: 'two.png', layer: 1 },
    { id: 'three', name: 'JavaScript', icon: 'javascript', keycap: 'three.png', layer: 1 },
    { id: 'four', name: 'ReactJS', icon: 'react', keycap: 'four.png', layer: 1 },
    { id: 'five', name: 'MySQL', icon: 'mysql', keycap: 'five.png', layer: 1 },
    { id: 'six', name: 'Firebase', icon: 'firebase', keycap: 'six.png', layer: 2 },
    { id: 'seven', name: 'Python', icon: 'python', keycap: 'seven.png', layer: 2 },
    { id: 'eight', name: 'Git', icon: 'git', keycap: 'eight.png', layer: 2 },
    { id: 'nine', name: 'GitHub', icon: 'github', keycap: 'nine.png', layer: 2 },
    { id: 'ten', name: 'VsCode', icon: 'visualstudiocode', keycap: 'ten.png', layer: 2 },
    { id: 'eleven', name: 'Godot', icon: 'godotengine', keycap: 'eleven.png', layer: 3 },
    { id: 'twelve', name: 'Photoshop', icon: 'adobephotoshop', keycap: 'twelve.png', layer: 3 },
    { id: 'thirteen', name: 'Canva', icon: 'canva', keycap: 'thirteen.png', layer: 3 },
    { id: 'fourteen', name: 'Figma', icon: 'figma', keycap: 'fourteen.png', layer: 3 },
    { id: 'fifteen', name: 'hello', icon: 'trash', keycap: 'black.png', layer: 3, isDelete: true, isCustom: true }
]

const Keyboard = ({ isLinear }) => {
  const keyRefs = useRef({})
  const clickAudioRef = useRef(null)
  const [selectedKey, setSelectedKey] = useState({ id: 'hello', name: 'HELLO', isDefault: true })

  useEffect(() => {
    if (!clickAudioRef.current) {
      const audio = new Audio(isLinear ? sound1 : sound2)
      audio.preload = 'auto'
      audio.muted = false
      audio.volume = 0.5
      clickAudioRef.current = audio
    } else {
      // Update audio source when toggle changes
      clickAudioRef.current.src = isLinear ? sound1 : sound2
    }

    // Inline SVG logos after component mounts
    const inlineLogos = async () => {
      const logoImgs = document.querySelectorAll('.keypad img.key__logo')
      
      await Promise.all(
        Array.from(logoImgs).map(async (img) => {
          try {
            const src = img.src
            if (!src || !src.includes('simple-icons')) return

            const resp = await fetch(src)
            if (!resp.ok) return
            
            const text = await resp.text()
            const parser = new DOMParser()
            const doc = parser.parseFromString(text, 'image/svg+xml')
            const svg = doc.querySelector('svg')
            
            if (!svg) return

            svg.setAttribute('class', 'inlined-logo')
            svg.setAttribute('role', 'img')
            
            // Remove hard-coded fill attributes and use currentColor
            const filled = svg.querySelectorAll('[fill]')
            filled.forEach((n) => n.removeAttribute('fill'))
            svg.setAttribute('fill', 'currentColor')
            
            img.replaceWith(svg)
          } catch (err) {
            console.warn('Failed to inline logo:', err)
          }
        })
      )
    }

    inlineLogos()

    // Add press event handlers
    const handlePointerDown = (id) => {
      if (keyRefs.current[id]) {
        keyRefs.current[id].dataset.pressed = 'true'
        
        // If delete key (fifteen) is clicked, reset to HELLO
        if (id === 'fifteen') {
          setSelectedKey({ id: 'hello', name: 'HELLO', isDefault: true })
        } else {
          // Set the selected key to show text
          const key = keycapData.find(k => k.id === id)
          if (key) {
            setSelectedKey(key)
          }
        }
        
        // Play click sound
        if (clickAudioRef.current) {
          try {
            clickAudioRef.current.currentTime = 0
            const playPromise = clickAudioRef.current.play()
            if (playPromise !== undefined) {
              playPromise.catch((err) => {
                console.warn('Audio play failed:', err)
              })
            }
          } catch (err) {
            console.warn('Audio error:', err)
          }
        }
      }
    }

    const handlePointerUp = (id) => {
      if (keyRefs.current[id]) {
        keyRefs.current[id].dataset.pressed = 'false'
      }
    }

    // Set up event listeners for each key
    const cleanupFunctions = []
    
    Object.keys(keyRefs.current).forEach((id) => {
      const key = keyRefs.current[id]
      if (!key) return

      const onDown = () => handlePointerDown(id)
      const onUp = () => handlePointerUp(id)

      key.addEventListener('pointerdown', onDown)
      key.addEventListener('pointerup', onUp)
      key.addEventListener('pointercancel', onUp)
      key.addEventListener('pointerleave', onUp)

      // Store cleanup function
      cleanupFunctions.push(() => {
        key.removeEventListener('pointerdown', onDown)
        key.removeEventListener('pointerup', onUp)
        key.removeEventListener('pointercancel', onUp)
        key.removeEventListener('pointerleave', onUp)
      })
    })

    // Cleanup
    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup())
    }
  }, [isLinear])

  return (
    <div className="keyboard-wrapper">
      <div className="keyboard-display">
        <h3>{selectedKey.name}</h3>
      </div>
      <div className="keypad">
        {keycapData.map((key) => (
          <button
            key={key.id}
            ref={(el) => (keyRefs.current[key.id] = el)}
            id={key.id}
            className="key keypad__single"
            data-layer={key.layer}
            aria-label={key.name}
          >
            <span className="key__mask">
              <span className="key__content">
                <span className="key__text">
                  {key.isCustom ? (
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-hidden="false"
                      className="key__logo"
                    >
                      <title>Thunder</title>
                      <path fill="#FFD42A" d="M13 2L3 14h7l-1 8L21 10h-7l-1-8z" />
                    </svg>
                  ) : (
                    <img
                      className="key__logo"
                      src={`https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/${key.icon}.svg`}
                      alt={key.name}
                    />
                  )}
                </span>
                <img 
                  src={new URL(`../assets/Keycaps/${key.keycap}`, import.meta.url).href} 
                  alt="" 
                />
              </span>
            </span>
          </button>
        ))}
      </div>
      <p className="keyboard-hint">Interact with me</p>
    </div>
  )
}

export default Keyboard
