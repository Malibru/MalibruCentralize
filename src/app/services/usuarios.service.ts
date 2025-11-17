import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../config';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  constructor(private http: HttpClient) {}

  listar() { return this.http.get(endpoints.usuarios.listar()); }
  listarPaginado(page = 0, size = 10, sort = 'nome', dir = 'asc') {
    return this.http.get(endpoints.usuarios.listarPaginado(page, size, sort, dir));
  }
  listarPorId(id: number) { return this.http.get(endpoints.usuarios.listarPorId(id)); }
  listarPorNome(nome: string) { return this.http.get(endpoints.usuarios.listarPorNome(nome)); }
  listarPorNomePaginado(nome: string, page = 0, size = 10, sort = 'nome', dir = 'asc') {
    return this.http.get(endpoints.usuarios.listarPorNomePaginado(nome, page, size, sort, dir));
  }
  listarPorLogin(login: string) { return this.http.get(endpoints.usuarios.listarPorLogin(login)); }
  listarPorLoginPaginado(login: string, page = 0, size = 10, sort = 'login', dir = 'asc') {
    return this.http.get(endpoints.usuarios.listarPorLoginPaginado(login, page, size, sort, dir));
  }
  listarPorEmail(email: string) { return this.http.get(endpoints.usuarios.listarPorEmail(email)); }
  listarPorEmailPaginado(email: string, page = 0, size = 10, sort = 'email', dir = 'asc') {
    return this.http.get(endpoints.usuarios.listarPorEmailPaginado(email, page, size, sort, dir));
  }
  listarFiltrados(nome: string, login: string, email: string, departamentoId: number) {
    return this.http.get(endpoints.usuarios.listarFiltrados(nome, login, email, departamentoId));
  }
  listarFiltradosPaginado(nome: string, login: string, email: string, departamentoId: number, page = 0, size = 10, sort = 'nome', dir = 'asc') {
    return this.http.get(endpoints.usuarios.listarFiltradosPaginado(nome, login, email, departamentoId, page, size, sort, dir));
  }

  atualizarPut(id: number, body: any) { return this.http.put(endpoints.usuarios.atualizarPut(id), body); }
  atualizarPatch(id: number, body: any) { return this.http.patch(endpoints.usuarios.atualizarPatch(id), body); }
  deletarPorLogin(login: string) { return this.http.delete(endpoints.usuarios.deletarPorLogin(login)); }
}