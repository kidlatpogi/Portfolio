import React, { useState, useEffect } from 'react'
import '../CSS/LoadingScreen.css'

function LoadingScreen({ onLoadComplete }) {
  const [isLoading, setIsLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Minimum loading time of 2 seconds for smooth experience
    const timer = setTimeout(() => {
      setFadeOut(true)
      // Wait for fade animation to complete before removing loader
      setTimeout(() => {
        setIsLoading(false)
        if (onLoadComplete) onLoadComplete()
      }, 800) // Match CSS transition duration
    }, 2000)

    return () => clearTimeout(timer)
  }, [onLoadComplete])

  if (!isLoading) return null

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <h1 className="loading-title">
          Zeus Bautista | Portfolio
        </h1>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
