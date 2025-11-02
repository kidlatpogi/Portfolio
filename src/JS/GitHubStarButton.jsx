import { useState, useEffect } from 'react'

// GitHub star button component that fetches the repo star count and checks if user has starred
function GitHubStarButton({ repo, style, className }) {
  const [stars, setStars] = useState(null)
  const [isStarred, setIsStarred] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    let mounted = true
    
    // Fetch repo data for star count
    fetch(`https://api.github.com/repos/${repo}`)
      .then((r) => {
        if (!r.ok) throw new Error('GitHub API error')
        return r.json()
      })
      .then((data) => {
        if (mounted && data && typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count)
        }
      })
      .catch(() => {
        // silently ignore; we can show fallback text
        if (mounted) setStars(null)
      })

    // Check if user has starred (localStorage simulation)
    const starredRepos = JSON.parse(localStorage.getItem('starredRepos') || '[]')
    if (starredRepos.includes(repo)) {
      setIsStarred(true)
    }

    return () => {
      mounted = false
    }
  }, [repo])

  const handleClick = (e) => {
    e.preventDefault()
    
    // If already starred, just open the repo
    if (isStarred) {
      window.open(`https://github.com/${repo}`, '_blank', 'noopener,noreferrer')
      return
    }
    
    // Show modal for first-time starring
    setShowModal(true)
  }

  const handleStarClick = () => {
    // Open GitHub repo in a popup window for starring
    const starUrl = `https://github.com/${repo}`
    const popup = window.open(
      starUrl,
      'StarRepo',
      'width=800,height=600,left=200,top=100'
    )
    
    // Mark as starred after a short delay (assuming user will star)
    setTimeout(() => {
      const starredRepos = JSON.parse(localStorage.getItem('starredRepos') || '[]')
      if (!starredRepos.includes(repo)) {
        starredRepos.push(repo)
        localStorage.setItem('starredRepos', JSON.stringify(starredRepos))
        setIsStarred(true)
      }
      setShowModal(false)
    }, 2000)

    // Try to detect when popup closes
    const checkPopup = setInterval(() => {
      if (popup && popup.closed) {
        clearInterval(checkPopup)
        setShowModal(false)
      }
    }, 500)
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  return (
    <>
      <button
        className={`${className || "gh-star-btn"} ${isStarred ? 'starred' : ''}`}
        style={style}
        onClick={handleClick}
        aria-label={`${isStarred ? 'Starred' : 'Star'} ${repo} on GitHub`}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 16 16" 
          fill={isStarred ? '#FFD700' : 'currentColor'} 
          xmlns="http://www.w3.org/2000/svg" 
          aria-hidden="true" 
          focusable="false"
          style={{ transition: 'fill 200ms ease', flexShrink: 0, display: 'block' }}
        >
          <path d="M8 12.027l3.247 1.709-.62-3.618 2.623-2.56-3.625-.53L8 4.178l-1.624 2.85-3.625.53 2.623 2.56-.62 3.618L8 12.027z" />
        </svg>
        <span className="gh-star-label" style={{ display: 'flex', alignItems: 'center' }}>{isStarred ? 'Starred' : 'Give me a Star'}</span>
        {stars !== null && <span className="gh-star-count" style={{ display: 'flex', alignItems: 'center' }}>{stars.toLocaleString()}</span>}
      </button>

      {showModal && (
        <div className="star-modal-overlay" onClick={handleModalClose}>
          <div className="star-modal" onClick={(e) => e.stopPropagation()}>
            <button className="star-modal-close" onClick={handleModalClose} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="star-modal-content">
              <svg 
                width="48" 
                height="48" 
                viewBox="0 0 16 16" 
                fill="#FFD700" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginBottom: '1rem' }}
              >
                <path d="M8 12.027l3.247 1.709-.62-3.618 2.623-2.56-3.625-.53L8 4.178l-1.624 2.85-3.625.53 2.623 2.56-.62 3.618L8 12.027z" />
              </svg>
              
              <h3>Star this Repository?</h3>
              <p>Click the button below to open GitHub and star the repository. You'll need to be signed in to GitHub.</p>
              
              <div className="star-modal-actions">
                <button className="star-modal-btn star-modal-btn-primary" onClick={handleStarClick}>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  Open GitHub & Star
                </button>
                <button className="star-modal-btn star-modal-btn-secondary" onClick={handleModalClose}>
                  Maybe Later
                </button>
              </div>
              
              <p className="star-modal-note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.5rem' }}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                A small popup window will open. After starring, you can close it!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GitHubStarButton
