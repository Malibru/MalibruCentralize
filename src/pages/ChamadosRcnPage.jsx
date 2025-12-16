"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const API_BASE = "http://localhost:8080"

export default function ChamadosRcnPage() {
  const [chamados, setChamados] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)

  const [novoChamado, setNovoChamado] = useState({
    ticket: "",
    responsavel: "",
    dataAbertura: "",
    dataFechamento: "",
    status: "ABERTO",
  })

  async function carregarChamados(p = 0) {
    setLoading(true)
    try {
      const resp = await fetch(`${API_BASE}/Listar/ListarChamadosRcnPaginado?page=${p}&size=10&sort=ticket&dir=asc`)
      if (!resp.ok) {
        alert("Erro ao listar chamados")
        return
      }
      const data = await resp.json()
      setChamados(data.content || [])
      setPage(data.number || 0)
      setTotalPages(data.totalPages || 1)
    } catch (error) {
      alert("Erro ao conectar com o servidor")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarChamados(0)
  }, [])


  async function handleCadastrar(e) {
    e.preventDefault()
    const body = {
      ticket: novoChamado.ticket,
      responsavel: novoChamado.responsavel,
      dataAbertura: novoChamado.dataAbertura || null,
      dataFechamento: novoChamado.dataFechamento || null,
      status: novoChamado.status,
    }

    try {
      const resp = await fetch(`${API_BASE}/Cadastrar/CadastrarChamado`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const text = await resp.text()
      if (!resp.ok) {
        alert("Erro ao cadastrar: " + text)
        return
      }
      alert(text)
      setNovoChamado({
        ticket: "",
        responsavel: "",
        dataAbertura: "",
        dataFechamento: "",
        status: "ABERTO",
      })
      carregarChamados(page)
    } catch (error) {
      alert("Erro ao conectar com o servidor")
    }
  }


  async function fecharChamado(ticket) {
    const body = {
      status: "FECHADO",
    }

    try {
      const resp = await fetch(`${API_BASE}/Atualizar/AtualizarUmChamado/${encodeURIComponent(ticket)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const text = await resp.text()
      if (!resp.ok) {
        alert("Erro ao atualizar: " + text)
        return
      }
      alert(text)
      carregarChamados(page)
    } catch (error) {
      alert("Erro ao conectar com o servidor")
    }
  }

  async function deletarChamado(ticket) {
    if (!window.confirm(`Deseja realmente deletar o chamado ${ticket}?`)) {
      return
    }
    try {
      const resp = await fetch(`${API_BASE}/Deletar/DeletarChamado/${encodeURIComponent(ticket)}`, {
        method: "DELETE",
      })
      const text = await resp.text()
      if (!resp.ok) {
        alert("Erro ao deletar: " + text)
        return
      }
      alert(text)
      carregarChamados(page)
    } catch (error) {
      alert("Erro ao conectar com o servidor")
    }
  }

  function getStatusBadge(status) {
    const variants = {
      ABERTO: "default",
      EM_ANDAMENTO: "secondary",
      FECHADO: "outline",
    }
    return <Badge variant={variants[status] || "default"}>{status}</Badge>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Chamados RCN</h1>
          <p className="text-muted-foreground">Gerencie os chamados da sua equipe de forma eficiente</p>
        </div>

        {/* Formulário de Novo Chamado */}
        <Card>
          <CardHeader>
            <CardTitle>Novo Chamado</CardTitle>
            <CardDescription>Preencha os dados para cadastrar um novo chamado</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCadastrar} className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ticket">Ticket *</Label>
                <Input
                  id="ticket"
                  placeholder="Ex: INC123456"
                  value={novoChamado.ticket}
                  onChange={(e) => setNovoChamado({ ...novoChamado, ticket: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsavel">Responsável *</Label>
                <Input
                  id="responsavel"
                  placeholder="Nome do responsável"
                  value={novoChamado.responsavel}
                  onChange={(e) => setNovoChamado({ ...novoChamado, responsavel: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataAbertura">Data Abertura</Label>
                <Input
                  id="dataAbertura"
                  type="date"
                  value={novoChamado.dataAbertura}
                  onChange={(e) => setNovoChamado({ ...novoChamado, dataAbertura: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataFechamento">Data Fechamento</Label>
                <Input
                  id="dataFechamento"
                  type="date"
                  value={novoChamado.dataFechamento}
                  onChange={(e) =>
                    setNovoChamado({
                      ...novoChamado,
                      dataFechamento: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={novoChamado.status}
                  onValueChange={(value) => setNovoChamado({ ...novoChamado, status: value })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ABERTO">ABERTO</SelectItem>
                    <SelectItem value="EM_ANDAMENTO">EM ANDAMENTO</SelectItem>
                    <SelectItem value="FECHADO">FECHADO</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button type="submit" className="w-full">
                  Cadastrar Chamado
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Lista de Chamados */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Lista de Chamados</CardTitle>
                <CardDescription>
                  Página {page + 1} de {totalPages}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => carregarChamados(page)} disabled={loading}>
                {loading ? "Carregando..." : "Atualizar"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data Abertura</TableHead>
                    <TableHead>Data Fechamento</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chamados.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        {loading ? "Carregando chamados..." : "Nenhum chamado encontrado."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    chamados.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{c.ticket}</TableCell>
                        <TableCell>{c.responsavel}</TableCell>
                        <TableCell>{getStatusBadge(c.status)}</TableCell>
                        <TableCell>
                          {c.dataAbertura ? new Date(c.dataAbertura).toLocaleDateString("pt-BR") : "-"}
                        </TableCell>
                        <TableCell>
                          {c.dataFechamento ? new Date(c.dataFechamento).toLocaleDateString("pt-BR") : "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => fecharChamado(c.ticket)}
                              disabled={c.status === "FECHADO"}
                            >
                              Fechar
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => deletarChamado(c.ticket)}>
                              Deletar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Paginação */}
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-muted-foreground">Total de {chamados.length} chamados nesta página</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 0 || loading}
                  onClick={() => carregarChamados(page - 1)}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page + 1 >= totalPages || loading}
                  onClick={() => carregarChamados(page + 1)}
                >
                  Próxima
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
