import React from 'react'

function ContactSection({ contactStatus, onSubmit }) {
  return (
    <section className='Contact' id='Contact'>
      <div className="container">
        <h2>Get in Touch</h2>
        <p>Open to internship opportunities, freelance projects, and collaborations. Fill out the form below and I'll get back to you within 24 hours or earlier.</p>
      
        {/* Forms Card */}
        <div className='Contact-grid'>
          <div className='Contact-form-card'>
            <form className='Contact-form' onSubmit={onSubmit} action="https://formspree.io/f/manlplre" method="POST">

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
              
              <a className='Contact-link' href='/Zeus_Angelo_Bautista_Resume.pdf' download='Zeus_Angelo_Bautista_Resume.pdf'>
                <span className='Contact-link-icon'>
                  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
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
  )
}

export default ContactSection
