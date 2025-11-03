import React from 'react'
import { CERTIFICATES_DATA } from '../constants/certificatesData'

function CertificateCard({ certKey, cert, onOpenModal }) {
  return (
    <article className="Certifications-card">
            <div className='card-header'>
                <h3>{cert.title}</h3>
                <span className='cert-badge' aria-hidden='true'>
                <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                    Verified
                </a>
                </span>
            </div>
            <p className='cert-issuer'>{cert.issuer}</p>
            <p className='cert-year'>{cert.year}</p>
            <p className='cert-link'>
                <button onClick={() => onOpenModal(certKey)} className="view-cert-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.3em', verticalAlign: 'middle' }}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
                View Credential
                </button>
            </p>
    </article>
  )
}

function CertificationsSection({ onOpenModal }) {
  return (
    <section className='Certifications' id='Certifications'>
      <div className="container">
        <h2>Certifications</h2>
        <p>Industry-recognized credentials validating my technical expertise</p>

        <h4>MAJOR CERTIFICATIONS</h4>
        <div className="Certifications-grid">
          <CertificateCard 
            certKey="itDatabase" 
            cert={CERTIFICATES_DATA.itDatabase} 
            onOpenModal={onOpenModal}
          />
          <CertificateCard 
            certKey="responsiveWeb" 
            cert={CERTIFICATES_DATA.responsiveWeb} 
            onOpenModal={onOpenModal}
          />
        </div>

        <h4>ADDITIONAL CERTIFICATIONS</h4>
        <div className="Certifications-grid">
          <CertificateCard 
            certKey="git" 
            cert={CERTIFICATES_DATA.git} 
            onOpenModal={onOpenModal}
          />
          <CertificateCard 
            certKey="cloud" 
            cert={CERTIFICATES_DATA.cloud} 
            onOpenModal={onOpenModal}
          />
          <CertificateCard 
            certKey="devOps" 
            cert={CERTIFICATES_DATA.devOps} 
            onOpenModal={onOpenModal}
          />
        </div>
      </div>
    </section>
  )
}

export default CertificationsSection
