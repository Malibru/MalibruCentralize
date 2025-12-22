import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { LicencasOfficeService } from '@/services/licencasOffice'

export default function CertificadosPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filterType, setFilterType] = useState('todas')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [data, setData] = useState('')
  const [dataIni, setDataIni] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [sort, setSort] = useState('email')
  const [dir, setDir] = useState('asc')
  const [success, setSuccess] = useState('')

  // Forms CRUD
  const [newNome, setNewNome] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newDataVencimento, setNewDataVencimento] = useState('')
  const [newSenha, setNewSenha] = useState('')
  const [updEmail, setUpdEmail] = useState('')
  const [updNome, setUpdNome] = useState('')
  const [updDataVencimento, setUpdDataVencimento] = useState('')
  const [updSenha, setUpdSenha] = useState('')
  const [delEmail, setDelEmail] = useState('')

  async function carregar() {
    setLoading(true)
    setError(null)
    try {
      const params = {
        page,
        size,
        sort,
        dir,
        ...(filterType === 'nome' ? { nome } : {}),
        ...(filterType === 'email' ? { email } : {}),
        ...(filterType === 'data' ? { dataMin: data } : {}),
        ...(filterType === 'periodo' ? { dataIni, dataFim } : {}),
      }
      const dataRes = await LicencasOfficeService.listarFiltradas(params)
      const content = dataRes?.content ?? (Array.isArray(dataRes) ? dataRes : [])
      setItems(content)
    } catch (err) {
      setError(err?.data || String(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType, page, size, sort, dir])

  const filtered = items

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
    <div className="container">
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Licenças Office</CardTitle>
            <CardDescription>Listagem com filtros e paginação</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => { setPage(0); carregar() }} disabled={loading}>
            {loading ? 'Carregando...' : 'Atualizar'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr 1fr 1fr', marginBottom: 12 }}>
          <div>
            <label className="muted-text">Filtro</label>
            <Select value={filterType} onValueChange={(v) => { setFilterType(v); setPage(0) }}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="nome">Por Nome</SelectItem>
                <SelectItem value="email">Por Email</SelectItem>
                <SelectItem value="data">A partir de Data</SelectItem>
                <SelectItem value="periodo">Por Período de Vencimento</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {filterType === 'nome' && (
            <div>
              <label className="muted-text">Nome</label>
              <Input placeholder="Ex.: João" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
          )}
          {filterType === 'email' && (
            <div>
              <label className="muted-text">Email</label>
              <Input placeholder="Ex.: joao@empresa.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          )}
          {filterType === 'data' && (
            <div>
              <label className="muted-text">Data</label>
              <Input type="date" value={data} onChange={(e) => setData(e.target.value)} />
            </div>
          )}
          {filterType === 'periodo' && (
            <>
              <div>
                <label className="muted-text">Início</label>
                <Input type="date" value={dataIni} onChange={(e) => setDataIni(e.target.value)} />
              </div>
              <div>
                <label className="muted-text">Fim</label>
                <Input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
              </div>
            </>
          )}
        </div>

        {error && <div>Erro: {String(error)}</div>}
        {success && <div className="muted-text">{success}</div>}

        {/* CRUD minimalista */}
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div style={{ border: '1px solid var(--color-border)', borderRadius: 12, padding: 12 }}>
            <p className="muted-text" style={{ marginBottom: 8 }}>Cadastrar Ficha</p>
            <div className="flex flex-col gap-2">
              <Input placeholder="Nome" value={newNome} onChange={(e) => setNewNome(e.target.value)} />
              <Input placeholder="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
              <div>
                <label className="muted-text">Data de Vencimento</label>
                <Input type="date" value={newDataVencimento} onChange={(e) => setNewDataVencimento(e.target.value)} />
              </div>
              <Input type="password" placeholder="Senha (se aplicável)" value={newSenha} onChange={(e) => setNewSenha(e.target.value)} />
              <Button disabled={loading} onClick={async () => {
                setError(''); setSuccess('')
                try {
                  const payload = { nome: newNome, email: newEmail, dataVencimento: newDataVencimento, ...(newSenha ? { senha: newSenha } : {}) }
                  const resp = await LicencasOfficeService.cadastrarFicha(payload)
                  const msg = typeof resp === 'string' ? resp : (resp?.mensagem || 'Cadastrado com sucesso')
                  setSuccess(String(msg))
                  setNewNome(''); setNewEmail(''); setNewDataVencimento(''); setNewSenha('')
                  carregar()
                } catch (err) {
                  if (err?.status === 403) setError('Acesso negado (403). Verifique o login/permissões.')
                  else setError(err?.data || String(err))
                }
              }}>Cadastrar</Button>
            </div>
          </div>

          <div style={{ border: '1px solid var(--color-border)', borderRadius: 12, padding: 12 }}>
            <p className="muted-text" style={{ marginBottom: 8 }}>Atualizar Ficha</p>
            <div className="flex flex-col gap-2">
              <Input placeholder="Email (chave)" value={updEmail} onChange={(e) => setUpdEmail(e.target.value)} />
              <Input placeholder="Nome" value={updNome} onChange={(e) => setUpdNome(e.target.value)} />
              <div>
                <label className="muted-text">Data de Vencimento</label>
                <Input type="date" value={updDataVencimento} onChange={(e) => setUpdDataVencimento(e.target.value)} />
              </div>
              <Input type="password" placeholder="Senha (opcional)" value={updSenha} onChange={(e) => setUpdSenha(e.target.value)} />
              <Button disabled={loading || !updEmail} onClick={async () => {
                setError(''); setSuccess('')
                try {
                  const payload = { nome: updNome || undefined, dataVencimento: updDataVencimento || undefined, ...(updSenha ? { senha: updSenha } : {}) }
                  const resp = await LicencasOfficeService.atualizarFicha(updEmail, payload)
                  const msg = typeof resp === 'string' ? resp : (resp?.mensagem || `Ficha atualizada para ${updEmail}`)
                  setSuccess(String(msg))
                  setUpdEmail(''); setUpdNome(''); setUpdDataVencimento(''); setUpdSenha('')
                  carregar()
                } catch (err) {
                  if (err?.status === 403) setError('Acesso negado (403). Verifique o login/permissões.')
                  else setError(err?.data || String(err))
                }
              }}>Atualizar</Button>
            </div>
          </div>

          <div style={{ border: '1px solid var(--color-border)', borderRadius: 12, padding: 12 }}>
            <p className="muted-text" style={{ marginBottom: 8 }}>Excluir Ficha</p>
            <div className="flex flex-col gap-2">
              <Input placeholder="Email" value={delEmail} onChange={(e) => setDelEmail(e.target.value)} />
              <Button variant="destructive" disabled={loading || !delEmail} onClick={async () => {
                setError(''); setSuccess('')
                try {
                  const resp = await LicencasOfficeService.deletarFicha(delEmail)
                  const msg = typeof resp === 'string' ? resp : (resp?.mensagem || `Ficha excluída: ${delEmail}`)
                  setSuccess(String(msg))
                  setDelEmail('')
                  carregar()
                } catch (err) {
                  if (err?.status === 403) setError('Acesso negado (403). Verifique o login/permissões.')
                  else setError(err?.data || String(err))
                }
              }}>Excluir</Button>
            </div>
          </div>
        </div>
        {!error && (
          <div style={{ border: '1px solid var(--color-border)', borderRadius: 12, overflow: 'hidden' }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Data Vencimento</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{filtered.map((item) => {
                const nomeVal = item.nome ?? '-'
                const emailVal = item.email ?? '-'
                const vencVal = formatDate(item.dataVencimento)
                const tipoVal = item.tipo ?? item.licenca ?? '-'
                return (
                  <TableRow key={item.id || item.email || Math.random()}>
                    <TableCell>{String(nomeVal)}</TableCell>
                    <TableCell>{String(emailVal)}</TableCell>
                    <TableCell>{String(vencVal)}</TableCell>
                    <TableCell>{String(tipoVal)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="destructive" size="sm" disabled={!item.email} onClick={async () => {
                          setError(''); setSuccess('')
                          try {
                            const msg = await LicencasOfficeService.deletarFicha(item.email)
                            setSuccess(String(msg))
                            carregar()
                          } catch (err) {
                            setError(err?.data || String(err))
                          }
                        }}>Excluir</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}</TableBody>
            </Table>
          </div>
        )}

        <div className="flex items-center justify-between pt-4">
          <div className="muted-text">Página {page + 1}</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 0 || loading} onClick={() => setPage((p) => Math.max(0, p - 1))}>Anterior</Button>
            <Button variant="outline" size="sm" disabled={loading} onClick={() => setPage((p) => p + 1)}>Próxima</Button>
          </div>
          <div className="flex gap-2" style={{ alignItems: 'center' }}>
            <label className="muted-text">Itens por página</label>
            <Select value={String(size)} onValueChange={(v) => { setSize(Number(v)); setPage(0) }}>
              <SelectTrigger style={{ width: 100 }}><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
  function formatDate(val) {
    if (!val) return '-'
    // Aceitar strings LocalDate (YYYY-MM-DD) e Date-like
    try {
      if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
        const [y, m, d] = val.split('-').map(Number)
        const dt = new Date(y, m - 1, d)
        return dt.toLocaleDateString('pt-BR')
      }
      const dt = new Date(val)
      return isNaN(dt.getTime()) ? '-' : dt.toLocaleDateString('pt-BR')
    } catch {
      return '-'
    }
  }