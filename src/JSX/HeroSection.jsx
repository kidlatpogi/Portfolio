import React from 'react'
import GitHubStarButton from '../JS/GitHubStarButton.jsx'
import TypingEffect from '../JS/TypingEffect.jsx'

function HeroSection() {
  return (
    <section className='Home' id='Home'>
      <h1>Hi, I'm Zeus Angelo Bautista</h1>
      <p>
        <TypingEffect 
          texts={[
            'Aspiring Front-End Developer & Responsive Web Design Specialist',
            'Building Beautiful & Functional Web Experiences',
            'Passionate About Clean Code & User Interface Design'
          ]}
          typingSpeed={80}
          deletingSpeed={40}
          pauseDuration={2500}
        />
      </p>
      <p className="bio-text">
        I'm Zeus Bautista, a focused 3rd-year I.T. student dedicated to full-cycle application development. I specialize in building user-friendly web experiences and managing efficient data structures. This is supported by my Database Management certification and practical experience in preparing data for seamless system integration.
        <span className="typing-cursor"></span>
      </p>

      {/* Button grid - Download Resume and GitHub Star button */}
      <div className="Home-button-grid">
        <a
          className="Resume"
          href="/Zeus_Angelo_Bautista_Resume.pdf"
          download="Zeus_Angelo_Bautista_Resume.pdf"
          aria-label="Download Zeus Angelo Bautista resume"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download Resume
        </a>

        <GitHubStarButton repo="kidlatpogi/kidlatpogi" className="Resume" />
      </div>
    </section>
  )
}

export default HeroSection
