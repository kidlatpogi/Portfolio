import React, { useEffect } from 'react'
import '../CSS/CertificateModal.css'

function CertificateModal({ isOpen, onClose, certificate }) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !certificate) return null

  return (
    <div className="certificate-modal-overlay" onClick={onClose}>
      <div className="certificate-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="certificate-modal-close" onClick={onClose} aria-label="Close modal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="certificate-modal-header">
          <h3>{certificate.title}</h3>
          <div className="certificate-modal-info">
            <span className="cert-issuer">{certificate.issuer}</span>
            <span className="cert-year">{certificate.year}</span>
          </div>
        </div>

        <div 
          className="certificate-modal-image-container"
          onContextMenu={(e) => e.preventDefault()}
        >
          <img 
            src={certificate.image} 
            alt={`${certificate.title} certificate`}
            className="certificate-modal-image"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            draggable="false"
          />
        </div>

        {certificate.verifyUrl && (
          <div className="certificate-modal-footer">
            <a 
              href={certificate.verifyUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="verify-button"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Verify Certificate
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default CertificateModal
