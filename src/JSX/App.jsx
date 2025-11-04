import { useState, useEffect } from 'react'
import '../CSS/App.css'
import Nav, { NavItem } from './Navbar'
import ModeSwitcher from '../JS/ModeSwitcher.jsx'
import ParticlesBackground from '../JS/ParticlesBackground.jsx'
import { Analytics } from '@vercel/analytics/react';
import CertificateModal from '../JS/CertificateModal.jsx'
import LoadingScreen from '../JS/LoadingScreen.jsx'

// Section components
import HeroSection from './HeroSection'
import ProjectsSection from './ProjectsSection'
import { lazy, Suspense } from 'react'
const ExpandingCards = lazy(() => import('../JS/ExpandingCards'))
import SkillsSection from './SkillsSection'
import CertificationsSection from './CertificationsSection'
import ContactSection from './ContactSection'

// Certificates data
import { CERTIFICATES_DATA } from '../constants/certificatesData'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [contactStatus, setContactStatus] = useState('idle')
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLoadComplete = () => {
    setIsLoading(false)
    setTimeout(() => setShowContent(true), 100)
  }

  // Safety fallback: if loading doesn't complete (e.g. blocked on a remote resource),
  // force hide the loading screen after 8 seconds to avoid a permanent black screen.
  useEffect(() => {
    const fallback = setTimeout(() => {
      setIsLoading(false)
      setShowContent(true)
    }, 8000)

    return () => clearTimeout(fallback)
  }, [])

  const openCertificateModal = (certKey) => {
    setSelectedCertificate(CERTIFICATES_DATA[certKey])
    setIsModalOpen(true)
  }

  const closeCertificateModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedCertificate(null), 300)
  }

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
        setTimeout(() => setContactStatus('idle'), 5000)
      } else {
        setContactStatus('error')
      }
    } catch (err) {
      console.error('Contact submit error', err)
      setContactStatus('error')
    }
  }

  return (
    <div>
      <Analytics />

      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      
      <div className={`app-content ${showContent ? 'fade-in' : 'hidden'}`}>
        <ParticlesBackground />
        
        {/* Navigation */}
        <Nav className="Nav glass-navbar" brand="Zeus Bautista">
          <NavItem to="#Home">Home</NavItem>
          <NavItem to="#Projects">Projects</NavItem>
          <NavItem to="#ExpandingCards">Designs</NavItem>
          <NavItem to="#Skills">Skills</NavItem>
          <NavItem to="#Certifications">Certifications</NavItem>
          <NavItem to="#Contact">Contact</NavItem>
        </Nav>

        <div>
          <ModeSwitcher className="mode-btn light" />
        </div>

        <main>
          <HeroSection />

          <ProjectsSection />

          {/* EXPANDING CARDS - PHOTOSHOP GALLERY */}
          <section className='ExpandingCards' id='ExpandingCards'>
            <div className="container">
              <h2>Graphic Design Portfolio</h2>
              <Suspense fallback={<div>Loading gallery…</div>}>
                <ExpandingCards />
              </Suspense>
            </div>
          </section>

          <SkillsSection />

          <CertificationsSection onOpenModal={openCertificateModal} />

          <ContactSection contactStatus={contactStatus} onSubmit={handleSubmit} />
        </main>

        <footer>
          <div className='container'>
            <p>© 2025 Zeus Bautista • IT Student & Aspiring Developer</p>
          </div>
        </footer>

  {/* Silent Analytics Tracker */}
  <AnalyticsTracker />
  {/* Vercel Analytics (non-Next) is loaded via initVercelAnalytics in main.jsx when configured */}

        {/* Certificate Modal */}
        <CertificateModal 
          isOpen={isModalOpen}
          onClose={closeCertificateModal}
          certificate={selectedCertificate}
        />
      </div>
    </div>
  )
}

export default App