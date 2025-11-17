import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  usuarios: any[] = [];
  page = 0; size = 10; sort = 'nome'; dir: 'asc' | 'desc' = 'asc';

  filtros = { nome: '', login: '', email: '', departamentoId: '' } as any;
  loading = false; errorMsg = '';

  constructor(private usuariosService: UsuariosService) {
    this.carregar();
  }

  carregar() {
    this.loading = true;
    this.usuariosService.listarPaginado(this.page, this.size, this.sort, this.dir).subscribe({
      next: (res: any) => { this.usuarios = res?.content || res || []; },
      error: (err) => { this.errorMsg = err?.error?.message || 'Erro ao listar usuários'; },
      complete: () => (this.loading = false)
    });
  }

  aplicarFiltros() {
    const depId = Number(this.filtros.departamentoId) || 0;
    this.loading = true;
    this.usuariosService.listarFiltradosPaginado(
      this.filtros.nome || '', this.filtros.login || '', this.filtros.email || '', depId,
      this.page, this.size, this.sort, this.dir
    ).subscribe({
      next: (res: any) => { this.usuarios = res?.content || res || []; },
      error: (err) => { this.errorMsg = err?.error?.message || 'Erro ao filtrar usuários'; },
      complete: () => (this.loading = false)
    });
  }

  remover(login: string) {
    if (!confirm(`Remover usuário ${login}?`)) return;
    this.usuariosService.deletarPorLogin(login).subscribe({
      next: () => this.carregar(),
      error: (err) => alert(err?.error?.message || 'Erro ao remover usuário')
    });
  }
}