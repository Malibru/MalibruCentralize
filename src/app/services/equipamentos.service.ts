import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../config';

@Injectable({ providedIn: 'root' })
export class EquipamentosService {
  constructor(private http: HttpClient) {}

  listar() { return this.http.get(endpoints.equipamentos.listar()); }
  listarPaginado(page = 0, size = 10, sort = 'nome', dir = 'asc') {
    return this.http.get(endpoints.equipamentos.listarPaginado(page, size, sort, dir));
  }
  listarPorNome(nome: string) { return this.http.get(endpoints.equipamentos.listarPorNome(nome)); }
  listarPorNumeroSerie(numeroSerie: string) { return this.http.get(endpoints.equipamentos.listarPorNumeroSerie(numeroSerie)); }
  listarPorQuantidade(quantidade: number) { return this.http.get(endpoints.equipamentos.listarPorQuantidade(quantidade)); }
  listarPorNomeParcial(nome: string) { return this.http.get(endpoints.equipamentos.listarPorNomeParcial(nome)); }
  listarPorNomeParcialPaginado(nome: string, page = 0, size = 10, sort = 'nome', dir = 'asc') {
    return this.http.get(endpoints.equipamentos.listarPorNomeParcialPaginado(nome, page, size, sort, dir));
  }
  listarPorNumeroSerieParcial(numeroSerie: string) { return this.http.get(endpoints.equipamentos.listarPorNumeroSerieParcial(numeroSerie)); }
  listarPorNumeroSerieParcialPaginado(numeroSerie: string, page = 0, size = 10, sort = 'numeroSerie', dir = 'asc') {
    return this.http.get(endpoints.equipamentos.listarPorNumeroSerieParcialPaginado(numeroSerie, page, size, sort, dir));
  }
  listarPorDescricaoParcial(descricao: string) { return this.http.get(endpoints.equipamentos.listarPorDescricaoParcial(descricao)); }
  listarPorDescricaoParcialPaginado(descricao: string, page = 0, size = 10, sort = 'descricao', dir = 'asc') {
    return this.http.get(endpoints.equipamentos.listarPorDescricaoParcialPaginado(descricao, page, size, sort, dir));
  }
  listarPorDisponivel(disponivel: boolean) { return this.http.get(endpoints.equipamentos.listarPorDisponivel(disponivel)); }
  cadastrar(body: any) { return this.http.post(endpoints.equipamentos.cadastrar(), body); }
  atualizar(nome: string, body: any) { return this.http.patch(endpoints.equipamentos.atualizar(nome), body); }
  deletar(nome: string) { return this.http.delete(endpoints.equipamentos.deletar(nome)); }
}