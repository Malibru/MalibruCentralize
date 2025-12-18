import { api } from '@/lib/apiClient'

const base = '/system-info'

export const SystemInfoService = {
  getInfo: () => api.get(base),
}