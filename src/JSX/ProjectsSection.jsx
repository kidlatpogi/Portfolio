import React from 'react'
import roomReservationImg from '../assets/Project Overview/RoomReservationSystem.png'
import safeLink from '../assets/Project Overview/SafeLink.png'

function smoothScrollToId(id, duration = 600) {
  const el = document.getElementById(id.replace('#', ''))
  if (!el) return
  const navbar = document.querySelector('.glass-navbar')
  const offset = (navbar && navbar.offsetHeight) ? navbar.offsetHeight : 72
  const start = window.scrollY || window.pageYOffset
  const end = el.getBoundingClientRect().top + start - offset - 8
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

function ProjectsSection() {
  return (
    <section className='Projects' id='Projects'>
      <div className="container">
        <h2>Projects</h2>
        <p>Real-world applications demonstrating front-end development, database management, and problem-solving skills.</p>
        
        <h3 style={{ marginTop: '3rem', marginBottom: '1rem' }}>Development Projects</h3>
        <div className="projects-grid">
          <article className="project-card">
            <div className="project-media">
              <img src={safeLink} alt="SafeLink Mobile Screens" className="project-image" />
            </div>
            <div className="project-body">
              <h3>SafeLink Mobile</h3>
              <div className="tags">
                <span className="tag">React Native</span>
                <span className="tag">JavaScript</span>
                <span className="tag">Firebase</span>
                <span className="tag">Mobile</span>
              </div>
              <button className="project-cta">
                <span className="cta-icon" aria-hidden="true" style={{display:'inline-flex',alignItems:'center',marginRight:'0.5em'}}>
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </span>
                <a href="https://github.com/kidlatpogi/SafeLink" target="_blank" rel="noopener noreferrer">Code</a>
              </button>
            </div>
          </article>

          <article className="project-card">
            <div className="project-media">
              <img src={roomReservationImg} alt="Room Reservation System" className="project-image" />
            </div>
            <div className="project-body">
              <h3>Room Reservation System</h3>
              <div className="tags">
                <span className="tag">HTML5</span>
                <span className="tag">CSS3</span>
                <span className="tag">JavaScript</span>
                <span className="tag">SQL</span>
              </div>
              <button className="project-cta">
                <span className="cta-icon" aria-hidden="true" style={{display:'inline-flex',alignItems:'center',marginRight:'0.5em'}}>
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </span>
                <a href="https://github.com/kidlatpogi/Room-Reservation-System.git" target='_blank' rel="noopener noreferrer">Code</a>
              </button>
            </div>
          </article>
        </div>

        <div className="project-buttons-grid">
          <button 
            className="project-showcase-btn gallery-btn"
            onClick={() => smoothScrollToId('ExpandingCards')}
          >
            <span>See Photoshop Gallery</span>
            <svg className="arrow-down-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </button>

          <a 
            href="https://github.com/kidlatpogi/Olympus"
            target="_blank"
            rel="noopener noreferrer"
            className="project-showcase-btn olympus-btn"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            <span>Explore my Side Projects</span>
            <svg className="arrow-right-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
