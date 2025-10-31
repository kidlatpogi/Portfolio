import { useState } from 'react'
import '../CSS/App.css'
import Nav, { NavItem } from './Navbar'
import ModeSwitcher from '../JS/ModeSwitcher.jsx'

function App() {
  const [contactStatus, setContactStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    setContactStatus('sending')
    try {
      const formData = new FormData(form)
      const res = await fetch('https://formspree.io/f/manlplre', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })

      if (res.ok) {
        setContactStatus('success')
        form.reset()
        // clear status after a short delay
        setTimeout(() => setContactStatus('idle'), 5000)
      } else {
        setContactStatus('error')
      }
    } catch (err) {
      // log network or unexpected errors and show friendly message
      console.error('Contact submit error', err)
      setContactStatus('error')
    }
  }

  return (
      <div> 
        <Nav className="Nav glass-navbar" brand="Zeus Angelo">
          <NavItem to="#Home">Home</NavItem>
          <NavItem to="#Projects">Projects</NavItem>
          <NavItem to="#Skills">Skills</NavItem>
          <NavItem to="#Certifications">Certifications</NavItem>
          <NavItem to="#Contact">Contact</NavItem>
        </Nav>

        <div>
          <ModeSwitcher className="mode-btn light" />
        </div>

        <main>

          {/* Home */}
          <section className='Home' id='Home'>
            <h1>Hi, I'm Zeus Angelo Bautista</h1>
            <p>Aspiring Front-End Developer & Responsive Web Design Specialist</p>
            <p>I'm Zeus Bautista, a focused 3rd-year I.T. student dedicated to full-cycle application development. I specialize in building user-friendly web experiences and managing efficient data structures. This is supported by my Database Management certification and practical experience in preparing data for seamless system integration.</p>
            
            <a
              className="Resume"
              href="/RESUME SAMPLE.pdf"
              download="Zeus_Angelo_Bautista_Resume.pdf"
              aria-label="Download Zeus Angelo Bautista resume"
            >
              Download Resume
            </a>
          </section>

          {/* Projects */}
          <section className='Projects' id='Projects'>
            <div className="container">
              <h2>Projects</h2>
              <p>Real-world applications demonstrating front-end development, database management, and problem-solving skills.</p>
              <div className="projects-grid">
                <article className="project-card">
                  <div className="project-media" />
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
                  <div className="project-media" />
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
                      Code
                    </button>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* SKILLS */}
          <section className='Skills' id='Skills'>
            <div className="container">
              <h2>Technical Skills</h2>
              <p>Core technologies and tools I work with</p>

              <div className="Skills-grid">
                {/* FRONTEND */}
                <article className="Skills-card">
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
                <article className="Skills-card">
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
                      <p className='tag'>Node.js</p>
                      <p className='tag'>Express</p>
                      <p className='tag'>MongoDB</p>
                      <p className='tag'>PostgreSQL</p>
                    </div>
                  </div>
                </article>
              </div>

              <div className='Skills-grid'>
                {/* TOOLS */}
                <article className="Skills-card">
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
                <article className="Skills-card">
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

          {/* Certifications */}
          <section className='Certifications' id='Certifications'>
            <div className="container">
              <h2>Certifications</h2>
              <p>Industry-recognized credentials validating my technical expertise</p>

              <h4>MAJOR CERTIFICATIONS</h4>
              <div className="Certifications-grid">
                <article className="Certifications-card">
                  <div className='card-grid'>
                    <div className='card-header'>
                      <h3>ITS-Database Certification</h3>
                      <span className='cert-badge' aria-hidden='true'><a href="https://www.credly.com/badges/ec097417-e36a-4642-b03b-df96919ae380/public_url" target="_blank" rel="noopener noreferrer">Verified</a></span>
                    </div>
                    <p className='cert-issuer'>Certiport</p>
                    <p className='cert-year'>2025</p>
                    <p className='cert-link'><a href="https://raw.githubusercontent.com/kidlatpogi/kidlatpogi/refs/heads/main/assets/certifications/it-specialist-databases-certificate.png" target="_blank" rel="noopener noreferrer">View Credential</a></p>
                  </div>
                </article>
                
                <article className="Certifications-card">
                  <div className='card-grid'>
                    <div className='card-header'>
                      <h3>Responsive Web-Design Certification</h3>
                      <span className='cert-badge' aria-hidden='true'><a href="https://www.freecodecamp.org/certification/kidlat/responsive-web-design" target="_blank" rel="noopener noreferrer">Verified</a></span>
                    </div>
                    <p className='cert-issuer'>FreeCodeCamp</p>
                    <p className='cert-year'>2024</p>
                    <p className='cert-link'><a href="https://raw.githubusercontent.com/kidlatpogi/kidlatpogi/refs/heads/main/assets/certifications/responsive-web-design-certificate.png" target="_blank" rel="noopener noreferrer">View Credential</a></p>
                  </div>
                </article>
              </div>

              <h4>ADDITIONAL CERTIFICATIONS</h4>
              <div className="Certifications-grid">
                <article className="Certifications-card">
                  <div className='card-grid'>
                    <div className='card-header'>
                      <h3>Git Training Certification</h3>
                      <span className='cert-badge' aria-hidden='true'><a href="https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI3NTgiLCJjZXJ0aWZpY2F0ZV91cmwiOiJodHRwczpcL1wvY2VydGlmaWNhdGVzLnNpbXBsaWNkbi5uZXRcL3NoYXJlXC84NTQxODQ4Xzg4OTUyODcxNzUxMjA2MjA0MjY0LnBuZyIsInVzZXJuYW1lIjoiWmV1cyBBbmdlbG8gQmF1dGlzdGEifQ%3D%3D&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F2823%2FGIT%2Fcertificate%2Fdownload-skillup&%24web_only=true" target="_blank" rel="noopener noreferrer">Verified</a></span>
                    </div>
                    <p className='cert-issuer'>SkillUp by Simplilearn</p>
                    <p className='cert-year'>2025</p>
                    <p className='cert-link'><a href="https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI3NTgiLCJjZXJ0aWZpY2F0ZV91cmwiOiJodHRwczpcL1wvY2VydGlmaWNhdGVzLnNpbXBsaWNkbi5uZXRcL3NoYXJlXC84NTQxODQ4Xzg4OTUyODcxNzUxMjA2MjA0MjY0LnBuZyIsInVzZXJuYW1lIjoiWmV1cyBBbmdlbG8gQmF1dGlzdGEifQ%3D%3D&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F2823%2FGIT%2Fcertificate%2Fdownload-skillup&%24web_only=true" target="_blank" rel="noopener noreferrer">View Credential</a></p>
                  </div>
                </article>

                <article className="Certifications-card">
                  <div className='card-grid'>
                    <div className='card-header'>
                      <h3>Cloud Computing Certification</h3>
                      <span className='cert-badge' aria-hidden='true'><a href="https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIxNTExIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODU0NjQ2MF84ODk1Mjg3MTc1MTI4NTA5MTE5Ny5wbmciLCJ1c2VybmFtZSI6IlpldXMgQW5nZWxvIEJhdXRpc3RhIn0%3D&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F3971%2FIntroduction-to-Cloud-Computing%2Fcertificate%2Fdownload-skillup&%24web_only=true" target="_blank" rel="noopener noreferrer">Verified </a></span>
                    </div>
                    <p className='cert-issuer'>SkillUp by Simplilearn</p>
                    <p className='cert-year'>2025</p>
                    <p className='cert-link'><a href="https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIxNTExIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODU0NjQ2MF84ODk1Mjg3MTc1MTI4NTA5MTE5Ny5wbmciLCJ1c2VybmFtZSI6IlpldXMgQW5nZWxvIEJhdXRpc3RhIn0%3D&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F3971%2FIntroduction-to-Cloud-Computing%2Fcertificate%2Fdownload-skillup&%24web_only=true" target="_blank" rel="noopener noreferrer">View Credential</a></p>
                  </div>
                </article>

                <article className="Certifications-card">
                  <div className='card-grid'>
                    <div className='card-header'>
                      <h3>DevOps Certification</h3>
                      <span className='cert-badge' aria-hidden='true'><a href="https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIzMjc1IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODU1MjgwMF84ODk1Mjg3MTc1MTM3MjkzMzM4Mi5wbmciLCJ1c2VybmFtZSI6IlpldXMgQW5nZWxvIEJhdXRpc3RhIn0%3D&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F6073%2FDevOps%2520101%3A%2520What%2520is%2520DevOps%253F%2Fcertificate%2Fdownload-skillup&%24web_only=true" target='_blank' rel="noopener noreferrer">Verified</a></span>
                    </div>
                    <p className='cert-issuer'>SkillUp by Simplilearn</p>
                    <p className='cert-year'>2025</p>
                    <p className='cert-link'><a href="https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIzMjc1IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODU1MjgwMF84ODk1Mjg3MTc1MTM3MjkzMzM4Mi5wbmciLCJ1c2VybmFtZSI6IlpldXMgQW5nZWxvIEJhdXRpc3RhIn0%3D&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F6073%2FDevOps%2520101%3A%2520What%2520is%2520DevOps%253F%2Fcertificate%2Fdownload-skillup&%24web_only=true" target="_blank" rel="noopener noreferrer">View Credential</a></p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* Get in touch */}
          <section className='Contact' id='Contact'>
            <div className="container">
              <h2>Get in Touch</h2>
              <p>Open to internship opportunities, freelance projects, and collaborations. Fill out the form below and I'll get back to you within 24 hours or earlier.</p>
            
              {/* Forms Card */}
              <div className='Contact-grid'>
                <div className='Contact-form-card'>
                  <form className='Contact-form' onSubmit={handleSubmit} action="https://formspree.io/f/manlplre" method="POST">

                    {/* Form Fields */}
                    <div className='Contact-row'>
                      <div className='Contact-field'>
                        <label htmlFor='name'>Name <span>*</span></label>
                        <input type='text' id='name' name='name' placeholder='Your name' required />
                      </div>
                      
                      <div className='Contact-field'>
                        <label htmlFor='email'>Email <span>*</span></label>
                        <input type='email' id='email' name='email' placeholder='your.email@example.com' required />
                      </div>
                    </div>

                    <div className='Contact-field'>
                      <label htmlFor='subject'>Subject <span>*</span></label>
                      <input type='text' id='subject' name='subject' placeholder="What's this about?" required />
                    </div>
                    
                    <div className='Contact-field'>
                      <label htmlFor='message'>Message <span>*</span></label>
                      <textarea id='message' name='message' rows='4' placeholder='Tell me about your project, opportunity, or question...' required></textarea>
                    </div>
                    
                    {/* honeypot for bots */}
                    <input type="text" name="_gotcha" style={{display:'none'}} />

                    <button type='submit' className='Contact-send-btn' disabled={contactStatus === 'sending'}>
                      <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                        <line x1='22' y1='2' x2='11' y2='13'></line>
                        <polygon points='22 2 15 22 11 13 2 9 22 2'></polygon>
                      </svg>
                      Send Message
                    </button>

                    {/* status messages */}
                    {contactStatus === 'sending' && <div className='Contact-status'>Sending…</div>}
                    {contactStatus === 'success' && <div className='Contact-status success'>Message sent — thanks!</div>}
                    {contactStatus === 'error' && <div className='Contact-status error'>Something went wrong. Please try again or email directly.</div>}

                    <div className='Contact-email-row'>
                      <span>Prefer email? Reach me directly at{' '}
                        <a href='mailto:bautistaangelozeus17@gmail.com'>
                          <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                            <rect x='3' y='5' width='18' height='14' rx='2' ry='2'></rect>
                            <polyline points='3 7 12 13 21 7'></polyline>
                          </svg>
                          bautistaangelozeus17@gmail.com
                        </a>
                      </span>
                    </div>
                  </form>
                </div>

                {/* Connect Card */}
                <div className='Contact-side-cards'>
                  <div className='Contact-connect-card'>
                    <h3>Connect With Me</h3>
                    <a className='Contact-link' href='https://github.com/kidlatpogi' target='_blank' rel='noopener noreferrer'>
                      <span className='Contact-link-icon'>
                        <svg width='18' height='18' viewBox='0 0 16 16' fill='currentColor'>
                          <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z'/>
                        </svg>
                      </span>
                      GitHub
                      <span className='Contact-link-desc'>View my code</span>
                    </a>
                    
                    <a className='Contact-link' href='https://linkedin.com/in/zeusbautista' target='_blank' rel='noopener noreferrer'>
                      <span className='Contact-link-icon'>
                        <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
                          <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z'/>
                          <rect x='2' y='9' width='4' height='12'/>
                          <circle cx='4' cy='4' r='2'/>
                        </svg>
                      </span>
                      LinkedIn
                      <span className='Contact-link-desc'>Professional profile</span>
                    </a>
                    
                    <a className='Contact-link' href='/RESUME SAMPLE.pdf' download='Zeus_Angelo_Bautista_Resume.pdf'>
                      <span className='Contact-link-icon'>
                        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                          <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/>
                          <polyline points='14 2 14 8 20 8'/>
                        </svg>
                      </span>
                      Resume
                      <span className='Contact-link-desc'>Download PDF</span>
                    </a>
                  </div>

                  {/* Response Card */}
                  <div className='Contact-response-card'>
                    <h3>Response Time</h3>
                    <p>I typically respond to all inquiries within 24 hours. For urgent matters, please reach out via LinkedIn.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>

        <footer>
          <div className='container'>
            <p>© 2025 Zeus Bautista • IT Student & Aspiring Developer</p>
          </div>
        </footer>

      </div>
  )
}

export default App