import React, { useMemo, useState, useCallback, useEffect } from 'react'
import AnimatedList from './AnimatedList'
import '../CSS/InfiniteListWithDetail.css'

function DetailCard({ project }) {
  if (!project) {
    return (
      <div className="detail-card placeholder">
        <h3>No project selected</h3>
        <p>Choose a project from the list to view details here.</p>
      </div>
    )
  }

  // project can be a string or an object
  if (typeof project === 'string') {
    return (
      <div className="detail-card">
        <h3>{project}</h3>
        <p>Details for {project}</p>
      </div>
    )
  }

  const { title, description, tags, repoUrl, images } = project

  return (
    <article key={title} className="project-card detail-view">
      <div className="project-media">
        <picture>
          {images?.avif400 && (
            <source type="image/avif" srcSet={`${images.avif400} 400w, ${images.avif800} 800w, ${images.avif1200} 1200w`} sizes="(max-width: 600px) 100vw, 50vw" />
          )}
          {images?.webp400 && (
            <source type="image/webp" srcSet={`${images.webp400} 400w, ${images.webp800} 800w, ${images.webp1200} 1200w`} sizes="(max-width: 600px) 100vw, 50vw" />
          )}
          {images?.webp800 && <img src={images.webp800} alt={title || 'project image'} className="project-image" loading="lazy" />}
        </picture>
        
        <div className="project-overlay">
          <div className="project-overlay-inner">
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div className="project-body">
        <h3>{title}</h3>

        <div className="overlay-tags">
          {tags?.map((t, i) => <span className="overlay-tag" key={i}>{t}</span>)}
        </div>

        {repoUrl && (
          <div style={{ marginTop: '1rem' }}>
            <a className="project-cta-link" href={repoUrl} target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              View code
            </a>
          </div>
        )}
      </div>
    </article>
  )
}

export default function InfiniteListWithDetail({ projects = [], initialItems = [], fetchMore }) {
  const hasStaticProjects = Array.isArray(projects) && projects.length > 0

  const [items, setItems] = useState(hasStaticProjects ? projects : initialItems)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(hasStaticProjects ? 0 : (initialItems.length ? 0 : -1))

  useEffect(() => {
    if (hasStaticProjects) {
      setItems(projects)
      setSelectedIndex(projects.length ? 0 : -1)
    }
  }, [hasStaticProjects, projects])

  const loadMore = useCallback(async () => {
    if (!fetchMore || loadingMore || !hasMore) return
    setLoadingMore(true)
    try {
      const resp = await fetchMore(page + 1)
      if (resp && Array.isArray(resp.items)) {
        setItems(prev => [...prev, ...resp.items])
        setPage(p => p + 1)
        setHasMore(Boolean(resp.hasMore))
      } else {
        setHasMore(false)
      }
    } catch (err) {
      console.error('loadMore error', err)
    } finally {
      setLoadingMore(false)
    }
  }, [fetchMore, page, loadingMore, hasMore])

  const handleSelect = useCallback((value, index) => {
    setSelectedIndex(index)
  }, [])

  const listItems = useMemo(() => items.map(it => (typeof it === 'string' ? it : (it.title || it.name || it.id || JSON.stringify(it)))), [items])

  return (
    <div className="infinite-list-with-detail">
      <div className="left-col">
        <AnimatedList
          items={listItems}
          onItemSelect={handleSelect}
          showGradients
          enableArrowNavigation
          displayScrollbar
          initialSelectedIndex={selectedIndex}
          onLoadMore={fetchMore ? loadMore : undefined}
          hasMore={fetchMore ? hasMore : undefined}
        />
        {loadingMore && <div className="loading-more">Loading…</div>}
      </div>

      <div className="right-col">
        <DetailCard project={items[selectedIndex]} />
      </div>
    </div>
  )
}
