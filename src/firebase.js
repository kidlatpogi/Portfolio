// Firebase Configuration
import { initializeApp } from 'firebase/app'

// Firebase configuration using environment variables (secure!)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// Only initialize Firebase if required config values exist
let app = null
let analytics = null
let db = null
let isFirebaseReady = false

const hasRequiredConfig = Boolean(
  firebaseConfig.projectId && firebaseConfig.apiKey && firebaseConfig.appId
)

if (!hasRequiredConfig) {
  // Don't throw at runtime — log a clear warning for deploys without env vars
  // This prevents the app from crashing in environments where Firebase isn't configured yet (e.g. Vercel without env)
  // See .env.example for expected variable names.
  console.warn(
    'Firebase not initialized — missing environment variables. Expected VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_API_KEY, VITE_FIREBASE_APP_ID.'
  )
} else {
  // Initialize Firebase
  app = initializeApp(firebaseConfig)

  // Initialize Firestore (database)
  try {
    // dynamically import Firestore to avoid evaluating Firebase internals when config is missing
    // (prevents runtime errors like installations/missing-app-config-values)
    import('firebase/firestore').then((mod) => {
      try {
        db = mod.getFirestore(app)
        isFirebaseReady = true
      } catch (err) {
        console.warn('Failed to initialize Firestore (dynamic import):', err)
        db = null
      }
    }).catch((err) => {
      console.warn('Failed to load firebase/firestore module:', err)
      db = null
    })
  } catch (err) {
    console.warn('Failed to initialize Firestore:', err)
    db = null
  }

  // Initialize Analytics (optional)
  if (typeof window !== 'undefined') {
    try {
      // dynamically import analytics to avoid bundle evaluation on servers without config
      import('firebase/analytics').then((mod) => {
        try {
          analytics = mod.getAnalytics(app)
        } catch (err) {
          console.warn('Failed to initialize Analytics (dynamic import):', err)
          analytics = null
        }
      }).catch((err) => {
        console.warn('Failed to load firebase/analytics module:', err)
        analytics = null
      })
    } catch (err) {
      console.warn('Failed to initialize Analytics:', err)
      analytics = null
    }
  }
}

export { analytics }
export { db }
export { isFirebaseReady }
export default app
