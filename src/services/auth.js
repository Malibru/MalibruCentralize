import { api } from '@/lib/apiClient'

export const AuthService = {
  logout: () => api.post('/Usuarios/Logout'),
}