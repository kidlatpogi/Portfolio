import React from 'react'

function SkillsSection() {
  return (
    <section className='Skills' id='Skills'>
      <div className="container">
        <h2>Technical Skills</h2>
        <p>Core technologies and tools I work with</p>

        <div className="Skills-grid">
          {/* FRONTEND */}
          <article className="Skills-card frontend-card" data-card-type="frontend">
            <div className="Skills-card-body">
              <h3>
                <span className="skill-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 18l6-6-6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                FRONTEND
              </h3>
              <div className='tags-grid'>
                <p className='tag'>HTML5</p>
                <p className='tag'>CSS3</p>
                <p className='tag'>JavaScript</p>
                <p className='tag'>React JS</p>
                <p className='tag'>React Native</p>
              </div>
            </div>
          </article>

          {/* BACKEND */}
          <article className="Skills-card backend-card" data-card-type="backend">
            <div className="Skills-card-body">
              <h3>
                <span className="skill-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
                    <rect x="7" y="14" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
                BACKEND
              </h3>
              <div className='tags-grid'>
                <p className='tag'>SQL</p>
                <p className='tag'>Firebase</p>
                <p className='tag'>Python</p>
              </div>
            </div>
          </article>
        </div>

        <div className='Skills-grid'>
          {/* TOOLS */}
          <article className="Skills-card tools-card" data-card-type="tools">
            <div className="Skills-card-body">
              <h3>
                <span className="skill-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 18v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
                TOOLS
              </h3>
              <div className='tags-grid'>
                <p className='tag'>Git</p>
                <p className='tag'>GitHub</p>
                <p className='tag'>VS Code</p>
                <p className='tag'>Godot</p>
              </div>
            </div>
          </article>

          {/* DESIGN */}
          <article className="Skills-card design-card" data-card-type="design">
            <div className="Skills-card-body">
              <h3>
                <span className="skill-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 3 2-7L2 9h7l3-7z" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round" strokeLinecap="round" />
                  </svg>
                </span>
                DESIGN
              </h3>
              <div className='tags-grid'>
                <p className='tag'>Photoshop</p>
                <p className='tag'>Canva</p>
                <p className='tag'>Figma</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
