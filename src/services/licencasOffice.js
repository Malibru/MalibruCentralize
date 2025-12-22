import { api } from '@/lib/apiClient'

export const LicencasOfficeService = {
  // Listagem unificada com filtros e paginação (Page<LicencaOfficeModel>)
  listarFiltradas: ({ nome, email, dataIni, dataFim, dataMin, page = 0, size = 10, sort, dir = 'asc' }) =>
    api.get(`/Listar/ListarFichasFiltradas?${new URLSearchParams({
      ...(nome ? { nome } : {}),
      ...(email ? { email } : {}),
      ...(dataIni ? { dataIni } : {}),
      ...(dataFim ? { dataFim } : {}),
      ...(dataMin ? { dataMin } : {}),
      page,
      size,
      ...(sort ? { sort } : {}),
      dir,
    }).toString()}`),

  // CRUD
  cadastrarFicha: (payload) => api.post('/Cadastrar/CadastrarFicha', payload),
  atualizarFicha: (email, payload) => api.patch(`/Atualizar/AtualizarUmaFicha/${encodeURIComponent(email)}`, payload),
  deletarFicha: (email) => api.del(`/Deletar/DeletarFicha/${encodeURIComponent(email)}`),

  // Rotas anteriores específicas (mantidas para compatibilidade, se necessário)
  listarPorNomePaginado: ({ nome = '', page = 0, size = 10, sort, dir = 'asc' }) =>
    api.get(`/Listar/ListarFichasPorNomePaginado?${new URLSearchParams({ nome, page, size, sort: sort || '', dir }).toString()}`),

  listarPorEmailPaginado: ({ email = '', page = 0, size = 10, sort, dir = 'asc' }) =>
    api.get(`/Listar/ListarFichasPorEmailPaginado?${new URLSearchParams({ email, page, size, sort: sort || '', dir }).toString()}`),

  listarPaginado: ({ page = 0, size = 10, sort, dir = 'asc' }) =>
    api.get(`/Listar/ListarFichasPaginado?${new URLSearchParams({ page, size, sort: sort || '', dir }).toString()}`),

  listarUmaFicha: (email) => api.get(`/Listar/ListarUmaFicha/${encodeURIComponent(email)}`),

  listarApartirData: (data) => api.get(`/Listar/ListarFichasApartirData/${encodeURIComponent(data)}`),

  listarApartirDataPaginado: ({ data, page = 0, size = 10, sort, dir = 'asc' }) =>
    api.get(`/Listar/ListarFichasApartirDataPaginado/${encodeURIComponent(data)}?${new URLSearchParams({ page, size, sort: sort || '', dir }).toString()}`),

  listarPorVencimento: ({ dataIni, dataFim }) =>
    api.get(`/Listar/ListarFichasPorDataVencimento/${encodeURIComponent(dataIni)}/${encodeURIComponent(dataFim)}`),

  listarPorVencimentoPaginado: ({ dataIni, dataFim, page = 0, size = 10, sort, dir = 'asc' }) =>
    api.get(`/Listar/ListarFichasPorDataVencimentoPaginado/${encodeURIComponent(dataIni)}/${encodeURIComponent(dataFim)}?${new URLSearchParams({ page, size, sort: sort || '', dir }).toString()}`),
}