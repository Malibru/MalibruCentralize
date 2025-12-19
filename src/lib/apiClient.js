const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

async function request(path, { method = 'GET', headers = {}, body } = {}) {
  const url = `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`
  const token = (() => {
    try { return localStorage.getItem('auth_token') } catch { return null }
  })()

  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  }

  if (token) {
    opts.headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(url, opts)
  const contentType = res.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const data = isJson ? await res.json() : await res.text()

  if (!res.ok) {
    const error = new Error(`API error ${res.status}`)
    error.status = res.status
    error.data = data
    throw error
  }
  return data
}

export const api = {
  get: (path) => request(path, { method: 'GET' }),
  post: (path, body) => request(path, { method: 'POST', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  patch: (path, body) => request(path, { method: 'PATCH', body }),
  del: (path) => request(path, { method: 'DELETE' }),
}

export { BASE_URL }