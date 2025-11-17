import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../config';

@Injectable({ providedIn: 'root' })
export class FichasService {
  constructor(private http: HttpClient) {}

  listar() { return this.http.get(endpoints.fichas.listar()); }
  listarPaginado(page = 0, size = 10, sort = 'nome', dir = 'asc') {
    return this.http.get(endpoints.fichas.listarPaginado(page, size, sort, dir));
  }
  listarUmaFicha(email: string) { return this.http.get(endpoints.fichas.listarUmaFicha(email)); }
  listarPorNome(nome: string) { return this.http.get(endpoints.fichas.listarPorNome(nome)); }
  listarPorNomePaginado(nome: string, page = 0, size = 10, sort = 'nome', dir = 'asc') {
    return this.http.get(endpoints.fichas.listarPorNomePaginado(nome, page, size, sort, dir));
  }
  listarPorEmail(email: string) { return this.http.get(endpoints.fichas.listarPorEmail(email)); }
  listarPorEmailPaginado(email: string, page = 0, size = 10, sort = 'email', dir = 'asc') {
    return this.http.get(endpoints.fichas.listarPorEmailPaginado(email, page, size, sort, dir));
  }
  listarApartirData(data: string) { return this.http.get(endpoints.fichas.listarApartirData(data)); }
  listarApartirDataPaginado(data: string, page = 0, size = 10, sort = 'dataVencimento', dir = 'asc') {
    return this.http.get(endpoints.fichas.listarApartirDataPaginado(data, page, size, sort, dir));
  }
  listarPorDataVencimento(dataIni: string, dataFim: string) { return this.http.get(endpoints.fichas.listarPorDataVencimento(dataIni, dataFim)); }
  listarPorDataVencimentoPaginado(dataIni: string, dataFim: string, page = 0, size = 10, sort = 'dataVencimento', dir = 'asc') {
    return this.http.get(endpoints.fichas.listarPorDataVencimentoPaginado(dataIni, dataFim, page, size, sort, dir));
  }
  listarFiltradas(nome: string, email: string, dataIni: string, dataFim: string, dataMin: string, page = 0, size = 10, sort = 'nome', dir = 'asc') {
    return this.http.get(endpoints.fichas.listarFiltradas(nome, email, dataIni, dataFim, dataMin, page, size, sort, dir));
  }
  cadastrar(body: any) { return this.http.post(endpoints.fichas.cadastrar(), body); }
  atualizar(email: string, body: any) { return this.http.patch(endpoints.fichas.atualizar(email), body); }
  deletar(email: string) { return this.http.delete(endpoints.fichas.deletar(email)); }
}