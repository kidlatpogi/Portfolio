import React, { useState, useEffect, useCallback } from 'react'
import { db } from '../firebase'
import { doc, runTransaction } from 'firebase/firestore'
import '../CSS/ExpandingCards.css'
import DesignCard from './DesignCard'
import DesignModal from './DesignModal'

// Import images
import typography from '../assets/Photoshop/Typography.png'
import multo from '../assets/Photoshop/Multo.png'
import lamaw from '../assets/Photoshop/lamaw.png'
import hereWithMe from '../assets/Photoshop/Here with me.png'
import cloud9 from '../assets/Photoshop/Cloud 9.png'
import ketchup from '../assets/Photoshop/Ketchup.png'

const CARDS_DATA = [
  { id: 1, title: 'Redesigning Old Poster', image: ketchup },
  { id: 2, title: 'Cloud 9 Music Poster', image: cloud9 },
  { id: 3, title: 'Multo Music Poster', image: multo },
  { id: 4, title: 'Here with me Music Poster', image: hereWithMe },
  { id: 5, title: 'Typography Design', image: typography },
  { id: 6, title: 'Podcast Thumbnail Design', image: lamaw },
]

function ExpandingCards() {
  const [activeCard, setActiveCard] = useState(0)
  const [userLiked, setUserLiked] = useState({})
  const [modalImage, setModalImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Load user's liked state from localStorage on mount
  useEffect(() => {
    const savedUserLiked = localStorage.getItem('portfolioUserLiked')
    if (savedUserLiked) {
      try {
        setUserLiked(JSON.parse(savedUserLiked))
      } catch (e) {
        console.error('Error parsing liked state:', e)
      }
    }
  }, [])

  const handleCardClick = useCallback((index) => {
    setActiveCard(index)
  }, [])

  const handleLike = useCallback(async (e, cardId) => {
    e.stopPropagation()
    
    const isCurrentlyLiked = userLiked[cardId] || false
    const newUserLiked = { ...userLiked, [cardId]: !isCurrentlyLiked }
    
    // Optimistic update
    setUserLiked(newUserLiked)
    localStorage.setItem('portfolioUserLiked', JSON.stringify(newUserLiked))

    try {
      const likesDocRef = doc(db, 'stats', 'likes')
      
      await runTransaction(db, async (transaction) => {
        const likesDoc = await transaction.get(likesDocRef)
        
        if (!likesDoc.exists()) {
          const initialLikes = {}
          CARDS_DATA.forEach((card) => {
            initialLikes[card.id] = card.id === cardId ? 1 : 0
          })
          transaction.set(likesDocRef, initialLikes)
        } else {
          const currentLikes = likesDoc.data()
          const currentCount = currentLikes[cardId] || 0
          const newCount = isCurrentlyLiked ? Math.max(0, currentCount - 1) : currentCount + 1
          transaction.update(likesDocRef, { [cardId]: newCount })
        }
      })
    } catch (error) {
      console.error('Error updating like:', error)
      // Revert optimistic update on error
      setUserLiked((prev) => ({ ...prev, [cardId]: isCurrentlyLiked }))
      localStorage.setItem('portfolioUserLiked', JSON.stringify({ ...userLiked, [cardId]: isCurrentlyLiked }))
    }
  }, [userLiked])

  const handleOpenModal = useCallback((e, card) => {
    e.stopPropagation()
    setModalImage(card)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setTimeout(() => setModalImage(null), 300)
  }, [])

  return (
    <>
      <div className="expanding-cards-container">
        {CARDS_DATA.map((card, index) => (
          <DesignCard
            key={card.id}
            card={card}
            index={index}
            isActive={activeCard === index}
            userLiked={userLiked}
            onCardClick={handleCardClick}
            onLike={handleLike}
            onViewFull={handleOpenModal}
          />
        ))}
      </div>

      <DesignModal 
        isOpen={isModalOpen}
        modalImage={modalImage}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default ExpandingCards

