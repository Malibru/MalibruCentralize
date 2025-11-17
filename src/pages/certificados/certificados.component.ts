import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CertificadosService } from '../../app/services/certificados.service';

@Component({
  selector: 'app-certificados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent {
  lista: any[] = [];
  filtros = { nome: '', empresa: '', dataIni: '', dataFim: '' };
  novo = { nomeCertificado: '', nomeEmp: '', dataVencimento: '' } as any;
  loading = false; errorMsg = '';

  constructor(private svc: CertificadosService) { this.carregar(); }

  carregar() {
    this.loading = true;
    this.svc.listar().subscribe({
      next: (res: any) => { this.lista = res?.content || res || []; },
      error: (err) => { this.errorMsg = err?.error?.message || 'Erro ao listar certificados'; },
      complete: () => (this.loading = false)
    });
  }

  filtrar() {
    this.loading = true;
    this.svc.listarFiltradosPaginado(
      this.filtros.nome || '', this.filtros.empresa || '', this.filtros.dataIni || '', this.filtros.dataFim || '', 0, 50
    ).subscribe({
      next: (res: any) => { this.lista = res?.content || res || []; },
      error: (err) => { this.errorMsg = err?.error?.message || 'Erro ao filtrar certificados'; },
      complete: () => (this.loading = false)
    });
  }

  cadastrar() {
    this.svc.cadastrar(this.novo).subscribe({
      next: () => { this.carregar(); this.novo = { nomeCertificado: '', nomeEmp: '', dataVencimento: '' }; },
      error: (err) => alert(err?.error?.message || 'Erro ao cadastrar')
    });
  }

  atualizar(item: any) {
    this.svc.atualizar(item.nomeCertificado, item).subscribe({
      next: () => this.carregar(),
      error: (err) => alert(err?.error?.message || 'Erro ao atualizar')
    });
  }

  deletar(item: any) {
    if (!confirm(`Excluir ${item.nomeCertificado}?`)) return;
    this.svc.deletar(item.nomeCertificado).subscribe({
      next: () => this.carregar(),
      error: (err) => alert(err?.error?.message || 'Erro ao excluir')
    });
  }
}