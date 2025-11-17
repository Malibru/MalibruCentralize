import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Status = 'Aberto' | 'Em Andamento' | 'Resolvido' | 'Fechado';

@Component({
  selector: 'app-chamados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chamados.component.html',
  styleUrls: ['./chamados.component.css']
})
export class ChamadosPageComponent {
  chamados = [
    { id: 1, titulo: 'Computador não liga', status: 'Aberto' as Status },
    { id: 2, titulo: 'Impressora travada', status: 'Em Andamento' as Status }
  ];

  novo = { titulo: '' };

  adicionar() {
    const id = Math.max(0, ...this.chamados.map(c => c.id)) + 1;
    this.chamados.push({ id, titulo: this.novo.titulo, status: 'Aberto' });
    this.novo.titulo = '';
  }

  mover(c: any, status: Status) { c.status = status; }
  fechar(c: any) { c.status = 'Fechado'; }
}