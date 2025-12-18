import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { SystemInfoService } from '@/services/systemInfo'

export default function SystemInfoPage() {
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await SystemInfoService.getInfo()
        setInfo(data)
      } catch (err) {
        setError(err?.data || String(err))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Sistema</CardTitle>
        <CardDescription>Dados gerais e status do backend</CardDescription>
      </CardHeader>
      <CardContent>
        {loading && <div>Carregando...</div>}
        {error && <div>Erro: {String(error)}</div>}
        {!loading && !error && (
          <pre style={{ whiteSpace: 'pre-wrap', background: 'var(--color-bg)', padding: 12, borderRadius: 8 }}>
            {JSON.stringify(info, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  )
}