import React, { memo, useCallback } from 'react'

const DesignCard = memo(({ card, index, isActive, userLiked, onCardClick, onLike, onViewFull }) => {
  const handleLikeClick = useCallback((e) => {
    e.stopPropagation()
    onLike(e, card.id)
  }, [card.id, onLike])

  const handleViewClick = useCallback((e) => {
    e.stopPropagation()
    onViewFull(e, card)
  }, [card, onViewFull])

  return (
    <div
      className={`expanding-card ${isActive ? 'active' : ''}`}
      style={{ backgroundImage: `url(${card.image})` }}
      onClick={() => onCardClick(index)}
      onContextMenu={(e) => e.preventDefault()}
      role="button"
      tabIndex={0}
      aria-label={`Design: ${card.title}`}
    >
      <h3 className="expanding-card-title">{card.title}</h3>
      
      <button
        className={`heart-button ${userLiked[card.id] ? 'liked' : ''}`}
        onClick={handleLikeClick}
        aria-label="Like this design"
      >
        <svg viewBox="0 0 24 24" className="heart-icon">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </button>

      {isActive && (
        <button
          className="view-full-button"
          onClick={handleViewClick}
          aria-label="View full image"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          View Full
        </button>
      )}
    </div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison for memo - return true if props are equal (skip re-render)
  return (
    prevProps.isActive === nextProps.isActive &&
    prevProps.card.id === nextProps.card.id &&
    prevProps.userLiked[nextProps.card.id] === nextProps.userLiked[nextProps.card.id]
  )
})

DesignCard.displayName = 'DesignCard'

export default DesignCard
