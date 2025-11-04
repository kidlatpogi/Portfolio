Portfolio

Performance & optimizations
--------------------------
- The gallery (`ExpandingCards`) is lazy-loaded with React.lazy + Suspense to reduce initial bundle size.
- The build now uses a Rollup `manualChunks` configuration to split vendor code and isolate the expanding-cards chunk.
- Large or legacy stub files under `src/JS` were removed to reduce clutter. If you need the removed files, restore from git history.
- If you want to run image optimizations (WebP / AVIF conversions), a `scripts/` utility using `sharp` can be added; this repo keeps that process opt-in.

Vercel KV / API environment
---------------------------
This project includes two serverless endpoints that use Vercel KV to store and read "likes": `api/likes` and `api/admin_likes`.

Required environment variables (on Vercel):

- `KV_REST_API_URL` — URL for the KV REST API
- `KV_REST_API_TOKEN` — token for the KV REST API
- `ADMIN_SECRET` — secret used to protect the admin endpoint
- `LIKED_IDS` — comma-separated list of ids that `admin_likes` will return

If those KV env vars are not set, the endpoints will return a 500 with a clear error message instead of crashing. For local development you can either set the env vars locally or mock the endpoints.
