function decodeJwt(token: string | null) {
  if (!token) return null
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(
      atob(payload)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(json)
  } catch (e) {
    return null
  }
}

function getUserFromToken(rawToken: string | null) {
  if (!rawToken) return { id: null as number | null, username: null as string | null }
  const token = String(rawToken).replace(/^"|"$/g, '').trim()
  const payload: any | null = decodeJwt(token)
  if (!payload) return { id: null, username: null }
  const id = payload?.sub ?? payload?.userId ?? payload?.id ?? payload?.user_id ?? null
  const username = payload?.user ?? payload?.username ?? null
  return { id: id != null ? Number(id) : null, username: username ?? null }
}

export { decodeJwt, getUserFromToken }