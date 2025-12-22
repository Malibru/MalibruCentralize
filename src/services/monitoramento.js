import { api } from '@/lib/apiClient'

const INTERNET_URL = import.meta.env.VITE_MONITOR_INTERNET_URL || 'https://www.gstatic.com/generate_204'
const BANCO_URL = import.meta.env.VITE_MONITOR_BANCO_URL || ''
const WHATSAPP_URL = import.meta.env.VITE_MONITOR_WHATSAPP_URL || ''

function nowIso() { return new Date().toISOString() }

async function checkExternal(url) {
  const started = performance.now()
  try {
    const resp = await fetch(url, { method: 'GET', mode: 'no-cors', cache: 'no-cache' })
    const latencyMs = Math.round(performance.now() - started)
    return { status: 'UP', latencyMs, message: 'Conectado', checkedAt: nowIso() }
  } catch (err) {
    const latencyMs = Math.round(performance.now() - started)
    return { status: 'DOWN', latencyMs, message: String(err?.message || err), checkedAt: nowIso() }
  }
}

async function checkBackendPath(path) {
  const started = performance.now()
  try {
    const data = await api.get(path)
    const latencyMs = Math.round(performance.now() - started)
    const ok = data?.status === 'UP' || data?.ok === true || !!data
    return { status: ok ? 'UP' : 'DOWN', latencyMs, message: ok ? 'OK' : 'Não OK', checkedAt: nowIso(), data }
  } catch (err) {
    const latencyMs = Math.round(performance.now() - started)
    const msg = err?.status ? `Erro ${err.status}: ${err?.data?.mensagem || err?.data || 'Falha'}` : String(err?.message || err)
    return { status: 'DOWN', latencyMs, message: msg, checkedAt: nowIso() }
  }
}

function normalize(url) {
  if (!url) return { type: 'missing' }
  if (url.startsWith('/')) return { type: 'backend', path: url }
  return { type: 'external', url }
}

export const MonitoramentoService = {
  async checkInternet() {
    const n = normalize(INTERNET_URL)
    const base = { name: 'Internet' }
    if (n.type === 'missing') return { ...base, status: 'UNKNOWN', message: 'Configure VITE_MONITOR_INTERNET_URL', checkedAt: nowIso() }
    const result = n.type === 'backend' ? await checkBackendPath(n.path) : await checkExternal(n.url)
    return { ...base, ...result }
  },
  async checkBanco() {
    const n = normalize(BANCO_URL)
    const base = { name: 'Banco' }
    if (n.type === 'missing') return { ...base, status: 'UNKNOWN', message: 'Configure VITE_MONITOR_BANCO_URL', checkedAt: nowIso() }
    const result = n.type === 'backend' ? await checkBackendPath(n.path) : await checkExternal(n.url)
    return { ...base, ...result }
  },
  async checkWhatsapp() {
    const n = normalize(WHATSAPP_URL)
    const base = { name: 'WhatsApp' }
    if (n.type === 'missing') return { ...base, status: 'UNKNOWN', message: 'Configure VITE_MONITOR_WHATSAPP_URL', checkedAt: nowIso() }
    const result = n.type === 'backend' ? await checkBackendPath(n.path) : await checkExternal(n.url)
    return { ...base, ...result }
  },
  async checkAll() {
    const [internet, banco, whatsapp] = await Promise.all([
      this.checkInternet(), this.checkBanco(), this.checkWhatsapp()
    ])
    return { internet, banco, whatsapp }
  }
}