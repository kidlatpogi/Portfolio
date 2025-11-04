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
      onClick={() => onCardClick(index)}
      onContextMenu={(e) => e.preventDefault()}
      role="button"
      tabIndex={0}
      aria-label={`Design: ${card.title}`}
    >
      <img
        src={card.imageSrc || card.image}
        srcSet={card.imageSrcSet || undefined}
        sizes={card.imageSizes || undefined}
        alt={card.title || ''}
        className="card-bg"
        loading="lazy"
      />
      <h3 className="expanding-card-title">{card.title}</h3>
      
      <button
        type="button"
        className={`reaction-button ${userLiked[String(card.id)] ? 'reacted' : ''}`}
        onClick={handleLikeClick}
        aria-label="React to this design"
        aria-pressed={!!userLiked[String(card.id)]}
        title={userLiked[String(card.id)] ? 'Remove reaction' : 'React'}
      >
        <svg viewBox="0 0 24 24" className="reaction-icon">
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
  // Custom comparator to avoid unnecessary re-renders
  const sameActive = prevProps.isActive === nextProps.isActive
  const sameId = prevProps.card.id === nextProps.card.id
  const prevLiked = !!prevProps.userLiked[String(prevProps.card.id)]
  const nextLiked = !!nextProps.userLiked[String(nextProps.card.id)]
  const sameLiked = prevLiked === nextLiked
  return sameActive && sameId && sameLiked
})

DesignCard.displayName = 'DesignCard'

export default DesignCard
