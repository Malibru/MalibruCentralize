import React from 'react'

export const AUTH_TOKEN_KEY = 'auth_token'
export const AUTH_USER_KEY = 'auth_user'

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

export function setUser(user) {
  try {
    if (user) localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
    else localStorage.removeItem(AUTH_USER_KEY)
    window.dispatchEvent(new Event('auth-user-changed'))
  } catch {}
}

export function getUser() {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function clearUser() {
  try {
    localStorage.removeItem(AUTH_USER_KEY)
    window.dispatchEvent(new Event('auth-user-changed'))
  } catch {}
}

export function useAuthStatus() {
  const [authed, setAuthed] = React.useState(isAuthenticated())
  React.useEffect(() => {
    const update = () => setAuthed(isAuthenticated())
    window.addEventListener('storage', update)
    window.addEventListener('auth-token-changed', update)
    window.addEventListener('auth-user-changed', update)
    return () => {
      window.removeEventListener('storage', update)
      window.removeEventListener('auth-token-changed', update)
      window.removeEventListener('auth-user-changed', update)
    }
  }, [])
  return authed
}