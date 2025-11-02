import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../CSS/index.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App.jsx'

// Detect system theme preference and apply it before render
const detectSystemTheme = () => {
  const savedMode = localStorage.getItem('theme')
  
  if (savedMode) {
    // User has a saved preference
    if (savedMode === 'light') {
      document.body.classList.add('light-mode')
    }
  } else {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (!prefersDark) {
      document.body.classList.add('light-mode')
      localStorage.setItem('theme', 'light')
    } else {
      localStorage.setItem('theme', 'dark')
    }
  }
}

// Apply theme immediately
detectSystemTheme()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
