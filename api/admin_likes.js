import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  // Simple admin-protected endpoint. Use a secret stored in Vercel env: ADMIN_SECRET
  const auth = req.headers.authorization
  if (!auth || auth !== `Bearer ${globalThis.process?.env?.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'unauthorized' })
  }

  try {
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
