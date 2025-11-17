import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FichasService } from '../../app/services/fichas.service';

@Component({
  selector: 'app-licencas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './licencas.component.html',
  styleUrls: ['./licencas.component.css']
})
export class LicencasComponent {
  lista: any[] = [];
  filtros = { nome: '', email: '', dataIni: '', dataFim: '', dataMin: '' } as any;
  nova = { nome: '', email: '', produto: '', dataVencimento: '' } as any;
  loading = false; errorMsg = '';

  constructor(private svc: FichasService) { this.carregar(); }

  carregar() {
    this.loading = true;
    this.svc.listar().subscribe({
      next: (res: any) => { this.lista = res?.content || res || []; },
      error: (err) => { this.errorMsg = err?.error?.message || 'Erro ao listar fichas'; },
      complete: () => (this.loading = false)
    });
  }

  filtrar() {
    this.loading = true;
    this.svc.listarFiltradas(
      this.filtros.nome || '', this.filtros.email || '', this.filtros.dataIni || '', this.filtros.dataFim || '', this.filtros.dataMin || '', 0, 50
    ).subscribe({
      next: (res: any) => { this.lista = res?.content || res || []; },
      error: (err) => { this.errorMsg = err?.error?.message || 'Erro ao filtrar fichas'; },
      complete: () => (this.loading = false)
    });
  }

  cadastrar() {
    this.svc.cadastrar(this.nova).subscribe({
      next: () => { this.carregar(); this.nova = { nome: '', email: '', produto: '', dataVencimento: '' }; },
      error: (err) => alert(err?.error?.message || 'Erro ao cadastrar')
    });
  }

  atualizar(item: any) {
    this.svc.atualizar(item.email, item).subscribe({
      next: () => this.carregar(),
      error: (err) => alert(err?.error?.message || 'Erro ao atualizar')
    });
  }

  deletar(item: any) {
    if (!confirm(`Excluir ficha ${item.email}?`)) return;
    this.svc.deletar(item.email).subscribe({
      next: () => this.carregar(),
      error: (err) => alert(err?.error?.message || 'Erro ao excluir')
    });
  }
}