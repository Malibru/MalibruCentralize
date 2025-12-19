export const AUTH_TOKEN_KEY = 'auth_token'

export function getToken() {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY) || null
  } catch {
    return null
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(AUTH_TOKEN_KEY, token)
    else localStorage.removeItem(AUTH_TOKEN_KEY)
    window.dispatchEvent(new Event('auth-token-changed'))
  } catch {}
}

export function clearToken() {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    window.dispatchEvent(new Event('auth-token-changed'))
  } catch {}
}

export function isAuthenticated() {
  return !!getToken()
}

export function useAuthStatus() {
  const [authed, setAuthed] = React.useState(isAuthenticated())
  React.useEffect(() => {
    const update = () => setAuthed(isAuthenticated())
    window.addEventListener('storage', update)
    window.addEventListener('auth-token-changed', update)
    return () => {
      window.removeEventListener('storage', update)
      window.removeEventListener('auth-token-changed', update)
    }
  }, [])
  return authed
}