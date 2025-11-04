import React, { useState, useEffect } from 'react'
// VisitorCounter now uses localStorage-only counts (no Firebase)
import '../CSS/VisitorCounter.css'

function VisitorCounter() {
  const [visitCount, setVisitCount] = useState(0)
  const [isNewVisitor, setIsNewVisitor] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const hasVisited = localStorage.getItem('hasVisitedPortfolio')
        const key = 'portfolioVisitCount'
        const raw = localStorage.getItem(key) || '0'
        let current = parseInt(raw, 10)

        if (!hasVisited) {
          current = current + 1
          localStorage.setItem(key, String(current))
          localStorage.setItem('hasVisitedPortfolio', 'true')
          setIsNewVisitor(true)
          setVisitCount(current)
          setTimeout(() => setIsNewVisitor(false), 3000)
        } else {
          setVisitCount(current)
        }
      } catch (error) {
        console.error('Error tracking visitor (local fallback):', error)
        setVisitCount(0)
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
