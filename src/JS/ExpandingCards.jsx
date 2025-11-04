import React, { useState, useEffect, useCallback } from 'react'
import '../CSS/ExpandingCards.css'
import DesignCard from './DesignCard'
import DesignModal from './DesignModal'

// Import images (use optimized variants where available)
import cloud9 from '../assets/Photoshop/Cloud9-800.webp'
import ketchup from '../assets/Photoshop/Ketchup-800.webp'

// Optimized responsive variants (generated into src/assets/optimized)

import ketchup400 from '../assets/Photoshop/Ketchup-400.webp'
import ketchup800 from '../assets/Photoshop/Ketchup-800.webp'
import ketchup1200 from '../assets/Photoshop/Ketchup-1200.webp'
import ketchup400avif from '../assets/Photoshop/Ketchup-400.avif'
import ketchup800avif from '../assets/Photoshop/Ketchup-800.avif'
import ketchup1200avif from '../assets/Photoshop/Ketchup-1200.avif'

import cloud9_400 from '../assets/Photoshop/Cloud9-400.webp'
import cloud9_800 from '../assets/Photoshop/Cloud9-800.webp'
import cloud9_1200 from '../assets/Photoshop/Cloud9-1200.webp'
import cloud9_400_avif from '../assets/Photoshop/Cloud9-400.avif'
import cloud9_800_avif from '../assets/Photoshop/Cloud9-800.avif'
import cloud9_1200_avif from '../assets/Photoshop/Cloud9-1200.avif'

import typography400avif from '../assets/Photoshop/Typography-400.avif'
import typography800avif from '../assets/Photoshop/Typography-800.avif'
import typography1200avif from '../assets/Photoshop/Typography-1200.avif'
import Multo400 from '../assets/Photoshop/Multo-400.avif'
import Multo800 from '../assets/Photoshop/Multo-800.avif'
import Multo1200 from '../assets/Photoshop/Multo-1200.avif'
import Lamaw400 from '../assets/Photoshop/lamaw-400.avif'
import Lamaw800 from '../assets/Photoshop/lamaw-800.avif'
import Lamaw1200 from '../assets/Photoshop/lamaw-1200.avif'
import Here400 from '../assets/Photoshop/Here-with-me-400.avif'
import Here800 from '../assets/Photoshop/Here-with-me-800.avif'
import Here1200 from '../assets/Photoshop/Here-with-me-1200.avif'

const CARDS_DATA = [
  {
    id: 1,
    title: 'Redesigning Old Poster',
    image: ketchup,
  imageSrc: ketchup800,
  imageSrcSet: `${ketchup400avif} 400w, ${ketchup800avif} 800w, ${ketchup1200avif} 1200w, ${ketchup400} 400w, ${ketchup800} 800w, ${ketchup1200} 1200w`,
    imageSizes: '(max-width: 600px) 100vw, 33vw',
    modalSrc: ketchup1200,
  },
  {
    id: 2,
    title: 'Cloud 9 Music Poster',
    image: cloud9,
  imageSrc: cloud9_800,
  imageSrcSet: `${cloud9_400_avif} 400w, ${cloud9_800_avif} 800w, ${cloud9_1200_avif} 1200w, ${cloud9_400} 400w, ${cloud9_800} 800w, ${cloud9_1200} 1200w`,
    imageSizes: '(max-width: 600px) 100vw, 33vw',
    modalSrc: cloud9_1200,
  },
  {
    id: 3,
    title: 'Multo Music Poster',
    // use the imported optimized 800w AVIF
    image: Multo800,
  imageSrc: Multo800,
  imageSrcSet: `${Multo400} 400w, ${Multo800} 800w, ${Multo1200} 1200w`,
  imageSizes: '(max-width: 600px) 100vw, 33vw',
  modalSrc: Multo1200,
  },
  {
    id: 4,
    title: 'Here with me Music Poster',
  image: Here800,
  imageSrc: Here800,
  imageSrcSet: `${Here400} 400w, ${Here800} 800w, ${Here1200} 1200w`,
  imageSizes: '(max-width: 600px) 100vw, 33vw',
  modalSrc: Here1200,
  },
  {
    id: 5,
    title: 'Typography Design',
    // Use AVIF optimized variants (webp variants were not present in the assets folder)
    image: typography800avif,
    imageSrc: typography800avif,
    imageSrcSet: `${typography400avif} 400w, ${typography800avif} 800w, ${typography1200avif} 1200w`,
    imageSizes: '(max-width: 600px) 100vw, 33vw',
    modalSrc: typography1200avif,
  },
  {
    id: 6,
    title: 'Podcast Thumbnail Design',
  image: Lamaw800,
  imageSrc: Lamaw800,
  imageSrcSet: `${Lamaw400} 400w, ${Lamaw800} 800w, ${Lamaw1200} 1200w`,
  imageSizes: '(max-width: 600px) 100vw, 33vw',
  modalSrc: Lamaw1200,
  },
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
    // Persist a local-only likes count object so counts survive reloads for this browser
    try {
      // Persist local counts for this browser
      const countsKey = 'portfolioLikesCounts'
      const raw = localStorage.getItem(countsKey)
      const counts = raw ? JSON.parse(raw) : {}
      const currentCount = counts[cardId] || 0
      const newCount = isCurrentlyLiked ? Math.max(0, currentCount - 1) : currentCount + 1
      counts[cardId] = newCount
      localStorage.setItem(countsKey, JSON.stringify(counts))

      // If this is a new like, notify serverless endpoint (Vercel KV) to increment global counter
      if (!isCurrentlyLiked) {
        try {
          const resp = await fetch(`/api/reactions?id=${encodeURIComponent(cardId)}`, { method: 'POST' })
          if (!resp.ok) {
            // Server returned an error (or KV not configured) — fall back to local only
            console.warn('Server reaction endpoint responded with error:', resp.status)
          }
        } catch (e) {
          // Likely blocked by client (adblock/shields) or network issue — keep local counts
          console.warn('Failed to report like to server (possibly blocked):', e)
        }
      }
    } catch (err) {
      // If localStorage is unavailable or fails, silently ignore
      console.warn('Failed to persist local likes count:', err)
    }
  }, [userLiked])

  const handleOpenModal = useCallback((e, card) => {
    e.stopPropagation()
    // use modalSrc if available (optimized large variant), else card object
    setModalImage({ ...card, image: card.modalSrc || card.image })
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

