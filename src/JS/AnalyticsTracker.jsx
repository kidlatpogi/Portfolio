import { useEffect } from 'react'
import { db } from '../firebase'
import { doc, runTransaction } from 'firebase/firestore'

/**
 * AnalyticsTracker Component
 * Silently tracks visitor analytics without displaying UI
 * - Tracks visitor count to Firestore
 * - No visual element rendered
 */
function AnalyticsTracker() {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Check if user has visited before
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
            } else {
              // Increment existing count
              const newCount = visitorDoc.data().count + 1
              transaction.update(visitorDocRef, { count: newCount })
            }
          })
          
          // Mark as visited locally
          localStorage.setItem('hasVisitedPortfolio', 'true')
        }
      } catch (error) {
        console.error('Error tracking visitor:', error)
        // Silently fail - don't affect user experience
      }
    }

    trackVisitor()
  }, [])

  // This component renders nothing
  return null
}

export default AnalyticsTracker
