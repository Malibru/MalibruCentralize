import { api } from '@/lib/apiClient'

const base = '/certificados'

export const CertificadosService = {
  list: () => api.get(base),
  get: (id) => api.get(`${base}/${id}`),
  create: (payload) => api.post(base, payload),
  update: (id, payload) => api.put(`${base}/${id}`, payload),
  remove: (id) => api.del(`${base}/${id}`),
}