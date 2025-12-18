import { api } from '@/lib/apiClient'

const base = '/licencas-office'

export const LicencasOfficeService = {
  list: () => api.get(base),
  get: (id) => api.get(`${base}/${id}`),
  create: (payload) => api.post(base, payload),
  update: (id, payload) => api.put(`${base}/${id}`, payload),
  remove: (id) => api.del(`${base}/${id}`),
}