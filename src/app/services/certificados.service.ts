import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../config';

@Injectable({ providedIn: 'root' })
export class CertificadosService {
  constructor(private http: HttpClient) {}

  listar() { return this.http.get(endpoints.certificados.listar()); }
  listarPaginado(page = 0, size = 10, sort = 'nomeCertificado', dir = 'asc') {
    return this.http.get(endpoints.certificados.listarPaginado(page, size, sort, dir));
  }
  listarPorData(dataIni: string, dataFim: string) { return this.http.get(endpoints.certificados.listarPorData(dataIni, dataFim)); }
  listarPorDataPaginado(dataIni: string, dataFim: string, page = 0, size = 10, sort = 'dataVencimento', dir = 'asc') {
    return this.http.get(endpoints.certificados.listarPorDataPaginado(dataIni, dataFim, page, size, sort, dir));
  }
  listarPorNome(nome: string) { return this.http.get(endpoints.certificados.listarPorNome(nome)); }
  listarPorNomePaginado(nome: string, page = 0, size = 10, sort = 'nomeCertificado', dir = 'asc') {
    return this.http.get(endpoints.certificados.listarPorNomePaginado(nome, page, size, sort, dir));
  }
  listarPorEmpresa(empresa: string) { return this.http.get(endpoints.certificados.listarPorEmpresa(empresa)); }
  listarPorEmpresaPaginado(empresa: string, page = 0, size = 10, sort = 'nomeEmp', dir = 'asc') {
    return this.http.get(endpoints.certificados.listarPorEmpresaPaginado(empresa, page, size, sort, dir));
  }
  listarFiltradosPaginado(nome: string, empresa: string, dataIni: string, dataFim: string, page = 0, size = 10, sort = 'nomeCertificado', dir = 'asc') {
    return this.http.get(endpoints.certificados.listarFiltradosPaginado(nome, empresa, dataIni, dataFim, page, size, sort, dir));
  }
  cadastrar(body: any) { return this.http.post(endpoints.certificados.cadastrar(), body); }
  atualizar(nomeCertificado: string, body: any) { return this.http.patch(endpoints.certificados.atualizar(nomeCertificado), body); }
  deletar(nomeCertificado: string) { return this.http.delete(endpoints.certificados.deletar(nomeCertificado)); }
}