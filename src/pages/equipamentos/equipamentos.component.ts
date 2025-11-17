import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipamentosService } from '../../app/services/equipamentos.service';

@Component({
  selector: 'app-equipamentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './equipamentos.component.html',
  styleUrls: ['./equipamentos.component.css']
})
export class EquipamentosComponent {
  lista: any[] = [];
  filtros = { nome: '', numeroSerie: '', descricao: '', disponivel: '' } as any;
  novo = { nome: '', numeroSerie: '', descricao: '', quantidade: 1, disponivel: true } as any;
  loading = false; errorMsg = '';

  constructor(private svc: EquipamentosService) { this.carregar(); }

  carregar() {
    this.loading = true;
    this.svc.listar().subscribe({
      next: (res: any) => { this.lista = res?.content || res || []; },
      error: (err) => { this.errorMsg = err?.error?.message || 'Erro ao listar equipamentos'; },
      complete: () => (this.loading = false)
    });
  }

  filtrar() {
    this.loading = true;
    // Exemplo simples: filtra por nome parcial quando fornecido
    if (this.filtros.nome) {
      this.svc.listarPorNomeParcial(this.filtros.nome).subscribe({
        next: (res: any) => { this.lista = res?.content || res || []; },
        error: (err) => { this.errorMsg = err?.error?.message || 'Erro ao filtrar por nome'; },
        complete: () => (this.loading = false)
      });
      return;
    }
    this.carregar();
  }

  cadastrar() {
    this.svc.cadastrar(this.novo).subscribe({
      next: () => { this.carregar(); this.novo = { nome: '', numeroSerie: '', descricao: '', quantidade: 1, disponivel: true }; },
      error: (err) => alert(err?.error?.message || 'Erro ao cadastrar')
    });
  }

  atualizar(item: any) {
    this.svc.atualizar(item.nome, item).subscribe({
      next: () => this.carregar(),
      error: (err) => alert(err?.error?.message || 'Erro ao atualizar')
    });
  }

  deletar(item: any) {
    if (!confirm(`Excluir equipamento ${item.nome}?`)) return;
    this.svc.deletar(item.nome).subscribe({
      next: () => this.carregar(),
      error: (err) => alert(err?.error?.message || 'Erro ao excluir')
    });
  }
}