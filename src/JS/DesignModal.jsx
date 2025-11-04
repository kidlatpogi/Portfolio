import React, { memo, useEffect, useCallback } from 'react'

const DesignModal = memo(({ isOpen, modalImage, onClose }) => {
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape' && isOpen) {
      onClose()
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'unset'
      }
    }
  }, [isOpen, handleEscape])

  if (!isOpen || !modalImage) return null

  return (
    <div className="design-modal-overlay" onClick={onClose}>
      <div className="design-modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="design-modal-close" 
          onClick={onClose} 
          aria-label="Close modal"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <h3 className="design-modal-title">{modalImage.title}</h3>
        
        <div 
          className="design-modal-image-container"
          onContextMenu={(e) => e.preventDefault()}
        >
          <img 
            src={modalImage.image} 
            alt={modalImage.title}
            className="design-modal-image"
            loading="lazy"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            draggable="false"
          />
        </div>
      </div>
    </div>
  )
})

DesignModal.displayName = 'DesignModal'

export default DesignModal
