# Changelog

## 2025-11-04 — Performance & Cleanup
- Added Rollup manualChunks to `vite.config.js` to split vendor and gallery bundles.
- Removed unused stub files from `src/JS` to reduce clutter.
- Lazy-loaded `ExpandingCards` via React.lazy + Suspense.
- Added a CI workflow to build on push and report `dist/` sizes.