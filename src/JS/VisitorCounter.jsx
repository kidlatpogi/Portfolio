import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { doc, getDoc, runTransaction } from 'firebase/firestore'
import '../CSS/VisitorCounter.css'

function VisitorCounter() {
  const [visitCount, setVisitCount] = useState(0)
  const [isNewVisitor, setIsNewVisitor] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Check if user has visited before (still use localStorage for this)
        const hasVisited = localStorage.getItem('hasVisitedPortfolio')
        
        // Reference to the visitor count document
        const visitorDocRef = doc(db, 'stats', 'visitors')
        
        if (!hasVisited) {
          // New visitor - increment count in Firestore
          await runTransaction(db, async (transaction) => {
            const visitorDoc = await transaction.get(visitorDocRef)
            
            if (!visitorDoc.exists()) {
              // First visitor ever!
              transaction.set(visitorDocRef, { count: 1 })
              setVisitCount(1)
            } else {
              // Increment existing count
              const newCount = visitorDoc.data().count + 1
              transaction.update(visitorDocRef, { count: newCount })
              setVisitCount(newCount)
            }
          })
          
          // Mark as visited locally
          localStorage.setItem('hasVisitedPortfolio', 'true')
          setIsNewVisitor(true)
          
          // Show welcome animation for 3 seconds
          setTimeout(() => setIsNewVisitor(false), 3000)
        } else {
          // Returning visitor - just fetch and display count
          const visitorDoc = await getDoc(visitorDocRef)
          if (visitorDoc.exists()) {
            setVisitCount(visitorDoc.data().count)
          }
        }
      } catch (error) {
        console.error('Error tracking visitor:', error)
        // Fallback to localStorage if Firebase fails
        const storedCount = localStorage.getItem('portfolioVisitCount') || '0'
        setVisitCount(parseInt(storedCount, 10))
      } finally {
        setIsLoading(false)
      }
    }

    trackVisitor()
  }, [])

  return (
    <div className="visitor-counter">
      <div className="counter-content">
        <svg 
          className="counter-icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <div className="counter-text">
          <span className="counter-label">Engagements</span>
          <span className="counter-number">
            {isLoading ? '...' : visitCount.toLocaleString()}
          </span>
        </div>
      </div>
      {isNewVisitor && (
        <div className="welcome-message">
          Welcome! 👋
        </div>
      )}
    </div>
  )
}

export default VisitorCounter
