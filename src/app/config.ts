export const API_BASE_URL = 'http://localhost:8080';

export const endpoints = {
  usuarios: {
    listar: () => `${API_BASE_URL}/Listar/ListarUsuarios`,
    listarPaginado: (page = 0, size = 10, sort = 'nome', dir = 'asc') =>
      `${API_BASE_URL}/Listar/ListarUsuariosPaginado?page=${page}&size=${size}&sort=${sort}&dir=${dir}`,
    listarPorId: (id: number) => `${API_BASE_URL}/Listar/ListarUsuario/${id}`,
    listarPorNome: (nome: string) => `${API_BASE_URL}/Listar/ListarUsuariosPorNome?nome=${encodeURIComponent(nome)}`,
    listarPorNomePaginado: (nome: string, page = 0, size = 10, sort = 'nome', dir = 'asc') =>
      `${API_BASE_URL}/Listar/ListarUsuariosPorNomePaginado?nome=${encodeURIComponent(nome)}&page=${page}&size=${size}&sort=${sort}&dir=${dir}`,
    listarPorLogin: (login: string) => `${API_BASE_URL}/Listar/ListarUsuariosPorLogin?login=${encodeURIComponent(login)}`,
    listarPorLoginPaginado: (login: string, page = 0, size = 10, sort = 'login', dir = 'asc') =>
      `${API_BASE_URL}/Listar/ListarUsuariosPorLoginPaginado?login=${encodeURIComponent(login)}&page=${page}&size=${size}&sort=${sort}&dir=${dir}`,
    listarPorEmail: (email: string) => `${API_BASE_URL}/Listar/ListarUsuariosPorEmail?email=${encodeURIComponent(email)}`,
    listarPorEmailPaginado: (email: string, page = 0, size = 10, sort = 'email', dir = 'asc') =>
      `${API_BASE_URL}/Listar/ListarUsuariosPorEmailPaginado?email=${encodeURIComponent(email)}&page=${page}&size=${size}&sort=${sort}&dir=${dir}`,
    listarFiltrados: (nome: string, login: string, email: string, departamentoId: number) =>
      `${API_BASE_URL}/Listar/ListarUsuariosFiltrados?nome=${encodeURIComponent(nome)}&login=${encodeURIComponent(login)}&email=${encodeURIComponent(email)}&departamentoId=${departamentoId}`,
    listarFiltradosPaginado: (
      nome: string,
      login: string,
      email: string,
      departamentoId: number,
      page = 0,
      size = 10,
      sort = 'nome',
      dir = 'asc'
    ) =>
      `${API_BASE_URL}/Listar/ListarUsuariosFiltradosPaginado?nome=${encodeURIComponent(nome)}&login=${encodeURIComponent(login)}&email=${encodeURIComponent(email)}&departamentoId=${departamentoId}&page=${page}&size=${size}&sort=${sort}&dir=${dir}`,
    login: () => `${API_BASE_URL}/Usuarios/Login`,
    registrar: () => `${API_BASE_URL}/Usuarios/Registrar`,
    alterarSenha: () => `${API_BASE_URL}/Usuarios/AlterarSenha`,
    atualizarPut: (id: number) => `${API_BASE_URL}/Usuarios/${id}`,
    atualizarPatch: (id: number) => `${API_BASE_URL}/Usuarios/${id}`,
    deletarPorLogin: (login: string) => `${API_BASE_URL}/Deletar/DeletarUsuario/${encodeURIComponent(login)}`
  },
  certificados: {
    listar: () => `${API_BASE_URL}/Listar/ListarCertificados`,
    listarPaginado: (page = 0, size = 10, sort = 'nomeCertificado', dir = 'asc') =>
      `${API_BASE_URL}/Listar/ListarCertificadosPaginado?page=${page}&size=${size}&sort=${sort}&dir=${dir}`,
    listarPorData: (dataIni: string, dataFim: string) => `${API_BASE_URL}/Listar/ListarCertificadosPorData/${dataIni}/${dataFim}`,
    listarPorDataPaginado: (dataIni: string, dataFim: string, page = 0, size = 10, sort = 'dataVencimento', dir = 'asc') =>
      `${API_BASE_URL}/Listar/ListarCertificadosPorDataPaginado/${dataIni}/${dataFim}?page=${page}&size=${size}&sort=${sort}&dir=${dir}`,
    listarPorNome: (nome: string) => `${API_BASE_URL}/Listar/ListarCertificadosPorNome?nome=${encodeURIComponent(nome)}`,
    listarPorNomePaginado: (nome: string, page = 0, size = 10, sort = 'nomeCertificado', dir = 'asc') =>
      `${API_BASE_URL}/Listar/ListarCertificadosPorNomePaginado?nome=${encodeURIComponent(nome)}&page=${page}&size=${size}&sort=${sort}&dir=${dir}`,
    listarPorEmpresa: (empresa: string) => `${API_BASE_URL}/Listar/ListarCertificadosPorEmpresa?empresa=${encodeURIComponent(empresa)}`,
    listarPorEmpresaPaginado: (empresa: string, page = 0, size = 10, sort = 'nomeEmp', dir = 'asc') =>
      `${API_BASE_URL}/Listar/ListarCertificadosPorEmpresaPaginado?empresa=${encodeURIComponent(empresa)}&page=${page}&size=${size}&sort=${sort}&dir=${dir}`,
    listarFiltradosPaginado: (nome: string, empresa: string, dataIni: string, dataFim: string, page = 0, size = 10, sort = 'nomeCertificado', dir = 'asc') =>
      `${API_BASE_URL}/Listar/ListarCertificadosFiltradosPaginado?nome=${encodeURIComponent(nome)}&empresa=${encodeURIComponent(empresa)}&dataIni=${dataIni}&dataFim=${dataFim}&page=${page}&size=${size}&sort=${sort}&dir=${dir}`,
    cadastrar: () => `${API_BASE_URL}/Cadastrar/CadastrarCertificados`,
    atualizar: (nomeCertificado: string) => `${API_BASE_URL}/Atualizar/AtualizarCertificado/${encodeURIComponent(nomeCertificado)}`,
    deletar: (nomeCertificado: string) => `${API_BASE_URL}/Deletar/DeletarCertificado/${encodeURIComponent(nomeCertificado)}`
  },
  equipamentos: {
    listar: () => `${API_BASE_URL}/Listar/ListarEquipamentos`,
    listarPaginado: (page = 0, size = 10, sort = 'nome', dir = 'asc') =>
      `${API_BASE_URL}/Listar/ListarEquipamentosPaginado?page=${page}&size=${size}&sort=${sort}&dir=${dir}`,
    listarPorNome: (nome: string) => `${API_BASE_URL}/Listar/ListarEquipamentoPorNome/${encodeURIComponent(nome)}`,
    listarPorNumeroSerie: (numeroSerie: string) => `${API_BASE_URL}/Listar/ListarEquipamentoPorNumeroSerie/${encodeURIComponent(numeroSerie)}`,
    listarPorQuantidade: (quantidade: number) => `${API_BASE_URL}/Listar/ListarEquipamentoPorQuantidade/${quantidade}`,
    listarPorNomeParcial: (nome: string) => `${API_BASE_URL}/Listar/ListarEquipamentoPorNomeParcial/${encodeURIComponent(nome)}`,
    listarPorNomeParcialPaginado: (nome: string, page = 0, size = 10, sort = 'nome', dir = 'asc') =>
      `${API_BASE_URL}/Listar/ListarEquipamentoPorNomeParcialPaginado/${encodeURIComponent(nome)}?page=${page}&size=${size}&sort=${sort}&dir=${dir}`,
    listarPorNumeroSerieParcial: (numeroSerie: string) => `${API_BASE_URL}/Listar/ListarEquipamentoPorNumeroSerieParcial/${encodeURIComponent(numeroSerie)}`,
    listarPorNumeroSerieParcialPaginado: (numeroSerie: string, page = 0, size = 10, sort = 'numeroSerie', dir = 'asc') =>
      `${API_BASE_URL}/Listar/ListarEquipamentoPorNumeroSerieParcialPaginado/${encodeURIComponent(numeroSerie)}?page=${page}&size=${size}&sort=${sort}&dir=${dir}`,
    listarPorDescricaoParcial: (descricao: string) => `${API_BASE_URL}/Listar/ListarEquipamentoPorDescricaoParcial/${encodeURIComponent(descricao)}`,
    listarPorDescricaoParcialPaginado: (descricao: string, page = 0, size = 10, sort = 'descricao', dir = 'asc') =>
      `${API_BASE_URL}/Listar/ListarEquipamentoPorDescricaoParcialPaginado/${encodeURIComponent(descricao)}?page=${page}&size=${size}&sort=${sort}&dir=${dir}`,
    listarPorDisponivel: (disponivel: boolean) => `${API_BASE_URL}/Listar/ListarEquipamentoPorDisponivel/${disponivel}`,
    cadastrar: () => `${API_BASE_URL}/Cadastrar/CadastrarEquipamento`,
    atualizar: (nome: string) => `${API_BASE_URL}/Atualizar/AtualizarEquipamento/${encodeURIComponent(nome)}`,
    deletar: (nome: string) => `${API_BASE_URL}/Deletar/DeletarEquipamento/${encodeURIComponent(nome)}`
  },
  fichas: {
    listar: () => `${API_BASE_URL}/Listar/ListarFichas`,
    listarPaginado: (page = 0, size = 10, sort = 'nome', dir = 'asc') =>
      `${API_BASE_URL}/Listar/ListarFichasPaginado?page=${page}&size=${size}&sort=${sort}&dir=${dir}`,
    listarUmaFicha: (email: string) => `${API_BASE_URL}/Listar/ListarUmaFicha/${encodeURIComponent(email)}`,
    listarPorNome: (nome: string) => `${API_BASE_URL}/Listar/ListarFichasPorNome?nome=${encodeURIComponent(nome)}`,
    listarPorNomePaginado: (nome: string, page = 0, size = 10, sort = 'nome', dir = 'asc') =>
      `${API_BASE_URL}/Listar/ListarFichasPorNomePaginado?nome=${encodeURIComponent(nome)}&page=${page}&size=${size}&sort=${sort}&dir=${dir}`,
    listarPorEmail: (email: string) => `${API_BASE_URL}/Listar/ListarFichasPorEmail?email=${encodeURIComponent(email)}`,
    listarPorEmailPaginado: (email: string, page = 0, size = 10, sort = 'email', dir = 'asc') =>
      `${API_BASE_URL}/Listar/ListarFichasPorEmailPaginado?email=${encodeURIComponent(email)}&page=${page}&size=${size}&sort=${sort}&dir=${dir}`,
    listarApartirData: (data: string) => `${API_BASE_URL}/Listar/ListarFichasApartirData/${data}`,
    listarApartirDataPaginado: (data: string, page = 0, size = 10, sort = 'dataVencimento', dir = 'asc') =>
      `${API_BASE_URL}/Listar/ListarFichasApartirDataPaginado/${data}?page=${page}&size=${size}&sort=${sort}&dir=${dir}`,
    listarPorDataVencimento: (dataIni: string, dataFim: string) => `${API_BASE_URL}/Listar/ListarFichasPorDataVencimento/${dataIni}/${dataFim}`,
    listarPorDataVencimentoPaginado: (dataIni: string, dataFim: string, page = 0, size = 10, sort = 'dataVencimento', dir = 'asc') =>
      `${API_BASE_URL}/Listar/ListarFichasPorDataVencimentoPaginado/${dataIni}/${dataFim}?page=${page}&size=${size}&sort=${sort}&dir=${dir}`,
    listarFiltradas: (nome: string, email: string, dataIni: string, dataFim: string, dataMin: string, page = 0, size = 10, sort = 'nome', dir = 'asc') =>
      `${API_BASE_URL}/Listar/ListarFichasFiltradas?nome=${encodeURIComponent(nome)}&email=${encodeURIComponent(email)}&dataIni=${dataIni}&dataFim=${dataFim}&dataMin=${dataMin}&page=${page}&size=${size}&sort=${sort}&dir=${dir}`,
    cadastrar: () => `${API_BASE_URL}/Cadastrar/CadastrarFicha`,
    atualizar: (email: string) => `${API_BASE_URL}/Atualizar/AtualizarUmaFicha/${encodeURIComponent(email)}`,
    deletar: (email: string) => `${API_BASE_URL}/Deletar/DeletarFicha/${encodeURIComponent(email)}`
  }
};