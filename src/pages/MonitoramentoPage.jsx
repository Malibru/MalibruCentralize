"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MonitoramentoService } from "@/services/monitoramento"

function StatusDot({ status }) {
  const color = status === 'UP' ? '#22c55e' : status === 'DOWN' ? '#ef4444' : '#f59e0b'
  return (
    <span style={{
      display: 'inline-block', width: 10, height: 10, borderRadius: 999,
      backgroundColor: color, marginRight: 8, border: '1px solid var(--color-border)'
    }} />
  )
}

function ServiceCard({ title, result, onRetry }) {
  return (
    <Card>
      <CardHeader>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StatusDot status={result?.status || 'UNKNOWN'} />
            <CardTitle style={{ margin: 0 }}>{title}</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={onRetry}>Testar novamente</Button>
        </div>
        <CardDescription>
          Status: {result?.status || 'UNKNOWN'} • Latência: {result?.latencyMs ?? '-'}ms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'grid', gap: 8 }}>
          <div style={{ fontSize: 14 }}>Mensagem: {result?.message || '-'}</div>
          <div style={{ fontSize: 12, color: '#888' }}>Checado: {result?.checkedAt ? new Date(result.checkedAt).toLocaleString('pt-BR') : '-'}</div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function MonitoramentoPage() {
  const [internet, setInternet] = useState(null)
  const [banco, setBanco] = useState(null)
  const [whatsapp, setWhatsapp] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [intervalSec, setIntervalSec] = useState(30)
  const timerRef = useRef(null)

  async function carregar() {
    setLoading(true)
    setError("")
    try {
      const r = await MonitoramentoService.checkAll()
      setInternet(r.internet)
      setBanco(r.banco)
      setWhatsapp(r.whatsapp)
    } catch (err) {
      setError(String(err?.message || err))
    } finally {
      setLoading(false)
    }
  }

  function startAutoRefresh() {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      carregar()
    }, intervalSec * 1000)
  }

  useEffect(() => {
    carregar()
  }, [])

  useEffect(() => {
    startAutoRefresh()
    return () => timerRef.current && clearInterval(timerRef.current)
  }, [intervalSec])

  const cards = useMemo(() => ([
    { title: 'Internet', result: internet, setter: setInternet, checker: MonitoramentoService.checkInternet },
    { title: 'Banco', result: banco, setter: setBanco, checker: MonitoramentoService.checkBanco },
    { title: 'WhatsApp', result: whatsapp, setter: setWhatsapp, checker: MonitoramentoService.checkWhatsapp },
  ]), [internet, banco, whatsapp])

  return (
    <div className="container" style={{ display: 'grid', gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Monitoramento</h1>
        <p className="muted-text">Acompanhe o status dos serviços usados na empresa</p>
      </div>

      <Card>
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <CardTitle>Atualização automática</CardTitle>
              <CardDescription>Defina o intervalo de checagem</CardDescription>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Select value={String(intervalSec)} onValueChange={(v) => setIntervalSec(Number(v))}>
                <SelectTrigger style={{ width: 160 }}>
                  <SelectValue placeholder="Intervalo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 segundos</SelectItem>
                  <SelectItem value="30">30 segundos</SelectItem>
                  <SelectItem value="60">1 minuto</SelectItem>
                  <SelectItem value="120">2 minutos</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={carregar} disabled={loading}>{loading ? 'Checando...' : 'Atualizar agora'}</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {cards.map((c) => (
              <ServiceCard
                key={c.title}
                title={c.title}
                result={c.result}
                onRetry={async () => {
                  const r = await c.checker()
                  c.setter(r)
                }}
              />
            ))}
          </div>
          {error && <div style={{ color: '#ef4444', marginTop: 12 }}>Erro: {error}</div>}
          <div style={{ marginTop: 12, fontSize: 12, color: '#666' }}>
            Dica: configure URLs de health no arquivo .env como <code>VITE_MONITOR_INTERNET_URL</code>, <code>VITE_MONITOR_BANCO_URL</code> e <code>VITE_MONITOR_WHATSAPP_URL</code>. Use caminhos do backend (ex.: <code>/health/internet</code>) para evitar CORS.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}