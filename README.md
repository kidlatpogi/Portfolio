Portfolio

Performance & optimizations
--------------------------
- The gallery (`ExpandingCards`) is lazy-loaded with React.lazy + Suspense to reduce initial bundle size.
- The build now uses a Rollup `manualChunks` configuration to split vendor code and isolate the expanding-cards chunk.
- Large or legacy stub files under `src/JS` were removed to reduce clutter. If you need the removed files, restore from git history.
- If you want to run image optimizations (WebP / AVIF conversions), a `scripts/` utility using `sharp` can be added; this repo keeps that process opt-in.
