import React, { memo, useEffect, useCallback } from 'react'

const DesignModal = memo(({ isOpen, modalImage, onClose, userLiked, onReact }) => {
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

          {/* Render reaction button in modal so reaction state is visible while viewing full */}
          <button
            type="button"
            className={`reaction-button ${userLiked?.[String(modalImage.id)] ? 'reacted' : ''}`}
            onClick={(e) => { e.stopPropagation(); onReact && onReact(e, modalImage.id) }}
            aria-label="React to this design"
            aria-pressed={!!userLiked?.[String(modalImage.id)]}
            title={userLiked?.[String(modalImage.id)] ? 'Remove reaction' : 'React'}
          >
            <svg viewBox="0 0 24 24" className="reaction-icon">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
})

DesignModal.displayName = 'DesignModal'

export default DesignModal
