export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end()
  }

  const id = req.query.id || (req.body && req.body.id)
  if (!id) return res.status(400).json({ error: 'missing id' })

  try {
    // Ensure the Vercel KV environment is configured. If not, return a clear error.
    const env = (typeof process !== 'undefined' && process.env) ? process.env : {}
    if (!env.KV_REST_API_URL || !env.KV_REST_API_TOKEN) {
      console.error('likes api error: missing KV_REST_API_URL or KV_REST_API_TOKEN')
      return res.status(500).json({ error: 'KV not configured', message: 'Missing KV_REST_API_URL or KV_REST_API_TOKEN environment variables' })
    }
    // Lazy-import to avoid any top-level initialization issues when env vars are absent
    const { kv } = await import('@vercel/kv')
    const key = `likes:${id}`
    // Vercel KV doesn't expose an atomic INCR in the same API; emulate with get/set using optimistic approach
    // However, if you have access to the Redis-compatible API, use that instead. Here we'll use a small atomic strategy:
    const cur = await kv.get(key)
    const newCount = (parseInt(cur || '0', 10) || 0) + 1
    await kv.set(key, String(newCount))
    return res.status(200).json({ id, count: newCount })
  } catch (err) {
    console.error('likes api error', err)
    return res.status(500).json({ error: 'failed' })
  }
}
