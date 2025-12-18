import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { LicencasOfficeService } from '@/services/licencasOffice'

export default function LicencasOfficePage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await LicencasOfficeService.list()
        setItems(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err?.data || String(err))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = items.filter((it) => JSON.stringify(it).toLowerCase().includes(filter.toLowerCase()))

  const renderRow = (item) => {
    const entries = Object.entries(item).slice(0, 5)
    return (
      <TableRow key={item.id || Math.random()}>
        {entries.map(([k, v]) => (
          <TableCell key={k}>{String(v)}</TableCell>
        ))}
      </TableRow>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Licenças Office</CardTitle>
        <CardDescription>Licenças do Microsoft Office</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ marginBottom: 8 }}>
          <Input placeholder="Filtrar" value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
        {loading && <div>Carregando...</div>}
        {error && <div>Erro: {String(error)}</div>}
        {!loading && !error && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coluna 1</TableHead>
                <TableHead>Coluna 2</TableHead>
                <TableHead>Coluna 3</TableHead>
                <TableHead>Coluna 4</TableHead>
                <TableHead>Coluna 5</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{filtered.map(renderRow)}</TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}