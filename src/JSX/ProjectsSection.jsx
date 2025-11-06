import React from 'react'
import roomReservation400avif from '../assets/Photoshop/RoomReservationSystem-400.avif'
import roomReservation800avif from '../assets/Photoshop/RoomReservationSystem-800.avif'
import roomReservation1200avif from '../assets/Photoshop/RoomReservationSystem-1200.avif'
import roomReservation400 from '../assets/Photoshop/RoomReservationSystem-400.webp'
import roomReservation800 from '../assets/Photoshop/RoomReservationSystem-800.webp'
import roomReservation1200 from '../assets/Photoshop/RoomReservationSystem-1200.webp'

import safeLink400avif from '../assets/Project Overview/SafeLink-400.avif'
import safeLink800avif from '../assets/Project Overview/SafeLink-800.avif'
import safeLink1200avif from '../assets/Project Overview/SafeLink-1200.avif'
import safeLink400 from '../assets/Project Overview/SafeLink-400.webp'
import safeLink800 from '../assets/Project Overview/SafeLink-800.webp'
import safeLink1200 from '../assets/Project Overview/SafeLink-1200.webp'

import calendarWidget400avif from '../assets/Project Overview/CalendarWidget-400.avif'
import calendarWidget800avif from '../assets/Project Overview/CalendarWidget-800.avif'
import calendarWidget1200avif from '../assets/Project Overview/CalendarWidget-1200.avif'
import calendarWidget400 from '../assets/Project Overview/CalendarWidget-400.webp'
import calendarWidget800 from '../assets/Project Overview/CalendarWidget-800.webp'
import calendarWidget1200 from '../assets/Project Overview/CalendarWidget-1200.webp'

import InfiniteListWithDetail from '../JS/InfiniteListWithDetail'

function smoothScrollToId(id, duration = 600) {
  const el = document.getElementById(id.replace('#', ''))
  if (!el) return
  const navbar = document.querySelector('.glass-navbar')
  const offset = (navbar && navbar.offsetHeight) ? navbar.offsetHeight : 72
  const start = window.scrollY || window.pageYOffset
  const end = el.getBoundingClientRect().top + start - offset - 8
  const distance = end - start
  let startTime = null

  function easeInOutQuad(t) { return t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t }

  function animate(time) {
    if (!startTime) startTime = time
    const timeElapsed = time - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    const eased = easeInOutQuad(progress)
    window.scrollTo(0, Math.round(start + distance * eased))
    if (timeElapsed < duration) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

function Tooltip({ text, children }) {
  return (
    <span className="gh-tooltip-wrapper" tabIndex={0}>
      {children}
      <span className="gh-tooltip">{text}</span>
    </span>
  )
}

function ProjectsSection() {
  return (
    <section className='Projects' id='Projects'>
      <div className="container">
        <h2>Projects</h2>
        <p>Real-world applications demonstrating front-end development, database management, and problem-solving skills.</p>
        
        <InfiniteListWithDetail projects={[
          {
            title: 'SafeLink Mobile',
            description: 'SafeLink is a React Native/Expo app for family safety with emergency broadcasts and evacuation info using Firebase and OpenStreetMap.',
            tags: ['React Native','JavaScript','Firebase','Mobile'],
            repoUrl: 'https://github.com/kidlatpogi/SafeLink',
            images: { avif400: safeLink400avif, avif800: safeLink800avif, avif1200: safeLink1200avif, webp400: safeLink400, webp800: safeLink800, webp1200: safeLink1200 }
          },
          {
            title: 'Room Reservation System',
            description: 'A web-based system for classroom and laboratory reservations with admin controls and real-time updates.',
            tags: ['HTML5','CSS3','JavaScript','SQL'],
            repoUrl: 'https://github.com/kidlatpogi/Room-Reservation-System',
            images: { avif400: roomReservation400avif, avif800: roomReservation800avif, avif1200: roomReservation1200avif, webp400: roomReservation400, webp800: roomReservation800, webp1200: roomReservation1200 }
          },
          {
            title: 'Calendar Widget',
            description: 'A sleek and lightweight Windows Calendar Widget seamlessly connected to Google Calendar — without relying on any external databases or APIs.',
            tags: ['HTML5','CSS3','JavaScript','Electron'],
            repoUrl: 'https://github.com/kidlatpogi/Calendar-Widget',
            images: { avif400: calendarWidget400avif, avif800: calendarWidget800avif, avif1200: calendarWidget1200avif, webp400: calendarWidget400, webp800: calendarWidget800, webp1200: calendarWidget1200 }
          }
        ]} />

        <div className="project-buttons-grid">
          <button 
            className="project-showcase-btn gallery-btn"
            onClick={() => smoothScrollToId('ExpandingCards')}
          >
            <span>See Photoshop Gallery</span>
            <svg className="arrow-down-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </button>

          <a 
            href="https://github.com/kidlatpogi/Olympus"
            target="_blank"
            rel="noopener noreferrer"
            className="project-showcase-btn olympus-btn"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            <span>Explore my Side Projects</span>
            <svg className="arrow-right-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
