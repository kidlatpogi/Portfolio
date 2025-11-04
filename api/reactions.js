export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end()
  }

  const id = req.query.id || (req.body && req.body.id)
  if (!id) return res.status(400).json({ error: 'missing id' })

  try {
    // Ensure the Vercel KV environment is configured. If not, return a clear error.
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      console.error('reactions api error: missing KV_REST_API_URL or KV_REST_API_TOKEN')
      return res.status(500).json({ error: 'KV not configured', message: 'Missing KV_REST_API_URL or KV_REST_API_TOKEN environment variables' })
    }
    // Lazy-import to avoid any top-level initialization issues when env vars are absent
    const { kv } = await import('@vercel/kv')
  const key = `reactions:${id}`
    const cur = await kv.get(key)
    const newCount = (parseInt(cur || '0', 10) || 0) + 1
    await kv.set(key, String(newCount))
    return res.status(200).json({ id, count: newCount })
  } catch (err) {
    console.error('reactions api error', err)
    return res.status(500).json({ error: 'failed' })
  }
}
