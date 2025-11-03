import React, { useState } from 'react'
import Keyboard from '../JS/Keyboard'

function SkillsSection() {
  const [isLinear, setIsLinear] = useState(true)

  return (
    <section className='Skills' id='Skills'>
      <div className="container">
        <h2>Technical Skills</h2>
        <p>Core technologies and tools I work with</p>

        {/* Toggle Switch */}
        <div className="keyboard-controls">
          <label className="switch-toggle">
            <input
              type="checkbox"
              checked={isLinear}
              onChange={(e) => setIsLinear(e.target.checked)}
              aria-label="Toggle between Linear and Thocky switch sounds"
            />
            <span className="toggle-slider"></span>
            <span className="toggle-label">Linear</span>
            <span className="toggle-label">Thocky</span>
          </label>
        </div>

        {/* 3D Keyboard Skills Display */}
        <Keyboard isLinear={isLinear} />
      </div>
    </section>
  )
}

export default SkillsSection
