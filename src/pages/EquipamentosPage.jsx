import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EquipamentosService } from '@/services/equipamentos'

export default function EquipamentosPage() {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filterType, setFilterType] = useState('todos')
  const [nome, setNome] = useState('')
  const [numeroSerie, setNumeroSerie] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [sort, setSort] = useState('')
  const [dir, setDir] = useState('asc')
  const [disponivel, setDisponivel] = useState('')

  // Forms CRUD
  const [successMsg, setSuccessMsg] = useState('')
  const [crNome, setCrNome] = useState('')
  const [crDescricao, setCrDescricao] = useState('')
  const [crQuantidade, setCrQuantidade] = useState('')
  const [crNumeroSerie, setCrNumeroSerie] = useState('')
  const [crDisp, setCrDisp] = useState('true')
  const [upNome, setUpNome] = useState('')
  const [upDescricao, setUpDescricao] = useState('')
  const [upQuantidade, setUpQuantidade] = useState('')
  const [upNumeroSerie, setUpNumeroSerie] = useState('')
  const [upDisp, setUpDisp] = useState('')
  const [delNome, setDelNome] = useState('')

  async function carregar(p = page) {
    setLoading(true)
    setError(null)
    try {
      let resp
      if (filterType === 'todos') {
        resp = await EquipamentosService.listarEquipamentos()
        const arr = Array.isArray(resp) ? resp : (resp?.content || [])
        setItems(arr)
        setTotalPages(resp?.totalPages || 1)
      } else if (filterType === 'paginado') {
        resp = await EquipamentosService.listarEquipamentosPaginado({ page: p, size, sort, dir })
        setItems(resp?.content || [])
        setTotalPages(resp?.totalPages || 0)
        setPage(resp?.number ?? p)
      } else if (filterType === 'nomeExato') {
        const d = await EquipamentosService.buscarPorNome(nome)
        setItems(d ? [d] : [])
        setTotalPages(1)
      } else if (filterType === 'numeroSerieExato') {
        const d = await EquipamentosService.buscarPorNumeroSerie(numeroSerie)
        setItems(d ? [d] : [])
        setTotalPages(1)
      } else if (filterType === 'quantidade') {
        const d = await EquipamentosService.buscarPorQuantidade(quantidade)
        setItems(Array.isArray(d) ? d : [])
        setTotalPages(1)
      } else if (filterType === 'nomeParcial') {
        const d = await EquipamentosService.buscarPorNomeParcial(nome)
        setItems(Array.isArray(d) ? d : [])
        setTotalPages(1)
      } else if (filterType === 'nomeParcialPaginado') {
        const d = await EquipamentosService.buscarPorNomeParcialPaginado(nome, { page: p, size, sort, dir })
        setItems(d?.content || [])
        setTotalPages(d?.totalPages || 0)
        setPage(d?.number ?? p)
      } else if (filterType === 'numeroSerieParcial') {
        const d = await EquipamentosService.buscarPorNumeroSerieParcial(numeroSerie)
        setItems(Array.isArray(d) ? d : [])
        setTotalPages(1)
      } else if (filterType === 'disponivel') {
        const d = await EquipamentosService.buscarPorDisponivel(disponivel === 'true')
        setItems(Array.isArray(d) ? d : [])
        setTotalPages(1)
      }
    } catch (err) {
      setError(err?.data || String(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregar(0)
  }, [])

  const renderRow = (item) => {
    const nome = item?.nome ?? item?.Nome ?? item?.name ?? '-'
    const descricao = item?.descricao ?? item?.Descricao ?? item?.description ?? '-'
    const qtdRaw = item?.quantidade ?? item?.Quantidade ?? item?.qtd
    const qtd = qtdRaw ?? '-'
    const numeroSerie = item?.numeroSerie ?? item?.NumeroSerie ?? item?.serial ?? '-'
    const dispRaw = item?.disponibilidade ?? item?.Disponibilidade ?? item?.disponivel ?? item?.status
    const dispStr = typeof dispRaw === 'boolean'
      ? (dispRaw ? 'Disponível' : 'Indisponível')
      : (String(dispRaw || '').toLowerCase() === 'true' ? 'Disponível'
        : String(dispRaw || '').toLowerCase() === 'false' ? 'Indisponível'
        : (String(dispRaw || '-') === '' ? '-' : String(dispRaw || '-')))

    return (
      <TableRow key={item?.id || `${nome}-${numeroSerie}` || Math.random()}>
        <TableCell>{String(nome)}</TableCell>
        <TableCell>{String(descricao)}</TableCell>
        <TableCell>{String(qtd)}</TableCell>
        <TableCell>{String(numeroSerie)}</TableCell>
        <TableCell>{dispStr}</TableCell>
      </TableRow>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipamentos</CardTitle>
        <CardDescription>Consuma as rotas de listagem, filtros e paginação</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'grid', gap: 12, marginBottom: 12 }}>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <div>
              <label style={{ fontSize: 12, color: '#666' }}>Tipo de filtro</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Listar todos</SelectItem>
                  <SelectItem value="paginado">Listar paginado</SelectItem>
                  <SelectItem value="nomeExato">Por nome (exato)</SelectItem>
                  <SelectItem value="numeroSerieExato">Por número de série (exato)</SelectItem>
                  <SelectItem value="quantidade">Por quantidade</SelectItem>
                  <SelectItem value="nomeParcial">Por nome parcial</SelectItem>
                  <SelectItem value="nomeParcialPaginado">Por nome parcial (paginado)</SelectItem>
                  <SelectItem value="numeroSerieParcial">Por número de série parcial</SelectItem>
                  <SelectItem value="disponivel">Por disponibilidade</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(filterType === 'nomeExato' || filterType === 'nomeParcial' || filterType === 'nomeParcialPaginado') && (
              <div>
                <label style={{ fontSize: 12, color: '#666' }}>Nome</label>
                <Input placeholder="Ex.: Notebook Dell" value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>
            )}

            {(filterType === 'numeroSerieExato' || filterType === 'numeroSerieParcial') && (
              <div>
                <label style={{ fontSize: 12, color: '#666' }}>Número de série</label>
                <Input placeholder="Ex.: SN123456" value={numeroSerie} onChange={(e) => setNumeroSerie(e.target.value)} />
              </div>
            )}

            {filterType === 'quantidade' && (
              <div>
                <label style={{ fontSize: 12, color: '#666' }}>Quantidade</label>
                <Input type="number" placeholder="Ex.: 5" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
              </div>
            )}

            {filterType === 'disponivel' && (
              <div>
                <label style={{ fontSize: 12, color: '#666' }}>Disponibilidade</label>
                <Select value={disponivel} onValueChange={setDisponivel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Disponível</SelectItem>
                    <SelectItem value="false">Indisponível</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {(filterType === 'paginado' || filterType === 'nomeParcialPaginado') && (
              <>
                <div>
                  <label style={{ fontSize: 12, color: '#666' }}>Página</label>
                  <Input type="number" min={0} value={page} onChange={(e) => setPage(Number(e.target.value))} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: '#666' }}>Tamanho</label>
                  <Input type="number" min={1} value={size} onChange={(e) => setSize(Number(e.target.value))} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: '#666' }}>Ordenar por</label>
                  <Input placeholder="campo (opcional)" value={sort} onChange={(e) => setSort(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: '#666' }}>Direção</label>
                  <Select value={dir} onValueChange={setDir}>
                    <SelectTrigger>
                      <SelectValue placeholder="asc/desc" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">asc</SelectItem>
                      <SelectItem value="desc">desc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="outline" onClick={() => carregar(0)} disabled={loading}>{loading ? 'Buscando...' : 'Buscar'}</Button>
            <Button variant="outline" onClick={() => { setItems([]); setTotalPages(0); }}>
              Limpar
            </Button>
          </div>
        </div>
        {loading && <div>Carregando...</div>}
        {error && <div>Erro: {String(error)}</div>}
        {!loading && !error && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Qtd</TableHead>
                <TableHead>Número de Série</TableHead>
                <TableHead>Disponibilidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{items.map(renderRow)}</TableBody>
          </Table>
        )}
        {(filterType === 'paginado' || filterType === 'nomeParcialPaginado') && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
            <div style={{ fontSize: 12, color: '#666' }}>Página {page + 1} de {Math.max(totalPages, 1)}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="outline" size="sm" disabled={loading || page <= 0} onClick={() => carregar(page - 1)}>Anterior</Button>
              <Button variant="outline" size="sm" disabled={loading || page + 1 >= totalPages} onClick={() => carregar(page + 1)}>Próxima</Button>
            </div>
          </div>
        )}

        {/* CRUD rápido */}
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 12, padding: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Cadastrar</div>
              <div style={{ display: 'grid', gap: 8 }}>
                <Input placeholder="Nome" value={crNome} onChange={(e) => setCrNome(e.target.value)} />
                <Input placeholder="Descrição" value={crDescricao} onChange={(e) => setCrDescricao(e.target.value)} />
                <Input placeholder="Quantidade" type="number" value={crQuantidade} onChange={(e) => setCrQuantidade(e.target.value)} />
                <Input placeholder="Número de Série" value={crNumeroSerie} onChange={(e) => setCrNumeroSerie(e.target.value)} />
                <Select value={crDisp} onValueChange={setCrDisp}>
                  <SelectTrigger>
                    <SelectValue placeholder="Disponível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Sim</SelectItem>
                    <SelectItem value="false">Não</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={async () => {
                    setSuccessMsg('')
                    if (!crNome) { setSuccessMsg('Informe o nome para cadastrar.'); return }
                    try {
                      const payload = {
                        nome: crNome,
                        descricao: crDescricao || undefined,
                        quantidade: crQuantidade !== '' ? Number(crQuantidade) : undefined,
                        numeroSerie: crNumeroSerie || undefined,
                        disponivel: crDisp === 'true',
                      }
                      const res = await EquipamentosService.cadastrarEquipamento(payload)
                      setSuccessMsg(typeof res === 'string' ? res : 'Cadastrado com sucesso.')
                      carregar(0)
                    } catch (e) {
                      setSuccessMsg(e?.status === 403 ? 'Acesso negado.' : e?.message || 'Erro ao cadastrar.')
                    }
                  }}
                >Cadastrar</Button>
              </div>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: 12, padding: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Atualizar</div>
              <div style={{ display: 'grid', gap: 8 }}>
                <Input placeholder="Nome (chave)" value={upNome} onChange={(e) => setUpNome(e.target.value)} />
                <Input placeholder="Descrição" value={upDescricao} onChange={(e) => setUpDescricao(e.target.value)} />
                <Input placeholder="Quantidade" type="number" value={upQuantidade} onChange={(e) => setUpQuantidade(e.target.value)} />
                <Input placeholder="Número de Série" value={upNumeroSerie} onChange={(e) => setUpNumeroSerie(e.target.value)} />
                <Select value={upDisp} onValueChange={setUpDisp}>
                  <SelectTrigger>
                    <SelectValue placeholder="(sem alteração)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">(sem alteração)</SelectItem>
                    <SelectItem value="true">Sim</SelectItem>
                    <SelectItem value="false">Não</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={async () => {
                    setSuccessMsg('')
                    if (!upNome) { setSuccessMsg('Informe o nome para atualizar.'); return }
                    try {
                      const payload = {}
                      if (upDescricao) payload.descricao = upDescricao
                      if (upQuantidade !== '') payload.quantidade = Number(upQuantidade)
                      if (upNumeroSerie) payload.numeroSerie = upNumeroSerie
                      if (upDisp !== '') payload.disponivel = (upDisp === 'true')
                      const res = await EquipamentosService.atualizarEquipamento(upNome, payload)
                      setSuccessMsg(typeof res === 'string' ? res : 'Atualizado com sucesso.')
                      carregar(0)
                    } catch (e) {
                      setSuccessMsg(e?.status === 404 ? 'Equipamento não encontrado.' : e?.status === 403 ? 'Acesso negado.' : e?.message || 'Erro ao atualizar.')
                    }
                  }}
                >Atualizar</Button>
              </div>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: 12, padding: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Deletar</div>
              <div style={{ display: 'grid', gap: 8 }}>
                <Input placeholder="Nome (chave)" value={delNome} onChange={(e) => setDelNome(e.target.value)} />
                <Button
                  variant="destructive"
                  onClick={async () => {
                    setSuccessMsg('')
                    if (!delNome) { setSuccessMsg('Informe o nome para deletar.'); return }
                    try {
                      const res = await EquipamentosService.deletarEquipamento(delNome)
                      setSuccessMsg(typeof res === 'string' ? res : 'Deletado com sucesso.')
                      carregar(0)
                    } catch (e) {
                      setSuccessMsg(e?.status === 404 ? 'Equipamento não encontrado.' : e?.status === 403 ? 'Acesso negado.' : e?.message || 'Erro ao deletar.')
                    }
                  }}
                >Deletar</Button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 8, minHeight: 20, fontSize: 12, color: '#555' }}>{successMsg}</div>
        </div>

      </CardContent>
    </Card>
  )
}