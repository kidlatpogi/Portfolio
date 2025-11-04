// Opt-in loader for Vercel Analytics / Insights script
// Usage: set VITE_VERCEL_INSIGHTS_URL in your Vercel environment variables to the script URL
// Example (from Vercel dashboard): https://static.vercel-insights.com/script.js

export function initVercelAnalytics() {
  try {
    const scriptUrl = import.meta.env.VITE_VERCEL_INSIGHTS_URL
    if (!scriptUrl) return

    // Create script tag and append to head
    const s = document.createElement('script')
    s.defer = true
    s.src = scriptUrl

    // Optional: set data attributes (if Vercel provided an id)
    const siteId = import.meta.env.VITE_VERCEL_INSIGHTS_ID
    if (siteId) s.setAttribute('data-website-id', siteId)

    s.onload = () => {
      console.debug('Vercel analytics script loaded:', scriptUrl)
    }
    s.onerror = (err) => {
      console.warn('Failed to load Vercel analytics script:', err)
    }

    document.head.appendChild(s)
  } catch (err) {
    console.warn('Error initializing Vercel analytics loader', err)
  }
}
