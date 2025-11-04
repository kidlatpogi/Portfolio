export default async function handler(req, res) {
  // Simple admin-protected endpoint. Use a secret stored in Vercel env: ADMIN_SECRET
  const auth = req.headers.authorization
  if (!auth || auth !== `Bearer ${globalThis.process?.env?.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'unauthorized' })
  }

  try {
    // Ensure KV env vars are present before importing/using @vercel/kv
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      console.error('admin likes error: missing KV_REST_API_URL or KV_REST_API_TOKEN')
      return res.status(500).json({ error: 'KV not configured', message: 'Missing KV_REST_API_URL or KV_REST_API_TOKEN environment variables' })
    }
    const { kv } = await import('@vercel/kv')
    const ids = ((globalThis.process?.env?.LIKED_IDS) || '').split(',').filter(Boolean)
    const out = {}
    await Promise.all(ids.map(async (id) => {
      const v = await kv.get(`likes:${id}`)
      out[id] = Number(v || 0)
    }))
    return res.status(200).json(out)
  } catch (err) {
    console.error('admin likes error', err)
    return res.status(500).json({ error: 'failed' })
  }
}
