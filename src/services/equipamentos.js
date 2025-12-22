import { api } from '@/lib/apiClient'

const base = '/equipamentos'

export const EquipamentosService = {
  list: () => api.get(base),
  get: (id) => api.get(`${base}/${id}`),
  create: (payload) => api.post(base, payload),
  update: (id, payload) => api.put(`${base}/${id}`, payload),
  remove: (id) => api.del(`${base}/${id}`),

  listarEquipamentos: () => api.get('/Listar/ListarEquipamentos'),
  listarEquipamentosPaginado: ({ page = 0, size = 10, sort, dir = 'asc' } = {}) => {
    const params = new URLSearchParams({ page, size, dir })
    if (sort) params.set('sort', sort)
    return api.get(`/Listar/ListarEquipamentosPaginado?${params.toString()}`)
  },
  buscarPorNome: (nome) => api.get(`/Listar/ListarEquipamentoPorNome/${encodeURIComponent(nome)}`),
  buscarPorNumeroSerie: (numeroSerie) => api.get(`/Listar/ListarEquipamentoPorNumeroSerie/${encodeURIComponent(numeroSerie)}`),
  buscarPorQuantidade: (quantidade) => api.get(`/Listar/ListarEquipamentoPorQuantidade/${encodeURIComponent(String(quantidade))}`),
  buscarPorNomeParcial: (nome) => api.get(`/Listar/ListarEquipamentoPorNomeParcial/${encodeURIComponent(nome)}`),
  buscarPorNomeParcialPaginado: (nome, { page = 0, size = 10, sort, dir = 'asc' } = {}) => {
    const params = new URLSearchParams({ page, size, dir })
    if (sort) params.set('sort', sort)
    return api.get(`/Listar/ListarEquipamentoPorNomeParcialPaginado/${encodeURIComponent(nome)}?${params.toString()}`)
  },
  buscarPorNumeroSerieParcial: (numeroSerie) => api.get(`/Listar/ListarEquipamentoPorNumeroSerieParcial/${encodeURIComponent(numeroSerie)}`),

  buscarPorDisponivel: (disponivel) => api.get(`/Listar/ListarEquipamentoPorDisponivel/${String(disponivel)}`),
  cadastrarEquipamento: (payload) => api.post('/Cadastrar/CadastrarEquipamento', payload),
  atualizarEquipamento: (nome, payload) => api.patch(`/Atualizar/AtualizarEquipamento/${encodeURIComponent(nome)}`, payload),
  deletarEquipamento: (nome) => api.del(`/Deletar/DeletarEquipamento/${encodeURIComponent(nome)}`),
}