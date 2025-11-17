import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../config';

export interface LoginRequest { login: string; senha: string }
export interface RegistrarRequest { nome: string; login: string; email: string; senha: string }

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly isLoggedIn = signal<boolean>(false);
  readonly currentUser = signal<any | null>(null);

  constructor(private http: HttpClient) {}

  login(payload: LoginRequest) {
    return this.http.post(endpoints.usuarios.login(), payload);
  }

  registrar(payload: RegistrarRequest) {
    return this.http.post(endpoints.usuarios.registrar(), payload);
  }

  alterarSenha(payload: { login: string; senhaAtual: string; novaSenha: string }) {
    return this.http.post(endpoints.usuarios.alterarSenha(), payload);
  }

  setSession(user: any, token?: string) {
    this.currentUser.set(user);
    this.isLoggedIn.set(true);
    if (token) localStorage.setItem('auth_token', token);
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
  }
}