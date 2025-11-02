import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { doc, getDoc, runTransaction } from 'firebase/firestore'
import '../CSS/ExpandingCards.css'

// Import images
import typography from '../assets/Photoshop/Typography.png'
import multo from '../assets/Photoshop/Multo.png'
import lamaw from '../assets/Photoshop/lamaw.png'
import hereWithMe from '../assets/Photoshop/Here with me.png'
import cloud9 from '../assets/Photoshop/Cloud 9.png'
import ketchup from '../assets/Photoshop/Ketchup.png'

const cards = [
  {
    id: 1,
    title: 'Redesigning Old Poster',
    image: ketchup
  },
  {
    id: 2,
    title: 'Cloud 9 Music Poster',
    image: cloud9
  },
  {
    id: 3,
    title: 'Multo Music Poster',
    image: multo
  },
  {
    id: 4,
    title: 'Here with me Music Poster',
    image: hereWithMe
  },
  {
    id: 5,
    title: 'Typography Design',
    image: typography
  },
{
    id: 6,
    title: 'Podcast Thumbnail Design',
    image: lamaw
  },
]

function ExpandingCards() {
  const [activeCard, setActiveCard] = useState(0)
  const [likes, setLikes] = useState({})
  const [userLiked, setUserLiked] = useState({})
  const [modalImage, setModalImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Load likes from Firestore on mount
  useEffect(() => {
    const loadLikes = async () => {
      try {
        // Check localStorage for user's liked state
        const savedUserLiked = localStorage.getItem('portfolioUserLiked')
        if (savedUserLiked) {
          setUserLiked(JSON.parse(savedUserLiked))
        }

        // Fetch likes from Firestore
        const likesDocRef = doc(db, 'stats', 'likes')
        const likesDoc = await getDoc(likesDocRef)
        
        if (likesDoc.exists()) {
          setLikes(likesDoc.data())
        } else {
          // Initialize likes for all cards
          const initialLikes = {}
          cards.forEach((card) => {
            initialLikes[card.id] = 0
          })
          setLikes(initialLikes)
        }
      } catch (error) {
        console.error('Error loading likes:', error)
        // Fallback to localStorage
        const savedLikes = localStorage.getItem('portfolioLikes')
        if (savedLikes) {
          setLikes(JSON.parse(savedLikes))
        }
      }
    }

    loadLikes()
  }, [])

  const handleCardClick = (index) => {
    setActiveCard(index)
  }

  const handleLike = async (e, cardId) => {
    e.stopPropagation() // Prevent card expansion when clicking heart
    
    const isCurrentlyLiked = userLiked[cardId] || false
    const newUserLiked = { ...userLiked, [cardId]: !isCurrentlyLiked }
    
    // Optimistic update
    setUserLiked(newUserLiked)
    localStorage.setItem('portfolioUserLiked', JSON.stringify(newUserLiked))

    try {
      // Update Firestore using transaction for accuracy
      const likesDocRef = doc(db, 'stats', 'likes')
      
      await runTransaction(db, async (transaction) => {
        const likesDoc = await transaction.get(likesDocRef)
        
        if (!likesDoc.exists()) {
          // Initialize document if it doesn't exist
          const initialLikes = {}
          cards.forEach((card) => {
            initialLikes[card.id] = card.id === cardId ? 1 : 0
          })
          transaction.set(likesDocRef, initialLikes)
          setLikes(initialLikes)
        } else {
          const currentLikes = likesDoc.data()
          const currentCount = currentLikes[cardId] || 0
          
          // Calculate new count
          const newCount = isCurrentlyLiked ? Math.max(0, currentCount - 1) : currentCount + 1
          // Update Firestore
          transaction.update(likesDocRef, {
            [cardId]: newCount
          })
          
          // Update local state
          setLikes((prevLikes) => ({ ...prevLikes, [cardId]: newCount }))
        }
      })
    } catch (error) {
      console.error('Error updating like:', error)
      // Revert optimistic update on error
      setUserLiked((prevUserLiked) => ({ ...prevUserLiked, [cardId]: isCurrentlyLiked }))
      localStorage.setItem('portfolioUserLiked', JSON.stringify({ ...userLiked, [cardId]: isCurrentlyLiked }))
    }
  }

  const openModal = (e, card) => {
    e.stopPropagation() // Prevent card expansion
    setModalImage(card)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setModalImage(null), 300)
  }

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  return (
    <>
      <div className="expanding-cards-container">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`expanding-card ${activeCard === index ? 'active' : ''}`}
            style={{ backgroundImage: `url(${card.image})` }}
            onClick={() => handleCardClick(index)}
            onContextMenu={(e) => e.preventDefault()}
          >
            <h3 className="expanding-card-title">{card.title}</h3>
            <button
              className={`heart-button ${userLiked[card.id] ? 'liked' : ''}`}
              onClick={(e) => handleLike(e, card.id)}
              aria-label="Like this design"
            >
              <svg viewBox="0 0 24 24" className="heart-icon">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span className="like-count">{likes[card.id] || 0}</span>
            </button>
            {activeCard === index && (
              <button
                className="view-full-button"
                onClick={(e) => openModal(e, card)}
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
        ))}
      </div>

      {/* Image Modal */}
      {isModalOpen && modalImage && (
        <div className="design-modal-overlay" onClick={closeModal}>
          <div className="design-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="design-modal-close" onClick={closeModal} aria-label="Close modal">
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
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                draggable="false"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ExpandingCards

