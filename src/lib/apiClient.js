const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/'

async function request(path, { method = 'GET', headers = {}, body } = {}) {
  const url = `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
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
  del: (path) => request(path, { method: 'DELETE' }),
}

export { BASE_URL }