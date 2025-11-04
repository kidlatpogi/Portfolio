import { useEffect, useState, useCallback } from 'react'

// Local-only likes hook. Stores per-project like boolean under `liked:<id>` and
// a counts map under `portfolioLikesCounts` in localStorage. Uses the storage
// event to sync between tabs/windows.
export default function useLikes(projectId) {
  const [count, setCount] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (!projectId) return

    const likedKey = `liked:${projectId}`
    const countKey = 'portfolioLikesCounts'

    const storedLiked = localStorage.getItem(likedKey) === 'true'
    setIsLiked(storedLiked)

    try {
      const raw = localStorage.getItem(countKey) || '{}'
      const counts = JSON.parse(raw)
      setCount(counts[projectId] || 0)
    } catch {
      setCount(0)
    }

    const onStorage = (e) => {
      if (!e.key) return
      if (e.key === likedKey) {
        setIsLiked(e.newValue === 'true')
      }
      if (e.key === countKey) {
        try {
          const counts = JSON.parse(e.newValue || '{}')
          setCount(counts[projectId] || 0)
        } catch {
          // ignore parse issues
        }
      }
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [projectId])

  const toggle = useCallback(() => {
    if (!projectId) return
    const likedKey = `liked:${projectId}`
    const countKey = 'portfolioLikesCounts'

    const currentlyLiked = localStorage.getItem(likedKey) === 'true'
    const newLiked = !currentlyLiked
    try {
      const raw = localStorage.getItem(countKey) || '{}'
      const counts = JSON.parse(raw)
      const current = counts[projectId] || 0
      const newCount = newLiked ? current + 1 : Math.max(0, current - 1)
      counts[projectId] = newCount
      localStorage.setItem(countKey, JSON.stringify(counts))
      localStorage.setItem(likedKey, newLiked.toString())
      // Update state
      setIsLiked(newLiked)
      setCount(newCount)
      // storage event will sync other tabs
    } catch (err) {
      console.warn('Failed to toggle like locally:', err)
      // fallback to in-memory update
      setIsLiked(newLiked)
      setCount((c) => (newLiked ? c + 1 : Math.max(0, c - 1)))
    }
  }, [projectId])

  return { count, isLiked, toggle }
}
